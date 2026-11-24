import React from 'react';
import { createRoot } from 'react-dom/client';
import { h, Fragment } from './h.js';
const DCLogic = React.Component;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all', occasion: 'all', fx: 0, sizes: {},
      cart: [], open: false, method: 'delivery', slot: 'today-late', done: false, uid: 1,
      bBox: 'wood', bFlower: 'mini', bCat: 'wine', bPicked: { red: true, soy: true }, bCard: 'hand', bRibbon: 'linen', msg: '', full: false,
      logoHover: false, bump: 0, toast: '', toastOn: false, addedKey: '', perkChoice: ''
    };
  }

  componentWillUnmount() { clearTimeout(this._toastT); clearTimeout(this._addedT); }

  catalog() {
    return [
      { id: 'jaffa', cat: 'bouquet', occ: ['love', 'birthday', 'thanks'], name: 'בוקר ביפו', tagline: 'רך ובהיר, כמו אור ראשון על הים.', desc: 'ורדי גן בגווני שמנת ואפרסק, לימוניום עדין ואקליפטוס כסוף. זר שמכניס שקט לבית ומחזיק חיוך לכמה ימים טובים.', items: ['ורדי גן', 'לימוניום', 'אקליפטוס'], sizes: [{ label: 'קלאסי', price: 190 }, { label: 'גדול', price: 260 }], tint: '#F1E2D6', badge: 'הזר האהוב', photo: '[צילום: זר בוקר ביפו]' },
      { id: 'sage', cat: 'bouquet', occ: ['thanks', 'home', 'getwell'], name: 'שדה מרווה', tagline: 'כמו קטיף בשדה, רק מסודר יותר.', desc: 'פרחי בר עונתיים, מרווה ריחנית וזרדי עונה, עטופים בנייר ממוחזר וחוט פשתן. ליופי שלא מתאמץ.', items: ['פרחי בר עונתיים', 'מרווה', 'עטיפת פשתן'], sizes: [{ label: 'קלאסי', price: 220 }, { label: 'גדול', price: 290 }], tint: '#DFE7DB', badge: 'עונתי', photo: '[צילום: זר שדה מרווה]' },
      { id: 'forest', cat: 'bouquet', occ: ['love', 'birthday'], name: 'יער עמוק', tagline: 'לרגעים שמגיע להם את הכי טוב.', desc: 'שושנים בגוון יין, צמחייה כהה ופרחי שעווה. זר נוכח ודרמטי שנכנס לחדר ומשנה את האווירה.', items: ['שושנים בגוון יין', 'פרחי שעווה', 'צמחייה כהה'], sizes: [{ label: 'גדול', price: 420 }, { label: 'מפואר', price: 650 }], tint: '#D3DDD0', badge: 'אייקוני', photo: '[צילום: זר יער עמוק]' },
      { id: 'wine-night', cat: 'box', alcohol: true, occ: ['love', 'birthday'], name: 'ערב של יין ונרות', tagline: 'הטלפונים בצד. רק אתם, אור נרות ויין טוב.', desc: 'סידור פרחים קטן בצנצנת זכוכית, יין אדום מיקב בוטיק, שני נרות סויה בעבודת יד ושוקולד מריר, בקופסת עץ שתרצו לשמור.', items: ['סידור פרחים קטן', 'יין אדום', '2 נרות סויה', 'שוקולד מריר'], sizes: [{ label: 'קלאסי', price: 420 }, { label: 'Grand', price: 590 }], tint: '#EAD9D0', badge: 'הנמכר ביותר', photo: '[צילום: מארז ערב של יין ונרות]' },
      { id: 'good-morning', cat: 'box', occ: ['love', 'birthday', 'thanks'], name: 'בוקר טוב, אהובה', tagline: 'יש בקרים שמגיע להם קצת יותר.', desc: 'סידור פרחים קטן, פולי קפה טריים מקלייה מקומית, ספל קרמיקה בעבודת יד ועוגיות חמאה. הדרך היפה ביותר להגיד ״חשבתי עלייך״.', items: ['סידור פרחים קטן', 'פולי קפה', 'ספל קרמיקה', 'עוגיות חמאה'], sizes: [{ label: 'קלאסי', price: 290 }, { label: 'זוגי', price: 380 }], tint: '#F3E9DC', badge: 'מארז בוקר', photo: '[צילום: מארז בוקר טוב]' },
      { id: 'spa', cat: 'box', occ: ['birthday', 'getwell', 'birth'], name: 'רגע של ספא', tagline: 'חצי שעה שהיא רק שלה.', desc: 'סידור פרחים יבשים שנשאר לתמיד, מלחי אמבט מים המלח, סבון שמן זית, נר לבנדר ומגבת פשתן. מתנה שאומרת ״עכשיו תורך לנוח״.', items: ['פרחים יבשים', 'מלחי אמבט', 'סבון טבעי', 'נר לבנדר', 'מגבת פשתן'], sizes: [{ label: 'קלאסי', price: 340 }, { label: 'מורחב', price: 460 }], tint: '#ECE6EE', badge: 'פינוק', photo: '[צילום: מארז רגע של ספא]' },
      { id: 'bubbles', cat: 'box', alcohol: true, occ: ['birthday', 'birth'], name: 'חגיגה מבעבעת', tagline: 'יש סיבה להרים כוסית.', desc: 'בקבוק קאווה צונן, סידור פרחים בלבן וזהב, מקרונים צרפתיים וכרטיס ברכה מוזהב. לכל רגע ששווה פקק שעף.', items: ['קאווה', 'פרחים בלבן-זהב', 'מקרונים', 'כרטיס מוזהב'], sizes: [{ label: 'קלאסי', price: 450 }, { label: 'Grand', price: 620 }], tint: '#F1EAD6', badge: 'לחגוג', photo: '[צילום: מארז חגיגה מבעבעת]' },
      { id: 'sweet', cat: 'box', occ: ['birth', 'getwell', 'birthday'], name: 'פינוק מתוק, בלי אלכוהול', tagline: 'כל החגיגה, בלי היין.', desc: 'סידור פרחים קטן, מיץ ענבים מבעבע, מקרונים ושוקולד חלב בלגי. לאמא טרייה, לחברה שמחלימה, או לכל מי שאוהב מתוק.', items: ['סידור פרחים קטן', 'מיץ ענבים מבעבע', 'מקרונים', 'שוקולד חלב'], sizes: [{ label: 'קלאסי', price: 310 }, { label: 'מורחב', price: 420 }], tint: '#F4E2DD', badge: 'ללא אלכוהול', photo: '[צילום: מארז פינוק מתוק]' },
      { id: 'thanks', cat: 'box', occ: ['thanks', 'home'], name: 'תודה מכל הלב', tagline: 'יש תודות שמילים לא מכסות.', desc: 'סוקולנט בעציץ קרמי, דבש פרחי בר מכוורת מקומית, שמן זית כתית מעולה ושוקולד בוטיק. מתנה שנשארת על השולחן ומזכירה אתכם כל יום.', items: ['סוקולנט בעציץ', 'דבש פרחי בר', 'שמן זית', 'שוקולד בוטיק'], sizes: [{ label: 'קלאסי', price: 260 }, { label: 'מורחב', price: 340 }], tint: '#E2E8DD', badge: 'מתנת תודה', photo: '[צילום: מארז תודה מכל הלב]' },
      { id: 'home', cat: 'box', occ: ['home', 'thanks'], name: 'ברוכים הבאים הביתה', tagline: 'לבית חדש, להתחלה חדשה.', desc: 'צמח ירוק בעציץ, נר ריחני, שמן זית, גרנולה ביתית ומגבת מטבח מפשתן. כל מה שבית חדש צריך כדי להרגיש בית כבר מהערב הראשון.', items: ['צמח בעציץ', 'נר ריחני', 'שמן זית', 'גרנולה', 'מגבת פשתן'], sizes: [{ label: 'קלאסי', price: 340 }, { label: 'עם יין', price: 450 }], tint: '#DCE4D7', badge: 'בית חדש', photo: '[צילום: מארז ברוכים הבאים]' },
      { id: 'signature', cat: 'box', alcohol: true, occ: ['love', 'birthday', 'thanks'], name: 'מארז Signature', tagline: 'כל הסיפור שלנו, בקופסה אחת.', desc: 'סידור פרחים בינוני, יין אדום פרימיום, טראפלס בעבודת יד, נר סויה גדול וכרטיס בכתב יד, בתיבת עץ אגוז עם מכסה. למתנות שאין בהן פשרות.', items: ['סידור פרחים בינוני', 'יין פרימיום', 'טראפלס', 'נר סויה גדול', 'תיבת עץ אגוז'], sizes: [{ label: 'המארז המלא', price: 890 }], tint: '#D9E2D4', badge: 'Signature', photo: '[צילום: מארז Signature]' }
    ];
  }

  bBoxList() {
    return [
      { id: 'carton', name: 'קופסת קרטון ירוק יער', desc: 'קטנה · עד 3 פריטים', price: 25, cap: 3, swatch: '#2C4434' },
      { id: 'wood', name: 'קופסת עץ טבעי', desc: 'בינונית · עד 5 פריטים', price: 45, cap: 5, swatch: '#B89470' },
      { id: 'walnut', name: 'תיבת עץ אגוז עם מכסה', desc: 'גדולה · עד 7 פריטים', price: 85, cap: 7, swatch: '#5E4330' }
    ];
  }

  bFlowerList() {
    return [
      { id: 'mini', name: 'סידור פרחים קטן', desc: 'טרי, בצנצנת זכוכית', price: 120 },
      { id: 'dried', name: 'סידור פרחים יבשים', desc: 'נשאר יפה לתמיד', price: 95 },
      { id: 'succulent', name: 'סוקולנט בעציץ', desc: 'קרמיקה בעבודת יד', price: 70 },
      { id: 'none', name: 'בלי פרחים', desc: 'רק פינוקים', price: 0 }
    ];
  }

  bItemList() {
    return [
      { id: 'red', cat: 'wine', alcohol: true, name: 'יין אדום', desc: 'מיקב בוטיק ישראלי', price: 120 },
      { id: 'white', cat: 'wine', alcohol: true, name: 'יין לבן', desc: 'רענן ופירותי', price: 110 },
      { id: 'cava', cat: 'wine', alcohol: true, name: 'קאווה מבעבעת', desc: 'לחגיגות', price: 130 },
      { id: 'grape', cat: 'wine', name: 'מיץ ענבים מבעבע', desc: 'ללא אלכוהול', price: 45 },
      { id: 'soy', cat: 'scent', name: 'נר סויה', desc: 'בעבודת יד, ניחוח עץ ותאנה', price: 79 },
      { id: 'lavender', cat: 'scent', name: 'נר לבנדר', desc: 'מרגיע, לסוף יום', price: 69 },
      { id: 'diffuser', cat: 'scent', name: 'מפיץ ריח במקלות', desc: 'ניחוח לבית לשבועות', price: 110 },
      { id: 'dark', cat: 'sweet', name: 'שוקולד מריר 70%', desc: 'טבלה בוטיק', price: 39 },
      { id: 'truffles', cat: 'sweet', name: 'טראפלס בעבודת יד', desc: '9 יחידות', price: 69 },
      { id: 'macarons', cat: 'sweet', name: 'מקרונים צרפתיים', desc: '6 טעמים', price: 59 },
      { id: 'honey', cat: 'sweet', name: 'דבש פרחי בר', desc: 'מכוורת מקומית', price: 49 },
      { id: 'salts', cat: 'pamper', name: 'מלחי אמבט', desc: 'מינרלים מים המלח', price: 55 },
      { id: 'soap', cat: 'pamper', name: 'סבון שמן זית', desc: 'טבעי, בעבודת יד', price: 35 },
      { id: 'mug', cat: 'pamper', name: 'ספל קרמיקה', desc: 'כל ספל שונה מעט', price: 65 },
      { id: 'coffee', cat: 'pamper', name: 'פולי קפה טריים', desc: 'קלייה מקומית, 250 גרם', price: 55 }
    ];
  }

  money(n) { return '₪' + n.toLocaleString('en-US'); }

  prodSub(cart) { return cart.reduce((t, l) => t + l.price * l.qty, 0); }

  addLine(key, name, note, price, tint, alcohol, flashKey, cardFee) {
    const cart = this.state.cart.map((l) => Object.assign({}, l));
    const found = cart.find((l) => l.key === key);
    if (found) { found.qty += 1; } else { cart.push({ key: key, name: name, note: note, price: price, tint: tint, qty: 1, alcohol: !!alcohol, cardFee: cardFee || 0 }); }
    const prevSub = this.prodSub(this.state.cart);
    const newSub = this.prodSub(cart);
    const msg = prevSub < 300 && newSub >= 300 ? 'נוסף לעגלה, ופתחתם מתנה עלינו ✦' : 'נוסף לעגלה: ' + name;
    this.setState({ cart: cart, done: false, bump: this.state.bump + 1, toast: msg, toastOn: true, addedKey: flashKey || key });
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => this.setState({ toastOn: false }), 3400);
    clearTimeout(this._addedT);
    this._addedT = setTimeout(() => this.setState({ addedKey: '' }), 1700);
  }

  changeQty(key, delta) {
    const cart = this.state.cart.map((l) => (l.key === key ? Object.assign({}, l, { qty: l.qty + delta }) : l)).filter((l) => l.qty > 0);
    this.setState({ cart: cart, bump: delta > 0 ? this.state.bump + 1 : this.state.bump });
  }

  pill(on, extra) { return 'bb-pill' + (extra ? ' ' + extra : '') + (on ? ' is-on' : ''); }
  opt(on, extra) { return 'bb-opt' + (extra ? ' ' + extra : '') + (on ? ' is-on' : ''); }

  renderVals() {
    const s = this.state;
    const gold = this.props.gold ?? '#D4AF37';
    const FREE = 350;
    const GIFT = 300;
    const cartSub = this.prodSub(s.cart);
    const perkFor = (price) => {
      if (cartSub >= GIFT) return 'המתנה שלכם כבר מחכה בעגלה';
      if (cartSub + price >= GIFT) return 'כולל כרטיס ברכה מעוצב או מתנה קטנה, עלינו';
      return 'עוד ' + this.money(GIFT - cartSub - price) + ' ומתנה קטנה מצטרפת להזמנה, עלינו';
    };

    const filters = [{ id: 'all', label: 'כל המתנות' }, { id: 'bouquet', label: 'זרי פרחים' }, { id: 'box', label: 'מארזי מתנה' }].map((f) => ({
      label: f.label, cls: this.pill(s.filter === f.id), pressed: s.filter === f.id ? 'true' : 'false',
      pick: () => { if (s.filter !== f.id) this.setState({ filter: f.id, fx: s.fx + 1 }); }
    }));
    const occasions = [
      { id: 'all', label: 'כל הרגעים' }, { id: 'love', label: 'אהבה' }, { id: 'birthday', label: 'יום הולדת' }, { id: 'thanks', label: 'תודה' },
      { id: 'birth', label: 'הולדת תינוק' }, { id: 'getwell', label: 'החלמה מהירה' }, { id: 'home', label: 'בית חדש' }
    ].map((o) => ({
      label: o.label, cls: this.pill(s.occasion === o.id, 'sm gold'), pressed: s.occasion === o.id ? 'true' : 'false',
      pick: () => { if (s.occasion !== o.id) this.setState({ occasion: o.id, fx: s.fx + 1 }); }
    }));

    const visible = this.catalog().filter((p) => (s.filter === 'all' || p.cat === s.filter) && (s.occasion === 'all' || p.occ.indexOf(s.occasion) >= 0));
    const wrapCls = s.fx % 2 ? 'bb-in-a' : 'bb-in-b';
    const products = visible.map((p, n) => {
      const idx = Math.min(s.sizes[p.id] ?? 0, p.sizes.length - 1);
      const size = p.sizes[idx];
      const isBox = p.cat === 'box';
      const added = s.addedKey === p.id;
      return {
        name: p.name, tagline: p.tagline, desc: p.desc, tint: p.tint, badge: p.badge, photo: p.photo,
        wrapCls: wrapCls, delay: (n * 70) + 'ms',
        items: p.items.map((x) => ({ label: x })),
        multi: p.sizes.length > 1,
        sizes: p.sizes.map((z, j) => ({ label: z.label + ' · ' + this.money(z.price), cls: this.pill(j === idx, 'sm'), pressed: j === idx ? 'true' : 'false', pick: () => this.setState({ sizes: Object.assign({}, s.sizes, { [p.id]: j }) }) })),
        priceLabel: this.money(size.price),
        perk: perkFor(size.price),
        btnCls: 'bb-btn bb-btn-sm' + (added ? ' is-added' : ''),
        ctaLabel: added ? 'נוסף לעגלה ✓' : (isBox ? 'לרכישת המארז' : 'לרכישת הזר'),
        buy: () => this.addLine(p.id + '-' + idx, p.name, (isBox ? 'מארז מתנה' : 'זר פרחים') + ' · ' + size.label, size.price, p.tint, p.alcohol, p.id)
      };
    });

    const boxObj = this.bBoxList().find((b) => b.id === s.bBox);
    const flowerObj = this.bFlowerList().find((f) => f.id === s.bFlower);
    const picked = this.bItemList().filter((i) => s.bPicked[i.id]);
    const used = picked.length + (s.bFlower === 'none' ? 0 : 1);
    const isFull = used >= boxObj.cap;
    const over = used > boxObj.cap;

    const bBoxes = this.bBoxList().map((b) => ({ name: b.name, desc: b.desc, swatch: b.swatch, priceLabel: this.money(b.price), cls: this.opt(b.id === s.bBox), pressed: b.id === s.bBox ? 'true' : 'false', pick: () => this.setState({ bBox: b.id, full: false }) }));
    const bFlowers = this.bFlowerList().map((f) => ({
      name: f.name, desc: f.desc, priceLabel: f.price ? '+' + this.money(f.price) : 'ללא תוספת', cls: this.opt(f.id === s.bFlower), pressed: f.id === s.bFlower ? 'true' : 'false',
      pick: () => {
        const nextUsed = picked.length + (f.id === 'none' ? 0 : 1);
        if (nextUsed > boxObj.cap) { this.setState({ full: true }); return; }
        this.setState({ bFlower: f.id, full: false });
      }
    }));
    const bCats = [{ id: 'wine', label: 'יין ומשקאות' }, { id: 'scent', label: 'נרות וריח' }, { id: 'sweet', label: 'מתוקים' }, { id: 'pamper', label: 'פינוק לגוף ולבית' }].map((c) => ({
      label: c.label, cls: this.pill(s.bCat === c.id, 'sm'), pressed: s.bCat === c.id ? 'true' : 'false', pick: () => this.setState({ bCat: c.id })
    }));
    const bItems = this.bItemList().filter((i) => i.cat === s.bCat).map((i) => {
      const on = !!s.bPicked[i.id];
      const blocked = !on && isFull;
      return {
        name: i.name, desc: blocked ? 'הקופסה מלאה' : i.desc, priceLabel: '+' + this.money(i.price), mark: on ? '✓' : '+',
        cls: this.opt(on, blocked ? 'row is-blocked' : 'row'), pressed: on ? 'true' : 'false',
        toggle: () => {
          if (blocked) { this.setState({ full: true }); return; }
          this.setState({ bPicked: Object.assign({}, s.bPicked, { [i.id]: !on }), full: false });
        }
      };
    });
    const cardOpts = [{ id: 'print', name: 'כרטיס מודפס', price: 0, kind: 'card' }, { id: 'hand', name: 'כרטיס בכתב יד', price: 15, kind: 'card' }];
    const ribbonOpts = [{ id: 'linen', name: 'סרט פשתן טבעי', price: 0, kind: 'ribbon' }, { id: 'velvet', name: 'סרט קטיפה ירוק', price: 12, kind: 'ribbon' }];
    const bTouches = cardOpts.concat(ribbonOpts).map((t) => {
      const cur = t.kind === 'card' ? s.bCard : s.bRibbon;
      return { name: (cur === t.id ? '✓ ' : '') + t.name, priceLabel: t.price ? '+' + this.money(t.price) : 'כלול', cls: this.opt(cur === t.id, 'row'), pressed: cur === t.id ? 'true' : 'false', pick: () => this.setState(t.kind === 'card' ? { bCard: t.id } : { bRibbon: t.id }) };
    });
    const cardObj = cardOpts.find((c) => c.id === s.bCard);
    const ribbonObj = ribbonOpts.find((r) => r.id === s.bRibbon);

    const fillLabels = (s.bFlower === 'none' ? [] : [flowerObj.name]).concat(picked.map((i) => i.name));
    const filledStyle = 'min-height: 58px; border-radius: 2px; background: #FFFFFF; color: #1E3A2B; font-size: 12px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4px; box-shadow: 0 8px 16px -10px rgba(0,0,0,.4)';
    const emptyStyle = 'min-height: 58px; border-radius: 2px; border: 1px dashed rgba(250,250,250,.75); color: #FAFAFA; font-size: 12px; display: flex; align-items: center; justify-content: center';
    const slots = [];
    for (let k = 0; k < boxObj.cap; k++) {
      const lbl = fillLabels[k];
      slots.push({ label: lbl || 'מקום פנוי', style: lbl ? filledStyle : emptyStyle });
    }
    const summaryLines = [{ label: boxObj.name, price: this.money(boxObj.price) }];
    if (s.bFlower !== 'none') summaryLines.push({ label: flowerObj.name, price: this.money(flowerObj.price) });
    picked.forEach((i) => summaryLines.push({ label: i.name, price: this.money(i.price) }));
    summaryLines.push({ label: cardObj.name, price: cardObj.price ? this.money(cardObj.price) : 'כלול' });
    summaryLines.push({ label: ribbonObj.name, price: ribbonObj.price ? this.money(ribbonObj.price) : 'כלול' });
    const bTotal = boxObj.price + flowerObj.price + picked.reduce((t, i) => t + i.price, 0) + cardObj.price + ribbonObj.price;
    const bAlcohol = picked.some((i) => i.alcohol);
    const left = boxObj.cap - used;
    const bAdded = s.addedKey === 'builder';

    const gross = s.cart.reduce((t, l) => t + l.price * l.qty, 0);
    const subtotal = this.prodSub(s.cart);
    const eligible = subtotal >= GIFT;
    const cardDiscount = 0;
    const net = gross - cardDiscount;
    const hasHand = s.cart.some((l) => (l.cardFee || 0) > 0);
    const perkEff = hasHand ? 'gift' : s.perkChoice;
    const perkName = perkEff === 'gift' ? 'מתנה קטנה מהסטודיו' : 'כרטיס ברכה מעוצב';
    const count = s.cart.reduce((t, l) => t + l.qty, 0);
    const isDelivery = s.method === 'delivery';
    const shipFee = !isDelivery || subtotal >= FREE ? 0 : 35;
    const toFree = Math.max(0, FREE - subtotal);

    const lines = s.cart.map((l) => ({
      name: l.name, qty: l.qty, tint: l.tint,
      note: l.note,
      totalLabel: this.money(l.price * l.qty),
      inc: () => this.changeQty(l.key, 1), dec: () => this.changeQty(l.key, -1), remove: () => this.changeQty(l.key, -l.qty)
    }));
    const methods = [
      { id: 'delivery', name: 'משלוח עד הדלת', desc: 'גוש דן והשרון' },
      { id: 'pickup', name: 'איסוף עצמי', desc: 'מהסטודיו, ללא עלות' }
    ].map((m) => ({ name: m.name, desc: m.desc, cls: this.opt(s.method === m.id), pressed: s.method === m.id ? 'true' : 'false', pick: () => this.setState({ method: m.id }) }));
    const slotDefs = isDelivery
      ? [{ id: 'today-mid', label: 'היום 14:00–17:00' }, { id: 'today-late', label: 'היום 17:00–20:00' }, { id: 'tmr', label: 'מחר 09:00–12:00' }, { id: 'tmr2', label: 'מחר 12:00–15:00' }]
      : [{ id: 'p-2h', label: 'בעוד שעתיים' }, { id: 'p-eve', label: 'היום עד 19:00' }, { id: 'p-tmr', label: 'מחר בבוקר' }];
    const slotId = slotDefs.some((d) => d.id === s.slot) ? s.slot : slotDefs[0].id;
    const slots2 = slotDefs.map((d) => ({ label: d.label, cls: this.pill(d.id === slotId, 'sm'), pressed: d.id === slotId ? 'true' : 'false', pick: () => this.setState({ slot: d.id }) }));
    const slotLabel = slotDefs.find((d) => d.id === slotId).label;

    return {
      gold: gold,
      logoState: s.logoHover ? 'is-hover' : '',
      logoEnter: () => this.setState({ logoHover: true }),
      logoLeave: () => this.setState({ logoHover: false }),
      bumpCls: s.bump === 0 ? '' : (s.bump % 2 ? 'bump-a' : 'bump-b'),
      filters: filters, occasions: occasions, products: products, noResults: products.length === 0,
      resultLabel: products.length === 0 ? '' : products.length + ' יצירות נבחרות',
      clearFilters: () => this.setState({ filter: 'all', occasion: 'all', fx: s.fx + 1 }),
      bBoxes: bBoxes, bFlowers: bFlowers, bCats: bCats, bItems: bItems, bTouches: bTouches,
      capLabel: over ? 'יותר מדי פריטים לקופסה הזו' : (left === 0 ? 'הקופסה מלאה' : 'נותרו ' + left + ' מקומות בקופסה'),
      showFull: s.full || over,
      msg: s.msg,
      setMsg: (e) => this.setState({ msg: String(e.target.value).slice(0, 160) }),
      msgCount: s.msg.length + ' / 160 תווים',
      bBoxName: boxObj.name, bSwatch: boxObj.swatch, slots: slots, summaryLines: summaryLines,
      bTotalLabel: this.money(bTotal), bOver: over,
      bBtnCls: 'bb-btn' + (bAdded ? ' is-added' : ''),
      bCtaLabel: over ? 'יש בקופסה יותר פריטים ממה שהיא מכילה' : (bAdded ? 'המארז נוסף לעגלה ✓' : 'לרכישת המארז שעיצבתם'),
      addBox: () => {
        if (over) return;
        const uid = s.uid + 1;
        this.setState({ uid: uid });
        const note = fillLabels.join(', ') + (s.msg ? ' · ״' + s.msg + '״' : '');
        this.addLine('build-' + uid, 'המארז שעיצבתם', boxObj.name + ' · ' + note, bTotal, '#E7E1D4', bAlcohol, 'builder', cardObj.price);
      },
      count: count,
      toastCls: s.toastOn ? 'is-show' : '',
      toastText: s.toast,
      drawerCls: s.open ? 'is-open' : '',
      drawerHidden: s.open ? 'false' : 'true',
      drawerKey: (e) => { if (e.key === 'Escape') this.setState({ open: false }); },
      done: s.done,
      showEmpty: !s.done && s.cart.length === 0, showCart: !s.done && s.cart.length > 0,
      lines: lines,
      hasAlcohol: s.cart.some((l) => l.alcohol),
      openCart: () => this.setState({ open: true, toastOn: false }),
      closeCart: () => this.setState({ open: false }),
      addCard: () => this.addLine('card', 'כרטיס ברכה בכתב יד', 'נכתב ביד בסטודיו', 15, '#F3E9DC', false, 'card', 15),
      shipPct: isDelivery ? Math.min(100, Math.round((subtotal / FREE) * 100)) : 100,
      shipMessage: !isDelivery ? 'איסוף עצמי מהסטודיו, ללא עלות' : (toFree > 0 ? 'עוד ' + this.money(toFree) + ' והמשלוח עלינו' : 'המשלוח עלינו. תהנו.'),
      methods: methods, slots2: slots2,
      slotTitle: isDelivery ? 'מתי להגיע?' : 'מתי לאסוף?',
      subtotalLabel: this.money(gross),
      shipLabel: isDelivery ? 'משלוח' : 'איסוף עצמי',
      shipFeeLabel: shipFee === 0 ? 'חינם' : this.money(shipFee),
      totalLabel: this.money(net + shipFee),
      showCardDiscount: cardDiscount > 0,
      cardDiscountLabel: '−' + this.money(cardDiscount),
      perkChosen: eligible && !!perkEff,
      perkChoosable: eligible && !hasHand,
      perkSwappable: !hasHand,
      perkItemName: perkName,
      perkItemNote: hasHand ? 'מצטרפת כי בחרתם כרטיס בכתב יד · הטבת ₪300' : perkEff === 'gift' ? 'מצטרפת למארז או לזר · הטבת ₪300' : 'נכתב בכתב יד בסטודיו · הטבת ₪300',
      perkPending: eligible && !perkEff,
      perkRemove: () => this.setState({ perkChoice: '' }),
      doneNote: (isDelivery ? 'משלוח: ' : 'איסוף: ') + slotLabel + '.' + (subtotal >= GIFT ? ' המתנה שלכם: ' + (perkEff === 'gift' ? 'מתנה קטנה מהסטודיו' : 'כרטיס ברכה מעוצב') + '.' : ''),
      checkout: () => this.setState(subtotal >= GIFT && !hasHand && !s.perkChoice ? { done: true, perkChoice: 'card' } : { done: true }),
      perkUnlocked: subtotal >= GIFT,
      showCardUpsell: subtotal < GIFT,
      perkLine: s.perkChoice === 'gift' ? 'מתנה קטנה מהסטודיו' : (s.perkChoice === 'card' ? 'כרטיס ברכה מעוצב' : 'מתנה לבחירתכם'),
      perkOpts: [{ id: 'card', name: 'כרטיס ברכה מעוצב', desc: 'נכתב בכתב יד בסטודיו' }, { id: 'gift', name: 'מתנה קטנה', desc: 'פינוק שמצטרף למארז או לזר' }].map((g) => ({ name: g.name, desc: g.desc, cls: this.opt(s.perkChoice === g.id), pressed: s.perkChoice === g.id ? 'true' : 'false', pick: () => this.setState({ perkChoice: g.id }) })),
      perkMessage: eligible && hasHand ? '✦ בחרתם כרטיס בכתב יד, אז צירפנו לעגלה מתנה קטנה מהסטודיו' + (isDelivery && subtotal < FREE ? '. עוד ' + this.money(FREE - subtotal) + ' והמשלוח עלינו' : (isDelivery ? ', והמשלוח עלינו' : '')) : subtotal < GIFT ? 'עוד ' + this.money(GIFT - subtotal) + ' ותקבלו כרטיס ברכה מעוצב או מתנה קטנה, עלינו' : (isDelivery && subtotal < FREE ? '✦ המתנה שלכם נפתחה, בחרו למטה. עוד ' + this.money(FREE - subtotal) + ' והמשלוח עלינו' : (isDelivery ? '✦ פתחתם את כל ההטבות: מתנה לבחירתכם ומשלוח חינם' : '✦ המתנה שלכם נפתחה. בחרו אותה למטה')),
      barPct: Math.min(100, Math.round((subtotal / (isDelivery ? FREE : GIFT)) * 100)),
      giftPos: isDelivery ? Math.round((GIFT / FREE) * 1000) / 10 : 100,
      giftDot: subtotal >= GIFT ? '#C9A532' : '#FFFFFF',
      shipDot: subtotal >= FREE ? '#C9A532' : '#FFFFFF',
      showShipMark: isDelivery,
      giftMark: subtotal >= GIFT ? '#C9A532' : '#CFC9BC',
      shipMark: subtotal >= FREE ? '#C9A532' : '#CFC9BC',
      reset: () => this.setState({ done: false, cart: [], open: false })
    };
  }
}

Component.prototype.render = function () {
  const v = this.renderVals();
  return (
<div dir="rtl" style="position: relative; min-height: 100vh; background: #FAFAFA; color: #1E3A2B; font-family: Heebo, system-ui, sans-serif; font-size: 16px; font-weight: 300; line-height: 1.7">

  <div style="background: #1F3D2B; color: #E7E4DC; text-align: center; font-size: 12.5px; letter-spacing: .12em; padding: 10px 16px"><span style={`color: ${v.gold}`}>✦</span> בקנייה מעל ₪300 המתנה עלינו: כרטיס ברכה מעוצב או פינוק קטן, לבחירתכם <span style={`color: ${v.gold}; padding: 0 10px`}>◆</span> משלוח חינם מעל ₪350</div>

  <header class="bb-header">
    <div style="max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
      <a href="#top" dir="ltr" class={`bb-logo ${v.logoState}`} aria-label="Bloom &amp; Box, לדף הבית" onMouseEnter={v.logoEnter} onMouseLeave={v.logoLeave} onFocus={v.logoEnter} onBlur={v.logoLeave}>
        <svg class="bb-mark" viewBox="0 0 64 72" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="bbG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9CF73"></stop><stop offset="0.5" stop-color="#D4AF37"></stop><stop offset="1" stop-color="#B8941F"></stop></linearGradient>
          </defs>
          <path class="bb-halo" d="M19 13A13 13 0 0 1 45 13" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-dasharray="0.6 1.8" stroke-linecap="round"></path>
          <g class="bb-sway bb-sway-c">
            <path class="bb-ln" d="M32 38C32 30 32 21 32 13.5" stroke="#3F5A48" stroke-width="0.95" style="animation-delay: .9s"></path>
            <path class="bb-ln" d="M32 31C28.5 31.2 25.5 30 24 27.5C27.5 27 30.5 28.5 32 31ZM31.3 30.5L25.5 28" stroke="#3F5A48" stroke-width="0.85" style="animation-delay: 1.2s"></path>
            <path class="bb-ln" d="M32 26.5C35.5 26.7 38.5 25.5 40 23C36.5 22.5 33.5 24 32 26.5ZM32.7 26L38.5 23.5" stroke="#3F5A48" stroke-width="0.85" style="animation-delay: 1.3s"></path>
            <path class="bb-ln" d="M32 13.5C29.5 10.5 29.5 6 32 3C34.5 6 34.5 10.5 32 13.5ZM32 12.5V5" stroke="url(#bbG)" stroke-width="0.9" style="animation-delay: 1.5s"></path>
            <path class="bb-ln" d="M32 13.5C27.5 12.5 25 9 25.5 5C28.5 6.5 31 9.5 32 13.5ZM32 13.5C36.5 12.5 39 9 38.5 5C35.5 6.5 33 9.5 32 13.5Z" stroke="url(#bbG)" stroke-width="0.9" style="animation-delay: 1.65s"></path>
            <path class="bb-ln" d="M32 14C26 14 22.5 11.5 21.5 8C25.5 8 29.5 10.5 32 14ZM32 14C38 14 41.5 11.5 42.5 8C38.5 8 34.5 10.5 32 14Z" stroke="url(#bbG)" stroke-width="0.8" style="animation-delay: 1.8s"></path>
          </g>
          <g class="bb-sway bb-sway-l">
            <path class="bb-ln" d="M31.5 38C30 31 25.5 26 21.5 22" stroke="#3F5A48" stroke-width="0.9" style="animation-delay: 1s"></path>
            <g class="bb-daisy">
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.7s"></ellipse>
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" transform="rotate(60 21 19.5)" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.75s"></ellipse>
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" transform="rotate(120 21 19.5)" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.8s"></ellipse>
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" transform="rotate(180 21 19.5)" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.85s"></ellipse>
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" transform="rotate(240 21 19.5)" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.9s"></ellipse>
              <ellipse class="bb-ln" cx="21" cy="16.6" rx="1.25" ry="2.9" transform="rotate(300 21 19.5)" stroke="url(#bbG)" stroke-width="0.7" style="animation-delay: 1.95s"></ellipse>
              <circle cx="21" cy="19.5" r="0.9" fill="#3F5A48"></circle>
            </g>
          </g>
          <g class="bb-sway bb-sway-r">
            <path class="bb-ln" d="M32.5 38C34 31 39 24 42.5 18.5" stroke="#3F5A48" stroke-width="0.9" style="animation-delay: 1.05s"></path>
            <path class="bb-ln" d="M42.5 18.5C40 17 39.5 13.5 41 11C41.8 12.3 42.5 13.5 42.5 13.5C42.5 13.5 43.2 12.3 44 11C45.5 13.5 45 17 42.5 18.5ZM42.5 17.5V14.5" stroke="url(#bbG)" stroke-width="0.85" style="animation-delay: 1.75s"></path>
          </g>
          <path class="bb-ln" d="M15 38H49V41H15Z" stroke="url(#bbG)" stroke-width="0.95" style="animation-delay: 0s"></path>
          <path class="bb-ln" d="M17.5 41H46.5L43 62H21Z" stroke="url(#bbG)" stroke-width="0.95" style="animation-delay: .15s"></path>
          <path class="bb-ln" d="M18 44H46M18.5 46.8H45.5" stroke="#D4AF37" stroke-width="0.55" style="animation-delay: .4s"></path>
          <path class="bb-ln" d="M24 62A8 8 0 0 1 40 62M37.1 55.9L44.6 47M34.7 54.5L37.5 47M32 54V47M29.3 54.5L26.5 47M26.9 55.9L19.4 47" stroke="#3F5A48" stroke-width="0.6" style="animation-delay: .55s"></path>
          <path class="bb-ln" d="M23 62H41V64.5H23ZM20 64.5H44V67H20Z" stroke="url(#bbG)" stroke-width="0.9" style="animation-delay: .3s"></path>
        </svg>
        <span class="bb-text">
          <span class="bb-word">Bloom<span class="bb-amp" aria-hidden="true"><svg viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-linecap="round"><path fill="currentColor" stroke="none" d="M57 49C44 47 32 39 32 28C32 15 45 7 58 7C48 8.5 42 15 42 27C42 37 48 45 57 49Z"></path><path fill="currentColor" stroke="none" d="M57 50C36 50 17 63 17 81C17 100 34 112 52 112C40 110 31 98 31 81C31 66 42 54 57 50Z"></path><path d="M58 7C70 7 79 12 79 20C79 23.5 77.5 25.5 75 26.5" stroke-width="5"></path><path d="M52 112C66 112 75 103 78 92C81 81 88 72 97 70C100 69.5 101 72 99 74" stroke-width="5.5"></path></svg></span>Box</span>
          <span class="bb-tag"><span class="bb-rule" aria-hidden="true"></span>THE ART OF LUXURY FLORAL<span class="bb-rule" aria-hidden="true"></span></span>
        </span>
      </a>
      <nav class="bb-nav" aria-label="ניווט ראשי" style="display: flex; flex-wrap: wrap; gap: 32px">
        <a href="#shop">הקולקציה</a>
        <a href="#shop">מארזי מתנה</a>
        <a href="#builder">עיצוב מארז אישי</a>
        <a href="#subscribe">מנויים</a>
      </nav>
      <button type="button" class="bb-cartbtn" onClick={v.openCart} aria-label={`פתיחת העגלה, ${v.count} פריטים`}>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></svg>
        <span>העגלה</span>
        <span class={`bb-count ${v.bumpCls}`}>{v.count}</span>
      </button>
    </div>
  </header>

  <section id="top" style="max-width: 1280px; margin: 0 auto; padding: 88px 24px 104px; display: flex; flex-wrap: wrap; gap: 64px; align-items: center">
    <div style="flex: 1 1 440px; display: flex; flex-direction: column; gap: 28px">
      <span class="bb-eyebrow" dir="ltr" style="align-self: flex-start">Maison Florale · Tel Aviv</span>
      <h1 class="serif" style="margin: 0; font-size: clamp(46px, 5.6vw, 78px); line-height: 1.06; letter-spacing: -.005em; color: #1E3A2B">יופי שנבחר ביד.<br />מתנה שנזכרת לתמיד.</h1>
      <p style="margin: 0; font-size: 19px; color: #4B514C; max-width: 500px">זרי פרחים בעבודת יד ומארזי מתנה אקסקלוסיביים, שבהם כל פרח, כל בקבוק וכל נר נבחרים אחד-אחד. נארזים בסטודיו שלנו בתל אביב, ומגיעים אל הדלת כמו מכתב אהבה.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 14px">
        <a href="#shop" class="bb-btn">לגלות את הקולקציה</a>
        <a href="#builder" class="bb-btn-ghost">לעצב מארז אישי</a>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 22px; font-size: 13.5px; color: #5B615C; letter-spacing: .03em">
        <span><span style={`color: ${v.gold}`}>◆</span> משלוח עוד היום</span>
        <span><span style={`color: ${v.gold}`}>◆</span> איסוף עצמי ללא עלות</span>
        <span><span style={`color: ${v.gold}`}>◆</span> תמונת המתנה בוואטסאפ לפני שיוצאת</span>
      </div>
    </div>
    <div style="flex: 1 1 440px; position: relative; min-height: 560px">
      <div aria-hidden="true" style={`position: absolute; top: 0; right: 28px; bottom: 56px; left: 64px; border: 1px solid ${v.gold}; border-radius: 2px; opacity: .65`}></div>
      <div style="position: absolute; top: 28px; right: 0; bottom: 24px; left: 92px; border-radius: 2px; overflow: hidden; background: linear-gradient(165deg, #E3EAE0 0%, #F6F3EC 60%, #FFFFFF 100%); box-shadow: 0 50px 90px -50px rgba(27,36,30,.5); display: flex; align-items: flex-end; justify-content: center; padding: 20px">
        <svg aria-hidden="true" viewBox="0 0 120 160" style="position: absolute; top: 12%; left: 22%; width: 56%" fill="none" stroke="#B8941F" stroke-width="0.8" stroke-linecap="round" opacity=".85"><path d="M30 45A30 30 0 0 1 90 45" stroke-dasharray="1 3"></path><path d="M60 150C60 120 58 95 60 62"></path><path d="M60 62C52 52 52 38 60 28C68 38 68 52 60 62Z"></path><path d="M60 62C48 60 41 50 42 38C51 42 57 50 60 62Z"></path><path d="M60 62C72 60 79 50 78 38C69 42 63 50 60 62Z"></path><path d="M60 110C48 108 40 100 37 90C48 90 56 98 60 110Z" stroke="#3F5A48"></path><path d="M60 96C72 94 80 86 83 76C72 76 64 84 60 96Z" stroke="#3F5A48"></path><path d="M60 58V34M58 108L41 92M62 94L80 78" stroke-width=".5"></path></svg>
        <span style="position: relative; font-size: 12px; letter-spacing: .08em; color: #3F5A48; background: rgba(255,255,255,.85); padding: 6px 14px; border-radius: 999px">[צילום קמפיין: מארז Signature פתוח באור בוקר]</span>
      </div>
      <div class="bb-float" style="position: absolute; left: 0; bottom: 0; width: 240px; padding: 22px; border-radius: 2px; background: rgba(255,255,255,.92); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); box-shadow: 0 30px 60px -28px rgba(27,36,30,.45); display: flex; flex-direction: column; gap: 6px">
        <span class="bb-eyebrow" style="font-size: 10.5px">The Signature</span>
        <span class="serif" style="font-size: 24px; line-height: 1.15">מארז Signature</span>
        <span style="font-size: 13.5px; color: #4B514C">פרחים, יין פרימיום וטראפלס בתיבת עץ אגוז.</span>
        <span class="serif" style="font-size: 22px; color: #1E3A2B">₪890</span>
      </div>
    </div>
  </section>

  <section aria-label="ההבטחה שלנו" style="background: #FFFFFF; border-top: 1px solid #EEECE6; border-bottom: 1px solid #EEECE6">
    <div style="max-width: 1280px; margin: 0 auto; padding: 22px 24px; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 40px; font-size: 13.5px; letter-spacing: .1em; color: #3F5A48">
      <span>מעוצב ביד, באותו בוקר</span><span style={`color: ${v.gold}`}>◆</span>
      <span>משלוח עוד היום עד 13:00</span><span style={`color: ${v.gold}`}>◆</span>
      <span>איסוף עצמי מהסטודיו</span><span style={`color: ${v.gold}`}>◆</span>
      <span>כרטיס ברכה אישי בכל הזמנה</span>
    </div>
  </section>

  <section aria-label="מתנה בהזמנה מעל 300 שקלים" style="max-width: 1280px; margin: 0 auto; padding: 72px 24px 0">
    <div style="position: relative; border-radius: 4px; background: #FFFFFF; box-shadow: 0 40px 80px -50px rgba(31,61,43,.45), 0 1px 2px rgba(31,61,43,.05); display: flex; flex-wrap: wrap; align-items: stretch; overflow: hidden">
      <div aria-hidden="true" style="position: absolute; top: 0; right: 0; left: 0; height: 2px; background: linear-gradient(90deg, rgba(212,175,55,0), #D4AF37 30%, #D4AF37 70%, rgba(212,175,55,0))"></div>
      <div style="flex: 1 1 420px; padding: clamp(32px, 5vw, 48px) clamp(24px, 5vw, 48px); display: flex; flex-direction: column; justify-content: center; gap: 14px">
        <span class="bb-eyebrow" dir="ltr" style="align-self: flex-start">A Gift From Us</span>
        <h2 class="serif" style="margin: 0; font-size: clamp(32px, 3.4vw, 46px); line-height: 1.12; color: #1E3A2B">מעל ₪300, אנחנו מוסיפים משהו קטן מהלב.</h2>
        <p style="margin: 0; font-size: 16.5px; color: #4B514C; max-width: 480px">בכל הזמנה מעל ₪300 תבחרו בעצמכם: מתנה קטנה מהסטודיו, או כרטיס ברכה שנכתב בכתב יד. אנחנו נדאג שזה יגיע יחד עם ההזמנה, ארוז כמו שצריך.</p>
        <a href="#shop" class="bb-btn" style="align-self: flex-start; margin-top: 10px">לבחירת המתנה שלכם</a>
      </div>
      <div style="flex: 1 1 420px; background: linear-gradient(160deg, #EEF2EA 0%, #F7F4EC 100%); padding: clamp(24px, 4vw, 40px); display: flex; align-items: stretch; justify-content: center; gap: clamp(10px, 2vw, 18px)">
        <div style="flex: 1 1 0; max-width: 200px; background: #FFFFFF; border-radius: 2px; padding: 28px 14px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 24px 44px -28px rgba(31,61,43,.45)">
          <svg aria-hidden="true" viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#B8941F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="27" width="40" height="27" rx="1.5"></rect><rect x="9" y="20" width="46" height="7" rx="1.5"></rect><path d="M32 20V54"></path><path d="M32 20C28 13 20 11 19 15.5C18 20 27 20 32 20ZM32 20C36 13 44 11 45 15.5C46 20 37 20 32 20Z"></path></svg>
          <span class="serif" style="font-size: 22px; line-height: 1.15; color: #1E3A2B">מתנה מהסטודיו</span>
          <span style="font-size: 13px; color: #5B615C">פינוק קטן שבחרנו בשבילכם</span>
        </div>
        <span class="serif" style="flex: none; align-self: center; font-size: 22px; font-style: italic; color: #9C7A1E">או</span>
        <div style="flex: 1 1 0; max-width: 200px; background: #FFFFFF; border-radius: 2px; padding: 28px 14px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 24px 44px -28px rgba(31,61,43,.45)">
          <svg aria-hidden="true" viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#B8941F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="17" width="44" height="32" rx="1.5"></rect><path d="M10 18L32 34L54 18"></path><path d="M32 33.5C30.4 31.2 27.3 31.8 27.6 34.4C27.9 36.6 32 39.2 32 39.2C32 39.2 36.1 36.6 36.4 34.4C36.7 31.8 33.6 31.2 32 33.5Z" fill="#B8941F" stroke="none"></path></svg>
          <span class="serif" style="font-size: 22px; line-height: 1.15; color: #1E3A2B">כרטיס בכתב יד</span>
          <span style="font-size: 13px; color: #5B615C">המילים שלכם, בכתב ידנו</span>
        </div>
      </div>
    </div>
  </section>

  <section id="shop" style="max-width: 1280px; margin: 0 auto; padding: 104px 24px; display: flex; flex-direction: column; gap: 40px">
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px">
      <span class="bb-eyebrow" dir="ltr">The Collection</span>
      <h2 class="serif" style="margin: 0; font-size: clamp(38px, 4.2vw, 56px); line-height: 1.1">למי זה הפעם?</h2>
      <p style="margin: 0; color: #4B514C; font-size: 17px; max-width: 620px">בחרו את הרגע, והשאירו לנו את השאר. זרים שנקטפו בשבילכם, ומארזים שבכל אחד מהם מחכים סידור פרחים קטן, פינוק מתוק ומשהו שנשאר הרבה אחרי.</p>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; gap: 14px">
      <div role="group" aria-label="סוג מתנה" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px">
        {(v.filters).map((f, $index) => <React.Fragment key={$index}>
          <button type="button" class={f.cls} aria-pressed={f.pressed} onClick={f.pick}>{f.label}</button>
        </React.Fragment>)}
      </div>
      <div role="group" aria-label="סינון לפי אירוע" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px">
        {(v.occasions).map((o, $index) => <React.Fragment key={$index}>
          <button type="button" class={o.cls} aria-pressed={o.pressed} onClick={o.pick}>{o.label}</button>
        </React.Fragment>)}
      </div>
      <span role="status" style="font-size: 13px; color: #5B615C; letter-spacing: .06em">{v.resultLabel}</span>
    </div>

    {(v.noResults) ? <>
      <div style="padding: 36px; border-radius: 4px; background: #FFFFFF; box-shadow: 0 30px 60px -40px rgba(27,36,30,.35); display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between">
        <span class="serif" style="font-size: 22px">לשילוב הזה עוד אין יצירה מוכנה, אבל אפשר לעצב אחת בדיוק כזו.</span>
        <div style="display: flex; gap: 10px; flex-wrap: wrap">
          <button type="button" class="bb-btn-ghost bb-btn-sm" onClick={v.clearFilters}>ניקוי הסינון</button>
          <a href="#builder" class="bb-btn bb-btn-sm">לעיצוב מארז אישי</a>
        </div>
      </div>
    </> : null}

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 40px 28px">
      {(v.products).map((p, $index) => <React.Fragment key={$index}>
        <div class={p.wrapCls} style={`animation-delay: ${p.delay}`}>
          <article class="bb-card">
            <div style="position: relative; aspect-ratio: 4 / 5; overflow: hidden">
              <div class="bb-art" style={`position: absolute; inset: 0; background: linear-gradient(165deg, ${p.tint} 0%, #FBFAF7 100%); display: flex; align-items: flex-end; justify-content: center; padding: 18px`}>
                <svg aria-hidden="true" viewBox="0 0 120 160" style="position: absolute; top: 14%; left: 25%; width: 50%" fill="none" stroke="#B8941F" stroke-width="0.9" stroke-linecap="round" opacity=".8"><path d="M30 45A30 30 0 0 1 90 45" stroke-dasharray="1 3"></path><path d="M60 150C60 120 58 95 60 62"></path><path d="M60 62C52 52 52 38 60 28C68 38 68 52 60 62Z"></path><path d="M60 62C48 60 41 50 42 38C51 42 57 50 60 62Z"></path><path d="M60 62C72 60 79 50 78 38C69 42 63 50 60 62Z"></path><path d="M60 110C48 108 40 100 37 90C48 90 56 98 60 110Z" stroke="#3F5A48"></path><path d="M60 96C72 94 80 86 83 76C72 76 64 84 60 96Z" stroke="#3F5A48"></path></svg>
                <span style="position: relative; font-size: 11.5px; color: #4B514C; letter-spacing: .06em">{p.photo}</span>
              </div>
              <span style="position: absolute; top: 14px; right: 14px; font-size: 11px; letter-spacing: .14em; background: rgba(255,255,255,.92); color: #1E3A2B; padding: 4px 12px; border-radius: 999px">{p.badge}</span>
            </div>
            <div style="flex: 1 1 auto; padding: 24px 24px 26px; display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; flex-direction: column; gap: 2px">
                <h3 class="serif" style="margin: 0; font-size: 28px; line-height: 1.15; font-weight: 400">{p.name}</h3>
                <span style="font-size: 14.5px; font-style: italic; color: #3F5A48">{p.tagline}</span>
              </div>
              <p style="margin: 0; font-size: 15px; color: #4B514C">{p.desc}</p>
              <div aria-label="מה בפנים" style="display: flex; flex-wrap: wrap; gap: 6px">
                {(p.items).map((it, $index) => <React.Fragment key={$index}>
                  <span class="bb-chip">{it.label}</span>
                </React.Fragment>)}
              </div>
              {(p.multi) ? <>
                <div role="group" aria-label="בחירת גודל" style="display: flex; flex-wrap: wrap; gap: 8px">
                  {(p.sizes).map((z, $index) => <React.Fragment key={$index}>
                    <button type="button" class={z.cls} aria-pressed={z.pressed} onClick={z.pick}>{z.label}</button>
                  </React.Fragment>)}
                </div>
              </> : null}
              <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid #EFECE6; display: flex; align-items: center; gap: 16px">
                <span class="serif" style="font-size: 28px; font-weight: 400; white-space: nowrap">{p.priceLabel}</span>
                <button type="button" class={p.btnCls} style="flex: 1 1 auto" onClick={p.buy}>{p.ctaLabel}</button>
              </div>
              <span style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #7E6318; letter-spacing: .02em"><span aria-hidden="true" style="color: #D4AF37">✦</span>{p.perk}</span>
            </div>
          </article>
        </div>
      </React.Fragment>)}
    </div>
  </section>

  <section aria-label="איך נולדת מתנה" style="background: #1F3D2B; color: #E7E4DC">
    <div style="max-width: 1280px; margin: 0 auto; padding: 96px 24px; display: flex; flex-direction: column; gap: 56px">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px">
        <span dir="ltr" style="display: inline-flex; align-items: center; gap: 12px; font-size: 12px; letter-spacing: .32em; text-transform: uppercase; color: #ECD27A">The Maison</span>
        <h2 class="serif" style="margin: 0; font-size: clamp(36px, 4vw, 52px); color: #FAFAFA">כך נולדת מתנה של Bloom &amp; Box</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 48px">
        <div style="display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 1px solid rgba(212,175,55,.45)">
          <span class="serif" dir="ltr" style={`font-size: 44px; line-height: 1; color: ${v.gold}; text-align: right`}>I</span>
          <h3 class="serif" style="margin: 0; font-size: 28px; color: #FAFAFA">נבחר ביד</h3>
          <p style="margin: 0; color: #C9CCC5">כל פרח, כל בקבוק וכל נר עוברים דרך הידיים שלנו. מה שלא היינו נותנים לאנשים שאנחנו אוהבים, לא נכנס לקופסה.</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 1px solid rgba(212,175,55,.45)">
          <span class="serif" dir="ltr" style={`font-size: 44px; line-height: 1; color: ${v.gold}; text-align: right`}>II</span>
          <h3 class="serif" style="margin: 0; font-size: 28px; color: #FAFAFA">נארז כמו תכשיט</h3>
          <p style="margin: 0; color: #C9CCC5">נייר משי, סרט פשתן וכרטיס שנכתב במיוחד. הרגע שבו מרימים את המכסה הוא חלק מהמתנה, ואנחנו מתכננים אותו עד הפרט האחרון.</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 1px solid rgba(212,175,55,.45)">
          <span class="serif" dir="ltr" style={`font-size: 44px; line-height: 1; color: ${v.gold}; text-align: right`}>III</span>
          <h3 class="serif" style="margin: 0; font-size: 28px; color: #FAFAFA">מגיע מושלם</h3>
          <p style="margin: 0; color: #C9CCC5">לפני שהשליח יוצא, אתם מקבלים תמונה של המתנה בוואטסאפ. ככה אתם יודעים בדיוק מה יחכה להם בדלת.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="builder" style="max-width: 1280px; margin: 0 auto; padding: 104px 24px; display: flex; flex-direction: column; gap: 48px">
    <div style="display: flex; flex-direction: column; gap: 14px; max-width: 720px">
      <span class="bb-eyebrow" dir="ltr" style="align-self: flex-start">Bespoke Gift Box</span>
      <h2 class="serif" style="margin: 0; font-size: clamp(38px, 4.2vw, 56px); line-height: 1.1">אתם מכירים אותם הכי טוב. עצבו להם משהו שאין לאף אחד אחר.</h2>
      <p style="margin: 0; color: #4B514C; font-size: 17px">בוחרים קופסה, מוסיפים פרחים ומשקה, ממלאים במתוקים ופינוקים וכותבים כמה מילים מהלב. אנחנו נארוז הכול כאילו בחרנו בעצמנו.</p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start">
      <div style="flex: 999 1 560px; min-width: 0; display: flex; flex-direction: column; gap: 48px">

        <div style="display: flex; flex-direction: column; gap: 14px">
          <h3 class="serif" style="margin: 0; font-size: 28px; font-weight: 400"><span style="color: #9C7A1E">I.</span> בוחרים קופסה</h3>
          <p style="margin: 0; font-size: 14px; color: #5B615C">הקופסה קובעת כמה פריטים ייכנסו. סידור הפרחים נחשב פריט אחד.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px">
            {(v.bBoxes).map((b, $index) => <React.Fragment key={$index}>
              <button type="button" class={b.cls} aria-pressed={b.pressed} onClick={b.pick} style="min-height: 150px; gap: 8px">
                <span aria-hidden="true" style={`width: 52px; height: 34px; border-radius: 2px; background: ${b.swatch}; box-shadow: inset 0 0 0 1px rgba(212,175,55,.5)`}></span>
                <span class="serif" style="font-size: 20px; font-weight: 400">{b.name}</span>
                <span style="font-size: 13px; color: #5B615C">{b.desc}</span>
                <span style="font-size: 14px">{b.priceLabel}</span>
              </button>
            </React.Fragment>)}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px">
          <h3 class="serif" style="margin: 0; font-size: 28px; font-weight: 400"><span style="color: #9C7A1E">II.</span> פרחים בפנים</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px">
            {(v.bFlowers).map((fl, $index) => <React.Fragment key={$index}>
              <button type="button" class={fl.cls} aria-pressed={fl.pressed} onClick={fl.pick} style="min-height: 96px"><span style="font-weight: 500">{fl.name}</span><span style="font-size: 13px; color: #5B615C">{fl.desc}</span><span style="font-size: 14px">{fl.priceLabel}</span></button>
            </React.Fragment>)}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px">
            <h3 class="serif" style="margin: 0; font-size: 28px; font-weight: 400"><span style="color: #9C7A1E">III.</span> ממלאים את הקופסה</h3>
            <span style="font-size: 14px; color: #3F5A48; letter-spacing: .04em">{v.capLabel}</span>
          </div>
          <div role="group" aria-label="קטגוריות פריטים" style="display: flex; flex-wrap: wrap; gap: 8px">
            {(v.bCats).map((c, $index) => <React.Fragment key={$index}>
              <button type="button" class={c.cls} aria-pressed={c.pressed} onClick={c.pick}>{c.label}</button>
            </React.Fragment>)}
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px">
            {(v.bItems).map((i, $index) => <React.Fragment key={$index}>
              <button type="button" class={i.cls} aria-pressed={i.pressed} onClick={i.toggle}><span style="display: flex; flex-direction: column"><span style="font-weight: 500">{i.mark} {i.name}</span><span style="font-size: 13px; color: #5B615C">{i.desc}</span></span><span style="white-space: nowrap">{i.priceLabel}</span></button>
            </React.Fragment>)}
          </div>
          {(v.showFull) ? <>
            <p role="status" style="margin: 0; padding: 14px 18px; border-radius: 2px; background: #FBF5E3; border-right: 2px solid #D4AF37; color: #1E3A2B; font-size: 14px">הקופסה מלאה. אפשר להסיר פריט, או לעבור לקופסה גדולה יותר ולהמשיך לפנק.</p>
          </> : null}
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px">
          <h3 class="serif" style="margin: 0; font-size: 28px; font-weight: 400"><span style="color: #9C7A1E">IV.</span> הנגיעה האישית</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px">
            {(v.bTouches).map((t, $index) => <React.Fragment key={$index}>
              <button type="button" class={t.cls} aria-pressed={t.pressed} onClick={t.pick}><span>{t.name}</span><span>{t.priceLabel}</span></button>
            </React.Fragment>)}
          </div>
          <label for="gift-msg" style="font-size: 15px; font-weight: 400; color: #1E3A2B">מה לכתוב בכרטיס?</label>
          <textarea id="gift-msg" rows="3" maxlength="160" value={v.msg} onChange={v.setMsg} placeholder="לדוגמה: שתמיד יהיו לך סיבות לחגוג. אוהבת, נועה" style="width: 100%; padding: 14px 16px; border-radius: 2px; border: 1px solid #DEDBD3; background: #FFFFFF; color: #1E3A2B; font-size: 15px; resize: vertical; box-shadow: 0 1px 2px rgba(0,0,0,.03)"></textarea>
          <span style="font-size: 13px; color: #5B615C">{v.msgCount}</span>
        </div>
      </div>

      <aside aria-label="המארז שלכם" style={`flex: 1 1 340px; position: sticky; top: 104px; align-self: flex-start; border-radius: 4px; background: #FFFFFF; border-top: 2px solid ${v.gold}; padding: 28px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 50px 90px -50px rgba(27,36,30,.5), 0 2px 6px rgba(27,36,30,.05)`}>
        <span class="bb-eyebrow" dir="ltr" style="align-self: flex-start; font-size: 11px">Your Box</span>
        <span class="serif" style="font-size: 28px; line-height: 1.15">{v.bBoxName}</span>
        <div aria-label="תכולת הקופסה" style={`display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; padding: 12px; border-radius: 2px; background: ${v.bSwatch}; box-shadow: inset 0 0 0 1px rgba(212,175,55,.45)`}>
          {(v.slots).map((s, $index) => <React.Fragment key={$index}>
            <span style={s.style}>{s.label}</span>
          </React.Fragment>)}
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 14px">
          {(v.summaryLines).map((sl, $index) => <React.Fragment key={$index}>
            <div style="display: flex; justify-content: space-between; gap: 12px; color: #4B514C"><span>{sl.label}</span><span>{sl.price}</span></div>
          </React.Fragment>)}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid #EFECE6; padding-top: 14px">
          <span style="letter-spacing: .06em">סה״כ</span>
          <span class="serif" style="font-size: 38px; font-weight: 400">{v.bTotalLabel}</span>
        </div>
        <button type="button" class={v.bBtnCls} disabled={v.bOver} onClick={v.addBox}>{v.bCtaLabel}</button>
        <span style="font-size: 13px; color: #5B615C">נארז בסטודיו ביום ההזמנה. תמונה של המארז תגיע אליכם בוואטסאפ לפני היציאה.</span>
      </aside>
    </div>
  </section>

  <section id="subscribe" style="background: #F3F1EC">
    <div style="max-width: 1280px; margin: 0 auto; padding: 88px 24px; display: flex; flex-wrap: wrap; gap: 40px; align-items: center; justify-content: space-between">
      <div style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 14px">
        <span class="bb-eyebrow" dir="ltr" style="align-self: flex-start">The Subscription</span>
        <h2 class="serif" style="margin: 0; font-size: clamp(34px, 3.6vw, 48px); line-height: 1.12">הבית שלכם ראוי לפרחים טריים. בכל שבוע.</h2>
        <p style="margin: 0; color: #4B514C; font-size: 17px">מנוי Bloom &amp; Box מביא זר עונתי עד הדלת, הביתה או למשרד, מ-₪169 למשלוח. מדלגים כשנוסעים, מבטלים בקליק.</p>
      </div>
      <a href="#subscribe" class="bb-btn">להתחלת המנוי</a>
    </div>
  </section>

  <section aria-label="הזמנה" style="max-width: 1280px; margin: 0 auto; padding: 112px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 22px">
    <span aria-hidden="true" style={`width: 1px; height: 56px; background: ${v.gold}`}></span>
    <h2 class="serif" style="margin: 0; font-size: clamp(38px, 4.6vw, 64px); max-width: 820px; line-height: 1.08">יש מישהו שמחכה לשמוע ממך היום.</h2>
    <p style="margin: 0; color: #4B514C; font-size: 17px; max-width: 560px">הזמינו עד 13:00, והמתנה תגיע אליו עוד הערב.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center">
      <a href="#shop" class="bb-btn">לבחירת מתנה עכשיו</a>
      <a href="#builder" class="bb-btn-ghost">לעיצוב מארז אישי</a>
    </div>
  </section>

  <footer class="bb-foot" style="background: #183326; color: #C9CCC5">
    <div style="max-width: 1280px; margin: 0 auto; padding: 72px 24px 28px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; font-size: 14.5px">
      <div style="display: flex; flex-direction: column; gap: 10px">
        <span dir="ltr" style="font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 30px; letter-spacing: .14em; color: #FAFAFA; text-align: right">Bloom <span aria-label="and" style="display: inline-block; width: .66em; height: .8em; margin: 0 .04em; vertical-align: -.04em; color: #ECD27A"><svg viewBox="0 0 100 120" width="100%" height="100%" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><path fill="currentColor" stroke="none" d="M57 49C44 47 32 39 32 28C32 15 45 7 58 7C48 8.5 42 15 42 27C42 37 48 45 57 49Z"></path><path fill="currentColor" stroke="none" d="M57 50C36 50 17 63 17 81C17 100 34 112 52 112C40 110 31 98 31 81C31 66 42 54 57 50Z"></path><path d="M58 7C70 7 79 12 79 20C79 23.5 77.5 25.5 75 26.5" stroke-width="5"></path><path d="M52 112C66 112 75 103 78 92C81 81 88 72 97 70C100 69.5 101 72 99 74" stroke-width="5.5"></path></svg></span> Box</span>
        <span dir="ltr" style="font-size: 10px; letter-spacing: .42em; color: #ECD27A; text-align: right">THE ART OF LUXURY FLORAL</span>
        <span>[כתובת הסטודיו], תל אביב</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <strong style="color: #FAFAFA; font-weight: 400; letter-spacing: .1em">אזורי משלוח</strong>
        <span>תל אביב-יפו, רמת גן, גבעתיים, הרצליה, רעננה, כפר סבא, הוד השרון ועוד</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <strong style="color: #FAFAFA; font-weight: 400; letter-spacing: .1em">שירות</strong>
        <a href="#top">שאלות נפוצות</a>
        <a href="#top">הצהרת נגישות</a>
        <a href="#top">תקנון ומדיניות החזרות</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <strong style="color: #FAFAFA; font-weight: 400; letter-spacing: .1em">10% על ההזמנה הראשונה</strong>
        <span>הצטרפו לרשימה הפרטית שלנו וקבלו קוד בוואטסאפ או במייל, יחד עם תזכורת עדינה לפני כל חג.</span>
      </div>
    </div>
    <p style="margin: 0; padding: 20px 24px 32px; border-top: 1px solid rgba(212,175,55,.18); text-align: center; font-size: 12.5px; color: #A9ADA6">מכירת משקאות אלכוהוליים לבני 18 ומעלה בלבד. שתו באחריות.</p>
  </footer>

  <div class={`bb-toast ${v.toastCls}`} role="status" aria-live="polite">
    <span><span style="color: #ECD27A">✓</span> {v.toastText}</span>
    <button type="button" onClick={v.openCart}>לצפייה בעגלה</button>
  </div>

  <div class={`bb-overlay ${v.drawerCls}`} onClick={v.closeCart} aria-hidden="true"></div>
  <aside class={`bb-drawer ${v.drawerCls}`} aria-label="עגלת קניות" aria-hidden={v.drawerHidden} onKeyDown={v.drawerKey}>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 24px 28px; border-bottom: 1px solid #EEECE6">
      <div style="display: flex; flex-direction: column; gap: 2px">
        <span class="bb-eyebrow" dir="ltr" style="font-size: 10.5px; align-self: flex-start">Your Selection</span>
        <h2 class="serif" style="margin: 0; font-size: 32px; font-weight: 300">העגלה שלך</h2>
      </div>
      <button type="button" onClick={v.closeCart} aria-label="סגירת העגלה" style="width: 44px; height: 44px; border-radius: 999px; border: 1px solid #DEDBD3; background: #FFFFFF; color: #1E3A2B; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
    </div>

    {(v.done) ? <>
      <div style="padding: 56px 28px; display: flex; flex-direction: column; gap: 14px; text-align: center; align-items: center">
        <span aria-hidden="true" style={`width: 1px; height: 40px; background: ${v.gold}`}></span>
        <span class="serif" style="font-size: 34px">ההזמנה אצלנו. תודה.</span>
        <span style="color: #4B514C">אנחנו כבר מתחילים לארוז. תמונה של המתנה תגיע אליכם בוואטסאפ לפני שהיא יוצאת. {v.doneNote}</span>
        <button type="button" class="bb-btn-ghost bb-btn-sm" onClick={v.reset} style="margin-top: 10px">להמשיך לגלוש</button>
      </div>
    </> : null}

    {(v.showEmpty) ? <>
      <div style="padding: 64px 28px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center">
        <span class="serif" style="font-size: 28px">העגלה מחכה למתנה הראשונה</span>
        <span style="color: #4B514C">אפשר להתחיל מזר אחד, ממארז מוכן, או לעצב אחד משלכם.</span>
        <button type="button" class="bb-btn bb-btn-sm" onClick={v.closeCart}>לגלות את הקולקציה</button>
      </div>
    </> : null}

    {(v.showCart) ? <>
      <div style="padding: 20px 28px 22px; display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid #EEECE6; background: linear-gradient(180deg, #FBF8EE, #FAFAFA)">
        <span role="status" style="font-size: 14px; color: #1E3A2B; letter-spacing: .02em">{v.perkMessage}</span>
        <div style="position: relative; height: 3px; margin: 6px 0 4px; border-radius: 999px; background: #E9E6DF">
          <div style={`height: 3px; width: ${v.barPct}%; background: linear-gradient(270deg, #C9A532, #ECD27A); border-radius: 999px; transition: width .9s cubic-bezier(.22,1,.36,1)`}></div>
          <span aria-hidden="true" style={`position: absolute; top: -5px; right: ${v.giftPos}%; width: 13px; height: 13px; margin-right: -6.5px; border-radius: 999px; background: ${v.giftDot}; border: 1px solid #C9A532; transition: background .6s ease`}></span>
          {(v.showShipMark) ? <>
            <span aria-hidden="true" style={`position: absolute; top: -5px; left: -6px; width: 13px; height: 13px; border-radius: 999px; background: ${v.shipDot}; border: 1px solid #C9A532; transition: background .6s ease`}></span>
          </> : null}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px 20px; font-size: 12px; color: #5B615C">
          <span><span aria-hidden="true" style={`color: ${v.giftMark}`}>◆</span> מתנה ב-₪300</span>
          {(v.showShipMark) ? <><span><span aria-hidden="true" style={`color: ${v.shipMark}`}>◆</span> משלוח חינם ב-₪350</span></> : null}
        </div>
        {(v.perkChoosable) ? <>
          <div role="group" aria-label="בחירת המתנה שלכם" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
            {(v.perkOpts).map((g, $index) => <React.Fragment key={$index}>
              <button type="button" class={g.cls} aria-pressed={g.pressed} onClick={g.pick} style="padding: 12px 14px; min-height: 68px"><span style="font-weight: 500">{g.name}</span><span style="font-size: 12.5px; color: #5B615C">{g.desc}</span></button>
            </React.Fragment>)}
          </div>
        </> : null}
      </div>

      <div style="padding: 4px 28px; display: flex; flex-direction: column">
        {(v.lines).map((l, $index) => <React.Fragment key={$index}>
          <div class="bb-line" style="display: flex; gap: 14px; padding: 18px 0; border-bottom: 1px solid #EEECE6; align-items: center">
            <div aria-hidden="true" style={`width: 68px; height: 84px; border-radius: 2px; background: linear-gradient(165deg, ${l.tint}, #FFFFFF); flex: none; box-shadow: inset 0 0 0 1px rgba(212,175,55,.35)`}></div>
            <div style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 4px; min-width: 0">
              <span class="serif" style="font-size: 20px; font-weight: 400; line-height: 1.2">{l.name}</span>
              <span style="font-size: 12.5px; color: #5B615C">{l.note}</span>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px">
                <button type="button" class="bb-qty" onClick={l.inc} aria-label="הוספת יחידה">+</button>
                <span style="min-width: 20px; text-align: center">{l.qty}</span>
                <button type="button" class="bb-qty" onClick={l.dec} aria-label="הפחתת יחידה">−</button>
                <button type="button" onClick={l.remove} style="margin-right: auto; min-height: 32px; border: none; background: transparent; color: #5B615C; font-size: 12.5px; text-decoration: underline">הסרה</button>
              </div>
            </div>
            <span class="serif" style="font-size: 21px; white-space: nowrap">{l.totalLabel}</span>
          </div>
        </React.Fragment>)}
        {(v.perkChosen) ? <>
          <div class="bb-line" style="display: flex; gap: 14px; padding: 18px 0; border-bottom: 1px solid #EEECE6; align-items: center">
            <div aria-hidden="true" style="width: 68px; height: 84px; border-radius: 2px; background: linear-gradient(165deg, #F6EBC8, #FFFFFF); flex: none; box-shadow: inset 0 0 0 1px rgba(212,175,55,.6); display: flex; align-items: center; justify-content: center; color: #B8941F; font-size: 22px">✦</div>
            <div style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 4px; min-width: 0">
              <span class="serif" style="font-size: 20px; font-weight: 400; line-height: 1.2">{v.perkItemName}</span>
              <span style="font-size: 12.5px; color: #7E6318">{v.perkItemNote}</span>
              {(v.perkSwappable) ? <><button type="button" onClick={v.perkRemove} style="align-self: flex-start; margin-top: 6px; min-height: 32px; padding: 0; border: none; background: transparent; color: #5B615C; font-size: 12.5px; text-decoration: underline">להחליף מתנה</button></> : null}
            </div>
            <span class="serif" style="font-size: 21px; white-space: nowrap; color: #7E6318">₪0</span>
          </div>
        </> : null}
      </div>

      {(v.showCardUpsell) ? <>
      <div style="margin: 12px 28px; padding: 16px 18px; border-radius: 2px; background: #FFFFFF; box-shadow: 0 16px 34px -26px rgba(27,36,30,.45); display: flex; gap: 12px; align-items: center; justify-content: space-between">
        <span style="font-size: 14px; color: #1E3A2B">כמה מילים בכתב יד הופכות מתנה לזיכרון.</span>
        <button type="button" class="bb-btn-ghost bb-btn-sm" onClick={v.addCard} style="min-height: 40px">כרטיס · ₪15</button>
      </div>
      </> : null}

      <div style="padding: 16px 28px; display: flex; flex-direction: column; gap: 12px">
        <span style="font-weight: 400; letter-spacing: .06em">איך המתנה מגיעה?</span>
        <div role="group" aria-label="שיטת קבלה" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
          {(v.methods).map((m, $index) => <React.Fragment key={$index}>
            <button type="button" class={m.cls} aria-pressed={m.pressed} onClick={m.pick} style="min-height: 68px; padding: 12px 14px"><span style="font-weight: 500">{m.name}</span><span style="font-size: 12.5px; color: #5B615C">{m.desc}</span></button>
          </React.Fragment>)}
        </div>
        <span style="font-size: 13.5px; color: #5B615C">{v.slotTitle}</span>
        <div role="group" aria-label="חלון זמן" style="display: flex; flex-wrap: wrap; gap: 8px">
          {(v.slots2).map((s, $index) => <React.Fragment key={$index}>
            <button type="button" class={s.cls} aria-pressed={s.pressed} onClick={s.pick}>{s.label}</button>
          </React.Fragment>)}
        </div>
      </div>

      <div style="margin-top: auto; padding: 22px 28px 26px; border-top: 1px solid #EEECE6; display: flex; flex-direction: column; gap: 8px; background: #FFFFFF">
        <div style="display: flex; justify-content: space-between; font-size: 14.5px; color: #4B514C"><span>סכום ביניים</span><span>{v.subtotalLabel}</span></div>
        {(v.showCardDiscount) ? <>
          <div style="display: flex; justify-content: space-between; font-size: 14.5px; color: #7E6318"><span>✦ כרטיס בכתב יד, עלינו</span><span>{v.cardDiscountLabel}</span></div>
        </> : null}
        {(v.perkChosen) ? <>
          <div style="display: flex; justify-content: space-between; font-size: 14.5px; color: #7E6318"><span>✦ {v.perkItemName}</span><span>₪0</span></div>
        </> : null}
        {(v.perkPending) ? <>
          <span style="font-size: 13px; color: #7E6318">✦ בחרו למעלה את המתנה שלכם, היא תתווסף לעגלה ב-₪0</span>
        </> : null}
        <div style="display: flex; justify-content: space-between; font-size: 14.5px; color: #4B514C"><span>{v.shipLabel}</span><span>{v.shipFeeLabel}</span></div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px"><span style="letter-spacing: .06em">סה״כ</span><span class="serif" style="font-size: 36px">{v.totalLabel}</span></div>
        <button type="button" class="bb-btn" onClick={v.checkout} style="margin-top: 8px; width: 100%">להשלמת ההזמנה בתשלום מאובטח</button>
        <span style="text-align: center; font-size: 12.5px; color: #5B615C; letter-spacing: .04em">Apple Pay · Google Pay · Bit · כרטיס אשראי</span>
        {(v.hasAlcohol) ? <>
          <span style="text-align: center; font-size: 12px; color: #5B615C">ההזמנה כוללת אלכוהול: המסירה לבני 18 ומעלה בלבד.</span>
        </> : null}
      </div>
    </> : null}
  </aside>
</div>
  );
};
createRoot(document.getElementById('root')).render(<Component />);
