package org.example.backend.global.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRefreshForm {

    private String refreshToken;
}