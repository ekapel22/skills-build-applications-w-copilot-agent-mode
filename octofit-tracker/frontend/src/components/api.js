const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(collection, signal) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}