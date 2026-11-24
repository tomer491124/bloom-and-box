-- הופכים משתמש למנהל.
-- 1. מחליפים את המייל למטה במייל שיצרתם ב-Authentication > Users
-- 2. מריצים ב-SQL Editor
insert into public.admins (user_id)
select id from auth.users where email = 'your-email@example.com'
on conflict (user_id) do nothing;

-- בדיקה: אמורה להופיע שורה אחת עם המייל שלכם
select u.email from public.admins a join auth.users u on u.id = a.user_id;
