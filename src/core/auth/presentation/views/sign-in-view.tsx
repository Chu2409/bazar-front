import { SignInForm } from '../components/sign-in-form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/ui-components/card'

export const SignInView = () => {
  return (
    <div className='flex h-full items-center justify-center bg-muted/50'>
      <Card className='w-full max-w-md mx-2 drop-shadow-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Ingresa tu cédula y contraseña para acceder al sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
