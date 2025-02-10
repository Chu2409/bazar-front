'use client'

import { useCustomToast } from '@/common/hooks/use-custom-toast'
import images from '@/constants/images'
import { useAuthStore } from '@/core/auth/context/use-auth-store'
import { useSignOut } from '@/core/auth/hooks/use-auth-service'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui-components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui-components/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui-components/sidebar'

import { ChevronsUpDown, LogOut } from 'lucide-react'

export function NavbarFooter() {
  const { user } = useAuthStore()

  const { isMobile } = useSidebar()
  const signOut = useSignOut()
  const { showSuccessToast } = useCustomToast()

  const handleSignOut = async () => {
    await signOut()

    showSuccessToast('Regresa pronto!')
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={images.user.src} alt={user?.username} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {user?.username}
                  </span>
                  <span className='truncate text-xs'>Usuario</span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={images.user.src} alt={user?.username} />
                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {user?.username}
                    </span>
                    <span className='truncate text-xs'>Usuario</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
