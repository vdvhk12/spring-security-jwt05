package org.example.backend.global.auth.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.backend.global.auth.dto.LoginForm;
import org.example.backend.global.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletResponse response) {
        String[] tokens = authService.login(loginForm).split(" ");

        Cookie cookie = new Cookie("refreshToken", tokens[1]);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);
        response.addHeader("Authorization", "Bearer " + tokens[0]);
        return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        if(refreshToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("리프레시 토큰이 쿠키에 없습니다.");
        }

        String newAccessToken = authService.tokenRefresh(refreshToken);
        response.addHeader("Authorization",
            "Bearer " + newAccessToken);
        return ResponseEntity.status(HttpStatus.OK).body("엑세스 토큰 재발급 성공");
    }
}
