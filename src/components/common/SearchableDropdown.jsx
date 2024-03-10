import React from 'react';
import Select from 'react-select';

const SearchableDropdown = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      isSearchable={true}
      placeholder="Search..."
      onChange={onChange}
      required
    />
  );
};

export default SearchableDropdown;
