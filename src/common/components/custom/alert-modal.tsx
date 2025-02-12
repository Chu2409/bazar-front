'use client'

import { useEffect, useState } from 'react'
import { Modal } from './modal'
import { Button } from '@/ui-components/button'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title='Estas seguro?'
      description='Esta acción se puede revertir'
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-sm md:max-w-lg'
    >
      <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={isLoading} variant='outline' onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  )
}
