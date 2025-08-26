import PageLayout from '../../../components/ui/page-layout'
import { PageTitle } from '../../../components/ui/page-title'
import PageContent from '../../../components/ui/page-content'
import { Card, CardContent } from '../../../components/ui/card'
import { SongManagementProvider } from '../context'
import SongListAction from '../components/SongListAction'
import SongList from '../components/SongList'

const SongManagement = () => {
    return (
        <SongManagementProvider>
            <PageLayout>
                <PageTitle title='Song management' icon='song' actions={<SongListAction />}/>
                <PageContent>
                    <Card>
                        <CardContent>
                            <SongList />
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </SongManagementProvider>
    )
}

export default SongManagement