import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Search = ({ handleSearch, search }) => {
  return (
    <>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control
            type='text'
            placeholder='Search post...'
            onChange={handleSearch}
            value={search}
          />
        </Form.Group>
      </Form>
    </>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default Search;
