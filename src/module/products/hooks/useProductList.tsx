import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "../../../graphql/queries/product";
import { useCallback, useMemo } from "react";

const useProductList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ITEMS, {
    variables: {
      itemPageInput: {
        afterCursor: null,
        beforeCursor: null,
        limit: 10
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

  const onNext = useCallback(() => {
    refetch({
      itemPageInput: {
        afterCursor: data?.paginateItems.cursor.afterCursor,
        beforeCursor: null,
      },
    });
  }, [data?.paginateItems.cursor.afterCursor, refetch]);

  const onPrevious = useCallback(() => {
    refetch({
      itemPageInput: {
        afterCursor: null,
        beforeCursor: data?.paginateItems.cursor.beforeCursor,
      },
    });
  }, [data?.paginateItems.cursor.beforeCursor, refetch]);

  return {
    loading,
    error,
    productList,
    hasNext,
    hasPrev,
    onNext,
    onPrevious,
  };
};

export default useProductList;
