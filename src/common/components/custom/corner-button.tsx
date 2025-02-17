import { cn } from '@/common/lib/utils'
import { Button } from '@/ui-components/button'
import { Plus } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const CornerButton = ({ title, className, onClick }: Props) => {
  return (
    <Button
      className={cn(
        'absolute top-2 right-4 z-50 flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-70 cursor-pointer text-center ml-auto',
        className,
      )}
      onClick={onClick}
    >
      <Plus className='mr-2 h-4 w-4' />

      {title}
    </Button>
  )
}
