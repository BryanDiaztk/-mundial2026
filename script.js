/* ══════════════════════════════════════════════════
   PRODE MUNDIAL 2026 — JAVASCRIPT
   Módulos: datos, estado, grupos, bracket, stats,
            exportar, UI, persistencia
══════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════
   1. DATOS DEL TORNEO
══════════════════════════════════ */
const TEAMS = {
  ARG: { name: 'Argentina',      short: 'ARG', flag: 'ar' },
  BRA: { name: 'Brasil',         short: 'BRA', flag: 'br' },
  URU: { name: 'Uruguay',        short: 'URU', flag: 'uy' },
  COL: { name: 'Colombia',       short: 'COL', flag: 'co' },
  ECU: { name: 'Ecuador',        short: 'ECU', flag: 'ec' },
  CHI: { name: 'Chile',          short: 'CHI', flag: 'cl' },
  PER: { name: 'Perú',           short: 'PER', flag: 'pe' },
  PAR: { name: 'Paraguay',       short: 'PAR', flag: 'py' },
  VEN: { name: 'Venezuela',      short: 'VEN', flag: 've' },
  BOL: { name: 'Bolivia',        short: 'BOL', flag: 'bo' },
  MEX: { name: 'México',         short: 'MEX', flag: 'mx' },
  USA: { name: 'Estados Unidos', short: 'USA', flag: 'us' },
  CAN: { name: 'Canadá',         short: 'CAN', flag: 'ca' },
  CRC: { name: 'Costa Rica',     short: 'CRC', flag: 'cr' },
  PAN: { name: 'Panamá',         short: 'PAN', flag: 'pa' },
  HON: { name: 'Honduras',       short: 'HON', flag: 'hn' },
  ESP: { name: 'España',         short: 'ESP', flag: 'es' },
  FRA: { name: 'Francia',        short: 'FRA', flag: 'fr' },
  ENG: { name: 'Inglaterra',     short: 'ENG', flag: 'gb-eng' },
  GER: { name: 'Alemania',       short: 'GER', flag: 'de' },
  POR: { name: 'Portugal',       short: 'POR', flag: 'pt' },
  NED: { name: 'Países Bajos',   short: 'NED', flag: 'nl' },
  BEL: { name: 'Bélgica',        short: 'BEL', flag: 'be' },
  ITA: { name: 'Italia',         short: 'ITA', flag: 'it' },
  CRO: { name: 'Croacia',        short: 'CRO', flag: 'hr' },
  SUI: { name: 'Suiza',          short: 'SUI', flag: 'ch' },
  AUT: { name: 'Austria',        short: 'AUT', flag: 'at' },
  SRB: { name: 'Serbia',         short: 'SRB', flag: 'rs' },
  DEN: { name: 'Dinamarca',      short: 'DEN', flag: 'dk' },
  POL: { name: 'Polonia',        short: 'POL', flag: 'pl' },
  UKR: { name: 'Ucrania',        short: 'UKR', flag: 'ua' },
  TUR: { name: 'Turquía',        short: 'TUR', flag: 'tr' },
  NOR: { name: 'Noruega',        short: 'NOR', flag: 'no' },
  SWE: { name: 'Suecia',         short: 'SWE', flag: 'se' },
  HUN: { name: 'Hungría',        short: 'HUN', flag: 'hu' },
  ROM: { name: 'Rumania',        short: 'ROM', flag: 'ro' },
  GRE: { name: 'Grecia',         short: 'GRE', flag: 'gr' },
  SVN: { name: 'Eslovenia',      short: 'SVN', flag: 'si' },
  JPN: { name: 'Japón',          short: 'JPN', flag: 'jp' },
  KOR: { name: 'Corea del Sur',  short: 'KOR', flag: 'kr' },
  AUS: { name: 'Australia',      short: 'AUS', flag: 'au' },
  IRN: { name: 'Irán',           short: 'IRN', flag: 'ir' },
  SAU: { name: 'Arabia Saudita', short: 'SAU', flag: 'sa' },
  NZL: { name: 'Nueva Zelanda',  short: 'NZL', flag: 'nz' },
  MAR: { name: 'Marruecos',      short: 'MAR', flag: 'ma' },
  SEN: { name: 'Senegal',        short: 'SEN', flag: 'sn' },
  NGA: { name: 'Nigeria',        short: 'NGA', flag: 'ng' },
  CMR: { name: 'Camerún',        short: 'CMR', flag: 'cm' },
  GHA: { name: 'Ghana',          short: 'GHA', flag: 'gh' },
  ZAF: { name: 'Sudáfrica',      short: 'ZAF', flag: 'za' },
  EGY: { name: 'Egipto',         short: 'EGY', flag: 'eg' },
  DRC: { name: 'R.D. del Congo', short: 'DRC', flag: 'cd' },
};

function flagUrl(code) {
  return `https://flagcdn.com/w40/${code}.png`;
}

const GROUPS_DEF = [
  { id: 'A', teams: ['ARG', 'CAN', 'PER', 'ZAF'] },
  { id: 'B', teams: ['BRA', 'MEX', 'GRE', 'SVN'] },
  { id: 'C', teams: ['URU', 'USA', 'CRO', 'CMR'] },
  { id: 'D', teams: ['COL', 'ENG', 'ITA', 'EGY'] },
  { id: 'E', teams: ['ECU', 'GER', 'SRB', 'NGA'] },
  { id: 'F', teams: ['CHI', 'ESP', 'SUI', 'DRC'] },
  { id: 'G', teams: ['MEX', 'FRA', 'AUT', 'IRN'] },
  { id: 'H', teams: ['POR', 'HON', 'DEN', 'NZL'] },
  { id: 'I', teams: ['NED', 'PAR', 'TUR', 'SAU'] },
  { id: 'J', teams: ['BEL', 'VEN', 'UKR', 'GHA'] },
  { id: 'K', teams: ['CRC', 'NOR', 'KOR', 'ROM'] },
  { id: 'L', teams: ['PAN', 'POL', 'JPN', 'SEN'] },
];

const MATCH_PAIRS = {
  A: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  B: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  C: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  D: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  E: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  F: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  G: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  H: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  I: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  J: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  K: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
  L: [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],
};

/* ══════════════════════════════════
   2. ESTADO GLOBAL
══════════════════════════════════ */
const STATE = {
  groups: {},       // groupId -> { matches: [{h,a,sh,sa}] }
  bracket: {
    r32: [],        // 16 matches
    r16: [],        // 8 matches
    qf:  [],        // 4 matches
    sf:  [],        // 2 matches
    thirdPlace: [], // 1 match
    final: [],      // 1 match
  },
  champion: null,
  runnerUp: null,
  third: null,
};

function initState() {
  GROUPS_DEF.forEach(g => {
    STATE.groups[g.id] = {
      matches: MATCH_PAIRS[g.id].map(([i, j]) => ({
        home: g.teams[i],
        away: g.teams[j],
        scoreHome: '',
        scoreAway: '',
      }))
    };
  });

  const rounds = ['r32','r16','qf','sf','thirdPlace','final'];
  const counts  = [16, 8, 4, 2, 1, 1];
  rounds.forEach((r, i) => {
    STATE.bracket[r] = Array.from({ length: counts[i] }, () => ({
      home: null, away: null,
      scoreHome: '', scoreAway: '',
      winner: null,
    }));
  });
}

/* ══════════════════════════════════
   3. PERSISTENCIA (localStorage)
══════════════════════════════════ */
const LS_KEY = 'prode2026_v2';

function saveState() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(STATE)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    Object.assign(STATE.groups, saved.groups || {});
    Object.assign(STATE.bracket, saved.bracket || {});
    STATE.champion  = saved.champion  || null;
    STATE.runnerUp  = saved.runnerUp  || null;
    STATE.third     = saved.third     || null;
    return true;
  } catch(e) { return false; }
}

/* ══════════════════════════════════
   4. CÁLCULO DE TABLA DE POSICIONES
══════════════════════════════════ */
function calcStandings(groupId) {
  const g = GROUPS_DEF.find(x => x.id === groupId);
  const matches = STATE.groups[groupId].matches;

  const table = {};
  g.teams.forEach(t => {
    table[t] = { team: t, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 };
  });

  matches.forEach(m => {
    const sh = parseInt(m.scoreHome);
    const sa = parseInt(m.scoreAway);
    if (isNaN(sh) || isNaN(sa)) return;
    const h = table[m.home];
    const a = table[m.away];
    h.pj++; h.gf += sh; h.gc += sa; h.dg += sh - sa;
    a.pj++; a.gf += sa; a.gc += sh; a.dg += sa - sh;
    if (sh > sa)      { h.pg++; h.pts += 3; a.pp++; }
    else if (sh < sa) { a.pg++; a.pts += 3; h.pp++; }
    else              { h.pe++; h.pts++; a.pe++; a.pts++; }
  });

  return Object.values(table).sort((a, b) =>
    b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.team.localeCompare(b.team)
  );
}

function getQualified() {
  const qualified = {};
  GROUPS_DEF.forEach(g => {
    const st = calcStandings(g.id);
    qualified[g.id] = { first: st[0].team, second: st[1].team };
  });
  return qualified;
}

/* ══════════════════════════════════
   5. BRACKET — GENERACIÓN DE CRUCES R32
   Formato FIFA 2026: 12 grupos, 48 equipos,
   los 8 mejores terceros también clasifican.
   Simplificado para el prode: tomamos 1°/2° de cada grupo + 4 terceros.
══════════════════════════════════ */
function buildR32FromGroups() {
  const q = getQualified();
  // Estructura de cruces simplificada (estilo FIFA 2026 aprox)
  const pairings = [
    ['A', '1', 'B', '2'],
    ['C', '1', 'D', '2'],
    ['E', '1', 'F', '2'],
    ['G', '1', 'H', '2'],
    ['I', '1', 'J', '2'],
    ['K', '1', 'L', '2'],
    ['B', '1', 'A', '2'],
    ['D', '1', 'C', '2'],
    ['F', '1', 'E', '2'],
    ['H', '1', 'G', '2'],
    ['J', '1', 'I', '2'],
    ['L', '1', 'K', '2'],
    ['A', '1', 'C', '2'],
    ['B', '1', 'D', '2'],
    ['E', '1', 'G', '2'],
    ['F', '1', 'H', '2'],
  ];

  pairings.forEach((p, i) => {
    const [gH, posH, gA, posA] = p;
    const home = posH === '1' ? q[gH].first : q[gH].second;
    const away = posA === '1' ? q[gA].first : q[gA].second;
    STATE.bracket.r32[i].home = home;
    STATE.bracket.r32[i].away = away;
    if (STATE.bracket.r32[i].winner &&
        STATE.bracket.r32[i].winner !== home &&
        STATE.bracket.r32[i].winner !== away) {
      STATE.bracket.r32[i].winner = null;
      STATE.bracket.r32[i].scoreHome = '';
      STATE.bracket.r32[i].scoreAway = '';
    }
  });

  propagateBracket('r32');
  saveState();
}

function propagateBracket(fromRound) {
  const order = ['r32','r16','qf','sf'];
  const nextMap = { r32: 'r16', r16: 'qf', qf: 'sf', sf: 'final' };
  const idx = order.indexOf(fromRound);

  const rounds = idx >= 0 ? order.slice(idx) : [];
  rounds.forEach(round => {
    const next = nextMap[round];
    if (!next) return;
    const src = STATE.bracket[round];
    const dst = STATE.bracket[next];
    for (let i = 0; i < src.length; i += 2) {
      const matchIdx = i / 2;
      if (matchIdx >= dst.length) break;
      const w1 = src[i].winner;
      const w2 = src[i+1] ? src[i+1].winner : null;
      const prev1 = dst[matchIdx].home;
      const prev2 = dst[matchIdx].away;
      dst[matchIdx].home = w1 || null;
      dst[matchIdx].away = w2 || null;
      if ((prev1 !== dst[matchIdx].home || prev2 !== dst[matchIdx].away)) {
        if (dst[matchIdx].winner && dst[matchIdx].winner !== dst[matchIdx].home && dst[matchIdx].winner !== dst[matchIdx].away) {
          dst[matchIdx].winner = null;
          dst[matchIdx].scoreHome = '';
          dst[matchIdx].scoreAway = '';
        }
      }
    }
  });

  // 3rd place: losers of semifinals
  const sf = STATE.bracket.sf;
  const loser1 = sf[0].winner ? (sf[0].winner === sf[0].home ? sf[0].away : sf[0].home) : null;
  const loser2 = sf[1] && sf[1].winner ? (sf[1].winner === sf[1].home ? sf[1].away : sf[1].home) : null;
  STATE.bracket.thirdPlace[0].home = loser1;
  STATE.bracket.thirdPlace[0].away = loser2;

  // Champion
  const fin = STATE.bracket.final[0];
  STATE.champion = fin.winner || null;
  STATE.runnerUp = fin.winner ? (fin.winner === fin.home ? fin.away : fin.home) : null;
  STATE.third     = STATE.bracket.thirdPlace[0].winner || null;
}

/* ══════════════════════════════════
   6. RENDER — GRUPOS
══════════════════════════════════ */
function renderGroups() {
  const container = document.getElementById('groupsContainer');
  container.innerHTML = '';

  GROUPS_DEF.forEach(g => {
    const standings = calcStandings(g.id);
    const card = document.createElement('div');
    card.className = 'group-card';
    card.innerHTML = `
      <div class="group-header">
        <span class="group-name">GRUPO ${g.id}</span>
        <span class="group-badge">${g.teams.map(t => TEAMS[t].short).join(' · ')}</span>
      </div>
      <table class="group-table">
        <thead>
          <tr>
            <th>Selección</th>
            <th title="Partidos jugados">PJ</th>
            <th title="Ganados">PG</th>
            <th title="Empatados">PE</th>
            <th title="Perdidos">PP</th>
            <th title="Goles a favor">GF</th>
            <th title="Goles en contra">GC</th>
            <th title="Diferencia de goles">DG</th>
            <th title="Puntos">PTS</th>
          </tr>
        </thead>
        <tbody id="tbody-${g.id}"></tbody>
      </table>
      <div class="group-matches">
        <div class="matches-label">Partidos</div>
        <div id="matches-${g.id}"></div>
      </div>
    `;
    container.appendChild(card);

    renderGroupTable(g.id, standings);
    renderGroupMatches(g.id);
  });
}

function renderGroupTable(groupId, standings) {
  const tbody = document.getElementById(`tbody-${groupId}`);
  if (!tbody) return;
  tbody.innerHTML = '';
  standings.forEach((row, i) => {
    const t = TEAMS[row.team];
    const tr = document.createElement('tr');
    tr.className = i === 0 ? 'team-row-q1' : (i === 1 ? 'team-row-q2' : '');
    const dgStr = row.dg > 0 ? `+${row.dg}` : String(row.dg);
    tr.innerHTML = `
      <td>
        <div class="team-cell">
          <img class="team-flag" src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy" />
          <span class="team-name-short">${t.name}</span>
        </div>
      </td>
      <td>${row.pj}</td>
      <td>${row.pg}</td>
      <td>${row.pe}</td>
      <td>${row.pp}</td>
      <td>${row.gf}</td>
      <td>${row.gc}</td>
      <td>${dgStr}</td>
      <td class="pts-cell">${row.pts}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderGroupMatches(groupId) {
  const container = document.getElementById(`matches-${groupId}`);
  if (!container) return;
  container.innerHTML = '';
  const matches = STATE.groups[groupId].matches;

  matches.forEach((m, mi) => {
    const th = TEAMS[m.home];
    const ta = TEAMS[m.away];
    const row = document.createElement('div');
    row.className = 'match-row';
    row.innerHTML = `
      <div class="match-team home">
        <img src="${flagUrl(th.flag)}" alt="${th.name}" loading="lazy" />
        <span>${th.name}</span>
      </div>
      <div class="match-score">
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreHome}"
          data-group="${groupId}" data-match="${mi}" data-side="home"
          placeholder="–" />
        <span class="score-sep">:</span>
        <input class="score-input" type="number" min="0" max="99"
          value="${m.scoreAway}"
          data-group="${groupId}" data-match="${mi}" data-side="away"
          placeholder="–" />
      </div>
      <div class="match-team away">
        <img src="${flagUrl(ta.flag)}" alt="${ta.name}" loading="lazy" />
        <span>${ta.name}</span>
      </div>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll('.score-input').forEach(inp => {
    inp.addEventListener('input', onScoreInput);
  });
}

function onScoreInput(e) {
  const { group, match, side } = e.target.dataset;
  const val = e.target.value;
  STATE.groups[group].matches[parseInt(match)][side === 'home' ? 'scoreHome' : 'scoreAway'] = val;
  const standings = calcStandings(group);
  renderGroupTable(group, standings);
  buildR32FromGroups();
  renderBracket();
  renderStats();
  saveState();
}

/* ══════════════════════════════════
   7. RENDER — BRACKET
══════════════════════════════════ */
function renderBracket() {
  const wrapper = document.getElementById('bracketWrapper');
  wrapper.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'bracket-layout';

  const rounds = [
    { key: 'r32',        label: 'Dieciseisavos' },
    { key: 'r16',        label: 'Octavos' },
    { key: 'qf',         label: 'Cuartos' },
    { key: 'sf',         label: 'Semifinales' },
    { key: 'final',      label: 'FINAL', cls: 'final' },
  ];

  rounds.forEach(r => {
    const col = document.createElement('div');
    col.className = `bracket-round${r.cls ? ' '+r.cls : ''}`;

    const lbl = document.createElement('div');
    lbl.className = 'bracket-round-label';
    lbl.textContent = r.label;
    col.appendChild(lbl);

    const matchesWrap = document.createElement('div');
    matchesWrap.className = 'bracket-matches';

    STATE.bracket[r.key].forEach((m, mi) => {
      matchesWrap.appendChild(buildBracketMatch(r.key, mi, m));
    });

    col.appendChild(matchesWrap);
    layout.appendChild(col);
  });

  // Champion display
  const champ = document.createElement('div');
  champ.className = 'bracket-round';
  champ.style.minWidth = '140px';
  const champLabel = document.createElement('div');
  champLabel.className = 'bracket-round-label';
  champLabel.style.color = 'var(--accent-gold)';
  champLabel.textContent = 'CAMPEÓN';
  champ.appendChild(champLabel);
  const champDisplay = document.createElement('div');
  champDisplay.className = 'champion-display';
  champDisplay.innerHTML = STATE.champion ? `
    <div class="champion-cup">🏆</div>
    <img class="champion-display-flag" src="${flagUrl(TEAMS[STATE.champion].flag)}" alt="${TEAMS[STATE.champion].name}" />
    <div class="champion-display-name">${TEAMS[STATE.champion].name}</div>
  ` : `<div class="champion-cup" style="opacity:0.3">🏆</div>`;
  champ.appendChild(champDisplay);
  layout.appendChild(champ);

  wrapper.appendChild(layout);

  // 3rd place below
  const thirdWrap = document.createElement('div');
  thirdWrap.style.cssText = 'margin-top: 32px; max-width: 320px;';
  const tl = document.createElement('div');
  tl.className = 'third-place-label';
  tl.textContent = '🥉 Tercer Puesto';
  thirdWrap.appendChild(tl);
  const tm = STATE.bracket.thirdPlace[0];
  thirdWrap.appendChild(buildBracketMatch('thirdPlace', 0, tm));
  wrapper.appendChild(thirdWrap);
}

function buildBracketMatch(round, idx, m) {
  const div = document.createElement('div');
  div.className = 'bracket-match';

  [['home', m.home, m.scoreHome], ['away', m.away, m.scoreAway]].forEach(([side, teamCode, score]) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'bracket-team';
    if (!teamCode) {
      teamDiv.classList.add('empty');
      teamDiv.innerHTML = `<span class="bracket-team-name" style="color:var(--text-3)">Por definir</span>`;
    } else {
      const t = TEAMS[teamCode];
      const isWinner = m.winner === teamCode;
      const isLoser  = m.winner && m.winner !== teamCode;
      if (isWinner) teamDiv.classList.add('winner');
      if (isLoser)  teamDiv.classList.add('loser');
      teamDiv.innerHTML = `
        <img src="${flagUrl(t.flag)}" alt="${t.name}" loading="lazy" />
        <span class="bracket-team-name">${t.name}</span>
        <span class="bracket-score">${score !== '' ? score : ''}</span>
      `;
      teamDiv.addEventListener('click', () => onBracketClick(round, idx, side, teamCode));
    }
    div.appendChild(teamDiv);
  });

  return div;
}

function onBracketClick(round, idx, side, teamCode) {
  const match = STATE.bracket[round][idx];
  if (!match.home || !match.away) return;
  match.winner = teamCode;

  const otherCode = side === 'home' ? match.away : match.home;
  if (!match[side === 'home' ? 'scoreHome' : 'scoreAway']) {
    match.scoreHome = side === 'home' ? '1' : '0';
    match.scoreAway = side === 'home' ? '0' : '1';
  }

  propagateBracket(round);
  saveState();
  renderBracket();
  renderStats();

  if (STATE.champion) {
    setTimeout(() => showChampionModal(), 400);
  }
}

/* ══════════════════════════════════
   8. RENDER — ESTADÍSTICAS
══════════════════════════════════ */
function calcTotalGoals() {
  let total = 0;
  GROUPS_DEF.forEach(g => {
    STATE.groups[g.id].matches.forEach(m => {
      const sh = parseInt(m.scoreHome);
      const sa = parseInt(m.scoreAway);
      if (!isNaN(sh)) total += sh;
      if (!isNaN(sa)) total += sa;
    });
  });
  // Bracket rounds
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(r => {
    STATE.bracket[r].forEach(m => {
      const sh = parseInt(m.scoreHome);
      const sa = parseInt(m.scoreAway);
      if (!isNaN(sh)) total += sh;
      if (!isNaN(sa)) total += sa;
    });
  });
  return total;
}

function calcMatchesPlayed() {
  let played = 0;
  GROUPS_DEF.forEach(g => {
    STATE.groups[g.id].matches.forEach(m => {
      if (m.scoreHome !== '' && m.scoreAway !== '') played++;
    });
  });
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(r => {
    STATE.bracket[r].forEach(m => {
      if (m.winner) played++;
    });
  });
  return played;
}

function calcTopTeams() {
  const goals = {};
  GROUPS_DEF.forEach(g => {
    g.teams.forEach(t => { goals[t] = 0; });
    STATE.groups[g.id].matches.forEach(m => {
      const sh = parseInt(m.scoreHome);
      const sa = parseInt(m.scoreAway);
      if (!isNaN(sh)) goals[m.home] = (goals[m.home] || 0) + sh;
      if (!isNaN(sa)) goals[m.away] = (goals[m.away] || 0) + sa;
    });
  });
  return Object.entries(goals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';

  const totalGoals   = calcTotalGoals();
  const matchPlayed  = calcMatchesPlayed();
  const avgGoals     = matchPlayed > 0 ? (totalGoals / matchPlayed).toFixed(1) : '–';
  const topTeams     = calcTopTeams();
  const totalMatches = 104; // 48 group + 16 r32 + 8 r16 + 4 qf + 2 sf + 1 3rd + 1 final

  const cards = [
    { icon: '⚽', label: 'Goles totales', value: totalGoals, sub: `En ${matchPlayed} partidos jugados` },
    { icon: '📊', label: 'Promedio de goles', value: avgGoals, sub: 'Goles por partido' },
    { icon: '🏟️', label: 'Partidos jugados', value: matchPlayed, sub: `de ${totalMatches} totales` },
    { icon: '🏆', label: 'Campeón', value: STATE.champion ? TEAMS[STATE.champion].short : '–', sub: STATE.champion ? TEAMS[STATE.champion].name : 'Aún no definido' },
  ];

  cards.forEach(c => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="stat-icon">${c.icon}</div>
      <div class="stat-label">${c.label}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-sub">${c.sub}</div>
    `;
    grid.appendChild(card);
  });

  // Top goleadores por equipo
  const topCard = document.createElement('div');
  topCard.className = 'stat-card stat-card-wide';
  topCard.innerHTML = `
    <div class="stat-icon">🥇</div>
    <div class="stat-label">Equipos más goleadores</div>
    <div class="top-scorers-list" id="topScorersList"></div>
  `;
  grid.appendChild(topCard);

  const list = topCard.querySelector('#topScorersList');
  topTeams.forEach(([teamCode, g], i) => {
    const t = TEAMS[teamCode];
    if (!t) return;
    const row = document.createElement('div');
    row.className = 'top-scorer-row';
    row.innerHTML = `
      <span class="scorer-rank">${i+1}</span>
      <img class="scorer-flag" src="${flagUrl(t.flag)}" alt="${t.name}" />
      <span class="scorer-name">${t.name}</span>
      <span class="scorer-goals">${g}</span>
    `;
    list.appendChild(row);
  });

  // Progress card
  const progCard = document.createElement('div');
  progCard.className = 'stat-card';
  const pct = Math.round((matchPlayed / totalMatches) * 100);
  progCard.innerHTML = `
    <div class="stat-icon">📈</div>
    <div class="stat-label">Progreso del torneo</div>
    <div class="stat-value">${pct}%</div>
    <div class="progress-bar-wrap">
      <div class="progress-item">
        <div class="progress-label"><span>Completado</span><span>${matchPlayed}/${totalMatches}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    </div>
  `;
  grid.appendChild(progCard);
}

/* ══════════════════════════════════
   9. MODAL CAMPEÓN
══════════════════════════════════ */
function showChampionModal() {
  if (!STATE.champion) return;
  const modal = document.getElementById('championModal');
  const champ = TEAMS[STATE.champion];
  const runner = STATE.runnerUp ? TEAMS[STATE.runnerUp] : null;
  const third  = STATE.third    ? TEAMS[STATE.third]    : null;

  document.getElementById('championFlag').src = flagUrl(champ.flag);
  document.getElementById('championFlag').alt = champ.name;
  document.getElementById('championName').textContent = champ.name;

  if (runner) {
    document.getElementById('runnerUpFlag').src = flagUrl(runner.flag);
    document.getElementById('runnerUpName').textContent = runner.name;
  }
  if (third) {
    document.getElementById('thirdFlag').src = flagUrl(third.flag);
    document.getElementById('thirdName').textContent = third.name;
  }

  modal.classList.add('open');
  launchConfetti();
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#00d4aa','#f5c842','#ff6b35','#ffffff','#4ade80','#60a5fa'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      animation-duration: ${2 + Math.random() * 3}s;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    container.appendChild(piece);
  }
}

document.getElementById('closeChampion').addEventListener('click', () => {
  document.getElementById('championModal').classList.remove('open');
});

/* ══════════════════════════════════
   10. SIMULACIÓN AUTOMÁTICA
══════════════════════════════════ */
function randomScore() {
  const goals = [0,0,0,1,1,1,1,2,2,3,4];
  return goals[Math.floor(Math.random() * goals.length)];
}

function autoSimGroups() {
  GROUPS_DEF.forEach(g => {
    STATE.groups[g.id].matches.forEach(m => {
      m.scoreHome = String(randomScore());
      m.scoreAway = String(randomScore());
    });
  });
}

function autoSimBracket() {
  ['r32','r16','qf','sf','thirdPlace','final'].forEach(round => {
    STATE.bracket[round].forEach(m => {
      if (!m.home || !m.away) return;
      let sh = randomScore(), sa = randomScore();
      while (sh === sa) sa = randomScore();
      m.scoreHome = String(sh);
      m.scoreAway = String(sa);
      m.winner = sh > sa ? m.home : m.away;
    });
    propagateBracket(round);
  });
}

let simInterval = null;
document.getElementById('btnAutoSim').addEventListener('click', () => {
  const btn = document.getElementById('btnAutoSim');
  btn.classList.add('simulating');
  showToast('⚡ Simulando torneo completo...');

  setTimeout(() => {
    autoSimGroups();
    buildR32FromGroups();
    autoSimBracket();
    saveState();
    renderAll();
    btn.classList.remove('simulating');
    showToast('✅ Simulación completada');
    if (STATE.champion) setTimeout(() => showChampionModal(), 800);
  }, 600);
});

/* ══════════════════════════════════
   11. EXPORTAR
══════════════════════════════════ */
document.getElementById('btnExport').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('exportDropdown').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('exportDropdown').classList.remove('open');
});
document.getElementById('exportDropdown').addEventListener('click', e => e.stopPropagation());

document.getElementById('exportJSON').addEventListener('click', () => {
  const data = JSON.stringify(STATE, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'prode_mundial_2026.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('📦 JSON descargado');
});

document.getElementById('exportPNG').addEventListener('click', async () => {
  showToast('📸 Generando imagen...');
  try {
    const target = document.querySelector('.view.active');
    const canvas = await html2canvas(target, { backgroundColor: '#0a0c10', scale: 2, useCORS: true });
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'prode_mundial_2026.png';
    a.click();
    showToast('✅ Imagen descargada');
  } catch(e) {
    showToast('❌ Error al generar imagen');
  }
});

document.getElementById('exportPDF').addEventListener('click', async () => {
  showToast('📄 Generando PDF...');
  try {
    const { jsPDF } = window.jspdf;
    const target = document.querySelector('.view.active');
    const canvas = await html2canvas(target, { backgroundColor: '#0a0c10', scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: canvas.width > canvas.height ? 'l' : 'p', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('prode_mundial_2026.pdf');
    showToast('✅ PDF descargado');
  } catch(e) {
    showToast('❌ Error al generar PDF');
  }
});

document.getElementById('exportShare').addEventListener('click', () => {
  const data = btoa(unescape(encodeURIComponent(JSON.stringify(STATE))));
  const url = `${location.href.split('?')[0]}?prode=${data.slice(0, 2000)}`;
  navigator.clipboard.writeText(url).then(() => showToast('🔗 Link copiado al portapapeles')).catch(() => showToast('❌ No se pudo copiar'));
});

document.getElementById('btnReset').addEventListener('click', () => {
  if (!confirm('¿Reiniciar toda la simulación? Se perderán todos los resultados.')) return;
  localStorage.removeItem(LS_KEY);
  initState();
  renderAll();
  showToast('🗑️ Simulación reiniciada');
});

/* ══════════════════════════════════
   12. NAVEGACIÓN
══════════════════════════════════ */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const view = btn.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${view}`).classList.add('active');
    if (view === 'stats') renderStats();
    if (view === 'bracket') renderBracket();
  });
});

/* ══════════════════════════════════
   13. TEMA
══════════════════════════════════ */
document.getElementById('toggleTheme').addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('toggleTheme').textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('prode2026_theme', isDark ? 'light' : 'dark');
});

/* ══════════════════════════════════
   14. TOAST
══════════════════════════════════ */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════════
   15. RENDER ALL + INIT
══════════════════════════════════ */
function renderAll() {
  renderGroups();
  renderBracket();
  renderStats();
}

function init() {
  initState();

  const savedTheme = localStorage.getItem('prode2026_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('toggleTheme').textContent = savedTheme === 'light' ? '☀️' : '🌙';
  }

  const loaded = loadState();
  if (loaded) {
    buildR32FromGroups();
  }

  renderAll();

  // Mobile nav
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.innerHTML = `
    <button class="nav-btn active" data-view="groups">Grupos</button>
    <button class="nav-btn" data-view="bracket">Llaves</button>
    <button class="nav-btn" data-view="stats">Stats</button>
  `;
  document.body.appendChild(mobileNav);
  mobileNav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.header-nav .nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.dataset.view;
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById(`view-${view}`).classList.add('active');
      const mainBtn = document.querySelector(`.header-nav [data-view="${view}"]`);
      if (mainBtn) mainBtn.classList.add('active');
      if (view === 'stats') renderStats();
      if (view === 'bracket') renderBracket();
    });
  });

  // Show champion if already defined
  if (STATE.champion) {
    setTimeout(() => {
      if (document.querySelector('.view.active')?.id === 'view-bracket') {
        // don't auto-show on load
      }
    }, 500);
  }
}

init();
