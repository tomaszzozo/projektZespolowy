package pl.pz.backend.backend;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
@AllArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;

    @GetMapping("/{id}")
    public ResponseEntity<User.Dto> getById(@PathVariable int id, @CookieValue("auth_token") String authToken) {
        try {
            authService.validateToken(authToken);
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(userService.getUser(id).toDto());
    }

    @PutMapping
    public ResponseEntity<Void> post(@RequestBody @Valid User.Dto dto, @CookieValue("auth_token") String authToken) {
        try {
            authService.validateToken(authToken);
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        userService.putUser(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<User.Dto>> getAll(@CookieValue("auth_token") String authToken) {
        try {
            authService.validateToken(authToken);
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
