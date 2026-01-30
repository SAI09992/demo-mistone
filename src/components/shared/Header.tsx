"use client"

import { MapPin, Search, User, ShoppingCart, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"
import { Address, MOCKED_ADDRESSES } from "@/lib/address-utils"
import AddressDialog from "./address/AddressDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileDrawer from "./ProfileDrawer"

export function Header() {
  const pathname = usePathname()
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address>(MOCKED_ADDRESSES[0])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <AddressDialog
        open={isAddressOpen}
        onOpenChange={setIsAddressOpen}
        onSelect={setSelectedAddress}
        currentAddressId={selectedAddress.id}
      />
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Left: Logo & Location */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 font-bold text-white flex items-center justify-center">
              M
            </div>
            <span className="text-xl font-bold hidden md:block">Mistnove</span>
          </div>

          <div
            className="hidden md:flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors border border-transparent hover:border-border"
            onClick={() => setIsAddressOpen(true)}
          >
            <span className="font-bold border-b-2 border-primary">{selectedAddress.label}</span>
            <span className="text-muted-foreground ml-2 truncate max-w-[200px]">
              {selectedAddress.address}
            </span>
            <ChevronDown className="h-4 w-4 text-primary" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 transition-colors hover:text-primary",
                    isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="md:hidden flex flex-col leading-tight cursor-pointer" onClick={() => setIsAddressOpen(true)}>
            <div className="flex items-center gap-1 font-bold text-sm">
              <MapPin className="h-3 w-3 text-primary" />
              {selectedAddress.label} <ChevronDown className="h-3 w-3" />
            </div>
            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
              {selectedAddress.address}
            </span>
          </div>
        </div>

        {/* Middle: Search (Desktop) */}
        {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for restaurants and food"
                  className="w-full bg-muted pl-9 rounded-xl border-none focus-visible:ring-1"
                />
            </div>
        </div> */}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
            </Button> */}
          <Button variant="ghost" className="hidden md:flex gap-2">
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span>Cart</span>
          </Button>

          <ProfileDrawer />
        </div>
      </div>
    </header>
  )
}
