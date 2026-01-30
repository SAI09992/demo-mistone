"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingCartButton() {
  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-8 md:right-8">
      <Link href="/food/cart">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all"
          >
            <div className="relative">
                 <span className="absolute -top-3 -right-3 bg-red-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background">2</span>
                <ShoppingCart className="h-6 w-6" />
            </div>
          </Button>
      </Link>
    </div>
  )
}
