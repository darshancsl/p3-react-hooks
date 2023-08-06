import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Cards from "./Components/Cards/Cards";
import { hooksNav } from "./utils/hooksNav";
import HooksComponent from "./Components/HooksComponent/HooksComponent";
import Search from "./Components/HooksComponent/ChildComponents/Search";
import useFetch from "./Hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "./Hooks/useDebounce";

function App() {
  const debounceDelay = 500;
  const [search, setSearch] = useState("");
  const [data, loading, error] = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [filteredData, setFilteredData] = useState(data || []);

  const debouncedSearchTerm = useDebounce(search, debounceDelay);

  const fetchSearchResults = useCallback(
    (search) => {
      const filterArr = data?.filter(({ title }) => {
        return title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredData(filterArr);
    },
    [data]
  );

  useEffect(() => {
    fetchSearchResults(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchSearchResults]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='overflow-hidden'>
      <Header />
      <Routes>
        <Route index element={<Cards hooks={hooksNav} />} />
        <Route
          path='/hooks'
          element={
            <HooksComponent
              data={
                filteredData?.length ? filteredData : search !== "" ? [] : data
              }
              loading={loading}
              error={error}
            />
          }
        >
          <Route
            path='search'
            element={<Search handleSearch={handleSearch} search={search} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
