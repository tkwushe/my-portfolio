import { useLayoutEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import { countedTo, milestoneLinks, milestones, monthlyCommits, pegaraFrom } from '../data/innings';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthName = (key) => `${MONTHS[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`;
const partial = (key) => (key === countedTo.month ? ` (${countedTo.label})` : '');
const HEIGHT = 260;
const PAD = { top: 34, right: 12, bottom: 34, left: 36 };
const commits = (n) => `${n} commit${n === 1 ? '' : 's'}`;
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

// One readout line under each plot, rather than tooltips on it, so nothing covers the data.
function Readout({ children }) {
  return (
    <p className="chart__readout" aria-hidden="true">
      {children || 'Hover, tap or use the arrow keys.'}
    </p>
  );
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
    ? `${monthName(activeKey)}${partial(activeKey)}: ${commits(monthlyCommits[active][1])}${milestones[activeKey] ? `. ${milestones[activeKey]}` : ''}`
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
          {/* Low in the band, where the 2026 bars leave room, so it never sits on a counted bar. */}
          <text className="chart__band-label" x={bandX + 6} y={y(narrow ? 38 : 36)}>
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
                  rx={key < '2025' ? 0 : Math.min(3, barW / 2)}
                />
                {wicket >= 0 && (
                  <g className="chart__wicket">
                    <circle cx={x(i) + barW / 2} cy={y(value) - 13} r="9" />
                    <text x={x(i) + barW / 2} y={y(value) - 13} dy="0.35em" textAnchor="middle">{wicket + 1}</text>
                  </g>
                )}
                {tickEvery.some((end) => key.endsWith(end)) && (
                  <text
                    className="chart__tick"
                    x={i === monthlyCommits.length - 1 ? width - PAD.right : x(i) + barW / 2}
                    y={HEIGHT - PAD.bottom + 18}
                    textAnchor={i === monthlyCommits.length - 1 ? 'end' : 'middle'}
                  >
                    {monthName(key)}
                  </text>
                )}
              </g>
            );
          })}
          <line className="chart__axis" x1={PAD.left} x2={width - PAD.right} y1={y(0)} y2={y(0)} />
        </svg>
        <Announcer text={fromKeys ? activeText : ''} />
      </div>
      <Readout>
        {activeKey && (
          <>
            <strong>{monthName(activeKey)}{partial(activeKey)}</strong>
            <span>{commits(monthlyCommits[active][1])}</span>
            {milestones[activeKey] && <span>{milestones[activeKey]}</span>}
          </>
        )}
      </Readout>
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

const pegaraWicket = wicketKeys.indexOf(pegaraFrom) + 1;
const pegaraPoint = innings
  .find(({ year }) => year === pegaraFrom.slice(0, 4))
  .points.find(([m]) => m === Number(pegaraFrom.slice(5)));

function Worm() {
  const [ref, width] = useWidth();
  const narrow = width < 420;
  const max = 150;
  const right = PAD.right + (narrow ? 44 : 84);
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
            (narrow ? [0, 3, 6, 10].includes(i) : i % 2 === 0) ? (
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
                  {narrow ? (
                    <>
                      <tspan x={x(last[0]) + 9} dy="-0.4em">{year}</tspan>
                      <tspan x={x(last[0]) + 9} dy="1.2em">{total}</tspan>
                    </>
                  ) : (
                    `${year} · ${total}`
                  )}
                </text>
              </g>
            );
          })}
          {/* The Pegara wicket, drawn on the innings it fell in. */}
          <g className="chart__wicket">
            <circle cx={x(pegaraPoint[0])} cy={y(pegaraPoint[1])} r="9" />
            <text x={x(pegaraPoint[0])} y={y(pegaraPoint[1])} dy="0.35em" textAnchor="middle">{pegaraWicket}</text>
          </g>
          <line className="chart__axis" x1={PAD.left} x2={width - right} y1={y(0)} y2={y(0)} />
        </svg>
        <Announcer text={fromKeys ? activeText : ''} />
      </div>
      {/* A readout under the plot rather than a tooltip on it, so it never covers the lines. */}
      <Readout>
        {month && (
          <>
            <strong>{MONTHS[month - 1]}</strong>
            {rows.map((r) => (
              <span key={r.year}>
                <span className={`chart__key chart__key--${r.year}`} aria-hidden="true" />
                {r.year}: {r.text}
              </span>
            ))}
          </>
        )}
      </Readout>
      <p className="chart__legend">
        <span className="chart__key chart__key--2025" aria-hidden="true" />2025
        <span className="chart__key chart__key--2026" aria-hidden="true" />2026 so far
      </p>
      <p className="chart__note">
        Wicket {pegaraWicket} marks joining Pegara in {monthName(pegaraFrom)}. From then on most of my work is in private
        repositories and isn&apos;t counted.
      </p>
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
