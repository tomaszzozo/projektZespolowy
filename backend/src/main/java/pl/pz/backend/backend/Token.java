package pl.pz.backend.backend;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "tokens")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "token_body", nullable = false, length = 100)
    private String tokenBody;

    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil;

    @Column(name = "token_type", nullable = false)
    private Integer tokenType;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

}
