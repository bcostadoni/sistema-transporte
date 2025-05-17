package unla.isw3.equipo7.sistema_transporte.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration

public class SeguridadConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Desactiva CSRF para permitir POST desde Swagger
            .authorizeHttpRequests()
                .anyRequest().permitAll();  // Permite todas las solicitudes sin autenticación
        return http.build();
    }
}