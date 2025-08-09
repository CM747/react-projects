import { useEffect, useState } from "react";

export default function useAsync(fetchCall, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    async function fetch() {
      const response = await fetchCall();
      setData(response);
      setIsLoading(false);
    }

    fetch();
  }, [fetchCall]);

  return {
    isLoading,
    data,
    setData,
    error,
  };
}
