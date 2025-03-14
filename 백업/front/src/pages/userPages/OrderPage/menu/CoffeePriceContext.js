import { createContext } from "react";

export const CoffeePriceContext = createContext({
    prices: {
        "바닐라 라떼": 4500,
        "아이스 바닐라 라떼": 4500,
        "카페라떼": 4000,
        "디카페인 카페라떼": 4000,
        "아이스 카페라떼": 4000,
        "디카페인 아이스 카페라떼": 4000,
        "아메리카노": 3000,
        "디카페인 아메리카노": 3000,
        "아이스 아메리카노": 3000,
        "디카페인 아이스 아메리카노": 3000,
        "카푸치노": 4000,
        "디카페인 카푸치노": 4000,
        "드립 커피": 3500,
        "아이스 드립 커피": 3500
    }
});