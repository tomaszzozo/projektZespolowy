package pl.pz.backend.backend;

public class ReportDoesNotExistsException extends Exception {
    public ReportDoesNotExistsException() {
        super("Report does not exists for this month, user and year");
    }
}
