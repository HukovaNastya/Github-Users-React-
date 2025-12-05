const UserHistory = ({ userHistoryData, refetch }) => {
  return (
    <>
      {userHistoryData?.length > 0 ? (
        <div className="search-section user_history">
          <h1 className="search-item_title">Recent Searches:</h1>
          <ul className="user_history_list">
            {userHistoryData.map((item, index) => (
              <li key={index}>
                <div className="previous-search" onClick={() => refetch(item)}>
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default UserHistory
