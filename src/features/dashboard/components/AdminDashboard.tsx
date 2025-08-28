// import { PatternCard } from '../../../components/common/pattern-card'
import { Card, CardContent } from '@/components/ui/card'

const AdminDashboard = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <div className="overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-12">
                {/* <PatternCard /> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
