import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "../../../graphql/queries/product";
import { useCallback, useMemo, useState } from "react";

const useProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const { loading, error, data, refetch } = useQuery(GET_ALL_ITEMS, {
    variables: {
      itemPageInput: {
        afterCursor: null,
        beforeCursor: null,
        limit: 10,
        isAsc: sort === "ASC",
      },
    },
  });

  const itemPageInput = useMemo(() => {
    return {
      afterCursor: data?.paginateItems.cursor.afterCursor,
      beforeCursor: null,
      name: searchQuery,
      isAsc: sort === "ASC",
    };
  }, [data?.paginateItems.cursor.afterCursor, sort, searchQuery]);

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
      itemPageInput,
    });
  }, [itemPageInput, refetch]);

  const onSortingChange = useCallback(
    (value: "ASC" | "DESC") => {
      console.log("check value ==>", value);
      setSort(value);
      refetch({
        itemPageInput: { ...itemPageInput, isAsc: value === "ASC" },
      });
    },
    [itemPageInput, refetch]
  );

  const onNext = useCallback(() => {
    refetch({
      itemPageInput,
    });
  }, [itemPageInput, refetch]);

  const onPrevious = useCallback(() => {
    refetch({
      itemPageInput,
    });
  }, [itemPageInput, refetch]);

  return {
    loading,
    error,
    productList,
    hasNext,
    hasPrev,
    searchQuery,
    sort,
    onChangeSearch,
    onNext,
    onPrevious,
    onSearch,
    onSortingChange,
  };
};

export default useProductList;
