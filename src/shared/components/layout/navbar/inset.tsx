import { Separator } from '@/ui-components/separator'
import { SidebarInset, SidebarTrigger } from '@/ui-components/sidebar'

const NavbarInset = ({
  children,
}: React.ComponentProps<typeof SidebarInset>) => {
  return (
    <SidebarInset className='md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none'>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />

          <Separator orientation='vertical' className='mr-2 h-4' />
          {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='hidden md:block'>
            <BreadcrumbLink href='#'>
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden md:block' />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
        </div>
      </header>

      <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</main>
    </SidebarInset>
  )
}

export default NavbarInset
