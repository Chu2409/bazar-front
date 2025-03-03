import { InputHTMLAttributes, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { Button } from '@/ui-components/button'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/common/lib/utils'
import { getError } from '@/common/utils/forms'

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
  placeholder,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = getError(name, errors)

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className='relative'>
            <Input
              id={name}
              onChange={(e) => {
                const value = e.target.value
                if (value === '') {
                  onChange(undefined)
                } else {
                  onChange(value)
                }
              }}
              value={value ?? ''}
              className={cn('bg-white', className)}
              disabled={disabled}
              placeholder={placeholder}
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
                {showPassword ? <Eye /> : <EyeOff />}
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
