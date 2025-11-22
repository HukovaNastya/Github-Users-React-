import SearchForm from './SearchForm.jsx'
import Alert from './Alert.jsx'
import Table from './Table.jsx'
import Pagination from './Pagination.jsx'
import useUsersSearch from '../hooks/useUsersSearch.js'
import { memo, useCallback, useState } from 'react'

const SearchFormMemo = memo(SearchForm)

const SearchSection = () => {
  const {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    perPageFromURL,
    searchValue,
    pageFromURL,
  } = useUsersSearch()
  // Use useSearchParams hook from react-router-dom
  // https://reactrouter.com/api/hooks/useSearchParams
  // Move all URL manipulation logic here
  // searchParams.get("query")

  const [currentPage, setCurrentPage] = useState(pageFromURL)

  const handlePageChange = useCallback(
    async (page, perPage) => {
      await paginate(page, perPage)
      setCurrentPage(page)
    },
    [paginate],
  )

  // TODO: add handler for handleSearch function here, to handle URL query
  // setSearchParams({ query: searchValue, page: currentPage, perPage  });
  // handleSearch(...)

  // TODO: move paginate function from the hook to this component

  return (
    <>
      {/*  TODO: add a new initialSearchValue prop */}
      <SearchFormMemo onSubmit={handleSearch} searchValue={searchValue} />

      {usersInfo.items?.length && !loading ? (
        <Table
          theadData={[
            'Username',
            'Repositories',
            'Followers',
            'Profile',
            'Actions',
          ]}
          tbodyData={usersInfo.items}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Pagination
          currentPage={currentPage}
          totalCount={usersInfo.meta.totalCount}
          onChange={handlePageChange}
          perPage={perPageFromURL}
        />
      </div>

      {error ? <Alert message={error} /> : null}
      {loading ? <div>Loading...</div> : null}
    </>
  )
}

export default SearchSection
