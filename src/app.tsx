import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { useQuerySummary } from './hooks/useQuerySummary'
import { Summary } from './components/summary'

export function App() {
  const { data: summary } = useQuerySummary()

  return (
    <Dialog>
      {summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}
      {/* <CreateGoal />  */}
    </Dialog>
  )
}
