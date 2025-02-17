import React from 'react'

import { cn } from '@/common/lib/utils'

interface Props {
  children: React.ReactNode
  isOpen: boolean
}

export const MainContainer = ({ children, isOpen }: Props) => {
  return (
    <div
      className={cn(
        'grid gap-x-4 gap-y-6 h-full max-h-full',
        isOpen && 'grid-cols-7 min-[1000px]:-mr-4 max-[1000px]:grid-cols-1',
      )}
    >
      {children}
    </div>
  )
}
