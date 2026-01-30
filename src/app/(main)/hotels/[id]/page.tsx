"use client"

import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MapPin, Star, Share2, Heart, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HOTELS } from "@/lib/mock-data"
import { RoomList } from "@/components/hotels/RoomList"
import { Badge } from "@/components/ui/badge"

export default function HotelDetailsPage() {
  const params = useParams()
  const router = useRouter()
  // Mock finding hotel
  const hotel = HOTELS.find(h => h.id === params.id) || HOTELS[0]
  
  // Cart state: RoomId -> Quantity
  const [cart, setCart] = useState<Record<string, number>>({})

  const updateRoomQuantity = (id: string, delta: number) => {
      setCart(prev => {
          const currentQty = prev[id] || 0
          const newQty = Math.max(0, currentQty + delta)
          
          if (newQty === 0) {
              const { [id]: _, ...rest } = prev
              return rest
          }
          return { ...prev, [id]: newQty }
      })
  }
  
  const totalRooms = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
      // Flatten rooms to find price (since rooms are nested in hotels, simplistic lookup here)
      const room = hotel.rooms?.find(r => r.id === id)
      return total + (room ? room.price * qty : 0)
  }, 0)

  const handleBook = () => {
      const roomParams = Object.entries(cart).map(([id, qty]) => `${id}:${qty}`).join(',')
      router.push(`/hotels/checkout?hotelId=${hotel.id}&rooms=${roomParams}`)
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-24">
       {/* Header / Nav */}
       <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b p-4 flex justify-between items-center">
           <Button variant="ghost" size="icon" onClick={() => router.back()}>
               <ArrowLeft className="h-5 w-5" />
           </Button>
           <span className="font-bold text-sm truncate max-w-[200px]">{hotel.name}</span>
           <div className="flex gap-2">
               <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
               <Button variant="ghost" size="icon"><Heart className="h-4 w-4" /></Button>
           </div>
       </div>

       {/* Hero Gallery */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1 md:h-96">
           <div className="relative h-64 md:h-full w-full">
               <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover rounded-lg" />
           </div>
           <div className="hidden md:grid grid-cols-2 gap-1">
               <div className="relative h-full w-full">
                   <Image src={hotel.images[1] || hotel.images[0]} alt="Gallery" fill className="object-cover rounded-lg" />
               </div>
               <div className="relative h-full w-full bg-black/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                   <span className="text-white font-bold text-lg">+5 Photos</span>
               </div>
           </div>
       </div>

       <div className="container mx-auto p-4 max-w-4xl space-y-8">
           {/* Info */}
           <div className="space-y-4">
               <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm mt-1">
                        <MapPin className="h-4 w-4" /> {hotel.location}
                    </p>
               </div>

               <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-1 rounded text-sm font-bold">
                       {hotel.rating} <Star className="h-3 w-3 fill-white" />
                   </div>
                   <span className="text-sm font-medium underline text-muted-foreground">{hotel.ratingCount} Ratings</span>
               </div>
               
               <div className="flex flex-wrap gap-2">
                   {hotel.tags.map(tag => (
                       <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wide">
                           {tag}
                       </Badge>
                   ))}
               </div>
               
               <p className="text-sm leading-relaxed text-muted-foreground">
                   {hotel.description}
               </p>

               <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" /> Free Cancellation
                    </h3>
                    <p className="text-xs text-muted-foreground">Cancel anytime before 24hrs of check-in for a full refund.</p>
               </div>
           </div>

           <Separator />
           
           {/* Room Selection */}
           <div className="space-y-6">
               <h2 className="text-xl font-bold">Select Rooms</h2>
               
               {/* Recommended */}
               {hotel.rooms && hotel.rooms.length > 0 ? (
                   <RoomList rooms={hotel.rooms} cart={cart} onUpdateQuantity={updateRoomQuantity} />
               ) : (
                   <p className="text-muted-foreground">No rooms available for these dates.</p>
               )}
           </div>

           <Separator />

           {/* Policies */}
            <div className="space-y-4 pb-8">
               <h2 className="text-lg font-bold">Hotel Policies</h2>
               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                   <li>Check-in: 12:00 PM</li>
                   <li>Check-out: 11:00 AM</li>
                   <li>Guests with local IDs are allowed.</li>
                   <li>Couples are welcome.</li>
               </ul>
           </div>
       </div>

       {/* Sticky Checkout Bar */}
        {totalRooms > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom duration-300">
                <div className="container max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">{totalRooms} Room{totalRooms > 1 ? 's' : ''} Selected</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
                            <span className="text-xs text-muted-foreground">+ taxes</span>
                        </div>
                    </div>
                    <Button size="lg" className="z-1 px-8 font-bold rounded-xl shadow-lg" onClick={handleBook}>
                        Proceed to Book
                    </Button>
                </div>
            </div>
        )}
    </div>
  )
}
