package pl.pz.backend.backend;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MonthlyReportService {
    private final UserService userService;

    public MonthlyReport.Dto getByUserYearAndMonth(int userId, int year, int month) throws ReportDoesNotExistsException {
        return userService.getUser(userId).getMonthlyReports().stream().filter(r -> r.getYearOfReport() == year && r.getMonthOfReport() == month).findAny().orElseThrow(ReportDoesNotExistsException::new).toDto();
    }
}
