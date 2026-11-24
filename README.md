# Bloom & Box — The Art of Luxury Floral

| קובץ | מה זה |
| --- | --- |
| `index.html` + `app.js` | אתר הלקוחות |
| `admin.html` | דף הניהול: כניסה עם מייל וסיסמה, מוצרים, מחירים, תמונות |
| `favicon.svg` | האייקון בלשונית הדפדפן |
| `supabase/setup.sql` | הקמת המסד ב-Supabase (מריצים פעם אחת) |
| `supabase/make-admin.sql` | הופך את המשתמש שלכם למנהל |
| `source/` | קוד מקור למפתחים, לא צריך לגעת |

## הקמה ב-Supabase (פעם אחת, כ-10 דקות)
1. **SQL Editor** ← **New query** ← מדביקים את כל התוכן של `supabase/setup.sql` ← **Run**.
2. **Authentication** ← **Users** ← **Add user** ← **Create new user**: מייל וסיסמה לניהול, מסמנים **Auto Confirm User** ← **Create user**.
3. **SQL Editor** ← **New query** ← מדביקים את `supabase/make-admin.sql`, מחליפים בו את `your-email@example.com` במייל משלב 2 ← **Run**. בתוצאה צריך להופיע המייל שלכם.
4. מומלץ: **Authentication** ← **Sign In / Providers** ← מכבים **Allow new users to sign up** ← **Save**.

## העלאה ל-GitHub
מעלים למאגר `bloom-and-box` את כל הקבצים (Add file ← Upload files). קבצים עם אותו שם מוחלפים לבד.

- האתר: `https://<שם-משתמש>.github.io/bloom-and-box/`
- הניהול: `https://<שם-משתמש>.github.io/bloom-and-box/admin.html`

## חשוב לדעת
- המפתח שבקבצים הוא המפתח הציבורי (publishable) ומותר שיופיע. את ה-secret key ואת סיסמת המסד לא שמים באתר.
- אם Supabase לא זמין, האתר מציג את המוצרים המקוריים כדי שלא יישאר ריק.
- שכחתם סיסמה? ב-Supabase ← Authentication ← Users ← בוחרים את המשתמש ← Send password recovery.
- פריטי "הרכבת מארז אישי" (יין, נרות, מתוקים) עדיין קבועים בקוד.
- התשלום באתר עדיין לא אמיתי.
