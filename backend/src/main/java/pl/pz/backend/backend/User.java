package pl.pz.backend.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
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
    @Pattern(regexp = "^[0-9]{7,20}$", message = "")
    @Column(unique = true, nullable = false, length = 20)
    private String phone_number;

    @Column(nullable = false)
    private Integer role = 0;

    public User() {
    }

}
