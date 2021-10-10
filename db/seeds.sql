INSERT INTO department (name)
VALUES 
("Engineering"), -- 1
("Technician"), --2
("Assembly"); --3

INSERT INTO role (title, salary, department_id)
VALUES
("Managing Engineer", "250000", 1), -- 1
("Senior Engineer", "200000", 2), -- 2
("Junior Engineer", "150000", 2), -- 3
("Engineering Technician", "100000", 2), -- 4
("Manufacturing Technician", "60000", 3), -- 5
("Senior Assembler", "50000", 3), -- 6
("Assembler", "40000", 3); -- 7

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Chris", "Setera", 1, null), -- 1 
("Steve", "Miller", 2, 1), -- 2 
("Jess", "Hardy", 2, null), -- 3 
("Steve", "Sutton", 3, 3), -- 4 
("Brent", "Charles", 4, null), -- 5
("Brad", "West", 3, 3), -- 6
("Dave", "Child", 2, 3), -- 7
("Sione", "Keppner", 5, 5), -- 8
("Connor", "Gibbons", 6, 5), -- 9
("Ning", "Shep", 7, 5), --10
("Derek", "Brown", 7, 5) -- 11
;