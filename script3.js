/*!
 * COSMOSIS Learn Engine v2 (script3.js) - Top-Left Quiz Button Edition
 * - Hidden left-middle dock with two arrow tabs: AI and Learn
 * - Arrow icons positioned on the far right inside the tabs
 * - Animated slide-in drawers (AI quick panel / Learn dashboard)
 * - XP + levels + daily streak, per-mission quizzes, badges, confetti
 * - Premium certificate: live preview, editable name, PNG + PDF download
 * Works on every page. Add before </body> on EVERY page:  <script src="script3.js"></script>
 */
(function () {
  'use strict';
  if (window.__cosLearn) return; window.__cosLearn = 1;
  var KEY = 'cosmosis_learn_v1';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var TAU = Math.PI * 2;

  /* ---------- question bank: [question, [options], correctIndex, explanation] ---------- */
  var M = {
    chandrayaan: { t: 'Chandrayaan-3', i: '🌕', b: 'Lunar Pioneer', q: [
      ['Which part of Chandrayaan-3 landed on the Moon?', ['Pragyan orbiter', 'Vikram lander', 'LVM3 booster', 'Aditya probe'], 1, 'Vikram is the lander; it carried the rover Pragyan.'],
      ['When did Chandrayaan-3 touch down?', ['23 Aug 2023', '5 Nov 2013', '19 Apr 1975', '2 Sep 2023'], 0, 'Touchdown was on 23 August 2023.'],
      ['What was the name of the rover?', ['Vikram', 'Pragyan', 'Drishti', 'Aryabhata'], 1, 'Pragyan means "wisdom" in Sanskrit.'],
      ['Which rocket launched Chandrayaan-3?', ['PSLV', 'GSLV Mk I', 'LVM3', 'SSLV'], 2, 'LVM3 carried it to orbit on 14 July 2023.'],
      ['Chandrayaan-3 landed near the Moon\'s…', ['Equator', 'North pole', 'South polar region', 'Far side centre'], 2, 'It landed near the lunar south pole, a first for any nation.']] },
    mars: { t: 'Mangalyaan', i: '🔴', b: 'Mars Voyager', q: [
      ['What does Mangalyaan study?', ['Jupiter', 'Mars', 'The Sun', 'Venus'], 1, 'Mangalyaan is the Mars Orbiter Mission (MOM).'],
      ['When did it enter Mars orbit?', ['24 Sep 2014', '5 Nov 2013', '23 Aug 2023', '3 May 2026'], 0, 'It reached Mars orbit on 24 September 2014.'],
      ['India became the first nation to reach Mars orbit…', ['After 10 tries', 'On its first attempt', 'Using a US rocket', 'With a crew'], 1, 'India succeeded on the very first attempt.'],
      ['Which rocket launched MOM?', ['PSLV', 'LVM3', 'GSLV Mk III', 'Saturn V'], 0, 'PSLV-C25 launched it on 5 Nov 2013.']] },
    aditya: { t: 'Aditya-L1', i: '☀️', b: 'Sun Watcher', q: [
      ['What is Aditya-L1\'s target?', ['Moon', 'Mars', 'The Sun', 'Saturn'], 2, 'It is India\'s first space-based solar observatory.'],
      ['What does "L1" mean?', ['Launch 1', 'Lagrange point 1', 'Level 1', 'Lunar orbit 1'], 1, 'L1 is a gravity-balanced point between Earth and the Sun.'],
      ['Roughly how far is L1 from Earth?', ['400 km', '36,000 km', '1.5 million km', '150 million km'], 2, 'About 1.5 million km, about 1% of the Earth–Sun distance.'],
      ['Why observe the Sun from L1?', ['It is hotter there', 'Uninterrupted view, no eclipses', 'It is closer to Mars', 'Cheaper fuel only'], 1, 'From L1 the Sun is always in view.']] },
    aryabhata: { t: 'Aryabhata', i: '🛰️', b: 'First Satellite', q: [
      ['Aryabhata was India\'s…', ['First satellite', 'First Moon mission', 'First rover', 'First crewed flight'], 0, 'Launched 19 April 1975.'],
      ['Who was it named after?', ['A rocket scientist', 'An ancient mathematician-astronomer', 'A king', 'An astronaut'], 1, 'Aryabhata was a 5th-century Indian mathematician and astronomer.'],
      ['In which year was it launched?', ['1963', '1975', '1984', '2008'], 1, 'Aryabhata went up in 1975.'],
      ['It orbited…', ['The Moon', 'Mars', 'The Earth', 'The Sun'], 2, 'It was an Earth-orbiting satellite for X-ray astronomy and aeronomy.']] },
    navic: { t: 'NavIC', i: '📡', b: 'Navigator', q: [
      ['NavIC stands for…', ['National Voyage in Cosmos', 'Navigation with Indian Constellation', 'New Aerial Vehicle for India', 'Network of Indian Clouds'], 1, 'NavIC = Navigation with Indian Constellation.'],
      ['NavIC is a…', ['Weather satellite', 'Regional navigation system', 'Moon rover', 'Space telescope'], 1, 'It provides positioning over India and the surrounding region.'],
      ['Who runs NavIC?', ['NASA', 'ESA', 'ISRO', 'JAXA'], 2, 'It is built and operated by ISRO.'],
      ['Its first satellite launched in…', ['July 2013', 'March 1999', 'Aug 2023', 'May 2026'], 0, 'IRNSS-1A launched on 1 July 2013.']] },
    drishti: { t: 'Drishti', i: '👁️', b: 'Eye in the Sky', q: [
      ['Drishti combines which two sensors?', ['Radio + GPS', 'SAR + Electro-Optical', 'Laser + Sonar', 'Infrared + Magnetometer'], 1, 'Radar (SAR) sees through clouds; optical gives colour images.'],
      ['Drishti orbits at about…', ['500 km', '36,000 km', '1.5 million km', '50 km'], 0, 'It is in a ~500 km sun-synchronous orbit.'],
      ['Why is SAR useful?', ['Works day, night and through clouds', 'Only works in daylight', 'Makes the satellite lighter', 'Reduces cost to zero'], 0, 'Radar supplies its own signal, so weather and darkness don\'t block it.']] },
    game: { t: 'Spacewalk Physics', i: '🚀', b: 'Spacewalker', q: [
      ['In space, a drifting tool keeps moving unless…', ['It gets tired', 'A force acts on it', 'Time passes', 'It is dark'], 1, 'Newton\'s first law: motion changes only when a force acts.'],
      ['Why is there almost no air resistance in orbit?', ['Gravity is zero', 'It is nearly a vacuum', 'Tools are light', 'Magnets'], 1, 'Orbit is nearly a vacuum, so little drag slows objects.'],
      ['Why do astronauts use tethers?', ['To breathe', 'To avoid drifting away', 'For communication only', 'For heat'], 1, 'Nothing stops a drifting astronaut without a tether or thrust.']] }
  };
  var FILES = { index3: 'chandrayaan', index4: 'mars', index5: 'aditya', index6: 'aryabhata', index8: 'navic', index9: 'drishti', index7: 'game' };
  var ids = Object.keys(M);
  var here = FILES[(location.pathname.split('/').pop() || '').replace(/\.html?$/, '')] || null;

  /* Suggested prompts for the AI panel */
  var PROMPTS = [
    'Explain Chandrayaan-3 like I am 10',
    'Why was Mangalyaan so low-cost?',
    'What is Aditya-L1 studying?',
    'Quiz me on Indian space missions'
  ];

  /* ---------- state ---------- */
  function fresh() { return { xp: 0, best: {}, seen: {}, perfect: {}, streak: 0, lastDay: '' }; }
  var S = fresh();
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function lvl() { return Math.floor(S.xp / 100) + 1; }
  function done(id) { return (S.best[id] || 0) >= Math.ceil(M[id].q.length * .6); }
  function nDone() { return ids.filter(done).length; }
  function nPerfect() { return ids.filter(function (k) { return S.perfect[k]; }).length; }
  function rank() { var l = lvl(); return l >= 5 ? 'Mission Commander' : l >= 4 ? 'Flight Director' : l >= 3 ? 'Orbital Navigator' : 'Space Cadet'; }
  function user() { try { return (JSON.parse(localStorage.getItem('cosmosis_current_user')) || {}).name || 'Cadet'; } catch (e) { return 'Cadet'; } }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function dailyCheck() {
    var t = dayKey(); if (S.lastDay === t) return 0;
    var y = new Date(); y.setDate(y.getDate() - 1);
    S.streak = S.lastDay === dayKey(y) ? (S.streak || 0) + 1 : 1; S.lastDay = t; S.xp += 5; save(); return S.streak;
  }

  /* ---------- styles (Left Dock + Top-Left Quiz Button) ---------- */
  var st = document.createElement('style');
  st.textContent = [
    /* ===== dock: two tabs tucked in the left-middle ===== */
    '#cq-dock{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:99994;display:flex;flex-direction:column;gap:14px;align-items:flex-start;pointer-events:none;transition:opacity .4s,visibility .4s}',
    '#cq-dock.off{opacity:0;visibility:hidden}',
    '.cq-tab{pointer-events:auto;position:relative;display:flex;align-items:center;gap:9px;height:52px;padding:0 10px 0 14px;border:1px solid rgba(168,120,255,.55);border-left:0;border-radius:0 18px 18px 0;background:linear-gradient(135deg,rgba(34,26,80,.94),rgba(14,10,38,.94));-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#fff;font:700 13px/1 Inter,system-ui,sans-serif;cursor:pointer;white-space:nowrap;box-shadow:6px 0 26px rgba(124,58,237,.35);transform:translateX(calc(-100% + 32px));transition:transform .55s cubic-bezier(.16,1,.3,1),box-shadow .3s,border-color .3s}',
    '#cq-dock:not(.off) .cq-tab{animation:cqDockIn 1.1s cubic-bezier(.16,1,.3,1) backwards}',
    '#cq-dock:not(.off) .cq-tab[data-p=ai]{animation-delay:.9s}#cq-dock:not(.off) .cq-tab[data-p=learn]{animation-delay:1.1s}',
    '.cq-tab::before{content:"";position:absolute;right:-12px;top:-7px;bottom:-7px;width:12px}',
    '.cq-tab:hover,.cq-tab:focus-visible{transform:translateX(0);box-shadow:8px 0 36px rgba(34,211,238,.5);border-color:rgba(103,232,249,.8);outline:none}',
    '.cq-tab.on,.cq-tab.on:hover{transform:translateX(calc(-100% + 32px));border-color:rgba(103,232,249,.9);box-shadow:8px 0 30px rgba(34,211,238,.55)}',
    '.cq-tab[data-p=ai]{border-color:rgba(34,211,238,.55)}',
    '.cq-arr{display:grid;place-items:center;width:22px;height:22px;flex:none;margin-left:auto;border-radius:50%;background:rgba(255,255,255,.14);transition:transform .55s cubic-bezier(.16,1,.3,1),background .3s;animation:cqNudge 2.2s ease-in-out 3s infinite}',
    '.cq-tab:hover .cq-arr,.cq-tab:focus-visible .cq-arr,.cq-tab.on .cq-arr{animation:none}',
    '.cq-tab.on .cq-arr{transform:rotate(180deg);background:rgba(34,211,238,.4)}',
    '.cq-ic{font-size:18px;position:relative}.cq-tab small{opacity:.7;font-weight:600;font-size:11px}',
    '.cq-dot{position:absolute;right:-3px;top:-3px;width:8px;height:8px;border-radius:50%;background:#facc15;box-shadow:0 0 8px #facc15;transition:background .3s}.cq-dot.ok{background:#34d399;box-shadow:0 0 8px #34d399}',
    '@keyframes cqDockIn{from{transform:translateX(-100%)}}@keyframes cqNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}',

    /* ===== drawer (left-aligned) ===== */
    '#cq-scrim{position:fixed;inset:0;z-index:99990;background:radial-gradient(circle at 0% 50%,rgba(124,58,237,.32),rgba(3,2,12,.62) 62%);opacity:0;pointer-events:none;transition:opacity .5s}#cq-scrim.on{opacity:1;pointer-events:auto}',
    '#cq-drawer{position:fixed;left:14px;top:50%;z-index:99993;width:min(410px,calc(100vw - 28px));height:min(690px,calc(100vh - 28px));display:flex;flex-direction:column;overflow:hidden;color:#e9e5ff;font:14px/1.5 Inter,system-ui,sans-serif;border:1px solid transparent;border-radius:26px;',
    'background:linear-gradient(165deg,#1b1544,#0a0720) padding-box,linear-gradient(120deg,#8b5cf6,#22d3ee,#f472b6,#8b5cf6) border-box;background-size:100% 100%,300% 300%;',
    'box-shadow:0 30px 90px rgba(0,0,0,.65),0 0 70px rgba(124,58,237,.4);transform-origin:0% 50%;transform:perspective(1400px) translate(-118%,-50%) rotateY(26deg) scale(.9);opacity:0;visibility:hidden;transition:transform .85s cubic-bezier(.16,1,.3,1),opacity .45s,visibility 0s .85s}',
    '#cq-drawer.on{transform:perspective(1400px) translate(0,-50%) rotateY(0) scale(1);opacity:1;visibility:visible;transition:transform .85s cubic-bezier(.16,1,.3,1),opacity .4s,visibility 0s;animation:cqBorder 7s linear infinite}',
    '@keyframes cqBorder{from{background-position:0 0,0% 50%}to{background-position:0 0,150% 50%}}',
    '.cq-dh{display:flex;align-items:center;gap:12px;padding:18px 18px 12px;flex:none}',
    '.cq-di{width:46px;height:46px;border-radius:15px;display:grid;place-items:center;font-size:23px;background:linear-gradient(135deg,#7c3aed,#06b6d4);box-shadow:0 0 26px rgba(124,58,237,.65);animation:cqBreath 3s ease-in-out infinite}',
    '.cq-dh h3{margin:0;font:800 16px Orbitron,Inter,sans-serif;letter-spacing:.04em}.cq-dh p{margin:0;font-size:11.5px;opacity:.65}',
    '.cq-dx{margin-left:auto;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;font-size:20px;line-height:1;cursor:pointer;transition:.3s}.cq-dx:hover{background:rgba(244,63,94,.35);transform:rotate(90deg)}',
    '.cq-db{flex:1;overflow-y:auto;overflow-x:hidden;padding:4px 18px 20px;scrollbar-width:thin;scrollbar-color:rgba(139,92,246,.5) transparent}',
    '.cq-st{animation:cqUp .75s cubic-bezier(.16,1,.3,1) backwards;animation-delay:calc(var(--i,0) * 70ms + 300ms)}',
    '@keyframes cqUp{from{opacity:0;transform:translateX(-38px) scale(.95)}}',

    /* hero + rows (learn) */
    '.cq-hero{display:flex;align-items:center;gap:16px;padding:14px;border-radius:20px;background:linear-gradient(135deg,rgba(124,58,237,.28),rgba(6,182,212,.14));border:1px solid rgba(168,120,255,.35)}',
    '.cq-rank{font:700 10.5px Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#67e8f9}.cq-lvl{font:800 26px Orbitron,sans-serif;background:linear-gradient(90deg,#c4b5fd,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1.2}',
    '.cq-chips{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.cq-chips span{padding:6px 11px;border-radius:999px;font-size:11.5px;font-weight:700;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14)}',
    '.cq-h4{margin:14px 2px 8px;font:700 11px Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;opacity:.6}',
    '.cq-row{display:flex;align-items:center;gap:12px;padding:9px 11px;margin-bottom:8px;border-radius:15px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);transition:.3s}.cq-row:hover{background:rgba(139,92,246,.2);border-color:rgba(168,120,255,.5);transform:translateX(4px)}',
    '.cq-row.ok{border-color:rgba(250,204,21,.5);background:rgba(250,204,21,.08)}',
    '.cq-ri{width:38px;height:38px;flex:none;display:grid;place-items:center;font-size:20px;border-radius:12px;background:rgba(255,255,255,.08)}',
    '.cq-rm{flex:1;min-width:0}.cq-rm b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cq-rm small{opacity:.65;font-size:11px}',
    '.cq-go{flex:none;padding:7px 13px;border:0;border-radius:10px;color:#fff;font:700 11.5px Inter,sans-serif;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#06b6d4);transition:.25s}.cq-go:hover{transform:scale(1.07);box-shadow:0 0 16px rgba(34,211,238,.5)}',
    '.cq-certcard{margin-top:14px;padding:16px;border-radius:20px;text-align:center;border:1px dashed rgba(255,255,255,.25);background:rgba(255,255,255,.04)}',
    '.cq-certcard.ready{border:1px solid rgba(250,204,21,.7);background:linear-gradient(135deg,rgba(250,204,21,.16),rgba(244,114,182,.1));box-shadow:0 0 34px rgba(250,204,21,.25);animation:cqGold 2.6s ease-in-out infinite}',
    '@keyframes cqGold{50%{box-shadow:0 0 54px rgba(250,204,21,.5)}}',
    '.cq-link{background:none;border:0;color:#a5b4fc;opacity:.7;font-size:11.5px;cursor:pointer;margin-top:10px;text-decoration:underline}.cq-link:hover{opacity:1}',

    /* AI panel */
    '.cq-orb{position:relative;width:140px;height:140px;margin:4px auto 16px}',
    '.cq-orb i{position:absolute;border-radius:50%}',
    '.cq-orb .c{inset:30px;background:radial-gradient(circle at 33% 28%,#fff,#a5f3fc 20%,#8b5cf6 62%,#1e1b4b);box-shadow:0 0 44px #22d3ee,0 0 100px rgba(124,58,237,.7);animation:cqBreath 3s ease-in-out infinite}',
    '.cq-orb .r1{inset:14px;border:2px solid transparent;border-top-color:#22d3ee;border-bottom-color:#f472b6;animation:cqSpin 3.2s linear infinite}',
    '.cq-orb .r2{inset:2px;border:2px solid transparent;border-left-color:#a78bfa;border-right-color:#67e8f9;animation:cqSpin 5.4s linear infinite reverse}',
    '.cq-orb .r3{inset:-10px;border:1px dashed rgba(196,181,253,.45);animation:cqSpin 16s linear infinite}',
    '@keyframes cqSpin{to{transform:rotate(360deg)}}@keyframes cqBreath{50%{transform:scale(1.1);filter:brightness(1.25)}}',
    '.cq-stat{display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:999px;font-size:11.5px;font-weight:700;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15)}',
    '.cq-stat i{width:8px;height:8px;border-radius:50%;background:#facc15;box-shadow:0 0 8px #facc15}.cq-stat.ok i{background:#34d399;box-shadow:0 0 8px #34d399}',
    '.cq-pc{display:block;width:100%;text-align:left;margin:7px 0;padding:11px 14px;border-radius:14px;color:inherit;font:600 12.5px Inter,sans-serif;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.38);cursor:pointer;transition:.3s}.cq-pc:hover{background:rgba(139,92,246,.35);transform:translateX(5px);border-color:#a78bfa}',
    '.cq-pc::before{content:"✦  ";color:#67e8f9}',

    /* ===== top-left quiz button (aligned with back-btn) ===== */
    '#cq-quiz{position:fixed;top:calc(env(safe-area-inset-top, 0px) + 12px);left:calc(env(safe-area-inset-left, 0px) + 132px);z-index:1000;display:inline-flex;align-items:center;height:36px;padding:0 14px;font:700 12px Inter,system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,#7c3aed,#06b6d4);border:0;border-radius:999px;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:calc(100vw - 155px);animation:cqIn .8s cubic-bezier(.16,1,.3,1) 1.2s backwards,cqPulse 2.4s ease-in-out 3s infinite}',
    '@media(max-width:560px){#cq-quiz{left:calc(env(safe-area-inset-left, 0px) + 124px);max-width:calc(100vw - 140px);font-size:11px;padding:0 10px}}',
    '#cq-veil{position:fixed;inset:0;z-index:99995;display:none;align-items:center;justify-content:center;background:rgba(5,3,18,.8);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);padding:14px}#cq-veil.on{display:flex;animation:cqFade .3s}',
    '#cq-box{width:min(560px,100%);max-height:92vh;overflow-x:hidden;overflow-y:auto;color:#e9e5ff;font:14px/1.5 Inter,system-ui,sans-serif;background:linear-gradient(160deg,#17123a,#0b0820);border:1px solid rgba(168,120,255,.45);border-radius:22px;padding:22px;box-shadow:0 0 60px rgba(124,58,237,.5);animation:cqPop .5s cubic-bezier(.16,1,.3,1)}',
    '#cq-box.wide{width:min(1000px,100%)}',
    '#cq-box h2{margin:0 0 4px;font:800 18px Orbitron,Inter,sans-serif;letter-spacing:.04em}#cq-box .cq-s,.cq-s{opacity:.65;font-size:12px;margin-bottom:12px}',
    '.cq-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.cq-x{background:none;border:0;color:#fff;font-size:22px;cursor:pointer;opacity:.7}',
    '.cq-bar{height:6px;border-radius:9px;background:rgba(255,255,255,.12);overflow:hidden;margin:6px 0 8px}.cq-bar i{display:block;height:100%;background:linear-gradient(90deg,#8b5cf6,#22d3ee);transition:width .8s cubic-bezier(.16,1,.3,1)}',
    '#cq-box .cq-bar{margin:6px 0 14px}',
    '.cq-o{display:block;width:100%;text-align:left;margin:7px 0;padding:11px 14px;border-radius:12px;color:inherit;font:inherit;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);cursor:pointer;transition:.2s}.cq-o:hover:not(:disabled){background:rgba(139,92,246,.28);transform:translateX(4px)}',
    '.cq-o.ok{background:rgba(34,197,94,.28);border-color:#22c55e;animation:cqPop .4s}.cq-o.no{background:rgba(239,68,68,.25);border-color:#ef4444;animation:cqShake .4s}',
    '.cq-ex{margin:10px 0;padding:10px 12px;border-left:3px solid #22d3ee;background:rgba(34,211,238,.08);border-radius:8px;font-size:13px;animation:cqFade .3s}',
    '.cq-btn{margin-top:8px;padding:10px 18px;border:0;border-radius:12px;color:#fff;font:700 13px Inter,sans-serif;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#06b6d4);transition:.25s}.cq-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 22px rgba(124,58,237,.5)}.cq-btn.g{background:rgba(255,255,255,.1)}.cq-btn.gold{background:linear-gradient(135deg,#f59e0b,#fde68a);color:#3b2200}',
    '.cq-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;margin:12px 0}.cq-card{padding:12px 8px;text-align:center;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:12px}.cq-card.on{border-color:#facc15;background:rgba(250,204,21,.12);animation:cqPop .6s backwards}.cq-card.off{opacity:.4;filter:grayscale(1)}.cq-card b{display:block;font-size:26px;margin-bottom:4px}',
    '.cq-big{font:800 40px Orbitron,sans-serif;text-align:center;margin:6px 0;background:linear-gradient(90deg,#c4b5fd,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent}',

    /* certificate preview */
    '.cq-nmrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:2px 0 14px;font-size:12px}.cq-nmrow label{opacity:.7;font-weight:600}',
    '.cq-nmrow input{flex:1;min-width:180px;padding:9px 13px;border-radius:11px;color:#fff;font:600 13px Inter,sans-serif;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);outline:none}.cq-nmrow input:focus{border-color:#22d3ee;box-shadow:0 0 0 3px rgba(34,211,238,.2)}',
    '.cq-cwrap{position:relative;min-height:220px;display:grid;place-items:center;perspective:1300px}',
    '.cq-tilt{position:relative;overflow:hidden;border-radius:10px;width:fit-content;max-width:100%;line-height:0;box-shadow:0 22px 60px rgba(0,0,0,.65),0 0 46px rgba(250,204,21,.2);transition:transform .25s ease-out;animation:cqReveal 1.1s cubic-bezier(.16,1,.3,1) backwards}',
    '.cq-tilt img{width:auto;height:auto;max-width:100%;max-height:calc(92vh - 245px);display:block}',
    '.cq-shine{position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 38%,rgba(255,255,255,.38) 50%,transparent 62%);transform:translateX(-130%);animation:cqShine 2.4s 1.1s ease-in-out 2}.cq-tilt:hover .cq-shine{animation:cqShine 1.3s ease-in-out}',
    '.cq-sp{position:absolute;color:#fde68a;text-shadow:0 0 10px #facc15;pointer-events:none;line-height:1;animation:cqTw 2.2s ease-in-out infinite}',
    '.cq-act{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.cq-act .cq-btn{margin-top:0}',
    '.cq-load{display:flex;align-items:center;gap:12px;font-weight:600;opacity:.8}.cq-load i{width:22px;height:22px;border-radius:50%;border:3px solid rgba(255,255,255,.2);border-top-color:#22d3ee;animation:cqSpin .8s linear infinite}',
    '@keyframes cqReveal{from{opacity:0;transform:perspective(1300px) rotateX(26deg) translateY(50px) scale(.8)}}@keyframes cqShine{to{transform:translateX(130%)}}@keyframes cqTw{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:1;transform:scale(1) rotate(45deg)}}',

    '.cq-toast{position:fixed;left:50%;top:18px;z-index:99999;transform:translateX(-50%);padding:12px 20px;border-radius:14px;color:#fff;font:700 13px Inter,sans-serif;background:linear-gradient(135deg,#7c3aed,#0891b2);box-shadow:0 0 30px rgba(124,58,237,.7);animation:cqDrop .6s cubic-bezier(.16,1,.3,1)}',
    '#cq-cv{position:fixed;inset:0;z-index:99998;pointer-events:none}',
    '@keyframes cqIn{from{opacity:0;transform:translateY(30px) scale(.9)}}@keyframes cqFade{from{opacity:0}}@keyframes cqPop{from{opacity:0;transform:scale(.88)}}',
    '@keyframes cqShake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}@keyframes cqDrop{from{opacity:0;transform:translate(-50%,-30px)}}',
    '@keyframes cqPulse{50%{box-shadow:0 0 0 10px rgba(124,58,237,0)}0%{box-shadow:0 0 0 0 rgba(124,58,237,.6)}}',
    '@media(max-width:520px){#cq-drawer{left:8px;width:calc(100vw - 16px);height:min(690px,calc(100vh - 16px))}.cq-db{padding-left:34px}.cq-tab{height:48px}}',
    '@media(prefers-reduced-motion:reduce){#cq-dock .cq-tab,#cq-quiz,#cq-box,.cq-o,.cq-card,.cq-toast,.cq-st,.cq-arr,.cq-di,.cq-orb i,.cq-tilt,.cq-shine,.cq-sp,.cq-certcard,#cq-drawer.on{animation:none!important}#cq-drawer{transition:opacity .2s,visibility 0s .2s;transform:translate(0,-50%)}#cq-drawer.on{transition:opacity .2s}}'
  ].join('\n');
  document.head.appendChild(st);

  /* ---------- helpers: toast (queued) + confetti ---------- */
  var tq = [], tbusy = false;
  function toast(msg) { tq.push(msg); if (!tbusy) nextToast(); }
  function nextToast() {
    var m = tq.shift(); if (!m) { tbusy = false; return; } tbusy = true;
    var t = document.createElement('div'); t.className = 'cq-toast fixed'; t.textContent = m; document.body.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .45s'; t.style.opacity = 0; setTimeout(function () { t.remove(); nextToast(); }, 450); }, 2400);
  }
  function confetti(gold) {
    if (RM) return;
    var c = document.createElement('canvas'); c.id = 'cq-cv'; c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    var x = c.getContext('2d'), P = [], col = gold ? ['#facc15', '#fde68a', '#f59e0b', '#fff', '#22d3ee', '#f472b6'] : ['#8b5cf6', '#22d3ee', '#facc15', '#f472b6', '#4ade80'];
    for (var i = 0; i < (gold ? 190 : 130); i++) P.push({ x: innerWidth / 2, y: innerHeight * .6, vx: (Math.random() - .5) * 18, vy: -Math.random() * 16 - 4, s: 4 + Math.random() * 5, c: col[i % col.length], r: Math.random() * 6 });
    var f = 0;
    (function tick() {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach(function (p) { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); });
      if (++f < 130) requestAnimationFrame(tick); else c.remove();
    })();
  }

  /* ---------- UI shell ---------- */
  var veil, box, dock, drawer, scrim, dBody, dTitle, dSub, dIcon, curP = null, lastTab = null;
  var ARROW = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  function aiReady() { return !!(window.botpress || window.botpressWebChat); }
  function onAIPage() { return !!document.getElementById('section-ai'); }

  function mount() {
    /* dock with arrow inside tab placed on the right */
    dock = document.createElement('div'); dock.id = 'cq-dock'; dock.className = 'fixed off'; dock.setAttribute('role', 'toolbar'); dock.setAttribute('aria-label', 'Quick panels');
    dock.innerHTML =
      '<button type="button" class="cq-tab" data-p="ai" aria-expanded="false" aria-label="Open Cosmosis AI panel" title="Cosmosis AI">' +
      '<span>AI</span><span class="cq-ic">✨<span class="cq-dot" id="cq-dot"></span></span><span class="cq-arr">' + ARROW + '</span></button>' +
      '<button type="button" class="cq-tab" data-p="learn" aria-expanded="false" aria-label="Open Learn and progress panel" title="Learn &amp; progress">' +
      '<span class="cq-ic">🎓</span><span>Learn</span><small id="cq-lv"></small><span class="cq-arr">' + ARROW + '</span></button>';
    document.body.appendChild(dock);
    dock.addEventListener('click', function (e) { var b = e.target.closest('.cq-tab'); if (b) { lastTab = b; togglePanel(b.dataset.p); } });

    /* scrim + drawer */
    scrim = document.createElement('div'); scrim.id = 'cq-scrim'; scrim.className = 'fixed'; scrim.onclick = closePanel; document.body.appendChild(scrim);
    drawer = document.createElement('aside'); drawer.id = 'cq-drawer'; drawer.className = 'fixed'; drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'false'); drawer.setAttribute('aria-label', 'Side panel');
    drawer.innerHTML = '<div class="cq-dh"><div class="cq-di" id="cq-di"></div><div><h3 id="cq-dt"></h3><p id="cq-ds"></p></div><button type="button" class="cq-dx" aria-label="Close panel">×</button></div><div class="cq-db" id="cq-db"></div>';
    document.body.appendChild(drawer);
    dBody = drawer.querySelector('#cq-db'); dTitle = drawer.querySelector('#cq-dt'); dSub = drawer.querySelector('#cq-ds'); dIcon = drawer.querySelector('#cq-di');
    drawer.querySelector('.cq-dx').onclick = closePanel;
    dBody.addEventListener('click', onDrawerClick);

    /* modal (quiz / certificate) */
    if (here) { var q = document.createElement('button'); q.id = 'cq-quiz'; q.className = 'fixed'; q.textContent = '🎯 Take the ' + M[here].t + ' quiz'; q.onclick = function () { quiz(here); }; document.body.appendChild(q); }
    veil = document.createElement('div'); veil.id = 'cq-veil'; veil.className = 'fixed'; veil.setAttribute('role', 'dialog'); veil.setAttribute('aria-modal', 'true');
    veil.innerHTML = '<div id="cq-box"></div>'; box = veil.firstChild; document.body.appendChild(veil);
    veil.onclick = function (e) { if (e.target === veil) close(); };
    addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (veil.classList.contains('on')) close(); else if (curP) closePanel(); } });

    /* hide the dock while the sign-in overlay is up */
    var am = document.getElementById('authModal');
    function syncDock() { var blocked = !!am && !am.classList.contains('hidden'); dock.classList.toggle('off', blocked); if (blocked && curP) closePanel(); }
    if (am && window.MutationObserver) new MutationObserver(syncDock).observe(am, { attributes: true, attributeFilter: ['class'] });
    syncDock();

    /* AI status dot: yellow while connecting, green when the chat is ready (only on the page that hosts the AI) */
    (function pollAI(n) {
      var d = document.getElementById('cq-dot'); if (!d) return;
      if (!onAIPage()) { d.style.display = 'none'; return; }
      d.classList.toggle('ok', aiReady());
      if (!aiReady() && n < 30) setTimeout(function () { pollAI(n + 1); }, 600);
    })(0);

    refresh();

    /* first-visit XP + daily streak */
    var delay = 0;
    if (here && !S.seen[here]) { S.seen[here] = 1; S.xp += 10; save(); refresh(); toast('🛰️ New mission explored  +10 XP'); delay = 1; }
    var sk = dailyCheck();
    if (sk) { refresh(); toast('🔥 Day ' + sk + ' streak  +5 XP'); }
  }

  function refresh() {
    var lv = document.getElementById('cq-lv'); if (lv) lv.textContent = 'Lv ' + lvl() + ' · ' + nDone() + '/' + ids.length;
  }
  function open(html, wide) { box.classList.toggle('wide', !!wide); box.innerHTML = html; veil.classList.add('on'); box.scrollTop = 0; }
  function close() { veil.classList.remove('on'); }
  function bind(sel, fn) { var n = box.querySelector(sel); if (n) n.onclick = fn; }

  /* ---------- drawer: open / close / render ---------- */
  var HEAD = {
    ai: { i: '✨', t: 'Cosmosis AI', s: 'Your space-science copilot' },
    learn: { i: '🎓', t: 'Mission Control', s: 'Progress · quizzes · certificate' }
  };
  function togglePanel(p) { if (curP === p) closePanel(); else openPanel(p); }
  function openPanel(p) {
    if (veil.classList.contains('on')) close();
    curP = p;
    var h = HEAD[p]; dIcon.textContent = h.i; dTitle.textContent = h.t; dSub.textContent = h.s;
    dBody.innerHTML = p === 'ai' ? renderAI() : renderLearn(); dBody.scrollTop = 0;
    drawer.classList.add('on'); scrim.classList.add('on');
    dock.querySelectorAll('.cq-tab').forEach(function (b) { var on = b.dataset.p === p; b.classList.toggle('on', on); b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    if (p === 'learn') setTimeout(function () { var r = document.getElementById('cq-ring'); if (r) r.style.strokeDashoffset = r.getAttribute('data-to'); }, 120);
    setTimeout(function () { var x = drawer.querySelector('.cq-dx'); if (x && curP) x.focus({ preventScroll: true }); }, 350);
  }
  function closePanel() {
    curP = null; drawer.classList.remove('on'); scrim.classList.remove('on');
    dock.querySelectorAll('.cq-tab').forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-expanded', 'false'); });
    if (lastTab && document.activeElement && drawer.contains(document.activeElement)) { try { lastTab.focus({ preventScroll: true }); } catch (e) { } }
  }

  function renderLearn() {
    var pc = Math.round(nDone() / ids.length * 100), all = nDone() === ids.length, R = 40, C = 2 * Math.PI * R, lv = lvl(), into = S.xp % 100;
    var h = '<div class="cq-st cq-hero" style="--i:0"><svg width="96" height="96" viewBox="0 0 110 110" style="flex:none"><circle cx="55" cy="55" r="' + R + '" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="9"/><circle id="cq-ring" data-to="' + (C * (1 - pc / 100)) + '" cx="55" cy="55" r="' + R + '" fill="none" stroke="#22d3ee" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" transform="rotate(-90 55 55)" style="transition:stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)"/><text x="55" y="61" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">' + pc + '%</text></svg>' +
      '<div style="flex:1;min-width:0"><div class="cq-rank">' + rank() + '</div><div class="cq-lvl">Level ' + lv + '</div><div class="cq-bar"><i style="width:' + into + '%"></i></div><div class="cq-s" style="margin:0">' + S.xp + ' XP · ' + (100 - into) + ' to Level ' + (lv + 1) + '</div></div></div>' +
      '<div class="cq-chips cq-st" style="--i:1"><span>🔥 ' + Math.max(1, S.streak || 0) + '-day streak</span><span>🏅 ' + nDone() + '/' + ids.length + ' cleared</span><span>⭐ ' + nPerfect() + ' perfect</span></div>' +
      '<div class="cq-h4 cq-st" style="--i:2">Missions</div>' +
      ids.map(function (id, n) {
        var m = M[id], d = done(id);
        return '<div class="cq-row cq-st ' + (d ? 'ok' : '') + '" style="--i:' + (n + 3) + '"><span class="cq-ri">' + m.i + '</span><div class="cq-rm"><b>' + esc(m.t) + '</b><small>' + (d ? '🏅 ' : '') + esc(m.b) + ' · ' + (S.best[id] || 0) + '/' + m.q.length + '</small></div><button type="button" class="cq-go" data-q="' + id + '">' + (d ? 'Replay' : 'Quiz') + '</button></div>';
      }).join('') +
      '<div class="cq-certcard cq-st ' + (all ? 'ready' : '') + '" style="--i:' + (ids.length + 3) + '">' +
      (all ? '<div style="font-size:30px">🏆</div><b>All missions cleared!</b><div class="cq-s" style="margin:4px 0 6px">Your certificate is ready.</div><button type="button" class="cq-btn gold" id="cq-cert">🎓 Claim certificate</button>'
        : '<div style="font-size:26px">🔒</div><b>Certificate locked</b><div class="cq-s" style="margin:4px 0 0">Clear ' + (ids.length - nDone()) + ' more mission' + (ids.length - nDone() === 1 ? '' : 's') + ' (60%+ on each quiz) to unlock it.</div>') +
      '</div><div style="text-align:center"><button type="button" class="cq-link" id="cq-rs">Reset progress</button></div>';
    return h;
  }

  function renderAI() {
    var ok = aiReady();
    return '<div class="cq-st" style="--i:0;text-align:center"><div class="cq-orb" aria-hidden="true"><i class="r3"></i><i class="r2"></i><i class="r1"></i><i class="c"></i></div>' +
      '<div class="cq-stat ' + (ok ? 'ok' : '') + '"><i></i>' + (ok ? 'AI core online' : (onAIPage() ? 'Connecting…' : 'Opens on the AI page')) + '</div>' +
      '<p class="cq-s" style="margin:12px 6px 14px;font-size:12.5px;opacity:.75">Ask about missions, rockets and space science. Pick a question below or open the chat.</p></div>' +
      '<div class="cq-st" style="--i:1"><button type="button" class="cq-btn" id="cq-ai-go" style="width:100%;font-size:14px;padding:13px">💬 Start chatting</button></div>' +
      '<div class="cq-h4 cq-st" style="--i:2">Try asking</div>' +
      PROMPTS.map(function (p, n) { return '<button type="button" class="cq-pc cq-st" style="--i:' + (n + 3) + '" data-ask="' + n + '">' + esc(p) + '</button>'; }).join('') +
      '<div class="cq-st" style="--i:' + (PROMPTS.length + 3) + '"><button type="button" class="cq-btn g" id="cq-ai-page" style="width:100%;margin-top:12px">Open the full AI page →</button></div>';
  }

  function onDrawerClick(e) {
    var t = e.target.closest('button'); if (!t) return;
    if (t.dataset.q) { closePanel(); setTimeout(function () { quiz(t.dataset.q); }, 250); }
    else if (t.id === 'cq-cert') { closePanel(); setTimeout(function () { certPreview(); }, 250); }
    else if (t.id === 'cq-rs') { if (confirm('Reset all progress?')) { S = fresh(); save(); refresh(); openPanel('learn'); } }
    else if (t.id === 'cq-ai-go') askAI();
    else if (t.id === 'cq-ai-page') goAIPage();
    else if (t.dataset.ask != null) askAI(PROMPTS[+t.dataset.ask]);
  }

  /* ---------- AI hooks ---------- */
  function goAIPage() {
    if (onAIPage() && typeof window.switchTab === 'function') { closePanel(); window.switchTab('ai'); }
    else location.href = 'index.html#ai';
  }
  function askAI(text) {
    var bp = window.botpress;
    if (!bp && !window.botpressWebChat) {
      if (!onAIPage()) { location.href = 'index.html#ai'; return; }
      toast('🤖 AI is still connecting… try again in a moment'); return;
    }
    closePanel();
    try { if (bp && typeof bp.open === 'function') bp.open(); else if (window.botpressWebChat) window.botpressWebChat.sendEvent({ type: 'show' }); } catch (e) { }
    if (!text) return;
    setTimeout(function () {
      try {
        if (bp && typeof bp.sendMessage === 'function') { bp.sendMessage(text); return; }
        if (window.botpressWebChat && window.botpressWebChat.sendPayload) { window.botpressWebChat.sendPayload({ type: 'text', text: text }); return; }
      } catch (e) { }
      try { navigator.clipboard.writeText(text); toast('📋 Question copied: paste it into the chat'); } catch (e) { }
    }, 600);
  }

  /* ---------- quiz ---------- */
  function quiz(id) {
    var m = M[id], i = 0, ok = 0, lock = false;
    function step() {
      var q = m.q[i], p = Math.round(i / m.q.length * 100);
      open('<div class="cq-top"><h2>' + m.i + ' ' + esc(m.t) + '</h2><button class="cq-x" aria-label="Close">×</button></div><div class="cq-s">Question ' + (i + 1) + ' of ' + m.q.length + '</div><div class="cq-bar"><i style="width:' + p + '%"></i></div><p><b>' + esc(q[0]) + '</b></p>' +
        q[1].map(function (o, k) { return '<button class="cq-o" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '<div id="cq-fb"></div>');
      bind('.cq-x', close); lock = false;
      box.querySelectorAll('.cq-o').forEach(function (b) {
        b.onclick = function () {
          if (lock) return; lock = true;
          var k = +b.dataset.k, right = k === q[2];
          if (right) ok++;
          box.querySelectorAll('.cq-o').forEach(function (x, n) { x.disabled = true; if (n === q[2]) x.classList.add('ok'); });
          if (!right) b.classList.add('no');
          document.getElementById('cq-fb').innerHTML = '<div class="cq-ex">' + (right ? '✅ Correct! ' : '❌ Not quite. ') + esc(q[3]) + '</div><button class="cq-btn" id="cq-nx">' + (i + 1 < m.q.length ? 'Next →' : 'See result') + '</button>';
          document.getElementById('cq-nx').onclick = function () { i++; i < m.q.length ? step() : result(); };
        };
      });
    }
    function result() {
      var n = m.q.length, old = S.best[id] || 0, gain = Math.max(0, ok - old) * 10, perfect = ok === n && !S.perfect[id];
      if (perfect) { S.perfect[id] = 1; gain += 20; }
      var wasDone = done(id), pl = lvl(); S.best[id] = Math.max(old, ok); S.xp += gain; save(); refresh();
      var earned = !wasDone && done(id), allDone = nDone() === ids.length;
      open('<div class="cq-top"><h2>Mission report</h2><button class="cq-x" aria-label="Close">×</button></div><div class="cq-big">' + ok + ' / ' + n + '</div><div class="cq-s" style="text-align:center">' +
        (ok === n ? 'Perfect run! 🚀' : done(id) ? 'Mission cleared 🎉' : 'Almost there. Review and retry!') + '</div>' +
        '<div class="cq-grid"><div class="cq-card ' + (done(id) ? 'on' : 'off') + '"><b>🏅</b>' + esc(m.b) + '</div><div class="cq-card on"><b>+' + gain + '</b>XP earned</div></div>' +
        (lvl() > pl ? '<div class="cq-ex">⬆️ Level up! You are now Level ' + lvl() + ' · ' + rank() + '.</div>' : '') +
        (allDone ? '<div class="cq-ex">🏆 All missions cleared! Your certificate is ready.</div>' : '') +
        '<button class="cq-btn" id="cq-r">Retry</button> <button class="cq-btn g" id="cq-d">Mission Control</button>' + (allDone ? ' <button class="cq-btn gold" id="cq-c">🎓 Claim certificate</button>' : ''));
      bind('.cq-x', close); bind('#cq-r', function () { quiz(id); }); bind('#cq-d', function () { close(); openPanel('learn'); }); bind('#cq-c', function () { certPreview(); });
      if (earned || perfect) { confetti(); if (earned) toast('🏅 Badge unlocked: ' + m.b); }
    }
    step();
  }

  /* =====================================================================
   *  CERTIFICATE
   * ===================================================================== */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function drawCert(c, name) {
    var W = c.width = 1600, H = c.height = 1131, x = c.getContext('2d');
    var distinction = nPerfect() === ids.length;
    var R = rng(hash(name + '|' + S.xp + '|' + ids.length));
    var FH = 'Orbitron,"Segoe UI",Arial,sans-serif', FS = 'Georgia,"Times New Roman",serif', FB = 'Inter,"Segoe UI",Arial,sans-serif';
    var FE = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
    var gold = x.createLinearGradient(0, 0, W, H);
    [[0, '#fff1b8'], [.25, '#f5b73a'], [.5, '#fff7d6'], [.75, '#c98a12'], [1, '#ffe08a']].forEach(function (s) { gold.addColorStop(s[0], s[1]); });
    var dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    var certId = 'CSM-' + new Date().getFullYear() + '-' + ('000000' + hash(name + S.xp + dayKey()).toString(36).toUpperCase()).slice(-6);

    function glow(cx, cy, r, col) { var g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); }
    function sparkle(cx, cy, r) { x.beginPath(); x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r); x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r); x.fill(); }
    function rr(x0, y0, w, h, r) { x.beginPath(); x.moveTo(x0 + r, y0); x.arcTo(x0 + w, y0, x0 + w, y0 + h, r); x.arcTo(x0 + w, y0 + h, x0, y0 + h, r); x.arcTo(x0, y0 + h, x0, y0, r); x.arcTo(x0, y0, x0 + w, y0, r); x.closePath(); }
    function sw(t, sp) { var w = 0; for (var i = 0; i < t.length; i++) w += x.measureText(t[i]).width + (i < t.length - 1 ? sp : 0); return w; }
    function spaced(t, cx, y, sp) { var px = cx - sw(t, sp) / 2, a = x.textAlign; x.textAlign = 'left'; for (var i = 0; i < t.length; i++) { x.fillText(t[i], px, y); px += x.measureText(t[i]).width + sp; } x.textAlign = a; }
    function diamond(cx, cy, r, fill) { x.fillStyle = fill; x.beginPath(); x.moveTo(cx, cy - r); x.lineTo(cx + r, cy); x.lineTo(cx, cy + r); x.lineTo(cx - r, cy); x.closePath(); x.fill(); }
    function fade(x0, x1, y, col) { var g = x.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, 'rgba(250,204,21,0)'); g.addColorStop(.5, col || '#facc15'); g.addColorStop(1, 'rgba(250,204,21,0)'); x.strokeStyle = g; x.lineWidth = 2; x.beginPath(); x.moveTo(x0, y); x.lineTo(x1, y); x.stroke(); }

    /* --- background: deep space, nebulae, stars, rosette --- */
    var bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#070515'); bg.addColorStop(.5, '#150f3d'); bg.addColorStop(1, '#091230'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    glow(240, 180, 600, 'rgba(124,58,237,.42)'); glow(1400, 930, 650, 'rgba(6,182,212,.3)'); glow(1320, 150, 400, 'rgba(244,114,182,.2)'); glow(W / 2, H / 2, 560, 'rgba(250,204,21,.07)');
    var i;
    for (i = 0; i < 360; i++) { var sx = R() * W, sy = R() * H, sr = R() * 1.5 + .3; x.globalAlpha = .25 + R() * .75; x.fillStyle = '#fff'; if (sr > 1.55 && (sx < 230 || sx > W - 230 || sy < 140)) sparkle(sx, sy, sr * 4); else { x.beginPath(); x.arc(sx, sy, sr, 0, TAU); x.fill(); } }
    x.globalAlpha = 1;
    x.save(); x.translate(W / 2, H / 2 + 10); x.lineWidth = 1.2;
    x.strokeStyle = 'rgba(250,204,21,.075)'; for (i = 0; i < 48; i++) { x.beginPath(); x.ellipse(0, 0, 540, 200, i * Math.PI / 48, 0, TAU); x.stroke(); }
    x.strokeStyle = 'rgba(167,139,250,.07)'; for (i = 0; i < 36; i++) { x.beginPath(); x.ellipse(0, 0, 330, 120, i * Math.PI / 36 + .05, 0, TAU); x.stroke(); }
    x.restore();

    /* --- frame --- */
    x.lineJoin = 'round'; x.strokeStyle = gold; x.lineWidth = 8; x.strokeRect(34, 34, W - 68, H - 68);
    x.lineWidth = 2; x.strokeRect(58, 58, W - 116, H - 116);
    x.strokeStyle = 'rgba(250,204,21,.35)'; x.lineWidth = 1; x.strokeRect(70, 70, W - 140, H - 140);
    [[58, 58, 1, 1], [W - 58, 58, -1, 1], [58, H - 58, 1, -1], [W - 58, H - 58, -1, -1]].forEach(function (k) {
      x.save(); x.translate(k[0], k[1]); x.scale(k[2], k[3]); x.strokeStyle = gold; x.lineWidth = 3;
      x.beginPath(); x.moveTo(0, 118); x.lineTo(0, 0); x.lineTo(118, 0); x.stroke();
      x.beginPath(); x.arc(0, 0, 76, 0, Math.PI / 2); x.stroke(); x.lineWidth = 1.5; x.beginPath(); x.arc(0, 0, 52, 0, Math.PI / 2); x.stroke();
      diamond(30, 30, 10, '#facc15'); diamond(104, 12, 5, '#fde68a'); diamond(12, 104, 5, '#fde68a'); x.restore();
    });

    /* --- emblem: ringed planet --- */
    (function (cx, cy) {
      x.save(); x.translate(cx, cy); x.rotate(-.35); x.strokeStyle = gold; x.lineWidth = 5; x.beginPath(); x.ellipse(0, 0, 58, 15, 0, Math.PI, TAU); x.stroke(); x.restore();
      var pg = x.createRadialGradient(cx - 9, cy - 11, 2, cx, cy, 32); pg.addColorStop(0, '#e9d5ff'); pg.addColorStop(.55, '#7c3aed'); pg.addColorStop(1, '#2e1065');
      x.save(); x.shadowColor = '#8b5cf6'; x.shadowBlur = 28; x.fillStyle = pg; x.beginPath(); x.arc(cx, cy, 30, 0, TAU); x.fill(); x.restore();
      x.save(); x.translate(cx, cy); x.rotate(-.35); x.strokeStyle = gold; x.lineWidth = 5; x.beginPath(); x.ellipse(0, 0, 58, 15, 0, 0, Math.PI); x.stroke(); x.restore();
      x.fillStyle = '#fff'; sparkle(cx + 62, cy - 30, 9); sparkle(cx - 66, cy + 24, 6);
    })(W / 2, 112);

    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    x.fillStyle = '#c4b5fd'; x.font = '700 27px ' + FH; spaced('COSMOSIS  ·  ISRO EXPLORER ACADEMY', W / 2, 192, 7);

    /* --- title --- */
    var ts = 120, tw = 1100; do { x.font = '900 ' + ts + 'px ' + FH; ts -= 4; } while (sw('CERTIFICATE', 6) > tw && ts > 60);
    var tg = x.createLinearGradient(W / 2 - 520, 0, W / 2 + 520, 0); tg.addColorStop(0, '#fcd34d'); tg.addColorStop(.5, '#fff7d6'); tg.addColorStop(1, '#f59e0b');
    x.save(); x.shadowColor = 'rgba(250,204,21,.55)'; x.shadowBlur = 34; x.fillStyle = tg; spaced('CERTIFICATE', W / 2, 308, 6); x.restore();
    x.font = '600 27px ' + FH; x.fillStyle = '#e5e7eb'; var ocw = sw('OF COMPLETION', 16); spaced('OF COMPLETION', W / 2, 362, 16);
    fade(W / 2 - ocw / 2 - 230, W / 2 - ocw / 2 - 34, 352); fade(W / 2 + ocw / 2 + 34, W / 2 + ocw / 2 + 230, 352);

    /* --- recipient --- */
    x.font = 'italic 30px ' + FS; x.fillStyle = '#b8b5d9'; x.fillText('This certificate is proudly presented to', W / 2, 432);
    var ns = 112; x.font = 'italic 700 ' + ns + 'px ' + FS; while (x.measureText(name).width > 1150 && ns > 40) { ns -= 4; x.font = 'italic 700 ' + ns + 'px ' + FS; }
    var nw = x.measureText(name).width, ng = x.createLinearGradient(W / 2 - nw / 2, 0, W / 2 + nw / 2, 0); ng.addColorStop(0, '#67e8f9'); ng.addColorStop(.5, '#c4b5fd'); ng.addColorStop(1, '#f9a8d4');
    x.save(); x.shadowColor = 'rgba(103,232,249,.4)'; x.shadowBlur = 26; x.fillStyle = ng; x.fillText(name, W / 2, 548); x.restore();
    fade(W / 2 - 470, W / 2 + 470, 580); diamond(W / 2, 580, 9, '#facc15'); diamond(W / 2 - 40, 580, 4, '#fde68a'); diamond(W / 2 + 40, 580, 4, '#fde68a');

    x.font = '400 30px ' + FB; x.fillStyle = '#e5e7eb';
    x.fillText('for successfully clearing all ' + ids.length + ' missions of India\u2019s space journey,', W / 2, 640);
    x.fillText('reaching Level ' + lvl() + ' with ' + S.xp + ' XP.', W / 2, 678);

    /* --- rank pill --- */
    var rt = 'RANK  ·  ' + rank().toUpperCase() + (distinction ? '  ·  WITH DISTINCTION' : ''); x.font = '700 21px ' + FH;
    var rw = sw(rt, 4) + 70; rr(W / 2 - rw / 2, 708, rw, 46, 23); x.fillStyle = 'rgba(250,204,21,.1)'; x.fill(); x.strokeStyle = gold; x.lineWidth = 2; x.stroke();
    x.fillStyle = '#fde68a'; spaced(rt, W / 2, 739, 4);

    /* --- mission badges --- */
    var n = ids.length, gap = 14, cw = Math.min(190, (1300 - (n - 1) * gap) / n), tot = n * cw + (n - 1) * gap, bx = (W - tot) / 2, by = 774;
    ids.forEach(function (id, k) {
      var m = M[id], px = bx + k * (cw + gap);
      rr(px, by, cw, 78, 14); x.fillStyle = 'rgba(255,255,255,.06)'; x.fill(); x.strokeStyle = 'rgba(196,181,253,.5)'; x.lineWidth = 1.5; x.stroke();
      x.textAlign = 'center'; x.font = '30px ' + FE; x.fillStyle = '#fff'; x.fillText(m.i, px + cw / 2, by + 38);
      var fs = 15; x.font = '600 ' + fs + 'px ' + FB; while (x.measureText(m.t).width > cw - 16 && fs > 10) { fs--; x.font = '600 ' + fs + 'px ' + FB; }
      x.fillStyle = '#e5e7eb'; x.fillText(m.t, px + cw / 2, by + 64);
      x.beginPath(); x.arc(px + cw - 12, by + 12, 9, 0, TAU); x.fillStyle = '#facc15'; x.fill();
      x.strokeStyle = '#3b2200'; x.lineWidth = 2.4; x.beginPath(); x.moveTo(px + cw - 16, by + 12); x.lineTo(px + cw - 12.5, by + 15.5); x.lineTo(px + cw - 7, by + 8.5); x.stroke();
    });

    /* --- seal --- */
    (function (cx, cy) {
      function tail(s) { x.beginPath(); x.moveTo(cx + s * 46, cy + 40); x.lineTo(cx + s * 6, cy + 54); x.lineTo(cx + s * 26, cy + 106); x.lineTo(cx + s * 42, cy + 88); x.lineTo(cx + s * 68, cy + 96); x.closePath(); var g = x.createLinearGradient(0, cy + 40, 0, cy + 106); g.addColorStop(0, '#8b5cf6'); g.addColorStop(1, '#3b1d8f'); x.fillStyle = g; x.fill(); x.strokeStyle = '#facc15'; x.lineWidth = 2; x.stroke(); }
      tail(-1); tail(1);
      var np = 34, ro = 82, ri = 72; x.beginPath();
      for (var j = 0; j < np * 2; j++) { var a = j * Math.PI / np, r = j % 2 ? ri : ro; x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
      x.closePath(); var sg = x.createRadialGradient(cx - 24, cy - 28, 6, cx, cy, ro); sg.addColorStop(0, '#fff7d6'); sg.addColorStop(.45, '#f5b73a'); sg.addColorStop(1, '#a96b06');
      x.save(); x.shadowColor = 'rgba(250,204,21,.6)'; x.shadowBlur = 30; x.fillStyle = sg; x.fill(); x.restore();
      x.strokeStyle = '#8a5300'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, 62, 0, TAU); x.stroke(); x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, 55, 0, TAU); x.stroke();
      x.beginPath(); for (j = 0; j < 10; j++) { var b = -Math.PI / 2 + j * Math.PI / 5, rb = j % 2 ? 14 : 34; x.lineTo(cx + Math.cos(b) * rb, cy + Math.sin(b) * rb); } x.closePath(); x.fillStyle = '#4c1d95'; x.fill();
      x.fillStyle = '#fff'; sparkle(cx - 38, cy - 40, 8);
    })(W / 2, 948);

    /* --- signatures + meta --- */
    function sig(cx, who, role, line) {
      x.textAlign = 'center'; x.font = 'italic 44px ' + FS; x.fillStyle = '#fde68a'; x.fillText(who, cx, 966);
      x.strokeStyle = 'rgba(250,204,21,.75)'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx - 175, 980); x.lineTo(cx + 175, 980); x.stroke();
      x.font = '600 15px ' + FH; x.fillStyle = '#a5b4fc'; spaced(role, cx, 1009, 3);
      x.font = '400 19px ' + FB; x.fillStyle = '#9ca3af'; x.fillText(line, cx, 1036);
    }
    sig(385, 'Aradhy Kushwaha', 'LEAD SYSTEMS ARCHITECT', 'Issued on ' + dateStr);
    sig(W - 385, 'Akshat Singh Sengar', 'LEAD AI ARCHITECT', 'Certificate ID  ' + certId);
    return { id: certId };
  }

  function buildCert(name) {
    var f = (document.fonts && document.fonts.load)
      ? Promise.race([Promise.all([document.fonts.load('900 80px Orbitron'), document.fonts.load('700 20px Orbitron'), document.fonts.load('600 15px Inter')]), new Promise(function (r) { setTimeout(r, 1500); })]).catch(function () { })
      : Promise.resolve();
    return f.then(function () { var c = document.createElement('canvas'); var meta = drawCert(c, name); c.__id = meta.id; return c; });
  }

  function dl(href, file) { var a = document.createElement('a'); a.href = href; a.download = file; document.body.appendChild(a); a.click(); a.remove(); }
  function slug(s) { return (String(s).replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '') || 'cadet'); }

  /* minimal PDF writer: one page that holds the JPEG certificate */
  function makePDF(jpegDataUrl, iw, ih) {
    var bin = atob(jpegDataUrl.split(',')[1]), n = bin.length, jpg = new Uint8Array(n), k;
    for (k = 0; k < n; k++) jpg[k] = bin.charCodeAt(k);
    var pw = 842, ph = Math.round(842 * ih / iw), enc = new TextEncoder(), parts = [], off = [], len = 0;
    function add(d) { if (typeof d === 'string') d = enc.encode(d); parts.push(d); len += d.length; }
    function obj(i, body) { off[i] = len; add(i + ' 0 obj\n' + body + '\nendobj\n'); }
    add('%PDF-1.4\n');
    obj(1, '<let/Type/Catalog/Pages 2 0 R>>');
    obj(2, '<let/Type/Pages/Kids[3 0 R]/Count 1>>');
    obj(3, '<let/Type/Page/Parent 2 0 R/MediaBox[0 0 ' + pw + ' ' + ph + ']/Resources<let/XObject<let/Im0 4 0 R>>>>/Contents 5 0 R>>');
    off[4] = len; add('4 0 obj\n<let/Type/XObject/Subtype/Image/Width ' + iw + '/Height ' + ih + '/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ' + n + '>>\nstream\n'); add(jpg); add('\nendstream\nendobj\n');
    var content = 'q ' + pw + ' 0 0 ' + ph + ' 0 0 cm /Im0 Do Q';
    obj(5, '<let/Length ' + content.length + '>>\nstream\n' + content + '\nendstream');
    var xref = len, s = 'xref\n0 6\n0000000000 65535 f \n';
    for (k = 1; k <= 5; k++) s += ('0000000000' + off[k]).slice(-10) + ' 00000 n \n';
    add(s + 'trailer\n<let/Size 6/Root 1 0 R>>\nstartxref\n' + xref + '\n%%EOF');
    return new Blob(parts, { type: 'application/pdf' });
  }

  function certPreview(nameIn) {
    var name = (nameIn || user()).slice(0, 28), cur = null, token = 0, timer = 0, firstShow = true;
    open('<div class="cq-top"><h2>🎓 Certificate of Completion</h2><button class="cq-x" aria-label="Close">×</button></div>' +
      '<div class="cq-nmrow"><label for="cq-nm">Name on certificate</label><input id="cq-nm" maxlength="28" value="' + esc(name) + '" autocomplete="off" spellcheck="false"></div>' +
      '<div class="cq-cwrap" id="cq-cw"><div class="cq-load"><i></i>Forging your certificate…</div></div>' +
      '<div class="cq-act"><button class="cq-btn gold" id="cq-png">⬇ PNG image</button><button class="cq-btn" id="cq-pdf">⬇ PDF</button><button class="cq-btn g" id="cq-bk">Mission Control</button></div>', true);
    bind('.cq-x', close); bind('#cq-bk', function () { close(); openPanel('learn'); });
    var inp = box.querySelector('#cq-nm'), cw = box.querySelector('#cq-cw');
    function val() { return (inp.value.trim() || 'Cadet').slice(0, 28); }
    function show(c) {
      var wrap = document.createElement('div'); wrap.className = 'cq-tilt';
      var img = new Image(); img.alt = 'Certificate of completion for ' + val(); img.src = c.toDataURL('image/png'); wrap.appendChild(img);
      var sh = document.createElement('span'); sh.className = 'cq-shine'; wrap.appendChild(sh);
      if (!RM) for (var s = 0; s < 9; s++) { var sp = document.createElement('span'); sp.className = 'cq-sp'; sp.textContent = '✦'; sp.style.cssText = 'left:' + (6 + Math.random() * 88) + '%;top:' + (6 + Math.random() * 88) + '%;font-size:' + (10 + Math.random() * 14) + 'px;animation-delay:' + (Math.random() * 2.2).toFixed(2) + 's'; wrap.appendChild(sp); }
      if (!RM) {
        wrap.addEventListener('pointermove', function (e) { var r = wrap.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; wrap.style.transform = 'perspective(1300px) rotateY(' + (px * 9).toFixed(2) + 'deg) rotateX(' + (-py * 9).toFixed(2) + 'deg)'; });
        wrap.addEventListener('pointerleave', function () { wrap.style.transform = ''; });
      }
      cw.innerHTML = ''; cw.appendChild(wrap);
      if (firstShow) { firstShow = false; setTimeout(function () { confetti(true); }, 350); }
    }
    function gen() { var my = ++token; buildCert(val()).then(function (c) { if (my !== token) return; cur = c; show(c); }); }
    inp.oninput = function () { clearTimeout(timer); timer = setTimeout(gen, 380); };
    bind('#cq-png', function () { if (!cur) return; dl(cur.toDataURL('image/png'), 'COSMOSIS-certificate-' + slug(val()) + '.png'); confetti(true); toast('🎓 Certificate downloaded!'); });
    bind('#cq-pdf', function () {
      if (!cur) return;
      try { var b = makePDF(cur.toDataURL('image/jpeg', .95), cur.width, cur.height), u = URL.createObjectURL(b); dl(u, 'COSMOSIS-certificate-' + slug(val()) + '.pdf'); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); toast('📄 PDF downloaded!'); }
      catch (e) { toast('Could not build the PDF. Use the PNG instead.'); }
    });
    gen();
  }

  window.CosmosLearn = {
    open: function () { openPanel('learn'); },
    ai: function () { openPanel('ai'); },
    askAI: askAI,
    quiz: quiz,
    cert: function () { if (nDone() === ids.length) certPreview(); else toast('🔒 Clear all missions first'); },
    close: closePanel,
    state: function () { return S; }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
