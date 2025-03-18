/**@jsxImportSource @emotion/react */
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAllMenuList, useGetCategories, useMenuListByCategoryApi } from '../../../queries/AdminQuery/AdminMenuBoardQuery';

function AdminMenuPage(props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1"); //현재 페이지번호 읽기
    const category = searchParams.get("category") || "전체"; //카테고리 상태
    const { data: searchMenuList } = useAllMenuList(); //모든 메뉴 불러오기

    const [ pageNumbers, setPageNumbers ] = useState([]); //페이지 번호 상태
    const [ totalPages, setTotalPages ] = useState(1); //총 페이지 수 상태

    const countMenuListByCategory = useMenuListByCategoryApi({
        page,
        limitCount: 10,
        category,
    })


    //카테고리
    const basicCategories = [
        {label: "전체", value: "전체"},
    ];

    const { data: getCategory } = useGetCategories();

    const selectCategories = [
        ...basicCategories,
        ...(getCategory?.data.map((category) => ({
            label: category,
            value: category
        })) || [])
    ];
    //console.log(selectCategories);



    //페이지 관련 작성해야 오류해결
    useEffect(() => {
        if(!countMenuListByCategory.isLoading) {
            const currentPage = countMenuListByCategory?.data?.data.page || 1;
            const totalPages = countMenuListByCategory?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex = startIndex + 4 > totalPages ? totalPages :startIndex + 4;

            let newPageNumbers = [];
            for(let i = startIndex; i <= endIndex; i++ ) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [countMenuListByCategory.data]);

        // const handlePageNumbersOnClick = (pageNumber) => {
    //     searchParams.set("page", pageNumber);
    //     setSearchParams(searchParams);
    // }

    //카테고리 바꾸면 다시 로딩
    // useEffect(() => {
    //     searchMenuList.refetch();
    // }, [searchParams]);

    



    //카테고리, 페이지 변동시 재로딩
    useEffect(() => {
    }, [searchParams]);

    const handleSelectCategoryOnChange = (option) => {
        searchParams.set("category", option.target.value);
        setSearchParams(searchParams);
    }

    const handlePageNumbersOnClick = (option) => {
        searchParams.set("page", option.target.value);
        setSearchParams(searchParams);
    }



    //console.log(searchMenuList);
    //목록 불러오기
    const renderMenuList = () => {
        //카테고리가 해당하는 메뉴 불러오기.
        if (category !== "전체") {
            return searchMenuList?.data
            .filter((menu) => menu.menuCategory === category) 
            .map((menu) => (
                <li key={menu.menuId}>
                    <div>{menu.menuId}</div>
                    <div>{menu.menuName}</div>
                    <div>{menu.menuPrice[0].menuPrice}</div>
                    <div>{menu.isExposure}</div>
                </li>
            ));
        }
        // 카테고리가 '전체'인 경우, 모든 메뉴 출력
        return searchMenuList?.data.map((menu) => (
            <li key={menu.menuId}>
                <div>{menu.menuId}</div>
                <div>{menu.menuName}</div>
                <div>{menu.menuPrice[0].menuPrice}</div>
                <div>{menu.isExposure}</div>
            </li>
        ));
    };

    
    return (
        <div css={s.container}>
            <div css={s.header}>
                <span>메뉴관리</span>
                <div>
                    <Select 
                        options={selectCategories}
                        styles={{
                            control: (style) => ({
                                ...style,
                                width: "11rem",
                                minHeight: "3rem",
                            }),
                            dropdownIndicator: (style) => ({
                                ...style,
                                padding: "0.3rem",
                            })
                        }}
                        value={category}
                        onChange={handleSelectCategoryOnChange}
                        fullWidth
                    >
                        {selectCategories.map((categoryOption) => (
                        <MenuItem key={categoryOption.value} value={categoryOption.value}>
                            {categoryOption.label}
                        </MenuItem>
                    ))}
                    </Select>
                </div>
            </div>

            <div>
                <h3>{category !== '전체' ? `${category} 리스트` : "전체 리스트"}</h3>
                <ul css={s.menuListContainer}>
                    <li>
                        <div>NO.</div>
                        <div>Name</div>
                        <div>Price</div>
                        <div>On/Off</div>
                    </li>
                    { renderMenuList() }
                </ul>
            </div>

            <div css={s.footer}>
                <button disabled={page <= 1} onClick={() => handlePageNumbersOnClick(page - 1)}>
                    <GoChevronLeft />
                </button>
                {
                    pageNumbers.map(number =>
                        <button key={number} css={s.pageNum(page === number)} onClick={() => handlePageNumbersOnClick(number)}>
                            <span>{number}</span>
                        </button>
                    )
                }
                <button disabled={page >= totalPages} onClick={() => handlePageNumbersOnClick(page + 1)}>
                    <GoChevronRight />
                </button>
            </div>
        </div>
    );
}

export default AdminMenuPage;



    //한 페이지당 담길 리스트
    // const renderMenuList = () => {
    //     const startIndex = (page - 1) * 5;
    //     const endIndex = startIndex + 5;

    //     let filteredContents = [];

    //     if (category === "all") { // "all"일 때 모든 카테고리 항목을 출력
    //         Object.keys(categoryLists).forEach((key) => {
    //             filteredContents = [...filteredContents, ...categoryLists[key]];
    //         });
    //     } else { // "all"이 아닐 경우, 선택된 카테고리만 출력
    //         filteredContents = categoryLists[category];
    //     }

    //     setTotalPages(Math.ceil(filteredContents.length / 5));

    //     if (filteredContents.length === 0) {
    //         return <p>메뉴가 없습니다.</p>;
    //     }

    //     return filteredContents.slice(startIndex, endIndex).map((item, index) => (
    //             <li key={index}>
    //                 {item.name} - {item.price}
    //             </li>
    //     ));
    // }


    //리스트 페이지 번호 설정
    // useEffect(() => {
    //     if (!isLoding) {
    //         const totalPages = Math.ceil(Object.values(categoryLists).flat().length / 5); 
    //         const currentPage = page;

    //         const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
    //         const endIndex = startIndex + 4 > totalPages ? totalPages : startIndex + 4;

    //         let newPageNumbers = [];
    //         for (let i = startIndex; i <= endIndex; i++) {
    //             newPageNumbers.push(i);
    //         }

    //         // pageNumbers 상태가 변경된 값과 다를 때만 업데이트
    //         if (JSON.stringify(newPageNumbers) !== JSON.stringify(pageNumbers)) {
    //             setPageNumbers(newPageNumbers);
    //         }
    //     }
    // }, [category, page, pageNumbers]);

    // //페이지 이동 시 페이지 번호 상태 업데이트
    // const handlePageNumberOnClick = (pageNumber) => {
    //     // searchParams.set("page", pageNumber);
    //     // setSearchParams(searchParams);
    //     setSearchParams({ page: pageNumber }); 
    // }


    //  // 카테고리 선택시 상태 업데이트
    //  const handleCategoryChange = (event) => {
    //     setCategory(event.target.value);
    // };