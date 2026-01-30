export type Address = {
  id: string
  label: string // e.g., "Home", "Work"
  address: string
  landmark?: string
  buildingName?: string
  lat: number
  lng: number
  isDefault?: boolean
}

// Default Geofence: Bangalore (approximate center)
const BENGALURU_CENTER = { lat: 12.9716, lng: 77.5946 }
const MAX_RADIUS_KM = 10

/**
 * Calculates the distance between two coordinates in kilometers using the Haversine formula.
 */
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

/**
 * Validates if a location is within the service area (geofence).
 */
export function isLocationInServiceArea(lat: number, lng: number): boolean {
  const distance = getDistanceFromLatLonInKm(
    BENGALURU_CENTER.lat,
    BENGALURU_CENTER.lng,
    lat,
    lng
  )
  return distance <= MAX_RADIUS_KM
}

export const MOCKED_ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Home",
    address: "123, 4th Cross, Indiranagar, Bangalore",
    lat: 12.9784,
    lng: 77.6408,
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    address: "Tech Park, Whitefield, Bangalore",
    lat: 12.9698,
    lng: 77.7500,
  },
]
