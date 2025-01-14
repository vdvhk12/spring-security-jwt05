package org.example.backend.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberForm {

    private String username;
    private String email;
    private String nickname;
    private String password;
    private String address;
}
