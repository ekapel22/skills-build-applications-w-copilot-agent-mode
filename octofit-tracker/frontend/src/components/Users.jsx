import CollectionTable from './CollectionTable.jsx'

const columns = [
  { label: 'Name', key: 'displayName' },
  { label: 'Email', key: 'email' },
  { label: 'Joined', key: 'createdAt' },
]

export default function Users() {
  return <CollectionTable title="Users" collection="users" columns={columns} />
}