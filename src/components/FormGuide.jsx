import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import { milestones, monthlyCommits } from '../data/innings';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthLabel = (key) => `${MONTHS[Number(key.slice(5)) - 1]} ${key.slice(2, 4)}`;
const HEIGHT = 260;
const PAD = { top: 28, right: 16, bottom: 34, left: 36 };

// Width of the chart's box, so text stays at real pixel sizes on every screen.
function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver !== 'function') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

function Gridlines({ max, step, width, y }) {
  const lines = [];
  for (let v = 0; v <= max; v += step) lines.push(v);
  return lines.map((v) => (
    <g key={v}>
      <line className="chart__grid" x1={PAD.left} x2={width - PAD.right} y1={y(v)} y2={y(v)} />
      <text className="chart__tick" x={PAD.left - 8} y={y(v)} dy="0.32em" textAnchor="end">{v}</text>
    </g>
  ));
}

// Manhattan: commits per month as bars, the way a Manhattan shows runs per over,
// with milestones marked like wickets.
function Manhattan() {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState(null);
  const max = 45;
  const inner = width - PAD.left - PAD.right;
  const slot = inner / monthlyCommits.length;
  const barW = Math.max(3, slot - 3);
  const y = (v) => PAD.top + (HEIGHT - PAD.top - PAD.bottom) * (1 - v / max);
  const x = (i) => PAD.left + i * slot + (slot - barW) / 2;
  const pick = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const i = Math.floor((event.clientX - box.left - PAD.left) / slot);
    setHover(i >= 0 && i < monthlyCommits.length ? i : null);
  };

  return (
    <figure className="chart" ref={ref}>
      <figcaption className="chart__title">Manhattan · commits per month</figcaption>
      <div className="chart__plot">
        <svg width={width} height={HEIGHT} role="img" aria-labelledby="manhattan-desc" onPointerMove={pick} onPointerLeave={() => setHover(null)}>
          <desc id="manhattan-desc">Bar chart of commits per month from May 2024 to November 2026. The full figures are in the table below.</desc>
          <Gridlines max={40} step={10} width={width} y={y} />
          {monthlyCommits.map(([key, value], i) => (
            <g key={key}>
              <rect
                className={`chart__bar${hover === i ? ' is-hover' : ''}`}
                x={x(i)}
                y={y(value)}
                width={barW}
                height={Math.max(0, y(0) - y(value))}
                rx={Math.min(4, barW / 2)}
              />
              {milestones[key] && (
                <circle className="chart__wicket" cx={x(i) + barW / 2} cy={y(value) - 10} r="5" />
              )}
              {key.endsWith('-05') || key.endsWith('-11') ? (
                <text className="chart__tick" x={x(i) + barW / 2} y={HEIGHT - PAD.bottom + 18} textAnchor="middle">
                  {monthLabel(key)}
                </text>
              ) : null}
            </g>
          ))}
          <line className="chart__axis" x1={PAD.left} x2={width - PAD.right} y1={y(0)} y2={y(0)} />
        </svg>
        {hover !== null && (
          <div className="chart__tip" style={{ left: Math.min(x(hover) + barW / 2, width - 120), top: y(monthlyCommits[hover][1]) - 12 }} aria-hidden="true">
            <strong>{monthLabel(monthlyCommits[hover][0])}</strong>
            <span>{monthlyCommits[hover][1]} commits</span>
            {milestones[monthlyCommits[hover][0]] && <span className="chart__tip-note">{milestones[monthlyCommits[hover][0]]}</span>}
          </div>
        )}
      </div>
      <p className="chart__legend">
        <span className="chart__key chart__key--wicket" aria-hidden="true" /> Wicket: a milestone that changed what I was working on
      </p>
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
  const [hover, setHover] = useState(null);
  const max = 140;
  const right = PAD.right + 84;
  const inner = width - PAD.left - right;
  const x = (month) => PAD.left + ((month - 1) / 11) * inner;
  const y = (v) => PAD.top + (HEIGHT - PAD.top - PAD.bottom) * (1 - v / max);
  const pick = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const month = Math.round(((event.clientX - box.left - PAD.left) / inner) * 11) + 1;
    setHover(month >= 1 && month <= 12 ? month : null);
  };

  return (
    <figure className="chart" ref={ref}>
      <figcaption className="chart__title">Worm · running total, 2025 against 2026</figcaption>
      <div className="chart__plot">
        <svg width={width} height={HEIGHT} role="img" aria-labelledby="worm-desc" onPointerMove={pick} onPointerLeave={() => setHover(null)}>
          <desc id="worm-desc">Line chart of cumulative commits by month. 2025 ends on 128; 2026 reaches 54 by November. The full figures are in the table below.</desc>
          <Gridlines max={max} step={35} width={width - 84} y={y} />
          {MONTHS.map((label, i) =>
            i % 2 === 0 ? (
              <text key={label} className="chart__tick" x={x(i + 1)} y={HEIGHT - PAD.bottom + 18} textAnchor="middle">{label}</text>
            ) : null
          )}
          {hover && <line className="chart__cross" x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={y(0)} />}
          {innings.map(({ year, points, total }) => {
            const last = points[points.length - 1];
            return (
              <g key={year} className={`chart__worm chart__worm--${year}`}>
                <polyline points={points.map(([m, v]) => `${x(m)},${y(v)}`).join(' ')} />
                <circle cx={x(last[0])} cy={y(last[1])} r="4.5" />
                <text className="chart__end" x={x(last[0]) + 9} y={y(last[1])} dy="0.32em">{year} · {total}</text>
              </g>
            );
          })}
          <line className="chart__axis" x1={PAD.left} x2={width - right} y1={y(0)} y2={y(0)} />
        </svg>
        {hover && (
          <div className="chart__tip" style={{ left: Math.min(x(hover), width - 130), top: PAD.top }} aria-hidden="true">
            <strong>End of {MONTHS[hover - 1]}</strong>
            {innings.map(({ year, points }) => {
              const point = points.find(([m]) => m === hover);
              return <span key={year}>{year}: {point ? point[1] : 'not played yet'}</span>;
            })}
          </div>
        )}
      </div>
      <p className="chart__legend">
        <span className="chart__key chart__key--2025" aria-hidden="true" /> 2025
        <span className="chart__key chart__key--2026" aria-hidden="true" /> 2026
      </p>
    </figure>
  );
}

export default function FormGuide() {
  return (
    <section className="section" id="form" aria-labelledby="form-title">
      <SectionHead id="form-title" tab="Form guide" title="Manhattan & Worm">
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
                <th scope="col">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {monthlyCommits.map(([key, value]) => (
                <tr key={key}>
                  <th scope="row">{monthLabel(key)}</th>
                  <td>{value}</td>
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
