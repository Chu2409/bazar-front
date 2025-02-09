import NavbarInset from '@/common/components/layout/navbar/inset'
import { Sidebar, SidebarProvider } from '@/ui-components/sidebar'
import { cookies } from 'next/headers'
import NavbarHeader from '@/common/components/layout/navbar/header'
import NavbarContent from '@/common/components/layout/navbar/content'
import { NavbarFooter } from '@/common/components/layout/navbar/footer'

const RoutesLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible='icon' variant='inset'>
        <NavbarHeader />

        <NavbarContent />

        <NavbarFooter />
      </Sidebar>

      <NavbarInset>{children}</NavbarInset>
    </SidebarProvider>
  )
}

export default RoutesLayout
