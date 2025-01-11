package org.example.backend.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.member.dto.MemberDto;
import org.example.backend.domain.member.dto.MemberForm;
import org.example.backend.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberJoinController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<MemberDto> join(@RequestBody MemberForm memberForm) {
        MemberDto memberDto = memberService.join(memberForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(memberDto);
    }
}
