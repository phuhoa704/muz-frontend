import PageContent from '../../../components/ui/page-content'
import PageLayout from '../../../components/ui/page-layout'
import { PageTitle } from '../../../components/ui/page-title'
import AdminDashboard from '../components/AdminDashboard'

const DashboardPage = () => {
  return (
    <PageLayout>
        <PageTitle title='Welcome to Muz!' icon='home'/>
        <PageContent>
            <AdminDashboard />
        </PageContent>
    </PageLayout>
  )
}

export default DashboardPage