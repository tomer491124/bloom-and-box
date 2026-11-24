-- תיקון: הרשאות גישה + הגדרת מנהל מחדש
-- מחליפים את המייל בשורה המסומנת ומריצים ב-SQL Editor

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

insert into public.admins (user_id)
select id from auth.users
where lower(trim(email)) = lower(trim('your-email@example.com'))  -- <<< המייל שלכם כאן
on conflict (user_id) do nothing;

-- בדיקה: ליד המייל שלכם צריך להופיע true
select u.email, (a.user_id is not null) as is_admin
from auth.users u
left join public.admins a on a.user_id = u.id;
