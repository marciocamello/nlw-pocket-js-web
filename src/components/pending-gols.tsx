import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQueryPendingGoals } from '../hooks/useQueryPendingGoals'

export function PendingGoals() {
  const { data: pendingGoals } = useQueryPendingGoals()

  if (!pendingGoals) return null

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals?.length > 0 &&
        pendingGoals?.map((pendingGoal: PendingGoal) => {
          return (
            <OutlineButton
              key={pendingGoal?.id}
              disabled={
                pendingGoal?.completionCount >=
                pendingGoal?.desiredWeeklyFrequency
              }
            >
              <Plus className="size-4 text-zinc-600" />
              {pendingGoal?.title}
            </OutlineButton>
          )
        })}
    </div>
  )
}
