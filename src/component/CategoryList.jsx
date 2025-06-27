import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

function CategoryList({ categories, selectedCategories, onCategoryChange, onClear }) {
  return (
    <aside className="categories-box">
      <div className="categories-header">
        <h3>Categories</h3>
        <button className="clear-button" onClick={onClear}>Clear All</button>
      </div>

      {categories.map((category) => (
        <CategoryItem
          key={category}
          label={category}
          checked={selectedCategories.includes(category)}
          onChange={() => onCategoryChange(category)}
        />
      ))}
    </aside>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onCategoryChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};


export default CategoryList;
