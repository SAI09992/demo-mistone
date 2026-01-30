"use client"

import Link from "next/link"
import { Apple, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 font-bold text-white flex items-center justify-center">
                  M
                </div>
                <span className="text-xl font-bold">Mistnove</span>
            </div>
            <p className="text-sm text-muted-foreground">
               Experience the best of food, luxury stays, and seamless travel in one super app.
            </p>
          </div>

          {/* Links */}
          <div>
             <h3 className="font-bold mb-4">Company</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="font-bold mb-4">Legal</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
             </ul>
          </div>

          {/* Store Links */}
          <div>
            <h3 className="font-bold mb-4">Get the App</h3>
            <div className="flex flex-col gap-3">
               <Button variant="outline" className="h-12 justify-start gap-3 rounded-xl bg-background hover:bg-background/80 border-primary/20">
                  <Apple className="h-6 w-6" />
                  <div className="flex flex-col items-start leading-none">
                     <span className="text-[10px] font-medium text-muted-foreground">Download on the</span>
                     <span className="text-sm font-bold">App Store</span>
                  </div>
               </Button>
               <Button variant="outline" className="h-12 justify-start gap-3 rounded-xl bg-background hover:bg-background/80 border-primary/20">
                  <Smartphone className="h-6 w-6" />
                  <div className="flex flex-col items-start leading-none">
                     <span className="text-[10px] font-medium text-muted-foreground">GET IT ON</span>
                     <span className="text-sm font-bold">Google Play</span>
                  </div>
               </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary/10" />
        
        <div className="pt-8 text-center">
           <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
              Developed with love By Mistnove
           </p>
           <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mistnove. All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  )
}
