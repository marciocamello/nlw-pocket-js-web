import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuerySummary } from '../hooks/useQuerySummary'
import dayjs from 'dayjs'
import ptPT from 'dayjs/locale/pt'
import { GoalPerDay } from './goal-per-day'
import { PendingGoals } from './pending-gols'

dayjs.locale(ptPT)

export function Summary() {
  const { data: summary } = useQuerySummary()

  if (!summary) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage =
    Math.round((summary.completed / summary.total) * 100) || 0

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou {''}
            <span className="text-zinc-100">{summary?.completed}</span> de{' '}
            <span className="text-zinc-100">{summary?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />
      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {summary.goalsPerDay &&
          Object.entries(summary.goalsPerDay).map(([date, goals]) => {
            const goalsData = goals as GoalsPerDay[]
            return <GoalPerDay key={date} date={date} goals={goalsData} />
          })}
      </div>
    </div>
  )
}
