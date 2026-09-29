import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { label: 'Name', key: 'displayName' },
  { label: 'Email', key: 'email' },
  { label: 'Joined', key: 'createdAt' },
]

export default function Users() {
  return <CollectionTable title="Users" endpoint={endpoint} columns={columns} />
}