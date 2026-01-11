package com.cloudbalance.cloudbalance_backend.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    // MySQL configuration values
    @Value("${spring.datasource.url}")
    private String mysqlUrl;

    @Value("${spring.datasource.username}")
    private String mysqlUsername;

    @Value("${spring.datasource.password}")
    private String mysqlPassword;

    @Value("${spring.datasource.driver-class-name}")
    private String mysqlDriver;

    // Snowflake configuration values
    @Value("${snowflake.jdbc-url}")
    private String snowflakeUrl;

    @Value("${snowflake.username}")
    private String snowflakeUsername;

    @Value("${snowflake.password}")
    private String snowflakePassword;

    @Value("${snowflake.driver-class-name}")
    private String snowflakeDriver;

    @Value("${snowflake.warehouse}")
    private String warehouse;

    @Value("${snowflake.database}")
    private String database;

    @Value("${snowflake.schema}")
    private String schema;

    @Value("${snowflake.role}")
    private String role;

    // MySQL DataSource (Primary - for JPA/Hibernate)
    @Bean
    @Primary
    public DataSource mysqlDataSource() {
        HikariDataSource hikari = new HikariDataSource();
        hikari.setJdbcUrl(mysqlUrl);
        hikari.setUsername(mysqlUsername);
        hikari.setPassword(mysqlPassword);
        hikari.setDriverClassName(mysqlDriver);
        hikari.setMaximumPoolSize(10);
        hikari.setMinimumIdle(2);
        hikari.setConnectionTimeout(30000);
        hikari.setIdleTimeout(600000);
        hikari.setMaxLifetime(1800000);
        return hikari;
    }

    // Snowflake DataSource (Secondary - for JdbcTemplate only)
    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource() {
        HikariDataSource hikari = new HikariDataSource();

        // Build connection URL with parameters
        String fullUrl = String.format("%s?warehouse=%s&db=%s&schema=%s&role=%s",
                snowflakeUrl, warehouse, database, schema, role);

        hikari.setJdbcUrl(fullUrl);
        hikari.setUsername(snowflakeUsername);
        hikari.setPassword(snowflakePassword);
        hikari.setDriverClassName(snowflakeDriver);

        // Connection pool settings
        hikari.setMaximumPoolSize(10);
        hikari.setMinimumIdle(2);
        hikari.setConnectionTimeout(30000);
        hikari.setIdleTimeout(600000);
        hikari.setMaxLifetime(1800000);

        return hikari;
    }

    // Snowflake JdbcTemplate
    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(
            @Qualifier("snowflakeDataSource") DataSource snowflakeDataSource) {
        return new JdbcTemplate(snowflakeDataSource);
    }
}