import { useEffect, useState } from 'react'

interface Coords {
  latitude: number | null
  longitude: number | null
}

export default function useCoods() {
  const [coords, setCoords] = useState<Coords>({
    latitude: null,
    longitude: null,
  })

  const onSuccess = (position: GeolocationPosition) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess)
  }, [])

  return coords
}
