package org.example.backend.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.member.dto.MemberDto;
import org.example.backend.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{id}")
    public ResponseEntity<MemberDto> detail(@PathVariable("id") Long id) {
        MemberDto memberDto = memberService.getMemberById(id);
        return ResponseEntity.status(HttpStatus.OK).body(memberDto);
    }
}
