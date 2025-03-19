package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMenuMapper {
    List<Menu> selectAllCategories();

    List<Menu> selectAllAdminMenus();

    int selectMenuCountAllByCategory(@Param("searchCategory") String searchCategory);
}
