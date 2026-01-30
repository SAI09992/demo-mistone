"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Wifi, Tv, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HOTELS } from "@/lib/mock-data"

export function HotelList() {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold flex items-center gap-2">
          {HOTELS.length} Hotels found <span className="text-muted-foreground text-sm font-normal">in Bangalore</span>
       </h2>

       <div className="flex flex-col gap-6">
          {HOTELS.map((hotel) => (
             <Card key={hotel.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all group flex flex-col md:flex-row h-full md:h-64">
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-48 md:h-full flex-shrink-0 bg-muted">
                   <Image 
                      src={hotel.images[0]} 
                      alt={hotel.name} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {hotel.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-white/90 text-black text-[10px] font-bold uppercase shadow-sm backdrop-blur-sm">
                             {tag}
                          </Badge>
                      ))}
                   </div>
                </div>

                {/* Content Section */}
                <CardContent className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                   <div>
                       <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">{hotel.name}</h3>
                          <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-1 rounded text-xs font-bold">
                             {hotel.rating} <Star className="h-3 w-3 fill-white" />
                          </div>
                       </div>
                       <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {hotel.location} • {hotel.distance}
                       </p>
                       
                       <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                          {hotel.amenities.slice(0, 4).map(amenity => (
                             <div key={amenity} className="flex items-center gap-1">
                                {(amenity === "Wifi" && <Wifi className="h-3 w-3" />) ||
                                 (amenity === "TV" && <Tv className="h-3 w-3" />) ||
                                 (amenity === "AC" && <Wind className="h-3 w-3" />) ||
                                 <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />}
                                {amenity}
                             </div>
                          ))}
                          {hotel.amenities.length > 4 && <span>+{hotel.amenities.length - 4} more</span>}
                       </div>
                   </div>

                   {/* Pricing & CTA */}
                   <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 md:mt-0 gap-4">
                       <div>
                          <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-bold">₹{hotel.price}</span>
                             <span className="text-muted-foreground text-sm line-through">₹{hotel.originalPrice}</span>
                             <span className="text-orange-500 text-sm font-bold">
                                {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                             </span>
                          </div>
                          <p className="text-xs text-muted-foreground">per room per night</p>
                       </div>
                       <div className="flex gap-3">
                          <Link href={`/hotels/${hotel.id}`} className="flex-1">
                             <Button variant="outline" className="w-full">View Details</Button>
                          </Link>
                          <Link href={`/hotels/${hotel.id}`} className="flex-1">
                             <Button className="w-full px-8 font-bold">Book Now</Button>
                          </Link>
                       </div>
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>
    </div>
  )
}
