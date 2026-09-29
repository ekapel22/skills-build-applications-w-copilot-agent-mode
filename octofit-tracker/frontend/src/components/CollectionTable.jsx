import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

function CollectionTable({ title, collection, columns }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(collection, controller.signal)
      .then((items) => {
        setRecords(items)
        setStatus('success')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [collection])

  return (
    <section className="content-section">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>{title}</h1>
      {status === 'loading' && <p role="status">Loading {title.toLowerCase()}...</p>}
      {status === 'error' && <p className="text-danger" role="alert">Could not load {title.toLowerCase()}: {error}</p>}
      {status === 'success' && records.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">+</span>
          <h2>No {title.toLowerCase()} yet</h2>
          <p>When records are available, they will show up here.</p>
        </div>
      )}
      {status === 'success' && records.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${collection}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render ? column.render(record) : record[column.key] ?? '—'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionTable