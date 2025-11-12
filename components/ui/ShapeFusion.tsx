// components/ui/ShapeFusion.tsx
import { motion } from "framer-motion";


type Props = {
  bgColor?: string;        // color del fondo del SVG
  imgSrc?: string;         // ruta de la imagen
  readTimeSec?: number;    // tiempo quieta antes de fusionar
};


export default function ShapeFusion({
  bgColor = "#0A1224",
  imgSrc = "/imagenes/reseña1.png",
  readTimeSec = 12,
}: Props) {
  const D = 3.6;        // duración de la fusión
  const PAUSA = 10;     // pausa al final antes de reiniciar
  const PRE_DELAY = readTimeSec;


  const W = 640;
  const H = 540;


  // Centro desplazado un poco a la izquierda
  const CX = W / 2 - 45;
  const CY_FINAL = 240;
  const R_FINAL = 100;
  const EDGE_Y = CY_FINAL + R_FINAL - 2;


  // Imagen fija (NO se anima su tamaño/posición)
  const IMG_W = 220;
  const IMG_H = 130;
  const imgX = CX - IMG_W / 2; // 165
  const imgY = 60;             // entero para evitar subpíxeles


  // Padding para el mask (evita línea de corte por antialiasing)
  const MASK_PAD = 2;


  // Mini-recuadros (con aire entre ellos)
  const boxes = [
    { x: 55,  y: 440, w: 115, label: "temas",          color: "#F59E0B", wave1: "#FCD34D", wave2: "#FBBF24" },
    { x: 195, y: 460, w: 155, label: "sentimientos",   color: "#EC4899", wave1: "#F9A8D4", wave2: "#F472B6" },
    { x: 365, y: 460, w: 120, label: "gráficas",       color: "#10B981", wave1: "#6EE7B7", wave2: "#34D399" },
    { x: 515, y: 440, w: 125, label: "oportunidades",  color: "#3B82F6", wave1: "#93C5FD", wave2: "#60A5FA" },
  ];
  const centers = boxes.map(({ x, w }) => x + w / 2);


  const main = "#2563EB";


  return (
    <div className="w-full h-full" style={{ isolation: "isolate" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ mixBlendMode: "normal" }}
        shapeRendering="geometricPrecision"
      >
        {/* Fondo sólido uniforme */}
        <rect x="0" y="0" width="100%" height="100%" fill={bgColor} />


        <defs>
          {/* Gooey filter */}
          <filter
            id="goo"
            x="-50%" y="-50%" width="200%" height="200%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="normal" />
          </filter>


          {/* MÁSCARA con padding y trazo blanco para evitar “corte” */}
          <mask id="mask-img" maskUnits="userSpaceOnUse">
            {/* Fondo negro: oculta todo */}
            <rect x="0" y="0" width={W} height={H} fill="black" />
            {/* Ventana blanca con padding y stroke blanco */}
            <motion.rect
              x={imgX - MASK_PAD}
              initial={{
                y: imgY - MASK_PAD,
                width: IMG_W + MASK_PAD * 2,
                height: IMG_H + MASK_PAD * 2,
                rx: 12,
                fill: "white",
                // el stroke blanco “ensancha” un poco más la máscara en los bordes
                stroke: "white",
                strokeWidth: MASK_PAD,
              }}
              animate={{
                y: [imgY - MASK_PAD, imgY + 60 - MASK_PAD, imgY + 120 - MASK_PAD],
                height: [IMG_H + MASK_PAD * 2, 90 + MASK_PAD * 2, 0],
                rx: [12, 24, 80],
              }}
              transition={{
                delay: PRE_DELAY,
                duration: D,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: PAUSA,
              }}
            />
          </mask>
        </defs>


        {/* CAPA con gooey: IMAGEN fija + círculo + IA */}
        <g filter="url(#goo)">
          {/* Imagen fija → la máscara hace todo el efecto */}
          <image
            href={imgSrc}
            x={imgX}
            y={imgY}
            width={IMG_W}
            height={IMG_H}
            preserveAspectRatio="xMidYMid slice"
            mask="url(#mask-img)"
            style={{ imageRendering: "auto" }}
          />


          {/* Círculo que absorbe */}
          <motion.circle
            cx={CX}
            initial={{ cy: 320, r: 70 }}
            animate={{ cy: [320, 270, CY_FINAL], r: [70, 90, R_FINAL] }}
            transition={{
              delay: PRE_DELAY,
              duration: D,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: PAUSA,
            }}
            fill={main}
          />


          {/* Texto IA */}
          <motion.text
            x={CX}
            initial={{ y: 320 }}
            animate={{ y: [320, 270, CY_FINAL] }}
            transition={{
              delay: PRE_DELAY,
              duration: D,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: PAUSA,
            }}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
            fontSize={56}
            fontWeight={900}
            fill="#fff"
          >
            IA
          </motion.text>
        </g>


        {/* Sombra */}
        <motion.ellipse
          cx={CX}
          cy={430}
          rx={120}
          ry={16}
          fill="#000"
          opacity={0.25}
          initial={{ scaleX: 0.9, opacity: 0.12 }}
          animate={{ scaleX: [0.9, 1.08, 0.95], opacity: [0.12, 0.25, 0.18] }}
          transition={{
            delay: PRE_DELAY,
            duration: D,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: PAUSA,
          }}
          style={{ filter: "blur(2px)" }}
        />


        {/* Hilos */}
        {centers.map((cxBox, i) => {
          const startX = CX + (i - 1.5) * 34;
          const startY = EDGE_Y;
          const ctrl1X = CX + (i - 1.5) * 55;
          const ctrl1Y = EDGE_Y + 40 + i * 5;
          const ctrl2X = (cxBox + CX) / 2;
          const ctrl2Y = 380 + i * 8;
          const endX = cxBox;
          const endY = boxes[i].y;
          const d = `M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`;
          return (
            <motion.path
              key={`wire-${i}`}
              d={d}
              stroke={main}
              strokeWidth={1}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 1, 1] }}
              transition={{
                delay: PRE_DELAY,
                duration: D,
                ease: "easeInOut",
                times: [0, 0.86, 0.99, 1],
                repeat: Infinity,
                repeatDelay: PAUSA,
              }}
            />
          );
        })}


        {/* Mini-recuadros + ondas */}
        {boxes.map(({ x, y, w, label, color, wave1, wave2 }) => (
          <motion.g key={label}>
            {/* Ondas */}
            <motion.rect
              x={x}
              y={y}
              rx={10}
              width={w}
              height={35}
              fill="none"
              stroke={wave1}
              strokeWidth={1.2}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1.6], opacity: [0, 0.8, 0] }}
              transition={{
                delay: PRE_DELAY,
                duration: D,
                ease: "easeInOut",
                times: [0, 0.93, 1],
                repeat: Infinity,
                repeatDelay: PAUSA,
              }}
            />
            <motion.rect
              x={x}
              y={y}
              rx={10}
              width={w}
              height={35}
              fill="none"
              stroke={wave2}
              strokeWidth={1}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1.9], opacity: [0, 0.6, 0] }}
              transition={{
                delay: PRE_DELAY,
                duration: D,
                ease: "easeInOut",
                times: [0, 0.95, 1],
                repeat: Infinity,
                repeatDelay: PAUSA,
              }}
            />
            {/* Recuadro */}
            <motion.g
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: [0, 0, 1, 1], scale: [0.98, 1, 1, 1] }}
              transition={{
                delay: PRE_DELAY,
                duration: D,
                ease: "easeInOut",
                times: [0, 0.9, 0.99, 1],
                repeat: Infinity,
                repeatDelay: PAUSA,
              }}
            >
              <motion.rect
                x={x}
                y={y}
                rx={10}
                width={w}
                height={35}
                fill={color}
                stroke="#1E3A8A"
                strokeWidth={0.9}
              />
              <text
                x={x + w / 2}
                y={y + 18}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                fontSize={13}
                fontWeight={700}
                fill="#fff"
              >
                {label}
              </text>
            </motion.g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
