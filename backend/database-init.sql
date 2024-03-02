-- this script contains all needed instructions to create the db tables in case you delete your db ;)

-- DROP TABLE IF EXISTS MONTHLY_REPORTS;
-- DROP TABLE IF EXISTS RESET_PASSWORD_TOKENS;
drop table if exists AUTHENTICATION_TOKENS;
drop table if exists USERS;

create table users
(
    ID              serial primary key,
    PASSWORD        varchar(60)         not null,
    EMAIL           varchar(255) unique not null,
    FIRST_NAME      varchar(255)         not null,
    LAST_NAME       varchar(255)         not null,
    CHANGE_PASSWORD boolean default true,
    PHONE_NUMBER    varchar(20) unique  not null
);

-- create admin user with mail admin@admin.com and password pasPAS123!@#
insert into USERS (password, email, first_name, last_name, change_password, phone_number)
values ('$2a$10$qDKUMyHxiPnbznHauLR0ze0132uip94Fh/eGbMzyTYuPURlzbxswm', 'admin@admin.com', 'Administrator', 'Administrator', false, '100000000');

create table AUTHENTICATION_TOKENS
(
    ID serial primary key,
    USER_ID integer references USERS(ID) not null,
    VALID_UNTIL timestamp not null,
    TOKEN_BODY varchar(60) unique not null
);

-- create test users
-- user1@test.com 9tGpAq6<T>u{t!!)
-- user2@test.com Y8nOsr@sHLZ}7Lpb
INSERT INTO EMPLOYEES (PASSWORD, EMAIL, FIRST_NAME, LAST_NAME, CHANGE_PASSWORD, PHONE_NUMBER)
VALUES ('$2a$10$20b6EqCV0G2A/WNgJpxTOeLg2ZFmWpZtOH58RyXAropj520Zdxvxy', 'user1@test.com', 'User1', 'Test', false,
        '100000000'),
       ('$2a$10$tt12/MoJd9r.uOd6ut8d8.P1otdXIHlKRshklatXSR4C9AF4S.1Se', 'user2@test.com', 'User2', 'Test', true,
        '100000001');
