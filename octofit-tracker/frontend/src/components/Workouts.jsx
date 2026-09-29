import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Focus', key: 'focus' },
  { label: 'Difficulty', key: 'difficulty' },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
  { label: 'Description', key: 'description' },
]

export default function Workouts() {
  return <CollectionTable title="Workouts" endpoint={endpoint} columns={columns} />
}