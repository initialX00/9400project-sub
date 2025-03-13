import { QueryClient, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainSidebar from '../../../components/common/MainSidebar/MainSidebar';
import MainContainer from '../../../components/common/MainContainer/MainContainer';
import AdminMenuPage from '../../../pages/AdminPage/AdminMenuPage/AdminMenuPage';
import AdminProductPage from '../../../pages/AdminPage/AdminProductPage/AdminProductPage';
import AdminOptionPage from '../../../pages/AdminPage/AdminOptionPage/AdminOptionPage';
import AdminAccountPage from '../../../pages/AdminPage/AdminAccountPage/AdminAccountPage';
import AdminOrderPage from '../../../pages/AdminPage/AdminOrderPage/AdminOrderPage';
import AdminSalesPage from '../../../pages/AdminPage/AdminSalesPage/AdminSalesPage';

function AdminMainRoute(props) {
    //로그인 구현 후 사용
    // const navigate = useNavigate();
    // const queryClient = useQueryClient();
    // const queryState = queryClient.getQueryState(["userMeQuery"]);

    //f로그아웃 상태로 접근 시 로그인 페이지로
    // useEffect (() => {
    //     if(queryState.status === "error") {
    //         navigate("/auth/login");
    //     }
    // }, [queryState]);

    return (
        //queryState.status === "success" &&
        <>
            <MainSidebar />
            <MainContainer>
                <Routes>
                    <Route path='/menu/setting' element={<AdminMenuPage />} /> 
                    <Route path='/product/setting' element={<AdminProductPage />} /> 
                    <Route path='/option/setting' element={<AdminOptionPage />} /> 
                    <Route path='/sales/statement' element={<AdminSalesPage />} /> 
                    <Route path='/order/list' element={<AdminOrderPage />} /> 
                    <Route path='/account/setting' element={<AdminAccountPage />} /> 
                </Routes>
            </MainContainer>
        </>
    )
}

export default AdminMainRoute;