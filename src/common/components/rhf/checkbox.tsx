import { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '@/ui-components/label'
import { Checkbox } from '@/ui-components/checkbox'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  description?: string
}

const RHFCheckbox = ({ name, label, description, disabled }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message

  return (
    <div className='flex flex-row  items-center gap-x-3 rounded-md border p-3 shadow bg-white'>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            onCheckedChange={onChange}
            checked={value}
            disabled={disabled}
          />
        )}
      />

      <div className='flex flex-col'>
        <Label className={error ? 'text-red-500' : ''}>{label}</Label>

        <Label className='text-xs text-gray-500'>{description}</Label>
      </div>

      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFCheckbox
