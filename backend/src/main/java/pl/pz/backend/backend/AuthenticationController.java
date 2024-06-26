package pl.pz.backend.backend;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/tokens/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;

    @GetMapping("/generate")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpServletResponse response) {
        TokenInfo tokenInfo = authService.authenticate(email, password);
        if (tokenInfo == null) {
            return ResponseEntity.status(401).build();
        }
        response.addCookie(createHttpOnlyCookie(tokenInfo.getToken(), tokenInfo.getExpiresIn()));
        return ResponseEntity.ok("Rola użytkownika: " + tokenInfo.getUserRole());
    }

    private Cookie createHttpOnlyCookie(String token, LocalDateTime expiresIn) {
        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) ChronoUnit.SECONDS.between(LocalDateTime.now(), expiresIn));
        return cookie;
    }

//    -----

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@CookieValue("auth_token") String authToken) {
        try {
            TokenInfo tokenInfo = authService.validateAndRegenToken(authToken);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Set-Cookie", "auth_token=" + tokenInfo.getToken() + "; HttpOnly; Secure; Path=/; Max-Age=" + tokenInfo.getExpiresIn());
            return ResponseEntity.ok().headers(headers).body("Rola użytkownika: " + tokenInfo.getUserRole());
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


}
