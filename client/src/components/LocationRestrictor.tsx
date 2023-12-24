import React, { ReactNode, useEffect, useState } from "react";
// import LocationError from "../pages/LocationError";

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationRestrictorProps {
  children: ReactNode;
  targetLocation: Location;
  radius: number; // in meters
}

const LocationRestrictor: React.FC<LocationRestrictorProps> = ({
  children,
  targetLocation,
  radius,
}) => {
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const distance = calculateDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            targetLocation
          );
          setIsWithinRadius(distance <= radius);
        },
        () => {
          // Handle error or set default behavior if location access is denied
          setIsWithinRadius(false);
        }
      );
    } else {
      // Geolocation is not supported by this browser
      setIsWithinRadius(false);
    }
  }, [targetLocation, radius]);

  if (isWithinRadius === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;

  // return isWithinRadius ? <>{children}</> : LocationError();
};

// Haversine formula to calculate the distance between two points on the Earth
function calculateDistance(location1: Location, location2: Location): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadius = 6371e3; // meters

  const dLat = toRad(location2.latitude - location1.latitude);
  const dLon = toRad(location2.longitude - location1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(location1.latitude)) *
      Math.cos(toRad(location2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export default LocationRestrictor;
