package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Role {
    private int roleId;
    private String roleName;
    private String roleNameKor;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
