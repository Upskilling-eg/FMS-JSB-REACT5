import React from "react";

const useFetch = (fetchFn) => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState();
  const [count, setCounter] = React.useState(0);

  const trigger = () => setCounter((prevCount) => prevCount + 1);
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await (fetchFn && fetchFn());
        setData(response);
      } catch (error) {
        setError(error);
        setIsError(true);
        console(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [count]);

  return { data, isLoading, isError, error, trigger };
};

export default useFetch;
