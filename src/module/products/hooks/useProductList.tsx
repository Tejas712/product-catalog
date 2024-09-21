import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "../../../graphql/queries/product";
import { useCallback, useMemo, useState } from "react";

const useProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_ALL_ITEMS, {
    variables: {
      itemPageInput: {
        afterCursor: null,
        beforeCursor: null,
        limit: 10,
      },
    },
  });

  const productList = useMemo(() => {
    return data?.paginateItems.data || [];
  }, [data]);

  const hasNext = useMemo(() => {
    return Boolean(data?.paginateItems.cursor.afterCursor);
  }, [data]);

  const hasPrev = useMemo(() => {
    return Boolean(data?.paginateItems.cursor.beforeCursor);
  }, [data]);

  const onChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const onSearch = useCallback(() => {
    refetch({
      itemPageInput: {
        afterCursor: data?.paginateItems.cursor.afterCursor,
        beforeCursor: null,
        name: searchQuery,
      },
    });
  }, [data?.paginateItems.cursor.afterCursor, refetch, searchQuery]);

  const onNext = useCallback(() => {
    refetch({
      itemPageInput: {
        afterCursor: data?.paginateItems.cursor.afterCursor,
        beforeCursor: null,
        name: searchQuery,
      },
    });
  }, [data?.paginateItems.cursor.afterCursor, refetch, searchQuery]);

  const onPrevious = useCallback(() => {
    refetch({
      itemPageInput: {
        afterCursor: null,
        beforeCursor: data?.paginateItems.cursor.beforeCursor,
        name: searchQuery,
      },
    });
  }, [data?.paginateItems.cursor.beforeCursor, refetch, searchQuery]);

  return {
    loading,
    error,
    productList,
    hasNext,
    hasPrev,
    searchQuery,
    onChangeSearch,
    onNext,
    onPrevious,
    onSearch,
  };
};

export default useProductList;
