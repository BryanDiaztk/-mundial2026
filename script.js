/* ══════════════════════════════════════════════════
   PRODE MUNDIAL 2026 — JAVASCRIPT
   Con login, guardado en JSONBin y ranking grupal
══════════════════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════
   JSONBIN CONFIG
══════════════════════════════════ */
const BIN_ID  = '6a1dcbabda38895dfe77b913';
const API_KEY = '$2a$10$Mafa4JsEa5MBMMdyTlHQMewzaIDynHVh7kdlf9VRZMSyi6HE6jTfy';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

/* ══════════════════════════════════
   1. DATOS DEL TORNEO
══════════════════════════════════ */
const TEAMS = {
  MEX: { name: 'México',               short: 'MEX', flag: 'mx' },
  KOR: { name: 'Corea del Sur',        short: 'KOR', flag: 'kr' },
  ZAF: { name: 'Sudáfrica',            short: 'ZAF', flag: 'za' },
  CZE: { name: 'República Checa',      short: 'CZE', flag: 'cz' },
  CAN: { name: 'Canadá',               short: 'CAN', flag: 'ca' },
  SUI: { name: 'Suiza',                short: 'SUI', flag: 'ch' },
  QAT: { name: 'Qatar',                short: 'QAT', flag: 'qa' },
  BIH: { name: 'Bosnia y Herz.',       short: 'BIH', flag: 'ba' },
  BRA: { name: 'Brasil',               short: 'BRA', flag: 'br' },
  MAR: { name: 'Marruecos',            short: 'MAR', flag: 'ma' },
  SCO: { name: 'Escocia',              short: 'SCO', flag: 'gb-sct' },
  HAI: { name: 'Haití',                short: 'HAI', flag: 'ht' },
  USA: { name: 'Estados Unidos',       short: 'USA', flag: 'us' },
  AUS: { name: 'Australia',            short: 'AUS', flag: 'au' },
  PAR: { name: 'Paraguay',             short: 'PAR', flag: 'py' },
  TUR: { name: 'Turquía',              short: 'TUR', flag: 'tr' },
  GER: { name: 'Alemania',             short: 'GER', flag: 'de' },
  ECU: { name: 'Ecuador',              short: 'ECU', flag: 'ec' },
  CIV: { name: 'Costa de Marfil',      short: 'CIV', flag: 'ci' },
  CUW: { name: 'Curazao',              short: 'CUW', flag: 'cw' },
  NED: { name: 'Países Bajos',         short: 'NED', flag: 'nl' },
  JPN: { name: 'Japón',                short: 'JPN', flag: 'jp' },
  TUN: { name: 'Túnez',                short: 'TUN', flag: 'tn' },
  SWE: { name: 'Suecia',               short: 'SWE', flag: 'se' },
  BEL: { name: 'Bélgica',              short: 'BEL', flag: 'be' },
  IRN: { name: 'Irán',                 short: 'IRN', flag: 'ir' },
  EGY: { name: 'Egipto',               short: 'EGY', flag: 'eg' },
  NZL: { name: 'Nueva Zelanda',        short: 'NZL', flag: 'nz' },
  ESP: { name: 'España',               short: 'ESP', flag: 'es' },
  URU: { name: 'Uruguay',              short: 'URU', flag: 'uy' },
  SAU: { name: 'Arabia Saudita',       short: 'SAU', flag: 'sa' },
  CPV: { name: 'Cabo Verde',           short: 'CPV', flag: 'cv' },
  FRA: { name: 'Francia',              short: 'FRA', flag: 'fr' },
  SEN: { name: 'Senegal',              short: 'SEN', flag: 'sn' },
  NOR: { name: 'Noruega',              short: 'NOR', flag: 'no' },
  IRQ: { name: 'Irak',                 short: 'IRQ', flag: 'iq' },
  ARG: { name: 'Argentina',            short: 'ARG', flag: 'ar' },
  AUT: { name: 'Austria',              short: 'AUT', flag: 'at' },
  ALG: { name: 'Argelia',              short: 'ALG', flag: 'dz' },
  JOR: { name: 'Jordania',             short: 'JOR', flag: 'jo' },
  POR: { name: 'Portugal',             short: 'POR', flag: 'pt' },
  COL: { name: 'Colombia',             short: 'COL', flag: 'co' },
  UZB: { name: 'Uzbekistán',           short: 'UZB', flag: 'uz' },
  DRC: { name: 'Rep. Dem. del Congo',  short: 'DRC', flag: 'cd' },
  ENG: { name: 'Inglaterra',           short: 'ENG', flag: 'gb-eng' },
  CRO: { name: 'Croacia',              short: 'CRO', flag: 'hr' },
  PAN: { name: 'Panamá',               short: 'PAN', flag: 'pa' },
  GHA: { name: 'Ghana',                short: 'GHA', flag: 'gh' },
};

const flagUrl = code => `https://flagcdn.com/w40/${code}.png`;

const GROUPS_DEF = [
  { id: 'A', teams: ['MEX','KOR','ZAF','CZE'] },
  { id: 'B', teams: ['CAN','SUI','QAT','BIH'] },
  { id: 'C', teams: ['BRA','MAR','SCO','HAI'] },
  { id: 'D', teams: ['USA','AUS','PAR','TUR'] },
  { id: 'E', teams: ['GER','ECU','CIV','CUW'] },
  { id: 'F', teams: ['NED','JPN','TUN','SWE'] },
  { id: 'G', teams: ['BEL','IRN','EGY','NZL'] },
  { id: 'H', teams: ['ESP','URU','SAU','CPV'] },
  { id: 'I', teams: ['FRA','SEN','NOR','IRQ'] },
  { id: 'J', teams: ['ARG','AUT','ALG','JOR'] },
  { id: 'K', teams: ['POR','COL','UZB','DRC'] },
  { id: 'L', teams: ['ENG','CRO','PAN','GHA'] },
];

const MATCH_PAIRS = [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]];

/* ══════════════════════════════════
   2. SESIÓN DE USUARIO
══════════════════════════════════ */
let SESSION = null; // { name, room, key }

function sessionKey(name, room) {
  return `${room.toUpperCase()}__${name.trim().toLowerCase().replace(/\s+/g,'_')}`;
}

function loadSession() {
  try {
    const s = localStorage.getItem('prode2026_session');
    if (s) SESSION = JSON.parse(s);
  } catch(e) {}
  return !!SESSION;
}

function saveSession() {
  localStorage.setItem('prode2026_session', JSON.stringify(SESSION));
}

function clearSession() {
  SESSION = null;
  localStorage.removeItem('prode2026_session');
}

/* ══════════════════════════════════
   3. JSONBIN — READ / WRITE
══════════════════════════════════ */
async function binRead() {
  try {
    const r = await fetch(`${BIN_URL}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });
    const d = await r.json();
    return d.record || {};
  } catch(e) { return null; }
}

async function binWrite(data) {
  try {
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
      body: JSON.stringify(data)
    });
    return true;
  } catch(e) { return false; }
}

async function saveUserState() {
  if (!SESSION) return;
  const full = await binRead();
  if (!full) { showToast('⚠️ Sin conexión, guardado solo local'); return; }
  if (!full.usuarios) full.usuarios = {};
  full.usuarios[SESSION.key] = {
    name: SESSION.name,
    room: SESSION.room,
    updatedAt: Date.now(),
    state: STATE
  };
  await binWrite(full);
}

async function loadUserState() {
  const full = await binRead();
  if (!full || !full.usuarios || !full.usuarios[SESSION.key]) return false;
  const saved = full.usuarios[SESSION.key].state;
  if (!saved) return false;
  Object.assign(STATE.groups, saved.groups || {});
  Object.assign(STATE.bracket, saved.bracket || {});
  STATE.champion = saved.champion || null;
  STATE.runnerUp = saved.runnerUp || null;
  STATE.third    = saved.third    || null;
  return true;
}

/* ══════════════════════════════════
   4. ESTADO DEL TORNEO
══════════════════════════════════ */
const STATE = { groups: {}, bracket: { r32:[], r16:[], qf:[], sf:[], thirdPlace:[], final:[] }, champion:null, runnerUp:null, third:null };

function initState() {
  GROUPS_DEF.forEach(g => {
    STATE.groups[g.id] = {
      matches: MATCH_PAIRS.map(([i,j]) => ({ home: g.teams[i], away: g.teams[j], scoreHome:'', scoreAway:'' }))
    };
  });
  const counts = { r32:16, r16:8, qf:4, sf:2, thirdPlace:1, final:1 };
  Object.entries(counts).forEach(([r,c]) => {
    STATE.bracket[r] = Array.from({length:c}, () => ({ home:null, away:null, scoreHome:'', scoreAway:'', winner:null }));
  });
}

// localStorage backup
function saveLocal() {
  try { localStorage.setItem(`prode2026_${SESSION?.key}`, JSON.stringify(STATE)); } catch(e) {}
}
function loadLocal() {
  try {
    const raw = localStorage.getItem(`prode2026_${SESSION?.key}`);
    if (!raw) return false;
    const s = JSON.parse(raw);
    Object.assign(STATE.groups, s.groups||{}); Object.assign(STATE.bracket, s.bracket||{});
    STATE.champion=s.champion||null; STATE.runnerUp=s.runnerUp||null; STATE.third=s.third||null;
    return true;
  } catch(e) { return false; }
}

let saveTimer = null;
function scheduleSave() {
  saveLocal();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await saveUserState();
  }, 1500);
}

/* ══════════════════════════════════
   5. LOGIN UI
══════════════════════════════════ */
document.getElementById('loginBtn').addEventListener('click', handleLogin);
document.getElementById('loginName').addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });
document.getElementById('loginRoom').addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });
document.getElementById('loginRoom').addEventListener('input', e => { e.target.value = e.target.value.toUpperCase(); });

async function handleLogin() {
  const name = document.getElementById('loginName').value.trim();
  const room = document.getElementById('loginRoom').value.trim().toUpperCase();
  const err  = document.getElementById('loginError');
  const btn  = document.getElementById('loginBtn');

  if (!name) { err.textContent = 'Por favor ingresá tu nombre'; return; }
  if (name.length < 2) { err.textContent = 'El nombre debe tener al menos 2 caracteres'; return; }
  if (!room) { err.textContent = 'Por favor ingresá el código de sala'; return; }
  if (room.length < 3) { err.textContent = 'El código de sala debe tener al menos 3 caracteres'; return; }

  btn.textContent = 'Cargando...';
  btn.disabled = true;
  err.textContent = '';

  SESSION = { name, room, key: sessionKey(name, room) };
  saveSession();
  initState();

  // Try cloud, fallback to local
  const cloudLoaded = await loadUserState();
  if (!cloudLoaded) loadLocal();

  buildR32FromGroups();
  showApp();
  btn.textContent = 'Entrar al prode ⚽';
  btn.disabled = false;
}

function showApp() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('siteHeader').style.display = '';
  document.getElementById('mainContent').style.display = '';

  // User chip
  document.getElementById('userName').textContent = SESSION.name;
  document.getElementById('userRoom').textContent = SESSION.room;
  const av = document.getElementById('userAvatar');
  av.textContent = SESSION.name.charAt(0).toUpperCase();

  renderAll();
  showToast(`¡Bienvenido, ${SESSION.name}! 👋`);
}

document.getElementById('btnLogout').addEventListener('click', () => {
  if (!confirm('¿Cerrar sesión? Tu prode está guardado.')) return;
  clearSession();
  location.reload();
});

/* ══════════════════════════════════
   6. TABLA DE POSICIONES
══════════════════════════════════ */
function calcStandings(groupId) {
  const g = GROUPS_DEF.find(x => x.id === groupId);
  const table = {};
  g.teams.forEach(t => { table[t] = { team:t, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, dg:0, pts:0 }; });
  STATE.groups[groupId].matches.forEach(m => {
    const sh = parseInt(m.scoreHome), sa = parseInt(m.scoreAway);
    if (isNaN(sh)||isNaN(sa)) return;
    const h=table[m.home], a=table[m.away];
    h.pj++; h.gf+=sh; h.gc+=sa; h.dg+=sh-sa;
    a.pj++; a.gf+=sa; a.gc+=sh; a.dg+=sa-sh;
    if (sh>sa) { h.pg++; h.pts+=3; a.pp++; }
    else if (sh<sa) { a.pg++; a.pts+=3; h.pp++; }
    else { h.pe++; h.pts++; a.pe++; a.pts++; }
  });
  return Object.values(table).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||a.team.localeCompare(b.team));
}

function getQualified() {
  const q = {};
  GROUPS_DEF.forEach(g => { const st=calcStandings(g.id); q[g.id]={first:st[0].team,second:st[1].team}; });
  return q;
}

/* ══════════════════════════════════
   7. BRACKET
══════════════════════════════════ */
function buildR32FromGroups() {
  const q = getQualified();
  const pairings = [
    ['A','1','B','2'],['C','1','D','2'],['E','1','F','2'],['G','1','H','2'],
    ['I','1','J','2'],['K','1','L','2'],['B','1','A','2'],['D','1','C','2'],
    ['F','1','E','2'],['H','1','G','2'],['J','1','I','2'],['L','1','K','2'],
    ['A','1','C','2'],['B','1','D','2'],['E','1','G','2'],['F','1','H','2'],
  ];
  pairings.forEach(([gH,posH,gA,posA],i) => {
    const home = posH==='1' ? q[gH].first : q[gH].second;
    const away = posA==='1' ? q[gA].first : q[gA].second;
    STATE.bracket.r32[i].home = home;
    STATE.bracket.r32[i].away = away;
    if (STATE.bracket.r32[i].winner && STATE.bracket.r32[i].winner!==home && STATE.bracket.r32[i].winner!==away) {
      STATE.bracket.r32[i].winner=null; STATE.bracket.r32[i].scoreHome=''; STATE.bracket.r32[i].scoreAway='';
    }
  });
  propagateBracket('r32');
}

function propagateBracket(fromRound) {
  const order=['r32','r16','qf','sf'];
  const nextMap={r32:'r16',r16:'qf',qf:'sf',sf:'final'};
  const idx=order.indexOf(fromRound);
  const rounds=idx>=0?order.slice(idx):[];
  rounds.forEach(round=>{
    const next=nextMap[round]; if(!next) return;
    const src=STATE.bracket[round], dst=STATE.bracket[next];
    for(let i=0;i<src.length;i+=2){
      const mi=i/2; if(mi>=dst.length) break;
      const ph=dst[mi].home, pa=dst[mi].away;
      dst[mi].home=src[i].winner||null;
      dst[mi].away=(src[i+1]&&src[i+1].winner)||null;
      if(ph!==dst[mi].home||pa!==dst[mi].away){
        if(dst[mi].winner&&dst[mi].winner!==dst[mi].home&&dst[mi].winner!==dst[mi].away){
          dst[mi].winner=null; dst[mi].scoreHome=''; dst[mi].scoreAway='';
        }
      }
    }
  });
  const sf=STATE.bracket.sf;
  const l1=sf[0].winner?(sf[0].winner===sf[0].home?sf[0].away:sf[0].home):null;
  const l2=sf[1]&&sf[1].winner?(sf[1].winner===sf[1].home?sf[1].away:sf[1].home):null;
  STATE.bracket.thirdPlace[0].home=l1; STATE.bracket.thirdPlace[0].away=l2;
  const fin=STATE.bracket.final[0];
  STATE.champion=fin.winner||null;
  STATE.runnerUp=fin.winner?(fin.winner===fin.home?fin.away:fin.home):null;
  STATE.third=STATE.bracket.thirdPlace[0].winner||null;
}

/* ══════════════════════════════════
   8. RENDER GRUPOS
══════════════════════════════════ */
function renderGroups() {
  const container=document.getElementById('groupsContainer');
  container.innerHTML='';
  GROUPS_DEF.forEach(g=>{
    const standings=calcStandings(g.id);
    const card=document.createElement('div');
    card.className='group-card';
    card.innerHTML=`
      <div class="group-header">
        <span class="group-name">GRUPO ${g.id}</span>
        <span class="group-badge">${g.teams.map(t=>TEAMS[t].short).join(' · ')}</span>
      </div>
      <table class="group-table">
        <thead><tr>
          <th>Selección</th><th title="Partidos jugados">PJ</th><th title="Ganados">PG</th>
          <th title="Empatados">PE</th><th title="Perdidos">PP</th><th title="Goles a favor">GF</th>
          <th title="Goles en contra">GC</th><th title="Diferencia">DG</th><th title="Puntos">PTS</th>
        </tr></thead>
        <tbody id="tbody-${g.id}"></tbody>
      </table>
      <div class="group-matches">
        <div class="matches-label">Partidos</div>
        <div id="matches-${g.id}"></div>
      </div>`;
    container.appendChild(card);
    renderGroupTable(g.id, standings);
    renderGroupMatches(g.id);
  });
}

function renderGroupTable(groupId, standings) {
  const tbody=document.getElementById(`tbody-${groupId}`);
  if(!tbody) return;
  tbody.innerHTML='';
  standings.forEach((row,i)=>{
    const t=TEAMS[row.team];
    const tr=document.createElement('tr');
    tr.className=i===0?'team-row-q1':(i===1?'team-row-q2':'');
    const dgStr=row.dg>0?`+${row.dg}`:String(row.dg);
    tr.innerHTML=`
      <td><div class="team-cell">
        <img class="team-flag" src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy"/>
        <span class="team-name-short">${t.name}</span>
      </div></td>
      <td>${row.pj}</td><td>${row.pg}</td><td>${row.pe}</td><td>${row.pp}</td>
      <td>${row.gf}</td><td>${row.gc}</td><td>${dgStr}</td>
      <td class="pts-cell">${row.pts}</td>`;
    tbody.appendChild(tr);
  });
}

function renderGroupMatches(groupId) {
  const container=document.getElementById(`matches-${groupId}`);
  if(!container) return;
  container.innerHTML='';
  STATE.groups[groupId].matches.forEach((m,mi)=>{
    const th=TEAMS[m.home], ta=TEAMS[m.away];
    const row=document.createElement('div');
    row.className='match-row';
    row.innerHTML=`
      <div class="match-team home">
        <img src="${flagUrl(th.flag)}" alt="${th.name}" loading="lazy"/>
        <span>${th.name}</span>
      </div>
      <div class="match-score">
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreHome}" data-group="${groupId}" data-match="${mi}" data-side="home" placeholder="–"/>
        <span class="score-sep">:</span>
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreAway}" data-group="${groupId}" data-match="${mi}" data-side="away" placeholder="–"/>
      </div>
      <div class="match-team away">
        <img src="${flagUrl(ta.flag)}" alt="${ta.name}" loading="lazy"/>
        <span>${ta.name}</span>
      </div>`;
    container.appendChild(row);
  });
  container.querySelectorAll('.score-input').forEach(inp=>inp.addEventListener('input',onScoreInput));
}

function onScoreInput(e) {
  const {group,match,side}=e.target.dataset;
  STATE.groups[group].matches[parseInt(match)][side==='home'?'scoreHome':'scoreAway']=e.target.value;
  renderGroupTable(group, calcStandings(group));
  buildR32FromGroups(); renderBracket(); renderStats();
  scheduleSave();
}

/* ══════════════════════════════════
   9. RENDER BRACKET
══════════════════════════════════ */
function renderBracket() {
  const wrapper=document.getElementById('bracketWrapper');
  wrapper.innerHTML='';
  const layout=document.createElement('div');
  layout.className='bracket-layout';
  const rounds=[
    {key:'r32',label:'Dieciseisavos'},
    {key:'r16',label:'Octavos'},
    {key:'qf', label:'Cuartos'},
    {key:'sf', label:'Semifinales'},
    {key:'final',label:'FINAL',cls:'final'},
  ];
  rounds.forEach(r=>{
    const col=document.createElement('div');
    col.className=`bracket-round${r.cls?' '+r.cls:''}`;
    const lbl=document.createElement('div');
    lbl.className='bracket-round-label'; lbl.textContent=r.label;
    col.appendChild(lbl);
    const mw=document.createElement('div');
    mw.className='bracket-matches';
    STATE.bracket[r.key].forEach((m,mi)=>mw.appendChild(buildBracketMatch(r.key,mi,m)));
    col.appendChild(mw); layout.appendChild(col);
  });
  // Champion column
  const champ=document.createElement('div');
  champ.className='bracket-round'; champ.style.minWidth='140px';
  const cl=document.createElement('div');
  cl.className='bracket-round-label'; cl.style.color='var(--accent-gold)'; cl.textContent='CAMPEÓN';
  champ.appendChild(cl);
  const cd=document.createElement('div');
  cd.className='champion-display';
  cd.innerHTML=STATE.champion?`
    <div class="champion-cup">🏆</div>
    <img class="champion-display-flag" src="${flagUrl(TEAMS[STATE.champion].flag)}" alt="${TEAMS[STATE.champion].name}"/>
    <div class="champion-display-name">${TEAMS[STATE.champion].name}</div>
  `:`<div class="champion-cup" style="opacity:0.3">🏆</div>`;
  champ.appendChild(cd); layout.appendChild(champ);
  wrapper.appendChild(layout);
  // 3rd place
  const tw=document.createElement('div');
  tw.style.cssText='margin-top:32px;max-width:320px';
  const tl=document.createElement('div');
  tl.className='third-place-label'; tl.textContent='🥉 Tercer Puesto';
  tw.appendChild(tl);
  tw.appendChild(buildBracketMatch('thirdPlace',0,STATE.bracket.thirdPlace[0]));
  wrapper.appendChild(tw);
}

function buildBracketMatch(round,idx,m) {
  const div=document.createElement('div');
  div.className='bracket-match';
  [['home',m.home,m.scoreHome],['away',m.away,m.scoreAway]].forEach(([side,tc,score])=>{
    const td=document.createElement('div');
    td.className='bracket-team';
    if(!tc){
      td.classList.add('empty');
      td.innerHTML=`<span class="bracket-team-name" style="color:var(--text-3)">Por definir</span>`;
    } else {
      const t=TEAMS[tc];
      if(m.winner===tc) td.classList.add('winner');
      else if(m.winner&&m.winner!==tc) td.classList.add('loser');
      td.innerHTML=`
        <img src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy"/>
        <span class="bracket-team-name">${t.name}</span>
        <span class="bracket-score">${score!==''?score:''}</span>`;
      td.addEventListener('click',()=>onBracketClick(round,idx,side,tc));
    }
    div.appendChild(td);
  });
  return div;
}

function onBracketClick(round,idx,side,teamCode) {
  const match=STATE.bracket[round][idx];
  if(!match.home||!match.away) return;
  match.winner=teamCode;
  if(!match.scoreHome&&!match.scoreAway){
    match.scoreHome=side==='home'?'1':'0';
    match.scoreAway=side==='home'?'0':'1';
  }
  propagateBracket(round); scheduleSave();
  renderBracket(); renderStats();
  if(STATE.champion) setTimeout(()=>showChampionModal(),400);
}

/* ══════════════════════════════════
   10. RANKING
══════════════════════════════════ */
document.getElementById('btnRefreshRanking').addEventListener('click', renderRanking);

async function renderRanking() {
  const container=document.getElementById('rankingContainer');
  container.innerHTML=`<div class="ranking-loading">🔄 Cargando ranking...</div>`;
  document.getElementById('rankingSubtitle').textContent=`Sala: ${SESSION.room}`;

  const full=await binRead();
  if(!full||!full.usuarios){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">😕</div><p>No hay datos aún. Sé el primero en completar tu prode.</p></div>`;
    return;
  }

  // Filter by room
  const users=Object.values(full.usuarios).filter(u=>u.room===SESSION.room);
  if(!users.length){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">🏟️</div><p>Nadie en la sala <strong>${SESSION.room}</strong> aún.<br>Compartí el código con tus compañeros.</p></div>`;
    return;
  }

  // Sort by champion + matches played (simple scoring)
  users.sort((a,b)=>{
    const pa=countPlayed(a.state), pb=countPlayed(b.state);
    return pb-pa;
  });

  const medals=['🥇','🥈','🥉'];
  const table=document.createElement('table');
  table.className='ranking-table';
  table.innerHTML=`<thead><tr>
    <th>#</th><th>Jugador</th><th>Campeón elegido</th><th>Partidos cargados</th><th>Última actualización</th>
  </tr></thead>`;
  const tbody=document.createElement('tbody');
  users.forEach((u,i)=>{
    const tr=document.createElement('tr');
    if(u.name===SESSION.name) tr.classList.add('me');
    const played=countPlayed(u.state);
    const champion=u.state?.champion;
    const champHtml=champion&&TEAMS[champion]?`
      <div class="ranking-champion">
        <img src="${flagUrl(TEAMS[champion].flag)}" alt="${TEAMS[champion].name}"/>
        ${TEAMS[champion].name}
      </div>`:'-';
    const updated=u.updatedAt?new Date(u.updatedAt).toLocaleString('es-AR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'–';
    tr.innerHTML=`
      <td><span class="ranking-pos">${medals[i]||i+1}</span></td>
      <td><span class="ranking-name">${u.name}${u.name===SESSION.name?' <span style="font-size:11px;color:var(--accent)">(vos)</span>':''}</span></td>
      <td>${champHtml}</td>
      <td><span class="ranking-pts">${played}</span></td>
      <td style="font-size:12px;color:var(--text-2)">${updated}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.innerHTML='';
  container.appendChild(table);
}

function countPlayed(state) {
  if(!state) return 0;
  let n=0;
  if(state.groups) Object.values(state.groups).forEach(g=>g.matches?.forEach(m=>{ if(m.scoreHome!==''&&m.scoreAway!=='') n++; }));
  if(state.bracket) Object.values(state.bracket).forEach(arr=>arr.forEach?arr.forEach(m=>{ if(m.winner) n++; }):null);
  return n;
}

/* ══════════════════════════════════
   11. ESTADÍSTICAS
══════════════════════════════════ */
function calcTotalGoals() {
  let t=0;
  GROUPS_DEF.forEach(g=>STATE.groups[g.id].matches.forEach(m=>{
    const sh=parseInt(m.scoreHome),sa=parseInt(m.scoreAway);
    if(!isNaN(sh)) t+=sh; if(!isNaN(sa)) t+=sa;
  }));
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(r=>STATE.bracket[r].forEach(m=>{
    const sh=parseInt(m.scoreHome),sa=parseInt(m.scoreAway);
    if(!isNaN(sh)) t+=sh; if(!isNaN(sa)) t+=sa;
  }));
  return t;
}

function calcMatchesPlayed() {
  let p=0;
  GROUPS_DEF.forEach(g=>STATE.groups[g.id].matches.forEach(m=>{ if(m.scoreHome!==''&&m.scoreAway!=='') p++; }));
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(r=>STATE.bracket[r].forEach(m=>{ if(m.winner) p++; }));
  return p;
}

function calcTopTeams() {
  const goals={};
  GROUPS_DEF.forEach(g=>{
    g.teams.forEach(t=>{goals[t]=0;});
    STATE.groups[g.id].matches.forEach(m=>{
      const sh=parseInt(m.scoreHome),sa=parseInt(m.scoreAway);
      if(!isNaN(sh)) goals[m.home]=(goals[m.home]||0)+sh;
      if(!isNaN(sa)) goals[m.away]=(goals[m.away]||0)+sa;
    });
  });
  return Object.entries(goals).sort((a,b)=>b[1]-a[1]).slice(0,5);
}

function renderStats() {
  const grid=document.getElementById('statsGrid');
  grid.innerHTML='';
  const totalGoals=calcTotalGoals(), matchPlayed=calcMatchesPlayed();
  const avgGoals=matchPlayed>0?(totalGoals/matchPlayed).toFixed(1):'–';
  const topTeams=calcTopTeams();
  const totalMatches=104;
  const pct=Math.round((matchPlayed/totalMatches)*100);
  [
    {icon:'⚽',label:'Goles totales',value:totalGoals,sub:`En ${matchPlayed} partidos jugados`},
    {icon:'📊',label:'Promedio de goles',value:avgGoals,sub:'Goles por partido'},
    {icon:'🏟️',label:'Partidos jugados',value:matchPlayed,sub:`de ${totalMatches} totales`},
    {icon:'🏆',label:'Campeón',value:STATE.champion?TEAMS[STATE.champion].short:'–',sub:STATE.champion?TEAMS[STATE.champion].name:'Aún no definido'},
  ].forEach(c=>{
    const card=document.createElement('div');
    card.className='stat-card';
    card.innerHTML=`<div class="stat-icon">${c.icon}</div><div class="stat-label">${c.label}</div><div class="stat-value">${c.value}</div><div class="stat-sub">${c.sub}</div>`;
    grid.appendChild(card);
  });
  // Top equipos
  const topCard=document.createElement('div');
  topCard.className='stat-card stat-card-wide';
  topCard.innerHTML=`<div class="stat-icon">🥇</div><div class="stat-label">Equipos más goleadores</div><div class="top-scorers-list" id="topScorersList"></div>`;
  grid.appendChild(topCard);
  const list=topCard.querySelector('#topScorersList');
  topTeams.forEach(([tc,g],i)=>{
    const t=TEAMS[tc]; if(!t) return;
    const row=document.createElement('div');
    row.className='top-scorer-row';
    row.innerHTML=`<span class="scorer-rank">${i+1}</span><img class="scorer-flag" src="${flagUrl(t.flag)}" alt="${t.name}"/><span class="scorer-name">${t.name}</span><span class="scorer-goals">${g}</span>`;
    list.appendChild(row);
  });
  // Progreso
  const progCard=document.createElement('div');
  progCard.className='stat-card';
  progCard.innerHTML=`<div class="stat-icon">📈</div><div class="stat-label">Progreso del torneo</div><div class="stat-value">${pct}%</div>
    <div class="progress-bar-wrap"><div class="progress-item">
      <div class="progress-label"><span>Completado</span><span>${matchPlayed}/${totalMatches}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div></div>`;
  grid.appendChild(progCard);
}

/* ══════════════════════════════════
   12. MODAL CAMPEÓN
══════════════════════════════════ */
function showChampionModal() {
  if(!STATE.champion) return;
  const champ=TEAMS[STATE.champion];
  const runner=STATE.runnerUp?TEAMS[STATE.runnerUp]:null;
  const third=STATE.third?TEAMS[STATE.third]:null;
  document.getElementById('championFlag').src=flagUrl(champ.flag);
  document.getElementById('championName').textContent=champ.name;
  if(runner){document.getElementById('runnerUpFlag').src=flagUrl(runner.flag);document.getElementById('runnerUpName').textContent=runner.name;}
  if(third){document.getElementById('thirdFlag').src=flagUrl(third.flag);document.getElementById('thirdName').textContent=third.name;}
  document.getElementById('championModal').classList.add('open');
  launchConfetti();
}

function launchConfetti() {
  const c=document.getElementById('confettiContainer');
  c.innerHTML='';
  const colors=['#00d4aa','#f5c842','#ff6b35','#ffffff','#4ade80','#60a5fa'];
  for(let i=0;i<80;i++){
    const p=document.createElement('div');
    p.className='confetti-piece';
    p.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*1.5}s;`;
    c.appendChild(p);
  }
}

document.getElementById('closeChampion').addEventListener('click',()=>document.getElementById('championModal').classList.remove('open'));

/* ══════════════════════════════════
   13. SIMULACIÓN AUTOMÁTICA
══════════════════════════════════ */
function randomScore(){const g=[0,0,0,1,1,1,1,2,2,3,4];return g[Math.floor(Math.random()*g.length)];}

document.getElementById('btnAutoSim').addEventListener('click',()=>{
  const btn=document.getElementById('btnAutoSim');
  btn.classList.add('simulating');
  showToast('⚡ Simulando torneo completo...');
  setTimeout(()=>{
    GROUPS_DEF.forEach(g=>STATE.groups[g.id].matches.forEach(m=>{m.scoreHome=String(randomScore());m.scoreAway=String(randomScore());}));
    buildR32FromGroups();
    ['r32','r16','qf','sf','thirdPlace','final'].forEach(round=>{
      STATE.bracket[round].forEach(m=>{
        if(!m.home||!m.away) return;
        let sh=randomScore(),sa=randomScore();
        while(sh===sa) sa=randomScore();
        m.scoreHome=String(sh); m.scoreAway=String(sa);
        m.winner=sh>sa?m.home:m.away;
      });
      propagateBracket(round);
    });
    scheduleSave(); renderAll();
    btn.classList.remove('simulating');
    showToast('✅ Simulación completada');
    if(STATE.champion) setTimeout(()=>showChampionModal(),800);
  },600);
});

/* ══════════════════════════════════
   14. EXPORTAR
══════════════════════════════════ */
document.getElementById('btnExport').addEventListener('click',e=>{e.stopPropagation();document.getElementById('exportDropdown').classList.toggle('open');});
document.addEventListener('click',()=>document.getElementById('exportDropdown').classList.remove('open'));
document.getElementById('exportDropdown').addEventListener('click',e=>e.stopPropagation());

document.getElementById('exportJSON').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(STATE,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='prode_mundial_2026.json'; a.click();
  showToast('📦 JSON descargado');
});

document.getElementById('exportPNG').addEventListener('click',async()=>{
  showToast('📸 Generando imagen...');
  try{
    const canvas=await html2canvas(document.querySelector('.view.active'),{backgroundColor:'#0a0c10',scale:2,useCORS:true});
    const a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download='prode_mundial_2026.png'; a.click();
    showToast('✅ Imagen descargada');
  }catch(e){showToast('❌ Error al generar imagen');}
});

document.getElementById('exportPDF').addEventListener('click',async()=>{
  showToast('📄 Generando PDF...');
  try{
    const {jsPDF}=window.jspdf;
    const canvas=await html2canvas(document.querySelector('.view.active'),{backgroundColor:'#0a0c10',scale:1.5,useCORS:true});
    const imgData=canvas.toDataURL('image/png');
    const pdf=new jsPDF({orientation:canvas.width>canvas.height?'l':'p',unit:'px',format:[canvas.width,canvas.height]});
    pdf.addImage(imgData,'PNG',0,0,canvas.width,canvas.height);
    pdf.save('prode_mundial_2026.pdf');
    showToast('✅ PDF descargado');
  }catch(e){showToast('❌ Error al generar PDF');}
});

document.getElementById('btnReset').addEventListener('click',()=>{
  if(!confirm('¿Reiniciar tu prode? Se borrarán todos tus resultados.')) return;
  localStorage.removeItem(`prode2026_${SESSION?.key}`);
  initState(); renderAll(); showToast('🗑️ Prode reiniciado');
  scheduleSave();
});

/* ══════════════════════════════════
   15. NAVEGACIÓN
══════════════════════════════════ */
function setupNav(navEl) {
  navEl.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
      // Highlight both header and mobile navs
      document.querySelectorAll(`[data-view="${btn.dataset.view}"]`).forEach(b=>b.classList.add('active'));
      const view=btn.dataset.view;
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      document.getElementById(`view-${view}`).classList.add('active');
      if(view==='stats') renderStats();
      if(view==='bracket') renderBracket();
      if(view==='ranking') renderRanking();
    });
  });
}

setupNav(document.querySelector('.header-nav'));

/* ══════════════════════════════════
   16. TEMA
══════════════════════════════════ */
document.getElementById('toggleTheme').addEventListener('click',()=>{
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  document.getElementById('toggleTheme').textContent=isDark?'☀️':'🌙';
  localStorage.setItem('prode2026_theme',isDark?'light':'dark');
});

/* ══════════════════════════════════
   17. TOAST
══════════════════════════════════ */
let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ══════════════════════════════════
   18. INIT
══════════════════════════════════ */
function renderAll(){renderGroups();renderBracket();renderStats();}

function init(){
  const savedTheme=localStorage.getItem('prode2026_theme');
  if(savedTheme){
    document.documentElement.setAttribute('data-theme',savedTheme);
    document.getElementById('toggleTheme').textContent=savedTheme==='light'?'☀️':'🌙';
  }

  // Mobile nav
  const mobileNav=document.createElement('div');
  mobileNav.className='mobile-nav';
  mobileNav.innerHTML=`
    <button class="nav-btn active" data-view="groups">Grupos</button>
    <button class="nav-btn" data-view="bracket">Llaves</button>
    <button class="nav-btn" data-view="ranking">Ranking</button>
    <button class="nav-btn" data-view="stats">Stats</button>`;
  document.body.appendChild(mobileNav);
  setupNav(mobileNav);

  // Auto-login if session exists
  if(loadSession()){
    initState();
    loadLocal(); // load from local immediately for speed
    buildR32FromGroups();
    showApp();
    // Then sync from cloud in background
    loadUserState().then(cloudLoaded=>{
      if(cloudLoaded){ buildR32FromGroups(); renderAll(); }
    });
  }
}

init();
