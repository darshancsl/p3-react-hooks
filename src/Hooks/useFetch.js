import { useEffect, useState } from "react";

const useFetch = (path) => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDataFn = async (path) => {
    try {
      setIsLoading(true);
      const resp = await fetch(path);
      if (!resp.ok) {
        throw new Error("Error in network response");
      }
      const data = await resp.json();
      setFetchData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFn(path);
  }, [path]);

  return [fetchData, loading, error];
};

export default useFetch;