import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PROFILE, constellation } from '../lib/profile';
import { useTick } from '../lib/hooks/useTick';
import { useOrbitTime } from '../lib/hooks/useOrbitTime';
import styles from '../styles/Constellation.module.css';

const SVG = 980;
const PAD = 60;

const BASE_PERIOD_MS = 75000;
const VARIANCE = 0.25;
const ORBIT_DIRECTION = 1;

const periodFor = (id) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const frac = (h % 1000) / 1000;
  return BASE_PERIOD_MS * (1 - VARIANCE + 2 * VARIANCE * frac);
};

const orbitPos = (node, t) => {
  if (node.id === 'me') return { x: node.x, y: node.y };
  const dx = node.x - 0.5;
  const dy = node.y - 0.5;
  const r = Math.sqrt(dx * dx + dy * dy);
  const baseAngle = Math.atan2(dy, dx);
  const omega = (2 * Math.PI) / periodFor(node.id);
  const angle = baseAngle + ORBIT_DIRECTION * omega * t;
  return { x: 0.5 + r * Math.cos(angle), y: 0.5 + r * Math.sin(angle) };
};

const projectPos = (pos) => ({
  x: PAD + pos.x * (SVG - PAD * 2),
  y: PAD + pos.y * (SVG - PAD * 2),
});

const isExternalHref = (href) => /^https?:\/\//.test(href);

function NodePopover({ node, livePos, onClose }) {
  const headingRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const projected = projectPos(livePos);
  const right = livePos.x < 0.5;
  const below = livePos.y < 0.5;

  const positionStyle = {
    left: `${(projected.x / SVG) * 100}%`,
    top: `${(projected.y / SVG) * 100}%`,
    transform: `translate(${right ? '16px' : 'calc(-100% - 16px)'}, ${below ? '16px' : 'calc(-100% - 16px)'})`,
  };

  return (
    <div
      ref={popoverRef}
      className={styles.popover}
      style={positionStyle}
      role="dialog"
      aria-labelledby={`popover-title-${node.id}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={styles.popoverClose}
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        ×
      </button>
      <h3
        id={`popover-title-${node.id}`}
        ref={headingRef}
        tabIndex={-1}
        className={styles.popoverTitle}
      >
        {node.label}
      </h3>
      <p className={styles.popoverBody}>{node.description}</p>
      {node.links && node.links.length > 0 && (
        <ul className={styles.popoverLinks}>
          {node.links.map((l, i) => {
            const external = isExternalHref(l.href);
            return (
              <li key={i}>
                {external ? (
                  <a
                    href={l.href}
                    className={styles.popoverLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link href={l.href} className={styles.popoverLink}>
                    {l.label} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Constellation() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedId]);

  const orbitPaused = reduceMotion || hoveredId !== null || selectedId !== null;
  const tPulse = useTick({ paused: reduceMotion });
  const tOrbit = useOrbitTime({ paused: orbitPaused });

  const liveNodes = {};
  PROFILE.nodes.forEach((n) => {
    liveNodes[n.id] = orbitPos(n, tOrbit);
  });

  const project = (id) => {
    const pos = liveNodes[id];
    if (!pos) return null;
    return { ...projectPos(pos), n: PROFILE.nodes.find((x) => x.id === id) };
  };

  const selectedNode = selectedId
    ? constellation.nodes.find((n) => n.id === selectedId)
    : null;

  const handleNodeClick = (id) => (e) => {
    e.stopPropagation();
    if (id === 'me') return;
    setSelectedId((curr) => (curr === id ? null : id));
  };

  const handleNodeKey = (id) => (e) => {
    if (id === 'me') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedId((curr) => (curr === id ? null : id));
    }
  };

  return (
    <div
      className={styles.wrap}
      onClick={() => selectedId && setSelectedId(null)}
    >
      <svg
        viewBox={`0 0 ${SVG} ${SVG}`}
        className={styles.svg}
        role="img"
        aria-labelledby="constellation-title"
      >
        <title id="constellation-title">
          An orbit of interests connected to Alonso at the center.
        </title>
        {(() => {
          const trails = PROFILE.nodes
            .filter((n) => n.id !== 'me')
            .map((n) => {
              const dx = n.x - 0.5;
              const dy = n.y - 0.5;
              const r = Math.sqrt(dx * dx + dy * dy);
              const radius = r * (SVG - PAD * 2);
              const omega = (2 * Math.PI) / periodFor(n.id);
              const liveAngle = Math.atan2(dy, dx) + ORBIT_DIRECTION * omega * tOrbit;
              const trailArc = 0.45;
              const tailAngle = liveAngle - ORBIT_DIRECTION * trailArc;
              const cx = SVG / 2;
              const cy = SVG / 2;
              return {
                id: n.id,
                radius,
                headX: cx + radius * Math.cos(liveAngle),
                headY: cy + radius * Math.sin(liveAngle),
                tailX: cx + radius * Math.cos(tailAngle),
                tailY: cy + radius * Math.sin(tailAngle),
              };
            });
          return (
            <>
              <defs>
                {trails.map((t) => (
                  <linearGradient
                    key={t.id}
                    id={`trail-${t.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={t.tailX}
                    y1={t.tailY}
                    x2={t.headX}
                    y2={t.headY}
                  >
                    <stop offset="0%" stopColor="rgba(235,232,225,0)" />
                    <stop offset="100%" stopColor="rgba(235,232,225,0.55)" />
                  </linearGradient>
                ))}
              </defs>
              {trails.map((t) => (
                <path
                  key={`trail-${t.id}`}
                  d={`M ${t.tailX},${t.tailY} A ${t.radius},${t.radius} 0 0 ${ORBIT_DIRECTION === 1 ? 1 : 0} ${t.headX},${t.headY}`}
                  fill="none"
                  stroke={`url(#trail-${t.id})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
            </>
          );
        })()}
        {PROFILE.nodes.map((n) => {
          const P = project(n.id);
          if (!P) return null;
          const pulse = reduceMotion ? 1 : 1 + 0.12 * Math.sin(tPulse / 600 + n.x * 9);
          const isMe = n.id === 'me';
          const isHovered = hoveredId === n.id;
          const isSelected = selectedId === n.id;
          const focused = isHovered || isSelected;
          const baseR = isMe ? 16 : 8;
          const hitR = isMe ? 40 : 32;
          const dotFill = isMe || isSelected
            ? 'var(--accent)'
            : 'rgba(235,232,225,0.85)';
          const labelFill = focused
            ? 'var(--fg)'
            : isMe
              ? 'var(--fg)'
              : 'rgba(235,232,225,0.78)';

          const groupClass = [
            styles.node,
            isMe ? styles.nodeMe : '',
            focused ? styles.nodeFocused : '',
          ]
            .filter(Boolean)
            .join(' ');

          const targetScale = focused ? (isMe ? 1.15 : 1.4) : 1;

          return (
            <g
              key={n.id}
              className={groupClass}
              style={{ transform: `translate(${P.x}px, ${P.y}px) scale(${targetScale})` }}
              tabIndex={isMe ? -1 : 0}
              role={isMe ? undefined : 'button'}
              aria-label={isMe ? undefined : `${n.label} interest`}
              aria-haspopup={isMe ? undefined : 'dialog'}
              aria-expanded={isMe ? undefined : isSelected}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(n.id)}
              onBlur={() => setHoveredId(null)}
              onClick={handleNodeClick(n.id)}
              onKeyDown={handleNodeKey(n.id)}
            >
              <circle r={hitR} fill="transparent" />
              <circle r={baseR * pulse} fill={dotFill} style={{ pointerEvents: 'none' }} />
              {isMe && (
                <circle
                  r={34}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  opacity="0.45"
                  style={{ pointerEvents: 'none' }}
                />
              )}
              <text
                x={isMe ? 32 : 18}
                y={6}
                fill={labelFill}
                fontSize={isMe ? 26 : 18}
                fontWeight={isMe || focused ? 600 : 400}
                fontFamily={isMe ? 'var(--sans)' : 'var(--mono)'}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      {selectedNode && (
        <NodePopover
          node={selectedNode}
          livePos={liveNodes[selectedNode.id]}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
