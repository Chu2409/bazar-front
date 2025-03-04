// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateCustomer, useUpdateCustomer } from './use-customers-service'
import { useCustomerStore } from '../context/use-customer-store'
import { useEffect } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  person: z.object({
    email: z.string({ message: 'Ingresa el correo del cliente' }).email({
      message: 'Correo inválido',
    }),
    firstName: z
      .string({ message: 'Ingresa el 1er nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      }),
    secondName: z
      .string({ message: 'Ingresa el 2do nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .optional(),
    firstSurname: z
      .string({ message: 'Ingresa el 1er apellido del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      }),
    secondSurname: z
      .string({ message: 'Ingresa el 2do nombre del cliente' })
      .min(2, {
        message: 'Mínimo 2 caracteres',
      })
      .optional(),
    phoneNumbers: z.array(
      z.object(
        {
          value: z
            .string({ message: 'Ingresa el número de teléfono' })
            .regex(/^\d+$/, 'Debe contener solo números')
            .min(8, {
              message: 'Mínimo 8 caracteres',
            })
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
            }),
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

  const defaultValues: FormFields = {
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
  }

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
