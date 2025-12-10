import React from 'react';
import './SearchInput.css';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-icon"></span>
    </div>
  );
};

export default SearchInput;