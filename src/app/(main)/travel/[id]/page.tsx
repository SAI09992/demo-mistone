"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star, Phone, ShieldCheck, Clock, MapPin, BadgeIndianRupeeIcon, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TRAVEL_PROVIDERS } from "@/lib/mock-data"
import { toast } from "sonner"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProviderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const provider = TRAVEL_PROVIDERS.find(p => p.id === id)
    const [bookingType, setBookingType] = useState("trip")

    if (!provider) return <div className="p-8 text-center">Provider not found</div>

    const handleConfirm = () => {
        toast.success("Booking Request Sent!")
        setTimeout(() => {
            router.push("/orders")
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-muted/10 pb-24">
            {/* Transparent Header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4">
                <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-background/80 backdrop-blur-md" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </div>

            {/* Hero Image */}
            <div className="relative h-[40vh] w-full bg-gray-900">
                <Image src={provider.image} alt={provider.vehicleModel} fill className="object-cover opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                     <Badge className="bg-primary hover:bg-primary text-white border-0 mb-2">{provider.type}</Badge>
                     <h1 className="text-3xl font-bold">{provider.vehicleModel}</h1>
                     <div className="flex items-center gap-2 mt-1 opacity-90 text-sm">
                        <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-md">{provider.plateNumber}</span>
                        <span>•</span>
                        <span>{provider.amenities.join(" • ")}</span>
                     </div>
                </div>
            </div>

            <div className="container max-w-lg mx-auto p-4 space-y-6 -mt-2 relative z-10">
                
                {/* Driver Profile */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                 <AvatarImage src={provider.driver.image} />
                                 <AvatarFallback>{provider.driver.name[0]}</AvatarFallback>
                             </Avatar>
                             <div>
                                 <h3 className="font-bold flex items-center gap-1">
                                     {provider.driver.name} 
                                     <ShieldCheck className="h-3 w-3 text-blue-500" />
                                 </h3>
                                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                     <span className="flex items-center gap-0.5 text-yellow-600 font-bold bg-yellow-100 px-1 py-0.5 rounded">
                                         {provider.driver.rating} <Star className="h-2 w-2 fill-current" />
                                     </span>
                                     <span>{provider.driver.trips} Trips</span>
                                 </div>
                             </div>
                         </div>
                         <a href={`tel:${provider.driver.phone}`}>
                            <Button variant="outline" size="icon" className="rounded-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100">
                                <Phone className="h-5 w-5" />
                            </Button>
                         </a>
                    </CardContent>
                </Card>

                {/* Booking Options */}
                <Card className="border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="text-base">Booking Options</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Tabs value={bookingType} onValueChange={setBookingType} className="w-full">
                            <TabsList className="w-full rounded-none h-12 bg-transparent border-b">
                                <TabsTrigger value="trip" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary h-full">Point-to-Point</TabsTrigger>
                                <TabsTrigger value="rental" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary h-full">Hourly Rental</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="trip" className="p-4 space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                                        <div className="h-8 w-0.5 bg-muted" />
                                        <div className="h-2 w-2 bg-red-500 rounded-full" />
                                    </div>
                                    <div className="w-full space-y-4">
                                        <div className="h-10 border rounded-lg px-3 flex items-center bg-muted/20 text-muted-foreground w-full">
                                            Current Location
                                        </div>
                                         <div className="h-10 border rounded-lg px-3 flex items-center bg-muted/20 text-muted-foreground w-full">
                                            Destination
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/5 p-3 rounded-lg flex justify-between items-center mt-4">
                                    <span className="text-sm font-medium">Estimated Fare</span>
                                    <span className="font-bold text-lg">₹{(provider.baseFare + (provider.pricePerKm * 5)).toFixed(0)} <span className="text-xs font-normal text-muted-foreground">approx 5km</span></span>
                                </div>
                            </TabsContent>

                            <TabsContent value="rental" className="p-4 space-y-3">
                                {provider.hourlyPackages.length > 0 ? (
                                    provider.hourlyPackages.map((pkg, idx) => (
                                        <div key={idx} className="border rounded-lg p-3 flex justify-between items-center hover:border-primary cursor-pointer transition-colors bg-card hover:bg-accent/5">
                                            <div>
                                                <p className="font-bold">{pkg.hours} Hr / {pkg.km} km</p>
                                                <p className="text-xs text-muted-foreground">Includes fuel & driver</p>
                                            </div>
                                            <Badge variant="outline" className="text-base font-bold px-3 py-1">₹{pkg.price}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        Rentals not available for this vehicle type.
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                
                {/* Amenities */}
                <div className="grid grid-cols-2 gap-3">
                    {provider.amenities.map(item => (
                        <div key={item} className="bg-white p-3 rounded-xl border shadow-sm flex items-center gap-2 text-sm font-medium">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            {item}
                        </div>
                    ))}
                </div>

            </div>

             {/* Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50 safe-area-pb">
                <div className="container max-w-lg mx-auto flex items-center gap-4">
                     <div className="flex-1">
                         <p className="text-xs text-muted-foreground">Total Payable</p>
                         <p className="text-xl font-bold">
                             {bookingType === 'trip' 
                                ? `~₹${(provider.baseFare + (provider.pricePerKm * 5)).toFixed(0)}` 
                                : 'Select Package'}
                         </p>
                     </div>
                     <Button size="lg" className="flex-1 font-bold rounded-xl shadow-lg" onClick={handleConfirm}>
                         Confirm Ride
                     </Button>
                </div>
            </div>
        </div>
    )
}
