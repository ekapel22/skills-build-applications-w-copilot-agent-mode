import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { label: 'Activity', key: 'activityType' },
  { label: 'Started', key: 'startedAt' },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes ?? '—'} min` },
  { label: 'Distance', render: (activity) => activity.distanceMeters == null ? '—' : `${activity.distanceMeters} m` },
  { label: 'Calories', key: 'calories' },
]

export default function Activities() {
  return <CollectionTable title="Activities" endpoint={endpoint} columns={columns} />
}