package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import com.cloudbalance.cloudbalance_backend.service.CostService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/costexplorer")
public class CostController {
    private final CostService costService;


    @GetMapping("/get-keys-by-group")
    public ResponseEntity<?> getKeysByGroup(@RequestParam String group


    ) {
        return ResponseEntity.status(200).body(costService.getKeysByGroup(group));

    }

    @GetMapping("/getCost")
    public ResponseEntity<CostExplorerResponseDto> getCostByGroup(@RequestParam MultiValueMap<String, String> allParams

    ) {
        String group = allParams.getFirst("group");
        List<String> groupValues =  allParams.getOrDefault(group, new ArrayList<>());
        String startDateStr = allParams.getFirst("startDate");
        String endDateStr = allParams.getFirst("endDate");
        LocalDate startDate = null;
        LocalDate endDate = null;

        if (startDateStr!=null  && !startDateStr.isEmpty()) {
            startDate = LocalDate.parse(startDateStr);
        }
        if (endDateStr!=null && !endDateStr.isEmpty()) {
            endDate = LocalDate.parse(endDateStr);
        }
//        List<String> groupValues = switch (group.toLowerCase()) {
//            case "service" -> service;
//            case "instance_type" -> instanceType;
//            case "account_id" -> accountId;
//            case "usage_type" -> usageType;
//            case "platform" -> platform;
//            case "region" -> region;
//            case "purchase_option" -> purchaseOption;
//            case "resource" -> resource;
//            case "availability_zone" -> availabilityZone;
//            case "tenancy" -> tenancy;
//            case "legal_entity" -> legalEntity;
//            case "billing_entity" -> billingEntity;
//            default -> throw new IllegalArgumentException("Invalid group: " + group);
//        };
        CostExplorerResponseDto response =  costService.getCostByGroup(group, groupValues, startDate, endDate);
        return ResponseEntity.status(200).body(response);
    }


}
