/**
 * Approximates the animated 3D AI particle sphere on the SocialBeat landing screen.
 * Uses CSS morphing border-radius + layered gradients (no canvas, no deps).
 */
export function AiBlob() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Outer glow halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,180,255,0.12) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Animated morphing blob — outer ring (cyan/blue) */}
      <div
        className="absolute"
        style={{
          width: 240,
          height: 240,
          background:
            'conic-gradient(from 0deg, rgba(0,180,255,0.0) 0%, rgba(0,200,255,0.65) 25%, rgba(0,100,200,0.55) 50%, rgba(0,180,255,0.0) 100%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'blob-morph 8s ease-in-out infinite, float 6s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />

      {/* Inner ring (orange/gold) */}
      <div
        className="absolute"
        style={{
          width: 180,
          height: 180,
          background:
            'conic-gradient(from 180deg, rgba(245,166,35,0.0) 0%, rgba(245,140,35,0.6) 25%, rgba(230,100,20,0.55) 55%, rgba(245,166,35,0.0) 100%)',
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          animation: 'blob-morph 6s ease-in-out infinite reverse, float 8s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />

      {/* Centre glow core */}
      <div
        className="absolute"
        style={{
          width: 100,
          height: 100,
          background: 'radial-gradient(circle, rgba(180,120,60,0.55) 0%, rgba(0,120,200,0.35) 60%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(6px)',
        }}
      />

      {/* Dot grid overlay — outer cyan dots */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,220,255,0.45) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          WebkitMaskImage: 'radial-gradient(circle, white 55%, transparent 72%)',
          maskImage: 'radial-gradient(circle, white 55%, transparent 72%)',
          animation: 'dot-spin 20s linear infinite',
        }}
      />

      {/* Dot grid overlay — inner orange dots */}
      <div
        className="absolute"
        style={{
          width: 160,
          height: 160,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundImage:
            'radial-gradient(circle, rgba(240,140,30,0.5) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          WebkitMaskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
          maskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
          animation: 'dot-spin 14s linear infinite reverse',
        }}
      />
    </div>
  );
}
