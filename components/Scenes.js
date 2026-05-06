// KI Welt — full-stage SVG scenes (before | after) using SMIL animations.
// SMIL is the most reliable cross-browser animation primitive inside SVG.

// ---------- Primitives ----------
function Person({ x = 0, y = 0, color = '#a8a8a8', scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-16" r="9" fill={color} />
      <path d="M -14 14 C -14 0, 14 0, 14 14 L 14 22 L -14 22 Z" fill={color} />
    </g>
  );
}

function MovingDoc({ w = 22, h = 28, hue = '#e8e4dc', line = '#7a7a7a', begin = '0s', dur = '3s', path, fadeOut = true }) {
  return (
    <g>
      <g>
        <rect x={-w/2} y={-h/2} width={w} height={h} rx="2" fill={hue} stroke="#0a0a0a" strokeWidth="0.5" />
        <line x1={-w/2 + 4} y1={-h/2 + 6}  x2={w/2 - 4} y2={-h/2 + 6}  stroke={line} strokeWidth="1" />
        <line x1={-w/2 + 4} y1={-h/2 + 11} x2={w/2 - 6} y2={-h/2 + 11} stroke={line} strokeWidth="1" />
        <line x1={-w/2 + 4} y1={-h/2 + 16} x2={w/2 - 8} y2={-h/2 + 16} stroke={line} strokeWidth="1" />
        <line x1={-w/2 + 4} y1={-h/2 + 21} x2={w/2 - 5} y2={-h/2 + 21} stroke={line} strokeWidth="1" />
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} rotate="0" />
        {fadeOut && (
          <animate attributeName="opacity"
                   values="0;1;1;0"
                   keyTimes="0;0.1;0.85;1"
                   dur={dur} begin={begin} repeatCount="indefinite" />
        )}
      </g>
    </g>
  );
}

function AICore({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="kw-ai-ring">
        <circle r="56" fill="none" stroke="#22d3a5" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4 8" />
      </g>
      <g className="kw-ai-ring2">
        <circle r="68" fill="none" stroke="#22d3a5" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
      </g>
      <g className="kw-ai-core">
        <path d="M0 -32 L28 -16 L28 16 L0 32 L-28 16 L-28 -16 Z" fill="#0d0d0d" stroke="#22d3a5" strokeWidth="1.8" />
        <path d="M0 -20 L17 -10 L17 10 L0 20 L-17 10 L-17 -10 Z" fill="rgba(34,211,165,0.10)" stroke="#22d3a5" strokeOpacity="0.55" strokeWidth="1" />
        <circle r="4" fill="#22d3a5" />
      </g>
    </g>
  );
}

function Clock({ x, y, color = '#22d3a5', dur = '1s', label, sub }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="28" fill="#0a0a0a" stroke={color} strokeWidth="1.6" />
      <line x1="0" y1="0" x2="0" y2="-19" stroke={color} strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={dur} repeatCount="indefinite" />
      </line>
      <line x1="0" y1="0" x2="13" y2="0" stroke={color} strokeWidth="1.4" />
      <text x="40" y="-2" fontFamily="JetBrains Mono" fontSize="17" fill={color} letterSpacing="2" fontWeight="600">{label}</text>
      <text x="40" y="18" fontFamily="JetBrains Mono" fontSize="13" fill="#9a9a9a" letterSpacing="1.5">{sub}</text>
    </g>
  );
}

function FrameBefore({ children }) {
  return (
    <g>
      <rect x="0" y="0" width="500" height="540" fill="rgba(255,92,122,0.025)" />
      <text x="24" y="38" fontFamily="JetBrains Mono" fontSize="16" fill="#ff5c7a" letterSpacing="4" fontWeight="700">VORHER</text>
      {children}
    </g>
  );
}
function FrameAfter({ children }) {
  return (
    <g transform="translate(500 0)">
      <rect x="0" y="0" width="500" height="540" fill="rgba(34,211,165,0.025)" />
      <text x="24" y="38" fontFamily="JetBrains Mono" fontSize="16" fill="#22d3a5" letterSpacing="4" fontWeight="700">NACHHER</text>
      {children}
    </g>
  );
}

// ============================================================
// SCENE 1 — DOCUMENTS
// ============================================================
function DocsScene() {
  return (
    <svg className="stage-svg scene-enter" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet">
      <FrameBefore>
        {Array.from({ length: 7 }).map((_, i) => {
          const x = 80 + (i * 50);
          const begin = `${(i * 0.45).toFixed(2)}s`;
          return (
            <g key={i}>
              <g opacity="0">
                <rect x="-22" y="-14" width="44" height="28" rx="1" fill="#e8e4dc" stroke="#3a3a3a" strokeWidth="0.4" />
                <line x1="-16" y1="-8" x2="16" y2="-8" stroke="#7a7a7a" strokeWidth="0.6" />
                <line x1="-16" y1="-3" x2="12" y2="-3" stroke="#7a7a7a" strokeWidth="0.6" />
                <line x1="-16" y1="2"  x2="14" y2="2"  stroke="#7a7a7a" strokeWidth="0.6" />
                <line x1="-16" y1="7"  x2="8"  y2="7"  stroke="#7a7a7a" strokeWidth="0.6" />
                <animateMotion dur="3.5s" begin={begin} repeatCount="indefinite"
                               path={`M ${x} 60 L ${x} 320`} />
                <animate attributeName="opacity"
                         values="0;1;1;0.8;0"
                         keyTimes="0;0.15;0.6;0.85;1"
                         dur="3.5s" begin={begin} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate"
                                  from={(i * 23) % 30 - 15} to={(i * 41) % 50 - 25}
                                  dur="3.5s" begin={begin} repeatCount="indefinite" />
              </g>
            </g>
          );
        })}

        <g transform="translate(250 380)">
          <rect x="-180" y="0" width="360" height="6" fill="#1a1a1a" />
          {[
            { x: -120, y: -6, r: -8 }, { x: -90, y: -10, r: 4 },
            { x: -60, y: -7, r: -3 }, { x: -30, y: -12, r: 9 },
            { x: 0, y: -6, r: -5 }, { x: 30, y: -10, r: 6 },
            { x: 60, y: -8, r: -2 }, { x: 90, y: -12, r: 11 },
            { x: 120, y: -7, r: -7 },
            { x: -40, y: -22, r: 3 }, { x: 20, y: -24, r: -6 }, { x: 70, y: -22, r: 8 },
            { x: -10, y: -34, r: 0 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
              <rect x="-22" y="-14" width="44" height="28" rx="1" fill="#e8e4dc" stroke="#3a3a3a" strokeWidth="0.4" />
              <line x1="-16" y1="-8" x2="16" y2="-8" stroke="#7a7a7a" strokeWidth="0.6" />
              <line x1="-16" y1="0"  x2="12" y2="0"  stroke="#7a7a7a" strokeWidth="0.6" />
            </g>
          ))}
        </g>

        <g transform="translate(250 290)">
          <Person x={0} y={0} color="#7a7a7a" scale={1.4} />
          <g transform="translate(50 -50)">
            <circle cx="0" cy="0" r="14" fill="#0a0a0a" stroke="#ff5c7a" strokeWidth="1" />
            <text x="0" y="5" textAnchor="middle" fontFamily="Inter" fontSize="16" fill="#ff5c7a" fontWeight="600">?</text>
            <circle cx="-12" cy="10" r="3" fill="#0a0a0a" stroke="#ff5c7a" strokeWidth="1" />
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </g>
          <text x="0" y="66" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#a8a8a8" letterSpacing="1.5" fontWeight="600">SACHBEARBEITER</text>
        </g>

        <Clock x={360} y={478} color="#ff5c7a" dur="6s" label="~ 4 STD" sub="PRO STAPEL" />
      </FrameBefore>

      <FrameAfter>
        <g transform="translate(80 270)">
          <text x="0" y="-90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="15" fill="#9a9a9a" letterSpacing="2" fontWeight="600">EINGANG</text>
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x="-30" y={-72 + i * 5} width="60" height="4" rx="0.5" fill="#e8e4dc" stroke="#3a3a3a" strokeWidth="0.3" />
          ))}
          <rect x="-36" y="-38" width="72" height="6" rx="1" fill="#1a1a1a" stroke="#2a2a2a" />
        </g>

        <MovingDoc w={20} h={26} hue="#e8e4dc" line="#7a7a7a" begin="0s"   dur="2.4s" path="M 80 250 Q 165 250 250 270" />
        <MovingDoc w={20} h={26} hue="#e8e4dc" line="#7a7a7a" begin="0.8s" dur="2.4s" path="M 80 250 Q 165 250 250 270" />
        <MovingDoc w={20} h={26} hue="#e8e4dc" line="#7a7a7a" begin="1.6s" dur="2.4s" path="M 80 250 Q 165 250 250 270" />

        <AICore x={250} y={270} scale={1.5} />
        <text x="250" y="168" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="16" fill="#22d3a5" letterSpacing="3" fontWeight="700">KI WELT</text>
        <text x="250" y="188" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill="#9a9a9a" letterSpacing="2" fontWeight="500">OCR · LESEN · ZUORDNEN</text>

        <MovingDoc w={14} h={18} hue="#0e1a16" line="#22d3a5" begin="0.4s" dur="2.4s" path="M 250 270 Q 320 200 425 148" />
        <MovingDoc w={14} h={18} hue="#0e1a16" line="#22d3a5" begin="1.2s" dur="2.4s" path="M 250 270 Q 320 270 425 270" />
        <MovingDoc w={14} h={18} hue="#0e1a16" line="#22d3a5" begin="2.0s" dur="2.4s" path="M 250 270 Q 320 340 425 392" />

        <g transform="translate(370 118)">
          <text x="0" y="-10" fontFamily="JetBrains Mono" fontSize="13" fill="#22d3a5" letterSpacing="2" fontWeight="600">RECHNUNGEN</text>
          <rect x="0" y="0" width="110" height="60" rx="4" fill="#0e1a16" stroke="#22d3a5" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
        <g transform="translate(370 240)">
          <text x="0" y="-10" fontFamily="JetBrains Mono" fontSize="13" fill="#22d3a5" letterSpacing="2" fontWeight="600">VERTRÄGE</text>
          <rect x="0" y="0" width="110" height="60" rx="4" fill="#0e1a16" stroke="#22d3a5" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
        <g transform="translate(370 362)">
          <text x="0" y="-10" fontFamily="JetBrains Mono" fontSize="13" fill="#22d3a5" letterSpacing="2" fontWeight="600">SUPPORT</text>
          <rect x="0" y="0" width="110" height="60" rx="4" fill="#0e1a16" stroke="#22d3a5" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>

        <g stroke="#22d3a5" strokeWidth="1" strokeOpacity="0.18" fill="none" strokeDasharray="2 4">
          <line x1="290" y1="270" x2="370" y2="148" />
          <line x1="290" y1="270" x2="370" y2="270" />
          <line x1="290" y1="270" x2="370" y2="392" />
        </g>

        <Clock x={360} y={478} color="#22d3a5" dur="1s" label="~ 90 SEK" sub="SORTIERT" />
      </FrameAfter>
    </svg>
  );
}

// ============================================================
// SCENE 2 — CHAT
// ============================================================
function ChatScene() {
  return (
    <svg className="stage-svg scene-enter" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet">
      <FrameBefore>
        <Person x={60} y={270} color="#a8a8a8" scale={1.6} />
        <text x="60" y="332" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#a8a8a8" letterSpacing="1.5" fontWeight="600">KUNDE</text>

        <g transform="translate(140 130)">
          <rect x="0" y="0" width="180" height="260" rx="6" fill="#0d0d0d" stroke="#2a2a2a" />
          <text x="90" y="24" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="#9a9a9a" letterSpacing="2" fontWeight="600">IVR MENÜ</text>
          {[1,2,3,4,5,6,7].map(i => (
            <g key={i}>
              <rect x="10" y={36 + (i-1)*30} width="160" height="24" rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.4" />
              <text x="18" y={52 + (i-1)*30} fontFamily="JetBrains Mono" fontSize="12" fill="#9a9a9a">TASTE {i}</text>
            </g>
          ))}
          <rect x="10" y="0" width="160" height="24" rx="2" fill="rgba(255,92,122,0.15)" stroke="#ff5c7a" strokeWidth="0.8">
            <animate attributeName="y" values="36;66;96;126;156;186;216;36"
                     keyTimes="0;0.14;0.28;0.42;0.56;0.7;0.85;1"
                     dur="6s" repeatCount="indefinite" />
          </rect>
        </g>

        <Person x={380} y={140} color="#7a7a7a" scale={1.4} />
        <Person x={440} y={250} color="#7a7a7a" scale={1.4} />
        <Person x={380} y={360} color="#7a7a7a" scale={1.4} />
        <g fontFamily="JetBrains Mono" fontSize="13" fill="#9a9a9a" letterSpacing="1.5" fontWeight="600">
          <text x="380" y="100" textAnchor="middle">ABT. A</text>
          <text x="440" y="210" textAnchor="middle">ABT. B</text>
          <text x="380" y="406" textAnchor="middle">ABT. C</text>
        </g>

        <g>
          <rect x="-40" y="-12" width="80" height="22" rx="3" fill="#1a0e10" stroke="#ff5c7a" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#ff5c7a" fontWeight="600">Ticket #421</text>
          <animateMotion dur="6s" repeatCount="indefinite"
                         path="M 320 270 L 380 140 L 440 250 L 380 360 L 320 270 Z" />
        </g>

        <Clock x={80} y={478} color="#ff5c7a" dur="6s" label="~ 18 MIN" sub="WARTEZEIT" />
      </FrameBefore>

      <FrameAfter>
        <Person x={50} y={270} color="#e5e5e5" scale={1.6} />
        <text x="50" y="332" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#22d3a5" letterSpacing="1.5" fontWeight="600">KUNDE</text>

        <g>
          <rect x="90" y="210" width="180" height="40" rx="6" fill="#1a1a1a" stroke="#2a2a2a" />
          <text x="180" y="235" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="#cfcfcf" letterSpacing="1" fontWeight="500">WO IST MEIN PAKET?</text>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.85;1" dur="4s" begin="0s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="80" y="294" width="210" height="40" rx="6" fill="#0e1f1a" stroke="#22d3a5" />
          <text x="185" y="319" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="#22d3a5" letterSpacing="1" fontWeight="600">MORGEN 14 UHR</text>
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.25;0.4;0.85;1" dur="4s" begin="0s" repeatCount="indefinite" />
        </g>

        <AICore x={300} y={270} scale={1.4} />

        {[
          { y: 110, label: 'PAYMENT' },
          { y: 178, label: 'CRM' },
          { y: 246, label: 'E-MAIL' },
          { y: 314, label: 'SHIPPING' },
        ].map((tool, i) => (
          <g key={i} transform={`translate(370 ${tool.y})`}>
            <rect x="0" y="0" width="120" height="54" rx="6" fill="#0d0d0d" stroke="#2a2a2a" />
            <circle cx="16" cy="27" r="6" fill="#22d3a5">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <text x="32" y="32" fontFamily="JetBrains Mono" fontSize="14" fill="#cfcfcf" letterSpacing="1.5" fontWeight="600">{tool.label}</text>
          </g>
        ))}

        {[137, 205, 273, 341].map((ty, i) => (
          <circle key={i} r="3" fill="#22d3a5">
            <animateMotion dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                           path={`M 332 270 L 370 ${ty}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}

        <g stroke="#22d3a5" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeDasharray="3 4">
          <line x1="332" y1="270" x2="370" y2="137" />
          <line x1="332" y1="270" x2="370" y2="205" />
          <line x1="332" y1="270" x2="370" y2="273" />
          <line x1="332" y1="270" x2="370" y2="341" />
        </g>

        <Clock x={80} y={478} color="#22d3a5" dur="1s" label="~ 22 SEK" sub="ERSTANTWORT" />
      </FrameAfter>
    </svg>
  );
}

// ============================================================
// SCENE 3 — SECURITY
// ============================================================
function SecScene() {
  return (
    <svg className="stage-svg scene-enter" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet">
      <FrameBefore>
        <g transform="translate(250 270)">
          <rect x="-200" y="-150" width="400" height="300" rx="10" fill="#0d0d0d" stroke="#2a2a2a" />
          <text x="-186" y="-126" fontFamily="JetBrains Mono" fontSize="14" fill="#9a9a9a" letterSpacing="2" fontWeight="600">PRODUKTIVSYSTEM</text>

          {Array.from({ length: 16 }).map((_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            const flaw = [1, 5, 6, 11, 14].includes(i);
            return (
              <g key={i} transform={`translate(${-186 + col * 95} ${-100 + row * 60})`}>
                <rect x="0" y="0" width="82" height="48" rx="4" fill={flaw ? '#1a0e10' : '#1a1a1a'} stroke={flaw ? '#ff5c7a' : '#2a2a2a'} strokeWidth="0.8" />
                <line x1="8" y1="12" x2="60" y2="12" stroke={flaw ? '#ff5c7a' : '#3a3a3a'} strokeWidth="0.8" />
                <line x1="8" y1="20" x2="50" y2="20" stroke={flaw ? '#ff5c7a' : '#3a3a3a'} strokeWidth="0.8" />
                <line x1="8" y1="28" x2="64" y2="28" stroke={flaw ? '#ff5c7a' : '#3a3a3a'} strokeWidth="0.8" />
                <line x1="8" y1="36" x2="42" y2="36" stroke={flaw ? '#ff5c7a' : '#3a3a3a'} strokeWidth="0.8" />
                {flaw && (
                  <g className="kw-flaw" style={{ animationDelay: `${i * 200}ms` }}>
                    <circle cx="72" cy="10" r="4" fill="#ff5c7a" />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        <g transform="translate(80 478)">
          <rect x="-44" y="-32" width="88" height="66" rx="4" fill="#0d0d0d" stroke="#2a2a2a" />
          <line x1="-44" y1="-16" x2="44" y2="-16" stroke="#2a2a2a" />
          <text x="0" y="-22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#9a9a9a" letterSpacing="2" fontWeight="600">2026</text>
          <text x="0" y="8" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="24" fill="#ff5c7a" fontWeight="700">Q4</text>
          <text x="0" y="26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#9a9a9a" letterSpacing="2" fontWeight="600">1× / JAHR</text>
        </g>
      </FrameBefore>

      <FrameAfter>
        <g transform="translate(180 270)">
          <rect x="-160" y="-150" width="320" height="300" rx="10" fill="#0d0d0d" stroke="#22d3a5" strokeOpacity="0.45" />
          <text x="-148" y="-126" fontFamily="JetBrains Mono" fontSize="14" fill="#22d3a5" letterSpacing="2" fontWeight="600">ÜBERWACHT</text>

          {Array.from({ length: 16 }).map((_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            return (
              <g key={i} transform={`translate(${-148 + col * 76} ${-100 + row * 60})`}>
                <rect x="0" y="0" width="64" height="48" rx="4" fill="#0e1a16" stroke="#1f3a30" strokeWidth="0.8" />
                <line x1="6" y1="12" x2="48" y2="12" stroke="#22d3a5" strokeOpacity="0.4" strokeWidth="0.8" />
                <line x1="6" y1="20" x2="40" y2="20" stroke="#22d3a5" strokeOpacity="0.4" strokeWidth="0.8" />
                <line x1="6" y1="28" x2="52" y2="28" stroke="#22d3a5" strokeOpacity="0.4" strokeWidth="0.8" />
                <line x1="6" y1="36" x2="34" y2="36" stroke="#22d3a5" strokeOpacity="0.4" strokeWidth="0.8" />
              </g>
            );
          })}

          <defs>
            <linearGradient id="scangrad2" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#22d3a5" stopOpacity="0" />
              <stop offset="0.5" stopColor="#22d3a5" stopOpacity="0.85" />
              <stop offset="1" stopColor="#22d3a5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="kw-scanbeam">
            <rect x="-160" y="-150" width="320" height="4" fill="url(#scangrad2)" />
          </g>
        </g>

        <g transform="translate(360 100)">
          <rect x="0" y="0" width="140" height="330" rx="8" fill="#0d0d0d" stroke="#22d3a5" strokeOpacity="0.45" />
          <text x="12" y="24" fontFamily="JetBrains Mono" fontSize="13" fill="#22d3a5" letterSpacing="2" fontWeight="600">PULL REQUESTS</text>
          {[
            { y: 40, txt: 'fix: jwt expiry', sev: '#ff5c7a' },
            { y: 88, txt: 'fix: SQL inject', sev: '#ff5c7a' },
            { y: 136, txt: 'bump openssl', sev: '#ffb547' },
            { y: 184, txt: 'rotate api key', sev: '#ffb547' },
            { y: 232, txt: 'csp headers', sev: '#22d3a5' },
            { y: 280, txt: 'rate limiter', sev: '#22d3a5' },
          ].map((pr, i) => (
            <g key={i} opacity="0">
              <rect x="8" y={pr.y} width="124" height="38" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.6" />
              <circle cx="22" cy={pr.y + 19} r="4.5" fill={pr.sev} />
              <text x="34" y={pr.y + 24} fontFamily="JetBrains Mono" fontSize="12" fill="#cfcfcf" fontWeight="500">{pr.txt}</text>
              <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${0.3 + i * 0.18}s`} fill="freeze" />
            </g>
          ))}
        </g>

        <g transform="translate(80 478)">
          <rect x="-60" y="-18" width="120" height="36" rx="18" fill="#0e1f1a" stroke="#22d3a5" />
          <text x="0" y="7" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#22d3a5" letterSpacing="2" fontWeight="600">ALLE 4 STD</text>
        </g>
      </FrameAfter>
    </svg>
  );
}

// ============================================================
// SCENE 4 — CUSTOM SOFTWARE
// ============================================================
function CustomScene() {
  return (
    <svg className="stage-svg scene-enter" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet">
      <FrameBefore>
        {[
          { x: 140, y: 140, label: 'CRM',         w: 130, h: 80, dx: 2,  dy: -1 },
          { x: 340, y: 130, label: 'E-MAIL',      w: 130, h: 80, dx: -2, dy: 1  },
          { x: 380, y: 270, label: 'EXCEL',       w: 130, h: 80, dx: 1,  dy: 2  },
          { x: 150, y: 290, label: 'ACCESS DB',   w: 150, h: 80, dx: -1, dy: -2 },
          { x: 270, y: 420, label: 'WHITEBOARD',  w: 160, h: 80, dx: 2,  dy: 1  },
        ].map((tool, i) => (
          <g key={i}>
            <g transform={`translate(${tool.x} ${tool.y})`}>
              <rect x={-tool.w/2} y={-tool.h/2} width={tool.w} height={tool.h} rx="6" fill="#0d0d0d" stroke="#2a2a2a" />
              <text x="0" y="4" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="15" fill="#cfcfcf" letterSpacing="1.5" fontWeight="600">{tool.label}</text>
              <line x1={-tool.w/2 + 14} y1="22" x2={tool.w/2 - 14} y2="22" stroke="#3a3a3a" strokeWidth="0.8" />
              <line x1={-tool.w/2 + 14} y1="30" x2={tool.w/2 - 24} y2="30" stroke="#3a3a3a" strokeWidth="0.8" />
              <animateTransform attributeName="transform" type="translate"
                                values={`${tool.x},${tool.y};${tool.x + tool.dx},${tool.y + tool.dy};${tool.x - tool.dx},${tool.y - tool.dy};${tool.x},${tool.y}`}
                                dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </g>
          </g>
        ))}

        <g stroke="#ff5c7a" strokeWidth="1" strokeOpacity="0.45" fill="none" strokeDasharray="3 4">
          <path d="M 170 150 Q 250 60 320 130" />
          <path d="M 360 170 Q 390 220 380 270" />
          <path d="M 380 310 Q 290 300 220 290" />
          <path d="M 180 320 Q 200 380 280 420" />
          <path d="M 130 290 Q 100 210 140 140" />
          <path d="M 240 140 Q 270 270 270 420" />
        </g>

        <text x="250" y="512" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="15" fill="#ff5c7a" letterSpacing="3" fontWeight="600">BERICHTE PER HAND</text>
      </FrameBefore>

      <FrameAfter>
        <g transform="translate(250 260)">
          <rect x="-230" y="-180" width="460" height="360" rx="10" fill="#0d0d0d" stroke="#22d3a5" strokeOpacity="0.5" />
          <rect x="-230" y="-180" width="460" height="32" rx="10" fill="#0a0a0a" />
          <circle cx="-214" cy="-164" r="4" fill="#22d3a5" />
          <circle cx="-198" cy="-164" r="4" fill="#1f3a30" />
          <circle cx="-182" cy="-164" r="4" fill="#1f3a30" />
          <text x="0" y="-159" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="#9a9a9a" letterSpacing="1.5" fontWeight="500">acme.datenflow.app</text>

          <rect x="-230" y="-148" width="96" height="328" fill="#0a0a0a" />
          {['DASH','AUFTR.','KUNDEN','OPS','REPORTS','EINST.'].map((s, i) => (
            <g key={s}>
              <rect x="-222" y={-134 + i * 34} width="80" height="26" rx="3" fill={i === 0 ? '#0e1f1a' : 'transparent'} stroke={i === 0 ? '#22d3a5' : 'transparent'} strokeOpacity="0.5" strokeWidth="0.8" />
              <text x="-214" y={-115 + i * 34} fontFamily="JetBrains Mono" fontSize="12" fill={i === 0 ? '#22d3a5' : '#9a9a9a'} letterSpacing="1.5" fontWeight="600">{s}</text>
            </g>
          ))}

          <g transform="translate(-122 -128)">
            {[
              { lbl: 'UMSATZ', val: '€1.4M' },
              { lbl: 'AKTIV', val: '312' },
              { lbl: 'SLA', val: '98.7%' },
            ].map((k, i) => (
              <g key={i} transform={`translate(${i * 116} 0)`} opacity="0">
                <rect x="0" y="0" width="104" height="68" rx="5" fill="#1a1a1a" stroke="#2a2a2a" />
                <text x="12" y="22" fontFamily="JetBrains Mono" fontSize="11" fill="#9a9a9a" letterSpacing="2" fontWeight="600">{k.lbl}</text>
                <text x="12" y="54" fontFamily="Inter" fontSize="26" fill="#f5f5f5" fontWeight="600">{k.val}</text>
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${0.2 + i * 0.18}s`} fill="freeze" />
              </g>
            ))}
          </g>

          <g transform="translate(-122 -42)">
            <rect x="0" y="0" width="352" height="206" rx="5" fill="#1a1a1a" stroke="#2a2a2a" />
            <text x="14" y="22" fontFamily="JetBrains Mono" fontSize="11" fill="#9a9a9a" letterSpacing="2" fontWeight="600">UMSATZ — LETZTE 30 TAGE</text>
            <polyline points="16,176 50,160 84,166 118,128 152,138 186,104 220,108 254,76 288,84 322,42 340,52"
                      fill="none" stroke="#22d3a5" strokeWidth="2.4"
                      strokeDasharray="540" strokeDashoffset="540">
              <animate attributeName="stroke-dashoffset" from="540" to="0" dur="1.6s" begin="0.7s" fill="freeze" />
            </polyline>
            <polyline points="16,176 50,160 84,166 118,128 152,138 186,104 220,108 254,76 288,84 322,42 340,52 340,200 16,200"
                      fill="rgba(34,211,165,0.10)" stroke="none" opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.6s" begin="2s" fill="freeze" />
            </polyline>
          </g>
        </g>

        <text x="250" y="512" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="15" fill="#22d3a5" letterSpacing="3" fontWeight="600">EINE WAHRHEIT</text>
      </FrameAfter>
    </svg>
  );
}

// ---------- Per-slide hero icons ----------
const SlideIcons = {
  docs: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 6 L20 6 L24 10 L24 26 L8 26 Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M20 6 L20 10 L24 10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="11" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="22" x2="17" y2="22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  chat: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M5 9 C5 7, 7 6, 9 6 L23 6 C25 6, 27 7, 27 9 L27 19 C27 21, 25 22, 23 22 L13 22 L7 27 L7 22 C5.5 22, 5 21, 5 19 Z"
            stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" />
      <circle cx="16" cy="14" r="1.3" fill="currentColor" />
      <circle cx="20" cy="14" r="1.3" fill="currentColor" />
    </svg>
  ),
  sec: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L26 8 L26 16 C26 21, 22 25, 16 28 C10 25, 6 21, 6 16 L6 8 Z"
            stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M11 16 L15 20 L21 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  custom: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="7" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M11 13 L8 16 L11 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 13 L24 16 L21 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="11" x2="14" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export const SCENES = {
  docs: DocsScene,
  chat: ChatScene,
  sec: SecScene,
  custom: CustomScene,
};

export const ICONS = SlideIcons;
