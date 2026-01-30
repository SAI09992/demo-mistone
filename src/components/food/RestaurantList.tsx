"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RESTAURANTS } from "@/lib/mock-data"

interface RestaurantListProps {
  restaurants?: typeof RESTAURANTS
}

export function RestaurantList({ restaurants = RESTAURANTS }: RestaurantListProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between px-4 md:px-0">
        <h2 className="text-2xl font-bold tracking-tight">Top Restaurant Chains</h2>
      </div>

      {/* Filters Scrollable */}
      <div className="flex gap-3 overflow-x-auto px-4 md:px-0 pb-2 no-scrollbar">
        <Button variant="outline" size="sm" className="rounded-full shadow-sm">Filter</Button>
        <Button variant="outline" size="sm" className="rounded-full shadow-sm">Sort By</Button>
        <Button variant="default" size="sm" className="rounded-full shadow-sm">Fast Delivery</Button>
        <Button variant="outline" size="sm" className="rounded-full shadow-sm">Ratings 4.0+</Button>
        <Button variant="outline" size="sm" className="rounded-full shadow-sm">Pure Veg</Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/food/${restaurant.id}`}>
            <Card className="group overflow-hidden border-0 bg-transparent hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {restaurant.offer && (
                  <div className="absolute bottom-3 left-3 right-3">
                     <p className="text-white font-extrabold text-lg drop-shadow-md flex items-center gap-1">
                        <Percent className="h-5 w-5 fill-white" /> {restaurant.offer}
                     </p>
                  </div>
                )}
              </div>

              <CardContent className="p-3">
                <h3 className="font-bold text-lg leading-tight truncate">{restaurant.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                   <div className="flex items-center gap-1 bg-green-700 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                      <Star className="h-3 w-3 fill-white" />
                      {restaurant.rating}
                   </div>
                   <span className="text-xs font-semibold">• {restaurant.time}</span>
                </div>
                <p className="text-muted-foreground text-sm truncate mt-1">
                  {restaurant.cuisines.join(", ")}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                   {restaurant.location}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
