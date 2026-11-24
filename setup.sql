-- Bloom & Box — הקמת המסד ב-Supabase
-- מדביקים את כל הקובץ ב-SQL Editor ולוחצים Run. מספיק להריץ פעם אחת.

-- 1. טבלת מנהלים: רק מי שמופיע כאן יכול לערוך
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- 2. טבלת מוצרים
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  cat text not null default 'box' check (cat in ('bouquet', 'box')),
  name text not null,
  tagline text not null default '',
  description text not null default '',
  items text[] not null default '{}',
  occasions text[] not null default '{}',
  sizes jsonb not null default '[{"label":"קלאסי","price":0}]'::jsonb,
  badge text not null default '',
  tint text not null default '#E2E8DD',
  image_url text,
  image_path text,
  alcohol boolean not null default false,
  in_stock boolean not null default true,
  sort integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;

drop policy if exists "anyone can read products" on public.products;
create policy "anyone can read products" on public.products
  for select to anon, authenticated using (true);

drop policy if exists "admins insert products" on public.products;
create policy "admins insert products" on public.products
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update products" on public.products;
create policy "admins update products" on public.products
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete products" on public.products;
create policy "admins delete products" on public.products
  for delete to authenticated using (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

-- 3. מקום לתמונות: תיקייה ציבורית לצפייה, העלאה רק למנהלים
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

drop policy if exists "admins upload product images" on storage.objects;
create policy "admins upload product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admins update product images" on storage.objects;
create policy "admins update product images" on storage.objects
  for update to authenticated using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admins delete product images" on storage.objects;
create policy "admins delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());

-- 4. המוצרים הקיימים באתר (רק אם הטבלה ריקה)
insert into public.products (cat, name, tagline, description, items, occasions, sizes, badge, tint, alcohol, sort)
select * from (values
  ('bouquet', 'בוקר ביפו', 'רך ובהיר, כמו אור ראשון על הים.', 'ורדי גן בגווני שמנת ואפרסק, לימוניום עדין ואקליפטוס כסוף. זר שמכניס שקט לבית ומחזיק חיוך לכמה ימים טובים.', array['ורדי גן','לימוניום','אקליפטוס'], array['love','birthday','thanks'], '[{"label":"קלאסי","price":190},{"label":"גדול","price":260}]'::jsonb, 'הזר האהוב', '#F1E2D6', false, 10),
  ('bouquet', 'שדה מרווה', 'כמו קטיף בשדה, רק מסודר יותר.', 'פרחי בר עונתיים, מרווה ריחנית וזרדי עונה, עטופים בנייר ממוחזר וחוט פשתן. ליופי שלא מתאמץ.', array['פרחי בר עונתיים','מרווה','עטיפת פשתן'], array['thanks','home','getwell'], '[{"label":"קלאסי","price":220},{"label":"גדול","price":290}]'::jsonb, 'עונתי', '#DFE7DB', false, 20),
  ('bouquet', 'יער עמוק', 'לרגעים שמגיע להם את הכי טוב.', 'שושנים בגוון יין, צמחייה כהה ופרחי שעווה. זר נוכח ודרמטי שנכנס לחדר ומשנה את האווירה.', array['שושנים בגוון יין','פרחי שעווה','צמחייה כהה'], array['love','birthday'], '[{"label":"גדול","price":420},{"label":"מפואר","price":650}]'::jsonb, 'אייקוני', '#D3DDD0', false, 30),
  ('box', 'ערב של יין ונרות', 'הטלפונים בצד. רק אתם, אור נרות ויין טוב.', 'סידור פרחים קטן בצנצנת זכוכית, יין אדום מיקב בוטיק, שני נרות סויה בעבודת יד ושוקולד מריר, בקופסת עץ שתרצו לשמור.', array['סידור פרחים קטן','יין אדום','2 נרות סויה','שוקולד מריר'], array['love','birthday'], '[{"label":"קלאסי","price":420},{"label":"Grand","price":590}]'::jsonb, 'הנמכר ביותר', '#EAD9D0', true, 40),
  ('box', 'בוקר טוב, אהובה', 'יש בקרים שמגיע להם קצת יותר.', 'סידור פרחים קטן, פולי קפה טריים מקלייה מקומית, ספל קרמיקה בעבודת יד ועוגיות חמאה. הדרך היפה ביותר להגיד ״חשבתי עלייך״.', array['סידור פרחים קטן','פולי קפה','ספל קרמיקה','עוגיות חמאה'], array['love','birthday','thanks'], '[{"label":"קלאסי","price":290},{"label":"זוגי","price":380}]'::jsonb, 'מארז בוקר', '#F3E9DC', false, 50),
  ('box', 'רגע של ספא', 'חצי שעה שהיא רק שלה.', 'סידור פרחים יבשים שנשאר לתמיד, מלחי אמבט מים המלח, סבון שמן זית, נר לבנדר ומגבת פשתן. מתנה שאומרת ״עכשיו תורך לנוח״.', array['פרחים יבשים','מלחי אמבט','סבון טבעי','נר לבנדר','מגבת פשתן'], array['birthday','getwell','birth'], '[{"label":"קלאסי","price":340},{"label":"מורחב","price":460}]'::jsonb, 'פינוק', '#ECE6EE', false, 60),
  ('box', 'חגיגה מבעבעת', 'יש סיבה להרים כוסית.', 'בקבוק קאווה צונן, סידור פרחים בלבן וזהב, מקרונים צרפתיים וכרטיס ברכה מוזהב. לכל רגע ששווה פקק שעף.', array['קאווה','פרחים בלבן-זהב','מקרונים','כרטיס מוזהב'], array['birthday','birth'], '[{"label":"קלאסי","price":450},{"label":"Grand","price":620}]'::jsonb, 'לחגוג', '#F1EAD6', true, 70),
  ('box', 'פינוק מתוק, בלי אלכוהול', 'כל החגיגה, בלי היין.', 'סידור פרחים קטן, מיץ ענבים מבעבע, מקרונים ושוקולד חלב בלגי. לאמא טרייה, לחברה שמחלימה, או לכל מי שאוהב מתוק.', array['סידור פרחים קטן','מיץ ענבים מבעבע','מקרונים','שוקולד חלב'], array['birth','getwell','birthday'], '[{"label":"קלאסי","price":310},{"label":"מורחב","price":420}]'::jsonb, 'ללא אלכוהול', '#F4E2DD', false, 80),
  ('box', 'תודה מכל הלב', 'יש תודות שמילים לא מכסות.', 'סוקולנט בעציץ קרמי, דבש פרחי בר מכוורת מקומית, שמן זית כתית מעולה ושוקולד בוטיק. מתנה שנשארת על השולחן ומזכירה אתכם כל יום.', array['סוקולנט בעציץ','דבש פרחי בר','שמן זית','שוקולד בוטיק'], array['thanks','home'], '[{"label":"קלאסי","price":260},{"label":"מורחב","price":340}]'::jsonb, 'מתנת תודה', '#E2E8DD', false, 90),
  ('box', 'ברוכים הבאים הביתה', 'לבית חדש, להתחלה חדשה.', 'צמח ירוק בעציץ, נר ריחני, שמן זית, גרנולה ביתית ומגבת מטבח מפשתן. כל מה שבית חדש צריך כדי להרגיש בית כבר מהערב הראשון.', array['צמח בעציץ','נר ריחני','שמן זית','גרנולה','מגבת פשתן'], array['home','thanks'], '[{"label":"קלאסי","price":340},{"label":"עם יין","price":450}]'::jsonb, 'בית חדש', '#DCE4D7', false, 100),
  ('box', 'מארז Signature', 'כל הסיפור שלנו, בקופסה אחת.', 'סידור פרחים בינוני, יין אדום פרימיום, טראפלס בעבודת יד, נר סויה גדול וכרטיס בכתב יד, בתיבת עץ אגוז עם מכסה. למתנות שאין בהן פשרות.', array['סידור פרחים בינוני','יין פרימיום','טראפלס','נר סויה גדול','תיבת עץ אגוז'], array['love','birthday','thanks'], '[{"label":"המארז המלא","price":890}]'::jsonb, 'Signature', '#D9E2D4', true, 110)
) as v(cat, name, tagline, description, items, occasions, sizes, badge, tint, alcohol, sort)
where not exists (select 1 from public.products);
