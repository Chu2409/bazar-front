import { AuthView } from '@/core/auth/presentation/views/auth-view'
import { tokenStorage } from '@/shared/utils/token-storage'
import { redirect } from 'next/navigation'

const AuthPage = () => {
  const isLogged = tokenStorage.hasToken()

  if (isLogged) redirect('/products')

  return <AuthView />
}

export default AuthPage
