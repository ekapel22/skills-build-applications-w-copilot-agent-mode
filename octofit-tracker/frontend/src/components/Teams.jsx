import CollectionTable from './CollectionTable.jsx'

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'Members', render: (team) => Array.isArray(team.members) ? team.members.length : '—' },
  { label: 'Created', key: 'createdAt' },
]

export default function Teams() {
  return <CollectionTable title="Teams" endpoint="/api/teams/" columns={columns} />
}