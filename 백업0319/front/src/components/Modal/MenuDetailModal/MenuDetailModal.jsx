/**@jsxImportSource @emotion/react */
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import useMenuData from '../../../hooks/menu/getMenuHooks';

// 현재 버거까지는 구현
// 버거없이 그냥 사이드만 고르면 음료만 추가 선택
// 맥모닝, 맥런치도 아직 안 만듦
// 커피, 음료도 스탭 하나 새로 만들어서 세트칸 대신에 미디엄-라지 이렇게 만들어야 함

const MenuDetailModal = ({ menu, onClose }) => { // menu, onClose -> OrderPage에서 전달받은 선택한 메뉴 상태
    const [step, setStep] = useState(1);
    const [isSet, setIsSet] = useState(null);
    const [side, setSide] = useState(null);
    const [drink, setDrink] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);

    const { data: menuData, error, isLoading } = useMenuData(); // 메뉴 데이터 및 가격을 훅에서 가져옴
    console.log("Fetched menu data:", menuData); // 메뉴 데이터 확인

    // 사이드와 음료 데이터만 필터링
    const filteredSides = menuData?.filter(item => item.menuCategory === "사이드");
    const filteredDrinks = menuData?.filter(item => item.menuCategory === "음료");
    console.log("Filtered Sides:", filteredSides); // 사이드 확인
    console.log("Filtered Drinks:", filteredDrinks); // 음료 확인

    // 기본 사이드 및 음료
    const defaultSide = filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuName;
    const defaultDrink = filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuName;
    console.log("Default side:", defaultSide); // 기본 사이드 확인
    console.log("Default drink:", defaultDrink); // 기본 음료 확인

    // 단계
    const handleNext = () => {
        console.log("Current step:", step); // 현재 단계 확인
        if (step === 1 && isSet === false) {
            handleAddToCart(); // 세트를 선택하지 않은 경우 바로 장바구니에 추가
        } else {
            setStep((prev) => prev + 1);
        }
    };

    // 세트 선택 시 기본값 설정
    const handleIsSetOnClick = (boolean) => {
        console.log("Set chosen:", boolean); // 세트 선택 확인
        setIsSet(boolean);
        if (boolean) {
            setSide(defaultSide);
            setDrink(defaultDrink);
            console.log(`세트, 추가 금액: 2000`);
        } else {
            setSide(null);
            setDrink(null);
            console.log(`단품`);
        }
    };

    const handleChangeSideOnClick = (selectedSide) => {
        console.log("Selected side:", selectedSide); // 선택한 사이드 확인
        if (isSet) {
            const newPrice = filteredSides?.find(side => side.menuName === selectedSide)?.menuPrice.menuPrice - filteredSides?.find(side => side.menuName === defaultSide)?.menuPrice.menuPrice;
            setSide(selectedSide);
            console.log(`선택한 사이드: ${selectedSide}, 추가 금액: ${newPrice}`);
        }
    };

    const handleChangeDrinkOnClick = (selectedDrink) => {
        console.log("Selected drink:", selectedDrink); // 선택한 음료 확인
        if (isSet) {
            const newPrice = filteredDrinks?.find(drink => drink.menuName === selectedDrink)?.menuPrice.menuPrice  - filteredDrinks?.find(drink => drink.menuName === defaultDrink)?.menuPrice.menuPrice ;
            setDrink(selectedDrink);
            console.log(`선택한 음료: ${selectedDrink}, 추가 금액: ${newPrice}`);
        }
    };

    const handleAddToCart = () => {
        console.log("Menu object before add:", menu); // menu 객체 확인
        const basePrice = (menu.price || 0) + (isSet ? 2000 : 0); // NaN 방지
        const sidePrice = isSet ? (side !== defaultSide ? filteredSides?.find(temp1 => temp1.menuName === side)?.menuPrice.menuPrice  - filteredSides?.find(temp1 => temp1.menuName === defaultSide)?.menuPrice.menuPrice  : 0) : 0;
        const drinkPrice = isSet ? (drink !== defaultDrink ? filteredDrinks?.find(temp2 => temp2.menuName === drink)?.menuPrice.menuPrice  - filteredDrinks?.find(temp2 => temp2.menuName === defaultDrink)?.menuPrice.menuPrice  : 0) : 0;

        console.log("Base price:", basePrice); // 기본 가격 확인
        console.log("Side price:", sidePrice); // 사이드 가격 확인
        console.log("Drink price:", drinkPrice); // 음료 가격 확인

        const orderDetails = {
            menu: menu.menuName,
            side: isSet ? side : null,
            drink: isSet ? drink : null,
            price: basePrice + sidePrice + drinkPrice
        };

        console.log("Order details before adding to cart:", orderDetails); // 장바구니에 추가할 내용 확인

        // 장바구니에 추가
        setAddedCartState((prevCart) => {
            const updatedCart = [...prevCart, orderDetails];
            console.log("Updated cart:", updatedCart); // 장바구니 업데이트 후 확인
            return updatedCart;
        });

        console.log("장바구니에 추가됨:", orderDetails);
        onClose(); // 모달 닫기
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    return (
        <div css={s.modalOverlay}>
            <div css={s.modalContent}>
                {step === 1 && (
                    <div>
                        <h3 css={s.modalBasich3}>세트 여부 선택</h3>
                        <div css={s.temp}>
                            <div css={s.modalBuguerSetImage}>
                                <div onClick={() => handleIsSetOnClick(false)}>단품 (+0원)
                                <img src={menu.img} alt={menu.name} />
                                </div>
                            </div>
                            <div css={s.modalBuguerSetImage}>
                                <div onClick={() => handleIsSetOnClick(true)}>세트 (+2000원)
                                <img src={menu.img2} alt={menu.name} />
                                </div>
                            </div>
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>다음</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3 css={s.modalBasich3}>사이드 선택</h3>
                        <div css={s.mapParent}>
                            {filteredSides?.map((side, index) => (
                                <div css={s.childrenDiv} key={`${side.menuName}-${index}`}>
                                    <div css={s.modalSideSetImage}>
                                        <div onClick={() => handleChangeSideOnClick(side.menuName)}>
                                            <img src={side.singleImg} alt={side.menuName} />
                                            <div>
                                                <p>{side.menuName}</p>
                                                <p>{side.menuName === defaultSide ? "+0원" : `+${side.menuPrice.menuPrice - filteredSides?.find(side => side.menuName === defaultSide)?.menuPrice?.menuPrice}원`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>다음</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 css={s.modalBasich3}>음료 선택</h3>
                        <div css={s.mapParent}>
                            {filteredDrinks?.map((drink, index) => (
                                <div css={s.childrenDiv} key={`${drink.menuName}-${index}`}>
                                    <div css={s.modalSideSetImage}>
                                        <div onClick={() => handleChangeDrinkOnClick(drink.menuName)}>
                                            <img src={drink.singleImg} alt={drink.menuName} />
                                            <div>
                                                <p>{drink.menuName}</p>
                                                <p>{drink.menuName === defaultDrink ? "+0원" : `+${drink.menuPrice.menuPrice - filteredDrinks?.find(drink => drink.menuName === defaultDrink)?.menuPrice?.menuPrice}원`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div css={s.cartParent}>
                            <button onClick={handleAddToCart} css={s.cart}>카트에 담기</button>
                            <button onClick={onClose} css={s.closeTemp}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuDetailModal;