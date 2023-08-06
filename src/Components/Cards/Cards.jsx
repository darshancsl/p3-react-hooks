import { Col, NavLink, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Cards = ({ hooks }) => {
  return (
    <>
      <h1 className='text-center py-5 fw-bold'>Custom Hooks examples</h1>
      <Row>
        {hooks.map(({ name, path, desc }) => {
          return (
            <Col key={name} className='col-12 col-md-6 col-lg-4'>
              <NavLink as={Link} to={path} className='mb-2'>
                <Card className='m-1'>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{desc}</Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

Cards.propTypes = {
  hooks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cards;
