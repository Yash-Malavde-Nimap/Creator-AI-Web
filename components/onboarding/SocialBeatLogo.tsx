import { cn } from '@/lib/utils';
import Image from 'next/image';
import Logo from "@/public/images/SocialBeatIcon.png" 

export function SocialBeatLogo() {
  return (
    <div className={cn('flex flex-col items-center gap-1.5')}>
      <Image src={Logo} height={250} width={250} alt=''/>
    </div>
  );
}
