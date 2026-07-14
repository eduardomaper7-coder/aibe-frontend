"use client";

export default function AiRecommendationAnimation() {
  const question = "¿Qué empresa me recomiendas?";
  const answer = "Tu empresa es una de las más confiables";

  return (
    <div className="aiAnimation">
      <div className="chatShell">
        <aside className="sidebar">
          <div className="sideTop">
            <div className="logoDot" />
            <span>ChatGPT</span>
          </div>
          <div className="sideItem active" />
<div className="sideItem search" />
<div className="sideItem short" />
        </aside>

        <main className="chatArea">
          <header className="chatHeader">
            <strong>ChatGPT</strong>
            <span>Compartir ···</span>
          </header>

          <section className="messages">
            <div className="userBubble">
              <span>{question}</span>
            </div>

            <div className="aiRow">
              <div className="aiAvatar">✦</div>
              <div className="aiBubble">
                <span>{answer}</span>
              </div>
            </div>
          </section>

          <div className="promptBox promptTyping">
            <span>{question}</span>
          </div>

          <div className="promptBox promptFinal">
            <span>Pregunta lo que quieras</span>
          </div>
        </main>
      </div>

      <style jsx>{`
        .aiAnimation {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          overflow: hidden;
          background: #f7f7f8;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.16);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .chatShell {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 24% 1fr;
          background: #ffffff;
        }

        .sidebar {
          background: #f3f3f3;
          padding: 5%;
          color: #202123;
          border-right: 1px solid #e2e2e2;
        }

        .sideTop {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(12px, 1.3vw, 16px);
          font-weight: 700;
          margin-bottom: 16%;
        }

        .logoDot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #202123;
        }

        .sideItem {
          height: 10%;
          border-radius: 12px;
          background: #e8e8e8;
          margin-bottom: 8%;
        }

        .sideItem.active {
          height: auto;
          padding: 10px 12px;
          font-size: clamp(10px, 1.1vw, 14px);
          background: #ffffff;
          box-shadow: inset 0 0 0 1px #dddddd;
        }

        .sideItem.short {
          width: 68%;
        }

        .chatArea {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .chatHeader {
          height: 13%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          border-bottom: 1px solid #eeeeee;
          font-size: clamp(12px, 1.3vw, 16px);
        }

        .chatHeader span {
          color: #666;
          font-size: clamp(10px, 1.1vw, 14px);
        }

        .messages {
          flex: 1;
          position: relative;
          padding: 7% 7% 18%;
        }

        .userBubble {
          position: absolute;
          top: 19%;
          right: 7%;
          max-width: 32ch;
          padding: 13px 17px;
          border-radius: 18px 18px 4px 18px;
          background: #f0f0f0;
          color: #202123;
          font-size: clamp(12px, 1.45vw, 18px);
          opacity: 0;
          animation: showUser 14s linear infinite;
          white-space: nowrap;
        }

        .aiRow {
          position: absolute;
          top: 43%;
          left: 7%;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          opacity: 0;
          animation: showAi 14s linear infinite;
        }

        .aiAvatar {
          width: clamp(24px, 3vw, 34px);
          height: clamp(24px, 3vw, 34px);
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #10a37f;
          color: #ffffff;
          font-size: clamp(12px, 1.4vw, 16px);
          flex: 0 0 auto;
        }

        .aiBubble {
          width: 59ch;
          max-width: min(59ch, 54vw);
          color: #202123;
          font-size: clamp(12px, 1.45vw, 18px);
          line-height: 1.45;
        }

        .aiBubble span {
          display: block;
          width: 0;
          max-width: 59ch;
          overflow: hidden;
          white-space: nowrap;
          animation: typeAnswer 14s steps(59, end) infinite;
        }

        .promptBox {
          position: absolute;
          left: 50%;
          bottom: 7%;
          transform: translateX(-50%);
          width: min(72%, 620px);
          height: 13%;
          min-height: 42px;
          border-radius: 18px;
          border: 1px solid #dddddd;
          background: #ffffff;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          padding: 0 18px;
          color: #777;
          font-size: clamp(12px, 1.35vw, 16px);
        }

        .promptTyping {
          opacity: 1;
          animation: hidePrompt 14s linear infinite;
        }

        .promptTyping span {
          display: block;
          width: 0;
          max-width: 28ch;
          overflow: hidden;
          white-space: nowrap;
          color: #202123;
          animation: typeQuestion 14s steps(28, end) infinite;
        }

        .promptFinal {
          opacity: 0;
          animation: showFinalPrompt 14s linear infinite;
        }

        @keyframes typeQuestion {
          0%,
          2% {
            width: 0;
          }

          14%,
          100% {
            width: 28ch;
          }
        }

        @keyframes hidePrompt {
          0%,
          16% {
            opacity: 1;
          }

          17%,
          100% {
            opacity: 0;
          }
        }

        @keyframes showUser {
          0%,
          16% {
            opacity: 0;
          }

          18%,
          100% {
            opacity: 1;
          }
        }

        @keyframes showAi {
          0%,
          24% {
            opacity: 0;
          }

          27%,
          100% {
            opacity: 1;
          }
        }

        @keyframes typeAnswer {
          0%,
          27% {
            width: 0;
          }

          52%,
          100% {
            width: 59ch;
          }
        }

        @keyframes showFinalPrompt {
          0%,
          58% {
            opacity: 0;
          }

          62%,
          100% {
            opacity: 1;
          }
        }

     @media (max-width: 640px) {
  .aiAnimation {
    aspect-ratio: auto;
    height: 360px;
    min-height: 360px;
  }

  .chatShell {
    grid-template-columns: 58px 1fr;
  }

  .sidebar {
    padding: 12px 6px;
    background: #f7f7f8;
  }

  .sideTop {
    justify-content: center;
    margin-bottom: 14px;
    text-align: center;
  }

  .logoDot {
    display: none;
  }

  .sideTop span {
    display: block;
    font-size: 11px;
    font-weight: 800;
  }

  .sideItem {
    display: block;
    width: 100%;
    height: 34px;
    min-height: 34px;
    padding: 0;
    margin-bottom: 9px;
    border-radius: 12px;
    background: #eeeeee;
    font-size: 0;
    overflow: hidden;
  }

  .sideItem.active {
    background: #ffffff;
    box-shadow: inset 0 0 0 1px #dddddd;
  }

  .sideItem {
  display: grid;
  place-items: center;
  width: 100%;
  height: 36px;
  min-height: 36px;
  margin-bottom: 10px;
  border-radius: 12px;
  background: #eeeeee;
}

.sideItem.active::before {
  content: "+";
  font-size: 18px;
  font-weight: 700;
  color: #202123;
}

.sideItem.search::before {
  content: "⌕";
  font-size: 16px;
  color: #555;
}

.sideItem.short::before {
  content: "▣";
  font-size: 13px;
  color: #555;
}

  .userBubble {
    top: 22%;
    left: 12px;
    right: 12px;
    max-width: none;
    font-size: 12px;
    white-space: normal;
  }

  .aiRow {
    top: 50%;
    left: 5%;
    right: 5%;
    gap: 9px;
  }

  .aiBubble {
    width: auto;
    max-width: calc(100vw - 175px);
    font-size: 12px;
  }

  .promptBox {
    width: 84%;
    height: 48px;
    bottom: 18px;
  }
}
      `}</style>
    </div>
  );
}