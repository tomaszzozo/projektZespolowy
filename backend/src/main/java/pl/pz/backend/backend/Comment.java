package pl.pz.backend.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "comments")
public class Comment {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    private String commentBody;
    @ManyToOne
    @JoinColumn(name = "report_id")
    private MonthlyReport monthlyReport;

    public Dto toDto() {
        return new Dto(id, commentBody);
    }

    public record Dto(long id, String commentBody) {
    }
}
