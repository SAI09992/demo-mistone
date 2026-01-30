"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ShoppingBag, BedDouble, Plane, Clock, MapPin, CheckCircle2, ChevronRight, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MOCK_ORDERS } from "@/lib/mock-data"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("food")

  return (
    <div className="min-h-screen bg-muted/10 pb-24">
       {/* Header */}
       <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">My Orders</h1>
      </header>

      <div className="container max-w-2xl mx-auto p-4">
          <Tabs defaultValue="food" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="food" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Food Orders
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center gap-2">
                      <BedDouble className="h-4 w-4" />
                      Bookings
                  </TabsTrigger>
                  {/* <TabsTrigger value="travel" disabled className="flex items-center gap-2 opacity-50">
                      <Plane className="h-4 w-4" />
                      Travel
                  </TabsTrigger> */}
              </TabsList>

              {/* Food Orders Tab */}
              <TabsContent value="food" className="space-y-4">
                  {MOCK_ORDERS.food.length > 0 ? (
                      MOCK_ORDERS.food.map((order) => (
                          <Card key={order.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/orders/${order.id}`)}>
                              <CardContent className="p-0 flex flex-col sm:flex-row">
                                  <div className="h-32 w-full sm:w-32 relative shrink-0">
                                      <Image src={order.image} alt={order.restaurantName} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 p-4 flex flex-col justify-between">
                                      <div className="flex justify-between items-start">
                                          <div>
                                              <h3 className="font-bold text-lg hover:underline">{order.restaurantName}</h3>
                                              <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                                          </div>
                                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="bg-green-100 text-green-700 hover:bg-green-100">
                                              {order.status}
                                          </Badge>
                                      </div>
                                      
                                      <Separator className="my-3"/>
                                      
                                      <div className="flex justify-between items-center text-sm">
                                          <div className="text-muted-foreground flex items-center gap-1">
                                              <Clock className="h-3 w-3" />
                                              {format(new Date(order.date), "MMM d, yyyy • h:mm a")}
                                          </div>
                                          <div className="flex items-center gap-4">
                                              <span className="font-bold">₹{order.total}</span>
                                              <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="text-primary border-primary hover:bg-primary/5 h-8"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    // Handle reorder logic
                                                }}
                                              >
                                                  Reorder
                                              </Button>
                                          </div>
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      ))
                  ) : (
                      <EmptyState 
                        icon={ShoppingBag} 
                        title="No food orders yet" 
                        description="Explore the best food around you." 
                        actionLabel="Order Food" 
                        actionLink="/food" 
                        router={router}
                      />
                  )}
              </TabsContent>

              {/* Hotel Bookings Tab */}
              <TabsContent value="hotels" className="space-y-4">
                  {MOCK_ORDERS.hotels.length > 0 ? (
                      MOCK_ORDERS.hotels.map((booking) => (
                          <div key={booking.id} onClick={() => router.push(`/orders/${booking.id}`)} className="cursor-pointer">
                              <Card className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                   <CardContent className="p-0 flex flex-col sm:flex-row">
                                      <div className="h-32 w-full sm:w-32 relative shrink-0">
                                          <Image src={booking.image} alt={booking.hotelName} fill className="object-cover" />
                                          <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                                              {booking.status}
                                          </div>
                                      </div>
                                      <div className="flex-1 p-4 flex flex-col justify-between">
                                          <div>
                                              <h3 className="font-bold text-lg leading-tight group-hover:underline">{booking.hotelName}</h3>
                                               <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                  <MapPin className="h-3 w-3" />
                                                  {booking.location}
                                              </div>
                                          </div>
                                          
                                          <Separator className="my-3"/>
    
                                          <div className="flex justify-between items-end">
                                              <div className="text-xs space-y-1">
                                                  <p><span className="font-semibold">Check-in:</span> {format(new Date(booking.checkIn), "MMM d, yyyy")}</p>
                                                  <p><span className="font-semibold">Check-out:</span> {format(new Date(booking.checkOut), "MMM d, yyyy")}</p>
                                              </div>
                                               <div className="flex flex-col items-end gap-2">
                                                  <span className="font-bold">₹{booking.total}</span>
                                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary/80 p-0">
                                                      View Details <ChevronRight className="h-3 w-3 ml-1" />
                                                  </Button>
                                              </div>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>
                          </div>
                      ))
                  ) : (
                      <EmptyState 
                        icon={BedDouble} 
                        title="No bookings yet" 
                        description="Plan your next getaway with us." 
                        actionLabel="Book a Stay" 
                        actionLink="/hotels" 
                        router={router}
                      />
                  )}
              </TabsContent>
          </Tabs>
      </div>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description, actionLabel, actionLink, router }: any) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-white rounded-lg border-dashed border-2">
            <div className="bg-primary/10 p-4 rounded-full">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            <Button onClick={() => router.push(actionLink)}>{actionLabel}</Button>
        </div>
    )
}
