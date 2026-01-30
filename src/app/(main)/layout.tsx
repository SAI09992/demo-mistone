import { Toaster } from "sonner"
import { Header } from "@/components/shared/Header"
import { BottomNav } from "@/components/shared/BottomNav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container mx-auto px-0 md:px-8">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
