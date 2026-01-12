package com.cloudbalance.cloudbalance_backend.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.*;

@Repository
@RequiredArgsConstructor
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
            String groupBy,
            List<String> groupValues,
            LocalDate startDate,
            LocalDate endDate
    ) {

        if (groupBy == null || groupBy.isBlank()) {
            throw new IllegalArgumentException("Invalid group by column");
        }

        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT ")
                .append("TO_CHAR(BILL_DATE, 'YYYY-MM') AS month, ")
                .append(groupBy)
                .append(" AS group_value, ")
                .append("SUM(COST) AS total_cost ")
                .append("FROM COSTREPORT ")
                .append("WHERE 1=1 ");

        // 🔹 Filter by group values
        if (groupValues != null && !groupValues.isEmpty()) {
            sql.append(" AND ")
                    .append(groupBy)
                    .append(" IN (")
                    .append(String.join(",", Collections.nCopies(groupValues.size(), "?")))
                    .append(")");
            params.addAll(groupValues);
        }

        // 🔹 Date range (between start & end)
        if (startDate != null) {
            sql.append(" AND BILL_DATE >= ?");
            params.add(startDate);
        }

        if (endDate != null) {
            sql.append(" AND BILL_DATE <= ?");
            params.add(endDate);
        }

        sql.append("""
        GROUP BY
            TO_CHAR(BILL_DATE, 'YYYY-MM'),
            """).append(groupBy).append("""
        ORDER BY month
    """);

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
