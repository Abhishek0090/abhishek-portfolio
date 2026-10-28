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
            <b>SLN</b>
            <small>Sultanpur</small>
          </div>
          <div className="pv-rail-line">
            <span className="pv-rail-train" />
          </div>
          <div>
            <b>LTT</b>
            <small>Mumbai LTT</small>
          </div>
        </div>
        <div className="pv-rail-meta mono">
          <span>22184 SAKET EXP</span>
          <span>3A</span>
          <span className="pv-tag">CONFIRMED</span>
        </div>
        <div className="pv-rail-seats">
          {seats.map((s, i) => (
            <span key={i} className={s} style={{ animationDelay: `${(i % 8) * 0.12}s` }} />
          ))}
        </div>
      </div>
      <div className="pv-rail-queue mono">
        <span className="status-dot" /> seat lock held <b>09:58</b>
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

// Three arcade screens, one per game: dusk city run, night highway drive, daytime rail ride.
function Barricade() {
  return (
    <div className="pv pv-run">
      <div className="pv-arcade-title mono">
        BARRICADE <b>ARCADE</b>
      </div>
      <div className="pv-screens">
        <div className="pv-screen s-run">
          <div className="pv-sky" />
          <div className="pv-road">
            <div className="pv-lanes" />
            <span className="pv-obstacle o1" />
            <span className="pv-coin c1" />
          </div>
          <span className="pv-runner" />
          <span className="pv-paper p1" />
          <span className="pv-screen-tag mono">01 RUN</span>
        </div>
        <div className="pv-screen s-drive">
          <span className="pv-moon" />
          <div className="pv-road">
            <div className="pv-lanes" />
            <span className="pv-car c1" />
            <span className="pv-car c2" />
          </div>
          <span className="pv-lamp l1" />
          <span className="pv-lamp l2" />
          <span className="pv-taxi" />
          <span className="pv-screen-tag mono">02 DRIVE</span>
        </div>
        <div className="pv-screen s-rail">
          <span className="pv-sun" />
          <span className="pv-hills" />
          <div className="pv-road">
            <div className="pv-sleepers" />
            <span className="pv-coach" />
          </div>
          <span className="pv-trolley" />
          <span className="pv-screen-tag mono">03 RAIL</span>
        </div>
      </div>
    </div>
  );
}
