const UserHistory = ({ userHistoryData, refetch, deleteItem}) => {
  return (
    <>
      {userHistoryData?.length > 0 ? (
        <div className="search-section user_history">
          <h1 className="search-item_title">Recent Searches:</h1>
          <ul className="user_history_list">
            {userHistoryData.map((item, index) => (
              <li key={index} className='user_history-item'>
                  <div className="previous-search" onClick={() => refetch(item)}>
                    {item}
                  </div>
                  <button className="delete-btn" onClick={() => deleteItem(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default UserHistory
