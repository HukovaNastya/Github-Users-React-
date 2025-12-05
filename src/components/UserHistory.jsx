const UserHistory = ({userHistoryData, refetch}) => {
  return (
    <div>
      {userHistoryData?.length > 0 ? (
        <ul style={{ display: 'flex' }}>
          {userHistoryData.map((item, index) => (
            <li key={index}>
              <div
                className="previous-search"
                onClick={() => refetch(item)}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default UserHistory;