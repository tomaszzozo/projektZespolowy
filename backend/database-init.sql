CREATE TABLE users
(
    id              SERIAL PRIMARY KEY,
    password        VARCHAR(60)  NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    change_password BOOLEAN DEFAULT true,
    phone_number    VARCHAR(20)  NOT NULL UNIQUE,
    role            INTEGER DEFAULT 0
);

CREATE TABLE tokens
(
    id          SERIAL PRIMARY KEY,
    token_body  VARCHAR(100) NOT NULL,
    valid_until TIMESTAMP    NOT NULL,
    token_type  INTEGER      NOT NULL CHECK (token_type IN (0, 1)),
    user_id     INTEGER      NOT NULL REFERENCES users (id)
);

CREATE TABLE days_off_per_year
(
    id            SERIAL PRIMARY KEY,
    yearly_limit  INTEGER,
    year_of_limit TIMESTAMP NOT NULL,
    user_id       INTEGER   NOT NULL REFERENCES users (id)
);

CREATE TABLE monthly_reports
(
    id                           SERIAL PRIMARY KEY,
    user_id                      INTEGER NOT NULL REFERENCES users (id),
    month_of_report              DATE    NOT NULL,
    settlement_date              DATE,
    work_hours                   INTEGER,
    hourly_rate                  DOUBLE PRECISION,
    transfer                     DOUBLE PRECISION,
    l4_days                      INTEGER,
    l4_daily_rate                DOUBLE PRECISION,
    days_off_per_year            INTEGER REFERENCES days_off_per_year (id),
    days_taken                   INTEGER,
    days_unpaid                  INTEGER,
    days_on_demand               INTEGER,
    days_occasional              INTEGER,
    time_off_daily_rate          DOUBLE PRECISION,
    overtime_hourly_rate         DOUBLE PRECISION,
    overtime_hours               INTEGER,
    extra_pay                    DOUBLE PRECISION,
    cash_advance                 DOUBLE PRECISION,
    loanTaken                    DOUBLE PRECISION,
    loanReturned                 DOUBLE PRECISION,
    additional_costs             DOUBLE PRECISION,
    additional_costs_description TEXT,
    other_costs                  DOUBLE PRECISION,
    other_costs_description      TEXT,
    tax_26_years_old             DOUBLE PRECISION
);

CREATE TABLE comments
(
    id           SERIAL PRIMARY KEY,
    report_id    INTEGER NOT NULL REFERENCES monthly_reports (id),
    comment_body TEXT    NOT NULL
);


-- ## TESTOWE DANE ##


-- Login: admin123
-- User: user123
INSERT INTO users (password, email, first_name, last_name, change_password, phone_number, role)
VALUES
    ('$2y$12$abcdefghijklmnopqrstuv', 'admin@example.com', 'Admin', 'User', false, '1234567890', 1), -- admin123
    ('$2y$12$qrstuvabcdefghijklmnop', 'user@example.com', 'Regular', 'User', true, '0987654321', 0); -- user123

INSERT INTO days_off_per_year (yearly_limit, year_of_limit, user_id)
VALUES (20, '2024-01-01', 2);

INSERT INTO monthly_reports (
    user_id, month_of_report, settlement_date, work_hours, hourly_rate, transfer, l4_days, l4_daily_rate,
    days_off_per_year, days_taken, days_unpaid, days_on_demand, days_occasional, time_off_daily_rate,
    overtime_hourly_rate, overtime_hours, extra_pay, cash_advance, loanTaken, loanReturned, additional_costs,
    additional_costs_description, other_costs, other_costs_description, tax_26_years_old
)
VALUES (
           2, '2024-04-01', '2024-04-30', 160, 20.0, 100.0, 2, 15.0, 1, 2, 0, 1, 0, 20.0,
           25.0, 10, 100.0, 50.0, 500.0, 0.0, 20.0, 'Koszty', 30.0, 'Wydatki', 10.0
       );

INSERT INTO comments (report_id, comment_body)
VALUES (1, 'Komentarz');
