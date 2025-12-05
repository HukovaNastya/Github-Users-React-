import SearchForm from './SearchForm.jsx'
import Alert from './Alert.jsx'
import Table from './Table.jsx'
import Pagination from './Pagination.jsx'
import useUsersSearch from '../hooks/useUsersSearch.js'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import UserHistory from './UserHistory'

const SearchFormMemo = memo(SearchForm)
const AlertMemo = memo(Alert)

const SearchSection = () => {
  const {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    searchStateRef,
    previousSearchRef,
  } = useUsersSearch()

  const { value } = searchStateRef.current
  let previousSearch = previousSearchRef.current

  let [searchParams, setSearchParams] = useSearchParams()

  let queryFromURL = searchParams.get('query') || value
  let pageFromURL = Number(searchParams.get('page')) || 1
  let perPageFromURL = Number(searchParams.get('perPage')) || 5

  const [currentPage, setCurrentPage] = useState(pageFromURL)
  const [userHistory, setUserHistory] = useState([])

  useEffect(() => {
    if (!queryFromURL) return
    handleSearch(queryFromURL, pageFromURL, perPageFromURL)
  }, [])

  const showPreviousSearch = async (prevValue) => {
    setSearchParams({
      query: prevValue,
      page: 1,
      perPage: perPageFromURL,
    })

    searchStateRef.current.value = prevValue
    queryFromURL = prevValue

    await handleSearch(prevValue, 1, perPageFromURL)
  }

  const handleUserSearch = async (valueFromForm) => {
    if (!valueFromForm) return

    if (previousSearch && !userHistory.includes(previousSearch)) {
      setUserHistory((prevSearch) => [...prevSearch, previousSearch])
    }

    setCurrentPage(1)

    setSearchParams({
      query: valueFromForm,
      page: 1,
      perPage: perPageFromURL,
    })

    await handleSearch(valueFromForm, 1, perPageFromURL)

    previousSearchRef.current = valueFromForm
    searchStateRef.current.value = valueFromForm
  }

  const handlePageChange = useCallback(
    async (page) => {
      setCurrentPage(page)

      setSearchParams({
        query: queryFromURL,
        page,
        perPage: perPageFromURL,
      })

      await paginate(page, perPageFromURL)
    },
    [paginate, setSearchParams],
  )

  return (
    <>
      <SearchFormMemo onSubmit={handleUserSearch} searchValue={queryFromURL} />
      <UserHistory userHistoryData={userHistory} refetch={showPreviousSearch} />
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

      {error ? <AlertMemo message={error} /> : null}
      {loading ? <div>Loading...</div> : null}
    </>
  )
}

export default SearchSection
