import React, { useEffect, useState, useRef } from "react";



/* ---------- Datos de ejemplo ---------- */
const PLAYERS = [
  {
    id: "pedri",
    name: "Pedri",
    role: "Centrocampista",
    club: "FC Barcelona",
    img: "public/pedri.jpg",
    alt: "Retrato de Pedri corriendo con el balón",
    snippet: "Control de balón, visión de juego y llegada desde el medio.",
    details:
      "Pedri ha sido pilar del mediocampo por su constancia, pases clave y recuperación de balón.",
    stats: { age: 21, goals: 6, assists: 8, matches: 42 },
  },
  {
    id: "dembele",
    name: "Ousmane Dembélé",
    role: "Extremo",
    club: "Paris Saint-Germain",
    img: "/public/dembele.jpg",
    alt: "Dembélé celebrando un gol con los brazos abiertos",
    snippet: "Velocidad, desequilibrio por banda y mejoras en finalización.",
    details:
      "Impacto directo en partidos decisivos y mayor regularidad goleadora.",
    stats: { age: 26, goals: 12, assists: 9, matches: 36 },
  },
  {
    id: "yamal",
    name: "Yamal",
    role: "Delantero/Extremo",
    club: "FC Barcelona",
    img: "/public/yamal.jpg",
    alt: "Yamal en acción regateando a un defensa",
    snippet: "Joven con regate, velocidad y gran proyección ofensiva.",
    details:
      "Emergente, influye en el ataque y genera bastantes ocasiones para su equipo.",
    stats: { age: 18, goals: 7, assists: 5, matches: 28 },
  },
  {
    id: "raphinha",
    name: "Raphinha",
    role: "Extremo",
    club: "FC Barcelona",
    img: "/public/raphina.jpg",
    alt: "Raphinha controlando el balón",
    snippet: "Buen uno contra uno, centros precisos y goles importantes.",
    details:
      "Consistencia y actuaciones claves en partidos decisivos.",
    stats: { age: 28, goals: 11, assists: 7, matches: 34 },
  },
];

/* ---------- Utility: simple hash router ---------- */
function parseHash(hash) {
  // returns { route: "home"|"player"|"about", id?: string }
  const cleaned = (hash || "#/").replace(/^#/, "");
  const parts = cleaned.split("/").filter(Boolean);
  if (parts.length === 0) return { route: "home" };
  if (parts[0] === "player" && parts[1]) return { route: "player", id: parts[1] };
  if (parts[0] === "about") return { route: "about" };
  return { route: "home" };
}

/* ---------- App component ---------- */
export default function App() {
  const [routeState, setRouteState] = useState(parseHash(window.location.hash));
  const [query, setQuery] = useState("");
  const mainRef = useRef(null);

  // Listen to hash changes
  useEffect(() => {
    const onHash = () => setRouteState(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Focus management: move focus to main heading on route change
  useEffect(() => {
    // Delay slightly to ensure DOM updated
    window.setTimeout(() => {
      const el = mainRef.current;
      if (el) {
        const hdr = el.querySelector("h1,h2");
        if (hdr) hdr.focus();
      }
    }, 50);
  }, [routeState]);

  // Filtering
  const filtered = PLAYERS.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.club.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Inline CSS so solo necesitas este archivo */}
      <style>{`
        :root{
          --bg: #071127;
          --card: #0b1220;
          --muted:#9aa4b2;
          --text: #E6EEF6;
          --accent: #FFD166;
          --focus: 3px;
          font-size: 16px;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%}
        body{
          margin:0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          background: linear-gradient(180deg, var(--bg) 0%,  100%);
          color:var(--text);
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
          line-height:1.4;
        }
        .wrap{
          max-width:1100px;
          margin:0 auto;
          padding:20px;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        header[role="banner"]{
          display:flex;
          gap:16px;
          align-items:center;
          justify-content:space-between;
        }
        .brand h1{
          font-size:2.2rem;
          margin:0 0 10px 0;
          text-align:center;
          width:100%;
        }
        .lead{color:var(--muted);font-size:0.95rem;margin-top:4px}
        .search {display:flex;gap:8px;align-items:center}
        input[type="search"]{
          padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);
          background:rgba(255,255,255,0.02);color:var(--text);
        }
        input[type="search"]:focus{
          outline: var(--focus) solid rgba(255,209,102,0.18);
          box-shadow:0 0 0 3px rgba(255,209,102,0.06);
        }
        nav.primary{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}
        .nav-link{
          background:transparent;border:1px solid rgba(255,255,255,0.04);padding:8px 10px;border-radius:8px;color:var(--text);
        }
        .nav-link:focus{outline: var(--focus) solid var(--accent);}

        .grid{
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap:48px 56px;
          margin-top:18px;
          justify-items:center;
        }
        .candidatos-title {
          text-align:center;
          margin-left:auto;
          margin-right:auto;
          width:100%;
          max-width:600px;
          font-size:2rem;
          margin-bottom:24px;
        }
        @media (max-width: 800px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card{
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,0.04);
          display:flex;flex-direction:column;
        }
        .card img{width:100%;height:160px;object-fit:cover;display:block}
        .card-body{padding:12px;display:flex;flex-direction:column;gap:8px}
        .card h2{font-size:1.05rem;margin:0}
        .meta{color:var(--muted);font-size:0.9rem}
        .snippet{color:#dbeafc;font-size:0.95rem}
            .wrap{
              max-width:1100px;
              margin:0 auto;
              padding:20px;
              min-height:100vh;
              display:flex;
              flex-direction:column;
              justify-content:center;
              align-items:center;
            }
        .card button:focus{outline: var(--focus) solid rgba(0,0,0,0.2);}

        /* Focus visible for keyboard (high contrast) */
        :focus{ outline-offset: 2px; }
        a:focus, button:focus, [tabindex="0"]:focus{
          outline: var(--focus) solid var(--accent);
          box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        }

        .detail {
          background: var(--card);
          padding: 16px;
          border-radius:12px;
          border: 1px solid rgba(255,255,255,0.03);
          margin-top:12px;
        }

        .skip {
          position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden;
        }
        .skip:focus{
          position:static;left:auto;width:auto;height:auto;background:#fff;color:#000;padding:8px;border-radius:6px;margin:8px;
        }

        footer{margin-top:30px;color:var(--muted);font-size:0.9rem}
        .controls {display:flex;gap:8px;align-items:center}
        .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
        label.inline{display:block;font-size:0.9rem;color:var(--muted);margin-bottom:4px}
        .form-row{margin-bottom:10px}
        .error{color:#ffb4b4}
        @media (max-width:600px){
          header{flex-direction:column;align-items:flex-start}
        }
      `}</style>

      <div className="wrap">
        {/* Skip link */}
        <a href="#main" className="skip">Saltar al contenido</a>

        <header role="banner" aria-label="Encabezado principal">
          <div className="brand" aria-hidden="false">
            <h1 tabIndex="-1"> Candidatos al Balón de Oro</h1>
          </div>

          <div className="controls" role="search" aria-label="Buscar jugadores">
            <label htmlFor="search" className="sr-only">Buscar jugador</label>
            <input
              id="search"
              type="search"
              placeholder="Buscar por nombre, rol o club..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar jugadores por nombre, rol o club"
            />
            <nav className="primary" aria-label="Navegación principal">
              <a
                href="#/"
                className="nav-link"
                onClick={() => { /* hash handled by browser */ }}
              >
                Inicio
              </a>
              <a href="#/about" className="nav-link">Accesibilidad</a>
            </nav>
          </div>
        </header>

        <main id="main" role="main" ref={mainRef} tabIndex="-1" aria-live="polite">
          {/* Router render */}
          {routeState.route === "home" && (
            <>
              <h2 tabIndex="-1" className="candidatos-title">Lista de candidatos</h2>

              <section aria-labelledby="players-heading" style={{marginTop:12, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h3 id="players-heading" className="sr-only">Jugadores</h3>
                <div className="grid" role="list">
                  {filtered.map((p) => (
                    <article
                      key={p.id}
                      className="card"
                      role="listitem"
                      aria-labelledby={`title-${p.id}`}
                    >
                      <img src={p.img} alt={p.alt} />
                      <div className="card-body">
                        <h2 id={`title-${p.id}`}>{p.name}</h2>
                        <div className="meta">{p.role} — {p.club}</div>
                        <div className="snippet">{p.snippet}</div>

                        <div style={{display:"flex",gap:8,marginTop:8}}>
                          <a
                            href={`#/player/${p.id}`}
                            className="nav-link"
                            onClick={() => {}}
                          >
                            Ver detalle
                          </a>

                          {/* Card as keyboard accessible toggle */}
                          <div
                            role="button"
                            tabIndex="0"
                            aria-pressed="false"
                            onClick={(e) => {
                              // expand inline details: we'll navigate to detail route
                              window.location.hash = `#/player/${p.id}`;
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                window.location.hash = `#/player/${p.id}`;
                              }
                            }}
                            style={{
                              padding: "8px 10px",
                              borderRadius: 8,
                              cursor: "pointer",
                              alignSelf: "flex-start",
                              border: "1px solid rgba(255,255,255,0.04)",
                              background: "transparent",
                              color: "var(--text)"
                            }}
                          >
                            Abrir (Enter)
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <p className="meta" role="status" aria-live="polite">No se encontraron jugadores.</p>
                )}
              </section>
            </>
          )}

          {routeState.route === "player" && (
            <PlayerDetail id={routeState.id} />
          )}

          {routeState.route === "about" && (
            <section aria-labelledby="about-heading" style={{marginTop:12}}>
              <h2 id="about-heading" tabIndex="-1">Accesibilidad y detalles</h2>
              <div className="detail">
                <p>
                  Esta SPA implementa prácticas de accesibilidad: navegación por teclado,
                  roles ARIA, gestión de foco al cambiar de vista, etiquetas en formularios,
                  mensajes de error en aria-live, y alternativas textuales en imágenes.
                </p>

                <h3 style={{marginTop:12}}>Prácticas implementadas</h3>
                <ul>
                  <li>Skip link para saltar navegación.</li>
                  <li>Orden lógico de tabulación e indicadores de foco visibles.</li>
                  <li>Formularios con labels asociados y mensajes claros.</li>
                </ul>

                <h3 style={{marginTop:12}}>Probar accesibilidad</h3>
                <ol>
                  <li>Usa Tab para navegar y mira los contornos de foco.</li>
                  <li>Prueba con lector de pantalla; revisa roles y encabezados.</li>
                  <li>Valida color contrast con herramientas (WCAG AA/AAA).</li>
                </ol>

                <h3 style={{marginTop:12}}>Feedback</h3>
                <AccessibleForm />
              </div>
            </section>
          )}
        </main>

        <footer role="contentinfo">
          <p>Demo accesible — SPA React (hash routing)</p>
        </footer>
      </div>
    </>
  );
}

/* ---------- Player detail component ---------- */
function PlayerDetail({ id }) {
  const player = PLAYERS.find((p) => p.id === id);
  const ref = useRef(null);

  useEffect(() => {
    // focus heading when mounted
    window.setTimeout(() => {
      const h = ref.current;
      if (h) h.focus();
    }, 40);
  }, [id]);

  if (!player) {
    return (
      <section style={{marginTop:12}}>
        <h2 tabIndex="-1" ref={ref}>Jugador no encontrado</h2>
        <p className="meta">El jugador que buscas no existe o la ruta es incorrecta.</p>
        <p><a href="#/" className="nav-link">Volver al inicio</a></p>
      </section>
    );
  }

  return (
    <article aria-labelledby={`pd-${player.id}`} style={{marginTop:12}}>
      <h2 id={`pd-${player.id}`} tabIndex="-1" ref={ref}>{player.name} — {player.club}</h2>
      <div className="detail" role="region" aria-label={`Detalles de ${player.name}`}>
        <img src={player.img} alt={player.alt} style={{width:"100%",maxHeight:320,objectFit:"cover",borderRadius:8}} />
        <p style={{marginTop:8}}><strong>Posición:</strong> {player.role}</p>
        <p><strong>Edad:</strong> {player.stats.age} — <strong>Partidos:</strong> {player.stats.matches}</p>
        <p><strong>Goles:</strong> {player.stats.goals} — <strong>Asistencias:</strong> {player.stats.assists}</p>
        <p style={{marginTop:8}}>{player.details}</p>

        <div style={{display:"flex",gap:8,marginTop:12}}>
          <a href="#/" className="nav-link">Volver</a>
          <a href="#/about" className="nav-link">Accesibilidad</a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Accessible feedback form ---------- */
function AccessibleForm() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const liveRef = useRef(null);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "El nombre es obligatorio.";
    if (feedback.trim().length < 10) e.feedback = "El feedback debe tener al menos 10 caracteres.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // Simula envío y resetea
      setName("");
      setFeedback("");
      setErrors({});
      if (liveRef.current) liveRef.current.textContent = "Gracias por tu feedback — enviado correctamente.";
      window.setTimeout(()=>{ if (liveRef.current) liveRef.current.textContent = ""; }, 4000);
    } else {
      // Announce errors for screen readers
      if (liveRef.current) liveRef.current.textContent = "Hay errores en el formulario. Revisa los campos indicados.";
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="feedback-heading" style={{marginTop:8}}>
      <h4 id="feedback-heading">Formulario de feedback</h4>

      <div className="form-row">
        <label htmlFor="f-name" className="inline">Nombre</label>
        <input
          id="f-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "err-name" : undefined}
          style={{width:"100%",padding:8,borderRadius:6,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"var(--text)"}}
        />
        {errors.name && <div id="err-name" className="error" role="alert">{errors.name}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="f-feedback" className="inline">Tu feedback</label>
        <textarea
          id="f-feedback"
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          aria-required="true"
          aria-invalid={errors.feedback ? "true" : "false"}
          aria-describedby={errors.feedback ? "err-feedback" : undefined}
          style={{width:"100%",padding:8,borderRadius:6,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"var(--text)"}}
        />
        {errors.feedback && <div id="err-feedback" className="error" role="alert">{errors.feedback}</div>}
      </div>

      <div style={{display:"flex",gap:8}}>
        <button type="submit" className="nav-link" style={{background:"var(--accent)",color:"#081018",border:"none"}}>Enviar</button>
        <button type="button" onClick={() => { setName(""); setFeedback(""); setErrors({}); if (liveRef.current) liveRef.current.textContent = "Formulario limpiado."; }} className="nav-link">Limpiar</button>
      </div>

      <div ref={liveRef} aria-live="polite" style={{marginTop:8,color:"var(--muted)"}}></div>
    </form>
  );
}





