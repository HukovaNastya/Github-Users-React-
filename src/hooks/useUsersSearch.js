import { useCallback, useRef, useState } from 'react'
import { getUserByLogin, searchUsers } from '../services/githubUser.service.js'
import localStorageService from '../hooks/useStorage'

const storageKeys = localStorageService.LOCAL_STORAGE_KEYS

function useUsersSearch() {
  const searchStateRef = useRef({ value: '' })
  const previousSearchRef = useRef('')

  const [usersInfo, setUsersInfo] = useState(() => {
    const users = localStorageService.getItem(storageKeys.Users)
    return users || { items: [], meta: { totalCount: 0 } }
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()

  const getListOfUsers = async (value, page, perPage) => {
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

      previousSearchRef.current = searchStateRef.current.value
      searchStateRef.current.value = value

      localStorageService.setItem(storageKeys.Users, newUsersInfo)
      return newUsersInfo
    } catch (err) {
      setError(err.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = useCallback(async (searchValue, page, perPage) => {
    if (!searchValue) {
      setError('Please enter the value before searching!')
      return
    }

    setUsersInfo({ items: [], meta: { totalCount: 0 } })

    await getListOfUsers(searchValue, page, perPage)
  }, [])

  // Change page
  const paginate = async (pageNumber, perPage) => {
    await getListOfUsers(searchStateRef.current.value, pageNumber, perPage)
  }

  return {
    usersInfo,
    loading,
    error,
    handleSearch,
    paginate,
    searchStateRef,
    getListOfUsers,
    previousSearchRef,
  }
}

export default useUsersSearch
