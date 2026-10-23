// Animated CSS mockups, one per project. Styles live in globals.css under "Project visuals".
export default function ProjectVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "railbook":
      return <RailBook />;
    case "twogether":
      return <Twogether />;
    case "code-hub":
      return <CodeHub />;
    case "sevyn-perfumes":
      return <Sevyn />;
    case "barricade-run":
      return <Barricade />;
    default:
      return null;
  }
}

function RailBook() {
  const seats = Array.from({ length: 32 }, (_, i) => (i * 7) % 5 === 0 ? "taken" : i % 9 === 3 ? "held" : "free");
  return (
    <div className="pv pv-rail">
      <div className="pv-rail-ticket">
        <div className="pv-rail-route">
          <div>
            <b>NDLS</b>
            <small>New Delhi</small>
          </div>
          <div className="pv-rail-line">
            <span className="pv-rail-train" />
          </div>
          <div>
            <b>HWH</b>
            <small>Howrah</small>
          </div>
        </div>
        <div className="pv-rail-meta mono">
          <span>12302 RAJDHANI</span>
          <span>AC 2 TIER</span>
          <span className="pv-tag">TATKAL</span>
        </div>
        <div className="pv-rail-seats">
          {seats.map((s, i) => (
            <span key={i} className={s} style={{ animationDelay: `${(i % 8) * 0.12}s` }} />
          ))}
        </div>
      </div>
      <div className="pv-rail-queue mono">
        <span className="status-dot" /> waiting room <b>#1,284</b>
        <span className="pv-rail-queue-bar">
          <i />
        </span>
      </div>
    </div>
  );
}

function Twogether() {
  return (
    <div className="pv pv-two">
      <div className="pv-phone">
        <div className="pv-phone-head">
          <span className="pv-avatar" />
          <div>
            <b>Ira</b>
            <small>typing...</small>
          </div>
        </div>
        <div className="pv-chat">
          <p className="in">good morning</p>
          <p className="out">morning! coffee?</p>
          <p className="in voice">
            <i />
            <span className="wave">
              {Array.from({ length: 14 }, (_, i) => (
                <em key={i} style={{ animationDelay: `${i * 0.07}s` }} />
              ))}
            </span>
          </p>
          <p className="out">
            on my way <small>✓✓</small>
          </p>
          <p className="in typing">
            <span />
            <span />
            <span />
          </p>
        </div>
      </div>
      <div className="pv-hearts" aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} style={{ left: `${10 + i * 15}%`, animationDelay: `${i * 0.7}s` }}>
            ♥
          </span>
        ))}
      </div>
      <div className="pv-two-days mono">
        <b>412</b> days together
      </div>
    </div>
  );
}

function CodeHub() {
  const lines = [
    ["kw", "const", "fn", " room", "op", " = ", "fn", "join", "op", "(", "str", "'a7f'", "op", ")"],
    ["kw", "await", "fn", " room", "op", ".", "fn", "sync", "op", "()"],
    ["cm", "// 2 people editing"],
    ["kw", "export", "kw", " function", "fn", " pack", "op", "(dir) {"],
    ["op", "  ", "kw", "return", "fn", " tar", "op", "(dir)."],
    ["op", "    ", "fn", "toScript", "op", "(", "str", "'node'", "op", ")"],
    ["op", "}"],
  ];
  return (
    <div className="pv pv-code">
      <div className="pv-window">
        <div className="pv-window-bar">
          <i />
          <i />
          <i />
          <span className="mono">room/a7f</span>
          <span className="pv-peers">
            <em style={{ background: "#ff4d8d" }} />
            <em style={{ background: "#8a3ffc" }} />
          </span>
        </div>
        <div className="pv-window-body">
          <ul className="pv-side mono">
            {["Project to Script", "Codeshare", "Run Code", "AI Convert", "Format", "PNG / SVG"].map((t, i) => (
              <li key={t} className={i === 1 ? "on" : ""}>
                {t}
              </li>
            ))}
          </ul>
          <pre className="pv-src mono">
            {lines.map((l, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.25}s` }}>
                <span className="ln">{i + 1}</span>
                {pairs(l).map(([cls, txt], j) => (
                  <span key={j} className={cls}>
                    {txt}
                  </span>
                ))}
              </div>
            ))}
            <span className="pv-cursor a">
              <b>you</b>
            </span>
            <span className="pv-cursor b">
              <b>sam</b>
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
}

function pairs(l: string[]) {
  const out: [string, string][] = [];
  for (let i = 0; i < l.length; i += 2) out.push([l[i], l[i + 1]]);
  return out;
}

function Sevyn() {
  return (
    <div className="pv pv-sevyn">
      <div className="pv-bottle">
        <span className="cap" />
        <span className="neck" />
        <span className="glass">
          <b>7</b>
          <small>SEVYN</small>
        </span>
      </div>
      <div className="pv-notes mono">
        <span>bergamot</span>
        <span>oud</span>
        <span>amber</span>
        <span>vetiver</span>
      </div>
      <div className="pv-wa mono">
        <span className="pv-wa-icon" /> Order sent to dealer
      </div>
    </div>
  );
}

function Barricade() {
  return (
    <div className="pv pv-run">
      <div className="pv-sky" />
      <div className="pv-road">
        <div className="pv-lanes" />
        <span className="pv-obstacle o1" />
        <span className="pv-obstacle o2" />
        <span className="pv-coin c1" />
        <span className="pv-coin c2" />
      </div>
      <span className="pv-runner" />
      <span className="pv-paper p1" />
      <span className="pv-paper p2" />
      <div className="pv-hud mono">
        <span>
          1,204<small>m</small>
        </span>
        <span>♥ ♥</span>
      </div>
    </div>
  );
}
