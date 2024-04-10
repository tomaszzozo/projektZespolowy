package pl.pz.backend.backend.pingPong;

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
}
