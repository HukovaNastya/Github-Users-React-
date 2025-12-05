import useSearchHistory from '../hooks/useSearchHistory'

const UserHistory = ({ onClick }) => {
  const { searchHistory, deleteHistoryItem } = useSearchHistory()

  return (
    <>
      {searchHistory.length ? (
        <div className="search-section user_history">
          <h1 className="search-item_title">Recent Searches:</h1>
          <ul className="user_history_list">
            {searchHistory.map((item, index) => (
              <li key={index} className='user_history-item'>
                  <div className="previous-search" onClick={() => onClick(item)}>
                    {item}
                  </div>
                  <button className="delete-btn" onClick={() => deleteHistoryItem(item)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default UserHistory
