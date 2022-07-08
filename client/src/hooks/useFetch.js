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
          setLoading(false);
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters]);

  return {
    loading,
    response,
    error,
  };
};

const UsePost = (
  path,
  payload,
  headers = { 'content-type': 'application/json' }
) => {
  return (async () => {
    try {
      const result = await axios.post(path, JSON.stringify(payload), headers);
      if (result.status >= 400) throw new Error(result.data.message);
      return {
        error: false,
        response: result,
        loading: false,
      };
    } catch (err) {
      return {
        error: err,
        loading: false,
      };
    }
  })();
};

const UseDelete = (path, headers = { 'content-type': 'application/json' }) => {
  return (async () => {
    try {
      const result = await axios.delete(path, { headers });
      if (result.status >= 400) throw new Error(result.data.message);
      return {
        error: false,
        response: result,
        loading: false,
      };
    } catch (error) {
      return {
        error,
        loading: false,
      };
    }
  })();
};

const useFetch = {
  useGet: UseGet,
  usePost: UsePost,
  useDelete: UseDelete,
};

export default useFetch;
