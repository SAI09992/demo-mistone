"use client"

import { useState, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, User, Mail, Phone, Calendar, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { HOTELS } from "@/lib/mock-data"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotelId = searchParams.get("hotelId")
  const roomsParam = searchParams.get("rooms") // format: id:qty,id:qty

  const hotel = HOTELS.find(h => h.id === hotelId)

  // Parse rooms
  const selectedRooms = useMemo(() => {
     if (!roomsParam || !hotel) return []
     
     const parsed = roomsParam.split(',').map(item => {
         const [id, qty] = item.split(':')
         const room = hotel.rooms?.find(r => r.id === id)
         return {
             ...room,
             quantity: parseInt(qty)
         }
     }).filter(r => r && r.id && r.quantity > 0)
     
     return parsed
  }, [roomsParam, hotel])

  const [guestDetails, setGuestDetails] = useState({
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      request: ""
  })
  
  const [payAdvance, setPayAdvance] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")

  if (!hotel || selectedRooms.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen">
              <p>Invalid booking details.</p>
              <Button onClick={() => router.back()}>Go Back</Button>
          </div>
      )
  }

  // Calculations
  const totalRoomPrice = selectedRooms.reduce((acc, curr) => acc + (curr.price! * curr.quantity), 0)
  const taxes = Math.round(totalRoomPrice * 0.12)
  const serviceFee = Math.round(totalRoomPrice * 0.05)
  const grandTotal = totalRoomPrice + taxes + serviceFee
  
  const advanceAmount = Math.round(grandTotal * 0.20)
  const payNowAmount = payAdvance ? advanceAmount : grandTotal
  const payAtHotelAmount = payAdvance ? (grandTotal - advanceAmount) : 0

  const handlePayment = () => {
      // Create mock booking ID
      const bookingId = "BK" + Math.floor(Math.random() * 100000)
      router.push(`/hotels/booking/${bookingId}?status=success`)
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-24">
       {/* Header */}
       <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-bold text-lg">Confirm Booking</h1>
          <p className="text-xs text-muted-foreground">{hotel.name}</p>
        </div>
      </header>
      
      <div className="container mx-auto max-w-4xl p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
              
              {/* Hotel Summary */}
              <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="relative h-40 w-full">
                      <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="font-bold text-xl">{hotel.name}</h2>
                          <p className="text-sm opacity-90">{hotel.location}</p>
                      </div>
                  </div>
                  <CardContent className="p-4 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                              <p className="font-bold">Check-in</p>
                              <p className="text-muted-foreground">Feb 14, 12:00 PM</p>
                          </div>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                              <p className="font-bold">Check-out</p>
                              <p className="text-muted-foreground">Feb 15, 11:00 AM</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>

              {/* Room Breakdown */}
              <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-base">Room Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {selectedRooms.map((room, idx) => (
                          <div key={idx} className="flex justify-between items-start">
                              <div>
                                  <p className="font-bold">{room.quantity}x {room.type}</p>
                                  <p className="text-xs text-muted-foreground">{room.maxGuests} Guests per room</p>
                              </div>
                              <p className="font-bold">₹{room.price! * room.quantity}</p>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              {/* Guest Details */}
              <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-base">Guest Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input id="name" value={guestDetails.name} onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})} className="pl-9" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input id="phone" value={guestDetails.phone} onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})} className="pl-9" />
                              </div>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                           <div className="relative">
                                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input id="email" value={guestDetails.email} onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})} className="pl-9" />
                            </div>
                          <p className="text-[11px] text-muted-foreground">Booking confirmation will be sent to this email.</p>
                      </div>
                  </CardContent>
              </Card>

              {/* Advance Payment Option */}
              <Card className="border-2 border-primary/20 bg-primary/5 shadow-sm">
                  <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox id="advance" checked={payAdvance} onCheckedChange={(c) => setPayAdvance(!!c)} />
                            <div className="space-y-1 leading-none">
                                <Label htmlFor="advance" className="font-bold text-base cursor-pointer">
                                    Pay only 20% now to confirm
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Pay ₹{advanceAmount} now and the rest ₹{payAtHotelAmount} at the hotel.
                                </p>
                            </div>
                        </div>
                  </CardContent>
              </Card>
          </div>

          {/* Sidebar Bill */}
          <div className="space-y-6">
              <Card className="border-0 shadow-sm sticky top-24">
                  <CardHeader className="pb-3 border-b bg-muted/30">
                      <CardTitle className="text-base">Bill Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                          <span className="text-muted-foreground">Room Total</span>
                          <span>₹{totalRoomPrice}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-muted-foreground">Taxes & Fees (17%)</span>
                          <span>₹{taxes + serviceFee}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-base pt-1">
                          <span>Grand Total</span>
                          <span>₹{grandTotal}</span>
                      </div>
                      
                      {payAdvance && (
                          <div className="bg-green-50 p-2 rounded border border-green-200 mt-2 space-y-1">
                              <div className="flex justify-between text-green-700 font-bold">
                                  <span>To Pay Now</span>
                                  <span>₹{payNowAmount}</span>
                              </div>
                               <div className="flex justify-between text-muted-foreground text-xs">
                                  <span>Due at Hotel</span>
                                  <span>₹{payAtHotelAmount}</span>
                              </div>
                          </div>
                      )}

                      {/* Payment Method Selector Snippet */}
                      <div className="pt-4 space-y-3">
                           <Label className="uppercase text-xs font-bold text-muted-foreground">Select Payment Method</Label>
                           <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-2">
                               <div className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : ''}`}>
                                   <div className="flex items-center gap-2">
                                       <RadioGroupItem value="upi" id="upi" />
                                       <Label htmlFor="upi" className="cursor-pointer">UPI / GPay</Label>
                                   </div>
                               </div>
                               <div className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}>
                                   <div className="flex items-center gap-2">
                                       <RadioGroupItem value="card" id="card" />
                                       <Label htmlFor="card" className="cursor-pointer">Credit / Debit Card</Label>
                                   </div>
                               </div>
                           </RadioGroup>
                      </div>

                      <Button size="lg" className="w-full font-bold mt-4" onClick={handlePayment}>
                          {payAdvance ? `Pay Advance ₹${payNowAmount}` : `Pay Total ₹${payNowAmount}`}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Non-refundable if cancelled within 24hrs
                      </p>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}

export default function HotelCheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
