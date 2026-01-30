import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import MenuClient from './_components/MenuClient'

// Force dynamic because we might need fresh data or it's user specific (though public menu could be static-ish, 
// usually canteen menus change or availability changes often so dynamic is safer for now)
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function CanteenMenuPage(props: Props) {
  const params = await props.params;
  const {
    id
  } = params;

  // Fetch all data in parallel
  const [canteen, items, sections] = await Promise.all([
    prisma.canteen.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        // We can select more if needed for the header
      }
    }),
    prisma.menuItem.findMany({
      where: { canteenId: id },
      select: { id: true, name: true, priceCents: true, imageUrl: true, description: true, sectionId: true, sortOrder: true, available: true }
    }),
    prisma.menuSection.findMany({
      where: { canteenId: id },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, name: true }
    })
  ])

  if (!canteen) {
    return notFound()
  }

  return (
    <MenuClient 
      canteenId={id}
      initialItems={items}
      initialSections={sections}
      initialCanteen={canteen}
    />
  )
}
