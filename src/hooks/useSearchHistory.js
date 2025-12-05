import { useCallback, useEffect, useState } from 'react'
import localStorageService from './useStorage'

const storageKeys = localStorageService.LOCAL_STORAGE_KEYS

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState([])

  const addHistoryItem = useCallback((history) => {
    if (searchHistory.includes(history)) return

    setSearchHistory((prevSearch) => {
      const newHistory = [...prevSearch, history]
      localStorageService.setItem(storageKeys.History, newHistory)
      return newHistory
    })
  }, [searchHistory])

  const deleteHistoryItem = useCallback((history) => {
    setSearchHistory((prevSearch) => {
      const newHistory = prevSearch.filter((item) => item !== history)
      localStorageService.setItem(storageKeys.History, newHistory)
      return newHistory
    })
  }, [])

  useEffect(() => {
    console.log('Re-render useSearchHistory', searchHistory)
  }, [searchHistory])

  useEffect(() => {
    const history = localStorageService.getItem(storageKeys.History)
    if (history?.length) {
      setSearchHistory(history)
    }
  }, [])

  return {
    searchHistory,
    addHistoryItem,
    deleteHistoryItem
  }
}

export default useSearchHistory