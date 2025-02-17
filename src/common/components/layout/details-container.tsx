import { Button } from '@/ui-components/button'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

export const DetailsContainer = ({ onClose, children }: Props) => {
  return (
    <div className='bg-primary-foreground w-full col-span-3 relative rounded-tl-xl rounded-bl-xl p-4 border-l shadow-xl flex flex-col gap-4 max-[1000px]:col-span-1 max-[1000px]:shadow-md max-[1000px]:rounded-xl max-[1000px]:mt-6'>
      <Button
        className='absolute top-0 right-0 bg-foreground p-2 rounded-none rounded-es-2xl max-[1000px]:rounded-tr-xl'
        onClick={onClose}
      >
        <X className='h-6 w-6 text-white' />
      </Button>

      <p className='text-black text-center pb-4'>Detalles del producto</p>

      {children}
    </div>
  )
}
