export async function deleteGoalCompletion(goilId: string) {
  await fetch('http://localhost:3333/completions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ goalId: goilId }),
  })
}
