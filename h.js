import React from 'react';
export const Fragment = React.Fragment;
const KEEP = /^(aria-|data-)/;
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const RENAME = { class: 'className', for: 'htmlFor', maxlength: 'maxLength', tabindex: 'tabIndex', readonly: 'readOnly' };
function styleObj(str) {
  const o = {};
  str.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const k = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!k) return;
    o[k.startsWith('--') ? k : camel(k)] = val;
  });
  return o;
}
export function h(type, props, ...children) {
  if (props) {
    const p = {};
    for (const k in props) {
      let v = props[k];
      let key = RENAME[k] || k;
      if (key === 'style' && typeof v === 'string') v = styleObj(v);
      else if (key.includes('-') && !KEEP.test(key)) key = camel(key);
      if (key === 'aria-hidden' && typeof v === 'boolean') v = String(v);
      p[key] = v;
    }
    props = p;
  }
  return React.createElement(type, props, ...children);
}
