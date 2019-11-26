import React, {useState} from 'react'
import { Search } from './search/Search';

const App: React.FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Search onSearch={setSearch} />
    </div>
  );
}

export default App;
