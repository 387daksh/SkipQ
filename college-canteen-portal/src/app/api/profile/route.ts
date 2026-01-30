import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    console.log("GET /api/profile HIT (Logic Restored)");
    const session = await getSession()
    if (!session) {
        console.log("Session not found in /api/profile");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log("Session found for user:", session.user.id);
    
    try {
        // Calculate Stats
        const ordersCount = await prisma.order.count({
            where: { userId: session.user.id }
        })

        const xp = ordersCount * 50 // 50 XP per order
        const level = Math.floor(xp / 500) + 1
        const nextLevelXp = level * 500

        // Mask sensitive data
        const { passwordHash, ...safeUser } = session.user
        
        return NextResponse.json({ 
            user: { 
                ...safeUser, 
                stats: {
                    level,
                    xp,
                    nextLevelXp,
                    ordersCount
                }
            } 
        })
    } catch (error) {
        console.error("Error calculating profile stats:", error);
        // Fallback if DB fails
        const { passwordHash, ...safeUser } = session.user
        return NextResponse.json({ 
            user: { 
                ...safeUser, 
                stats: { level: 1, xp: 0, nextLevelXp: 500, ordersCount: 0 }
            } 
        })
    }
}
