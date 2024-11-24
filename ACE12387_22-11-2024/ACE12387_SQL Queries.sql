USE plsql;

CREATE TABLE Department(
	departmentid varchar(10) not null primary key,
    departmentName varchar(10) not null,
    totalCount int(10) not null
);

INSERT INTO Department VALUES("ACE_24","D&A",3),("ACE_25","Testing",3),
("ACE_26","Insurance",4),("ACE_27","Enterprise",2);

DELETE FROM Employee WHERE employeeId=7;

CREATE TABLE Employee(
	employeeId int(5) not null primary key,
    employeeName varchar(20) not null,
    employee_salary int(10) not null,
    employee_location varchar(20) not null,
    departmentid varchar(10) not null,
    employee_doj date not null,
    FOREIGN KEY (departmentid) REFERENCES Department(departmentid)
);

ALTER TABLE Employee add CONSTRAINT Fk_Emp FOREIGN KEY(employeeName) REFERENCES Projects(employeeName);

INSERT INTO Employee VALUES(1,"Jeeva",20000,"Chennai","ACE_24","2003-08-23");
INSERT INTO Employee VALUES(2,"Mani",30000,"Madurai","ACE_24","2004-06-02"),(3,"dhivyaa",35000,"Chennai","ACE_24","2005-05-06");



INSERT INTO Employee VALUES(4,"Swetha",40000,"Chennai","ACE_25","2003-03-28"),(5,"Aathmiga",45000,"Madurai","ACE_25","2001-01-28");
INSERT INTO Employee VALUES(6,"Pranav",25000,"Chennai","ACE_25","2007-08-14");

INSERT INTO Employee VALUES(7,"Hari",35000,"Madurai","ACE_26","2019-10-09"),
(8,"Gokul",45000,"Chennai","ACE_26","2020-09-09"),(9,"Suresh",30000,"Salem","ACE_26","2017-05-24"),
(10,"Padma",30000,"Salem","ACE_26","2012-04-09");

INSERT INTO Employee VALUES(11,"Balaji",60000,"Chennai","ACE_27","2015-02-04"),
(12,"Shankar",65000,"Salem","ACE_27","2011-11-11");

INSERT INTO Employee VALUES(13,"Naveenya",50000,"Thenkasi","ACE_28","2013-01-24"),
(14,"Ram",45000,"Salem","ACE_28","2010-02-11");

SELECT * FROM Employee;


DELIMITER &&
CREATE PROCEDURE getUpdatedSalary(IN employee_id int(5))
BEGIN
	
END &&
DELIMITER ;

-- Write a query to display all rows and columns from the employees table
SELECT * FROM Employee;

-- Retrieve only the name and salary of all employees from the employees table
SELECT employeeName,employee_salary FROM Employee;

-- Write a query to find all employees whose salary is greater than 50,000
SELECT * FROM Employee WHERE employee_salary>50000;

-- List all employees who joined the company in the year 2020
SELECT * FROM Employee WHERE YEAR(employee_doj)="2020";

-- Retrieve the details of employees whose names start with the letter 'A'
SELECT * FROM Employee WHERE employeeName LIKE 'A%';

-- Write a query to calculate the average salary of all employees
SELECT AVG(employee_salary) AS Average_Salary FROM employee;

-- Find the total number of employees in the company
SELECT COUNT(employeeId) AS Employee_Count FROM Employee;

-- Write a query to find the highest salary in the employees table
SELECT MAX(employee_salary) AS Highest_Salary FROM Employee;

-- Calculate the total salary paid by the company for all employees
SELECT SUM(employee_salary) AS Total_Salary_Paid FROM Employee;

-- Find the count of employees in each department
SELECT departmentid AS Department,COUNT(*) AS Dept_count FROM Employee GROUP BY departmentid;

-- Write a query to retrieve employee names along with their department names (using employees and departments tables)
SELECT Employee.employeeName,Department.departmentName FROM Employee JOIN Department WHERE Employee.departmentid=Department.departmentid;

CREATE TABLE Projects(
	projectId int(10) not null primary key,
    projectName varchar(10) not null,
    employeeName varchar(10) not null
);

DROP TABLE Projects;

INSERT INTO Projects VALUES(102,"DM","Mani"),(103,"DM","Swetha"),(104,"AIML","Aathmiga");
INSERT INTO Projects VALUES(106,"DM","Jeeva");

-- UPDATE Projects SET projectId

SELECT * FROM Projects;
-- Find the names of employees who are working on multiple projects (using employees and projects tables).
SELECT DISTINCT EMPLOYEE.employeeName AS EMP_NAME FROM EMPLOYEE JOIN Projects WHERE EMPLOYEE.employeeName = ANY( SELECT employeeName FROM Projects GROUP BY employeeName HAVING COUNT(employeeName) > 1);

-- Write a query to display all projects and the employees assigned to them
SELECT Projects.projectName,Employee.employeeName FROM Employee JOIN Projects WHERE Projects.employeeName=Employee.employeeName;

SELECT * FROM department;
INSERT INTO department VALUES("ACE_29","HR",1);

-- Retrieve the names of employees who do not belong to any department
SELECT distinct Employee.employeeName AS Emp_Name FROM Employee JOIN Department WHERE Employee.departmentId="ACE_28";
select * from employee;

INSERT INTO Employee VALUES(15,"Sharu",30000,"Madurai","ACE_29","2001-12-20");

-- SET OPERATORS
-- Write a query to find employees who work in either the 'HR' or 'Finance' department
SELECT * FROM Department WHERE departmentName="HR" OR departmentName="Finance";

-- Retrieve the names of employees who are working on both Project A and Project B
SELECT employeeName FROM Projects GROUP BY employeeName HAVING COUNT(employeeName) > 1;
select * from Projects;
UPDATE Projects SET projectName="AIML" WHERE projectId=106;
INSERT INTO Projects VALUES(107,"NA","Balaji");

-- Find employees who are not assigned to any project
SELECT Projects.employeeName FROM Projects WHERE Projects.projectName="NA";

SELECT * FROM Department;
-- Write a query to get all unique job titles across all departments
SELECT DISTINCT departmentName FROM department;

CREATE TABLE Former_employees(
	former_employeeId int(5) not null primary key,
    former_employeeName varchar(20) not null,
    former_employee_salary int(10) not null,
    former_employee_location varchar(20) not null,
    former_departmentid varchar(10) not null,
    former_employee_doj date not null
);

INSERT INTO Former_employees VALUES(1,"Jeeva",20000,"Chennai","ACE_24","2003-08-23"),
(2,"Mani",30000,"Madurai","ACE_24","2004-06-02");

SELECT * FROM Former_employees;


-- Combine two tables (employees and former_employees) and remove duplicates
SELECT DISTINCT employeeName FROM Employee UNION SELECT former_employeeName FROM Former_employees;

-- DML and DDL

