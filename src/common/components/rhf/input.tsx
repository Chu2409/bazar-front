import { InputHTMLAttributes, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { Button } from '@/ui-components/button'
import { Eye, EyeClosed } from 'lucide-react'
import { cn } from '@/common/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const RHFInput = ({
  name,
  label,
  className,
  type,
  disabled,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message

  return (
    <div className='grid gap-2'>
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className='relative'>
            <Input
              {...field}
              {...rest}
              disabled={disabled}
              id={name}
              className={cn('bg-white', className)}
              type={type === 'password' && showPassword ? 'text' : type}
            />

            {type === 'password' && (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-[2px] right-2 hover:bg-transparent'
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </Button>
            )}
          </div>
        )}
      />

      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFInput
