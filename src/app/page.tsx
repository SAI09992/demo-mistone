"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Utensils, BedDouble, Car, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/shared/Footer"
import { useUserStore } from "@/store/useUserStore"
import { useEffect, useState } from "react"
import ProfileDrawer from "@/components/shared/ProfileDrawer"

export default function Home() {
  const { isAuthenticated, phone } = useUserStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const services = [
    {
      title: "Food Delivery",
      description: "Order from top restaurants",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop",
      href: "/food",
      color: "from-orange-500/20 to-orange-500/5",
      iconColor: "text-orange-500"
    },
    {
      title: "Luxury Stays",
      description: "Book premium hotels",
      icon: BedDouble,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop",
      href: "/hotels",
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-500"
    },
    {
      title: "Travel & Cabs",
      description: "Safe & comfortable rides",
      icon: Car,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&fit=crop",
      href: "/travel",
      color: "from-green-500/20 to-green-500/5",
      iconColor: "text-green-500"
    }
  ]

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 font-bold text-white flex items-center justify-center">
              M
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Mistnove
            </span>
          </div>
          
          {isAuthenticated ? (
            // <div className="flex items-center gap-2">
              <ProfileDrawer/>
            //    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            //       <User className="h-4 w-4" />
            //    </div>
            // </div>
          ) : (
             <Link href="/login">
                <Button size="sm" className="rounded-full">Login</Button>
             </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-8">
        
        {/* Welcome Section */}
        <section className="py-8">
           <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {isAuthenticated ? `Welcome Back!` : "Explore Mistnove"}
           </h1>
           <p className="text-muted-foreground text-lg">
              Premium services curated just for you.
           </p>
        </section>

        {/* Live Orders Carousel (Auth Only) */}
        {isAuthenticated && (
           <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide flex gap-4 snap-x snap-mandatory">
              {/* Mock active orders */}
              {[
                  { id: "ord_f1", name: "Meghana Foods", items: "3 Items", status: "Preparing", time: "25 mins", progress: 60 },
                  { id: "ord_f3", name: "Empire Restaurant", items: "2 Items", status: "Out for Delivery", time: "10 mins", progress: 85 }
              ].map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`} className="snap-center shrink-0 w-[85vw] md:w-[400px]">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Clock className="h-32 w-32" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="font-bold text-xl">Live Order</h2>
                                <p className="text-gray-400 text-sm">{order.name} • {order.items}</p>
                            </div>
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 animate-pulse">
                                {order.status}
                            </span>
                            </div>
                            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2 overflow-hidden">
                            <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${order.progress}%` }} />
                            </div>
                            <p className="text-xs text-gray-400">Arriving in {order.time}</p>
                        </div>
                    </motion.div>
                </Link>
              ))}
           </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href}>
                <motion.div
                   whileHover={{ y: -5 }}
                   transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full group">
                    {/* <div className="relative h-48 w-full overflow-hidden">
                       <Image 
                          src={service.image} 
                          alt={service.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div> */}
                    <CardContent className={`p-6 bg-gradient-to-br ${service.color}`}>
                       <div className="flex justify-between items-start">
                          <div>
                             <h3 className="font-bold text-xl mb-1">{service.title}</h3>
                             <p className="text-muted-foreground text-sm">{service.description}</p>
                          </div>
                          <div className={`p-2 rounded-full bg-background/80 backdrop-blur-sm ${service.iconColor} shadow-sm`}>
                             <service.icon className="h-6 w-6" />
                          </div>
                       </div>
                       <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                          Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
