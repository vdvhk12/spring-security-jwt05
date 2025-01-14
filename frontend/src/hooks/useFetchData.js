import { useState, useEffect } from "react";

const useFetchData = (url, accessToken, refreshAccessToken) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `${accessToken}`
          }
        });

        if(response.status === 401) {
          // 액세스 토큰 갱신
          const newAccessToken = await refreshAccessToken();

          const retryResponse = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `${newAccessToken}`,
            }
          });

          if(!retryResponse.ok) {
            setError("Failed to fetch data after refresh");
          }

          const result = await retryResponse.json();
          setData(result);
        } else if(!response.ok) {
          setError("Failed to fetch data");
        } else {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, accessToken, refreshAccessToken]);

  return { data, loading, error };
}

export default useFetchData;