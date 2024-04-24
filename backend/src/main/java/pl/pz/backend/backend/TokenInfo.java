package pl.pz.backend.backend;
import java.time.LocalDateTime;

public class TokenInfo {
    private String token;
    private Integer userRole;
    private LocalDateTime expiresIn;

    public TokenInfo(String token, Integer userRole, LocalDateTime expiresIn) {
        this.token = token;
        this.userRole = userRole;
        this.expiresIn = expiresIn;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserRole() {
        return userRole;
    }

    public void setUserRole(Integer userRole) {
        this.userRole = userRole;
    }

    public LocalDateTime getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(LocalDateTime expiresIn) {
        this.expiresIn = expiresIn;
    }
}
