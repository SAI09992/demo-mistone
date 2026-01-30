import { ParticleBackground } from "@/components/ui/particle-background"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Top-right company logo */}
      <div className="absolute top-6 right-6 z-20">
        <Image
          src="/favicon.png"
          alt="Mistnove"
          width={56}
          height={56}
          className="w-12 h-12 md:w-14 md:h-14 opacity-90"
          priority
        />
      </div>
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-[#D9027D]/8 blur-[120px] md:blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#D9027D]/12 blur-[80px] md:blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-sm md:max-w-md">
        {children}
      </div>
    </div>
  )
}

