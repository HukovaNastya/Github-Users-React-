import SearchSection from '../components/SearchSection.jsx'
import { Link } from 'react-router-dom'

function SearchPage() {
  return (
    <>
      <SearchSection />
      <div style={{ padding: '20px' }}>
        <Link
          to={`/`}
          className="profile-link btn-primary"
          style={{
            padding: '10px',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '4px',
            marginLeft: '20px',
          }}
        >
          Go Back HOME →
        </Link>
      </div>
    </>
  )
}

export default SearchPage
