import PageLayout from '../../../components/ui/page-layout'
import { PageTitle } from '../../../components/ui/page-title'
import PageContent from '../../../components/ui/page-content'
import { Card, CardContent } from '../../../components/ui/card'
import ReleaseList from '../components/ReleaseList'
import { ReleaseManagementProvider } from '../context'
import ReleaseListAction from '../components/ReleaseListAction'

const ReleaseManagement = () => {
    return (
        <ReleaseManagementProvider>
            <PageLayout>
                <PageTitle title="Release management" icon="album" actions={<ReleaseListAction />}/>
                <PageContent>
                    <Card>
                        <CardContent>
                            <ReleaseList />
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </ReleaseManagementProvider>
    )
}

export default ReleaseManagement