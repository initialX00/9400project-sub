package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Menu {
    private int menuId;
    private String menuName;
    private String menuCategory;
    private int menuSequence;
    private String singleImg;
    private String setImg;

    private MenuPrice menuPrice;  // 💡 가격 정보를 포함하도록 추가
}