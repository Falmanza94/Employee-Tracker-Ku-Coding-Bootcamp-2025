INSERT INTO department (name)
VALUES  ('Curatorial'),
        ('Development'),
        ('Education'),
        ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Chief Curator', 120000, 1),  -- role_id = 1
        ('Associate Curator', 85000, 1), -- role id =2
        ('Curatorial Assistant', 45000, 1), -- role id =3
        ('Marketing Officer',100000, 2), -- role id =4
        ('Gifts and Donations', 75000, 2), -- role id =5
        ('Corporate Partnerships',67000,2), -- role id =6
        ('Public Programs', 115000, 3), -- role id =7
        ('Curator of Education', 80000, 3), -- role id =8
        ('School Programs', 58000, 3), -- role id =9
        ('Facilities Manager', 105000, 4), -- role id =10
        ('Museum Technology', 75000, 4), -- role id =11
        ('Operations Coordinator', 58000, 4); -- role id =12

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
        ('Gabrielle', 'Delacour', 1, NULL),
        ('Cedric', 'Diggory', 2, 1),
        ('Dudley', 'Dursley', 3, 1),
        ('Ludo', 'Bagman', 4, NULL),
        ('Susan', 'Bones', 5, 4),
        ('Millicent', 'Bulstrode', 6, 4),
        ('Seamus', 'Finnigan', 7, NULL),
        ('Nicolas', 'Flamel', 8, 7),
        ('Cornelius', 'Fudge', 9, 7),
        ('Olympe', 'Maxime', 10, NULL),
        ('Cormac', 'McLaggan', 11, 10),
        ('Alastor', 'Moody', 12, 10);