import PropTypes from 'prop-types';

import css from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <div className={css.filterContainer}>
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Start typing to find a contact"
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
