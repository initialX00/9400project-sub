import React, { useEffect } from 'react';
import useMenuData from '../../../../hooks/menu/getMenuHooks';

function CoffeeMenu({ onMenuItemClick }) {
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
                .filter((coffee) => coffee.menuCategory === "커피") // "커피"인 것만 필터링
                .map((coffee) => (
                    <div 
                        key={coffee.menuId} 
                        onClick={() => onMenuItemClick({ 
                            name: coffee.menuName, 
                            img: coffee.singleImg, 
                            img2: coffee.setImg,
                            price: coffee.menuPrice.menuPrice || 0 
                        })}
                        style={{ cursor: 'pointer' }} // 클릭 가능하도록 스타일 추가
                    >
                        <img src={coffee.singleImg} alt={coffee.menuName} />
                        <p>{coffee.menuName}</p>
                        <p>{coffee.menuPrice.menuPrice ? `${coffee.menuPrice.menuPrice}원` : "가격 없음"}</p>
                    </div>
                ))}
        </div>
    );
}

export default CoffeeMenu;
