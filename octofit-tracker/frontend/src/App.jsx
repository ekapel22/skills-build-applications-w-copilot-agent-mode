import { NavLink, Route, Routes } from 'react-router-dom'
import './octofit.css'

const sections = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]
const displayDate = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}).format(new Date())

function Dashboard() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR MOVEMENT, IN ONE PLACE</p>
          <h1>Overview</h1>
        </div>
        <p className="date-stamp">{displayDate}</p>
      </div>
      <div className="welcome-panel">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h2>Make today count.</h2>
          <p>Log an activity, find your team, and keep your momentum going.</p>
        </div>
        <img src="/octofitapp-small.png" alt="OctoFit Tracker" />
      </div>
      <div className="row g-3 metric-row">
        {[
          ['Activities', 'activity records'],
          ['Teams', 'active teams'],
          ['Leaderboard', 'ranked members'],
        ].map(([label, detail]) => (
          <div className="col-12 col-md-4" key={label}>
            <article className="metric-panel">
              <span>{label}</span>
              <strong>—</strong>
              <small>{detail}</small>
            </article>
          </div>
        ))}
      </div>
      <section className="setup-note">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <h3>Your tracker is ready</h3>
          <p>New activity and team data will appear here as it is added.</p>
        </div>
      </section>
    </section>
  )
}

function CollectionPage({ title }) {
  return (
    <section className="content-section">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>{title}</h1>
      <div className="empty-state">
        <span className="empty-state-mark" aria-hidden="true">+</span>
        <h2>No {title.toLowerCase()} yet</h2>
        <p>When records are available, they will show up here.</p>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit Tracker overview">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit<span className="brand-light">Tracker</span></span>
        </NavLink>
        <p className="nav-caption">TRACK</p>
        <nav className="main-nav" aria-label="Main navigation">
          {sections.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              end={path === '/'}
              key={path}
              to={path}
            >
              <span className="nav-marker" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="profile-avatar">OF</span>
          <span><strong>OctoFit</strong><small>Personal space</small></span>
        </div>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <span className="topbar-label">FITNESS, WITH YOUR PEOPLE</span>
          <span className="connection-status"><span className="status-dot" /> Workspace</span>
        </header>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<CollectionPage title="Activities" />} path="/activities" />
          <Route element={<CollectionPage title="Teams" />} path="/teams" />
          <Route element={<CollectionPage title="Leaderboard" />} path="/leaderboard" />
          <Route element={<CollectionPage title="Workouts" />} path="/workouts" />
          <Route element={<Dashboard />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
