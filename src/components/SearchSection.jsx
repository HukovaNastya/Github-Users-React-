import SearchForm from './SearchForm.jsx'
import Alert from './Alert.jsx'
import Table from './Table.jsx'
import Pagination from './Pagination.jsx'
import useUsersSearch from '../hooks/useUsersSearch.js'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import UserHistory from './UserHistory'
import useSearchHistory from '../hooks/useSearchHistory'

const SearchFormMemo = memo(SearchForm)
const AlertMemo = memo(Alert)

const PER_PAGE = 5;

const SearchSection = () => {
  const {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
  } = useUsersSearch()
  console.log('Re-render SearchSection')

  const [searchParams, setSearchParams] = useSearchParams()
  const { addHistoryItem } = useSearchHistory()
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1))

  useEffect(() => {
    const query = searchParams.get('query') || ''
    const page = Number(searchParams.get('page') || 1)
    const perPage = Number(searchParams.get('perPage') || PER_PAGE)
    if (query) {
      handleSearch(query, page, perPage)
    }
  }, [searchParams, handleSearch])

  const handleUserSearch = async (searchValue) => {
    if (!searchValue) return

    addHistoryItem(searchValue)

    setCurrentPage(1)

    setSearchParams((searchParams) => {
      searchParams.set('query', searchValue)
      searchParams.set("page", "1");
      return searchParams;
    });

    await handleSearch(searchValue, 1, PER_PAGE)
  }

  const handlePageChange = useCallback(
    async (page) => {
      setCurrentPage(page)

      setSearchParams((searchParams) => {
        searchParams.set("page", page);
        return searchParams;
      });

      await paginate(page, PER_PAGE)
    },
    [paginate, setSearchParams],
  )

  return (
    <>
      <SearchFormMemo onSubmit={handleUserSearch} searchValue={searchParams.get('query') || ''} />
      <UserHistory onClick={handleUserSearch} />
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
          perPage={PER_PAGE}
        />
      </div>

      {error ? <AlertMemo message={error} /> : null}
      {loading ? <div>Loading...</div> : null}
    </>
  )
}

export default SearchSection
