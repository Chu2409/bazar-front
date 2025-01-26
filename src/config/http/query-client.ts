'use client'

import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      // cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 2, // Reintenta 2 veces en caso de error
      refetchOnWindowFocus: false, // No refetch al enfocar la ventana
    },
  },
})

export default queryClient
