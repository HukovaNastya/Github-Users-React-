import { useRef } from 'react'

const SearchForm = ({ onSubmit, searchValue = '' }) => {
  const inputRef = useRef()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(inputRef.current.value)
      }}
      className="search-section"
    >
      <div className="search-box">
        <input
          ref={inputRef}
          defaultValue={searchValue} // Use defaultValue for uncontrolled input
          autoComplete="off"
          className="search-input"
          id="searchInput"
          placeholder="Enter GitHub username..."
          type="text"
        />
        <button className="btn btn-primary" id="searchBtn">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
