type GoalType = {
  id: string
  title: string
  completedAt: string
}

type GoalsPerDay = Reacord<string, GoalType[]>

interface SummaryResponse {
  completed: number
  total: number
  goalsPerDay: GoalsPerDay
}

interface GoalPerDayProps {
  date: string
  goals: GoalsPerDay[]
}

interface PendingGoal {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

interface PendingGoalsResponse extends Array<PendingGoal> {}
