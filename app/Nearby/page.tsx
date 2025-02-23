"use client";


import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FaSearch, FaHospital, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Libraries } from "@react-google-maps/api";
// Type Definitions
interface LatLng {
  lat: number;
  lng: number;
}

interface Hospital {
  name: string;
  vicinity?: string;
  geometry?: {
    location?: google.maps.LatLng | {
      lat: () => number;
      lng: () => number;
    };
  };
  distance?: number;
  rating?: number;
  formatted_phone_number?: string;
  website?: string;
  business_status?: string;
}

// Constants
const mapContainerStyle = { width: "100%", height: "700px" };
const defaultCenter: LatLng = { lat: 28.6139, lng: 77.2090 }; // New Delhi
const libraries: string[] = ["places", "geometry"];

// Component
const GoogleMapComponent: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState<LatLng>(defaultCenter);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [showList, setShowList] = useState<boolean>(false);
  const [filterLocation, setFilterLocation] = useState<string>("");

  const libraries: Libraries = ["places"]; // or other required libraries

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  libraries,
});

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  //   libraries: libraries as unknown as Library[],
  // });

  // Initial mount
  useEffect(() => {
    setIsMounted(true);
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key is missing");
    }
  }, []);

  const fetchHospitals = useCallback(
    (center: LatLng) => {
      if (!isMounted || !map || !isLoaded || !window.google) return;

      setIsLoading(true);
      const placesService = new window.google.maps.places.PlacesService(map);
      const request = {
        location: new window.google.maps.LatLng(center.lat, center.lng),
        radius: radius,
        type: "hospital",
        keyword: searchQuery || undefined,
      };

      try {
        placesService.nearbySearch(
          request,
          (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              const enrichedResults = results
                .filter((hospital) => hospital.name)
                .map((hospital) => ({
                  ...hospital,
                  name: hospital.name || "Unknown Hospital",
                  distance: window.google.maps.geometry.spherical.computeDistanceBetween(
                    new window.google.maps.LatLng(center.lat, center.lng),
                    hospital.geometry?.location as google.maps.LatLng
                  ) / 1000,
                }))
                .sort((a, b) => (a.distance || 0) - (b.distance || 0));
              setHospitals(enrichedResults);
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error("Places API error:", error);
        setIsLoading(false);
      }
    },
    [isMounted, map, isLoaded, searchQuery, radius]
  );

  // Geolocation effect with cleanup
  useEffect(() => {
    if (!isMounted || !isLoaded || !navigator.geolocation) return;

    setIsLoading(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        if (map) fetchHospitals(newLocation);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Location access denied! Using default location.");
        if (map) fetchHospitals(defaultCenter);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isMounted, isLoaded, map, fetchHospitals, radius]);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance);
      fetchHospitals(location);
    },
    [fetchHospitals, location]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHospitals(location);
  };

  const handleFilterLocation = () => {
    if (!map || !isLoaded || !window.google || !filterLocation) return;

    setIsLoading(true);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: filterLocation }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results?.[0]) {
        const newLocation: LatLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setLocation(newLocation);
        map.panTo(newLocation);
        fetchHospitals(newLocation);
      } else {
        alert("Location not found!");
      }
      setIsLoading(false);
    });
  };

  if (!isMounted || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
          <FaHospital className="text-3xl mb-2 mx-auto" />
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  const hospitalIcon = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: "#ff0000",
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: "#fff",
    scale: 10,
  };

  return (
    <div className="relative font-sans">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-xl shadow-lg w-96 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Location
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              placeholder="Enter country, state, city..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              onClick={handleFilterLocation}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaMapMarkerAlt />
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hospitals..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSearch />
          </button>
        </form>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Radius: {radius / 1000} km
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="1000"
            value={radius}
            onChange={(e) => {
              setRadius(Number(e.target.value));
              fetchHospitals(location);
            }}
            className="w-full"
          />
        </div>

        <button
          onClick={() => setShowList(!showList)}
          className="w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200 mb-2 flex items-center justify-between"
        >
          <span>Hospital List ({hospitals.length})</span>
          <span>{showList ? "▼" : "▲"}</span>
        </button>

        {showList && (
          <div className="space-y-2">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                onClick={() => setSelectedHospital(hospital)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <h4 className="font-semibold">{hospital.name}</h4>
                <p className="text-sm text-gray-600">
                  {hospital.distance?.toFixed(1)} km • {hospital.vicinity}
                </p>
                {hospital.rating && (
                  <p className="text-sm text-yellow-500">
                    ★ {hospital.rating}/5
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={13}
        onLoad={onLoad}
        options={{
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        <Marker
          position={location}
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          title="Your Location"
        />

        <Circle
          center={location}
          radius={radius}
          options={{
            fillColor: "#0000FF",
            fillOpacity: 0.1,
            strokeColor: "#0000FF",
            strokeOpacity: 0.3,
          }}
        />

        {hospitals.map((hospital, index) =>
          hospital.geometry?.location ? (
            <Marker
              key={index}
              position={
                "lat" in hospital.geometry.location
                  ? {
                      lat: (hospital.geometry.location as { lat: () => number }).lat(),
                      lng: (hospital.geometry.location as { lng: () => number }).lng(),
                    }
                  : hospital.geometry.location
              }
              icon={hospitalIcon}
              onClick={() => setSelectedHospital(hospital)}
              animation={window.google.maps.Animation.DROP}
            />
          ) : null
        )}

        {selectedHospital?.geometry?.location && (
          <InfoWindow
            position={
              "lat" in selectedHospital.geometry.location
                ? {
                    lat: (selectedHospital.geometry.location as { lat: () => number }).lat(),
                    lng: (selectedHospital.geometry.location as { lng: () => number }).lng(),
                  }
                : {
                    lat: (selectedHospital.geometry.location as google.maps.LatLng).lat(),
                    lng: (selectedHospital.geometry.location as google.maps.LatLng).lng(),
                  }
            }
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div className="w-64 p-3">
              <h3 className="font-bold text-lg mb-1">{selectedHospital.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FaMapMarkerAlt /> {selectedHospital.vicinity}
              </p>
              <p className="text-sm text-gray-600">
                Distance: {selectedHospital.distance?.toFixed(1)} km
              </p>
              {selectedHospital.rating && (
                <p className="text-sm text-yellow-500">
                  Rating: ★ {selectedHospital.rating}/5
                </p>
              )}
              {selectedHospital.formatted_phone_number && (
                <p className="text-sm flex items-center gap-1">
                  <FaPhone /> {selectedHospital.formatted_phone_number}
                </p>
              )}
              {selectedHospital.website && (
                <button
                  onClick={() => window.open(selectedHospital.website, "_blank")}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Website
                </button>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
            <FaHospital className="text-3xl mb-2 mx-auto" />
            <p>Loading hospitals...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;