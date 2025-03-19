import React, { useEffect } from 'react';
import useMenuData from '../../../../hooks/menu/getMenuHooks';

function DrinkMenu({ onMenuItemClick }) {
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
                .filter((drink) => drink.menuCategory === "음료") // "음료"인 것만 필터링
                .map((drink) => (
                    <div 
                        key={drink.menuId} 
                        onClick={() => onMenuItemClick({ 
                            name: drink.menuName, 
                            img: drink.singleImg, 
                            img2: drink.setImg,
                            price: drink.menuPrice.menuPrice || 0 
                        })}
                        style={{ cursor: 'pointer' }} // 클릭 가능하도록 스타일 추가
                    >
                        <img src={drink.singleImg} alt={drink.menuName} />
                        <p>{drink.menuName}</p>
                        <p>{drink.menuPrice.menuPrice ? `${drink.menuPrice.menuPrice}원` : "가격 없음"}</p>
                    </div>
                ))}
        </div>
    );
}

export default DrinkMenu;
