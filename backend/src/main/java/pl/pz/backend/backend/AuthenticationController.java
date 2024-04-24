package pl.pz.backend.backend;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<Integer> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        TokenInfo tokenInfo = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (tokenInfo == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        response.addCookie(createHttpOnlyCookie(tokenInfo.getToken(), tokenInfo.getExpiresIn()));

        return ResponseEntity.ok(tokenInfo.getUserRole());
    }

    private Cookie createHttpOnlyCookie(String token, LocalDateTime expiresIn) {
        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) expiresIn.until(LocalDateTime.now(), ChronoUnit.SECONDS));
        return cookie;
    }
}
