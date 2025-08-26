import { Card, CardContent } from '../../../components/ui/card'
import LoginForm from '../components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[350px] md:w-[400px] h-max">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
