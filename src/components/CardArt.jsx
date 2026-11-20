// Original line artwork for the project cards. Everything is drawn in currentColor
// so each piece takes the tier's --ink; depth comes from opacity, never from a second colour.

const FRAME = {
  className: 'card-art',
  viewBox: '0 0 116 108',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

const SOLID = { fill: 'currentColor', stroke: 'none' };

// Animal detector: a generic track inside a detection box, mid-scan.
function Paw() {
  const toes = [[40, 45, -22], [51, 35, -7], [65, 35, 7], [76, 45, 22]];
  return (
    <svg {...FRAME}>
      <rect x="22" y="48" width="74" height="14" {...SOLID} opacity="0.16" />
      <rect x="22" y="16" width="74" height="74" strokeWidth="1" strokeDasharray="2 4" opacity="0.45" />
      <path d="M22 28V16H34M84 16H96V28M96 78V90H84M34 90H22V78" strokeWidth="2.6" />
      <path d="M59 11v6M59 89v6M11 53h6M101 53h6" strokeWidth="1.4" opacity="0.6" />
      <rect x="22" y="4" width="28" height="7" rx="1" {...SOLID} />
      <path d="M55 7.5H72" strokeWidth="3" opacity="0.5" />
      <g {...SOLID}>
        {toes.map(([cx, cy, turn]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx="5.6" ry="7.6" transform={`rotate(${turn} ${cx} ${cy})`} />
        ))}
        <path d="M58 51C48 51 40 61 40 69C40 77 47 79 52 77C56 75.5 60 75.5 64 77C69 79 76 77 76 69C76 61 68 51 58 51Z" />
      </g>
      <path d="M10 62H108" strokeWidth="1.6" />
    </svg>
  );
}

function star(cx, cy, r) {
  return Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 ? r * 0.45 : r;
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

// Boutique hotel: a small three-storey facade with a rooftop sign and an awning.
function Hotel() {
  const windows = [
    [36, 38, 0.6], [53, 38, 0.18], [70, 38, 0.6],
    [36, 56, 0.18], [53, 56, 0.6], [70, 56, 0.18],
  ];
  return (
    <svg {...FRAME}>
      {[46, 58, 70].map((cx) => (
        <polygon key={cx} points={star(cx, cx === 58 ? 5 : 7, 3.4)} {...SOLID} />
      ))}
      <rect x="43" y="13" width="30" height="9" rx="1" fill="currentColor" fillOpacity="0.2" strokeWidth="1.6" />
      <path d="M49 17.5H67" strokeWidth="2.4" />
      <path d="M48 22V26M68 22V26" strokeWidth="1.6" />
      <rect x="26" y="26" width="64" height="6" fill="currentColor" fillOpacity="0.4" />
      <rect x="30" y="32" width="56" height="66" fill="currentColor" fillOpacity="0.12" />
      <path d="M30 51H86M30 71H86" strokeWidth="1" opacity="0.45" />
      {windows.map(([x, y, lit]) => (
        <g key={`${x}-${y}`} strokeWidth="1.5">
          <path d={`M${x} ${y + 11}V${y + 5}a5 5 0 0 1 10 0V${y + 11}Z`} fill="currentColor" fillOpacity={lit} />
          <path d={`M${x - 1.5} ${y + 13}h13`} />
        </g>
      ))}
      <rect x="35" y="80" width="10" height="12" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
      <rect x="71" y="80" width="10" height="12" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
      <rect x="51" y="81" width="14" height="17" fill="currentColor" fillOpacity="0.25" strokeWidth="1.5" />
      <path d="M58 81V98" strokeWidth="1.2" />
      <path d="M47 73H69L73 80H43Z" fill="currentColor" fillOpacity="0.75" />
      {[22, 94].map((cx) => (
        <g key={cx} strokeWidth="1.5">
          <circle cx={cx} cy="85" r="5" fill="currentColor" fillOpacity="0.5" />
          <path d={`M${cx - 3} 92h6l-1 6h-4Z`} fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
      <path d="M8 98H108" />
      <path d="M22 103H94" strokeWidth="1.2" opacity="0.45" />
    </svg>
  );
}

function Pin({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} strokeWidth="1.6">
      <path d="M0 0C-5-7-7-10-7-14a7 7 0 0 1 14 0C7-10 5-7 0 0Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="0" cy="-14" r="2.4" {...SOLID} />
    </g>
  );
}

// Water access: a hand pump over its borehole, with mapped water points behind.
function Water() {
  return (
    <svg {...FRAME}>
      <path d="M66 60Q80 72 90 62M90 62Q101 58 104 44M16 56Q26 70 44 66" strokeWidth="1.6" strokeDasharray="0.01 5" opacity="0.6" />
      <Pin x={90} y={62} />
      <Pin x={104} y={44} scale={0.7} />
      <Pin x={16} y={56} scale={0.8} />
      <path d="M53 34L94 17" strokeWidth="3" />
      <path d="M89 19.1L98 15.3" strokeWidth="5.5" />
      <rect x="51" y="40" width="12" height="40" rx="2" fill="currentColor" fillOpacity="0.2" />
      <rect x="48" y="30" width="18" height="11" rx="3" fill="currentColor" fillOpacity="0.55" />
      <path d="M51 50H38q-5 0-5 5v2" strokeWidth="5" />
      <path d="M33 63c-4 6-5.5 8-5.5 11a5.5 5.5 0 0 0 11 0c0-3-1.5-5-5.5-11Z" {...SOLID} />
      <rect x="44" y="80" width="26" height="6" rx="1" fill="currentColor" fillOpacity="0.4" />
      <path d="M6 86H110" />
      <path d="M24 91h18" strokeWidth="1.4" opacity="0.6" />
      <path d="M54 86V106M60 86V106" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7" />
      <path d="M8 100q5-4 10 0t10 0t10 0t10 0M66 100q5-4 10 0t10 0t10 0t10 0" strokeWidth="1.4" opacity="0.55" />
    </svg>
  );
}

// Procedural dungeon: rooms and corridors seen from above, with a route through them.
function Dungeon() {
  const rooms = [
    [10, 12, 30, 22], [56, 8, 26, 18], [88, 34, 20, 26], [44, 42, 28, 24],
    [8, 58, 24, 30], [50, 82, 34, 18], [92, 76, 16, 20],
  ];
  const grid = Array.from({ length: 9 }, (_, i) => `M4 ${6 + i * 12}H112`).join('');
  return (
    <svg {...FRAME}>
      <path d={grid} strokeWidth="1.5" strokeDasharray="0.01 12" opacity="0.35" />
      <path
        d="M40 22H56M82 18H98V34M20 34V58M32 62H44M72 52H88M60 66V82M84 90H92"
        strokeWidth="6"
        strokeLinecap="butt"
        opacity="0.4"
      />
      {rooms.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="currentColor" fillOpacity="0.16" />
      ))}
      <path d="M25 23H48V22M69 17H98V47M88 52H58V91H100" strokeWidth="1.4" strokeDasharray="2 3.5" opacity="0.8" />
      <path d="M15 17h8M15 21h8M15 25h8" strokeWidth="1.4" />
      <circle cx="25" cy="23" r="2.6" {...SOLID} />
      <path d="M100 86l4 5-4 5-4-5Z" {...SOLID} />
      <path d="M17 70l6 6M23 70l-6 6" strokeWidth="1.6" />
      <circle cx="98" cy="47" r="3" strokeWidth="1.4" />
    </svg>
  );
}

function Table({ x, y, w, rows }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={14 + rows.length * 8} rx="2" fill="currentColor" fillOpacity="0.12" />
      <path d={`M${x} ${y + 10}V${y + 2}a2 2 0 0 1 2-2H${x + w - 2}a2 2 0 0 1 2 2V${y + 10}Z`} fill="currentColor" fillOpacity="0.8" />
      {rows.map((length, i) => (
        <g key={i} opacity={i === 0 ? 1 : 0.65}>
          <circle cx={x + 6} cy={y + 18 + i * 8} r="1.5" {...SOLID} />
          <path d={`M${x + 11} ${y + 18 + i * 8}h${length}`} strokeWidth={i === 0 ? 2.2 : 1.6} />
        </g>
      ))}
    </g>
  );
}

// Database design: three linked tables with crow's-foot relationships.
function Database() {
  return (
    <svg {...FRAME}>
      <g strokeWidth="1.6" opacity="0.8">
        <path d="M48 30H59V24H70M64 24l6-4M64 24l6 4M52 27v6" />
        <path d="M20 56V88H44M38 88l6-4M38 88l6 4M17 60h6" />
        <path d="M94 44V88H88M94 88l-6-4M94 88l-6 4M91 48h6" />
      </g>
      <Table x={6} y={10} w={42} rows={[24, 18, 26, 14]} />
      <Table x={70} y={6} w={40} rows={[22, 16, 20]} />
      <Table x={44} y={68} w={44} rows={[26, 18, 22]} />
    </svg>
  );
}

// Change detection: a satellite sweeping terrain tiles, one of them flagged.
function Satellite() {
  const tiles = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => [i, j]));
  return (
    <svg {...FRAME}>
      <path d="M4 46Q40-8 112 18" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.4" />
      <g {...SOLID} opacity="0.7">
        <circle cx="72" cy="30" r="1.2" />
        <circle cx="98" cy="36" r="1.6" />
        <circle cx="106" cy="56" r="1.2" />
        <circle cx="10" cy="62" r="1.4" />
        <circle cx="58" cy="6" r="1.2" />
      </g>
      {tiles.map(([i, j]) => {
        const cx = 64 + (i - j) * 16;
        const cy = 66 + (i + j) * 8;
        const flagged = i === 2 && j === 1;
        return (
          <path
            key={`${i}-${j}`}
            d={`M${cx} ${cy - 8}l16 8-16 8-16-8Z`}
            strokeWidth={flagged ? 2.2 : 1.4}
            fill="currentColor"
            fillOpacity={flagged ? 0.5 : [0.08, 0.2, 0.14][(i + 2 * j) % 3]}
          />
        );
      })}
      <path d="M39.5 42L64 90L80 98L96 90Z" {...SOLID} opacity="0.14" />
      <path d="M39.5 42L64 90M39.5 42L96 90" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M80 90V68" strokeWidth="1.8" />
      <path d="M80 68l11 3.5-11 3.5Z" {...SOLID} />
      <g transform="translate(32 28) rotate(-28)" strokeWidth="1.6">
        <rect x="-31" y="-5" width="20" height="10" fill="currentColor" fillOpacity="0.22" />
        <rect x="11" y="-5" width="20" height="10" fill="currentColor" fillOpacity="0.22" />
        <path d="M-24.3-5v10M-17.7-5v10M17.7-5v10M24.3-5v10" strokeWidth="1" />
        <path d="M-11 0h4M7 0h4M0 7v4" />
        <rect x="-7" y="-7" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.45" />
        <path d="M-6 11Q0 19 6 11Z" fill="currentColor" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

// AI radio: a lattice mast on air, with the programme's waveform either side.
function Radio() {
  const bars = [
    [8, 6], [14, 16], [20, 26], [26, 10], [32, 18],
    [84, 12], [90, 22], [96, 8], [102, 28], [108, 14],
  ];
  return (
    <svg {...FRAME}>
      {[10, 18, 26].map((r, i) => {
        const dx = (r * Math.SQRT1_2).toFixed(1);
        const span = (r * Math.SQRT2).toFixed(1);
        return (
          <g key={r} opacity={1 - i * 0.28}>
            <path d={`M58 26m${dx}-${dx}a${r} ${r} 0 0 1 0 ${span}`} />
            <path d={`M58 26m-${dx}-${dx}a${r} ${r} 0 0 0 0 ${span}`} />
          </g>
        );
      })}
      <path d="M58 50L36 98M58 50L80 98" strokeWidth="1" opacity="0.4" />
      <path
        d="M44 98L68.4 82L51.2 66L61.2 50L58 36M72 98L47.6 82L64.8 66L54.8 50L58 36M47.6 82H68.4M51.2 66H64.8M54.8 50H61.2"
        strokeWidth="1.3"
        opacity="0.75"
      />
      <path d="M44 98L58 36L72 98" strokeWidth="2.4" />
      <path d="M58 36V26" strokeWidth="2.4" />
      <circle cx="58" cy="26" r="3.2" {...SOLID} />
      <path d="M28 98H88" />
      <g strokeWidth="3" opacity="0.85">
        {bars.map(([x, h]) => (
          <path key={x} d={`M${x} ${72 - h / 2}v${h}`} />
        ))}
      </g>
    </svg>
  );
}

// Knowledge distillation: a wide teacher network feeding a small student.
function Distill() {
  const column = (x, ys) => ys.map((y) => [x, y]);
  const teacher = [
    column(10, [26, 44, 62, 80]),
    column(28, [17, 35, 53, 71, 89]),
    column(46, [26, 44, 62, 80]),
  ];
  const student = [column(86, [38, 53, 68]), column(104, [45.5, 60.5])];
  const links = (layers) =>
    layers.slice(1).flatMap((layer, i) =>
      layers[i].flatMap(([x1, y1]) => layer.map(([x2, y2]) => `M${x1} ${y1}L${x2} ${y2}`))
    ).join('');
  return (
    <svg {...FRAME}>
      <path d={links(teacher)} strokeWidth="0.8" opacity="0.4" />
      <path d={links(student)} strokeWidth="1.4" opacity="0.7" />
      <path d="M54 22L76 40M54 84L76 66" strokeWidth="1.2" strokeDasharray="2 3.5" opacity="0.5" />
      <path d="M56 53H72M67 48l5 5-5 5" strokeWidth="2.4" />
      {teacher.flat().map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3.4" {...SOLID} opacity="0.4" />
          <circle cx={x} cy={y} r="3.4" strokeWidth="1.3" />
        </g>
      ))}
      {student.flat().map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.8" {...SOLID} />
      ))}
      <path d="M10 101H46" strokeWidth="1.6" opacity="0.5" />
      <path d="M86 101H104" strokeWidth="2.4" />
    </svg>
  );
}

const ART = {
  paw: Paw,
  hotel: Hotel,
  water: Water,
  dungeon: Dungeon,
  database: Database,
  satellite: Satellite,
  radio: Radio,
  distill: Distill,
};

// `name` is the project's `icon` key in data/projects.js.
export default function CardArt({ name }) {
  const Art = ART[name];
  return Art ? <Art /> : null;
}
