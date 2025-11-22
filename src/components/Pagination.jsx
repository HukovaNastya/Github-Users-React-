const Pagination = ({ totalCount, onChange, currentPage, perPage = 5 }) => {
  const maxButtons = 10
  const totalNumberOfPages = Math.ceil(totalCount / perPage)
  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (_, index) => index + 1,
  )

  let firstUserIndex = (currentPage - 1) * perPage + 1
  let lastUserIndex = Math.min(currentPage * perPage, totalCount)

  if (!pageNumbers || pageNumbers.length === 0) return null

  let start = Math.max(0, currentPage - Math.floor(maxButtons / 2) - 1)
  let end = start + maxButtons

  if (end > pageNumbers.length) {
    end = pageNumbers.length
    start = Math.max(0, end - maxButtons)
  }

  const pageNumbersForPagination = pageNumbers.slice(start, end)

  return (
    <>
      <ul className="pagination">
        <button
          type="button"
          onClick={() => onChange(currentPage - 1)}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          ← Prev
        </button>

        {pageNumbersForPagination.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => onChange(number)}
              className={
                currentPage === number
                  ? 'active-pagination-button'
                  : 'pagination-button'
              }
            >
              {number}
            </button>
          </li>
        ))}

        <button
          type="button"
          onClick={() => onChange(currentPage + 1)}
          className="pagination-button"
          disabled={currentPage === pageNumbers.length}
        >
          Next →
        </button>
      </ul>

      <div style={{ padding: '5px 0 0 100px' }}>
        <h3 style={{ color: 'grey' }}>
          Showing {firstUserIndex}-{lastUserIndex} of {totalCount}
        </h3>
      </div>
    </>
  )
}

export default Pagination
