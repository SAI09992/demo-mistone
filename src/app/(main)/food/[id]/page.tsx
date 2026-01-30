"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star, Clock, MapPin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RESTAURANTS, CATEGORIES } from "@/lib/mock-data"
import { FloatingCartButton } from "@/components/food/FloatingCart"
import { motion } from "framer-motion"

export default function RestaurantDetails() {
  const params = useParams()
  const router = useRouter()
  // Mock finding restaurant
  const restaurant = RESTAURANTS.find(r => r.id === params.id) || RESTAURANTS[0]

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      {/* Hero / Header */}
      <div className="relative h-64 md:h-80 w-full">
         <div className="absolute top-4 left-4 z-20">
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
         </div>
         <Image 
            src={restaurant.image} 
            alt={restaurant.name} 
            fill 
            className="object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
         
         <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{restaurant.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm font-medium">
               <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {restaurant.rating} (500+)</span>
               <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.time}</span>
               <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.location}</span>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
         {/* Offers */}
         {restaurant.offer && (
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                    <Percent className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <p className="font-bold text-primary">{restaurant.offer}</p>
                    <p className="text-xs text-muted-foreground">Use code MISTNOVE50</p>
                </div>
            </div>
         )}
         
         {/* Menu Section */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">Recommended</h2>
            
            {/* Mock Menu Items */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={i} 
                    className="flex justify-between items-start gap-4 pb-6 border-b border-border/50 last:border-0"
                >
                    <div className="space-y-1 flex-1">
                        <div className="h-4 w-4 border-2 border-green-500 flex items-center justify-center rounded-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        <h3 className="font-bold text-lg">Special Chicken Biryani</h3>
                        <p className="font-medium text-muted-foreground">₹299</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">Authentic hyderabadi spices cooked with long grain basmati rice and tender chicken pieces.</p>
                    </div>
                    <div className="relative w-32 h-28 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-muted">
                        <Image 
                            src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" 
                            alt="Food" 
                            fill 
                            className="object-cover" 
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                            <Button size="sm" className="rounded-xl shadow-lg h-8 uppercase font-bold text-xs bg-white text-green-600 hover:bg-gray-50 border border-green-200">
                                Add +
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </div>

      <FloatingCartButton />
    </div>
  )
}

function Percent({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
    )
}
