import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Fetch First Record or Default
  let config = await prisma.platformSettings.findFirst()

  if (!config) {
    // Determine campus (Fallback)
    config = {
        id: "mock",
        campusName: "DTU",
        ordersPaused: false,
        updatedAt: new Date()
    } as any;
  }

  return NextResponse.json(config)
}
