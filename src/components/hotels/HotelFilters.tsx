"use client"

import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function HotelFilters() {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Price Range</h3>
        <Slider defaultValue={[1500]} max={10000} step={100} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
           <span>₹500</span>
           <span>₹10,000+</span>
        </div>
      </div>
      
      <Separator />

      {/* Collections */}
      <div className="space-y-4">
         <h3 className="font-bold text-lg">Collections</h3>
         <div className="space-y-2">
            {[ "Family OYO", "Couple Friendly", "Group Travellers", "Local IDs Accepted" ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {item}
                    </Label>
                </div>
            ))}
         </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
         <h3 className="font-bold text-lg">Categories</h3>
         <div className="space-y-2">
            {[ "Mistnove Townhouse", "Collection O", "Mistnove Homes", "SilverKey", "Capital O" ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="text-sm font-medium leading-none">
                        {item}
                    </Label>
                </div>
            ))}
         </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-4">
         <h3 className="font-bold text-lg">Amenities</h3>
         <div className="grid grid-cols-2 gap-2">
            {[ "AC", "TV", "Wifi", "Kitchen", "Geyser", "Power Backup", "Parking", "Elevator" ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="text-sm font-medium leading-none">
                        {item}
                    </Label>
                </div>
            ))}
         </div>
      </div>
    </div>
  )
}
