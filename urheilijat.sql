CREATE DATABASE IF NOT EXISTS urheilijat;

USE urheilijat;

CREATE TABLE IF NOT EXISTS athletes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    birth_date DATE,
    weight DECIMAL(5,2),
    image_url VARCHAR(500),
    sport VARCHAR(100) NOT NULL,
    achievements TEXT);

INSERT INTO athletes
    (first_name, last_name, nickname, birth_date, weight, image_url, sport, achievements)
VALUES
    (
        'Mikael',
        'Granlund',
        'Mikke',
        '1992-02-26',
        85.00,
        NULL,
        'Jääkiekko',
        'Suomen maajoukkuepelaaja'
    ),
    (
        'Iivo',
        'Niskanen',
        NULL,
        '1992-01-12',
        75.00,
        NULL,
        'Maastohiihto',
        'Olympiavoittaja'
    ),
    (
        'Wilma',
        'Murto',
        NULL,
        '1998-06-11',
        65.00,
        NULL,
        'Seiväshyppy',
        'Euroopan mestari'
    );    