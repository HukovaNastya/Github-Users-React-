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

  // useEffect(() => {
  //   if (!queryFromURL) return
  //
  //   if (pageFromURL === 1) {
  //     handleSearch(queryFromURL, pageFromURL, perPageFromURL)
  //   } else {
  //     paginate(pageFromURL, perPageFromURL)
  //   }
  //
  //   setCurrentPage(pageFromURL)
  // }, [searchParams])

  const handleUserSearch = async (valueFromForm) => {
    if (!valueFromForm.trim()) return; // avoid empty search

    setCurrentPage(1);

    setSearchParams({
      query: valueFromForm,
      page: 1,
      perPage: perPageFromURL
    });

    await handleSearch(valueFromForm, 1, perPageFromURL);
  }

  const handlePageChange = useCallback(
    async (page, perPage) => {
      setCurrentPage(page)

      setSearchParams({
        query: queryFromURL,
        page:pageFromURL,
        perPage:perPageFromURL,
      })

      await paginate(page, perPage)
    },
    [paginate, setSearchParams, queryFromURL, perPageFromURL, pageFromURL],
  )

  // TODO: add handler for handleSearch function here, to handle URL query
  // setSearchParams({ query: searchValue, page: currentPage, perPage  });
  // handleSearch(...)

  // TODO: move paginate function from the hook to this component

  return (
    <>
      <SearchFormMemo onSubmit={handleUserSearch} searchValue={queryFromURL} />
      {/*<SearchFormMemo onSubmit={handleSearch} searchValue={searchValue} />*/}

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
