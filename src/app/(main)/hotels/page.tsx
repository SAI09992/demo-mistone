"use client"

import { Search, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HotelList } from "@/components/hotels/HotelList"
import { HotelFilters } from "@/components/hotels/HotelFilters"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function HotelsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <main className="min-h-screen bg-muted/10 pb-24">
       {/* Search Header */}
       <div className="sticky top-0 z-40 bg-background border-b shadow-sm">
          <div className="container mx-auto p-4">
             <div className="flex flex-col md:flex-row gap-4 bg-muted/30 p-2 md:p-3 rounded-2xl border">
                
                {/* Location */}
                <div className="flex-1 relative flex items-center px-3 border-r border-border/50">
                   <MapPin className="h-5 w-5 text-muted-foreground absolute left-3" />
                   <Input 
                      placeholder="Search by city, hotel, or neighborhood" 
                      className="border-0 bg-transparent pl-8 focus-visible:ring-0 placeholder:text-muted-foreground"
                   />
                </div>

                {/* Date Picker */}
                <div className="flex-1 relative flex items-center px-3 border-r border-border/50">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start text-left font-normal pl-0 hover:bg-transparent">
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Guests */}
                <div className="flex-1 relative flex items-center px-3">
                   <Users className="h-5 w-5 text-muted-foreground mr-2" />
                   <div className="flex-1">
                      <span className="font-bold">1 Room, 2 Guests</span>
                   </div>
                </div>

                <Button size="lg" className="rounded-xl px-8 font-bold shadow-lg">Search</Button>
             </div>
          </div>
       </div>

       <div className="container mx-auto p-4 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-28">
                <div className="flex items-center justify-between mb-4">
                   <h2 className="font-bold text-xl">Filters</h2>
                   <Button variant="link" className="text-xs text-primary h-auto p-0">Clear All</Button>
                </div>
                <HotelFilters />
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <HotelList />
          </div>
       </div>
    </main>
  )
}
