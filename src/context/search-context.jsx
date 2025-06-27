import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 1. Create the Context
export const SearchContext  = React.createContext(null);

export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};