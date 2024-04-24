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
    loan                         DOUBLE PRECISION,
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
