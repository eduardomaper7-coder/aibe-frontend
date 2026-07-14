import { NextRequest, NextResponse } from "next/server";

type Body = {
  business_name?: string;
  keyword?: string;
};

function generateGrid(
  centerLat: number,
  centerLng: number,
  size = 5,
  step = 0.008
) {
  const points = [];
  const half = Math.floor(size / 2);
  let counter = 1;

  for (let row = -half; row <= half; row++) {
    for (let col = -half; col <= half; col++) {
      const lat = centerLat + row * step;
      const lng = centerLng + col * step;

      const distanceFactor = Math.abs(row) + Math.abs(col);
      const baseRank = Math.min(18, 1 + distanceFactor * 2);
      const randomOffset = (counter % 3) - 1;
      const rank = Math.max(1, baseRank + randomOffset);

      points.push({
        lat,
        lng,
        rank,
        label: `P${counter}`,
      });

      counter++;
    }
  }

  return points;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;

  const business_name = body.business_name || "Clínica Dental Sonrisa";
  const keyword = body.keyword || "dentista valencia";

  const center = {
    lat: 39.4699,
    lng: -0.3763,
  };

  const grid = generateGrid(center.lat, center.lng, 5, 0.008);

  return NextResponse.json({
    business_name,
    keyword,
    center,
    grid,
  });
}