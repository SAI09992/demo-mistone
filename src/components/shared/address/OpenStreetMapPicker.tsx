"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Search, Loader2, MapPin, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { isLocationInServiceArea } from "@/lib/address-utils"

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Helper component to handle map center changes
function MapController({ onCenterChanged }: { onCenterChanged: (lat: number, lng: number) => void }) {
    const map = useMapEvents({
        dragend: () => {
            const center = map.getCenter()
            onCenterChanged(center.lat, center.lng)
        },
        zoomend: () => {
            const center = map.getCenter()
            onCenterChanged(center.lat, center.lng)
        }
    })
    return null
}

function MapUpdater({ center }: { center: { lat: number, lng: number } }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center)
    }, [center, map])
    return null
}

interface OpenStreetMapPickerProps {
    onLocationSelect: (location: { address: string; lat: number; lng: number; inServiceArea: boolean }) => void
    initialLocation?: { lat: number; lng: number }
}

const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 } // Bangalore

export default function OpenStreetMapPicker({ onLocationSelect, initialLocation }: OpenStreetMapPickerProps) {
    const [center, setCenter] = useState(initialLocation || DEFAULT_CENTER)
    const [address, setAddress] = useState("")
    const [isInServiceArea, setIsInServiceArea] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Need to fix icon path issue in leaflet with next/webpack
    useEffect(() => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, [])

    const fetchAddress = async (lat: number, lng: number) => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            const data = await response.json()

            if (data && data.display_name) {
                const formattedAddress = data.display_name
                const serviceAreaStatus = isLocationInServiceArea(lat, lng)

                setAddress(formattedAddress)
                setIsInServiceArea(serviceAreaStatus)

                onLocationSelect({
                    address: formattedAddress,
                    lat,
                    lng,
                    inServiceArea: serviceAreaStatus
                })
            }
        } catch (error) {
            console.error("Failed to fetch address", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery) return

        setIsLoading(true)
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
            const data = await response.json()

            if (data && data.length > 0) {
                const firstResult = data[0]
                const lat = parseFloat(firstResult.lat)
                const lng = parseFloat(firstResult.lon)
                setCenter({ lat, lng })
                fetchAddress(lat, lng)
            }
        } catch (error) {
            console.error("Search failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Initial load & Geolocation
    useEffect(() => {
        if (!address) {
            if (!initialLocation && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const newCenter = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                        setCenter(newCenter)
                        fetchAddress(newCenter.lat, newCenter.lng)
                    },
                    (error) => {
                        console.error("Error getting location", error)
                        fetchAddress(center.lat, center.lng)
                    }
                )
            } else {
                fetchAddress(center.lat, center.lng)
            }
        }
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search address (e.g. MG Road, Bangalore)"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className="relative h-[300px] w-full overflow-hidden rounded-lg border z-0">
                <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController onCenterChanged={(lat, lng) => {
                        // Debounce could be added here
                        fetchAddress(lat, lng)
                    }} />
                    <MapUpdater center={center} />

                    <div className="leaflet-bottom leaflet-right">
                        {/* Hack to show fixed marker since MapContainer children are rendered on map pane */}
                    </div>
                </MapContainer>

                {/* Fixed Center Marker Overlay (Outside MapContainer to be static UI) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none pb-[35px] z-[1000]">
                    <MapPin className="h-8 w-8 text-primary fill-current animate-bounce" />
                </div>

                {!isInServiceArea && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white p-2 rounded-md text-xs font-semibold flex items-center gap-2 justify-center backdrop-blur-sm z-[1000]">
                        <AlertCircle className="h-4 w-4" />
                        Service unavailable in this area
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Selected Location (OSM)</p>
                    {isLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                </div>
                <div className="p-3 bg-muted rounded-md text-sm">
                    {address || "Locating..."}
                </div>
            </div>
        </div>
    )
}
