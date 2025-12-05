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
    previousSearchRef,
  } = useUsersSearch()

  console.log(usersInfo)

  const { value } = searchStateRef.current
  // const previousSearch = previousSearchRef.current

  console.log(' previousSearchRef',  previousSearchRef.current)



  let [searchParams, setSearchParams] = useSearchParams()

  let queryFromURL = searchParams.get('query') || value
  let pageFromURL = Number(searchParams.get('page')) || 1
  let perPageFromURL = Number(searchParams.get('perPage')) || 5

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const[userHistory, setUserHistory] = useState([])

  useEffect(() => {
    if (!queryFromURL) return
    handleSearch(queryFromURL, pageFromURL, perPageFromURL)
  }, [])

  // useEffect(() => {
  //   if (!queryFromURL) return
  //   handleSearch(queryFromURL, pageFromURL, perPageFromURL)
  // }, [previousSearch])


  const showPreviousSearch = async(prevValue) => {
    setSearchParams({
      query: prevValue,
      page: 1,
      perPage:perPageFromURL,
    })
    searchStateRef.current.value = prevValue
    queryFromURL = prevValue
    // setUserHistory((userHistory)=>[...userHistory, prevValue])
    await handleSearch(prevValue, 1, perPageFromURL);

  }

  const handleUserSearch = async (valueFromForm) => {
    if (!valueFromForm) return;

    setCurrentPage(1);
    setUserHistory((userHistory)=>[...userHistory, valueFromForm])

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

  console.log('searchStateRef', queryFromURL)
  console.log('userHystory',userHistory)

  return (
    <>
      <SearchFormMemo onSubmit={handleUserSearch} searchValue={queryFromURL}  />
      {userHistory.length > 0 && (
        <ul style={{display: 'flex'}}>
          {userHistory.map((item, index) => (
            <li key={index}>
              <div
                className="previous-search"
                onClick={() => showPreviousSearch(item)}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      )}

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
