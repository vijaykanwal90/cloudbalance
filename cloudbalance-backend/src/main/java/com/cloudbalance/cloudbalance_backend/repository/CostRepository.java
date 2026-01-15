package com.cloudbalance.cloudbalance_backend.repository;

import com.cloudbalance.cloudbalance_backend.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.util.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CostRepository {

    private final JdbcTemplate jdbcTemplate;
    private static final Set<String> ALLOWED_COLUMNS = Set.of(
            "SERVICE",
            "INSTANCE_TYPE",
            "ACCOUNT_ID",
            "USAGE_TYPE",
            "PLATFORM",
            "REGION",
            "PURCHASE_OPTION",
            "RESOURCE",
            "AVAILABILITY_ZONE",
            "TENANCY",
            "LEGAL_ENTITY",
            "BILLING_ENTITY"
    );
    public List<Map<String, Object>> getCostByGroup(
            String accountId,
            String groupBy,
            Map<String, List<String>> filters,
            String startDate,
            String endDate
    ) {

        if (groupBy == null || groupBy.isBlank()  || !ALLOWED_COLUMNS.contains(groupBy)) {
            throw new BadRequestException("Invalid group by column");
        }

        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT ")
                .append("TO_CHAR(BILL_DATE, 'YYYY-MM') AS month, ")
                .append("\"").append(groupBy).append("\"")
                .append(" AS group_value, ")
                .append("SUM(COST) AS total_cost ")
                .append("FROM COSTREPORT ")
                .append("WHERE 1=1 ");

        if (accountId != null && !accountId.isBlank()) {
            sql.append(" AND ACCOUNT_ID = ?");
            params.add(accountId);
        }


        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                String filter = entry.getKey();
                if(!ALLOWED_COLUMNS.contains(filter)){
                    throw new BadRequestException("Invalid filter value");
                }
                List<String> values = entry.getValue();


                if (values != null && !values.isEmpty()) {
                    sql.append(" AND \"").append(filter).append("\" IN (");
                    for (int i = 0; i < values.size(); i++) {
                        sql.append("?");
                        if (i < values.size() - 1) {
                            sql.append(",");
                        }
                        params.add(values.get(i));
                    }
                    sql.append(")");
                }
            }
        }


        if (startDate != null) {
            sql.append(" AND BILL_DATE >= ?");
            params.add(startDate);
        }

        if (endDate != null) {
            sql.append(" AND BILL_DATE <= ?");
            params.add(endDate);
        }
        sql.append(String.format("""
    GROUP BY TO_CHAR(BILL_DATE, 'YYYY-MM'), "%s"
    ORDER BY month
    """, groupBy));


        return jdbcTemplate.queryForList(sql.toString(), params.toArray());
    }

    public  List<String> getKeysByGroup(String group) {




        if (group == null || !ALLOWED_COLUMNS.contains(group)) {
            throw new IllegalArgumentException("Invalid group field: " + group);
        }
        String sql = """
                SELECT DISTINCT %s
                FROM COSTREPORT
                WHERE %s IS NOT NULL
                ORDER BY %s
                """.formatted(group, group, group);


        return jdbcTemplate.queryForList(sql, String.class);
    }





}
