import CollectionTable from './CollectionTable.jsx'

const columns = [
  { label: 'Activity', key: 'activityType' },
  { label: 'Started', key: 'startedAt' },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes ?? '—'} min` },
  { label: 'Distance', render: (activity) => activity.distanceMeters == null ? '—' : `${activity.distanceMeters} m` },
  { label: 'Calories', key: 'calories' },
]

export default function Activities() {
  return <CollectionTable title="Activities" collection="activities" columns={columns} />
}