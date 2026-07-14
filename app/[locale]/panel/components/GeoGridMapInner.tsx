"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

type GridPoint = {
  lat: number;
  lng: number;
  rank: number;
  label: string;
};

type GeoGridResponse = {
  business_name: string;
  keyword: string;
  center?: { lat: number; lng: number };
  grid?: GridPoint[];
} | null;

function getColor(rank: number) {
  if (rank <= 3) return "#22c55e";
  if (rank <= 10) return "#eab308";
  return "#ef4444";
}

export default function GeoGridMapInner({ data }: { data: GeoGridResponse }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    const fallbackCenter: [number, number] = [39.4699, -0.3763];
    const hasValidCenter =
      !!data &&
      !!data.center &&
      typeof data.center.lat === "number" &&
      typeof data.center.lng === "number";

    const mapCenter: [number, number] = hasValidCenter
      ? [data!.center!.lat, data!.center!.lng]
      : fallbackCenter;

    const map = L.map(mapRef.current, {
      center: mapCenter,
      zoom: 13,
      scrollWheelZoom: true,
    });

    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    if (hasValidCenter && data) {
      const centerIcon = L.divIcon({
        html: `
          <div style="
            width:18px;
            height:18px;
            border-radius:9999px;
            background:#0ea5e9;
            border:3px solid white;
            box-shadow:0 0 0 2px rgba(14,165,233,0.35);
          "></div>
        `,
        className: "",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([data.center!.lat, data.center!.lng], {
        icon: centerIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div><strong>${data.business_name}</strong><br/>Centro del análisis</div>`
        );

      (data.grid ?? []).forEach((point) => {
        L.circleMarker([point.lat, point.lng], {
          radius: 18,
          color: getColor(point.rank),
          fillColor: getColor(point.rank),
          fillOpacity: 0.55,
          weight: 2,
        })
          .addTo(map)
          .bindPopup(
            `<div>
              <strong>${point.label}</strong><br/>
              Posición: #${point.rank}<br/>
              Keyword: ${data.keyword}
            </div>`
          );
      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [data]);

  return <div ref={mapRef} style={{ height: 560, width: "100%" }} />;
}