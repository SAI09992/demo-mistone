"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Clock, MapPin, Receipt, ChefHat, Truck, PackageCheck, AlertCircle, Calendar, Share2, Copy, Navigation, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MOCK_ORDERS } from "@/lib/mock-data"
import { format } from "date-fns"
import { toast } from "sonner"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Determine type of order
  const foodOrder = MOCK_ORDERS.food.find(o => o.id === id)
  const hotelBooking = MOCK_ORDERS.hotels.find(o => o.id === id)

  if (!foodOrder && !hotelBooking) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
              <p>Order not found</p>
              <Button onClick={() => router.back()}>Go Back</Button>
          </div>
      )
  }

  // Common Header
  const Header = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => {
            toast.success("Downloading Invoice...")
            setTimeout(() => toast.success("Invoice Downloaded"), 1500)
        }}>
            <Receipt className="h-4 w-4 mr-2" />
            Invoice
        </Button>
      </header>
  )

  // --- HOTEL BOOKING VIEW ---
  if (hotelBooking) {
      const handleShare = async () => {
          const shareData = {
              title: `Booking at ${hotelBooking.hotelName}`,
              text: `Here is my booking details for ${hotelBooking.hotelName}.\nBooking ID: ${hotelBooking.id}\nOTP: ${hotelBooking.otp}\nLocation: https://maps.google.com/?q=${hotelBooking.coordinates?.lat},${hotelBooking.coordinates?.lng}`,
              url: `https://mistnove.app/orders/${hotelBooking.id}`
          }

          if (navigator.share) {
              try {
                  await navigator.share(shareData)
              } catch (err) {
                  console.log("Error sharing", err)
              }
          } else {
              // Fallback to clipboard
              navigator.clipboard.writeText(shareData.text)
              toast.success("Booking details copied to clipboard!")
          }
      }

      const handleGetDirections = () => {
          if (hotelBooking.coordinates) {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${hotelBooking.coordinates.lat},${hotelBooking.coordinates.lng}`, '_blank')
          } else {
              toast.error("Location coordinates not available")
          }
      }

      return (
        <div className="min-h-screen bg-muted/10 pb-24">
            <Header title="Booking Details" subtitle={`ID: ${hotelBooking.id.toUpperCase()}`} />
            
            <div className="container max-w-2xl mx-auto p-4 space-y-6">
                 {/* Hotel Hero */}
                 <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-sm">
                      <Image src={hotelBooking.image} alt={hotelBooking.hotelName} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="font-bold text-2xl">{hotelBooking.hotelName}</h2>
                          <div className="flex items-center gap-1 text-sm opacity-90">
                              <MapPin className="h-3 w-3" />
                              {hotelBooking.location}
                          </div>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-white text-black hover:bg-white">
                          {hotelBooking.status}
                      </Badge>
                 </div>

                 {/* OTP Section (Only for Upcoming) */}
                 {hotelBooking.status === "Upcoming" && (
                     <Card className="border-2 border-primary/20 bg-primary/5">
                         <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                             <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Check-in OTP</p>
                             <div className="text-5xl font-mono font-bold tracking-widest text-primary">
                                 {hotelBooking.otp}
                             </div>
                             <p className="text-xs text-muted-foreground">Share this OTP at the reception for hassle-free check-in.</p>
                         </CardContent>
                     </Card>
                 )}

                 {/* Actions */}
                 <div className="grid grid-cols-2 gap-4">
                     <Button variant="outline" className="h-12 border-primary/20 hover:bg-primary/5 text-primary" onClick={handleShare}>
                         <Share2 className="h-4 w-4 mr-2" />
                         Share Booking
                     </Button>
                     <Button className="h-12" onClick={handleGetDirections}>
                         <Navigation className="h-4 w-4 mr-2" />
                         Get Directions
                     </Button>
                 </div>

                 {/* Booking Info */}
                 <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-base">Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Check-in</p>
                            <p className="font-bold">{format(new Date(hotelBooking.checkIn), "EEE, MMM d")}</p>
                            <p className="text-xs">12:00 PM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Check-out</p>
                            <p className="font-bold">{format(new Date(hotelBooking.checkOut), "EEE, MMM d")}</p>
                            <p className="text-xs">11:00 AM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Guests & Rooms</p>
                            <p className="font-bold">{hotelBooking.rooms} Room(s)</p>
                            <p className="text-xs">{hotelBooking.roomType}</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Amount Paid</p>
                            <p className="font-bold">₹{hotelBooking.total}</p>
                        </div>
                    </CardContent>
                 </Card>

                 {/* Help */}
                 <Card className="border-0 shadow-sm cursor-pointer hover:bg-accent/5 transition-colors">
                     <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                 <Phone className="h-5 w-5" />
                             </div>
                             <div>
                                 <p className="font-bold text-sm">Need Help?</p>
                                 <p className="text-xs text-muted-foreground">Call hotel reception</p>
                             </div>
                         </div>
                         <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                     </CardContent>
                 </Card>
            </div>
        </div>
      )
  }

  // --- FOOD ORDER VIEW (Existing Logic) ---
  const order = foodOrder!
  
  // Mock Tracking Steps
  const steps = [
      { id: 1, label: "Order Placed", icon: Receipt, time: format(new Date(order.date), "h:mm a"), completed: true },
      { id: 2, label: "Preparing", icon: ChefHat, time: "1:40 PM", completed: true },
      { id: 3, label: "Out for Delivery", icon: Truck, time: "2:10 PM", completed: true },
      { id: 4, label: "Delivered", icon: CheckCircle2, time: "2:30 PM", completed: order.status === "Delivered" },
  ]

  const itemTotal = order.total
  const taxes = 50
  const delivery = 40
  const grandTotal = itemTotal + taxes + delivery

  return (
    <div className="min-h-screen bg-muted/10 pb-24">
       <Header title={`Order #${order.id.toUpperCase()}`} subtitle={order.restaurantName} />

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
          
          {/* Tracking Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex justify-between items-center">
                    Order Status
                    <Badge className={order.status === 'Delivered' ? 'bg-green-600' : 'bg-blue-600'}>
                        {order.status}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative flex flex-col gap-6 pl-4 border-l-2 border-muted ml-4 my-2">
                    {steps.map((step, idx) => {
                        const Icon = step.icon
                        return (
                            <div key={step.id} className="relative pl-6">
                                <div className={`absolute -left-[21px] top-0 h-4 w-4 rounded-full border-2 bg-background flex items-center justify-center ${step.completed ? 'border-primary' : 'border-muted'}`}>
                                    {step.completed && <div className="h-2 w-2 rounded-full bg-primary" />}
                                </div>
                                <div className={`flex justify-between items-start ${step.completed ? 'opacity-100' : 'opacity-50'}`}>
                                    <div>
                                        <p className="font-bold text-sm leading-none">{step.label}</p>
                                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                            {step.completed ? `Completed at ${step.time}` : 'Pending'}
                                        </div>
                                    </div>
                                    <Icon className={`h-5 w-5 ${step.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-sm">
                          <div className="flex gap-2 items-start">
                             <div className="h-4 w-4 mt-0.5 rounded-sm border-2 border-green-600 flex items-center justify-center">
                                 <div className="h-2 w-2 rounded-full bg-green-600" />
                             </div>
                             <span>{item}</span>
                          </div>
                      </div>
                  ))}
                  <Separator />
                  <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                          <span>Item Total</span>
                          <span>₹{itemTotal}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                          <span>Delivery Fee</span>
                          <span>₹{delivery}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                          <span>Taxes & Charges</span>
                          <span>₹{taxes}</span>
                      </div>
                       <Separator />
                      <div className="flex justify-between font-bold text-base">
                          <span>Grand Total</span>
                          <span>₹{grandTotal}</span>
                      </div>
                  </div>
              </CardContent>
          </Card>

           {/* Delivery Details */}
           <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                  <CardTitle className="text-base">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                   <div className="flex items-start gap-3">
                       <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                       <div className="text-sm">
                           <p className="font-bold">Home</p>
                           <p className="text-muted-foreground mt-1">
                               No. 123, 4th Cross, Indiranagar, Bangalore - 560038
                           </p>
                       </div>
                   </div>
              </CardContent>
          </Card>
      </div>
    </div>
  )
}
