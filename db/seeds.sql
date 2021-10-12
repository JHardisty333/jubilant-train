INSERT INTO department (department_name)
VALUES 
("Engineering"), 
("Technician"), 
("Assembly"); 

INSERT INTO role (title, salary, department_id)
VALUES
("Managing Engineer", "250000", 1), 
("Senior Engineer", "200000", 2), 
("Junior Engineer", "150000", 2), 
("Engineering Technician", "100000", 2), 
("Manufacturing Technician", "60000", 3), 
("Senior Assembler", "50000", 3), 
("Assembler", "40000", 3); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Chris", "Setera", 1, null), 
("Steve", "Miller", 2, 1),  
("Jess", "Hardy", 2, null), 
("Steve", "Sutton", 3, 3),  
("Brent", "Charles", 4, null), 
("Brad", "West", 3, 3),
("Dave", "Child", 2, 3),
("Sione", "Keppner", 5, 5),
("Connor", "Gibbons", 6, 5),
("Ning", "Shep", 7, 5),
("Derek", "Brown", 7, 5);
