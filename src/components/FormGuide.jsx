import { useLayoutEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import { countedTo, milestoneLinks, milestones, monthlyCommits, pegaraFrom } from '../data/innings';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthName = (key) => `${MONTHS[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`;
const partial = (key) => (key === countedTo.month ? ` (${countedTo.label})` : '');
const HEIGHT = 260;
const PAD = { top: 34, right: 12, bottom: 34, left: 36 };
const TIP_W = 200;
const wicketKeys = Object.keys(milestones);
const first = monthlyCommits[0][0];
const last = monthlyCommits[monthlyCommits.length - 1][0];

// Width of the plot box, so text stays at real pixel sizes on every screen.
// Measured before the first paint, so the chart never redraws at a guessed width.
function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setWidth(el.clientWidth);
    if (typeof ResizeObserver !== 'function') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, Math.max(280, width || 640)];
}

// Pointer, tap and arrow keys all move the same highlighted column.
function useScrub(count, toIndex) {
  const [active, setActive] = useState(null);
  const [fromKeys, setFromKeys] = useState(false);
  const pick = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const i = toIndex(event.clientX - box.left);
    setFromKeys(false);
    setActive(i >= 0 && i < count ? i : null);
  };
  const onKeyDown = (event) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, Home: -count, End: count }[event.key];
    if (step === undefined) {
      if (event.key === 'Escape') setActive(null);
      return;
    }
    event.preventDefault();
    setFromKeys(true);
    setActive((i) => Math.min(count - 1, Math.max(0, (i ?? count) + step)));
  };
  const handlers = {
    onPointerMove: pick,
    onPointerDown: pick,
    onPointerLeave: (event) => event.pointerType === 'mouse' && setActive(null),
    onKeyDown,
    onBlur: () => setActive(null),
    tabIndex: 0,
    role: 'group',
  };
  return [active, handlers, fromKeys];
}

function Gridlines({ max, step, x1, x2, y }) {
  const lines = [];
  for (let v = 0; v <= max; v += step) lines.push(v);
  return lines.map((v) => (
    <g key={v}>
      <line className="chart__grid" x1={x1} x2={x2} y1={y(v)} y2={y(v)} />
      <text className="chart__tick" x={x1 - 8} y={y(v)} dy="0.32em" textAnchor="end">{v}</text>
    </g>
  ));
}

function Tip({ x, y, width, children }) {
  const left = Math.min(Math.max(x, TIP_W / 2), width - TIP_W / 2);
  return <div className="chart__tip" style={{ left, top: y }} aria-hidden="true">{children}</div>;
}

// Always mounted, so the first arrow-key step is read out too.
function Announcer({ text }) {
  return <p className="visually-hidden" aria-live="polite">{text}</p>;
}

// Manhattan: commits per month as bars, the way a Manhattan shows runs per over,
// with milestones marked like wickets and numbered against the list underneath.
function Manhattan() {
  const [ref, width] = useWidth();
  const narrow = width < 420;
  const max = 45;
  const inner = width - PAD.left - PAD.right;
  const slot = inner / monthlyCommits.length;
  const barW = Math.max(3, slot - 3);
  const y = (v) => PAD.top + (HEIGHT - PAD.top - PAD.bottom) * (1 - v / max);
  const x = (i) => PAD.left + i * slot + (slot - barW) / 2;
  const [active, handlers, fromKeys] = useScrub(monthlyCommits.length, (px) => Math.floor((px - PAD.left) / slot));
  const pegaraStart = monthlyCommits.findIndex(([key]) => key === pegaraFrom);
  const bandX = PAD.left + pegaraStart * slot;
  const tickEvery = narrow ? ['-11'] : ['-05', '-11'];
  const activeKey = active !== null ? monthlyCommits[active][0] : null;
  const activeText = activeKey
    ? `${monthName(activeKey)}${partial(activeKey)}: ${monthlyCommits[active][1]} commits${milestones[activeKey] ? `. ${milestones[activeKey]}` : ''}`
    : '';

  return (
    <figure className="chart">
      <figcaption className="chart__title">Manhattan · commits per month</figcaption>
      <div className="chart__plot" ref={ref} aria-label="Manhattan chart: use the left and right arrow keys to step through the months" {...handlers}>
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label={`Manhattan of commits per month, ${monthName(first)} to ${monthName(last)}${partial(last)}. The figures are also in the table below.`}
        >
          <defs>
            <pattern id="hatch-partial" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect className="chart__hatch-bg" width="5" height="5" />
              <line className="chart__hatch" x1="0" y1="0" x2="0" y2="5" />
            </pattern>
          </defs>
          <rect className="chart__band" x={bandX} y={PAD.top - 22} width={width - PAD.right - bandX} height={y(0) - PAD.top + 22} />
          <text className="chart__band-label" x={bandX + 6} y={PAD.top - 8}>
            {narrow ? (
              <>
                <tspan>Pegara work</tspan>
                <tspan x={bandX + 6} dy="14">not shown</tspan>
              </>
            ) : (
              'Pegara work not shown'
            )}
          </text>
          <Gridlines max={40} step={10} x1={PAD.left} x2={width - PAD.right} y={y} />
          {monthlyCommits.map(([key, value], i) => {
            const wicket = wicketKeys.indexOf(key);
            return (
              <g key={key}>
                <rect
                  className={`chart__bar chart__bar--${key.slice(0, 4)}${key === countedTo.month ? ' is-partial' : ''}${active === i ? ' is-active' : ''}`}
                  x={x(i)}
                  y={y(value)}
                  width={barW}
                  height={Math.max(0, y(0) - y(value))}
                  rx={Math.min(3, barW / 2)}
                />
                {wicket >= 0 && (
                  <g className="chart__wicket">
                    <circle cx={x(i) + barW / 2} cy={y(value) - 13} r="9" />
                    <text x={x(i) + barW / 2} y={y(value) - 13} dy="0.35em" textAnchor="middle">{wicket + 1}</text>
                  </g>
                )}
                {tickEvery.some((end) => key.endsWith(end)) && (
                  <text className="chart__tick" x={x(i) + barW / 2} y={HEIGHT - PAD.bottom + 18} textAnchor="middle">
                    {monthName(key)}
                  </text>
                )}
              </g>
            );
          })}
          <line className="chart__axis" x1={PAD.left} x2={width - PAD.right} y1={y(0)} y2={y(0)} />
        </svg>
        {active !== null && (
          <Tip x={x(active) + barW / 2} y={Math.max(84, y(monthlyCommits[active][1]) - 26)} width={width}>
            <strong>{monthName(activeKey)}{partial(activeKey)}</strong>
            <span>{monthlyCommits[active][1]} commits</span>
            {milestones[activeKey] && <span className="chart__tip-note">{milestones[activeKey]}</span>}
          </Tip>
        )}
        <Announcer text={fromKeys ? activeText : ''} />
      </div>
      <p className="chart__legend">
        <span className="chart__key chart__key--bar chart__key--2024" aria-hidden="true" />2024
        <span className="chart__key chart__key--bar chart__key--2025" aria-hidden="true" />2025
        <span className="chart__key chart__key--bar chart__key--2026" aria-hidden="true" />2026
        <span className="chart__key chart__key--bar chart__key--partial" aria-hidden="true" />Nov 2026, {countedTo.label}
      </p>
      <ol className="chart__wickets">
        {wicketKeys.map((key) => (
          <li key={key}>
            <span className="chart__wickets-date">{monthName(key)}</span>{' '}
            {milestoneLinks[key] ? <a href={milestoneLinks[key]}>{milestones[key]}</a> : milestones[key]}
          </li>
        ))}
      </ol>
    </figure>
  );
}

// Worm: cumulative commits through each year, 2025 against 2026, like two innings run for run.
const innings = ['2025', '2026'].map((year) => {
  let total = 0;
  const points = monthlyCommits
    .filter(([key]) => key.startsWith(year))
    .map(([key, value]) => {
      total += value;
      return [Number(key.slice(5)), total];
    });
  return { year, points, total };
});

function Worm() {
  const [ref, width] = useWidth();
  const narrow = width < 420;
  const max = 150;
  const right = PAD.right + (narrow ? 36 : 84);
  const inner = width - PAD.left - right;
  const x = (month) => PAD.left + ((month - 1) / 11) * inner;
  const y = (v) => PAD.top + (HEIGHT - PAD.top - PAD.bottom) * (1 - v / max);
  const [active, handlers, fromKeys] = useScrub(12, (px) => Math.round(((px - PAD.left) / inner) * 11));
  const month = active === null ? null : active + 1;
  const lastKey = (year) => `${year}-${String(month).padStart(2, '0')}`;
  const rows = innings.map(({ year, points }) => {
    const point = points.find(([m]) => m === month);
    return { year, text: point ? `${point[1]}${partial(lastKey(year))}` : 'not played yet' };
  });
  const activeText = month ? `Running total, ${MONTHS[month - 1]}: ${rows.map((r) => `${r.year} ${r.text}`).join(', ')}` : '';

  return (
    <figure className="chart">
      <figcaption className="chart__title">Worm · running total by year</figcaption>
      <div className="chart__plot" ref={ref} aria-label="Worm chart: use the left and right arrow keys to step through the months" {...handlers}>
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label={`Worm of running commit totals. ${innings[0].year} ends on ${innings[0].total}; ${innings[1].year} has ${innings[1].total} so far. The figures are also in the table below.`}
        >
          <Gridlines max={max} step={50} x1={PAD.left} x2={width - right} y={y} />
          {MONTHS.map((label, i) =>
            i % (narrow ? 3 : 2) === 0 ? (
              <text key={label} className="chart__tick" x={x(i + 1)} y={HEIGHT - PAD.bottom + 18} textAnchor="middle">{label}</text>
            ) : null
          )}
          {month && <line className="chart__cross" x1={x(month)} x2={x(month)} y1={PAD.top} y2={y(0)} />}
          {innings.map(({ year, points, total }) => {
            const last = points[points.length - 1];
            return (
              <g key={year} className={`chart__worm chart__worm--${year}`}>
                <polyline points={points.map(([m, v]) => `${x(m)},${y(v)}`).join(' ')} />
                <circle cx={x(last[0])} cy={y(last[1])} r="4.5" />
                <text className="chart__end" x={x(last[0]) + 9} y={y(last[1])} dy="0.32em">
                  {narrow ? total : `${year} · ${total}`}
                </text>
              </g>
            );
          })}
          {/* Wicket 3 on the 2025 innings: the month I joined Pegara. */}
          <g className="chart__wicket">
            <circle cx={x(11)} cy={y(innings[0].points[10][1])} r="9" />
            <text x={x(11)} y={y(innings[0].points[10][1])} dy="0.35em" textAnchor="middle">3</text>
          </g>
          <line className="chart__axis" x1={PAD.left} x2={width - right} y1={y(0)} y2={y(0)} />
        </svg>
        {month && (
          <Tip x={x(month)} y={PAD.top + 84} width={width}>
            <strong>Running total, {MONTHS[month - 1]}</strong>
            {rows.map((r) => <span key={r.year}>{r.year}: {r.text}</span>)}
          </Tip>
        )}
        <Announcer text={fromKeys ? activeText : ''} />
      </div>
      <p className="chart__legend">
        <span className="chart__key chart__key--2025" aria-hidden="true" />2025
        <span className="chart__key chart__key--2026" aria-hidden="true" />2026 so far
      </p>
      <p className="chart__note">Wicket 3 marks joining Pegara in Nov 2025. From then on most of my work is in private repositories and isn&apos;t counted.</p>
    </figure>
  );
}

// Running total within each calendar year, for the table.
const yearToDate = (() => {
  const totals = {};
  return monthlyCommits.map(([key, value]) => {
    const year = key.slice(0, 4);
    totals[year] = (totals[year] ?? 0) + value;
    return totals[year];
  });
})();

export default function FormGuide() {
  return (
    <section className="section" id="form" aria-labelledby="form-title">
      <SectionHead id="form-title" tab="Form guide" title="Commit form">
        My commit record drawn as cricket graphics. These are commits I made in my own repositories. Most of my work for Pegara
        sits in private repositories, so it isn&apos;t counted here.
      </SectionHead>

      <div className="form-guide" data-reveal>
        <Manhattan />
        <Worm />
      </div>

      <details className="form-guide__table">
        <summary>Show the figures as a table</summary>
        <div className="league__scroll" role="region" aria-label="Commits per month" tabIndex={0}>
          <table>
            <caption>Commits per month in my own repositories</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Commits</th>
                <th scope="col">Year to date</th>
                <th scope="col">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {monthlyCommits.map(([key, value], i) => (
                <tr key={key}>
                  <th scope="row">{monthName(key)}{partial(key)}</th>
                  <td>{value}</td>
                  <td>{yearToDate[i]}</td>
                  <td>{milestones[key] ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
