import React, {useState} from 'react'
import { Search } from './search/searchBox/Search';

const App: React.FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Search onSearch={setSearch} />
    </div>
  );
}

export default App;
