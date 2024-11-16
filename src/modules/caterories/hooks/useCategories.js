import React from "react";
import useFetch from "../../../hooks/useFetch";
import { axiosInstance } from "../../../services/api";
import { CATEGORY_URLS } from "../../../services/api/apiURLs";

const getCategories = async () => {
  let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES);
  return response;
};

const useCategories = () => {
  const { data, error, isError, isLoading, trigger } = useFetch(getCategories);

  return {
    categories: data?.data,
    categoriesError: error,
    isCategoerisError: isError,
    isLoadingCategoeries: isLoading,
    triggerCategoeris: trigger,
  };
};

export default useCategories;
