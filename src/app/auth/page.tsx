"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AuthPage() {
  const [mode, setMode]       = useState<"login" | "register">("login")
  const [email, setEmail]     = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      })
      if (error) setError(error.message)
      else setSuccess("Vérifie ton email pour confirmer ton compte !")
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = "/dashboard"
    }
    setLoading(false)
  }

  const handleOAuth = async (provider: "google" | "discord" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div className="auth-root">
      {/* Bulles décoratives animées */}
      <div className="bubbles-bg" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i}`} />
        ))}
      </div>

      <div className="auth-card">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🫧</span>
          <span className="logo-text">Buuble</span>
        </div>

        <p className="tagline">
          {mode === "login" ? "Retrouve tes bulles" : "Crée ton univers"}
        </p>

        {/* OAuth */}
        <div className="oauth-row">
          {[
            { id: "google",  label: "Google",  icon: "G" },
            { id: "discord", label: "Discord", icon: "D" },
            { id: "github",  label: "GitHub",  icon: "GH" },
          ].map((p) => (
            <button
              key={p.id}
              className="oauth-btn"
              onClick={() => handleOAuth(p.id as any)}
              type="button"
            >
              <span className="oauth-icon">{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        <div className="divider"><span>ou</span></div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="form">
          {mode === "register" && (
            <div className="field">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                placeholder="ton_pseudo"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="toi@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error   && <p className="msg msg-error">{error}</p>}
          {success && <p className="msg msg-success">{success}</p>}

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="toggle">
          {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}
          {" "}
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null) }}
          >
            {mode === "login" ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ── Bulles décoratives ── */
        .bubbles-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
          animation: float linear infinite;
        }
        .bubble-0 { width:320px;height:320px; top:-80px;  left:-60px;  background:radial-gradient(circle at 30% 30%,rgba(99,91,255,.15),transparent 70%); animation-duration:18s; }
        .bubble-1 { width:180px;height:180px; top:10%;    right:8%;    background:radial-gradient(circle at 40% 40%,rgba(56,189,248,.1),transparent 70%);  animation-duration:14s; animation-delay:-4s; }
        .bubble-2 { width:240px;height:240px; bottom:5%;  left:5%;     background:radial-gradient(circle at 60% 60%,rgba(168,85,247,.1),transparent 70%);  animation-duration:20s; animation-delay:-8s; }
        .bubble-3 { width:120px;height:120px; bottom:20%; right:15%;   background:radial-gradient(circle at 50% 50%,rgba(34,197,94,.08),transparent 70%);  animation-duration:16s; animation-delay:-2s; }
        .bubble-4 { width:400px;height:400px; top:40%;    left:50%;    background:radial-gradient(circle at 20% 20%,rgba(99,91,255,.06),transparent 60%);  animation-duration:24s; animation-delay:-6s; }
        .bubble-5 { width:80px; height:80px;  top:30%;    left:20%;    background:radial-gradient(circle at 50% 50%,rgba(251,191,36,.08),transparent 70%);  animation-duration:12s; animation-delay:-1s; }
        .bubble-6 { width:160px;height:160px; top:60%;    right:30%;   background:radial-gradient(circle at 30% 70%,rgba(244,63,94,.07),transparent 70%);  animation-duration:22s; animation-delay:-10s; }

        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-18px) rotate(1deg); }
          66%      { transform: translateY(10px) rotate(-1deg); }
        }

        /* ── Card ── */
        .auth-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          margin: 24px;
          padding: 40px 36px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.6);
          animation: cardIn .5s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(24px) scale(.97); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .logo-icon { font-size: 28px; }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -.5px;
        }
        .tagline {
          font-size: 13px;
          color: rgba(255,255,255,.35);
          margin-bottom: 28px;
          font-weight: 300;
        }

        /* ── OAuth ── */
        .oauth-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .oauth-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 8px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px;
          color: rgba(255,255,255,.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: all .15s;
        }
        .oauth-btn:hover {
          background: rgba(255,255,255,.09);
          color: #fff;
          border-color: rgba(255,255,255,.15);
        }
        .oauth-icon {
          font-size: 11px;
          font-weight: 700;
          opacity: .6;
        }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .divider::before,.divider::after {
          content:'';
          flex:1;
          height:1px;
          background:rgba(255,255,255,.08);
        }
        .divider span {
          font-size: 12px;
          color: rgba(255,255,255,.25);
        }

        /* ── Form ── */
        .form { display: flex; flex-direction: column; gap: 14px; }

        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,.45);
          letter-spacing: .03em;
          text-transform: uppercase;
        }
        .field input {
          padding: 12px 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color .15s, background .15s;
        }
        .field input::placeholder { color: rgba(255,255,255,.2); }
        .field input:focus {
          border-color: rgba(99,91,255,.6);
          background: rgba(99,91,255,.06);
        }

        /* ── Messages ── */
        .msg {
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .msg-error   { background:rgba(244,63,94,.12);  color:#fb7185; border:1px solid rgba(244,63,94,.2); }
        .msg-success { background:rgba(34,197,94,.1);   color:#4ade80; border:1px solid rgba(34,197,94,.2); }

        /* ── Submit ── */
        .submit-btn {
          margin-top: 4px;
          padding: 13px;
          background: linear-gradient(135deg, #635bff, #a855f7);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity .15s, transform .1s;
          letter-spacing: .01em;
        }
        .submit-btn:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }

        /* ── Toggle ── */
        .toggle {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,.3);
        }
        .toggle button {
          background: none;
          border: none;
          color: rgba(99,91,255,.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          font-weight: 500;
          padding: 0;
        }
        .toggle button:hover { color: #a78bfa; }
      `}</style>
    </div>
  )
}