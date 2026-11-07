import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session10() {
  return (
    <Layout
      title="Session 10 — Using Views, Stored Procedures, and Querying Metadata"
      description="Views, Stored Procedures, Nested Procedures, and Querying Metadata in SQL Server 2022"
    >
      <CustomLayout>
        <article className="session-content">
        <style>{`
            article code:not(pre code) {
              background-color: #f4f4f4;
              color: #d10057;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: Consolas, Monaco, monospace;
              font-size: 0.9em;
            }
          `}</style>
          <h1>Session 10 — Using Views, Stored Procedures, and Querying Metadata</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Working with Views, Stored Procedures, and querying SQL Server metadata.</p>
          <p><strong>Based on:</strong> Official Book – Session 10</p>
          <p><strong>Note:</strong> All code snippets in this session use the <strong>AdventureWorks2019</strong> sample database.</p>

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

          <p>
            This session moves beyond writing individual queries and introduces
            database objects that package and protect those queries. Views give
            you a reusable, secure way to present data. Stored procedures let
            you encapsulate business logic on the server. Metadata queries help
            you inspect and document the objects that already exist in a database.
          </p>

          <hr />

          <h2>1. Introduction</h2>
          <p>An SQL Server database has two main categories of objects:</p>
          <ul>
            <li>Objects that <strong>store data</strong> (Tables)</li>
            <li>Objects that <strong>access, manipulate, or provide access</strong> to data (Views, Stored Procedures, Functions, etc.)</li>
          </ul>

          <p>Views and Stored Procedures belong to the second category.</p>

          <p>
            Understanding this distinction is important. Tables are the only
            objects that permanently hold business data. Everything else
            (views, procedures, functions, triggers) either reads, transforms,
            or controls access to that data. When you design a database you
            decide which objects should store data and which objects should
            provide a controlled interface to that data.
          </p>

          <hr />

          <h2>2. Views</h2>
          <p>A <strong>View</strong> is a virtual table based on the result of a SELECT statement. It does not store data itself (unless it is an indexed view).</p>

          <p>
            When a user or application queries a view, SQL Server expands the
            view definition and runs the underlying SELECT statement against
            the base tables. The result looks and behaves like a table, but the
            data is always up to date with the current contents of those base
            tables. Because the data is not stored separately, views are
            sometimes called virtual tables.
          </p>

          <p>
            An exception is the indexed view (also called a materialized view).
            An indexed view stores the result set on disk and keeps it
            synchronized with the base tables. Indexed views can improve
            performance for complex aggregations, but they require additional
            storage and careful design. This session focuses on ordinary
            (non-indexed) views.
          </p>

          <h3>Characteristics of Views</h3>
          <ul>
            <li>Made up of selected columns from one or more tables (base tables)</li>
            <li>Base tables can be from the same or different databases</li>
            <li>A view can also be based on other views</li>
            <li>Maximum 1,024 columns</li>
            <li>Data is generated dynamically when the view is queried</li>
          </ul>

          <p>
            Because a view is defined by a SELECT statement, almost any SELECT
            that is valid in a query can be used inside a view. Joins,
            aggregates, computed columns, and even other views are allowed.
            However, some constructs (for example ORDER BY without TOP or
            OFFSET/FETCH) are restricted, and certain modifications through
            views have additional rules.
          </p>

          <h3>Creating a View</h3>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

CREATE VIEW vw_EmployeeDetails
AS
SELECT 
    e.BusinessEntityID,
    p.FirstName,
    p.LastName,
    e.JobTitle,
    e.HireDate,
    d.Name AS DepartmentName
FROM HumanResources.Employee e
INNER JOIN Person.Person p 
    ON e.BusinessEntityID = p.BusinessEntityID
INNER JOIN HumanResources.EmployeeDepartmentHistory edh 
    ON e.BusinessEntityID = edh.BusinessEntityID
INNER JOIN HumanResources.Department d 
    ON edh.DepartmentID = d.DepartmentID
WHERE edh.EndDate IS NULL;   -- current department only
GO`}
          caption="Create a view that joins Employee, Person and Department"/>

          <p>
            The <code>CREATE VIEW</code> statement stores only the SELECT
            definition; it does not copy any rows. The name of the view should
            be meaningful and is often prefixed with <code>vw_</code> or
            <code>v_</code> so that developers can quickly recognize it as a
            view rather than a base table. After the view is created it can be
            queried exactly like a table.
          </p>

          <h3>Querying a View</h3>
          <CodeBlock
          language="sql"
            code={`SELECT *
FROM vw_EmployeeDetails
WHERE DepartmentName = 'Sales'
ORDER BY LastName;`}
          caption="Query the view just like a table"/>

          <p>
            You can apply WHERE, ORDER BY, JOIN, and other clauses when you
            select from a view. The filter in the example above is applied on
            top of the view definition, so only employees whose salary is
            greater than 60,000 appear in the result.
          </p>

          <h3>Altering a View</h3>
          <CodeBlock
          language="sql"
            code={`ALTER VIEW vw_EmployeeDetails
AS
SELECT 
    e.BusinessEntityID,
    p.FirstName + ' ' + p.LastName AS FullName,
    e.JobTitle,
    e.HireDate,
    d.Name AS DepartmentName
FROM HumanResources.Employee e
INNER JOIN Person.Person p 
    ON e.BusinessEntityID = p.BusinessEntityID
INNER JOIN HumanResources.EmployeeDepartmentHistory edh 
    ON e.BusinessEntityID = edh.BusinessEntityID
INNER JOIN HumanResources.Department d 
    ON edh.DepartmentID = d.DepartmentID
WHERE edh.EndDate IS NULL;
GO`}
          caption="ALTER VIEW – replace the entire definition"/>

          <p>
            <code>ALTER VIEW</code> replaces the entire definition of the view.
            Any columns that were previously part of the view but are no longer
            selected disappear from the view. Applications that relied on the
            old column list may break, so changes to views should be planned
            carefully. There is no “add column” syntax for views; you rewrite
            the SELECT.
          </p>

          <h3>Dropping a View</h3>
          <CodeBlock
          language="sql"
            code={`DROP VIEW vw_EmployeeDetails;
GO`}
          caption="Drop a view"/>

          <p>
            Dropping a view removes only the view definition. The underlying
            base tables and their data remain untouched. If other objects
            (procedures, other views, applications) reference the dropped view,
            those objects will fail until they are updated or the view is
            recreated.
          </p>

          <h3>Benefits of Views</h3>
          <ul>
            <li>Simplify complex queries</li>
            <li>Provide security (restrict access to specific columns/rows)</li>
            <li>Logical data independence</li>
            <li>Can be used like tables in SELECT statements</li>
          </ul>

          <p>
            <strong>Simplify complex queries:</strong> A long join or
            aggregation can be written once inside a view. Callers then write
            a short <code>SELECT ... FROM view_name</code> instead of repeating
            the complex logic.
          </p>
          <p>
            <strong>Security:</strong> You can grant a user SELECT permission
            on a view while denying direct access to the underlying tables.
            The view can expose only certain columns or only rows that match a
            filter, effectively implementing column-level and row-level
            security.
          </p>
          <p>
            <strong>Logical data independence:</strong> If the base table
            structure changes (for example a column is renamed or moved to
            another table), you can often adjust the view definition so that
            applications continue to work without modification.
          </p>

          <hr />

          <h2>3. Stored Procedures</h2>
          <p>A <strong>Stored Procedure</strong> is a precompiled collection of one or more T-SQL statements stored in the database.</p>

          <p>
            Unlike an ad-hoc query that is sent from an application every time
            it is needed, a stored procedure is created once, compiled by SQL
            Server, and then executed by name. The compilation produces an
            execution plan that can be reused, which is one of the main reasons
            stored procedures often perform better than equivalent dynamic SQL
            sent from the client.
          </p>

          <p>
            Stored procedures can accept input parameters, return output
            parameters, return result sets, and contain complex control-of-flow
            logic (IF, WHILE, TRY/CATCH, transactions, etc.). They are the
            standard way to encapsulate business rules inside the database.
          </p>

          <h3>Advantages of Stored Procedures</h3>
          <ul>
            <li>Improved performance (precompiled)</li>
            <li>Reduced network traffic</li>
            <li>Better security</li>
            <li>Code reusability</li>
            <li>Easier maintenance</li>
          </ul>

          <p>
            <strong>Performance:</strong> The first execution compiles the
            procedure and caches the plan. Subsequent executions reuse that
            plan, avoiding the cost of parsing and optimizing every time.
          </p>
          <p>
            <strong>Network traffic:</strong> Instead of sending a long batch
            of SQL text from the client, the application sends only the
            procedure name and a few parameter values.
          </p>
          <p>
            <strong>Security:</strong> You can grant EXECUTE permission on a
            procedure without granting direct INSERT/UPDATE/DELETE rights on
            the underlying tables. The procedure becomes a controlled gateway.
          </p>
          <p>
            <strong>Reusability and maintenance:</strong> Business logic lives
            in one place. When a rule changes you update the procedure once
            and every application that calls it immediately benefits.
          </p>

          <h3>Types of Stored Procedures</h3>
          <ul>
            <li><strong>System Stored Procedures</strong> – Provided by SQL Server (start with <code>sp_</code>)</li>
            <li><strong>User-Defined Stored Procedures</strong> – Created by users</li>
            <li><strong>Temporary Stored Procedures</strong> – Local (<code>#proc</code>) or Global (<code>##proc</code>)</li>
            <li><strong>CLR Stored Procedures</strong> – Written in .NET languages</li>
          </ul>

          <p>
            System stored procedures (for example <code>sp_help</code>,
            <code>sp_who</code>, <code>sp_rename</code>) are shipped with SQL
            Server and live in the master database. User-defined procedures are
            the ones you create for your application. Temporary procedures
            exist only for the lifetime of the connection (local) or until the
            last connection that uses them closes (global). CLR procedures are
            advanced and allow you to write procedure logic in C# or another
            .NET language; they are less common in everyday development.
          </p>

          <p>
            By convention many teams prefix user procedures with
            <code>usp_</code> (user stored procedure) to distinguish them from
            system procedures that start with <code>sp_</code>.
          </p>

          <h3>Creating a Stored Procedure</h3>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE usp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT 
        e.BusinessEntityID,
        p.FirstName,
        p.LastName,
        e.JobTitle,
        e.HireDate
    FROM HumanResources.Employee e
    INNER JOIN Person.Person p 
        ON e.BusinessEntityID = p.BusinessEntityID
    INNER JOIN HumanResources.EmployeeDepartmentHistory edh 
        ON e.BusinessEntityID = edh.BusinessEntityID
    WHERE edh.DepartmentID = @DepartmentID
      AND edh.EndDate IS NULL
    ORDER BY p.LastName;
END;
GO

-- Example execution
EXEC usp_GetEmployeesByDepartment @DepartmentID = 7;   -- 7 = Sales
GO`}
          caption="Stored procedure with one input parameter"/>

          <p>
            Parameters are declared after the procedure name and before the
            <code>AS</code> keyword. Each parameter has a name (starting with
            <code>@</code>), a data type, and optionally a default value. The
            body of the procedure is usually wrapped in a <code>BEGIN ... END</code>
            block for clarity, especially when it contains more than one
            statement.
          </p>

          <h3>Executing a Stored Procedure</h3>
          <CodeBlock
          language="sql"
            code={`EXEC usp_GetEmployeesByDepartment @DepartmentID = 3;

-- or
EXECUTE usp_GetEmployeesByDepartment 3;`}
          caption="Executing a stored procedure"/>

          <p>
            Both <code>EXEC</code> and <code>EXECUTE</code> are valid. You can
            pass parameters by name (<code>@DepartmentID = 3</code>) or by
            position. Named parameters are safer when a procedure has many
            parameters or when some have default values, because the order does
            not matter.
          </p>

          <h3>Stored Procedure with Output Parameter</h3>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE usp_GetEmployeeCount
    @DepartmentID INT,
    @TotalEmployees INT OUTPUT
AS
BEGIN
    SELECT @TotalEmployees = COUNT(*)
    FROM HumanResources.EmployeeDepartmentHistory
    WHERE DepartmentID = @DepartmentID
      AND EndDate IS NULL;
END;
GO

-- Execution example
DECLARE @Count INT;
EXEC usp_GetEmployeeCount 
    @DepartmentID = 7, 
    @TotalEmployees = @Count OUTPUT;

SELECT @Count AS TotalEmployeesInSales;
GO`}
          caption="Stored procedure with OUTPUT parameter"/>

          <p>
            An OUTPUT parameter lets the procedure return a scalar value to the
            caller. The parameter is marked with the <code>OUTPUT</code>
            keyword both in the procedure definition and in the EXEC statement.
            The caller must declare a variable, pass it with OUTPUT, and then
            can use the variable after the procedure finishes. This is the
            usual way to return counts, status codes, or newly generated
            identity values.
          </p>

          <h3>Altering a Stored Procedure</h3>
          <CodeBlock
          language="sql"
            code={`ALTER PROCEDURE usp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT 
        e.BusinessEntityID,
        p.FirstName,
        p.LastName,
        e.JobTitle,
        e.HireDate,
        e.VacationHours
    FROM HumanResources.Employee e
    INNER JOIN Person.Person p 
        ON e.BusinessEntityID = p.BusinessEntityID
    INNER JOIN HumanResources.EmployeeDepartmentHistory edh 
        ON e.BusinessEntityID = edh.BusinessEntityID
    WHERE edh.DepartmentID = @DepartmentID
      AND edh.EndDate IS NULL
    ORDER BY p.LastName;
END;
GO`}
          caption="ALTER PROCEDURE – add more columns"/>

          <p>
            <code>ALTER PROCEDURE</code> replaces the entire body of the
            procedure. Permissions that were granted on the procedure are
            preserved, which is an advantage over dropping and recreating it.
            Always test the new definition carefully before altering a
            procedure that is used by production applications.
          </p>

          <h3>Dropping a Stored Procedure</h3>
          <CodeBlock
          language="sql"
            code={`DROP PROCEDURE usp_GetEmployeesByDepartment;
GO`}
          caption="Drop a stored procedure"/>

          <p>
            Once a procedure is dropped, any code that tries to execute it will
            raise an error. If other procedures call the dropped procedure,
            those callers will also fail. Plan dependencies before removing a
            procedure from a live database.
          </p>

          <hr />

          <h2>4. Nested Stored Procedures</h2>
          <p>A stored procedure can call another stored procedure. This is called a <strong>nested stored procedure</strong>.</p>

          <p>SQL Server supports nesting up to <strong>32 levels</strong>.</p>

          <p>
            Nesting is useful when you want to break a large task into smaller,
            reusable pieces. For example, an “order processing” procedure might
            call separate procedures for inventory check, payment validation,
            and shipping label generation. Each inner procedure can be tested
            and maintained independently.
          </p>

          <p>
            The nesting limit of 32 is rarely reached in normal applications.
            If you do hit it, the call fails with an error. Recursive calls
            (a procedure calling itself) also count toward the nesting limit
            and must be designed carefully to avoid infinite loops.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Inner procedure
CREATE PROCEDURE usp_GetDepartmentName
    @DepartmentID INT,
    @DeptName NVARCHAR(50) OUTPUT
AS
BEGIN
    SELECT @DeptName = Name
    FROM HumanResources.Department
    WHERE DepartmentID = @DepartmentID;
END;
GO

-- Outer procedure that calls the inner one
CREATE PROCEDURE usp_ShowDepartmentEmployees
    @DepartmentID INT
AS
BEGIN
    DECLARE @Name NVARCHAR(50);

    EXEC usp_GetDepartmentName 
        @DepartmentID = @DepartmentID, 
        @DeptName = @Name OUTPUT;

    PRINT 'Employees in department: ' + @Name;

    SELECT 
        p.FirstName,
        p.LastName,
        e.JobTitle
    FROM HumanResources.Employee e
    INNER JOIN Person.Person p 
        ON e.BusinessEntityID = p.BusinessEntityID
    INNER JOIN HumanResources.EmployeeDepartmentHistory edh 
        ON e.BusinessEntityID = edh.BusinessEntityID
    WHERE edh.DepartmentID = @DepartmentID
      AND edh.EndDate IS NULL;
END;
GO

-- Test
EXEC usp_ShowDepartmentEmployees @DepartmentID = 7;
GO`}
          caption="Nested stored procedures example"/>

          <p>
            When the outer procedure runs, control transfers to the inner
            procedure, the inner procedure completes, and then control returns
            to the statement after the EXEC in the outer procedure. Any result
            sets or OUTPUT parameters from the inner procedure are available to
            the outer procedure or to the original caller.
          </p>

          <hr />

          <h2>5. Querying Metadata</h2>
          <p>Metadata is data about the database objects (tables, columns, views, procedures, etc.).</p>

          <p>
            Every time you create a table, view, procedure, or index, SQL
            Server records information about that object in a set of system
            tables. Those system tables are exposed through catalog views
            (the <code>sys.*</code> views) and through the ANSI-standard
            INFORMATION_SCHEMA views. Querying metadata is essential for
            documentation, code generation, deployment scripts, and
            troubleshooting.
          </p>

          <h3>Useful System Catalog Views</h3>
          <CodeBlock
          language="sql"
            code={`-- List all tables
SELECT * FROM sys.tables;

-- List all columns of a table
SELECT * FROM sys.columns
WHERE object_id = OBJECT_ID('Employees');

-- List all views
SELECT * FROM sys.views;

-- List all stored procedures
SELECT * FROM sys.procedures;

-- List all databases
SELECT * FROM sys.databases;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The <code>sys.*</code> catalog views are the most complete and
            up-to-date source of metadata in SQL Server. <code>sys.tables</code>
            lists user tables, <code>sys.columns</code> lists columns,
            <code>sys.views</code> lists views, and <code>sys.procedures</code>
            lists stored procedures. Most of these views contain an
            <code>object_id</code> column that uniquely identifies the object
            inside the database; you frequently join on that column or use the
            <code>OBJECT_ID()</code> function to filter by name.
          </p>

          <h3>Useful System Functions</h3>
          <CodeBlock
          language="sql"
            code={`-- Get object ID
SELECT OBJECT_ID('Employees');

-- Get object name
SELECT OBJECT_NAME(object_id) FROM sys.tables;

-- Check if object exists
IF OBJECT_ID('Employees', 'U') IS NOT NULL
    PRINT 'Table exists';`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>OBJECT_ID('name')</code> returns the integer identifier of
            an object. The optional second argument is an object type code
            (<code>'U'</code> for user table, <code>'V'</code> for view,
            <code>'P'</code> for procedure, etc.). Checking whether
            <code>OBJECT_ID(...)</code> is not NULL is a common way to test
            existence before creating or dropping an object.
          </p>

          <h3>INFORMATION_SCHEMA Views (ANSI Standard)</h3>
          <CodeBlock
          language="sql"
            code={`SELECT * FROM INFORMATION_SCHEMA.TABLES;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Employees';
SELECT * FROM INFORMATION_SCHEMA.VIEWS;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            INFORMATION_SCHEMA views follow the SQL standard and are available
            in many database platforms, which makes them useful for portable
            scripts. They expose a simpler, more limited set of information
            than the <code>sys.*</code> catalog views. For SQL-Server-specific
            details (for example index structure, partition information, or
            extended properties) you will usually prefer the <code>sys</code>
            catalog views.
          </p>

          <p>
            A practical rule of thumb: use INFORMATION_SCHEMA when you need
            basic, cross-platform metadata; use <code>sys.*</code> when you
            need the full picture inside SQL Server.
          </p>

          <hr />
  
          <h2>Practical Example – CollegeDB</h2>

          <p>
            The following examples use a simple College database with Students
            and Departments tables. They illustrate the same concepts you saw
            earlier, but with realistic create/alter/execute patterns that you
            can adapt to your own projects.
          </p>

          <h3>Views</h3>
          <CodeBlock
          language="sql"
            code={`CREATE VIEW StudentDetails
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Notice that after creating the view you can filter it just like a
            table. The later ALTER VIEW removes some columns from the view
            definition; any application that selected Age or City from the
            view would need to be updated after that change.
          </p>

          <h3>Stored Procedures</h3>

          <h4>Insert Procedure</h4>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE AddStudent
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

-- EXEC AddStudent 'Shaarif', 27, 'Male', 'Rawalpindi', 61, 3;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Parameterized INSERT procedures are preferred over building INSERT
            statements as dynamic SQL in the application. They reduce the risk
            of SQL injection and keep the column list and data types under the
            control of the database developer.
          </p>

          <h4>Update Procedure (with Error Handling)</h4>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE UpdateStudent
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This example demonstrates a common production pattern: wrap the
            data-change statement in an explicit transaction and use
            TRY/CATCH so that any error rolls back the transaction and returns
            a clear error message. The <code>@City</code> parameter has a
            default of NULL, which means the caller can omit it; you would
            normally add logic to update only when a non-NULL value is supplied.
          </p>

          <h4>Delete Procedure</h4>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE DeleteStudent
    @StudentID INT
AS
BEGIN
    DELETE FROM Students WHERE StudentID = @StudentID;
END;
GO

-- EXEC DeleteStudent @StudentID = 12;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Even a simple DELETE is often placed inside a procedure so that
            additional checks (for example “do not delete if the student has
            related enrollment rows”) can be added later without changing the
            calling application.
          </p>
  
  <hr />
  
          <h2>Session 10 Exercise</h2>

          <p>
            Complete each exercise in order. Use a practice database that
            contains Employees and Departments tables (or adapt the names to
            the sample database you are using). After each step, verify the
            result with a SELECT or by calling the procedure.
          </p>

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

          <p>
            The challenge combines several skills from this session. Work
            through each item, test it, and then write the metadata queries
            that prove the objects exist and have the expected structure.
          </p>

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

          <p>
            Use these questions to check your understanding before moving to
            the next session. Try to answer from memory first, then review the
            relevant section of the notes if needed.
          </p>

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
