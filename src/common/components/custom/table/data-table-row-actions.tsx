'use client'

import { useCustomToast } from '@/common/hooks/use-custom-toast'
import { useState } from 'react'
import { AlertModal } from '../alert-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/ui-components/dropdown-menu'
import { Button } from '@/ui-components/button'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ban, Ellipsis, Eye, RefreshCcw } from 'lucide-react'

interface DataTableRowActionsProps {
  status: boolean
  toggleStatus?: () => Promise<boolean | null>
  onEdit: () => void
}

export function DataTableRowActions({
  status,
  toggleStatus,
  onEdit,
}: DataTableRowActionsProps) {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const description = status
    ? 'Desactivado correctamente'
    : 'Activado correctamente'

  const onToggleClick = async () => {
    setIsLoading(true)

    const sucess = await toggleStatus!()

    if (sucess) {
      showSuccessToast(description)
    } else {
      showErrorToast('Error al cambiar el estado')
    }

    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onToggleClick}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <Ellipsis className='h-4 w-4' />
            <span className='sr-only'>Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-[100px]'>
          <DropdownMenuItem
            className='flex items-center justify-between cursor-pointer'
            onClick={() => onEdit()}
          >
            Detalles <Eye />
          </DropdownMenuItem>

          {toggleStatus && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center justify-between cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                {status ? (
                  <>
                    Desactivar <Ban />
                  </>
                ) : (
                  <>
                    Activar <RefreshCcw />
                  </>
                )}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
