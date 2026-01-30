"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, MapPin, Utensils } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { RESTAURANTS, CATEGORIES } from "@/lib/mock-data"
import Link from "next/link"

interface FoodSearchProps {
  onSelect: (type: 'restaurant' | 'category' | 'clear', value?: any) => void
}

export function FoodSearch({ onSelect }: FoodSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [results, setResults] = useState<{
    restaurants: typeof RESTAURANTS,
    categories: typeof CATEGORIES
  }>({ restaurants: [], categories: [] })

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ restaurants: [], categories: [] })
      return
    }

    const filteredRestaurants = RESTAURANTS.filter(r => 
      r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      r.cuisines.some(c => c.toLowerCase().includes(debouncedQuery.toLowerCase()))
    )

    const filteredCategories = CATEGORIES.filter(c => 
      c.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    )

    setResults({
      restaurants: filteredRestaurants,
      categories: filteredCategories
    })
    setIsOpen(true)
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (type: 'restaurant' | 'category', value: any) => {
    setQuery(type === 'restaurant' ? value.name : value.name)
    setIsOpen(false)
    onSelect(type, value)
  }

  const handleClear = () => {
    setQuery("")
    onSelect('clear')
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for restaurants, cuisine or a dish..."
          className="pl-10 h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-muted shadow-sm"
        />
        {query && (
          <button 
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && (results.restaurants.length > 0 || results.categories.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground rounded-md border shadow-md overflow-hidden max-h-[60vh] overflow-y-auto">
          {results.restaurants.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Restaurants
              </h3>
              {results.restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => handleSelect('restaurant', restaurant)}
                  className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-md object-cover" />
                  <div>
                    <p className="text-sm font-medium">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.cuisines.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.categories.length > 0 && (
            <div className="py-2 border-t">
              <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Categories
              </h3>
              {results.categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelect('category', category)}
                  className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <img src={category.image} alt={category.name} className="w-8 h-8 rounded-full object-cover" />
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
