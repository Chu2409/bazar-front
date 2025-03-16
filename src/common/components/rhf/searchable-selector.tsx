import { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '@/ui-components/label'
import { IOption } from '@/common/types/filters'
import { SearchableSelector } from '@/components/searchable-selector'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  options: IOption[]
  onSearchChange: (value: string) => void
  required?: boolean
}

const RHFSearchableSelector = ({
  name,
  label,
  onSearchChange,
  options,
  disabled,
  required = false,
}: Props) => {
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
        render={({ field: { onChange, value } }) => (
          <SearchableSelector
            onChange={onChange}
            value={value}
            options={options}
            onSearchChange={onSearchChange}
            disabled={disabled}
            placeholder={label}
          />
        )}
      />

      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFSearchableSelector
