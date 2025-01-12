package org.example.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);   //클라이언트가 자격 증명을 함께 전송할 수 있도록 허용
        config.addAllowedOrigin("http://localhost:3000");    // 허용할 도메인 설정
        config.addAllowedHeader("*");   // 모든 헤더 허용
        config.addExposedHeader("Authorization");   // 클라이언트에서 헤더에있는 Authorization에 접근가능하도록 하는 설정
        config.addAllowedMethod("*");   // 모든 메소드 허용
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
