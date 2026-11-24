-- מוסיף אפשרות לבחור איזה מוצר מוצג בראש העמוד
alter table public.products add column if not exists featured boolean not null default false;

-- מסמן את מארז Signature כמוצר המומלץ (אפשר לשנות אחר כך בדף הניהול)
update public.products set featured = true
where id = (select id from public.products where name ilike '%signature%' order by sort limit 1)
  and not exists (select 1 from public.products where featured);

select name, featured from public.products order by sort;
