import dayjs from 'dayjs'
import { CheckCircle2 } from 'lucide-react'
import { deleteGoalCompletion } from '../http/delete-goal-completion'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'

export function GoalPerDay({ date, goals }: GoalPerDayProps) {
  const queryClient = useQueryClient()
  const weekDay = dayjs(date).format('dddd')
  const formatedDate = dayjs(date).format('D[ de ]MMMM')

  async function handleDeleteGoal(goaldId: string) {
    await deleteGoalCompletion(goaldId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">
        <span className="capitalize">{weekDay} </span>
        <span className="text-zinc-400 text-xs ">({formatedDate})</span>
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map((goal: GoalType) => {
          const time = dayjs(goal.completedAt).format('HH:mm')
          return (
            <li key={goal.id} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">{goal.title}</span>" às{' '}
                <span className="text-zinc-100">{time}</span>
                {/* <Button
                  type="button"
                  title="desfazer"
                  variant="link"
                  className="hover:underline float-end p-0 px-2"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  Desfazer
                </Button> */}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
