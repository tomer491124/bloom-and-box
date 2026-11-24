import re, sys
src = open(sys.argv[1], encoding='utf-8').read()
xdc = re.search(r'<x-dc>(.*)</x-dc>', src, re.S).group(1)
helmet = re.search(r'<helmet>(.*?)</helmet>', xdc, re.S).group(1)
tpl = re.sub(r'<helmet>.*?</helmet>', '', xdc, flags=re.S).strip()
script = re.search(r'data-dc-script[^>]*>(.*?)</script>', src, re.S).group(1)
scope = []
def expr(e):
    e = e.strip()
    if e in ('true', 'false') or re.match(r'^-?\d', e): return e
    head = re.match(r'[$\w]+', e).group(0)
    if head in scope or head == '$index': return e
    return 'v.' + e
HOLE = re.compile(r'\{\{\s*(.*?)\s*\}\}')
VOID = {'br', 'img', 'input', 'meta', 'link', 'hr'}
def conv_attrs(tag):
    def rep(m):
        sp, name, val = m.group(1), m.group(2), m.group(3)
        if '{{' not in val: return m.group(0)
        whole = HOLE.fullmatch(val.strip())
        if whole: return f'{sp}{name}={{{expr(whole.group(1))}}}'
        t = HOLE.sub(lambda h: '${' + expr(h.group(1)) + '}', val.replace('`', '\\`'))
        return f'{sp}{name}={{`{t}`}}'
    return re.sub(r'(\s)([\w:.-]+)="([^"]*)"', rep, tag)
out = []; pos = 0
for m in re.finditer(r'<[^>]+>', tpl):
    text = tpl[pos:m.start()]
    if text:
        if re.search(r'[>}]', HOLE.sub('', text)): raise SystemExit('bad text char: ' + text[:80])
        out.append(HOLE.sub(lambda h: '{' + expr(h.group(1)) + '}', text))
    tag = m.group(0); pos = m.end()
    if tag.startswith('<sc-for'):
        lst = re.search(r'list="\{\{\s*(.*?)\s*\}\}"', tag).group(1)
        var = re.search(r'as="([^"]+)"', tag).group(1)
        out.append('{(' + expr(lst) + ').map((' + var + ', $index) => <React.Fragment key={$index}>'); scope.append(var)
    elif tag == '</sc-for>':
        out.append('</React.Fragment>)}'); scope.pop()
    elif tag.startswith('<sc-if'):
        val = re.search(r'value="\{\{\s*(.*?)\s*\}\}"', tag).group(1)
        out.append('{(' + expr(val) + ') ? <>'); scope.append(None)
    elif tag == '</sc-if>':
        out.append('</> : null}'); scope.pop()
    else:
        name = re.match(r'</?([\w-]+)', tag).group(1).lower()
        tag = conv_attrs(tag)
        if name in VOID and not tag.endswith('/>'): tag = tag[:-1].rstrip() + ' />'
        out.append(tag)
out.append(tpl[pos:])
jsx = ''.join(out)
app = "import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport { h, Fragment } from './h.js';\nconst DCLogic = React.Component;\n" + script + "\nComponent.prototype.render = function () {\n  const v = this.renderVals();\n  return (\n" + jsx + "\n  );\n};\ncreateRoot(document.getElementById('root')).render(<Component />);\n"
open('src/app.jsx', 'w', encoding='utf-8').write(app)
open('helmet.html', 'w', encoding='utf-8').write(helmet)
print('ok')
