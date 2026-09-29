import CollectionTable from './CollectionTable.jsx'

const columns = [
  { label: 'Member', key: 'user' },
  { label: 'Team', key: 'team' },
  { label: 'Points', key: 'points' },
  { label: 'Period', key: 'periodStart' },
]

export default function Leaderboard() {
  return <CollectionTable title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}