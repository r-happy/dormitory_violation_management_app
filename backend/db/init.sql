-- Drop existing tables
DROP TABLE IF EXISTS violations;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS class_teachers;
DROP TABLE IF EXISTS domitory_staffs;
DROP TABLE IF EXISTS reasons;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sexes;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS roles;
-- Master tables
CREATE TABLE sexes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(10) NOT NULL
);
CREATE TABLE classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL
);
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL
);
-- User table for authentication
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    relatedId INTEGER
);
-- Main tables
CREATE TABLE domitory_staffs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE class_teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    class_id INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    sex_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    room_number INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (sex_id) REFERENCES sexes(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE reasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    point INTEGER NOT NULL
);
CREATE TABLE violations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    point INTEGER NOT NULL,
    reason_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (reason_id) REFERENCES reasons(id),
    FOREIGN KEY (user_id) REFERENCES students(id)
);
-- Insert master data
INSERT INTO sexes (name)
VALUES ('男性');
INSERT INTO sexes (name)
VALUES ('女性');
INSERT INTO classes (name)
VALUES ('1年A組');
INSERT INTO classes (name)
VALUES ('1年B組');
INSERT INTO classes (name)
VALUES ('2年A組');
INSERT INTO classes (name)
VALUES ('2年B組');
INSERT INTO classes (name)
VALUES ('3年A組');
INSERT INTO classes (name)
VALUES ('3年B組');
INSERT INTO roles (name)
VALUES ('一般学生');
INSERT INTO roles (name)
VALUES ('寮長');
INSERT INTO roles (name)
VALUES ('副寮長');
-- Insert sample users
-- Password: password123 (hashed with bcrypt)
INSERT INTO users (username, password, role, relatedId)
VALUES (
        'staff001',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        'DomitoryStaff',
        1
    );
INSERT INTO users (username, password, role, relatedId)
VALUES (
        'teacher001',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        'ClassTeacher',
        1
    );
INSERT INTO users (username, password, role, relatedId)
VALUES (
        'student001',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        'Student',
        1
    );
-- Insert sample domitory staffs
INSERT INTO domitory_staffs (name)
VALUES ('山田太郎');
INSERT INTO domitory_staffs (name)
VALUES ('佐藤花子');
-- Insert sample class teachers
INSERT INTO class_teachers (name, class_id)
VALUES ('田中一郎', 1);
INSERT INTO class_teachers (name, class_id)
VALUES ('鈴木次郎', 2);
INSERT INTO class_teachers (name, class_id)
VALUES ('高橋三郎', 3);
-- Insert sample students
INSERT INTO students (name, sex_id, class_id, room_number, role_id)
VALUES ('伊藤太一', 1, 1, 101, 1);
INSERT INTO students (name, sex_id, class_id, room_number, role_id)
VALUES ('渡辺花子', 2, 1, 102, 1);
INSERT INTO students (name, sex_id, class_id, room_number, role_id)
VALUES ('中村二郎', 1, 2, 201, 2);
INSERT INTO students (name, sex_id, class_id, room_number, role_id)
VALUES ('小林美咲', 2, 2, 202, 1);
INSERT INTO students (name, sex_id, class_id, room_number, role_id)
VALUES ('加藤健太', 1, 3, 301, 3);
-- Insert sample reasons
INSERT INTO reasons (name, point)
VALUES ('無断外泊', 10);
INSERT INTO reasons (name, point)
VALUES ('門限破り', 5);
INSERT INTO reasons (name, point)
VALUES ('禁止物品所持', 15);
INSERT INTO reasons (name, point)
VALUES ('騒音問題', 3);
INSERT INTO reasons (name, point)
VALUES ('清掃不備', 2);
-- Insert sample violations
INSERT INTO violations (point, reason_id, user_id, date)
VALUES (5, 2, 1, '2025-12-01');
INSERT INTO violations (point, reason_id, user_id, date)
VALUES (10, 1, 3, '2025-12-05');
INSERT INTO violations (point, reason_id, user_id, date)
VALUES (3, 4, 2, '2025-12-08');
INSERT INTO violations (point, reason_id, user_id, date)
VALUES (2, 5, 4, '2025-12-10');