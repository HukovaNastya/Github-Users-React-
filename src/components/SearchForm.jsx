import { useEffect, useState } from 'react'

const SearchForm = ({ onSubmit, searchValue = '' }) => {
  // const inputRef = useRef(searchValue)
  //
  // console.log('searchValueInput',searchValue)
  const [value, setValue] = useState(searchValue)

  // keep in sync when searchValue changes from outside
  useEffect(() => {
    setValue(searchValue)
  }, [searchValue])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
      className="search-section"
    >
      <div className="search-box">
        <input
          // ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
