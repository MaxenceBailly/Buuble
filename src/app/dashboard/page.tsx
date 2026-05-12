"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

const BUBBLES = [
  { slug: "work",   name: "Travail",       icon: "💼", color: "#635bff", glow: "rgba(99,91,255,.4)",   modules: ["Todos", "Projets"],     stat: "3 tâches",       size: 200, x: 18,  y: 12,  soon: false },
  { slug: "tools",  name: "Outils",        icon: "🛠", color: "#38bdf8", glow: "rgba(56,189,248,.4)",  modules: ["Convertisseur"],        stat: "Prêt",           size: 160, x: 58,  y: 8,   soon: false },
  { slug: "gaming", name: "Gaming",        icon: "🎮", color: "#4ade80", glow: "rgba(74,222,128,.4)",  modules: ["Achievements"],         stat: "Lier Steam",     size: 185, x: 38,  y: 48,  soon: false },
  { slug: "music",  name: "Musique",       icon: "🎵", color: "#fbbf24", glow: "rgba(251,191,36,.3)",  modules: ["Concerts"],             stat: "Bientôt",        size: 140, x: 72,  y: 42,  soon: true  },
  { slug: "films",  name: "Films",         icon: "🎬", color: "#fb7185", glow: "rgba(251,113,133,.3)", modules: ["Watchlist"],            stat: "Bientôt",        size: 120, x: 6,   y: 58,  soon: true  },
  { slug: "sport",  name: "Sport",         icon: "⚽", color: "#c084fc", glow: "rgba(192,132,252,.3)", modules: ["Suivi"],                stat: "Bientôt",        size: 110, x: 82,  y: 68,  soon: true  },
]

export default function DashboardHome() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bubbles = containerRef.current?.querySelectorAll<HTMLElement>(".orb:not(.soon-orb)")
    if (!bubbles) return
    const handlers: (() => void)[] = []
    bubbles.forEach(orb => {
      let ox = 0, oy = 0, vx = 0, vy = 0
      const speed = 0.3 + Math.random() * 0.3
      const handler = () => {
        ox += (Math.random() - 0.5) * speed
        oy += (Math.random() - 0.5) * speed
        ox *= 0.98; oy *= 0.98
        orb.style.transform = `translate(${ox}px, ${oy}px)`
      }
      const id = setInterval(handler, 50)
      handlers.push(() => clearInterval(id))
    })
    return () => handlers.forEach(h => h())
  }, [])

  return (
    <div className="home-wrap">
      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">Bonjour 👋</h1>
        <p className="home-sub">Plonge dans une bulle</p>
      </div>

      {/* Univers des bulles */}
      <div className="universe" ref={containerRef}>
        {/* Lignes de connexion SVG */}
        <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="27" y1="22" x2="66" y2="16" stroke="rgba(255,255,255,.04)" strokeWidth="0.3"/>
          <line x1="27" y1="22" x2="51" y2="58" stroke="rgba(255,255,255,.04)" strokeWidth="0.3"/>
          <line x1="66" y1="16" x2="51" y2="58" stroke="rgba(255,255,255,.04)" strokeWidth="0.3"/>
          <line x1="51" y1="58" x2="80" y2="56" stroke="rgba(255,255,255,.03)" strokeWidth="0.3"/>
          <line x1="51" y1="58" x2="16" y2="68" stroke="rgba(255,255,255,.03)" strokeWidth="0.3"/>
        </svg>

        {BUBBLES.map((b) => (
          <div
            key={b.slug}
            className={"orb" + (b.soon ? " soon-orb" : "")}
            style={{
              width:  b.size,
              height: b.size,
              left:   `calc(${b.x}% - ${b.size / 2}px)`,
              top:    `calc(${b.y}% - ${b.size / 2}px)`,
              "--orb-color": b.color,
              "--orb-glow":  b.glow,
            } as any}
          >
            {b.soon ? (
              <div className="orb-inner">
                <span className="orb-icon">{b.icon}</span>
                <span className="orb-name">{b.name}</span>
                <span className="orb-soon">bientôt</span>
              </div>
            ) : (
              <Link href={`/dashboard/${b.slug}`} className="orb-inner orb-link">
                <span className="orb-icon">{b.icon}</span>
                <span className="orb-name">{b.name}</span>
                <span className="orb-stat">{b.stat}</span>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="feed-section">
        <h2 className="feed-title">Activité récente</h2>
        <div className="feed-empty">
          <span>🫧</span>
          <p>Ton feed est vide — active une bulle pour commencer</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .home-wrap { width: 100%; max-width: 960px; }

        .home-header { margin-bottom: 20px; }
        .home-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:#fff; margin-bottom:4px; }
        .home-sub   { font-size:13px; color:rgba(255,255,255,.3); }

        /* ── Univers ── */
        .universe {
          position: relative;
          width: 100%;
          height: 520px;
          margin-bottom: 40px;
          overflow: hidden;
        }

        .connections {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* ── Orbe ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            color-mix(in srgb, var(--orb-color) 22%, rgba(255,255,255,.08)),
            rgba(255,255,255,.03) 60%,
            transparent 100%
          );
          border: 1px solid color-mix(in srgb, var(--orb-color) 35%, transparent);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 0 40px -8px var(--orb-glow, rgba(255,255,255,.1));
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow .3s, border-color .3s, transform .3s;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }

        .orb:not(.soon-orb):hover {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.2),
            0 0 60px -4px var(--orb-glow, rgba(255,255,255,.2)),
            0 0 0 1px color-mix(in srgb, var(--orb-color) 60%, transparent);
          transform: scale(1.06) !important;
          border-color: color-mix(in srgb, var(--orb-color) 70%, transparent);
          z-index: 10;
        }

        .soon-orb { opacity: .3; cursor: default; filter: saturate(0.4); }

        .orb-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          padding: 16px;
          text-align: center;
        }
        .orb-link { cursor: pointer; }

        .orb-icon  { font-size: 26px; line-height: 1; }
        .orb-name  { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#fff; letter-spacing:-.2px; }
        .orb-stat  { font-size:10px; color:rgba(255,255,255,.4); font-family:'DM Sans',sans-serif; }
        .orb-soon  { font-size:9px; color:rgba(255,255,255,.3); font-family:'DM Sans',sans-serif; background:rgba(255,255,255,.06); padding:2px 7px; border-radius:99px; }

        /* ── Feed ── */
        .feed-section { }
        .feed-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:rgba(255,255,255,.5); margin-bottom:14px; }
        .feed-empty {
          display:flex; align-items:center; gap:12px;
          padding:20px 24px;
          border:1px dashed rgba(255,255,255,.07);
          border-radius:16px;
          font-size:13px; color:rgba(255,255,255,.25);
        }
        .feed-empty span { font-size:20px; }
      `}</style>
    </div>
  )
}