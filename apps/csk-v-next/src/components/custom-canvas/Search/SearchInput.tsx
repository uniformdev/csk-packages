import React from 'react';

interface SearchInputProps {
  onSearch: (term: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="
        search-input
        w-full
        rounded-md
        border
        p-2
        transition-shadow
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
      "
      type="text"
      placeholder="Search articles..."
      onChange={handleChange}
    />
  );
}

export default SearchInput;
