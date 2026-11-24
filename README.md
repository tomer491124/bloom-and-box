# Bloom & Box — The Art of Luxury Floral

אתר תדמית וחנות (אב-טיפוס) לזרי פרחים ומארזי מתנה יוקרתיים, תל אביב.

## מה יש כאן
| קובץ | מה זה |
| --- | --- |
| `index.html` | הדף הראשי של האתר |
| `app.js` | כל ההתנהגות של האתר: עגלה, סינון, הרכבת מארז, הטבת ₪300 |
| `favicon.svg` | האייקון שמופיע בלשונית הדפדפן |
| `source/` | קוד המקור, למפתח שימשיך לעבוד על האתר (לא צריך לגעת בו) |

## העלאה ל-GitHub Pages (בלי לכתוב קוד)
1. נכנסים ל-github.com ופותחים חשבון (או מתחברים).
2. לוחצים על **+** למעלה ← **New repository**. שם: `bloom-and-box`, בוחרים **Public**, ולוחצים **Create repository**.
3. בעמוד שנפתח לוחצים על הקישור **uploading an existing file**.
4. גוררים לחלון את **כל מה שבתוך** התיקייה `bloom-and-box` (הקבצים והתיקייה `source`), לא את התיקייה עצמה.
5. למטה לוחצים **Commit changes**.
6. עוברים ל-**Settings** ← בתפריט הצד **Pages**.
7. תחת **Branch** בוחרים `main` ו-`/ (root)` ולוחצים **Save**.
8. מחכים דקה-שתיים ומרעננים. למעלה תופיע הכתובת:
   `https://<שם-המשתמש-שלכם>.github.io/bloom-and-box/`

## עדכון האתר בהמשך
מעלים מחדש את `index.html` ו-`app.js` דרך **Add file ← Upload files** באותו מאגר, ו-GitHub מחליף את הקבצים הישנים.

## חשוב לדעת
- זה אב-טיפוס: כפתור התשלום לא גובה כסף ולא שומר הזמנות. לחנות אמיתית צריך לחבר מערכת סליקה (למשל Shopify או סליקה ישראלית).
- המאגר ציבורי, כך שכל אחד יכול לראות את הקבצים.
- התמונות מסומנות כרגע כמקומות שמורים ([צילום: ...]) ויש להחליף אותן בצילומים אמיתיים.

## למפתחים
`app.js` נבנה מ-`source/app.jsx` (React 19) עם esbuild:
```
python3 source/convert.py source/Main.dc.html
esbuild src/app.jsx --bundle --minify --jsx-factory=h --jsx-fragment=Fragment --define:process.env.NODE_ENV=\"production\" --outfile=app.js
```
