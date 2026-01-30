import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    console.log("GET /api/auth/me HIT");
    const session = await getSession()
    if (!session) {
        console.log("Session not found in /api/auth/me");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log("Session found for user:", session.user.id);
    
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
}

export async function PUT(req: Request) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { name } = body

        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { name }
        })

        // Mask hash
        const { passwordHash, ...safeUser } = updatedUser
        
        return NextResponse.json({ user: safeUser })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }
}
