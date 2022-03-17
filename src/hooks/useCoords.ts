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

  const [isGrantedPermission, setIsGrantedPermission] = useState<
    boolean | null
  >(null)

  const onSuccess = (position: GeolocationPosition) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess)
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((res) =>
        res.state === 'granted'
          ? setIsGrantedPermission(true)
          : setIsGrantedPermission(false)
      )
  }, [])

  return { ...coords, isGrantedPermission }
}
