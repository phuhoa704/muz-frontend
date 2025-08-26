import { Card, CardContent } from "../../../components/ui/card"
import PageContent from "../../../components/ui/page-content"
import PageLayout from "../../../components/ui/page-layout"
import { PageTitle } from "../../../components/ui/page-title"
import ArtistList from "../components/ArtistList"
import ArtistListAction from "../components/ArtistListAction"
import { ArtistManagementProvider } from "../context"

const ArtistMangement = () => {
  return (
    <ArtistManagementProvider>
      <PageLayout>
        <PageTitle title="Artist management" icon="musician" actions={<ArtistListAction />}/>
        <PageContent className="space-y-4">
          <Card>
            <CardContent>
              <ArtistList />
            </CardContent>
          </Card>
        </PageContent>
      </PageLayout>
    </ArtistManagementProvider>
  )
}

export default ArtistMangement