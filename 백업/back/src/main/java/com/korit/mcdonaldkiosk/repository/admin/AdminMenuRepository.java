package com.korit.mcdonaldkiosk.repository.admin;


import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.mapper.AdminMenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminMenuRepository {
    @Autowired
    private AdminMenuMapper adminMenuMapper;

    // 모든 카테고리를 반환
    public List<Menu> findAllCategories() {
        return adminMenuMapper.selectAllCategories();
    }

    // 모든 메뉴 리스트를 반환
    public List<Menu> findAllAdminMenus() {
        return adminMenuMapper.selectAllAdminMenus();
    }

    // 해당 카테고리의 메뉴 갯수를 반환
    public int findMenuCountAllBySearchCategory(String searchCategory) {
        return adminMenuMapper.selectMenuCountAllByCategory(searchCategory);
    }


}
