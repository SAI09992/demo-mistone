import { Home, Utensils, BedDouble, Plane } from "lucide-react"

export const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Food", icon: Utensils, href: "/food" },
  { label: "Rooms", icon: BedDouble, href: "/hotels" },
  { label: "Travel", icon: Plane, href: "/travel" },
]

export const MAP_PROVIDER: 'google' | 'osm' = 'osm'
