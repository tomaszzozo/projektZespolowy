package pl.pz.backend.backend;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class TokenInfo {
    private String token;
    private Long userId;
    private Integer userRole;
    private LocalDateTime expiresIn;


    public TokenInfo(String token, Integer userRole, LocalDateTime expiresIn) {
        this.token = token;
        this.userId = userId;
        this.userRole = userRole;
        this.expiresIn = expiresIn;
    }

    public LocalDateTime getExpiryDate() {
        return expiresIn;
    }
}
