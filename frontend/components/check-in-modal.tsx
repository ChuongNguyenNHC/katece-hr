"use client";

import { useState, useEffect, useRef } from "react";
import { X, MapPin, Camera, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "check-in" | "check-out";
}

// Mock Office Location (approx coordinates)
const OFFICE_COORDS = {
  lat: 10.762622, 
  lng: 106.660172,
};
const MAX_DISTANCE_METERS = 300; // Allow 300m radius for testing

export function CheckInModal({ isOpen, onClose, type }: CheckInModalProps) {
  const [step, setStep] = useState<"location" | "camera" | "success">("location");
  const [locationStatus, setLocationStatus] = useState<"loading" | "success" | "error" | "out-of-range">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [permissionError, setPermissionError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep("location");
      setLocationStatus("loading");
      setImageSrc(null);
      checkLocation();
    } else {
        stopCamera();
    }
  }, [isOpen]);

  // Cleanup camera on unmount
  useEffect(() => {
      return () => stopCamera();
  }, []);

  const checkLocation = (enableHighAccuracy = true) => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = getDistanceFromLatLonInM(
          latitude,
          longitude,
          OFFICE_COORDS.lat,
          OFFICE_COORDS.lng
        );

        if (dist <= MAX_DISTANCE_METERS) {
            setLocationStatus("success");
            // Auto advance after short delay
            setTimeout(() => {
                setStep("camera");
                startCamera();
            }, 1000);
        } else {
            console.warn(`User is ${dist}m away. Max allowed: ${MAX_DISTANCE_METERS}m`);
            setLocationStatus("out-of-range");
        }
      },
      (error) => {
        console.error("Geo error:", error);
        
        // If High Accuracy failed (timeout or unavailable), try Low Accuracy once
        if (enableHighAccuracy && (error.code === 2 || error.code === 3)) {
            console.log("High accuracy failed, retrying with low accuracy...");
            checkLocation(false);
            return;
        }

        let msg = "Unable to retry location.";
        if (error.code === 1) msg = "Location permission denied. Please allow access.";
        else if (error.code === 2) msg = "Location unavailable. Check your network or GPS.";
        else if (error.code === 3) msg = "Location request timed out.";
        
        setErrorMessage(msg);
        setLocationStatus("error");
      },
      { enableHighAccuracy, timeout: 10000, maximumAge: 0 }
    );
  };

  const simulateLocation = () => {
      setLocationStatus("success");
      setTimeout(() => {
          setStep("camera");
          startCamera();
      }, 1000);
  };

  const startCamera = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }
          setPermissionError(false);
      } catch (err) {
          console.error("Camera error:", err);
          setPermissionError(true);
      }
  };

  const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
      }
  };

  const capturePhoto = () => {
      if (!videoRef.current) return;
      
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setImageSrc(dataUrl); // Normally uploaded to server
      stopCamera();
      setStep("success");
  };

  // Haversine formula
  function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // metres
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold capitalize">{type.replace("-", " ")}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
            {step === "location" && (
                <div className="flex flex-col items-center justify-center text-center py-8">
                    {locationStatus === "loading" && (
                        <>
                            <div className="relative mb-6">
                                <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                                    <MapPin className="h-8 w-8" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">Verifying Location...</h3>
                            <p className="text-gray-500">Please wait while we check if you are at the workspace.</p>
                        </>
                    )}
                    {locationStatus === "error" && (
                        <>
                             <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-red-600">Location Error</h3>
                            <p className="text-gray-500 mb-6">{errorMessage || "Could not verify location."}</p>
                            
                            <div className="flex flex-col gap-2 w-full max-w-xs">
                                <Button variant="outline" onClick={() => checkLocation(true)}>Retry Location</Button>
                                {/* Dev/Test Bypass */}
                                <Button variant="ghost" size="sm" onClick={simulateLocation} className="text-xs text-blue-500">
                                    [DEV] Simulate Location Match
                                </Button>
                            </div>
                        </>
                    )}
                     {locationStatus === "out-of-range" && (
                        <>
                             <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-red-600">Location Warning</h3>
                            <p className="text-gray-500 mb-6">You are not at the designated workspace location. {type === 'check-in' ? 'Check-in' : 'Check-out'} is restricted.</p>
                            
                            <Button variant="destructive" onClick={() => checkLocation(true)}>Retry Location</Button>
                        </>
                    )}  
                    {locationStatus === "success" && (
                         <div className="text-emerald-600 font-bold flex flex-col items-center">
                            <CheckCircle className="h-12 w-12 mb-2" />
                            Location Verified!
                         </div>
                    )}
                </div>
            )}

            {step === "camera" && (
                 <div className="flex flex-col items-center">
                    <div className="relative mb-4 w-full overflow-hidden rounded-xl bg-black aspect-[3/4] flex items-center justify-center">
                        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover transform scale-x-[-1]" />
                        {permissionError && (
                            <div className="text-white text-center p-4">
                                <p>Camera access denied.</p>
                                <Button size="sm" variant="secondary" onClick={startCamera} className="mt-2">Retry</Button>
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Take a photo to confirm your identity.</p>
                    <Button onClick={capturePhoto} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                        <Camera className="mr-2 h-5 w-5" /> Capture & {type === 'check-in' ? 'Check In' : 'Check Out'}
                    </Button>
                 </div>
            )}

             {step === "success" && (
                 <div className="flex flex-col items-center py-8 text-center">
                     <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-500 mb-8">You have successfully {type === 'check-in' ? 'checked in' : 'checked out'} for your shift.</p>
                    
                    <Button onClick={onClose} className="w-full" variant="outline">Close</Button>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
}
