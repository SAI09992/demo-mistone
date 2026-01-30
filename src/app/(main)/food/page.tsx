"use client"

import { useState } from "react"
import { CategoryCarousel } from "@/components/food/CategoryCarousel"
import { RestaurantList } from "@/components/food/RestaurantList"
import { FloatingCartButton } from "@/components/food/FloatingCart"
import { FoodSearch } from "@/components/food/FoodSearch"
import { RESTAURANTS } from "@/lib/mock-data"

export default function FoodPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState(RESTAURANTS)

  const handleSearchSelect = (type: 'restaurant' | 'category' | 'clear', value: any) => {
    if (type === 'clear') {
      setFilteredRestaurants(RESTAURANTS)
      return
    }

    if (type === 'restaurant') {
      // Show only the selected restaurant
      setFilteredRestaurants([value])
    } else if (type === 'category') {
      // Filter restaurants that have this cuisine/category
      // Note: This matches simple string inclusion. 
      // In a real app, you might have better taxonomy linkage.
      const filtered = RESTAURANTS.filter(r => 
        r.cuisines.some(c => c.toLowerCase().includes(value.name.toLowerCase()))
      )
      setFilteredRestaurants(filtered)
    }
  }

  return (
    <main className="min-h-[200vh] relative">
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b py-2 px-4 shadow-sm">
         <div className="mx-auto max-w-2xl">
            <FoodSearch onSelect={handleSearchSelect} />
         </div>
      </div>

      <section className="bg-gradient-to-b from-background via-muted/20 to-background pt-4">
        <div className="mx-auto max-w-7xl">
           <CategoryCarousel />
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl">
        <RestaurantList restaurants={filteredRestaurants} />
      </section>

      <FloatingCartButton />
    </main>
  )
}
