import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button>
    {props.value} :: {props.children}
  </button>
);

Button.propTypes = {
  value: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
