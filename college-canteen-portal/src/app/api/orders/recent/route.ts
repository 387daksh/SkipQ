import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/session'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await requireRole(['USER'])
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch last 50 orders (increased depth to find unique items)
  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      canteen: {
        include: {
          vendor: {
            select: {
              selfOrderFeeRate: true,
              preOrderFeeRate: true
            }
          }
        }
      },
      items: {
        include: {
          menuItem: {
             select: {
                 id: true,
                 name: true,
                 priceCents: true,
                 imageUrl: true,
                 description: true
             }
          }
        }
      }
    }
  })

  // Group by MenuItem ID to find unique recent items
  // Logic: "What did I order recently?" (Chronological unique)
  const uniqueItemsMap = new Map();

  for (const order of orders) {
    for (const item of order.items) {
      if (!item.menuItem) continue; // Skip if menu item deleted

      if (!uniqueItemsMap.has(item.menuItemId)) {
        uniqueItemsMap.set(item.menuItemId, {
          id: item.menuItemId,
          name: item.menuItem.name,
          price: item.menuItem.priceCents / 100, // Convert to unit price for frontend
          description: item.menuItem.description,
          image: item.menuItem.imageUrl,
          
          canteenId: order.canteenId,
          canteenName: order.canteen.name,
          
          // Fee Rates for Cart Context
          selfOrderFeeRate: order.canteen.vendor.selfOrderFeeRate,
          preOrderFeeRate: order.canteen.vendor.preOrderFeeRate,

          lastOrderedAt: order.createdAt
        });
      }
      // Limit to 10 top items
      if (uniqueItemsMap.size >= 10) break;
    }
    if (uniqueItemsMap.size >= 10) break;
  }

  return NextResponse.json(Array.from(uniqueItemsMap.values()));
}
