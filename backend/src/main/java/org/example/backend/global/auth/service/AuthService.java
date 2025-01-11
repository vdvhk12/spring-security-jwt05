package org.example.backend.global.auth.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.member.entity.Member;
import org.example.backend.domain.member.repository.MemberRepository;
import org.example.backend.global.auth.dto.LoginForm;
import org.example.backend.global.auth.jwt.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public String login(LoginForm loginForm) {
        Member member = memberRepository.findByUsername(loginForm.getUsername()).orElse(null);
        if(member == null || !passwordEncoder.matches(loginForm.getPassword(), member.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String accessToken = jwtProvider.generateAccessToken(member.getId(), member.getUsername(),
            member.getRole());
        String refreshToken = jwtProvider.generateRefreshToken(member.getId(), member.getUsername());
        saveRefreshToken(member, refreshToken);

        System.out.println("accessToken = " + accessToken);
        System.out.println("refreshToken = " + refreshToken);
        return accessToken + " " + refreshToken;
    }

    private void saveRefreshToken(Member member, String refreshToken) {
        memberRepository.save(Member.setRefreshToken(member, refreshToken));
    }

    public String tokenRefresh(String refreshToken) {
        if (jwtProvider.validateToken(refreshToken)) {
            String username = jwtProvider.getUsernameFromToken(refreshToken);
            Member member = memberRepository.findByUsername(username).orElse(null);

            if(member != null && member.getRefreshToken().equals(refreshToken)) {
                return jwtProvider.generateAccessToken(member.getId(), username, member.getRole());
            }
        }

        return "Invalid refresh token";
    }
}
