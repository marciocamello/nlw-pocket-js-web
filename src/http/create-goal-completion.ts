export async function createGoalCompletion(goilId: string) {
  await fetch('http://localhost:3333/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ goalId: goilId }),
  })
}
