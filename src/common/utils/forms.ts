import { FieldErrors, FieldValues } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CompareOptions {
  excludeFields?: string[]
  includeFields?: string[]
  deep?: boolean
  ignoreCase?: boolean
  arrayComparison?: 'reference' | 'value'
}

export function getChangedFields(
  original: Record<string, any>,
  updated: Record<string, any>,
  options: CompareOptions = {},
): Record<string, any> {
  const {
    excludeFields = [],
    includeFields,
    deep = true,
    ignoreCase = false,
    arrayComparison = 'value',
  } = options

  const changes: Record<string, any> = {}

  // Obtiene todas las claves de ambos objetos para asegurarse de capturar valores añadidos/eliminados
  const allKeys = new Set([...Object.keys(original), ...Object.keys(updated)])

  allKeys.forEach((key) => {
    // Verifica si debemos incluir o excluir esta clave
    if (includeFields && !includeFields.includes(key)) return
    if (excludeFields.includes(key)) return

    const originalValue = original[key]
    const updatedValue = updated[key]

    // Si es un campo nuevo (no existía en el original)
    if (!(key in original) && key in updated) {
      changes[key] = updatedValue
      return
    }

    // Si el campo fue eliminado
    if (key in original && !(key in updated)) {
      // Podríamos opcionalmente hacer algo aquí, como marcarlo con null
      // changes[key] = null;
      return
    }

    // Para strings con ignoreCase activado
    if (
      ignoreCase &&
      typeof originalValue === 'string' &&
      typeof updatedValue === 'string'
    ) {
      if (originalValue.toLowerCase() !== updatedValue.toLowerCase()) {
        changes[key] = updatedValue
      }
      return
    }

    // Para objetos, hacemos recursión si deep=true
    if (
      deep &&
      typeof originalValue === 'object' &&
      originalValue !== null &&
      typeof updatedValue === 'object' &&
      updatedValue !== null &&
      !Array.isArray(originalValue) &&
      !Array.isArray(updatedValue)
    ) {
      const nestedChanges = getChangedFields(
        originalValue,
        updatedValue,
        options,
      )
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges
      }
      return
    }

    // Para arrays
    if (Array.isArray(originalValue) && Array.isArray(updatedValue)) {
      // Si las arrays tienen longitudes diferentes, definitivamente han cambiado
      if (originalValue.length !== updatedValue.length) {
        changes[key] = updatedValue
        return
      }

      if (arrayComparison === 'reference') {
        // Comparación simple de referencia usando JSON.stringify
        if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
          changes[key] = updatedValue
        }
      } else {
        // Comparación inteligente de arrays: detectamos qué elementos específicos cambiaron
        // Esto es particularmente útil para arrays de objetos como identifications y phoneNumbers

        // Creamos un array para rastrear los cambios
        const arrayChanges: any[] = []
        let hasChanges = false

        // Para arrays de objetos, intenta encontrar cambios específicos en cada elemento
        if (
          originalValue.length > 0 &&
          updatedValue.length > 0 &&
          typeof originalValue[0] === 'object' &&
          typeof updatedValue[0] === 'object'
        ) {
          // Para cada elemento del array actualizado
          updatedValue.forEach((updatedItem: any, index: number) => {
            if (index < originalValue.length) {
              // Si el ítem existe en ambos arrays, comparamos detalladamente
              const nestedChanges = getChangedFields(
                originalValue[index],
                updatedItem,
                options,
              )

              if (Object.keys(nestedChanges).length > 0) {
                // Si hay cambios, añadimos el ítem completo con sus cambios
                // Alternativamente, podríamos combinar el original con los cambios
                arrayChanges[index] = {
                  ...originalValue[index],
                  ...nestedChanges,
                }
                hasChanges = true
              } else {
                // Si no hay cambios, mantenemos una referencia al objeto original
                arrayChanges[index] = originalValue[index]
              }
            } else {
              // Si es un nuevo elemento que se agregó al final
              arrayChanges[index] = updatedItem
              hasChanges = true
            }
          })

          if (hasChanges) {
            changes[key] = arrayChanges
          }
        } else {
          // Para arrays de valores primitivos
          if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
            changes[key] = updatedValue
          }
        }
      }

      return
    }

    // Para valores primitivos o si deep=false
    if (originalValue !== updatedValue) {
      changes[key] = updatedValue
    }
  })

  return changes
}

export const getError = (path: string, errors: FieldErrors<FieldValues>) => {
  const fields = path.split('.')
  let current: any = errors

  for (const field of fields) {
    if (!current[field]) return undefined
    current = current[field]
  }

  return current.message
}
