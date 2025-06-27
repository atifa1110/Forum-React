import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ label, checked, onChange }) {
  return (
    <label className="category-option">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="selected-category">{label}</span>
    </label>
  );
}

CategoryItem.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CategoryItem;
