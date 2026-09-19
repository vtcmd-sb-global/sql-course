import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session10() {
  return (
    <Layout
      title="Session 10 — Using Views, Stored Procedures, and Querying Metadata"
      description="Views, Stored Procedures, Nested Procedures, and Querying Metadata in SQL Server 2022"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 10 — Using Views, Stored Procedures, and Querying Metadata</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Working with Views, Stored Procedures, and querying SQL Server metadata.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 10</p>
          <p><strong>Note:</strong> All code snippets in this session are based on the AdventureWorks2022 database (or similar structure).</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define views</li>
            <li>Describe the technique to create, alter, and drop views</li>
            <li>Define stored procedures and its types</li>
            <li>Describe the procedure to create, alter, and execute stored procedures</li>
            <li>Describe nested stored procedures</li>
            <li>Describe querying SQL Server metadata using System Catalog views and functions</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>
          <p>An SQL Server database has two main categories of objects:</p>
          <ul>
            <li>Objects that <strong>store data</strong> (Tables)</li>
            <li>Objects that <strong>access, manipulate, or provide access</strong> to data (Views, Stored Procedures, Functions, etc.)</li>
          </ul>

          <p>Views and Stored Procedures belong to the second category.</p>

          <hr />

          <h2>2. Views</h2>
          <p>A <strong>View</strong> is a virtual table based on the result of a SELECT statement. It does not store data itself (unless it is an indexed view).</p>

          <h3>Characteristics of Views</h3>
          <ul>
            <li>Made up of selected columns from one or more tables (base tables)</li>
            <li>Base tables can be from the same or different databases</li>
            <li>A view can also be based on other views</li>
            <li>Maximum 1,024 columns</li>
            <li>Data is generated dynamically when the view is queried</li>
          </ul>

          <h3>Creating a View</h3>
          <pre>
            <code>{`CREATE VIEW vw_EmployeeDetails
AS
SELECT 
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    e.Salary,
    d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;
GO`}</code>
          </pre>

          <h3>Querying a View</h3>
          <pre>
            <code>{`SELECT * FROM vw_EmployeeDetails
WHERE Salary > 60000;`}</code>
          </pre>

          <h3>Altering a View</h3>
          <pre>
            <code>{`ALTER VIEW vw_EmployeeDetails
AS
SELECT 
    e.EmployeeID,
    e.FirstName + ' ' + e.LastName AS FullName,
    e.Salary,
    d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;
GO`}</code>
          </pre>

          <h3>Dropping a View</h3>
          <pre>
            <code>{`DROP VIEW vw_EmployeeDetails;
GO`}</code>
          </pre>

          <h3>Benefits of Views</h3>
          <ul>
            <li>Simplify complex queries</li>
            <li>Provide security (restrict access to specific columns/rows)</li>
            <li>Logical data independence</li>
            <li>Can be used like tables in SELECT statements</li>
          </ul>

          <hr />

          <h2>3. Stored Procedures</h2>
          <p>A <strong>Stored Procedure</strong> is a precompiled collection of one or more T-SQL statements stored in the database.</p>

          <h3>Advantages of Stored Procedures</h3>
          <ul>
            <li>Improved performance (precompiled)</li>
            <li>Reduced network traffic</li>
            <li>Better security</li>
            <li>Code reusability</li>
            <li>Easier maintenance</li>
          </ul>

          <h3>Types of Stored Procedures</h3>
          <ul>
            <li><strong>System Stored Procedures</strong> – Provided by SQL Server (start with <code>sp_</code>)</li>
            <li><strong>User-Defined Stored Procedures</strong> – Created by users</li>
            <li><strong>Temporary Stored Procedures</strong> – Local (<code>#proc</code>) or Global (<code>##proc</code>)</li>
            <li><strong>CLR Stored Procedures</strong> – Written in .NET languages</li>
          </ul>

          <h3>Creating a Stored Procedure</h3>
          <pre>
            <code>{`CREATE PROCEDURE usp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT EmployeeID, FirstName, LastName, Salary
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
END;
GO`}</code>
          </pre>

          <h3>Executing a Stored Procedure</h3>
          <pre>
            <code>{`EXEC usp_GetEmployeesByDepartment @DepartmentID = 3;

-- or
EXECUTE usp_GetEmployeesByDepartment 3;`}</code>
          </pre>

          <h3>Stored Procedure with Output Parameter</h3>
          <pre>
            <code>{`CREATE PROCEDURE usp_GetEmployeeCount
    @DepartmentID INT,
    @TotalEmployees INT OUTPUT
AS
BEGIN
    SELECT @TotalEmployees = COUNT(*)
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
END;
GO

-- Execution
DECLARE @Count INT;
EXEC usp_GetEmployeeCount 3, @Count OUTPUT;
SELECT @Count AS TotalEmployees;`}</code>
          </pre>

          <h3>Altering a Stored Procedure</h3>
          <pre>
            <code>{`ALTER PROCEDURE usp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT EmployeeID, FirstName, LastName, Salary, HireDate
    FROM Employees
    WHERE DepartmentID = @DepartmentID
    ORDER BY LastName;
END;
GO`}</code>
          </pre>

          <h3>Dropping a Stored Procedure</h3>
          <pre>
            <code>{`DROP PROCEDURE usp_GetEmployeesByDepartment;
GO`}</code>
          </pre>

          <hr />

          <h2>4. Nested Stored Procedures</h2>
          <p>A stored procedure can call another stored procedure. This is called a <strong>nested stored procedure</strong>.</p>

          <p>SQL Server supports nesting up to <strong>32 levels</strong>.</p>

          <pre>
            <code>{`CREATE PROCEDURE usp_OuterProcedure
AS
BEGIN
    PRINT 'Outer procedure started';
    EXEC usp_InnerProcedure;
    PRINT 'Outer procedure finished';
END;
GO`}</code>
          </pre>

          <hr />

          <h2>5. Querying Metadata</h2>
          <p>Metadata is data about the database objects (tables, columns, views, procedures, etc.).</p>

          <h3>Useful System Catalog Views</h3>
          <pre>
            <code>{`-- List all tables
SELECT * FROM sys.tables;

-- List all columns of a table
SELECT * FROM sys.columns
WHERE object_id = OBJECT_ID('Employees');

-- List all views
SELECT * FROM sys.views;

-- List all stored procedures
SELECT * FROM sys.procedures;

-- List all databases
SELECT * FROM sys.databases;`}</code>
          </pre>

          <h3>Useful System Functions</h3>
          <pre>
            <code>{`-- Get object ID
SELECT OBJECT_ID('Employees');

-- Get object name
SELECT OBJECT_NAME(object_id) FROM sys.tables;

-- Check if object exists
IF OBJECT_ID('Employees', 'U') IS NOT NULL
    PRINT 'Table exists';`}</code>
          </pre>

          <h3>INFORMATION_SCHEMA Views (ANSI Standard)</h3>
          <pre>
            <code>{`SELECT * FROM INFORMATION_SCHEMA.TABLES;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Employees';
SELECT * FROM INFORMATION_SCHEMA.VIEWS;`}</code>
          </pre>

          <hr />
  
          <h2>Practical Example – CollegeDB</h2>

          <h3>Views</h3>
          <pre>
            <code>{`CREATE VIEW StudentDetails
AS
SELECT
    s.StudentID, s.Name, s.Age, s.City, s.Marks,
    d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d ON s.DepartmentID = d.DepartmentID;
GO

SELECT * FROM StudentDetails;
SELECT * FROM StudentDetails WHERE Marks >= 80;

-- Modify the view
ALTER VIEW StudentDetails
AS
SELECT s.StudentID, s.Name, s.Marks, d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d ON s.DepartmentID = d.DepartmentID;
GO`}</code>
          </pre>

          <h3>Stored Procedures</h3>

          <h4>Insert Procedure</h4>
          <pre>
            <code>{`CREATE PROCEDURE AddStudent
    @Name VARCHAR(100),
    @Age INT,
    @Gender VARCHAR(10),
    @City VARCHAR(50),
    @Marks INT,
    @DepartmentID INT
AS
BEGIN
    INSERT INTO Students (Name, Age, Gender, City, Marks, DepartmentID)
    VALUES (@Name, @Age, @Gender, @City, @Marks, @DepartmentID);
END;
GO

-- EXEC AddStudent 'Shaarif', 27, 'Male', 'Rawalpindi', 61, 3;`}</code>
          </pre>

          <h4>Update Procedure (with Error Handling)</h4>
          <pre>
            <code>{`CREATE PROCEDURE UpdateStudent
    @StudentID INT,
    @City VARCHAR(100) = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Students
        SET City = @City
        WHERE StudentID = @StudentID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH;
END;
GO`}</code>
          </pre>

          <h4>Delete Procedure</h4>
          <pre>
            <code>{`CREATE PROCEDURE DeleteStudent
    @StudentID INT
AS
BEGIN
    DELETE FROM Students WHERE StudentID = @StudentID;
END;
GO

-- EXEC DeleteStudent @StudentID = 12;`}</code>
          </pre>
  
  <hr />
  
          <h2>Session 10 Exercise</h2>
          <ol>
            <li>Create a view that shows Employee Full Name, Department Name, and Salary.</li>
            <li>Create a stored procedure that accepts DepartmentID and returns all employees of that department.</li>
            <li>Modify the stored procedure to also return the total number of employees as an OUTPUT parameter.</li>
            <li>Write queries to list all user tables and all stored procedures in your database.</li>
            <li>Drop the view and stored procedure you created.</li>
          </ol>

          <hr />

          <h2>Session 10 Challenge</h2>
          <p>Create the following objects:</p>
          <ol>
            <li>A view named <code>vw_HighSalaryEmployees</code> that shows employees earning more than 70,000 along with their department name.</li>
            <li>A stored procedure named <code>usp_InsertEmployee</code> that inserts a new employee (accept necessary parameters).</li>
            <li>A nested stored procedure example (one procedure calling another).</li>
            <li>Write metadata queries to display:
              <ul>
                <li>All columns of the Employees table</li>
                <li>All views in the database</li>
                <li>All parameters of your stored procedure</li>
              </ul>
            </li>
          </ol>

          <hr />

          <h2>Session 10 Quiz</h2>
          <ol>
            <li>What is a View?</li>
            <li>Does a normal view store data permanently?</li>
            <li>What are the benefits of using Views?</li>
            <li>What is a Stored Procedure?</li>
            <li>Name any three advantages of Stored Procedures.</li>
            <li>What is the maximum nesting level for stored procedures in SQL Server?</li>
            <li>How do you return a value from a stored procedure using an OUTPUT parameter?</li>
            <li>What is metadata?</li>
            <li>Name two system catalog views used to get information about tables and procedures.</li>
            <li>What is the difference between <code>sys.tables</code> and <code>INFORMATION_SCHEMA.TABLES</code>?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 11):</strong> Indexes</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
