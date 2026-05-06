'use client';

import Nav from './Nav';
import Footer from './Footer';
import PageIcon from './PageIcon';
import { useLang } from '@/lib/useLang';
import { TOOLS } from '@/lib/toolsRegistry';

export default function ToolsPage() {
  const { lang, setLang, t } = useLang();
  const tools = t.tools;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="tools" />
      <main className="page shell">
        <header className="page-head">
          <PageIcon name="tools" />
          <div className="kicker">{tools.kicker}</div>
          <h1 className="h1">{tools.title}</h1>
          <p className="page-sub">{tools.sub}</p>
        </header>

        <section className="tool-groups">
          {tools.groups.map((group) => (
            <article key={group.id} className="tool-group">
              <header className="tool-group-head">
                <h2 className="tool-group-title">{group.title}</h2>
                <p className="tool-group-desc">{group.desc}</p>
              </header>
              <div className="tool-grid">
                {group.tools.map((id) => {
                  const tool = TOOLS[id];
                  if (!tool) return null;
                  const Icon = tool.icon;
                  return (
                    <div
                      key={id}
                      className="tool"
                      style={{ '--tool-color': tool.color }}
                    >
                      <span className="tool-icon" aria-hidden>
                        <Icon />
                      </span>
                      <span className="tool-name">{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
