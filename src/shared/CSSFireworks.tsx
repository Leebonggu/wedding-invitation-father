
export const CSSFireworks = () => {
  return (
    <div className="fireworks-container">
      <style>{`
        .fireworks-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }

        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: explode 2s ease-out forwards;
        }

        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
          }
        }

        /* 불꽃 파티클들 */
        .firework:nth-child(1) { --x: 100px; --y: -100px; background: #ff006e; animation-delay: 0s; }
        .firework:nth-child(2) { --x: -100px; --y: -100px; background: #fb5607; animation-delay: 0.1s; }
        .firework:nth-child(3) { --x: 100px; --y: 100px; background: #ffbe0b; animation-delay: 0.2s; }
        .firework:nth-child(4) { --x: -100px; --y: 100px; background: #8338ec; animation-delay: 0.3s; }
        .firework:nth-child(5) { --x: 150px; --y: 0; background: #3a86ff; animation-delay: 0.4s; }
        .firework:nth-child(6) { --x: -150px; --y: 0; background: #06ffa5; animation-delay: 0.5s; }
        .firework:nth-child(7) { --x: 0; --y: -150px; background: #ff4365; animation-delay: 0.6s; }
        .firework:nth-child(8) { --x: 0; --y: 150px; background: #00d9ff; animation-delay: 0.7s; }

        .firework-burst {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .firework-burst:nth-child(2) {
          top: 40%;
          left: 30%;
          animation-delay: 0.5s;
        }

        .firework-burst:nth-child(3) {
          top: 40%;
          left: 70%;
          animation-delay: 0.8s;
        }
      `}</style>

      <div className="firework-burst">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="firework"></div>
        ))}
      </div>
      <div className="firework-burst">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="firework"></div>
        ))}
      </div>
      <div className="firework-burst">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="firework"></div>
        ))}
      </div>
    </div>
  );
};