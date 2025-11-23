import SearchForm from './SearchForm.jsx'
import Alert from './Alert.jsx'
import Table from './Table.jsx'
import Pagination from './Pagination.jsx'
import useUsersSearch from '../hooks/useUsersSearch.js'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

const SearchFormMemo = memo(SearchForm)
const AlertMemo =memo(Alert)

const SearchSection = () => {
  const {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    searchStateRef,
  } = useUsersSearch()

  console.log(usersInfo)

  const { value } = searchStateRef.current

  console.log(value)

  let [searchParams, setSearchParams] = useSearchParams()

  let queryFromURL = searchParams.get('query') ?? value
  let pageFromURL = Number(searchParams.get('page')) || 1
  let perPageFromURL = Number(searchParams.get('perPage')) || 5

  const [currentPage, setCurrentPage] = useState(pageFromURL);

  useEffect(() => {
    if (!queryFromURL) return
    handleSearch(queryFromURL, pageFromURL, perPageFromURL)
  }, [])

  const handleUserSearch = async (valueFromForm) => {
    if (!valueFromForm) return;

    setCurrentPage(1);

    setSearchParams({
      query: valueFromForm,
      page: 1,
      perPage: perPageFromURL
    });

    await handleSearch(valueFromForm, 1, perPageFromURL);
  }

  const handlePageChange = useCallback(
    async (page) => {
      setCurrentPage(page)

      setSearchParams({
        query: queryFromURL,
        page,
        perPage:perPageFromURL,
      })

      await paginate(page, perPageFromURL)
    },
    [paginate, setSearchParams],
  )

  return (
    <>
      <SearchFormMemo onSubmit={handleUserSearch} searchValue={queryFromURL} />
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
