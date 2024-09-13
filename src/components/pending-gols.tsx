import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQueryPendingGoals } from '../hooks/useQueryPendingGoals'
import { createGoalCompletion } from '../http/create-goal-completion'
import { useQueryClient } from '@tanstack/react-query'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data: pendingGoals, isLoading } = useQueryPendingGoals()

  if (isLoading || !pendingGoals) return null

  async function handleCompleteGoal(goaldId: string) {
    await createGoalCompletion(goaldId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals?.map((pendingGoal: PendingGoal) => {
        return (
          <OutlineButton
            key={pendingGoal?.id}
            onClick={() => handleCompleteGoal(pendingGoal?.id)}
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
