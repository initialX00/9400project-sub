import { useQuery } from "@tanstack/react-query";
import { getAllMenuListApi, getCategoriesApi, getMenuListByCategoryApi } from "../../apis/AdminApi/AdminMenuBoardApi";

export const useGetCategories = () => useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategoriesApi,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});

export const useAllMenuList = () => useQuery({
    queryKey: ["useAllMenuList"],
    queryFn: getAllMenuListApi,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});

export const useMenuListByCategory = (categoryName) => useQuery({
    queryKey: ["useMenuListByCategory", categoryName],
    queryFn:  getMenuListByCategoryApi(categoryName, params),
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});