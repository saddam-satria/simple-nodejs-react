import { useState, useEffect, useRef } from 'react';
import axios from '../config/axios';

const UseGet = (
  path,
  parameters = null,
  headers = { 'content-type': 'application/json' }
) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    if (mounted) {
      (async () => {
        try {
          const result = await axios.get(
            `${path}${parameters ? `?${parameters}` : ''}`,
            { headers }
          );

          if (result.status >= 400) throw new Error(result.data.message);
          setResponse(result);

          setLoading(false);
        } catch (err) {
          setError(err);
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    response,
    error,
  };
};

const useFetch = {
  useGet: UseGet,
};

export default useFetch;
