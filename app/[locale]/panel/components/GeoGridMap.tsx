"use client";

import dynamic from "next/dynamic";

const GeoGridMapInner = dynamic(() => import("./GeoGridMapInner"), {
  ssr: false,
});

export default GeoGridMapInner;