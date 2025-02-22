/* eslint-disable @typescript-eslint/no-explicit-any */
interface CompareOptions {
  excludeFields?: string[]
  includeFields?: string[]
  deep?: boolean
  ignoreCase?: boolean
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
  } = options

  const changes: Record<string, any> = {}

  Object.keys(updated).forEach((key) => {
    if (includeFields && !includeFields.includes(key)) return

    if (excludeFields.includes(key)) return

    let originalValue = original[key]
    let updatedValue = updated[key]

    if (
      ignoreCase &&
      typeof originalValue === 'string' &&
      typeof updatedValue === 'string'
    ) {
      originalValue = originalValue.toLowerCase()
      updatedValue = updatedValue.toLowerCase()
    }

    const hasChanged = deep
      ? JSON.stringify(originalValue) !== JSON.stringify(updatedValue)
      : originalValue !== updatedValue

    if (hasChanged) {
      changes[key] = updated[key]
    }
  })

  return changes
}
