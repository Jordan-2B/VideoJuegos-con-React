import { useRef } from "react";

export function AnimatedCard() {
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = wrapperRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `perspective(2500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Efecto de brillo dinámico
    const shine = card.querySelector(".shine");
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 70%)`;
    shine.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    const card = wrapperRef.current;
    card.style.transform = `perspective(2500px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.querySelector(".shine").style.opacity = "0";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <div
        style={{ width: 300, height: 455, perspective: "2500px", cursor: "pointer" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={wrapperRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            borderRadius: 30,
            overflow: "hidden",
            transition: "transform 0.15s ease, box-shadow 0.3s ease",
            boxShadow: "rgba(0,0,0,0.25) 0px 14px 28px, rgba(0,0,0,0.22) 0px 10px 10px",
          }}
        >
          <img
            src="../public/Reze.png"
            alt="Reze"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Capa de brillo */}
          <div
            className="shine"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 30,
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          />

          {/* Info en la parte inferior */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "1.5rem 1.2rem 1rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
          }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: 0 }}>Reze</p>
            <p style={{ color: "#c9a227", fontSize: 12, letterSpacing: "0.12em", margin: 0 }}>
              CHAINSAW MAN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}