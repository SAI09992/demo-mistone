"use client"

import { useState, useCallback, useRef, useMemo, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api"
import { Search, Loader2, MapPin, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { isLocationInServiceArea } from "@/lib/address-utils"
import { cn } from "@/lib/utils"

const LIBRARIES: ("places")[] = ["places"]

interface MapPickerProps {
    onLocationSelect: (location: { address: string; lat: number; lng: number; inServiceArea: boolean }) => void
    initialLocation?: { lat: number; lng: number }
}

const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 } // Bangalore

export default function GoogleMapPicker({ onLocationSelect, initialLocation }: MapPickerProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES,
    })

    const [center, setCenter] = useState(initialLocation || DEFAULT_CENTER)
    const [address, setAddress] = useState("")
    const [isInServiceArea, setIsInServiceArea] = useState(true)
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null)

    // Debounce ref for drag events
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const onMapLoad = useCallback((map: google.maps.Map) => {
        setMapRef(map)
    }, [])

    const onSearchLoad = useCallback((ref: google.maps.places.SearchBox) => {
        setSearchBox(ref)
    }, [])

    const fetchAddress = useCallback(
        (lat: number, lng: number) => {
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK" && results?.[0]) {
                    const formattedAddress = results[0].formatted_address
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
            })
        },
        [onLocationSelect]
    )

    const onPlacesChanged = () => {
        const places = searchBox?.getPlaces()
        if (places && places.length > 0) {
            const place = places[0]
            if (place.geometry?.location) {
                const lat = place.geometry.location.lat()
                const lng = place.geometry.location.lng()
                setCenter({ lat, lng })
                fetchAddress(lat, lng)
            }
        }
    }

    const onCenterChanged = () => {
        if (!mapRef) return

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            const newCenter = mapRef.getCenter()
            if (newCenter) {
                const lat = newCenter.lat()
                const lng = newCenter.lng()
                // Only fetch if significantly moved or first load
                fetchAddress(lat, lng)
            }
        }, 500)
    }

    // Initial address fetch & Geolocation
    useEffect(() => {
        if (isLoaded && !address) {
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
                        console.log("Error getting location", error)
                        // Fallback to default center if geolocation fails
                        fetchAddress(center.lat, center.lng)
                    }
                )
            } else {
                fetchAddress(center.lat, center.lng)
            }
        }
    }, [isLoaded, center, fetchAddress, address, initialLocation])


    if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>
    if (!isLoaded) return <div className="p-4 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <StandaloneSearchBox onLoad={onSearchLoad} onPlacesChanged={onPlacesChanged}>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for area, street name..."
                            className="pl-9"
                        />
                    </div>
                </StandaloneSearchBox>
            </div>

            <div className="relative h-[300px] w-full overflow-hidden rounded-lg border">
                <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    center={center}
                    zoom={15}
                    onLoad={onMapLoad}
                    onDragEnd={onCenterChanged}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    {/* Fixed Center Marker Overlay */}
                </GoogleMap>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none pb-[35px]">
                    <MapPin className="h-8 w-8 text-primary fill-current animate-bounce" />
                </div>

                {!isInServiceArea && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white p-2 rounded-md text-xs font-semibold flex items-center gap-2 justify-center backdrop-blur-sm">
                        <AlertCircle className="h-4 w-4" />
                        Service unavailable in this area
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-semibold uppercase">Selected Location</p>
                <div className="p-3 bg-muted rounded-md text-sm">
                    {address || "Locating..."}
                </div>
            </div>
        </div>
    )
}
