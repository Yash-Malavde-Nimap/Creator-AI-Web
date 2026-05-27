import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ParticleBackground({ children, className }: ParticleBackgroundProps) {
  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden', className)}>
      {/* ── Background image ────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 25, 63, 0.75), rgba(10, 25, 63, 0.75)) ,url('/images/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          filter:"blur(1px)",
        }}
      />

      {/* Dark overlay so text stays legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'rgba(0, 0, 0, 0.45)' }}
      />

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
