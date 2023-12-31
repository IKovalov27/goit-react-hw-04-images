import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onNextFetch }) {
  return (
    <button className={css.button} type="button" onClick={onNextFetch}> More </button>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;