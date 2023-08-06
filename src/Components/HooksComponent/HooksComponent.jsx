import { ListGroup, Spinner } from "react-bootstrap";
import usePagination from "../../Hooks/usePagination";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const HooksComponent = ({ data, error, loading }) => {
  const initialOffset = 0;
  const totalItems = data?.length;
  const visiblePages = 5;
  const pageSize = 10;

  const {
    currentPage,
    totalPages,
    size,
    currentOffset,
    handleNextPage,
    handlePrevPage,
    goToPage,
    getPaginationArray,
  } = usePagination(initialOffset, totalItems, pageSize, visiblePages);

  const paginationData = data?.slice(currentOffset, currentOffset + size);

  return (
    <>
      <h1 className='text-center py-5 fw-bold'>Posts App</h1>
      <button className='btn btn-primary rounded-0 m-3'>
        <Link to='search' className='text-light text-decoration-none'>
          Search
        </Link>
      </button>
      <ListGroup variant='flush' className='m-3 p-5 shadow-lg'>
        <Outlet />
        <div className='pagination mb-3'>
          <button
            className='btn btn-primary mx-1 rounded-0 fs-6'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPaginationArray().map((page) => (
            <button
              className='btn btn-primary mx-1 rounded-0 fs-6'
              key={page}
              onClick={() => goToPage(page)}
              disabled={currentPage === page}
              style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
            >
              {page}
            </button>
          ))}
          <button
            className='btn btn-primary mx-1 rounded-0 fs-6'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {loading && <Spinner />}
        {error && <h1>Error fetching</h1>}
        {paginationData?.length ? (
          paginationData?.map(({ id, title }) => {
            return (
              <ListGroup.Item key={id}>
                {id}: {title}
              </ListGroup.Item>
            );
          })
        ) : (
          <h1 className='text-center text-secondary'>No Post Found</h1>
        )}
      </ListGroup>
    </>
  );
};

HooksComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default HooksComponent;
