import SearchForm from './SearchForm.jsx'
import Alert from './Alert.jsx'
import Table from './Table.jsx'
import Pagination from './Pagination.jsx'
import useUsersSearch from '../hooks/useUsersSearch.js'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

const SearchFormMemo = memo(SearchForm)

const SearchSection = () => {
  const {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    searchStateRef,
    getListOfUsers,
  } = useUsersSearch()

  const { value } = searchStateRef.current

  let [searchParams, setSearchParams] = useSearchParams()

  let queryFromURL = searchParams.get('query') || value
  let pageFromURL = Number(searchParams.get('page')) || 1
  let perPageFromURL = Number(searchParams.get('perPage')) || 5



  const [currentPage, setCurrentPage] = useState(pageFromURL)

  const handleUserSearch = async (valueFromForm) => {
    // reset to first page on new search
    setCurrentPage(1)

    // sync URL
    setSearchParams({
      query: valueFromForm,
      page: 1,
      perPage: 5,
    })

    // call your hook's search
    await handleSearch(valueFromForm, 1)
  }

  // const handlePageChange = useCallback(
  //   async (page, perPage) => {
  //     await paginate(page, perPage)
  //     setCurrentPage(page)
  //   },
  //   [paginate],
  // )

  const handlePageChange = useCallback(
    async (page, perPage) => {
      setCurrentPage(page)

      setSearchParams({
        query: value,
        page,
        perPage,
      })

      await paginate(page, perPage)
    },
    [paginate, setSearchParams, value],
  )

  // useEffect(() => {
  //   if (!queryFromURL) return;
  //   handleSearch(queryFromURL, pageFromURL, perPageFromURL);
  //   paginate(pageFromURL, perPageFromURL);
  //
  // }, [queryFromURL, pageFromURL, perPageFromURL]);

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

      {error ? <Alert message={error} /> : null}
      {loading ? <div>Loading...</div> : null}
    </>
  )
}

export default SearchSection
