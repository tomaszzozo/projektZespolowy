package pl.pz.backend.backend;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/tokens/auth")
public class AuthenticationController {

    private AuthenticationService authService;

    private UserRepository userRepository;

    public AuthenticationController(AuthenticationService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @GetMapping("/generate")
    public ResponseEntity<Integer> login(@RequestParam String email, @RequestParam String password, HttpServletResponse response) {
        TokenInfo tokenInfo = authService.authenticate(email, password);
        if (tokenInfo == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        response.addCookie(createHttpOnlyCookie(tokenInfo.getToken(), tokenInfo.getExpiresIn()));
        return ResponseEntity.ok(tokenInfo.getUserRole());
    }

    private Cookie createHttpOnlyCookie(String token, LocalDateTime expiresIn) {
        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);  // Ensure that the cookie is sent only over HTTPS
        cookie.setPath("/");
        cookie.setMaxAge((int) ChronoUnit.SECONDS.between(LocalDateTime.now(), expiresIn));
        return cookie;
    }
}
