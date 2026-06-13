"use client";

export default function GoogleSearchAnimation() {
  const results = [
    "Tu empresa",
    "Competidor cercano",
    "Directorio local",
    "Blog del sector",
  ];

  return (
    <div className="searchBox">
      <div className="bar">
        <span>🔍</span>
        <strong>servicio cerca de mí</strong>
      </div>

      <div className="results">
        {results.map((item, i) => (
          <div className={`result ${i === 0 ? "first" : ""}`} key={item}>
            <p>{item}</p>
            <small>www.{item.toLowerCase().replaceAll(" ", "")}.com</small>
          </div>
        ))}
      </div>

      <style jsx>{`
        .searchBox {
          background: #ffffff;
          border: 1px solid #e8ecf3;
          border-radius: 30px;
          padding: 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,.08);
          overflow: hidden;
        }

        .bar {
          height: 54px;
          border-radius: 999px;
          background: #f4f7fb;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 22px;
          color: #111;
          margin-bottom: 20px;
        }

        .results {
          display: grid;
          gap: 12px;
        }

        .result {
          padding: 14px 16px;
          border-radius: 18px;
          background: #f8fafc;
          animation: appear .6s ease both;
        }

        .result:nth-child(1) { animation-delay: .2s; }
        .result:nth-child(2) { animation-delay: .45s; }
        .result:nth-child(3) { animation-delay: .7s; }
        .result:nth-child(4) { animation-delay: .95s; }

        .first {
          background: #eaf2ff;
          border: 1px solid rgba(46,123,255,.25);
          transform-origin: center;
          animation: appear .6s ease both, pulse 2.4s ease-in-out infinite 1.4s;
        }

        p {
          margin: 0 0 5px;
          font-weight: 800;
          color: #111;
        }

        small {
          color: #2e7bff;
          font-weight: 700;
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 rgba(46,123,255,0); }
          50% { box-shadow: 0 14px 34px rgba(46,123,255,.22); }
        }
      `}</style>
    </div>
  );
}