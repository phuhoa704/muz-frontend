import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SignupHeader } from './SignupHeader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type SignupFormValues = {
  email: string
  password: string
  confirm_password: string
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm_password: yup.string().required('Confirm password is required'),
})

export const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  })
  const onSubmit = (values: SignupFormValues) => {
    console.log(values)
  }
  return (
    <div>
      <SignupHeader />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="signupForm"
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
            name='password'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder='Enter your password'
                            className='border rounded-md border-primary px-2 py-1.5'
                            type='password'
                            {...field}
                            id='passwordInput'
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password:</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder='Enter your confirm password'
                            className='border rounded-md border-primary px-2 py-1.5'
                            type='password'
                            {...field}
                            id='confirmPasswordInput'
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
          />

          <div className='w-full flex justify-end'>
            <Button type='submit' className='mb-4' id='submitButton'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
