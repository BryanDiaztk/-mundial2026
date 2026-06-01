/* ══════════════════════════════════════════════════
   PRODE MUNDIAL 2026 — v4
   Admin · Scoring · Mejores terceros · Bracket FIFA
══════════════════════════════════════════════════ */
'use strict';

/* ── JSONBIN ── */
const BIN_ID  = '6a1dcbabda38895dfe77b913';
const API_KEY = '$2a$10$Mafa4JsEa5MBMMdyTlHQMewzaIDynHVh7kdlf9VRZMSyi6HE6jTfy';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const ADMIN_USER = '4dmin';

/* ══════════════════════════════════
   1. DATOS
══════════════════════════════════ */
const TEAMS = {
  MEX:{name:'México',short:'MEX',flag:'mx'},
  KOR:{name:'Corea del Sur',short:'KOR',flag:'kr'},
  ZAF:{name:'Sudáfrica',short:'ZAF',flag:'za'},
  CZE:{name:'Rep. Checa',short:'CZE',flag:'cz'},
  CAN:{name:'Canadá',short:'CAN',flag:'ca'},
  SUI:{name:'Suiza',short:'SUI',flag:'ch'},
  QAT:{name:'Qatar',short:'QAT',flag:'qa'},
  BIH:{name:'Bosnia y Herz.',short:'BIH',flag:'ba'},
  BRA:{name:'Brasil',short:'BRA',flag:'br'},
  MAR:{name:'Marruecos',short:'MAR',flag:'ma'},
  SCO:{name:'Escocia',short:'SCO',flag:'gb-sct'},
  HAI:{name:'Haití',short:'HAI',flag:'ht'},
  USA:{name:'Estados Unidos',short:'USA',flag:'us'},
  AUS:{name:'Australia',short:'AUS',flag:'au'},
  PAR:{name:'Paraguay',short:'PAR',flag:'py'},
  TUR:{name:'Turquía',short:'TUR',flag:'tr'},
  GER:{name:'Alemania',short:'GER',flag:'de'},
  ECU:{name:'Ecuador',short:'ECU',flag:'ec'},
  CIV:{name:'Costa de Marfil',short:'CIV',flag:'ci'},
  CUW:{name:'Curazao',short:'CUW',flag:'cw'},
  NED:{name:'Países Bajos',short:'NED',flag:'nl'},
  JPN:{name:'Japón',short:'JPN',flag:'jp'},
  TUN:{name:'Túnez',short:'TUN',flag:'tn'},
  SWE:{name:'Suecia',short:'SWE',flag:'se'},
  BEL:{name:'Bélgica',short:'BEL',flag:'be'},
  IRN:{name:'Irán',short:'IRN',flag:'ir'},
  EGY:{name:'Egipto',short:'EGY',flag:'eg'},
  NZL:{name:'Nueva Zelanda',short:'NZL',flag:'nz'},
  ESP:{name:'España',short:'ESP',flag:'es'},
  URU:{name:'Uruguay',short:'URU',flag:'uy'},
  SAU:{name:'Arabia Saudita',short:'SAU',flag:'sa'},
  CPV:{name:'Cabo Verde',short:'CPV',flag:'cv'},
  FRA:{name:'Francia',short:'FRA',flag:'fr'},
  SEN:{name:'Senegal',short:'SEN',flag:'sn'},
  NOR:{name:'Noruega',short:'NOR',flag:'no'},
  IRQ:{name:'Irak',short:'IRQ',flag:'iq'},
  ARG:{name:'Argentina',short:'ARG',flag:'ar'},
  AUT:{name:'Austria',short:'AUT',flag:'at'},
  ALG:{name:'Argelia',short:'ALG',flag:'dz'},
  JOR:{name:'Jordania',short:'JOR',flag:'jo'},
  POR:{name:'Portugal',short:'POR',flag:'pt'},
  COL:{name:'Colombia',short:'COL',flag:'co'},
  UZB:{name:'Uzbekistán',short:'UZB',flag:'uz'},
  DRC:{name:'Rep. Dem. Congo',short:'DRC',flag:'cd'},
  ENG:{name:'Inglaterra',short:'ENG',flag:'gb-eng'},
  CRO:{name:'Croacia',short:'CRO',flag:'hr'},
  PAN:{name:'Panamá',short:'PAN',flag:'pa'},
  GHA:{name:'Ghana',short:'GHA',flag:'gh'},
};

const flagUrl = c => `https://flagcdn.com/w40/${c}.png`;

const GROUPS_DEF = [
  {id:'A',teams:['MEX','KOR','ZAF','CZE']},
  {id:'B',teams:['CAN','SUI','QAT','BIH']},
  {id:'C',teams:['BRA','MAR','SCO','HAI']},
  {id:'D',teams:['USA','AUS','PAR','TUR']},
  {id:'E',teams:['GER','ECU','CIV','CUW']},
  {id:'F',teams:['NED','JPN','TUN','SWE']},
  {id:'G',teams:['BEL','IRN','EGY','NZL']},
  {id:'H',teams:['ESP','URU','SAU','CPV']},
  {id:'I',teams:['FRA','SEN','NOR','IRQ']},
  {id:'J',teams:['ARG','AUT','ALG','JOR']},
  {id:'K',teams:['POR','COL','UZB','DRC']},
  {id:'L',teams:['ENG','CRO','PAN','GHA']},
];

const MATCH_PAIRS = [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]];

/*
  FIFA 2026 — Matriz oficial de cruces R32 (dieciseisavos)
  Grupos: A-L  Posiciones: 1°, 2°, 3° (mejor tercero)
  Según el sorteo oficial FIFA para 48 equipos / 12 grupos
  Los 8 mejores terceros clasifican según esta tabla:
  Pos en bracket depende de qué grupos vienen los terceros
  Usamos la tabla oficial publicada por FIFA:
*/
// Cruces fijos para los 24 clasificados directos (1° y 2° de cada grupo)
// Partido: [equipo1_descriptor, equipo2_descriptor]
// descriptor = { g: 'A', pos: 1 } o { t: 'TERCERO_X' }
const R32_PAIRINGS_BASE = [
  // Partido 1-16 (según fixture FIFA 2026 tentativo, grupos A-L)
  [{g:'A',p:1},{g:'B',p:2}],
  [{g:'C',p:1},{g:'D',p:2}],
  [{g:'E',p:1},{g:'F',p:2}],
  [{g:'G',p:1},{g:'H',p:2}],
  [{g:'I',p:1},{g:'J',p:2}],
  [{g:'K',p:1},{g:'L',p:2}],
  [{g:'B',p:1},{g:'A',p:2}],
  [{g:'D',p:1},{g:'C',p:2}],
  [{g:'F',p:1},{g:'E',p:2}],
  [{g:'H',p:1},{g:'G',p:2}],
  [{g:'J',p:1},{g:'I',p:2}],
  [{g:'L',p:1},{g:'K',p:2}],
  // Los 4 partidos restantes incluyen mejores terceros
  // Estos slots se llenan dinámicamente con los mejores terceros
  [{g:'A',p:1},{t:'T1'}],
  [{g:'B',p:1},{t:'T2'}],
  [{g:'C',p:1},{t:'T3'}],
  [{g:'D',p:1},{t:'T4'}],
];

/* ══════════════════════════════════
   2. ESTADO
══════════════════════════════════ */
let SESSION = null;
let IS_ADMIN = false;

const STATE = {
  groups:{},
  bracket:{r32:[],r16:[],qf:[],sf:[],thirdPlace:[],final:[]},
  champion:null, runnerUp:null, third:null,
};

// Resultados oficiales (solo admin puede escribir)
const OFFICIAL = {
  groups:{},   // groupId -> [{sh,sa}] misma estructura que STATE.groups
  bracket:{r32:[],r16:[],qf:[],sf:[],thirdPlace:[],final:[]},
};

function initState() {
  GROUPS_DEF.forEach(g=>{
    STATE.groups[g.id]={matches:MATCH_PAIRS.map(([i,j])=>({home:g.teams[i],away:g.teams[j],scoreHome:'',scoreAway:''}))};
    OFFICIAL.groups[g.id]={matches:MATCH_PAIRS.map(([i,j])=>({home:g.teams[i],away:g.teams[j],scoreHome:'',scoreAway:''}))};
  });
  const counts={r32:16,r16:8,qf:4,sf:2,thirdPlace:1,final:1};
  Object.entries(counts).forEach(([r,c])=>{
    STATE.bracket[r]=Array.from({length:c},()=>({home:null,away:null,scoreHome:'',scoreAway:'',winner:null}));
    OFFICIAL.bracket[r]=Array.from({length:c},()=>({home:null,away:null,scoreHome:'',scoreAway:'',winner:null}));
  });
}

/* ══════════════════════════════════
   3. JSONBIN
══════════════════════════════════ */
let _cachedBin = null;
async function binRead(force=false) {
  if(!force && _cachedBin) return _cachedBin;
  try{
    const r=await fetch(`${BIN_URL}/latest`,{headers:{'X-Master-Key':API_KEY}});
    const d=await r.json();
    _cachedBin = d.record||{};
    return _cachedBin;
  }catch(e){return null;}
}
async function binWrite(data) {
  _cachedBin = data;
  try{
    await fetch(BIN_URL,{method:'PUT',headers:{'Content-Type':'application/json','X-Master-Key':API_KEY},body:JSON.stringify(data)});
    return true;
  }catch(e){return false;}
}

async function saveUserState() {
  if(!SESSION||IS_ADMIN) return;
  const full=await binRead()||{};
  if(!full.usuarios) full.usuarios={};
  full.usuarios[SESSION.key]={name:SESSION.name,room:SESSION.room,updatedAt:Date.now(),state:JSON.parse(JSON.stringify(STATE))};
  await binWrite(full);
}

async function loadUserState() {
  const full=await binRead();
  if(!full?.usuarios?.[SESSION.key]) return false;
  const s=full.usuarios[SESSION.key].state;
  if(!s) return false;
  if(s.groups) Object.assign(STATE.groups,s.groups);
  if(s.bracket) Object.assign(STATE.bracket,s.bracket);
  STATE.champion=s.champion||null; STATE.runnerUp=s.runnerUp||null; STATE.third=s.third||null;
  return true;
}

async function saveOfficial() {
  const full=await binRead()||{};
  full.official=JSON.parse(JSON.stringify(OFFICIAL));
  await binWrite(full);
}

async function loadOfficial() {
  const full=await binRead();
  if(!full?.official) return false;
  const o=full.official;
  if(o.groups) Object.assign(OFFICIAL.groups,o.groups);
  if(o.bracket) Object.assign(OFFICIAL.bracket,o.bracket);
  return true;
}

function saveLocal() {
  try{localStorage.setItem(`prode2026_${SESSION?.key}`,JSON.stringify(STATE));}catch(e){}
}
function loadLocal() {
  try{
    const raw=localStorage.getItem(`prode2026_${SESSION?.key}`);
    if(!raw) return false;
    const s=JSON.parse(raw);
    if(s.groups) Object.assign(STATE.groups,s.groups);
    if(s.bracket) Object.assign(STATE.bracket,s.bracket);
    STATE.champion=s.champion||null; STATE.runnerUp=s.runnerUp||null; STATE.third=s.third||null;
    return true;
  }catch(e){return false;}
}

let saveTimer=null;
function scheduleSave(){
  saveLocal();
  clearTimeout(saveTimer);
  saveTimer=setTimeout(async()=>{ await saveUserState(); },1500);
}

/* ══════════════════════════════════
   4. SESIÓN
══════════════════════════════════ */
function sessionKey(name,room){return `${room.toUpperCase()}__${name.trim().toLowerCase().replace(/\s+/g,'_')}`;}
function loadSession(){try{const s=localStorage.getItem('prode2026_session');if(s){SESSION=JSON.parse(s);IS_ADMIN=SESSION.name.toLowerCase()===ADMIN_USER;}return!!SESSION;}catch(e){return false;}}
function saveSession(){localStorage.setItem('prode2026_session',JSON.stringify(SESSION));}
function clearSession(){SESSION=null;IS_ADMIN=false;localStorage.removeItem('prode2026_session');}

/* ══════════════════════════════════
   5. LOGIN
══════════════════════════════════ */
document.getElementById('loginName').addEventListener('keydown',e=>{if(e.key==='Enter')handleLogin();});
document.getElementById('loginRoom').addEventListener('keydown',e=>{if(e.key==='Enter')handleLogin();});
document.getElementById('loginRoom').addEventListener('input',e=>{e.target.value=e.target.value.toUpperCase();});
document.getElementById('loginBtn').addEventListener('click',handleLogin);

async function handleLogin(){
  const name=document.getElementById('loginName').value.trim();
  const room=document.getElementById('loginRoom').value.trim().toUpperCase();
  const err=document.getElementById('loginError');
  const btn=document.getElementById('loginBtn');
  if(!name){err.textContent='Por favor ingresá tu nombre';return;}
  if(name.length<2){err.textContent='El nombre debe tener al menos 2 caracteres';return;}
  if(!room){err.textContent='Por favor ingresá el código de sala';return;}
  if(room.length<3){err.textContent='El código de sala debe tener al menos 3 caracteres';return;}
  btn.textContent='Cargando...'; btn.disabled=true; err.textContent='';
  SESSION={name,room,key:sessionKey(name,room)};
  IS_ADMIN=name.toLowerCase()===ADMIN_USER;
  saveSession();
  initState();
  if(IS_ADMIN){
    await loadOfficial();
  } else {
    const cloud=await loadUserState();
    if(!cloud) loadLocal();
    await loadOfficial(); // load official to show scores
  }
  buildBracketFromGroups();
  showApp();
  btn.textContent='Entrar al prode ⚽'; btn.disabled=false;
}

function showApp(){
  document.getElementById('loginOverlay').style.display='none';
  document.getElementById('siteHeader').style.display='';
  document.getElementById('mainContent').style.display='';
  document.getElementById('userName').textContent=SESSION.name;
  document.getElementById('userRoom').textContent=SESSION.room;
  document.getElementById('userAvatar').textContent=SESSION.name.charAt(0).toUpperCase();
  if(IS_ADMIN){
    document.getElementById('adminBadge').style.display='';
    document.getElementById('btnAutoSim').style.display='none';
    document.getElementById('btnExport').style.display='none';
    // Add admin nav
    const nav=document.getElementById('headerNav');
    const adminBtn=document.createElement('button');
    adminBtn.className='nav-btn admin-nav'; adminBtn.dataset.view='admin'; adminBtn.textContent='👑 Admin';
    nav.appendChild(adminBtn);
    // Disable score inputs for admin (they use admin panel)
    document.getElementById('groupsSubtitle').textContent='Vista de grupos (modo admin — usá el panel para cargar resultados)';
    document.getElementById('bracketSubtitle').textContent='Vista de llaves';
    renderAdminPanel();
  } else {
    document.getElementById('btnAutoSim').style.display='';
    document.getElementById('btnExport').style.display='';
  }
  setupNav(document.getElementById('headerNav'));
  renderAll();
  showToast(IS_ADMIN?`👑 Bienvenido, Admin!`:`¡Bienvenido, ${SESSION.name}! 👋`);
}

document.getElementById('btnLogout').addEventListener('click',()=>{
  if(!confirm('¿Cerrar sesión?')) return;
  clearSession(); location.reload();
});

/* ══════════════════════════════════
   6. STANDINGS
══════════════════════════════════ */
function calcStandings(groupId, useOfficial=false){
  const g=GROUPS_DEF.find(x=>x.id===groupId);
  const src=useOfficial?OFFICIAL.groups[groupId]:STATE.groups[groupId];
  const table={};
  g.teams.forEach(t=>{table[t]={team:t,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,dg:0,pts:0};});
  src.matches.forEach(m=>{
    const sh=parseInt(m.scoreHome),sa=parseInt(m.scoreAway);
    if(isNaN(sh)||isNaN(sa)) return;
    const h=table[m.home],a=table[m.away];
    h.pj++;h.gf+=sh;h.gc+=sa;h.dg+=sh-sa;
    a.pj++;a.gf+=sa;a.gc+=sh;a.dg+=sa-sh;
    if(sh>sa){h.pg++;h.pts+=3;a.pp++;}
    else if(sh<sa){a.pg++;a.pts+=3;h.pp++;}
    else{h.pe++;h.pts++;a.pe++;a.pts++;}
  });
  return Object.values(table).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||a.team.localeCompare(b.team));
}

// Get 1st and 2nd from each group (from user state OR official)
function getQualified(useOfficial=false){
  const q={};
  GROUPS_DEF.forEach(g=>{const st=calcStandings(g.id,useOfficial);q[g.id]={first:st[0].team,second:st[1].team,third:st[2].team,fourthTeam:st[3].team,third_stats:st[2]};});
  return q;
}

/* ══════════════════════════════════
   7. MEJORES TERCEROS (FIFA 2026)
   Clasifican los 8 mejores 3° de 12 grupos
   Criterio: pts > dg > gf > alfabético grupo
══════════════════════════════════ */
function getBestThirds(useOfficial=false){
  const thirds=GROUPS_DEF.map(g=>{
    const st=calcStandings(g.id,useOfficial);
    return {...st[2],group:g.id};
  });
  // Sort by pts, dg, gf, then group name
  thirds.sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||a.group.localeCompare(b.group));
  return thirds.slice(0,8); // top 8
}

/*
  FIFA 2026 official bracket placement for best third-place teams.
  The exact positions depend on which 8 groups produce the best thirds.
  For simplicity (FIFA hasn't published exact 2026 matrix yet),
  we follow the logic from the 2026 format:
  The 8 third-place teams fill the 4 remaining R32 slots (matches 13-16)
  paired against the winners of groups that don't have their 1st/2nd in those slots.
  We place them as T1..T8 ordered by ranking.
*/
function buildBracketFromGroups(useOfficial=false){
  const q=getQualified(useOfficial);
  const src=useOfficial?OFFICIAL.bracket:STATE.bracket;
  const best8=getBestThirds(useOfficial);

  // Matches 0-11: fixed 1st vs 2nd cross-group
  const fixedPairs=[
    [q.A.first,q.B.second],[q.C.first,q.D.second],[q.E.first,q.F.second],
    [q.G.first,q.H.second],[q.I.first,q.J.second],[q.K.first,q.L.second],
    [q.B.first,q.A.second],[q.D.first,q.C.second],[q.F.first,q.E.second],
    [q.H.first,q.G.second],[q.J.first,q.I.second],[q.L.first,q.K.second],
  ];
  fixedPairs.forEach(([home,away],i)=>{
    src.r32[i].home=home; src.r32[i].away=away;
    if(src.r32[i].winner&&src.r32[i].winner!==home&&src.r32[i].winner!==away){
      src.r32[i].winner=null;src.r32[i].scoreHome='';src.r32[i].scoreAway='';
    }
  });

  // Matches 12-15: best 8 thirds paired with leftover group winners
  // Pair: [group_first, best_third]
  const thirdPairs=[
    [q.A.first, best8[0]?.team||null],
    [q.B.first, best8[1]?.team||null],
    [q.C.first, best8[2]?.team||null],
    [q.D.first, best8[3]?.team||null],
  ];
  // Remaining 4 thirds go into existing matches as opponents
  // We just append them into remaining r32 slots 12-15
  thirdPairs.forEach(([home,away],i)=>{
    const idx=12+i;
    src.r32[idx].home=home; src.r32[idx].away=away;
    if(src.r32[idx].winner&&src.r32[idx].winner!==home&&src.r32[idx].winner!==away){
      src.r32[idx].winner=null;src.r32[idx].scoreHome='';src.r32[idx].scoreAway='';
    }
  });

  propagateBracket('r32',useOfficial);
}

function propagateBracket(fromRound,useOfficial=false){
  const src=useOfficial?OFFICIAL.bracket:STATE.bracket;
  const order=['r32','r16','qf','sf'];
  const nextMap={r32:'r16',r16:'qf',qf:'sf',sf:'final'};
  const idx=order.indexOf(fromRound);
  const rounds=idx>=0?order.slice(idx):[];
  rounds.forEach(round=>{
    const next=nextMap[round];if(!next) return;
    const s=src[round],d=src[next];
    for(let i=0;i<s.length;i+=2){
      const mi=i/2;if(mi>=d.length) break;
      const ph=d[mi].home,pa=d[mi].away;
      d[mi].home=s[i].winner||null;
      d[mi].away=(s[i+1]?.winner)||null;
      if(ph!==d[mi].home||pa!==d[mi].away){
        if(d[mi].winner&&d[mi].winner!==d[mi].home&&d[mi].winner!==d[mi].away){
          d[mi].winner=null;d[mi].scoreHome='';d[mi].scoreAway='';
        }
      }
    }
  });
  const sf=src.sf;
  const l1=sf[0].winner?(sf[0].winner===sf[0].home?sf[0].away:sf[0].home):null;
  const l2=sf[1]?.winner?(sf[1].winner===sf[1].home?sf[1].away:sf[1].home):null;
  src.thirdPlace[0].home=l1; src.thirdPlace[0].away=l2;
  const fin=src.final[0];
  if(!useOfficial){
    STATE.champion=fin.winner||null;
    STATE.runnerUp=fin.winner?(fin.winner===fin.home?fin.away:fin.home):null;
    STATE.third=src.thirdPlace[0].winner||null;
  }
}

/* ══════════════════════════════════
   8. SISTEMA DE PUNTOS
   Resultado exacto = 3pts
   Ganador/empate correcto = 2pts
══════════════════════════════════ */
function calcUserScore(userState){
  let pts=0, exact=0, winner=0;

  // Grupos
  GROUPS_DEF.forEach(g=>{
    const ums=userState.groups?.[g.id]?.matches||[];
    const oms=OFFICIAL.groups?.[g.id]?.matches||[];
    ums.forEach((um,i)=>{
      const om=oms[i];
      if(!om||om.scoreHome===''||om.scoreAway==='') return;
      const ush=parseInt(um.scoreHome),usa=parseInt(um.scoreAway);
      const osh=parseInt(om.scoreHome),osa=parseInt(om.scoreAway);
      if(isNaN(ush)||isNaN(usa)) return;
      if(ush===osh&&usa===osa){pts+=3;exact++;}
      else if((ush>usa&&osh>osa)||(ush<usa&&osh<osa)||(ush===usa&&osh===osa)){pts+=2;winner++;}
    });
  });

  // Bracket rounds
  const rounds=['r32','r16','qf','sf','thirdPlace','final'];
  rounds.forEach(r=>{
    const ubr=userState.bracket?.[r]||[];
    const obr=OFFICIAL.bracket?.[r]||[];
    ubr.forEach((um,i)=>{
      const om=obr[i];
      if(!om?.winner) return;
      const ush=parseInt(um.scoreHome),usa=parseInt(um.scoreAway);
      const osh=parseInt(om.scoreHome),osa=parseInt(om.scoreAway);
      if(um.winner===om.winner){
        if(!isNaN(ush)&&!isNaN(usa)&&ush===osh&&usa===osa){pts+=3;exact++;}
        else{pts+=2;winner++;}
      }
    });
  });

  return {pts,exact,winner};
}

/* ══════════════════════════════════
   9. RENDER GRUPOS
══════════════════════════════════ */
function renderGroups(){
  const container=document.getElementById('groupsContainer');
  container.innerHTML='';
  GROUPS_DEF.forEach(g=>{
    const standings=calcStandings(g.id);
    const best8=getBestThirds();
    const best8teams=best8.map(t=>t.team);
    const card=document.createElement('div');
    card.className='group-card';
    card.innerHTML=`
      <div class="group-header">
        <span class="group-name">GRUPO ${g.id}</span>
        <span class="group-badge">${g.teams.map(t=>TEAMS[t].short).join(' · ')}</span>
      </div>
      <table class="group-table">
        <thead><tr>
          <th>Selección</th><th title="PJ">PJ</th><th title="PG">PG</th><th title="PE">PE</th>
          <th title="PP">PP</th><th title="GF">GF</th><th title="GC">GC</th><th title="DG">DG</th><th title="PTS">PTS</th>
        </tr></thead>
        <tbody id="tbody-${g.id}"></tbody>
      </table>
      <div class="group-matches"><div class="matches-label">Partidos</div><div id="matches-${g.id}"></div></div>`;
    container.appendChild(card);
    renderGroupTable(g.id,standings,best8teams);
    renderGroupMatches(g.id);
  });
}

function renderGroupTable(groupId,standings,best8teams){
  const tbody=document.getElementById(`tbody-${groupId}`);
  if(!tbody) return;
  tbody.innerHTML='';
  standings.forEach((row,i)=>{
    const t=TEAMS[row.team];
    const tr=document.createElement('tr');
    let cls='';
    if(i===0) cls='team-row-q1';
    else if(i===1) cls='team-row-q2';
    else if(best8teams.includes(row.team)) cls='team-row-q3';
    tr.className=cls;
    const dgStr=row.dg>0?`+${row.dg}`:String(row.dg);
    tr.innerHTML=`
      <td><div class="team-cell">
        <img class="team-flag" src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy"/>
        <span class="team-name-short">${t.name}</span>
      </div></td>
      <td>${row.pj}</td><td>${row.pg}</td><td>${row.pe}</td><td>${row.pp}</td>
      <td>${row.gf}</td><td>${row.gc}</td><td>${dgStr}</td><td class="pts-cell">${row.pts}</td>`;
    tbody.appendChild(tr);
  });
}

function renderGroupMatches(groupId){
  const container=document.getElementById(`matches-${groupId}`);
  if(!container) return;
  container.innerHTML='';
  const matches=STATE.groups[groupId].matches;
  const offMatches=OFFICIAL.groups[groupId].matches;
  matches.forEach((m,mi)=>{
    const th=TEAMS[m.home],ta=TEAMS[m.away];
    const om=offMatches[mi];
    const hasOfficial=om.scoreHome!==''&&om.scoreAway!=='';
    const row=document.createElement('div');
    row.className='match-row';
    row.innerHTML=`
      <div class="match-team home">
        <img src="${flagUrl(th.flag)}" alt="${th.name}" loading="lazy"/>
        <span>${th.name}</span>
      </div>
      <div class="match-score">
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreHome}" data-group="${groupId}" data-match="${mi}" data-side="home"
          placeholder="–" ${IS_ADMIN?'readonly':''}/>
        <span class="score-sep">:</span>
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreAway}" data-group="${groupId}" data-match="${mi}" data-side="away"
          placeholder="–" ${IS_ADMIN?'readonly':''}/>
        ${hasOfficial?`<span class="official-badge">${om.scoreHome}-${om.scoreAway}</span>`:''}
      </div>
      <div class="match-team away">
        <img src="${flagUrl(ta.flag)}" alt="${ta.name}" loading="lazy"/>
        <span>${ta.name}</span>
      </div>`;
    container.appendChild(row);
  });
  if(!IS_ADMIN){
    container.querySelectorAll('.score-input').forEach(inp=>inp.addEventListener('input',onScoreInput));
  }
}

function onScoreInput(e){
  const {group,match,side}=e.target.dataset;
  STATE.groups[group].matches[parseInt(match)][side==='home'?'scoreHome':'scoreAway']=e.target.value;
  const best8=getBestThirds();
  renderGroupTable(group,calcStandings(group),best8.map(t=>t.team));
  buildBracketFromGroups(); renderBracket(); renderStats();
  scheduleSave();
}

/* ══════════════════════════════════
   10. RENDER BRACKET
══════════════════════════════════ */
function renderBracket(){
  const wrapper=document.getElementById('bracketWrapper');
  wrapper.innerHTML='';
  const layout=document.createElement('div');
  layout.className='bracket-layout';
  const rounds=[
    {key:'r32',label:'Dieciseisavos'},
    {key:'r16',label:'Octavos'},
    {key:'qf',label:'Cuartos'},
    {key:'sf',label:'Semis'},
    {key:'final',label:'FINAL',cls:'final'},
  ];
  rounds.forEach(r=>{
    const col=document.createElement('div');
    col.className=`bracket-round${r.cls?' '+r.cls:''}`;
    const lbl=document.createElement('div');
    lbl.className='bracket-round-label';lbl.textContent=r.label;
    col.appendChild(lbl);
    const mw=document.createElement('div');mw.className='bracket-matches';
    STATE.bracket[r.key].forEach((m,mi)=>mw.appendChild(buildBracketMatch(r.key,mi,m)));
    col.appendChild(mw);layout.appendChild(col);
  });
  // Champion
  const champ=document.createElement('div');
  champ.className='bracket-round';champ.style.minWidth='130px';
  const cl=document.createElement('div');cl.className='bracket-round-label';cl.style.color='var(--accent-gold)';cl.textContent='CAMPEÓN';
  champ.appendChild(cl);
  const cd=document.createElement('div');cd.className='champion-display';
  cd.innerHTML=STATE.champion?`<div class="champion-cup">🏆</div>
    <img class="champion-display-flag" src="${flagUrl(TEAMS[STATE.champion].flag)}" alt="${TEAMS[STATE.champion].name}"/>
    <div class="champion-display-name">${TEAMS[STATE.champion].name}</div>`:
    `<div class="champion-cup" style="opacity:0.3">🏆</div>`;
  champ.appendChild(cd);layout.appendChild(champ);
  wrapper.appendChild(layout);
  // 3rd place
  const tw=document.createElement('div');tw.style.cssText='margin-top:32px;max-width:320px';
  const tl=document.createElement('div');tl.className='third-place-label';tl.textContent='🥉 Tercer Puesto';
  tw.appendChild(tl);tw.appendChild(buildBracketMatch('thirdPlace',0,STATE.bracket.thirdPlace[0]));
  wrapper.appendChild(tw);
}

function buildBracketMatch(round,idx,m){
  const div=document.createElement('div');div.className='bracket-match';
  [['home',m.home,m.scoreHome],['away',m.away,m.scoreAway]].forEach(([side,tc,score])=>{
    const td=document.createElement('div');td.className='bracket-team';
    if(!tc){
      td.classList.add('empty');
      td.innerHTML=`<span class="bracket-team-name" style="color:var(--text-3)">Por definir</span>`;
    } else {
      const t=TEAMS[tc];
      if(!t){td.classList.add('empty');td.innerHTML=`<span class="bracket-team-name">${tc}</span>`;return;}
      if(m.winner===tc) td.classList.add('winner');
      else if(m.winner&&m.winner!==tc) td.classList.add('loser');
      td.innerHTML=`<img src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy"/>
        <span class="bracket-team-name">${t.name}</span>
        <span class="bracket-score">${score!==''?score:''}</span>`;
      if(!IS_ADMIN) td.addEventListener('click',()=>onBracketClick(round,idx,side,tc));
    }
    div.appendChild(td);
  });
  return div;
}

function onBracketClick(round,idx,side,tc){
  const match=STATE.bracket[round][idx];
  if(!match.home||!match.away) return;
  match.winner=tc;
  if(!match.scoreHome&&!match.scoreAway){match.scoreHome=side==='home'?'1':'0';match.scoreAway=side==='home'?'0':'1';}
  propagateBracket(round); scheduleSave();
  renderBracket(); renderStats();
  if(STATE.champion) setTimeout(()=>showChampionModal(),400);
}

/* ══════════════════════════════════
   11. ADMIN PANEL
══════════════════════════════════ */
function renderAdminPanel(){
  renderAdminGroups();
  renderAdminBracket();
}

function renderAdminGroups(){
  const container=document.getElementById('admin-groups');
  container.innerHTML='<div class="admin-groups-grid" id="adminGroupsGrid"></div>';
  const grid=document.getElementById('adminGroupsGrid');
  GROUPS_DEF.forEach(g=>{
    const card=document.createElement('div');
    card.className='group-card';
    card.innerHTML=`<div class="group-header"><span class="group-name">GRUPO ${g.id}</span></div>
      <div class="group-matches" style="padding:14px">
        <div class="matches-label">Resultados oficiales</div>
        <div id="admin-matches-${g.id}"></div>
        <button class="admin-save-btn" data-group="${g.id}">💾 Guardar Grupo ${g.id}</button>
      </div>`;
    grid.appendChild(card);
    renderAdminGroupMatches(g.id);
    card.querySelector('.admin-save-btn').addEventListener('click',()=>saveOfficialGroup(g.id));
  });
}

function renderAdminGroupMatches(groupId){
  const container=document.getElementById(`admin-matches-${groupId}`);
  if(!container) return;
  container.innerHTML='';
  const offMatches=OFFICIAL.groups[groupId].matches;
  offMatches.forEach((m,mi)=>{
    const th=TEAMS[m.home],ta=TEAMS[m.away];
    const hasResult=m.scoreHome!==''&&m.scoreAway!=='';
    const row=document.createElement('div');
    row.className=`admin-match-row${hasResult?' has-result':''}`;
    row.innerHTML=`
      <div class="admin-team-label">
        <img src="${flagUrl(th.flag)}" alt="${th.name}" loading="lazy"/>${th.name}
      </div>
      <div class="match-score" style="flex-shrink:0">
        <input class="admin-score-input" type="number" min="0" max="99"
          value="${m.scoreHome}" data-group="${groupId}" data-match="${mi}" data-side="home" placeholder="–"/>
        <span class="score-sep">:</span>
        <input class="admin-score-input" type="number" min="0" max="99"
          value="${m.scoreAway}" data-group="${groupId}" data-match="${mi}" data-side="away" placeholder="–"/>
      </div>
      <div class="admin-team-label" style="justify-content:flex-end">
        ${ta.name}<img src="${flagUrl(ta.flag)}" alt="${ta.name}" loading="lazy"/>
      </div>`;
    container.appendChild(row);
  });
  container.querySelectorAll('.admin-score-input').forEach(inp=>{
    inp.addEventListener('input',e=>{
      const {group,match,side}=e.target.dataset;
      OFFICIAL.groups[group].matches[parseInt(match)][side==='home'?'scoreHome':'scoreAway']=e.target.value;
    });
  });
}

async function saveOfficialGroup(groupId){
  showToast('💾 Guardando...');
  buildBracketFromGroups(true);
  await saveOfficial();
  renderAdminGroupMatches(groupId);
  showToast(`✅ Grupo ${groupId} guardado`);
}

function renderAdminBracket(){
  const container=document.getElementById('admin-bracket');
  container.innerHTML='';
  buildBracketFromGroups(true);
  const rounds=[
    {key:'r32',label:'Dieciseisavos de Final'},
    {key:'r16',label:'Octavos de Final'},
    {key:'qf',label:'Cuartos de Final'},
    {key:'sf',label:'Semifinales'},
    {key:'thirdPlace',label:'Tercer Puesto'},
    {key:'final',label:'Gran Final'},
  ];
  rounds.forEach(r=>{
    const section=document.createElement('div');
    section.className='admin-round-section';
    section.innerHTML=`<div class="admin-round-title">${r.label}</div><div id="admin-bracket-${r.key}"></div>
      <button class="admin-save-btn" data-round="${r.key}" style="margin-top:8px">💾 Guardar ${r.label}</button>`;
    container.appendChild(section);
    section.querySelector('.admin-save-btn').addEventListener('click',()=>saveOfficialBracketRound(r.key));
    renderAdminBracketRound(r.key);
  });
}

function renderAdminBracketRound(roundKey){
  const container=document.getElementById(`admin-bracket-${roundKey}`);
  if(!container) return;
  container.innerHTML='';
  const matches=OFFICIAL.bracket[roundKey];
  matches.forEach((m,mi)=>{
    const hasResult=!!m.winner;
    const homeT=m.home&&TEAMS[m.home];
    const awayT=m.away&&TEAMS[m.away];
    const div=document.createElement('div');
    div.className=`admin-bracket-match${hasResult?' has-result':''}`;
    div.innerHTML=`
      <div class="admin-team-label">
        ${homeT?`<img src="${flagUrl(homeT.flag)}" alt="${homeT.name}" loading="lazy"/>${homeT.name}`:'Por definir'}
      </div>
      <div class="match-score" style="flex-shrink:0;gap:6px">
        <input class="admin-score-input" type="number" min="0" max="99"
          value="${m.scoreHome}" data-round="${roundKey}" data-match="${mi}" data-side="home" placeholder="–"/>
        <span class="score-sep">:</span>
        <input class="admin-score-input" type="number" min="0" max="99"
          value="${m.scoreAway}" data-round="${roundKey}" data-match="${mi}" data-side="away" placeholder="–"/>
      </div>
      <div class="admin-team-label" style="justify-content:flex-end">
        ${awayT?`${awayT.name}<img src="${flagUrl(awayT.flag)}" alt="${awayT.name}" loading="lazy"/>`:'Por definir'}
      </div>
      <div>
        <select class="admin-winner-sel" data-round="${roundKey}" data-match="${mi}">
          <option value="">Ganador...</option>
          ${homeT?`<option value="${m.home}" ${m.winner===m.home?'selected':''}>${homeT.name}</option>`:''}
          ${awayT?`<option value="${m.away}" ${m.winner===m.away?'selected':''}>${awayT.name}</option>`:''}
        </select>
      </div>`;
    container.appendChild(div);
    div.querySelectorAll('.admin-score-input').forEach(inp=>{
      inp.addEventListener('input',e=>{
        const {round,match,side}=e.target.dataset;
        OFFICIAL.bracket[round][parseInt(match)][side==='home'?'scoreHome':'scoreAway']=e.target.value;
      });
    });
    div.querySelector('.admin-winner-sel').addEventListener('change',e=>{
      OFFICIAL.bracket[roundKey][mi].winner=e.target.value||null;
      propagateBracket(roundKey,true);
      // Re-render next rounds
      const next={r32:'r16',r16:'qf',qf:'sf',sf:'final'};
      if(next[roundKey]) renderAdminBracketRound(next[roundKey]);
      if(roundKey==='sf') renderAdminBracketRound('thirdPlace');
    });
  });
}

async function saveOfficialBracketRound(roundKey){
  showToast('💾 Guardando...');
  propagateBracket(roundKey,true);
  await saveOfficial();
  renderAdminBracketRound(roundKey);
  showToast(`✅ ${roundKey} guardado`);
}

/* ══════════════════════════════════
   12. ADMIN — VER PRODES
══════════════════════════════════ */
async function renderAdminUsers(){
  const container=document.getElementById('admin-users');
  container.innerHTML=`<div class="ranking-loading">🔄 Cargando prodes...</div>`;
  const full=await binRead(true)||{};
  if(!full.usuarios){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">😕</div><p>No hay usuarios aún.</p></div>`;
    return;
  }
  const users=Object.values(full.usuarios).filter(u=>u.room===SESSION.room&&u.name.toLowerCase()!==ADMIN_USER);
  if(!users.length){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">🏟️</div><p>Nadie en la sala <strong>${SESSION.room}</strong> aún.</p></div>`;
    return;
  }
  container.innerHTML='<div class="admin-users-grid" id="adminUsersGrid"></div>';
  const grid=document.getElementById('adminUsersGrid');
  users.forEach(u=>{
    const score=calcUserScore(u.state);
    const champ=u.state?.champion;
    const champT=champ&&TEAMS[champ];
    const card=document.createElement('div');
    card.className='admin-user-card';
    card.innerHTML=`
      <div class="admin-user-header">
        <div>
          <div class="admin-user-name">👤 ${u.name}</div>
          <div class="admin-user-champion">${champT?`Campeón: ${champT.name}`:'Sin campeón aún'}</div>
          <div style="font-size:11px;color:var(--text-2);margin-top:4px">
            ✅ Exactos: ${score.exact} · 🏅 Ganador: ${score.winner}
          </div>
        </div>
        <div style="text-align:right">
          <div class="admin-user-pts">${score.pts}</div>
          <div style="font-size:11px;color:var(--text-2)">puntos</div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════
   13. RANKING
══════════════════════════════════ */
document.getElementById('btnRefreshRanking').addEventListener('click',renderRanking);

async function renderRanking(){
  const container=document.getElementById('rankingContainer');
  container.innerHTML=`<div class="ranking-loading">🔄 Cargando ranking...</div>`;
  document.getElementById('rankingSubtitle').textContent=`Sala: ${SESSION.room}`;
  const full=await binRead(true)||{};
  await loadOfficial();
  if(!full.usuarios){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">😕</div><p>No hay datos aún.</p></div>`;
    return;
  }
  const users=Object.values(full.usuarios).filter(u=>u.room===SESSION.room&&u.name.toLowerCase()!==ADMIN_USER);
  if(!users.length){
    container.innerHTML=`<div class="ranking-empty"><div class="ranking-empty-icon">🏟️</div><p>Nadie en la sala <strong>${SESSION.room}</strong> aún.</p></div>`;
    return;
  }
  users.forEach(u=>{ u._score=calcUserScore(u.state); });
  users.sort((a,b)=>b._score.pts-a._score.pts||b._score.exact-a._score.exact);
  const medals=['🥇','🥈','🥉'];
  const table=document.createElement('table');
  table.className='ranking-table';
  table.innerHTML=`<thead><tr>
    <th>#</th><th>Jugador</th><th>Campeón elegido</th><th>Puntos</th><th>Desglose</th>
  </tr></thead>`;
  const tbody=document.createElement('tbody');
  users.forEach((u,i)=>{
    const tr=document.createElement('tr');
    if(u.name===SESSION.name) tr.classList.add('me');
    const champ=u.state?.champion;
    const champT=champ&&TEAMS[champ];
    const champHtml=champT?`<div class="ranking-champion"><img src="${flagUrl(champT.flag)}" alt="${champT.name}"/>${champT.name}</div>`:'–';
    tr.innerHTML=`
      <td><span style="font-size:20px">${medals[i]||i+1}</span></td>
      <td><span class="ranking-name">${u.name}${u.name===SESSION.name?' <span style="font-size:11px;color:var(--accent)">(vos)</span>':''}</span></td>
      <td>${champHtml}</td>
      <td><span class="ranking-pts">${u._score.pts}</span></td>
      <td><div class="pts-breakdown">✅ Exactos: ${u._score.exact} · 🏅 Ganador: ${u._score.winner}</div></td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.innerHTML=''; container.appendChild(table);
}

/* ══════════════════════════════════
   14. STATS
══════════════════════════════════ */
function calcTotalGoals(){
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
function calcMatchesPlayed(){
  let p=0;
  GROUPS_DEF.forEach(g=>STATE.groups[g.id].matches.forEach(m=>{if(m.scoreHome!==''&&m.scoreAway!=='') p++;}));
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(r=>STATE.bracket[r].forEach(m=>{if(m.winner) p++;}));
  return p;
}
function calcTopTeams(){
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

function renderStats(){
  const grid=document.getElementById('statsGrid'); grid.innerHTML='';
  const totalGoals=calcTotalGoals(),matchPlayed=calcMatchesPlayed();
  const avg=matchPlayed>0?(totalGoals/matchPlayed).toFixed(1):'–';
  const topTeams=calcTopTeams();
  const totalMatches=104, pct=Math.round((matchPlayed/totalMatches)*100);
  [
    {icon:'⚽',label:'Goles totales',value:totalGoals,sub:`En ${matchPlayed} partidos`},
    {icon:'📊',label:'Promedio goles',value:avg,sub:'Por partido'},
    {icon:'🏟️',label:'Partidos jugados',value:matchPlayed,sub:`de ${totalMatches}`},
    {icon:'🏆',label:'Mi campeón',value:STATE.champion?TEAMS[STATE.champion].short:'–',sub:STATE.champion?TEAMS[STATE.champion].name:'Sin definir'},
  ].forEach(c=>{
    const card=document.createElement('div'); card.className='stat-card';
    card.innerHTML=`<div class="stat-icon">${c.icon}</div><div class="stat-label">${c.label}</div><div class="stat-value">${c.value}</div><div class="stat-sub">${c.sub}</div>`;
    grid.appendChild(card);
  });
  const topCard=document.createElement('div'); topCard.className='stat-card stat-card-wide';
  topCard.innerHTML=`<div class="stat-icon">🥇</div><div class="stat-label">Equipos más goleadores</div><div class="top-scorers-list" id="topList"></div>`;
  grid.appendChild(topCard);
  const list=topCard.querySelector('#topList');
  topTeams.forEach(([tc,g],i)=>{
    const t=TEAMS[tc]; if(!t) return;
    const row=document.createElement('div'); row.className='top-scorer-row';
    row.innerHTML=`<span class="scorer-rank">${i+1}</span><img class="scorer-flag" src="${flagUrl(t.flag)}" alt="${t.name}"/><span class="scorer-name">${t.name}</span><span class="scorer-goals">${g}</span>`;
    list.appendChild(row);
  });
  const progCard=document.createElement('div'); progCard.className='stat-card';
  progCard.innerHTML=`<div class="stat-icon">📈</div><div class="stat-label">Progreso</div><div class="stat-value">${pct}%</div>
    <div class="progress-bar-wrap"><div class="progress-item">
      <div class="progress-label"><span>Completado</span><span>${matchPlayed}/${totalMatches}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div></div>`;
  grid.appendChild(progCard);
}

/* ══════════════════════════════════
   15. CHAMPION MODAL
══════════════════════════════════ */
function showChampionModal(){
  if(!STATE.champion) return;
  const champ=TEAMS[STATE.champion],runner=STATE.runnerUp?TEAMS[STATE.runnerUp]:null,third=STATE.third?TEAMS[STATE.third]:null;
  document.getElementById('championFlag').src=flagUrl(champ.flag);
  document.getElementById('championName').textContent=champ.name;
  if(runner){document.getElementById('runnerUpFlag').src=flagUrl(runner.flag);document.getElementById('runnerUpName').textContent=runner.name;}
  if(third){document.getElementById('thirdFlag').src=flagUrl(third.flag);document.getElementById('thirdName').textContent=third.name;}
  document.getElementById('championModal').classList.add('open');
  launchConfetti();
}
function launchConfetti(){
  const c=document.getElementById('confettiContainer'); c.innerHTML='';
  const colors=['#00d4aa','#f5c842','#ff6b35','#fff','#4ade80','#60a5fa'];
  for(let i=0;i<80;i++){
    const p=document.createElement('div'); p.className='confetti-piece';
    p.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*1.5}s;`;
    c.appendChild(p);
  }
}
document.getElementById('closeChampion').addEventListener('click',()=>document.getElementById('championModal').classList.remove('open'));

/* ══════════════════════════════════
   16. AUTO SIM
══════════════════════════════════ */
function rng(){const g=[0,0,0,1,1,1,1,2,2,3,4];return g[Math.floor(Math.random()*g.length)];}
document.getElementById('btnAutoSim').addEventListener('click',()=>{
  const btn=document.getElementById('btnAutoSim');
  btn.classList.add('simulating'); showToast('⚡ Simulando...');
  setTimeout(()=>{
    GROUPS_DEF.forEach(g=>STATE.groups[g.id].matches.forEach(m=>{m.scoreHome=String(rng());m.scoreAway=String(rng());}));
    buildBracketFromGroups();
    ['r32','r16','qf','sf','thirdPlace','final'].forEach(round=>{
      STATE.bracket[round].forEach(m=>{
        if(!m.home||!m.away) return;
        let sh=rng(),sa=rng(); while(sh===sa) sa=rng();
        m.scoreHome=String(sh); m.scoreAway=String(sa); m.winner=sh>sa?m.home:m.away;
      });
      propagateBracket(round);
    });
    scheduleSave(); renderAll();
    btn.classList.remove('simulating'); showToast('✅ Simulación completada');
    if(STATE.champion) setTimeout(()=>showChampionModal(),800);
  },600);
});

/* ══════════════════════════════════
   17. EXPORTAR
══════════════════════════════════ */
document.getElementById('btnExport').addEventListener('click',e=>{e.stopPropagation();document.getElementById('exportDropdown').classList.toggle('open');});
document.addEventListener('click',()=>document.getElementById('exportDropdown').classList.remove('open'));
document.getElementById('exportDropdown').addEventListener('click',e=>e.stopPropagation());
document.getElementById('exportJSON').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(STATE,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='prode_2026.json';a.click();showToast('📦 JSON descargado');
});
document.getElementById('exportPNG').addEventListener('click',async()=>{
  showToast('📸 Generando imagen...');
  try{const canvas=await html2canvas(document.querySelector('.view.active'),{backgroundColor:'#0a0c10',scale:2,useCORS:true});
    const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='prode_2026.png';a.click();showToast('✅ Imagen descargada');}
  catch(e){showToast('❌ Error');}
});
document.getElementById('exportPDF').addEventListener('click',async()=>{
  showToast('📄 Generando PDF...');
  try{const {jsPDF}=window.jspdf;
    const canvas=await html2canvas(document.querySelector('.view.active'),{backgroundColor:'#0a0c10',scale:1.5,useCORS:true});
    const pdf=new jsPDF({orientation:canvas.width>canvas.height?'l':'p',unit:'px',format:[canvas.width,canvas.height]});
    pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,canvas.width,canvas.height);
    pdf.save('prode_2026.pdf');showToast('✅ PDF descargado');}
  catch(e){showToast('❌ Error');}
});
document.getElementById('btnReset').addEventListener('click',()=>{
  if(!confirm('¿Reiniciar tu prode?')) return;
  localStorage.removeItem(`prode2026_${SESSION?.key}`);
  initState(); renderAll(); showToast('🗑️ Reiniciado'); scheduleSave();
});

/* ══════════════════════════════════
   18. NAVEGACIÓN
══════════════════════════════════ */
function switchView(viewName){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  if(viewName==='stats') renderStats();
  if(viewName==='bracket') renderBracket();
  if(viewName==='ranking') renderRanking();
  if(viewName==='admin'){
    // Switch admin subtabs
    renderAdminPanel();
    setupAdminTabs();
  }
}

function setupNav(navEl){
  navEl.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll(`[data-view="${btn.dataset.view}"]`).forEach(b=>b.classList.add('active'));
      switchView(btn.dataset.view);
    });
  });
}

function setupAdminTabs(){
  document.querySelectorAll('.admin-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const target=document.getElementById(tab.dataset.atab);
      if(target) target.classList.add('active');
      if(tab.dataset.atab==='admin-users') renderAdminUsers();
    });
  });
}

/* ══════════════════════════════════
   19. TEMA
══════════════════════════════════ */
document.getElementById('toggleTheme').addEventListener('click',()=>{
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  document.getElementById('toggleTheme').textContent=isDark?'☀️':'🌙';
  localStorage.setItem('prode2026_theme',isDark?'light':'dark');
});

/* ══════════════════════════════════
   20. TOAST
══════════════════════════════════ */
let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ══════════════════════════════════
   21. INIT
══════════════════════════════════ */
function renderAll(){renderGroups();renderBracket();renderStats();}

function init(){
  const savedTheme=localStorage.getItem('prode2026_theme');
  if(savedTheme){document.documentElement.setAttribute('data-theme',savedTheme);document.getElementById('toggleTheme').textContent=savedTheme==='light'?'☀️':'🌙';}

  // Mobile nav
  const mobileNav=document.createElement('div'); mobileNav.className='mobile-nav';
  const mobileButtons=IS_ADMIN
    ?'<button class="nav-btn active" data-view="groups">Grupos</button><button class="nav-btn" data-view="bracket">Llaves</button><button class="nav-btn" data-view="ranking">Ranking</button><button class="nav-btn admin-nav" data-view="admin">👑</button>'
    :'<button class="nav-btn active" data-view="groups">Grupos</button><button class="nav-btn" data-view="bracket">Llaves</button><button class="nav-btn" data-view="ranking">Ranking</button><button class="nav-btn" data-view="stats">Stats</button>';
  mobileNav.innerHTML=mobileButtons;
  document.body.appendChild(mobileNav);
  setupNav(mobileNav);

  if(loadSession()){
    initState();
    loadLocal();
    // Load official in background
    loadOfficial().then(()=>{
      buildBracketFromGroups();
      renderAll();
    });
    buildBracketFromGroups();
    showApp();
    // Sync cloud in background
    if(!IS_ADMIN){
      loadUserState().then(ok=>{if(ok){buildBracketFromGroups();renderAll();}});
    }
  }
}

init();
