import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Deep-navy space background with colorful bokeh blobs matching the SocialBeat design.
 * All styling is done with inline CSS / Tailwind — no canvas or third-party libs.
 */
export function ParticleBackground({ children, className }: ParticleBackgroundProps) {
  return (
    <div
      className={cn('relative min-h-screen w-full overflow-hidden', className)}
      style={{ background: 'linear-gradient(180deg, #050d1f 0%, #040b18 50%, #030810 100%)' }}
    >
      {/* ── Bokeh glow blobs ───────────────────────────────────────────────── */}

      {/* Red top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '-60px',
          left: '-80px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,40,40,0.45) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Red bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: '80px',
          right: '-60px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,40,40,0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Deep blue center-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '30%',
          left: '-100px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,80,180,0.35) 0%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Cyan right-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '40%',
          right: '-80px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,220,0.22) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Colorful scattered particles (small bokeh dots) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(255,100,80,0.7) 1px, transparent 1px),
            radial-gradient(circle at 80% 15%, rgba(0,200,255,0.6) 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 70%, rgba(255,80,80,0.6) 1px, transparent 1px),
            radial-gradient(circle at 5% 80%, rgba(100,200,255,0.5) 1px, transparent 1px),
            radial-gradient(circle at 70% 90%, rgba(255,120,50,0.6) 1.5px, transparent 1.5px),
            radial-gradient(circle at 25% 60%, rgba(200,100,255,0.4) 1px, transparent 1px),
            radial-gradient(circle at 55% 5%, rgba(100,220,200,0.5) 1px, transparent 1px),
            radial-gradient(circle at 40% 75%, rgba(255,60,60,0.5) 1.5px, transparent 1.5px),
            radial-gradient(circle at 60% 40%, rgba(0,150,255,0.4) 1px, transparent 1px),
            radial-gradient(circle at 35% 10%, rgba(255,200,100,0.5) 1px, transparent 1px)
          `,
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
