import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const canteens = await prisma.canteen.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      openingTime: true,
      closingTime: true,
      autoMode: true,
      manualIsOpen: true
    }
  })

  // Computed Status (Server-Side Source of Truth)
  const canteensWithStatus = canteens.map(c => {
      let isOpen = c.manualIsOpen
      
      if (c.autoMode && c.openingTime && c.closingTime) {
          const now = new Date()
          const open = new Date(c.openingTime)
          const close = new Date(c.closingTime)

          // Extract minutes from midnight (Local Server Time)
          // Ensure your server TZ is configured correctly (e.g. TZ='Asia/Kolkata')
          const currentMins = now.getHours() * 60 + now.getMinutes()
          const openMins = open.getHours() * 60 + open.getMinutes()
          const closeMins = close.getHours() * 60 + close.getMinutes()

          if (closeMins < openMins) {
              isOpen = currentMins >= openMins || currentMins < closeMins
          } else {
              isOpen = currentMins >= openMins && currentMins < closeMins
          }
      }

      return { ...c, isOpen }
  })

  return NextResponse.json(canteensWithStatus)
}
