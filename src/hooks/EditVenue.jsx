import { useEffect, useState } from 'react';

const useEditRequest = (url, deps = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const editData = async (newData) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Error sending data', response.status);
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deps.length > 0) {
      editData(deps[0]);
    }
  }, [url, ...deps]);

  return { data, loading, error, editData };
};

export default useEditRequest;
