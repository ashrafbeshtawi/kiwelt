'use client';

import Nav from './Nav';
import Footer from './Footer';
import PageIcon from './PageIcon';
import { useLang } from '@/lib/useLang';
import {
  LuPhoneCall,
  LuSearch,
  LuClipboardCheck,
  LuCode,
  LuFlaskConical,
  LuMonitorPlay,
  LuRocket,
  LuRotateCw,
  LuChevronDown,
} from 'react-icons/lu';

const STEP_ICONS = {
  intro: LuPhoneCall,
  analysis: LuSearch,
  plan: LuClipboardCheck,
  build: LuCode,
  test: LuFlaskConical,
  demo: LuMonitorPlay,
  deploy: LuRocket,
};

function StepCard({ step }) {
  const Icon = STEP_ICONS[step.icon];
  return (
    <article className="phase">
      <span className="phase-icon" aria-hidden>
        {Icon ? <Icon /> : null}
      </span>
      <div className="phase-body">
        <div className="phase-meta">
          <span className="phase-num">{step.num}</span>
          <span className="phase-time">{step.time}</span>
        </div>
        <h3 className="phase-title">{step.title}</h3>
        <p className="phase-text">{step.body}</p>
      </div>
    </article>
  );
}

function Connector() {
  return (
    <div className="phase-connector" aria-hidden>
      <LuChevronDown />
    </div>
  );
}

export default function ProcessPage() {
  const { lang, setLang, t } = useLang();
  const p = t.process;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="process" />
      <main className="page shell">
        <header className="page-head">
          <PageIcon name="process" />
          <div className="kicker">{p.kicker}</div>
          <h1 className="h1">{p.title}</h1>
          <p className="page-sub">{p.sub}</p>
        </header>

        <section className="flow">
          {p.pre.map((step, i) => (
            <div key={step.num} className="flow-row">
              <StepCard step={step} />
              {i < p.pre.length - 1 && <Connector />}
            </div>
          ))}

          <Connector />

          <div className="flow-cycle">
            <div className="cycle-header">
              <span className="cycle-icon" aria-hidden><LuRotateCw /></span>
              <span className="cycle-label">{p.cycleLabel}</span>
            </div>
            {p.cycle.map((step, i) => (
              <div key={step.num} className="flow-row">
                <StepCard step={step} />
                {i < p.cycle.length - 1 && <Connector />}
              </div>
            ))}
            <div className="cycle-loop" aria-hidden>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  d="M 90 5 Q 99 5 99 20 Q 99 35 90 35 L 12 35 Q 1 35 1 20 Q 1 5 12 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeDasharray="3 4"
                />
                <path d="M 12 1 L 6 5 L 12 9 Z" fill="currentColor" />
              </svg>
              <span className="cycle-loop-label">{p.cycleNote}</span>
            </div>
          </div>

          <Connector />

          {p.post.map((step) => (
            <div key={step.num} className="flow-row">
              <StepCard step={step} />
            </div>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
