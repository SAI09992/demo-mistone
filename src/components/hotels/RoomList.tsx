"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RoomDetailsModal } from "./RoomDetailsModal"

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

export function RoomList({ rooms, cart, onUpdateQuantity }: { 
    rooms: Room[], 
    cart: Record<string, number>, 
    onUpdateQuantity: (id: string, delta: number) => void 
}) {
  const [viewDetailsRoom, setViewDetailsRoom] = useState<Room | null>(null)

  return (
    <div className="space-y-4">
       {rooms.map((room) => {
           const quantity = cart[room.id] || 0
           const isSelected = quantity > 0
           
           return (
            <Card key={room.id} className={`overflow-hidden transition-all duration-300 ${isSelected ? 'border-primary shadow-md bg-primary/5' : 'border-border hover:shadow-sm'}`}>
                <div className="flex flex-col sm:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 cursor-pointer" onClick={() => setViewDetailsRoom(room)}>
                        <Image src={room.image} alt={room.type} fill className="object-cover" />
                        {room.available <= 3 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                                Only {room.available} left
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <CardContent className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">{room.type}</h3>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setViewDetailsRoom(room)}>
                                    <Info className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{room.description}</p>
                            
                            <div className="flex items-center gap-4 mt-3 text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Max {room.maxGuests} Guests</span>
                                <span>{room.amenities[0]}</span>
                                <span>{room.amenities[1]}</span>
                                <span className="text-primary cursor-pointer hover:underline" onClick={() => setViewDetailsRoom(room)}>+More</span>
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold">₹{room.price}</span>
                                    <span className="text-xs text-muted-foreground line-through">₹{room.originalPrice}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">per room per night + taxes</p>
                            </div>

                            {isSelected ? (
                                <div className="flex items-center gap-3 bg-background border rounded-lg p-1 shadow-sm">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-md hover:bg-muted"
                                        onClick={() => onUpdateQuantity(room.id, -1)}
                                    >
                                        -
                                    </Button>
                                    <span className="font-bold w-4 text-center">{quantity}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-md hover:bg-muted text-green-600"
                                        disabled={quantity >= room.available}
                                        onClick={() => onUpdateQuantity(room.id, 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            ) : (
                                <Button 
                                    className="px-8 font-bold"
                                    onClick={() => onUpdateQuantity(room.id, 1)}
                                >
                                    ADD
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
           )
       })}

       {/* Details Modal */}
       {viewDetailsRoom && (
           <RoomDetailsModal 
               room={viewDetailsRoom} 
               isOpen={!!viewDetailsRoom} 
               onOpenChange={(open) => { if (!open) setViewDetailsRoom(null) }}
               currentQuantity={cart[viewDetailsRoom.id] || 0}
               onAdd={() => onUpdateQuantity(viewDetailsRoom.id, 1)}
           />
       )}
    </div>
  )
}
