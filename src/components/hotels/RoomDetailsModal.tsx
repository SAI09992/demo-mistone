"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Wind, Tv, Wifi, Check, BedDouble } from "lucide-react"
import Image from "next/image"

interface Room {
    id: string
    type: string
    price: number
    originalPrice: number
    amenities: string[]
    image: string
    description: string
    maxGuests: number
    available: number
}

interface RoomDetailsModalProps {
    room: Room
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onAdd: () => void
    currentQuantity: number
}

export function RoomDetailsModal({ room, isOpen, onOpenChange, onAdd, currentQuantity }: RoomDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-0">
        <div className="relative h-56 w-full">
           <Image src={room.image} alt={room.type} fill className="object-cover" />
           <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
              <Badge className="bg-white/90 text-black backdrop-blur-sm shadow-sm pointer-events-none">
                 Max {room.maxGuests} Guests
              </Badge>
              <Badge className={`backdrop-blur-sm shadow-sm pointer-events-none ${currentQuantity > 0 ? 'bg-green-500 text-white' : 'bg-black/50 text-white'}`}>
                 {currentQuantity > 0 ? `${currentQuantity} In Cart` : `${room.available} Available`}
              </Badge>
           </div>
        </div>
        
        <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{room.type}</DialogTitle>
              <DialogDescription>
                {room.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3">
               {room.amenities.map(amenity => (
                   <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {(amenity === "Wifi" && <Wifi className="h-4 w-4" />) ||
                         (amenity === "TV" && <Tv className="h-4 w-4" />) ||
                         (amenity === "AC" && <Wind className="h-4 w-4" />) ||
                         (amenity.includes("Bed") && <BedDouble className="h-4 w-4" />) ||
                         <Check className="h-4 w-4" />}
                        {amenity}
                   </div>
               ))}
            </div>
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
               <div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-2xl font-bold">₹{room.price}</span>
                     <span className="text-sm text-muted-foreground line-through">₹{room.originalPrice}</span>
                  </div>
                  <p className="text-xs text-green-600 font-bold">
                     Save ₹{room.originalPrice - room.price} today
                  </p>
               </div>
               
               <Button 
                onClick={() => { onAdd(); onOpenChange(false); }} 
                className="font-bold px-8"
                disabled={currentQuantity >= room.available}
               >
                  Add Room
               </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
