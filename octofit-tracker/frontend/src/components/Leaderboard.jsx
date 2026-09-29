import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { label: 'Member', key: 'user' },
  { label: 'Team', key: 'team' },
  { label: 'Points', key: 'points' },
  { label: 'Period', key: 'periodStart' },
]

export default function Leaderboard() {
  return <CollectionTable title="Leaderboard" endpoint={endpoint} columns={columns} />
}