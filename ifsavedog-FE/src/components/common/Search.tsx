import { FaSearch } from 'react-icons/fa';

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchComponent = ({ searchQuery, onSearchChange }: SearchComponentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-100 flex items-center">
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="검색하기"
          className="w-full px-4 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchComponent;
