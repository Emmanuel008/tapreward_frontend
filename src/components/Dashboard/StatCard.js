import { StatIcon } from '../icons/Icons';
import './StatCard.css';

const chartPaths = [
  'M0,50 C20,45 40,20 60,30 S100,55 120,25 S160,10 180,35 S220,50 240,20 S280,5 320,30 L320,80 L0,80 Z',
  'M0,40 C25,35 50,55 75,30 S125,15 150,40 S175,55 200,25 S240,10 280,35 S300,45 320,20 L320,80 L0,80 Z',
  'M0,35 C30,30 55,50 80,25 S130,40 155,20 S190,45 220,30 S260,15 290,40 L320,25 L320,80 L0,80 Z',
  'M0,45 C20,40 45,25 70,35 S110,55 140,30 S170,20 200,40 S240,50 270,25 L320,35 L320,80 L0,80 Z',
];

function StatCard({ label, value, icon, chartIndex = 0 }) {
  const path = chartPaths[chartIndex % chartPaths.length];

  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <div className="stat-card__label-group">
          <span className="stat-card__icon">
            <StatIcon name={icon} />
          </span>
          <span className="stat-card__label">{label}</span>
        </div>
        <span className="stat-card__value">{value}</span>
      </div>

      <div className="stat-card__chart">
        <svg viewBox="0 0 320 80" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`chart-gradient-${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={path} fill={`url(#chart-gradient-${chartIndex})`} />
          <path
            d={path.replace(/ L320,80 L0,80 Z$/, '')}
            fill="none"
            stroke="#7C3AED"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </article>
  );
}

export default StatCard;
