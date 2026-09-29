import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'Members', render: (team) => Array.isArray(team.members) ? team.members.length : '—' },
  { label: 'Created', key: 'createdAt' },
]

export default function Teams() {
  return <CollectionTable title="Teams" endpoint={endpoint} columns={columns} />
}