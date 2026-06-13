"use client";

export default function SocialMetricsAnimation() {
  return (
    <div className="socialAnimation">
      <div className="platforms">
        <span>Instagram</span>
        <span>TikTok</span>
        <span>Facebook</span>
      </div>

      <div className="content">
        <div className="posts">
          <div className="post active" />
          <div className="post" />
          <div className="post" />
        </div>

        <div className="metrics">
          <Metric label="Visualizaciones" value="24.8K" />
          <Metric label="Alcance" value="18.6K" />
          <Metric label="Interacciones" value="3.2K" />
        </div>
      </div>

      <div className="chart">
        <svg viewBox="0 0 320 90">
          <path d="M10 75 C70 68, 90 52, 135 55 S210 25, 310 12" />
        </svg>
      </div>

      <style jsx>{`
        .socialAnimation {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: transparent;
          border: 1px solid #edf1f7;
          border-radius: 28px;
          padding: clamp(22px, 4vw, 42px);
          overflow: hidden;
          position: relative;
          font-family: "Montserrat", sans-serif;
        }

        .platforms {
          display: flex;
          gap: 10px;
          margin-bottom: 26px;
        }

        .platforms span {
          border: 1px solid #e8ecf3;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #111;
          background: white;
          animation: fadeIn 5s ease-in-out infinite;
        }

        .content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: center;
        }

        .posts {
          display: grid;
          gap: 14px;
        }

        .post {
          height: 64px;
          border-radius: 18px;
          border: 1px solid #edf1f7;
          background:
            linear-gradient(90deg, #111 0 16%, transparent 16%),
            linear-gradient(90deg, #eef3fb 0 70%, transparent 70%);
          background-size: 100% 12px, 100% 12px;
          background-position: 18px 17px, 18px 39px;
          background-repeat: no-repeat;
          opacity: 0.45;
          animation: postPulse 5s ease-in-out infinite;
        }

        .post.active {
          opacity: 1;
          border-color: rgba(46, 123, 255, 0.35);
          box-shadow: 0 0 0 6px rgba(46, 123, 255, 0.06);
        }

        .metrics {
          display: grid;
          gap: 14px;
        }

        .metric {
          border: 1px solid #edf1f7;
          border-radius: 18px;
          padding: 16px 18px;
          background: white;
          animation: metricGlow 5s ease-in-out infinite;
        }

        .label {
          display: block;
          color: #687083;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .value {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #111;
          font-size: clamp(1.25rem, 2vw, 1.8rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .up {
          color: #2e7bff;
          font-size: 0.85rem;
          font-weight: 800;
          animation: riseSignal 5s ease-in-out infinite;
        }

        .chart {
          position: absolute;
          left: 42px;
          right: 42px;
          bottom: 24px;
          height: 80px;
          opacity: 0;
          animation: chartAppear 5s ease-in-out infinite;
        }

        .chart svg {
          width: 100%;
          height: 100%;
        }

        .chart path {
          fill: none;
          stroke: #2e7bff;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 360;
          stroke-dashoffset: 360;
          animation: drawChart 5s ease-in-out infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          15%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes postPulse {
          0%,
          35% {
            transform: translateY(8px);
            opacity: 0;
          }
          50%,
          100% {
            transform: translateY(0);
          }
        }

        @keyframes metricGlow {
          0%,
          45% {
            transform: translateY(8px);
            opacity: 0;
          }
          65%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes riseSignal {
          0%,
          45% {
            opacity: 0;
            transform: translateY(8px);
          }
          65%,
          88% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes chartAppear {
          0%,
          50% {
            opacity: 0;
          }
          68%,
          92% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes drawChart {
          0%,
          52% {
            stroke-dashoffset: 360;
          }
          82%,
          100% {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 700px) {
          .content {
            grid-template-columns: 1fr;
          }

          .chart {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span className="label">{label}</span>
      <span className="value">
        {value}
        <span className="up">+ crecimiento</span>
      </span>
    </div>
  );
}