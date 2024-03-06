import React from 'react';
import Select from 'react-select';

const SearchableDropdown = ({ options }) => {
  return (
    <Select
      options={options}
      isSearchable={true}
      placeholder="Search..."
      required
    />
  );
};

export default SearchableDropdown;
