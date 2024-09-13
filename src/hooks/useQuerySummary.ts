import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'

export function useQuerySummary() {
  return useQuery<SummaryResponse>({
    queryKey: ['summary'],
    queryFn: async () => getSummary(),
    staleTime: 1000 * 60, // 1 minute
  })
}
