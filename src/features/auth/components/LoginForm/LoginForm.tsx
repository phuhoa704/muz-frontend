import { LoginHeader } from './LoginHeader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
// import { useLoginFormContext } from '../../context'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { useLoginWithEmailAndPassword } from '../../hooks/useLoginWithEmailAndPassword'

type LoginFormValues = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginForm = () => {
  const login = useLoginWithEmailAndPassword()
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = ({ email, password }: LoginFormValues) => {
    login.mutate({ email, password })
  }
  return (
    <div>
      <LoginHeader />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="loginForm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="border rounded-md border-primary px-2 py-1.5"
                    {...field}
                    id="emailInput"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    className="border rounded-md border-primary px-2 py-1.5"
                    type="password"
                    {...field}
                    id="passwordInput"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end">
            <Button type="submit" className="mb-4" id="submitButton">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
