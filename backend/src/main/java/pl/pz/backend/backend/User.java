package pl.pz.backend.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "")
    @Size(min = 60, max = 60, message = "")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,30}", message = "")
    private String password;

    @Email
    @NotBlank(message = "")
    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @NotBlank(message = "")
    @Column(nullable = false, length = 255)
    private String first_name;

    @NotBlank(message = "")
    @Column(nullable = false, length = 255)
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public Boolean getChange_password() {
        return change_password;
    }

    public void setChange_password(Boolean change_password) {
        this.change_password = change_password;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
