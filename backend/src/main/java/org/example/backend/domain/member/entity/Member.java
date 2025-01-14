package org.example.backend.domain.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.domain.member.model.MemberRole;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String nickname;

    private String password;

    private String address;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    private String refreshToken;

    public static Member of(String username, String email, String nickname, String password, String address, MemberRole role) {
        return Member.builder()
            .username(username)
            .email(email)
            .nickname(nickname)
            .password(password)
            .address(address)
            .role(role)
            .build();
    }

    public static Member setRefreshToken(Member member, String refreshToken) {
        return member.toBuilder()
            .refreshToken(refreshToken)
            .build();
    }
}
