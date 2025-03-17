import { api } from "../../configs/axiosConfig";

export const getCategoriesApi = async () => await api.get(`/api/admin/categories`);
export const getAllMenuListApi = async () => await api.get(`/api/admin/menu/all`);
export const getMenuListByCategoryApi = async (categoryName, params) => await api.get(`/api/admin/menu/${categoryName}`, {params});