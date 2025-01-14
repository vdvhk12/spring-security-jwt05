package org.example.backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.backend.domain.member.entity.Member;

@Getter
@Builder
public class MemberDto {

    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String address;

    public static MemberDto from(Member member) {
        return MemberDto.builder()
            .id(member.getId())
            .username(member.getUsername())
            .email(member.getEmail())
            .nickname(member.getNickname())
            .address(member.getAddress())
            .build();
    }
}
