package pl.pz.backend.backend;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/report")
@AllArgsConstructor
@Validated
public class MonthlyReportController {
    private final MonthlyReportService monthlyReportService;
    private final AuthenticationService authenticationService;

    @GetMapping
    public ResponseEntity<MonthlyReport.Dto> getByUserYearAndMonth(@RequestParam int userId, @RequestParam int year, @RequestParam int month, @CookieValue("auth_token") String authToken) {
        try {
            authenticationService.validateToken(authToken);
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            return ResponseEntity.ok(monthlyReportService.getByUserYearAndMonth(userId, year, month));
        } catch (ReportDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

}
