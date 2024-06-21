package pl.pz.backend.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,30}", message = "")
    private String password;
    @Email
    @NotBlank(message = "")
    @Column(unique = true, nullable = false)
    private String email;
    @NotBlank(message = "")
    @Column(nullable = false)
    private String first_name;
    @NotBlank(message = "")
    @Column(nullable = false)
    private String last_name;
    @Column(nullable = false)
    private Boolean change_password = true;
    @NotBlank(message = "")
    @Pattern(regexp = "^\\d{7,20}$", message = "")
    @Column(unique = true, nullable = false, length = 20)
    private String phone_number;
    @Column(nullable = false)
    private Integer role = 0;

    public Dto toDto() {
        return new Dto(id, email, first_name, last_name, phone_number, role);
    }

    public record Dto(@Min(1) int id, @Email @NotBlank String email, @NotBlank String first_name,
                      @NotBlank String last_name, @NotBlank @Pattern(regexp = "^\\d{7,20}$") String phone_number,
                      @Min(0) int role) {
    }
}
