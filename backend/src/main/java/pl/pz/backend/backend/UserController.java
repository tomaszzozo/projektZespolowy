package pl.pz.backend.backend;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable int id, @CookieValue("auth_token") String authToken) {
        try {
            authService.validateToken(authToken);
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(userService.getUser(id));
    }

}
