package pl.pz.backend.backend.pingPong;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/ping")
class PingPongController {
    @GetMapping
    String pong(Principal principal) {
        return "pong " + principal.getName();
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    String pongAdmin(Principal principal) {
        return "pong " + principal.getName();
    }
}
