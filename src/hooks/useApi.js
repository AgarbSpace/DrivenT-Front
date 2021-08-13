import { useState, useEffect } from "react";
import qs from "qs";

import api from "../services/api";

export default function useApi({ method, url, body, query = {}, headers }, immediately = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (immediately || count > 0) {
      act();
    }
  }, [count]);

  function act() {
    setLoading(true);

    if (Object.keys(query).length > 0) {
      url = url + qs.stringify(query);
    }
    
    api({
      method,
      url: url,
      data: body,
      headers
    }).then(response => {
      setData(response.data);
      setResponse(response);
      setError(null);
      setLoading(false);
    }).catch(error => {
      setError(error);
      setData(null);
      setResponse(null);
      setLoading(false);
    });
  }

  function repeat() {
    setCount(count + 1);
  }

  return [data, loading, error, response, repeat];
}
