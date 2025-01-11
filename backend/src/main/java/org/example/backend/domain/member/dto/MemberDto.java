package org.example.backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.backend.domain.member.entity.Member;
import org.example.backend.domain.member.model.MemberRole;

@Getter
@Builder
public class MemberDto {

    private Long id;
    private String username;
    private String nickname;
    private MemberRole role;

    public static MemberDto from(Member member) {
        return MemberDto.builder()
            .id(member.getId())
            .username(member.getUsername())
            .nickname(member.getNickname())
            .role(member.getRole())
            .build();
    }
}
