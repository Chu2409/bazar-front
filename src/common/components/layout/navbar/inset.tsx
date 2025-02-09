'use client'

import { getRouteByURL } from '@/constants/routes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/ui-components/breadcrumb'
import { Separator } from '@/ui-components/separator'
import { SidebarInset, SidebarTrigger } from '@/ui-components/sidebar'
import { usePathname } from 'next/navigation'

const NavbarInset = ({
  children,
}: React.ComponentProps<typeof SidebarInset>) => {
  const pathname = usePathname()

  return (
    <SidebarInset className='md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none'>
      <header className='flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />

          <Separator orientation='vertical' className='mr-2 h-4' />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className='line-clamp-1'>
                  {getRouteByURL(pathname)?.title ?? 'Unknown'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</main>
    </SidebarInset>
  )
}

export default NavbarInset
