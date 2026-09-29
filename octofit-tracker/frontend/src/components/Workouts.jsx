import CollectionTable from './CollectionTable.jsx'

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Focus', key: 'focus' },
  { label: 'Difficulty', key: 'difficulty' },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
  { label: 'Description', key: 'description' },
]

export default function Workouts() {
  return <CollectionTable title="Workouts" endpoint="/api/workouts/" columns={columns} />
}