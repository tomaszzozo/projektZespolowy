package pl.pz.backend.backend;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "monthly_reports")
public class MonthlyReport {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int monthOfReport;
    private int yearOfReport;
    private LocalDateTime settlementDate;
    private int workHours;
    private int hourlyRate;
    private BigDecimal transfer;
    @Column(name = "l4_days")
    private int l4Days;
    @Column(name = "l4_daily_rate")
    private int l4DailyRate;
    private int daysTaken;
    private int daysUnpaid;
    private int daysOnDemand;
    private int daysOccasional;
    private BigDecimal timeOffDailyRate;
    private BigDecimal overtimeHourlyRate;
    private int overtimeHours;
    private BigDecimal extraPay;
    private BigDecimal cashAdvance;
    @Column(name = "loantaken")
    private BigDecimal loanTaken;
    @Column(name = "loanreturned")
    private BigDecimal loanReturned;
    private BigDecimal additionalCosts;
    private String additionalCostsDescription;
    private BigDecimal otherCosts;
    private String otherCostsDescription;
    @Column(name = "tax_26_years_old")
    private BigDecimal tax26yearsOld;
    @ManyToOne
    @JoinColumn(name = "days_off_per_year")
    private DaysOffPerYear daysOffPerYear;
    @OneToMany(mappedBy = "monthlyReport")
    private Set<Comment> comments = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Dto toDto() {
        return new Dto(monthOfReport, yearOfReport, settlementDate, workHours, hourlyRate, transfer, l4Days, l4DailyRate, daysTaken, daysUnpaid, daysOnDemand, daysOccasional, timeOffDailyRate, overtimeHourlyRate, overtimeHours, extraPay, cashAdvance, loanTaken, loanReturned, additionalCosts, additionalCostsDescription, otherCosts, otherCostsDescription, tax26yearsOld, daysOffPerYear.getYearlyLimit(), comments.stream().map(Comment::toDto).collect(Collectors.toSet()));
    }

    public record Dto(int monthOfReport, int yearOfReport, LocalDateTime settlementDate, int workHours, int hourlyRate,
                      BigDecimal transfer, int l4Days, int l4DailyRate, int daysTaken, int daysUnpaid, int daysOnDemand,
                      int daysOccasional, BigDecimal timeOffDailyRate, BigDecimal overtimeHourlyRate, int overtimeHours,
                      BigDecimal extraPay, BigDecimal cashAdvance, BigDecimal loanTaken, BigDecimal loanReturned,
                      BigDecimal additionalCosts, String additionalCostsDescription, BigDecimal otherCosts,
                      String otherCostsDescription, BigDecimal tax26yearsOld, int daysOffPerYear,
                      Set<Comment.Dto> comments) {
    }
}
