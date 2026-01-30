"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, TicketPercent, Wallet, CreditCard, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CART_ITEMS, BILL_DETAILS, SAVED_ADDRESSES } from "@/lib/mock-data"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id)
  const [paymentMethod, setPaymentMethod] = useState("upi")

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-bold text-lg">Checkout</h1>
          <p className="text-xs text-muted-foreground">Meghana Foods</p>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Address Section */}
        <Card className="border-0 shadow-sm">
           <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                 <h2 className="font-bold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Delivery Address
                 </h2>
                 <Button variant="link" className="h-auto p-0 text-primary">Change</Button>
              </div>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
                 {SAVED_ADDRESSES.map((addr) => (
                    <div key={addr.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/10">
                       <RadioGroupItem value={addr.id} id={addr.id} className="mt-1" />
                       <div className="space-y-1">
                          <Label htmlFor={addr.id} className="font-bold flex items-center gap-2">
                             {addr.type}
                             {addr.isDefault && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Default</span>}
                          </Label>
                          <p className="text-sm text-muted-foreground leading-tight">{addr.address}</p>
                       </div>
                    </div>
                 ))}
              </RadioGroup>
           </CardContent>
        </Card>

        {/* Cart Items */}
        <Card className="border-0 shadow-sm">
           <CardContent className="p-4 space-y-4">
              <h2 className="font-bold">Items Added</h2>
              {CART_ITEMS.map((item) => (
                 <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <div className={`h-3 w-3 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center rounded-sm`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                       </div>
                       <div className="text-sm">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">₹{item.price}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 border rounded-lg px-2 py-1 bg-background text-sm font-medium">
                       <button className="text-muted-foreground hover:text-primary">-</button>
                       <span>{item.quantity}</span>
                       <button className="text-green-600 hover:text-green-700">+</button>
                    </div>
                 </div>
              ))}
           </CardContent>
        </Card>

        {/* Offers */}
        <Card className="border-0 shadow-sm border-dashed border-primary/30 bg-primary/5">
           <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                 <TicketPercent className="h-5 w-5 text-primary" />
                 <div>
                    <p className="font-bold text-sm">Apply Coupon</p>
                    <p className="text-xs text-muted-foreground">View available offers</p>
                 </div>
              </div>
              <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
           </CardContent>
        </Card>

        {/* Bill Details */}
        <Card className="border-0 shadow-sm">
           <CardContent className="p-4 space-y-3 text-sm">
              <h2 className="font-bold mb-2">Bill Details</h2>
              <div className="flex justify-between">
                 <span className="text-muted-foreground">Item Total</span>
                 <span>₹{BILL_DETAILS.itemTotal}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-muted-foreground">Delivery Fee</span>
                 <span>₹{BILL_DETAILS.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-muted-foreground">Platform Fee</span>
                 <span>₹{BILL_DETAILS.platformFee}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-muted-foreground">GST and Restaurant Charges</span>
                 <span>₹{BILL_DETAILS.gst + BILL_DETAILS.restaurantCharges}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base pt-1">
                 <span>To Pay</span>
                 <span>₹{BILL_DETAILS.toPay}</span>
              </div>
           </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-4">
             <h2 className="font-bold px-1">Payment Options</h2>
             <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                 <Card className={`border-0 shadow-sm cursor-pointer transition-all ${paymentMethod === 'upi' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4 flex items-start gap-3">
                       <RadioGroupItem value="upi" id="upi" className="mt-1" />
                       <div className="space-y-1 flex-1">
                          <Label htmlFor="upi" className="font-bold flex items-center gap-2 cursor-pointer">
                             <Banknote className="h-4 w-4" /> UPI
                          </Label>
                          <p className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                       </div>
                    </CardContent>
                 </Card>

                 <Card className={`border-0 shadow-sm cursor-pointer transition-all ${paymentMethod === 'card' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4 flex items-start gap-3">
                       <RadioGroupItem value="card" id="card" className="mt-1" />
                       <div className="space-y-1 flex-1">
                          <Label htmlFor="card" className="font-bold flex items-center gap-2 cursor-pointer">
                             <CreditCard className="h-4 w-4" /> Cards
                          </Label>
                          <p className="text-xs text-muted-foreground">Credit / Debit Cards</p>
                       </div>
                    </CardContent>
                 </Card>

                 <Card className={`border-0 shadow-sm cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4 flex items-start gap-3">
                       <RadioGroupItem value="wallet" id="wallet" className="mt-1" />
                       <div className="space-y-1 flex-1">
                          <Label htmlFor="wallet" className="font-bold flex items-center gap-2 cursor-pointer">
                             <Wallet className="h-4 w-4" /> Wallet
                          </Label>
                          <p className="text-xs text-muted-foreground">Balance: ₹200.00</p>
                       </div>
                    </CardContent>
                 </Card>
             </RadioGroup>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
         <div className="container max-w-2xl mx-auto flex items-center justify-between">
            <div>
               <p className="text-xs font-bold text-muted-foreground">TOTAL</p>
               <p className="text-xl font-extrabold">₹{BILL_DETAILS.toPay}</p>
            </div>
            <Button size="lg" className="px-8 font-bold text-lg rounded-xl">
               Pay Now
            </Button>
         </div>
      </div>
    </div>
  )
}
