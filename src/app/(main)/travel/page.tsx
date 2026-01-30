"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Car, Filter, MapPin, Fuel, Clock, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { TRAVEL_PROVIDERS } from "@/lib/mock-data"

export default function TravelPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(30)
  const [acFilter, setAcFilter] = useState(false)

  // Filter Logic
  const filteredProviders = TRAVEL_PROVIDERS.filter(provider => {
      if (selectedType && provider.type !== selectedType) return false
      if (provider.pricePerKm > maxPrice) return false
      if (acFilter && !provider.amenities.includes("AC")) return false
      return true
  })

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Link href="/">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </Link>
            <div>
                 <h1 className="font-bold text-lg leading-none">Travel</h1>
                 <div className="flex items-center text-xs text-muted-foreground mt-1">
                     <MapPin className="h-3 w-3 mr-1" />
                     <span>Your Location</span>
                 </div>
            </div>
        </div>
        
        {/* Filters Sheet */}
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 relative">
                     <Filter className="h-4 w-4" />
                     {(selectedType || acFilter) && <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your ride search.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                    {/* Vehicle Type */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Vehicle Type</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Cab", "Auto", "Bike"].map(type => (
                                <Button 
                                    key={type} 
                                    variant={selectedType === type ? "default" : "outline"} 
                                    className="rounded-full h-8 text-xs"
                                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-sm">Max Price / km</h3>
                            <span className="text-sm font-bold">₹{maxPrice}</span>
                         </div>
                         <Slider 
                            value={[maxPrice]} 
                            max={50} 
                            step={1} 
                            onValueChange={(val) => setMaxPrice(val[0])} 
                         />
                    </div>

                    {/* Amenities */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Amenities</h3>
                        <div className="flex items-center gap-2">
                             <Checkbox id="ac" checked={acFilter} onCheckedChange={(c) => setAcFilter(!!c)} />
                             <label htmlFor="ac" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                 AC Available
                             </label>
                        </div>
                    </div>

                    <Button className="w-full font-bold" onClick={() => {}}>Apply Filters</Button>
                </div>
            </SheetContent>
        </Sheet>
      </header>
      
      {/* Category Pills (Quick Filter) */}
      <div className="bg-background px-4 py-3 flex gap-3 overflow-x-auto scrollbar-hide border-b">
         {["All", "Cab", "Auto", "Bike"].map(type => (
             <button 
                key={type}
                onClick={() => setSelectedType(type === "All" ? null : type)}
                className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    (type === "All" && !selectedType) || selectedType === type 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
             >
                {type}
             </button>
         ))}
      </div>

      {/* Listing */}
      <div className="container max-w-lg mx-auto p-4 space-y-4">
          {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                  <Link key={provider.id} href={`/travel/${provider.id}`}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                        <CardContent className="p-0 flex h-32">
                             {/* Image */}
                             <div className="w-1/3 relative bg-muted">
                                <Image src={provider.image} alt={provider.vehicleModel} fill className="object-cover" />
                                <div className="absolute top-2 left-2">
                                     <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px] h-5 px-1.5">
                                         {provider.eta} mins
                                     </Badge>
                                </div>
                             </div>

                             {/* Details */}
                             <div className="flex-1 p-3 flex flex-col justify-between">
                                 <div>
                                     <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg leading-tight">{provider.vehicleModel}</h3>
                                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                            {provider.driver.rating} <Star className="h-2 w-2 fill-current" />
                                        </div>
                                     </div>
                                     <p className="text-xs text-muted-foreground mt-1">{provider.type} • {provider.amenities[0]}</p>
                                 </div>

                                 <div className="flex items-end justify-between">
                                     <div>
                                         <p className="font-bold text-xl">₹{provider.pricePerKm}</p>
                                         <p className="text-[10px] text-muted-foreground">per km</p>
                                     </div>
                                     <Button size="sm" className="h-8 rounded-full px-4 shadow-sm bg-gray-900 text-white hover:bg-gray-800">
                                         Book Now
                                     </Button>
                                 </div>
                             </div>
                        </CardContent>
                    </Card>
                  </Link>
              ))
          ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Car className="h-12 w-12 mb-4 opacity-20" />
                    <p>No rides available matching your filters.</p>
                    <Button variant="link" onClick={() => { setSelectedType(null); setMaxPrice(50); setAcFilter(false); }}>
                        Reset Filters
                    </Button>
                </div>
          )}
      </div>
    </div>
  )
}
