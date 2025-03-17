package com.korit.mcdonaldkiosk.controller.admin;


import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.service.admin.AdminMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminMenuController {

    @Autowired
    private AdminMenuService adminMenuService;

    // 카테고리 목록을 조회하는 API
    @GetMapping("/categories")
    public ResponseEntity<List<Menu>> getCategories() {
        // 모든 카테고리 정보를 반환
        return ResponseEntity.ok().body(adminMenuService.getAllCategories());
    }

    // 모든 메뉴 리스트를 조회하는 API
    @GetMapping("/menu/all")
    public ResponseEntity<List<Menu>> getCategoryInfo() {
        // 카테고리 이름을 받아서 해당 카테고리의 정보를 반환
        return ResponseEntity.ok().body(adminMenuService.getAllAdminMenuList());
    }


    // 특정 카테고리의 리스트를 조회하는 API
    @GetMapping("/menu/{categoryName}")
    public ResponseEntity<List<Menu>> getCategoryInfo(@PathVariable String categoryName) {
        // 카테고리 이름을 받아서 해당 카테고리의 정보를 반환
        return ResponseEntity.ok().body(adminMenuService.getAdminMenuListByCategory(categoryName));
    }

}
