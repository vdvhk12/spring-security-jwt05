package org.example.backend.global.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.example.backend.domain.member.model.MemberRole;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final Long ACCESS_TOKEN_EXPIRATION_TIME = 30 * 60 * 1000L;
    private final Long REFRESH_TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000L;

    public String generateAccessToken(Long id, String username, MemberRole role) {
        return Jwts.builder()
            .setSubject(username)
            .claim("id", id)
            .claim("role", role.name())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    public String generateRefreshToken(Long id, String username) {
        return Jwts.builder()
            .setSubject(username)
            .claim("id", id)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }

    public MemberRole getRoleFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();
        return MemberRole.valueOf(claims.get("role", String.class));
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid or expired JWT");
        }
        return false;
    }
}
