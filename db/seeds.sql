INSERT INTO department (name)
VALUES  ('Curatorial'),
        ('Development'),
        ('Education'),
        ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Chief Curator', 120000, 1),
        ('Associate Curator', 85000, 1),
        ('Curatorial Assistant', 45000, 1),
        ('Marketing Officer', 100000, 2),
        ('Gifts and Donations', 75000, 2),
        ('Corporate Partnerships', 67000,2),
        ('Public Programs', 115000, 3),
        ('Curator of Education', 80000, 3),
        ('School Programs', 58000, 3),
        ('Facilities Manager', 105000, 4),
        ('Museum Technology', 75000, 4),
        ('Operations Coordinator', 58000, 4);

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