"use client"

import dynamic from "next/dynamic"
import { MAP_PROVIDER } from "@/lib/constants"

// Dynamically import map components to avoid SSR issues
const GoogleMapPicker = dynamic(() => import("./GoogleMapPicker"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-lg" />
})

const OpenStreetMapPicker = dynamic(() => import("./OpenStreetMapPicker"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-lg" />
})

interface MapPickerProps {
    onLocationSelect: (location: { address: string; lat: number; lng: number; inServiceArea: boolean }) => void
    initialLocation?: { lat: number; lng: number }
}

export default function MapPicker(props: MapPickerProps) {
    if (MAP_PROVIDER === "osm") {
        return <OpenStreetMapPicker {...props} />
    }

    return <GoogleMapPicker {...props} />
}
