import { ParticleBackground } from '@/components/onboarding/ParticleBackground';
import { BottomNav } from '@/components/dashboard/BottomNav';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ParticleBackground>
      <div className="flex min-h-screen flex-col pb-20">
        {children}
      </div>
      <BottomNav />
    </ParticleBackground>
  );
}
