const LOCAL_STORAGE_KEYS = {
  Search: 'search',
  Users: 'users',
  History: 'history',
}

const getItem = (key) => {
  if (!key || typeof key !== 'string') {
    console.warn(`The ${key} is not valid!`)
    return
  }

  const value = localStorage.getItem(key)

  try {
    let data = JSON.parse(value)
    return data
  } catch {
    return value
  }
}
const setItem = (key, value) => {
  if (!key || typeof key !== 'string') {
    console.warn(`The ${key} is not valid!`)
    return
  }

  if (!value) {
    console.warn(`The ${value} is not valid!`)
    return
  }

  const data = typeof value === 'object' ? JSON.stringify(value) : value
  localStorage.setItem(key, data)
}

export default { getItem, setItem, LOCAL_STORAGE_KEYS }
