import React, { useEffect } from 'react';
import useMenuData from '../../../../hooks/menu/getMenuHooks';

function DessertMenu({ onMenuItemClick }) {
    // useMenuData 훅을 사용하여 메뉴 데이터를 가져옴
    const { data: menuData, error, isLoading } = useMenuData();

    useEffect(() => {
        if (menuData) {
            console.log("Fetched Menu Data:", menuData);  // 메뉴 데이터 콘솔에 출력
        }
    }, [menuData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    return (
        <div>
            {(menuData || [])
                .filter((dessert) => dessert.menuCategory === "디저트") // "디저트"인 것만 필터링
                .map((dessert) => (
                    <div 
                        key={dessert.menuId} 
                        onClick={() => onMenuItemClick({ 
                            name: dessert.menuName, 
                            img: dessert.singleImg, 
                            img2: dessert.setImg,
                            price: dessert.menuPrice.menuPrice || 0 
                        })}
                        style={{ cursor: 'pointer' }} // 클릭 가능하도록 스타일 추가
                    >
                        <img src={dessert.singleImg} alt={dessert.menuName} />
                        <p>{dessert.menuName}</p>
                        <p>{dessert.menuPrice.menuPrice ? `${dessert.menuPrice.menuPrice}원` : "가격 없음"}</p>
                    </div>
                ))}
        </div>
    );
}

export default DessertMenu;