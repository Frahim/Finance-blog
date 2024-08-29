'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <div className='searchForm'>
      <h2 className="wp-block-heading">Search</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path d="M8.25 14.3229C11.5637 14.3229 14.25 11.6347 14.25 8.31857C14.25 5.00245 11.5637 2.31421 8.25 2.31421C4.93629 2.31421 2.25 5.00245 2.25 8.31857C2.25 11.6347 4.93629 14.3229 8.25 14.3229Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.7498 15.824L12.4873 12.5591" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
      </form>
    </div>
  );
};

export default SearchComponent;
