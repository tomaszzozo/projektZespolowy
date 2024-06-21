package pl.pz.backend.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "days_off_per_year")
public class DaysOffPerYear {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Min(0)
    @Max(356)
    private int yearlyLimit;
    @Min(2010)
    @Max(2200)
    private int yearOfLimit;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
