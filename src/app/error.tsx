'use client'

import { Button } from '@/ui-components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui-components/card'
import { Ban, CornerUpLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { push } = useRouter()

  const handleClick = () => {
    push('/products')
  }

  return (
    <main className='h-full'>
      <div className='h-full flex items-center justify-center p-4'>
        <Card className='w-full max-w-md shadow-lg'>
          <CardHeader className='text-center pb-2'>
            <div className='w-full flex justify-center mb-4'>
              <div className='p-3 bg-red-100 dark:bg-red-900/20 rounded-full'>
                <Ban className='h-8 w-8 text-red-600 dark:text-red-400' />
              </div>
            </div>
            <CardTitle className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              ¡Ups! Algo salió mal
            </CardTitle>
          </CardHeader>

          <CardContent className='text-center'>
            <p className='text-gray-500 dark:text-gray-400 mt-2'>
              {error.message || 'Ha ocurrido un error inesperado'}
            </p>
            {error.digest && (
              <p className='text-sm text-gray-400 dark:text-gray-500 mt-2'>
                Código de error: {error.digest}
              </p>
            )}
          </CardContent>

          <CardFooter className='flex justify-center pb-6'>
            <Button
              onClick={handleClick}
              className='inline-flex items-center gap-2'
            >
              <CornerUpLeft className='h-4 w-4' />
              Volver al menú principal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
