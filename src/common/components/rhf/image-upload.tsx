'use client'

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'

import { ImagePlus, Trash } from 'lucide-react'
import { Button } from '@/ui-components/button'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '@/ui-components/label'

interface Props {
  name: string
  label: string
  disabled?: boolean
  required?: boolean
}

const RHFImageUpload: React.FC<Props> = ({
  name,
  label,
  disabled,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message

  return (
    <div className='grid gap-2'>
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            {field.value && (
              <div className='mb-4 flex items-center gap-4 flex-wrap'>
                <div className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                  <div className='z-10 absolute top-2 right-2'>
                    <Button
                      type='button'
                      onClick={() => field.onChange('')}
                      variant='destructive'
                      size='icon'
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </div>

                  <CldImage
                    crop='fill'
                    className='object-cover'
                    alt='Image'
                    width={200}
                    height={200}
                    src={field.value}
                  />
                </div>
              </div>
            )}

            {!field.value && (
              <CldUploadWidget
                onSuccess={({ info }) => {
                  field.onChange(
                    (info as CloudinaryUploadWidgetInfo).secure_url,
                  )
                }}
                uploadPreset='etqxyjlm'
              >
                {({ open }) => {
                  const onClick = () => {
                    open()
                  }

                  return (
                    <Button
                      type='button'
                      disabled={disabled}
                      variant='secondary'
                      onClick={onClick}
                      className='flex items-center gap-2 w-full border'
                    >
                      <ImagePlus className='h-4 w-4 mr-2' />
                      Subir imágen
                    </Button>
                  )
                }}
              </CldUploadWidget>
            )}
          </div>
        )}
      />

      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFImageUpload
