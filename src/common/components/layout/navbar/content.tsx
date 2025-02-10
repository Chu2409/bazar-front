'use client'

import { routes } from '@/constants/routes'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui-components/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavbarContent = () => {
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default NavbarContent
