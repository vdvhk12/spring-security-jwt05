package org.example.backend.domain.member.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.example.backend.domain.member.dto.MemberDto;
import org.example.backend.domain.member.dto.MemberForm;
import org.example.backend.domain.member.entity.Member;
import org.example.backend.domain.member.model.MemberRole;
import org.example.backend.domain.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberDto join(MemberForm memberForm) {
        return MemberDto.from(memberRepository.save(
            Member.of(memberForm.getUsername(), memberForm.getEmail(), memberForm.getNickname(),
                passwordEncoder.encode(memberForm.getPassword()), memberForm.getAddress(),
                MemberRole.USER)));
    }

    public MemberDto getMemberById(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        return  member.map(MemberDto::from).orElse(null);
    }
}
