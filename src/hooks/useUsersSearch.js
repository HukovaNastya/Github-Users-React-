import { useCallback, useRef, useState, useEffect } from 'react'
import { getUserByLogin, searchUsers } from '../services/githubUser.service.js'
import localStorageService from './useStorage.js'
import { useNavigate, useLocation } from 'react-router-dom'

const storageKeys = localStorageService.LOCAL_STORAGE_KEYS

function useUsersSearch() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  // TODO: remove
  const searchValue = params.get('query') || null
  const pageFromURL = Number(params.get('page')) || 1
  const perPageFromURL = Number(params.get('perPage')) || 5
  // TODO: remove
  const didMountRef = useRef(false)

  // TODO: remove
  useEffect(() => {
    if (!searchValue) return
    if (didMountRef.current) {
      getListOfUsers(searchValue, pageFromURL, perPageFromURL)
    } else {
      didMountRef.current = true
    }
  }, [searchValue, pageFromURL, perPageFromURL])

  const searchStateRef = useRef({ value: searchValue || '' })

  const [usersInfo, setUsersInfo] = useState(() => {
    // const users = localStorageService.getItem(storageKeys.Users)
    // return users || { items: [], meta: { totalCount: 0 } }
    return { items: [], meta: { totalCount: 0 } }
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getListOfUsers = async (
    value,
    page = pageFromURL,
    perPage = perPageFromURL,
  ) => {
    setLoading(true)
    setError(null)

    try {
      const users = await searchUsers(value, perPage, page)

      const usersData = await Promise.all(
        users.items.map(({ login }) => getUserByLogin(login)),
      )

      const newUsersInfo = {
        items: usersData,
        meta: { totalCount: users.total_count },
      }

      setUsersInfo(newUsersInfo)
      searchStateRef.current.value = value
      const newURL = `/search?query=${encodeURIComponent(value)}&page=${page}&perPage=${perPage}`
      if (location.pathname + location.search !== newURL) {
        navigate(newURL, { replace: false })
      }
      // TODO: move to SearchSection component
      localStorageService.setItem(storageKeys.Users, newUsersInfo)
      // TODO: return newUsersInfo
    } catch (err) {
      setError(err.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = useCallback(async (searchValue, page = pageFromURL) => {
    if (!searchValue) {
      setError('Please enter the value before searching!')
      return
    }

    setUsersInfo({ items: [], meta: { totalCount: 0 } })

    await getListOfUsers(searchValue, page)
  }, [])

  // Change page
  const paginate = async (
    pageNumber = pageFromURL,
    perPage = perPageFromURL,
  ) => {
    await getListOfUsers(searchStateRef.current.value, pageNumber, perPage)
  }

  return {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    perPageFromURL,
    searchValue,
    pageFromURL,
  }
}

export default useUsersSearch
