package pl.pz.backend.backend.jwtToken;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
@AllArgsConstructor
class AuthController {
    private final TokenService tokenService;

    @PostMapping
    String token(Authentication authentication) {
        System.out.println(authentication.getName());
        return tokenService.generateToken(authentication);
    }
}
