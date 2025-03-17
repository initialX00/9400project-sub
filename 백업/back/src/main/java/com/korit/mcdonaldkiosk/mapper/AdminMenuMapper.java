package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.Menu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMenuMapper {
    List<Menu> selectAllCategories();

    List<Menu> selectAllAdminMenus();

    List<Menu> selectAdminMenusByCategory(String category);
}
