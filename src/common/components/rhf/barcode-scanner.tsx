import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { Button } from '@/ui-components/button'
import Webcam from 'react-webcam'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import { getError } from '@/common/utils/forms'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  required?: boolean
}

const RHFBarcodeScanner = ({
  name,
  label,
  placeholder,
  required = false,
}: Props) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [scanning, setScanning] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const reader = useRef(new BrowserMultiFormatReader())
  const error = getError(name, errors)

  useEffect(() => {
    if (!scanning) return

    const startScanning = async () => {
      if (!webcamRef.current?.video) return

      reader.current.reset()

      try {
        const result = await reader.current.decodeFromVideoElement(
          webcamRef.current.video,
        )

        setValue(name, result.getText(), { shouldDirty: true })
        setScanning(false)
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
        }
      }
    }

    startScanning()
  }, [name, scanning, setValue])

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={name} className={errors[name] ? 'text-red-500' : ''}>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className='relative'>
            <Input
              id={name}
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className='bg-background'
            />
            <Button
              type='button'
              variant='outline'
              className='mt-2'
              onClick={() => setScanning(!scanning)}
            >
              {scanning ? 'Detener' : 'Escanear Código'}
            </Button>

            {scanning && (
              <div className='fixed flex items-center justify-center z-50 bottom-4 left-4'>
                <div className='bg-foreground p-4 rounded-lg shadow-lg'>
                  <Webcam
                    ref={webcamRef}
                    className='w-auto h-60 rounded-lg'
                    videoConstraints={{ facingMode: 'environment' }}
                  />
                  <Button
                    variant='destructive'
                    className='mt-4 w-full'
                    onClick={() => setScanning(false)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      />
      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFBarcodeScanner
