import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateCustomer, useUpdateCustomer } from './use-customers-service'
import { useCustomerStore } from '../context/use-customer-store'
import { useEffect, useMemo } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  person: z.object({
    email: z
      .string({ message: 'Ingresa el correo del cliente' })
      .email({
        message: 'Correo inválido',
      })
      .trim(),
    firstName: z
      .string({ message: 'Ingresa el 1er nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .trim(),
    secondName: z
      .string({ message: 'Ingresa el 2do nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .trim()
      .optional(),
    firstSurname: z
      .string({ message: 'Ingresa el 1er apellido del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .trim(),
    secondSurname: z
      .string({ message: 'Ingresa el 2do nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .trim()
      .optional(),
    phoneNumbers: z.array(
      z.object(
        {
          value: z
            .string({ message: 'Ingresa el número de teléfono' })
            .regex(/^\d+$/, 'Debe contener solo números')
            .length(10, {
              message: 'El número de teléfono debe tener 10 dígitos',
            })
            .trim()
            .transform((val) => (val === '' ? undefined : val)),
        },
        { message: 'Ingresa al menos un número de teléfono' },
      ),
    ),
    identifications: z
      .array(
        z.object({
          type: z.string({ message: 'Ingresa el tipo de documento' }).min(1, {
            message: 'Selecciona un tipo de documento',
          }),
          value: z
            .string({ message: 'Ingresa el número de documento' })
            .regex(/^\d+$/, 'Debe contener solo números')
            .min(9, {
              message: 'Mínimo 9 caracteres',
            })
            .max(12, {
              message: 'Máximo 12 caracteres',
            })
            .trim(),
          active: z.boolean().default(true),
        }),
      )
      .min(1, { message: 'Debe tener al menos una identificación' })
      .refine((arr) => arr.some((item) => item.active), {
        message: 'Debe tener al menos una identificación activa',
      }),
  }),
  address: z
    .string({ message: 'Ingresa la dirección del cliente' })
    .min(5, {
      message: 'Mínimo 5 caracteres',
    })
    .trim()
    .optional(),
  active: z.boolean().default(true),
})

type FormFields = z.infer<typeof schema>

export const useCustomerForm = () => {
  const data = useCustomerStore((state) => state.data)
  const onClose = useCustomerStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateCustomer()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateCustomer(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      person: {
        email: data?.person.email,
        firstName: data?.person.firstName,
        firstSurname: data?.person.firstSurname,
        secondName: data?.person.secondName ?? undefined,
        secondSurname: data?.person.secondSurname ?? undefined,
        phoneNumbers:
          data?.person.phoneNumbers.map((phone) => ({
            value: phone,
          })) ?? [],
        identifications: data?.person.identifications,
      },
      address: data?.address ?? undefined,
      active: data?.active ?? true,
    }),
    [data],
  )

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
  }, [defaultValues, form])

  const onSubmit = async (values: FormFields) => {
    const valuesForm = {
      ...values,
      person: {
        ...values.person,
        phoneNumbers: values.person.phoneNumbers.map((phone) => phone.value!),
      },
    }

    if (data) {
      const changedFields = getChangedFields(data, valuesForm)

      const updated = await updateProduct({
        ...changedFields,
        person: {
          ...changedFields.person,
          phoneNumbers: values.person.phoneNumbers.map((phone) => phone.value!),
        },
      })
      if (updated) onClose()
    } else {
      const created = await createProduct(valuesForm)
      if (created) onClose()
    }
  }

  return {
    form,
    isDirty: form.formState.isDirty,
    isPending: createPending || updatePending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
