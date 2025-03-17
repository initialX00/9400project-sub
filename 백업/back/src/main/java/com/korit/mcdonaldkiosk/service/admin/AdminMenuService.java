package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.repository.admin.AdminMenuRepository;
import com.korit.mcdonaldkiosk.repository.user.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminMenuService {

    @Autowired
    private AdminMenuRepository adminMenuRepository;

    // 모든 카테고리를 조회하는 메서드
    public List<Menu> getAllCategories() {
        return adminMenuRepository.findAllCategories();
    }

    // 모든 목록을 조회하는 메서드
    public List<Menu> getAllAdminMenuList() {
        // 모든 메뉴를 반환
        return adminMenuRepository.findAllAdminMenus();
    }

    // 카테고리 이름으로 해당 카테고리의 정보를 조회하는 메서드
    public List<Menu> getAdminMenuListByCategory(String categoryName) {
        // 카테고리 이름을 통해 해당 카테고리의 정보를 조회하고 반환
        return adminMenuRepository.findAdminMenusByCategory(categoryName);
    }
}
