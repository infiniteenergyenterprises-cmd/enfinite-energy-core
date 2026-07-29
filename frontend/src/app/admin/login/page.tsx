'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, Shield, Zap, Sun } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SOLAR CANVAS BACKGROUND
───────────────────────────────────────────────────────────── */
function SolarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLS = 8, ROWS = 5, PW = 80, PH = 52, GAP = 14;
    const grid: { x: number; y: number; phase: number }[] = [];

    const buildGrid = () => {
      grid.length = 0;
      const totalW = COLS * PW + (COLS - 1) * GAP;
      const totalH = ROWS * PH + (ROWS - 1) * GAP;
      const ox = (canvas.width  - totalW) / 2;
      const oy = (canvas.height - totalH) / 2 + 30;
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          grid.push({ x: ox + c*(PW+GAP), y: oy + r*(PH+GAP), phase: Math.random()*Math.PI*2 });
    };
    buildGrid();
    window.addEventListener('resize', buildGrid);

    type P = { sx:number; sy:number; prog:number; spd:number; size:number };
    const pts: P[] = Array.from({ length: 55 }, () => {
      const g = grid[Math.floor(Math.random()*grid.length)];
      return { sx: g.x+PW/2, sy: g.y+PH/2, prog: Math.random(), spd: .0025+Math.random()*.003, size: 1.5+Math.random()*2.5 };
    });

    let t = 0;

    const drawPanel = (x: number, y: number, glow: number) => {
      const r = 6;
      const g = ctx.createLinearGradient(x, y, x+PW, y+PH);
      g.addColorStop(0, `rgba(10,22,50,${.9+glow*.05})`);
      g.addColorStop(1, `rgba(6,14,34,${.95})`);
      ctx.beginPath(); ctx.roundRect(x,y,PW,PH,r);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = `rgba(59,130,246,${.18+glow*.55})`;
      ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = `rgba(30,60,140,${.3+glow*.3})`; ctx.lineWidth = .5;
      [1,2].forEach(i => { ctx.beginPath(); ctx.moveTo(x+i*PW/3,y+4); ctx.lineTo(x+i*PW/3,y+PH-4); ctx.stroke(); });
      [1].forEach(i  => { ctx.beginPath(); ctx.moveTo(x+4,y+i*PH/2); ctx.lineTo(x+PW-4,y+i*PH/2); ctx.stroke(); });
      if (glow > .35) {
        const sg = ctx.createLinearGradient(x,y,x+PW,y+PH);
        sg.addColorStop(0,'rgba(245,166,35,0)');
        sg.addColorStop(.5,`rgba(245,166,35,${glow*.12})`);
        sg.addColorStop(1,'rgba(245,166,35,0)');
        ctx.beginPath(); ctx.roundRect(x,y,PW,PH,r);
        ctx.fillStyle = sg; ctx.fill();
      }
      const shine = ctx.createLinearGradient(x,y,x+PW*.6,y+PH*.6);
      shine.addColorStop(0,`rgba(255,255,255,${glow*.06})`);
      shine.addColorStop(1,'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.roundRect(x,y,PW,PH,r);
      ctx.fillStyle = shine; ctx.fill();
    };

    const drawSun = (cx: number, cy: number) => {
      const h = ctx.createRadialGradient(cx,cy,15,cx,cy,110);
      h.addColorStop(0,'rgba(245,166,35,.22)');
      h.addColorStop(.5,'rgba(245,166,35,.07)');
      h.addColorStop(1,'rgba(245,166,35,0)');
      ctx.beginPath(); ctx.arc(cx,cy,110,0,Math.PI*2);
      ctx.fillStyle = h; ctx.fill();
      const d = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
      d.addColorStop(0,'rgba(255,240,120,1)');
      d.addColorStop(.55,'rgba(245,166,35,.95)');
      d.addColorStop(1,'rgba(249,115,22,.8)');
      ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2);
      ctx.fillStyle = d; ctx.fill();
      for (let i=0;i<12;i++) {
        const a = (i/12)*Math.PI*2 + t*.4;
        const r1=34, r2=44+Math.sin(t*2+i)*4;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);
        ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);
        ctx.strokeStyle = `rgba(245,166,35,${.5+Math.sin(t*3+i)*.25})`;
        ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
      }
    };

    const frame = () => {
      t += .012;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      const bg = ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,'#04091a');
      bg.addColorStop(.45,'#071428');
      bg.addColorStop(1,'#040810');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
      for (let i=0;i<80;i++) {
        const sx=(i*197+33)%W, sy=(i*113+17)%(H*.75);
        const blink = .3+.4*Math.abs(Math.sin(t*.8+i));
        ctx.beginPath(); ctx.arc(sx,sy,.6+(i%3)*.5,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${blink})`; ctx.fill();
      }
      const hor = ctx.createLinearGradient(0, H*.78, 0, H);
      hor.addColorStop(0,'rgba(245,166,35,.04)');
      hor.addColorStop(1,'rgba(245,166,35,0)');
      ctx.fillStyle = hor; ctx.fillRect(0,H*.78,W,H*.22);
      drawSun(W/2, 64);
      grid.forEach(p => {
        const wire = ctx.createLinearGradient(W/2,64,p.x+PW/2,p.y);
        wire.addColorStop(0,'rgba(245,166,35,.12)');
        wire.addColorStop(1,'rgba(59,130,246,.05)');
        ctx.beginPath(); ctx.moveTo(W/2,80); ctx.lineTo(p.x+PW/2,p.y);
        ctx.strokeStyle = wire; ctx.lineWidth = .6; ctx.stroke();
      });
      grid.forEach((p) => {
        const glow = (Math.sin(t*1.4+p.phase)+1)/2;
        drawPanel(p.x, p.y, glow);
      });
      const lastRow = grid.filter((_,i) => i >= grid.length-COLS);
      if (lastRow.length) {
        const sy = lastRow[0].y + PH + 8;
        const sg = ctx.createLinearGradient(0,sy,W,sy);
        sg.addColorStop(0,'rgba(245,166,35,0)');
        sg.addColorStop(.3,'rgba(245,166,35,.12)');
        sg.addColorStop(.7,'rgba(245,166,35,.12)');
        sg.addColorStop(1,'rgba(245,166,35,0)');
        ctx.fillStyle = sg; ctx.fillRect(0,sy,W,2);
      }
      pts.forEach(p => {
        p.prog += p.spd;
        if (p.prog >= 1) {
          const g2 = grid[Math.floor(Math.random()*grid.length)];
          p.sx = g2.x+PW/2; p.sy = g2.y+PH/2; p.prog = 0;
        }
        const e = p.prog < .5 ? 2*p.prog*p.prog : 1-Math.pow(-2*p.prog+2,2)/2;
        const cx2 = p.sx + (canvas.width/2 - p.sx)*e;
        const cy2 = p.sy + (64 - p.sy)*e;
        const fade = p.prog < .1 ? p.prog/.1 : p.prog > .82 ? (1-p.prog)/.18 : 1;
        const pg = ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,p.size*2.5);
        pg.addColorStop(0,`rgba(255,210,60,${.9*fade})`);
        pg.addColorStop(.5,`rgba(245,166,35,${.4*fade})`);
        pg.addColorStop(1,'rgba(245,166,35,0)');
        ctx.beginPath(); ctx.arc(cx2,cy2,p.size*2.5,0,Math.PI*2);
        ctx.fillStyle = pg; ctx.fill();
      });
      const vig = ctx.createRadialGradient(W/2,H/2,H*.25,W/2,H/2,H*.9);
      vig.addColorStop(0,'rgba(0,0,0,0)');
      vig.addColorStop(1,'rgba(0,0,0,.62)');
      ctx.fillStyle = vig; ctx.fillRect(0,0,W,H);
      raf = requestAnimationFrame(frame);
    };

    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', buildGrid);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full" style={{zIndex:0}} />;
}

/* ─────────────────────────────────────────────────────────────
   CREDENTIALS NOTE:
   The application now uses backend authentication (/api/auth/login).
   Please ensure you have registered a user with ADMIN role in the database.
───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────────────────────── */
export default function AdminLoginPage() {
  const router  = useRouter();
  const [username, setUsername] = useState('');
  const [pass,     setPass]     = useState('');
  const [show,  setShow]  = useState(false);
  const [error, setError] = useState('');
  const [busy,  setBusy]  = useState(false);
  const [tries, setTries] = useState(0);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tries >= 5) { setError('Too many attempts. Refresh the page to try again.'); return; }
    setBusy(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username.trim(), password: pass })
      });
      const data = await res.json();
      
      if (res.ok && data.token && data.user?.role === 'ADMIN') {
        const exp = new Date(Date.now() + 8 * 3600 * 1000).toUTCString();
        // Set both the legacy cookie (for backward layout compatibility if needed)
        // and the secure token cookie
        document.cookie = `admin_auth=enfinite_admin_ok; expires=${exp}; path=/`;
        document.cookie = `token=${data.token}; expires=${exp}; path=/`;
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setTries(t => t + 1);
        setError(data.message || `Invalid credentials. ${4 - tries} attempt${4 - tries === 1 ? '' : 's'} remaining.`);
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <SolarCanvas />

      <div className="relative z-10 w-full max-w-[420px] mx-4">

        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/35 backdrop-blur-md flex items-center justify-center mb-3 shadow-xl shadow-amber-400/15">
            <Sun className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-[22px] font-black text-white tracking-tight leading-none drop-shadow-lg">Admin Portal</h1>
          <p className="text-amber-400/70 text-[10px] font-bold uppercase tracking-[3px] mt-1">Enfinite Energy Pvt. Ltd.</p>
        </div>

        {/* Glass card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
          style={{ background:'rgba(8,18,42,0.72)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>

          <div className="h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <form onSubmit={login} className="px-8 py-8 space-y-4">
            <div className="mb-2">
              <h2 className="text-lg font-black text-white text-center">Sign In</h2>
              <p className="text-white/35 text-[11px] text-center mt-0.5">Enter credentials to access admin panel</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/12 border border-red-400/25 text-red-300 text-xs font-bold px-4 py-2.5 rounded-xl">
                <Shield className="w-3.5 h-3.5 shrink-0" />{error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[2px] text-white/40 mb-1.5">Email (Username)</label>
              <div className="flex items-center rounded-xl overflow-hidden transition-all"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)' }}>
                <User className="w-4 h-4 text-white/25 ml-3.5 shrink-0"/>
                <input
                  required
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  className="flex-1 px-3 py-3 bg-transparent text-white text-sm font-semibold outline-none placeholder-white/18"
                  onFocus={e  => (e.currentTarget.parentElement!.style.border = '1px solid rgba(245,166,35,0.5)')}
                  onBlur={e   => (e.currentTarget.parentElement!.style.border = '1px solid rgba(255,255,255,0.09)')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[2px] text-white/40 mb-1.5">Password</label>
              <div className="flex items-center rounded-xl overflow-hidden transition-all"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)' }}>
                <Lock className="w-4 h-4 text-white/25 ml-3.5 shrink-0"/>
                <input
                  required
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  autoComplete="current-password"
                  className="flex-1 px-3 py-3 bg-transparent text-white text-sm font-semibold outline-none placeholder-white/18"
                  onFocus={e  => (e.currentTarget.parentElement!.style.border = '1px solid rgba(245,166,35,0.5)')}
                  onBlur={e   => (e.currentTarget.parentElement!.style.border = '1px solid rgba(255,255,255,0.09)')}
                />
                <button type="button" onClick={() => setShow(s => !s)} className="pr-3.5 text-white/25 hover:text-white/60 transition-colors">
                  {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy || tries >= 5}
              className="w-full flex items-center justify-center gap-2 font-black py-3.5 rounded-xl text-sm transition-all active:scale-[0.97] disabled:opacity-50 mt-2"
              style={{ background:'linear-gradient(135deg,#F5A623,#F97316)', color:'#071428', boxShadow:'0 6px 24px rgba(245,166,35,0.35)' }}>
              {busy
                ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Authenticating...</>
                : <><Zap className="w-4 h-4"/>Sign In to Admin</>
              }
            </button>

            <p className="text-center text-[9px] text-white/18 flex items-center justify-center gap-1 pt-1">
              <Shield className="w-3 h-3"/> Secured · All access attempts are logged
            </p>
          </form>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          <div className="flex items-center justify-center gap-4 px-8 py-3">
            {[['Solar CMS','bg-blue-400'],['MNRE Approved','bg-green-400'],['Secured','bg-amber-400']].map(([l,c])=>(
              <div key={l} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${c} animate-pulse`}/>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-white/15 text-[9px] uppercase tracking-[2px] mt-4">
          Enfinite Energy © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
