package com.cloudbalance.cloudbalance_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class AccountAssignDto {
    private List<Long> accountIds;
}
