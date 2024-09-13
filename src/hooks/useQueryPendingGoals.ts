import { useQuery } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'

export function useQueryPendingGoals() {
  return useQuery<PendingGoalsResponse>({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 1 minute
  })
}
