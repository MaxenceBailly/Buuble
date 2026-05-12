"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const BUBBLES = [
  { slug: "work",   name: "Travail",  icon: "💼", sub: ["Todos", "Projets"] },
  { slug: "tools",  name: "Outils",   icon: "🛠", sub: ["Convertisseur"] },
  { slug: "gaming", name: "Gaming",   icon: "🎮", sub: ["Achievements"] },
  // v2
  { slug: "music",  name: "Musique",  icon: "🎵", sub: ["Concerts", "Écoute"], soon: true },
  { slug: "films",  name: "Films",    icon: "🎬", sub: ["Watchlist", "Notes"], soon: true },
  { slug: "sport",  name: "Sport",    icon: "⚽", sub: ["Suivi", "Résultats"], soon: true },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expanded, setExpanded] = useState<string | null>("work")
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth"
  }

  return (
    <div className="shell">
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <span className="logo-icon">🫧</span>
          {sidebarOpen && <span className="logo-text">Buuble</span>}
        </div>

        {/* Navigation bulles */}
        <nav className="sidebar-nav">
          {BUBBLES.map(b => {
            const isActive   = pathname.startsWith(`/dashboard/${b.slug}`)
            const isExpanded = expanded === b.slug

            return (
              <div key={b.slug} className="bubble-nav-item">
                <button
                  className={`nav-btn ${isActive ? "active" : ""} ${b.soon ? "soon" : ""}`}
                  onClick={() => {
                    if (b.soon) return
                    setExpanded(isExpanded ? null : b.slug)
                  }}
                  title={!sidebarOpen ? b.name : undefined}
                >
                  <span className="nav-icon">{b.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span className="nav-label">{b.name}</span>
                      {b.soon
                        ? <span className="badge-soon">bientôt</span>
                        : <span className={`chevron ${isExpanded ? "up" : ""}`}>›</span>
                      }
                    </>
                  )}
                </button>

                {/* Sous-modules */}
                {sidebarOpen && isExpanded && !b.soon && (
                  <div className="sub-items">
                    {b.sub.map(s => (
                      <Link
                        key={s}
                        href={`/dashboard/${b.slug}/${s.toLowerCase()}`}
                        className={`sub-item ${pathname.includes(s.toLowerCase()) ? "active" : ""}`}
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <Link href="/dashboard/settings" className="nav-btn" title={!sidebarOpen ? "Paramètres" : undefined}>
            <span className="nav-icon">⚙</span>
            {sidebarOpen && <span className="nav-label">Paramètres</span>}
          </Link>
          <button className="nav-btn logout" onClick={handleLogout} title={!sidebarOpen ? "Déconnexion" : undefined}>
            <span className="nav-icon">↩</span>
            {sidebarOpen && <span className="nav-label">Déconnexion</span>}
          </button>
        </div>

        {/* Toggle sidebar */}
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "‹" : "›"}
        </button>
      </aside>

      {/* ── Main ── */}
      <div className="main-wrapper">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="breadcrumb">
              {pathname.replace("/dashboard", "").split("/").filter(Boolean).map((seg, i, arr) => (
                <span key={seg}>
                  <span className="breadcrumb-seg">{seg}</span>
                  {i < arr.length - 1 && <span className="breadcrumb-sep"> / </span>}
                </span>
              ))}
              {pathname === "/dashboard" && <span className="breadcrumb-seg">accueil</span>}
            </div>
          </div>

          <div className="topbar-right">
            {/* Search */}
            <div className="search-bar">
              <span className="search-icon">⌕</span>
              <input placeholder="Chercher dans tes bulles…" />
              <span className="search-kbd">⌘K</span>
            </div>

            {/* Notifs */}
            <button className="icon-btn" title="Notifications">
              <span>🔔</span>
              <span className="notif-dot" />
            </button>

            {/* Avatar */}
            <div className="avatar">M</div>
          </div>
        </header>

        {/* Page content */}
        <main className="main-content">
          {/* Bulles déco */}
          <div className="bg-bubbles" aria-hidden="true">
            <div className="bg-b bg-b1" />
            <div className="bg-b bg-b2" />
            <div className="bg-b bg-b3" />
          </div>
          {children}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .shell {
          display: flex;
          min-height: 100vh;
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
        }

        /* ══ SIDEBAR ══ */
        .sidebar {
          position: relative;
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,.02);
          border-right: 1px solid rgba(255,255,255,.06);
          transition: width .25s cubic-bezier(.16,1,.3,1);
          flex-shrink: 0;
          z-index: 20;
        }
        .sidebar.open   { width: 220px; }
        .sidebar.closed { width: 60px; }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 16px 16px;
          border-bottom: 1px solid rgba(255,255,255,.05);
          overflow: hidden;
          white-space: nowrap;
        }
        .logo-icon { font-size: 22px; flex-shrink: 0; }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -.4px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          background: none;
          border: none;
          border-radius: 10px;
          color: rgba(255,255,255,.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          cursor: pointer;
          transition: all .15s;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          text-decoration: none;
        }
        .nav-btn:hover:not(.soon) {
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.85);
        }
        .nav-btn.active {
          background: rgba(99,91,255,.15);
          color: #a78bfa;
        }
        .nav-btn.soon { cursor: default; opacity: .4; }

        .nav-icon { font-size: 16px; flex-shrink: 0; }
        .nav-label { flex: 1; }

        .chevron {
          font-size: 16px;
          opacity: .4;
          transition: transform .2s;
          display: inline-block;
        }
        .chevron.up { transform: rotate(90deg); }

        .badge-soon {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(255,255,255,.06);
          border-radius: 99px;
          color: rgba(255,255,255,.3);
          font-weight: 500;
        }

        .sub-items {
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin: 2px 0 4px 28px;
        }
        .sub-item {
          padding: 6px 10px;
          font-size: 12.5px;
          color: rgba(255,255,255,.35);
          border-radius: 7px;
          text-decoration: none;
          transition: all .15s;
        }
        .sub-item:hover { color: rgba(255,255,255,.7); background: rgba(255,255,255,.04); }
        .sub-item.active { color: #a78bfa; }

        .sidebar-bottom {
          padding: 8px;
          border-top: 1px solid rgba(255,255,255,.05);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .logout:hover { color: #fb7185 !important; }

        .sidebar-toggle {
          position: absolute;
          top: 50%;
          right: -12px;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1a1a2e;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.5);
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .15s;
          z-index: 30;
          line-height: 1;
        }
        .sidebar-toggle:hover { color: #fff; border-color: rgba(255,255,255,.3); }

        /* ══ MAIN ══ */
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ── Topbar ── */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 56px;
          border-bottom: 1px solid rgba(255,255,255,.05);
          background: rgba(8,8,16,.8);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
          flex-shrink: 0;
        }

        .breadcrumb { font-size: 13px; }
        .breadcrumb-seg {
          color: rgba(255,255,255,.5);
          text-transform: capitalize;
          font-weight: 500;
        }
        .breadcrumb-sep { color: rgba(255,255,255,.2); }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px;
          width: 220px;
        }
        .search-bar input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: rgba(255,255,255,.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }
        .search-bar input::placeholder { color: rgba(255,255,255,.2); }
        .search-icon { color: rgba(255,255,255,.25); font-size: 16px; }
        .search-kbd {
          font-size: 10px;
          color: rgba(255,255,255,.2);
          background: rgba(255,255,255,.05);
          padding: 2px 5px;
          border-radius: 4px;
          font-family: monospace;
        }

        .icon-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          color: rgba(255,255,255,.6);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .15s;
        }
        .icon-btn:hover { background: rgba(255,255,255,.08); color: #fff; }
        .notif-dot {
          position: absolute;
          top: 7px; right: 7px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #635bff;
          border: 1.5px solid #080810;
        }

        .avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #635bff, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }

        /* ── Main content ── */
        .main-content {
          flex: 1;
          overflow-y: auto;
          position: relative;
          padding: 28px 28px;
        }

        /* Bulles déco fond */
        .bg-bubbles { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .bg-b {
          position: absolute;
          border-radius: 50%;
          animation: floatBg linear infinite;
        }
        .bg-b1 {
          width: 500px; height: 500px;
          top: -100px; right: -100px;
          background: radial-gradient(circle, rgba(99,91,255,.07) 0%, transparent 70%);
          animation-duration: 20s;
        }
        .bg-b2 {
          width: 400px; height: 400px;
          bottom: 10%; left: -80px;
          background: radial-gradient(circle, rgba(168,85,247,.06) 0%, transparent 70%);
          animation-duration: 26s;
          animation-delay: -8s;
        }
        .bg-b3 {
          width: 300px; height: 300px;
          bottom: 30%; right: 20%;
          background: radial-gradient(circle, rgba(56,189,248,.05) 0%, transparent 70%);
          animation-duration: 18s;
          animation-delay: -4s;
        }
        @keyframes floatBg {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-30px); }
        }

        /* Contenu au-dessus du fond */
        .main-content > *:not(.bg-bubbles) { position: relative; z-index: 1; }
      `}</style>
    </div>
  )
}