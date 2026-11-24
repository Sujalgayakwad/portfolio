import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Shield, Sparkles, Sliders, Eye, EyeOff, RefreshCw, Zap } from 'lucide-react';

// ── Theme Definitions ─────────────────────────────────────────────
export type CyberThemeId = 'cyan' | 'emerald' | 'violet' | 'crimson';

interface CyberTheme {
  id: CyberThemeId;
  name: string;
  tag: string;
  primary: string;       // HEX
  primaryRgb: string;    // "r, g, b"
  secondaryRgb: string;
  accentRgb: string;
  trailColor: string;
  orbA: string;
  orbB: string;
  orbC: string;
}

const THEMES: Record<CyberThemeId, CyberTheme> = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    tag: 'NET_SEC_01',
    primary: '#00f5b0',
    primaryRgb: '0, 245, 176',
    secondaryRgb: '0, 210, 255',
    accentRgb: '56, 189, 248',
    trailColor: 'rgba(0, 245, 176, 0.12)',
    orbA: 'radial-gradient(circle, rgba(0,245,176,0.12) 0%, transparent 70%)',
    orbB: 'radial-gradient(circle, rgba(0,210,255,0.11) 0%, transparent 70%)',
    orbC: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    tag: 'TERMINAL_RAW',
    primary: '#10b981',
    primaryRgb: '16, 185, 129',
    secondaryRgb: '52, 211, 153',
    accentRgb: '0, 255, 102',
    trailColor: 'rgba(16, 185, 129, 0.14)',
    orbA: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
    orbB: 'radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%)',
    orbC: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
  },
  violet: {
    id: 'violet',
    name: 'Quantum Violet',
    tag: 'CRYPTO_CORE',
    primary: '#a855f7',
    primaryRgb: '168, 85, 247',
    secondaryRgb: '99, 102, 241',
    accentRgb: '217, 70, 239',
    trailColor: 'rgba(168, 85, 247, 0.13)',
    orbA: 'radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)',
    orbB: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
    orbC: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
  },
  crimson: {
    id: 'crimson',
    name: 'Threat Crimson',
    tag: 'RED_TEAM_OPS',
    primary: '#f43f5e',
    primaryRgb: '244, 63, 94',
    secondaryRgb: '251, 146, 60',
    accentRgb: '225, 29, 72',
    trailColor: 'rgba(244, 63, 94, 0.13)',
    orbA: 'radial-gradient(circle, rgba(244,63,94,0.13) 0%, transparent 70%)',
    orbB: 'radial-gradient(circle, rgba(251,146,60,0.10) 0%, transparent 70%)',
    orbC: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
  },
};

// Security glyphs & characters for subtle matrix rain
const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホ0123456789ABCDEFSECDEFTLS443AESACK';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Settings & HUD state
  const [themeId, setThemeId] = useState<CyberThemeId>(() => {
    try {
      const saved = localStorage.getItem('sg_cyber_theme');
      if (saved && saved in THEMES) return saved as CyberThemeId;
    } catch {}
    return 'cyan';
  });

  const [showPackets, setShowPackets] = useState(true);
  const [showRain, setShowRain] = useState(true);
  const [showRadar, setShowRadar] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isHudMinimized, setIsHudMinimized] = useState(false);

  const theme = THEMES[themeId];

  // Save preference
  const handleSelectTheme = (newTheme: CyberThemeId) => {
    setThemeId(newTheme);
    try {
      localStorage.setItem('sg_cyber_theme', newTheme);
    } catch {}
  };

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Mouse & Interaction State ──
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 170,
    };

    // Shockwave ripple pulses created by clicks
    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    let shockwaves: Shockwave[] = [];

    // ── Network Topology Nodes ──
    interface Node {
      x: number;
      y: number;
      ox: number; // original anchor
      oy: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      radarGlow: number; // brief flash when scanned by radar
      type: 'endpoint' | 'router' | 'threat';
    }

    const NODE_COUNT = width < 768 ? 36 : 72;
    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.2 + Math.random() * 1.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          radarGlow: 0,
          type: Math.random() > 0.85 ? 'router' : Math.random() > 0.95 ? 'threat' : 'endpoint',
        };
      });
    };

    // ── Encrypted Data Packets ──
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
      trailLen: number;
    }

    let packets: Packet[] = [];
    const MAX_PACKETS = width < 768 ? 10 : 22;

    const spawnPacket = () => {
      if (nodes.length < 2 || packets.length >= MAX_PACKETS) return;
      const fromIndex = Math.floor(Math.random() * nodes.length);
      // Find a near node to transmit to
      const nearIndices: number[] = [];
      const na = nodes[fromIndex];
      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIndex) continue;
        const nb = nodes[j];
        const dx = na.x - nb.x;
        const dy = na.y - nb.y;
        if (dx * dx + dy * dy < 170 * 170) {
          nearIndices.push(j);
        }
      }

      if (nearIndices.length > 0) {
        const toIndex = nearIndices[Math.floor(Math.random() * nearIndices.length)];
        packets.push({
          fromIndex,
          toIndex,
          progress: 0,
          speed: 0.008 + Math.random() * 0.015,
          color: Math.random() > 0.3 ? theme.primaryRgb : theme.secondaryRgb,
          trailLen: 4 + Math.random() * 6,
        });
      }
    };

    // ── Matrix Rain Drops ──
    interface RainColumn {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      changeTimer: number;
      length: number;
      alpha: number;
    }

    let rainColumns: RainColumn[] = [];
    const RAIN_SPACING = width < 768 ? 32 : 24;

    const initRain = () => {
      const colCount = Math.floor(width / RAIN_SPACING);
      rainColumns = Array.from({ length: colCount }, (_, i) => ({
        x: i * RAIN_SPACING + Math.random() * 8,
        y: Math.random() * -height,
        speed: 1.2 + Math.random() * 2.2,
        chars: Array.from({ length: 12 + Math.floor(Math.random() * 10) }, () =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ),
        changeTimer: 0,
        length: 12 + Math.floor(Math.random() * 10),
        alpha: 0.12 + Math.random() * 0.16,
      }));
    };

    // ── Radar Threat Sweep ──
    let radarAngle = 0;
    const radarCenter = { x: width * 0.5, y: height * 0.45 };
    let radarRadius = 0;

    // ── Resize handler ──
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      radarCenter.x = width * 0.5;
      radarCenter.y = height * 0.45;

      initNodes();
      initRain();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Mouse & Touch listeners ──
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      // Add shockwave pulse
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 220,
        alpha: 0.7,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // ── Render Frame ──
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth mouse lerp
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // ─────────────────────────────────────────────────────────────
      // 1. Perspective Cyber Grid / Scanlines in Horizon
      // ─────────────────────────────────────────────────────────────
      const gridY = height * 0.65;
      ctx.save();
      ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.035)`;
      ctx.lineWidth = 1;

      // Horizontal perspective grid lines
      for (let y = gridY; y < height; y += 22 * (1 + (y - gridY) / (height - gridY) * 1.8)) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Angled perspective rays
      const centerX = width * 0.5;
      const rayCount = 14;
      for (let i = -rayCount; i <= rayCount; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 20, gridY);
        ctx.lineTo(centerX + i * 90, height);
        ctx.stroke();
      }
      ctx.restore();

      // ─────────────────────────────────────────────────────────────
      // 2. Subtle Matrix Digital Telemetry Rain
      // ─────────────────────────────────────────────────────────────
      if (showRain) {
        ctx.save();
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textBaseline = 'top';

        for (let i = 0; i < rainColumns.length; i++) {
          const col = rainColumns[i];
          col.y += col.speed;
          if (col.y > height + 200) {
            col.y = -col.length * 16 - Math.random() * 100;
            col.x = i * RAIN_SPACING + Math.random() * 8;
            col.speed = 1.2 + Math.random() * 2.2;
          }

          col.changeTimer++;
          if (col.changeTimer > 8) {
            col.changeTimer = 0;
            const mutateIdx = Math.floor(Math.random() * col.chars.length);
            col.chars[mutateIdx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          // Draw the column stream
          for (let j = 0; j < col.chars.length; j++) {
            const charY = col.y + j * 16;
            if (charY < -20 || charY > height + 20) continue;

            const isHead = j === col.chars.length - 1;
            const progress = j / col.chars.length;

            if (isHead) {
              // Glowing bright leader char
              ctx.fillStyle = `rgba(255, 255, 255, ${col.alpha * 2.2})`;
              ctx.shadowColor = `rgba(${theme.primaryRgb}, 0.8)`;
              ctx.shadowBlur = 8;
              ctx.fillText(col.chars[j], col.x, charY);
              ctx.shadowBlur = 0;
            } else {
              // Fading cyber trail
              const fadeAlpha = col.alpha * (0.15 + progress * 0.85);
              ctx.fillStyle = `rgba(${theme.primaryRgb}, ${fadeAlpha})`;
              ctx.fillText(col.chars[j], col.x, charY);
            }
          }
        }
        ctx.restore();
      }

      // ─────────────────────────────────────────────────────────────
      // 3. Radar Threat Sweep Beam
      // ─────────────────────────────────────────────────────────────
      if (showRadar) {
        radarAngle += 0.015;
        if (radarAngle > Math.PI * 2) radarAngle = 0;

        radarRadius += 1.8;
        if (radarRadius > Math.max(width, height) * 0.8) {
          radarRadius = 0;
        }

        ctx.save();
        // Radar circular pulse wave
        ctx.beginPath();
        ctx.arc(radarCenter.x, radarCenter.y, radarRadius, 0, Math.PI * 2);
        const waveAlpha = Math.max(0, 0.08 * (1 - radarRadius / (Math.max(width, height) * 0.8)));
        ctx.strokeStyle = `rgba(${theme.primaryRgb}, ${waveAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Radar rotating sweep sector
        const sweepGrad = ctx.createRadialGradient(
          radarCenter.x, radarCenter.y, 10,
          radarCenter.x, radarCenter.y, 420
        );
        sweepGrad.addColorStop(0, `rgba(${theme.secondaryRgb}, 0.08)`);
        sweepGrad.addColorStop(1, `rgba(${theme.secondaryRgb}, 0)`);

        ctx.beginPath();
        ctx.moveTo(radarCenter.x, radarCenter.y);
        ctx.arc(radarCenter.x, radarCenter.y, 420, radarAngle - 0.35, radarAngle);
        ctx.closePath();
        ctx.fillStyle = sweepGrad;
        ctx.fill();

        // Radar sweep line
        ctx.beginPath();
        ctx.moveTo(radarCenter.x, radarCenter.y);
        ctx.lineTo(
          radarCenter.x + Math.cos(radarAngle) * 420,
          radarCenter.y + Math.sin(radarAngle) * 420
        );
        ctx.strokeStyle = `rgba(${theme.primaryRgb}, 0.22)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // ─────────────────────────────────────────────────────────────
      // 4. Shockwaves Expansion
      // ─────────────────────────────────────────────────────────────
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 6;
        sw.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.primaryRgb}, ${sw.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(${theme.primaryRgb}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 5. Update & Draw Constellation Nodes & Links
      // ─────────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Natural drifting
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around boundaries
        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;

        n.pulse += n.pulseSpeed;

        // Check if scanned by radar sweep
        if (showRadar) {
          const dxR = n.x - radarCenter.x;
          const dyR = n.y - radarCenter.y;
          const nodeAngle = (Math.atan2(dyR, dxR) + Math.PI * 2) % (Math.PI * 2);
          const angleDiff = Math.abs(nodeAngle - radarAngle);
          if (angleDiff < 0.08 && Math.sqrt(dxR * dxR + dyR * dyR) < 420) {
            n.radarGlow = 1;
          }
        }
        if (n.radarGlow > 0) {
          n.radarGlow -= 0.02;
        }

        // Mouse interaction: Spring pull & push
        if (mouse.active) {
          const dxM = mouse.x - n.x;
          const dyM = mouse.y - n.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);

          if (distM < mouse.radius && distM > 0) {
            const force = (1 - distM / mouse.radius) * 1.5;
            // Magnetic attraction towards cursor
            n.x += (dxM / distM) * force;
            n.y += (dyM / distM) * force;
          }
        }

        // Shockwave impact
        for (const sw of shockwaves) {
          const dxS = n.x - sw.x;
          const dyS = n.y - sw.y;
          const distS = Math.sqrt(dxS * dxS + dyS * dyS);
          if (Math.abs(distS - sw.radius) < 30 && distS > 0) {
            const push = (1 - Math.abs(distS - sw.radius) / 30) * 4;
            n.x += (dxS / distS) * push;
            n.y += (dyS / distS) * push;
          }
        }
      }

      // Draw connection links between nearby nodes
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.16;
            ctx.strokeStyle = `rgba(${theme.secondaryRgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }

        // Draw line to cursor if active & nearby
        if (mouse.active) {
          const dxM = na.x - mouse.x;
          const dyM = na.y - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < mouse.radius) {
            const alphaM = (1 - distM / mouse.radius) * 0.35;
            ctx.strokeStyle = `rgba(${theme.primaryRgb}, ${alphaM})`;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Node Points
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulseFactor = 0.7 + Math.sin(n.pulse) * 0.3;
        const radius = n.radius * pulseFactor + n.radarGlow * 1.5;

        // Outer glow
        const glowRadius = radius * (3 + n.radarGlow * 3);
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        const glowColor = n.type === 'threat' ? '244, 63, 94' : theme.primaryRgb;
        const glowAlpha = 0.25 + n.radarGlow * 0.6;

        glowGrad.addColorStop(0, `rgba(${glowColor}, ${glowAlpha})`);
        glowGrad.addColorStop(1, `rgba(${glowColor}, 0)`);

        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n.radarGlow > 0.5 ? '#ffffff' : `rgba(${glowColor}, 0.95)`;
        ctx.fill();

        // Outer ring for routers/threats
        if (n.type !== 'endpoint') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${glowColor}, 0.4)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 6. Encrypted Data Packets Flow
      // ─────────────────────────────────────────────────────────────
      if (showPackets) {
        if (Math.random() < 0.25) {
          spawnPacket();
        }

        for (let i = packets.length - 1; i >= 0; i--) {
          const pkt = packets[i];
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            // Reached destination, flash target node
            if (nodes[pkt.toIndex]) {
              nodes[pkt.toIndex].radarGlow = 0.6;
            }
            packets.splice(i, 1);
            continue;
          }

          const na = nodes[pkt.fromIndex];
          const nb = nodes[pkt.toIndex];
          if (!na || !nb) {
            packets.splice(i, 1);
            continue;
          }

          const curX = na.x + (nb.x - na.x) * pkt.progress;
          const curY = na.y + (nb.y - na.y) * pkt.progress;

          // Packet glow head
          ctx.save();
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pkt.color}, 0.95)`;
          ctx.shadowColor = `rgba(${pkt.color}, 1)`;
          ctx.shadowBlur = 8;
          ctx.fill();

          // Packet tracer tail
          const tailProg = Math.max(0, pkt.progress - 0.08);
          const tailX = na.x + (nb.x - na.x) * tailProg;
          const tailY = na.y + (nb.y - na.y) * tailProg;

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = `rgba(${pkt.color}, 0.6)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 7. Interactive Mouse Reticle HUD
      // ─────────────────────────────────────────────────────────────
      if (mouse.active) {
        ctx.save();
        ctx.translate(mouse.x, mouse.y);

        // Outer reticle circle
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.primaryRgb}, 0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner reticle circle
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(0, -30); ctx.lineTo(0, -14);
        ctx.moveTo(0, 14);  ctx.lineTo(0, 30);
        ctx.moveTo(-30, 0); ctx.lineTo(-14, 0);
        ctx.moveTo(14, 0);  ctx.lineTo(30, 0);
        ctx.strokeStyle = `rgba(${theme.primaryRgb}, 0.5)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Tiny telemetry coordinate display near mouse
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(${theme.primaryRgb}, 0.65)`;
        ctx.fillText(`LOC: ${Math.round(mouse.x)}, ${Math.round(mouse.y)}`, 32, -18);
        ctx.fillText(`DEF: ACTIVE`, 32, -6);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Visibility change: pause when tab inactive to save power
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [theme, showPackets, showRain, showRadar]);

  return (
    <>
      {/* ── Background Master Container ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
        
        {/* Layer 1: Ambient Cyber Plasma Gradient Orbs */}
        <div
          className="absolute rounded-full transition-all duration-1000 ease-out"
          style={{
            width: 850,
            height: 850,
            top: '-240px',
            left: '-160px',
            background: theme.orbA,
            filter: 'blur(90px)',
            animation: 'cyberOrbA 24s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full transition-all duration-1000 ease-out"
          style={{
            width: 750,
            height: 750,
            bottom: '-180px',
            right: '-140px',
            background: theme.orbB,
            filter: 'blur(80px)',
            animation: 'cyberOrbB 28s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full transition-all duration-1000 ease-out"
          style={{
            width: 550,
            height: 550,
            top: '38%',
            left: '55%',
            background: theme.orbC,
            filter: 'blur(70px)',
            animation: 'cyberOrbC 32s ease-in-out infinite',
          }}
        />

        {/* Layer 2: Ultra-fine Cyber Dot Matrix Grid */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(${theme.secondaryRgb}, 0.08) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.8,
          }}
        />

        {/* Layer 3: High-Performance Multi-Layer Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Layer 4: Vignette & CRT Horizon Scanline Accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(3, 7, 18, 0.4) 75%, rgba(3, 7, 18, 0.85) 100%)',
          }}
        />

        {/* Keyframe animations */}
        <style>{`
          @keyframes cyberOrbA {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33%      { transform: translate(70px, 45px) scale(1.08); }
            66%      { transform: translate(-35px, 70px) scale(0.94); }
          }
          @keyframes cyberOrbB {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40%      { transform: translate(-70px, -45px) scale(1.1); }
            70%      { transform: translate(35px, -70px) scale(0.92); }
          }
          @keyframes cyberOrbC {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%      { transform: translate(-50px, 40px) scale(1.12); }
          }
        `}</style>
      </div>

      {/* ── Layer 5: Futuristic Cyber Ambient Controls HUD (Interactive & Collapsible) ── */}
      <div className="fixed bottom-5 left-5 z-40 font-mono select-none">
        {/* Toggle trigger pill when collapsed */}
        {!showControls && (
          <button
            onClick={() => setShowControls(true)}
            aria-label="Open background customizer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#030712]/85 border border-cyan-500/25 hover:border-cyan-400/60 text-xs text-slate-300 hover:text-cyan-300 backdrop-blur-md shadow-lg shadow-black/50 transition-all group"
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }} />
            <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] tracking-wider uppercase font-semibold text-slate-200">
              {theme.name}
            </span>
            <span className="text-[10px] text-cyan-400/70 border-l border-slate-700/60 pl-2">
              {theme.tag}
            </span>
          </button>
        )}

        {/* Expanded HUD Panel */}
        {showControls && (
          <div className="w-72 p-3.5 rounded-2xl bg-[#070e24]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-950/40 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>CYBER AMBIENT HUD</span>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close controls"
              >
                ✕
              </button>
            </div>

            {/* Theme Selector */}
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Security Spectrum:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(THEMES) as CyberThemeId[]).map((tId) => {
                  const t = THEMES[tId];
                  const isActive = themeId === tId;
                  return (
                    <button
                      key={tId}
                      onClick={() => handleSelectTheme(tId)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all text-left ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-500/20 text-white font-medium shadow-sm'
                          : 'border-slate-800 bg-[#0a122c]/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: t.primary }}
                      />
                      <span className="truncate">{t.name.split(' ')[1] || t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subsystem Toggles */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span>Subsystems:</span>
              </div>

              {/* Data Packets */}
              <button
                onClick={() => setShowPackets((v) => !v)}
                className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  showPackets ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-500 bg-slate-900/40'
                }`}
              >
                <span>Packet Routing</span>
                <span className="text-[10px] font-bold">{showPackets ? 'ONLINE' : 'MUTED'}</span>
              </button>

              {/* Matrix Rain */}
              <button
                onClick={() => setShowRain((v) => !v)}
                className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  showRain ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-500 bg-slate-900/40'
                }`}
              >
                <span>Digital Telemetry</span>
                <span className="text-[10px] font-bold">{showRain ? 'ONLINE' : 'MUTED'}</span>
              </button>

              {/* Radar Sweep */}
              <button
                onClick={() => setShowRadar((v) => !v)}
                className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  showRadar ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-500 bg-slate-900/40'
                }`}
              >
                <span>Threat Radar</span>
                <span className="text-[10px] font-bold">{showRadar ? 'ONLINE' : 'MUTED'}</span>
              </button>
            </div>

            {/* Footer Status */}
            <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Interactive Mode
              </span>
              <span>Click for EMP pulse</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
