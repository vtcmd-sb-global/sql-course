import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session13() {
  return (
    <Layout
      title="Session 13 — Programming Transact-SQL"
      description="Programming Transact-SQL — Control-of-Flow, Batches, User-Defined Functions, Window Functions with OVER"
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
          <h1>Session 13 — Programming Transact-SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learning procedural programming features in T-SQL including control-of-flow, functions, and window functions.</p>
          <p><strong>Based on:</strong> Official Book – Session 13</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain Transact-SQL programming</li>
            <li>Identify program flow statements</li>
            <li>Describe various Transact-SQL functions</li>
            <li>Explain the procedure to create and alter User-Defined Functions (UDFs)</li>
            <li>Elaborate on the creation of windows with OVER</li>
            <li>Define window functions</li>
          </ul>

          <p>
            Up to this point you have mostly written declarative SQL: SELECT,
            JOIN, GROUP BY, and so on. This session introduces the procedural
            side of T-SQL — variables, branching, loops, reusable functions,
            and window functions that calculate values relative to other rows
            without collapsing the result set.
          </p>

          <hr />

          <h2>1. Introduction to Transact-SQL Programming</h2>
          <p>Transact-SQL is not only a query language — it is also a <strong>procedural programming language</strong>.</p>

          <p>It supports programming constructs similar to high-level languages such as:</p>
          <ul>
            <li>Variables</li>
            <li>Conditional statements (IF...ELSE)</li>
            <li>Loops (WHILE)</li>
            <li>Error handling</li>
            <li>User-defined functions</li>
            <li>Batches</li>
          </ul>

          <p>
            These features let you write scripts and stored logic that make
            decisions, repeat work, and package calculations for reuse. They
            are the foundation for stored procedures, triggers, and complex
            ETL scripts. Prefer set-based queries when possible; use procedural
            code when you truly need branching, looping, or reusable scalar
            logic.
          </p>

          <hr />

          <h2>2. Batches</h2>
          <p>A <strong>batch</strong> is a group of one or more T-SQL statements that are sent to the server as a single unit and executed together.</p>

          <CodeBlock
          language="sql"
            code={`PRINT 'This is the first statement';
PRINT 'This is the second statement';
GO                                  -- End of batch

PRINT 'This is a new batch';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>The <code>GO</code> keyword is a batch separator used by SSMS (it is not a T-SQL statement).</p>

          <p>
            Important batch rules:
          </p>
          <ul>
            <li>Variables declared in one batch are not visible in the next batch after GO.</li>
            <li>CREATE PROCEDURE, CREATE FUNCTION, CREATE VIEW, and similar statements must be the first statement in a batch (often they stand alone with GO before and after).</li>
            <li>A compile error in a batch prevents the whole batch from running; runtime errors behave according to error-handling settings (covered in the next session).</li>
          </ul>

          <hr />

          <h2>3. Program Flow Statements (Control-of-Flow)</h2>

          <h3>3.1 BEGIN...END</h3>
          <p>Groups multiple statements into a single block.</p>

          <p>
            Whenever an IF or WHILE must run more than one statement, wrap
            those statements in BEGIN...END. Without it, only the first
            statement is controlled by the IF/WHILE.
          </p>

          <CodeBlock
          language="sql"
            code={`IF @Salary > 70000
BEGIN
    PRINT 'High Salary';
    PRINT 'Eligible for bonus review';
END
ELSE
BEGIN
    PRINT 'Normal Salary';
END;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>3.2 IF...ELSE</h3>
          <CodeBlock
          language="sql"
            code={`DECLARE @Salary DECIMAL(10,2) = 75000;

IF @Salary > 70000
    PRINT 'High Salary';
ELSE
    PRINT 'Normal Salary';`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            You can chain conditions with ELSE IF for multiple ranges:
          </p>
          <CodeBlock
          language="sql"
            code={`DECLARE @Salary DECIMAL(10,2) = 45000;

IF @Salary >= 70000
    PRINT 'High';
ELSE IF @Salary >= 40000
    PRINT 'Medium';
ELSE
    PRINT 'Low';`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>3.3 WHILE Loop</h3>
          <CodeBlock
          language="sql"
            code={`DECLARE @Counter INT = 1;

WHILE @Counter <= 5
BEGIN
    PRINT @Counter;
    SET @Counter = @Counter + 1;
END;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Always ensure the loop variable changes in a way that eventually
            makes the condition false; otherwise you create an infinite loop.
            Prefer set-based solutions over loops for processing table data.
          </p>

          <h3>3.4 Other Control-of-Flow Keywords</h3>
          <ul>
            <li><code>BREAK</code> – Exits the innermost loop</li>
            <li><code>CONTINUE</code> – Restarts the loop</li>
            <li><code>RETURN</code> – Exits from a procedure or batch</li>
            <li><code>WAITFOR</code> – Delays execution</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- BREAK example: stop when counter reaches 3
DECLARE @i INT = 1;
WHILE @i <= 10
BEGIN
    IF @i = 3 BREAK;
    PRINT @i;
    SET @i = @i + 1;
END;

-- WAITFOR delay (demo only)
-- WAITFOR DELAY '00:00:02';  -- wait 2 seconds
`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Variables in T-SQL</h2>
          <CodeBlock
          language="sql"
            code={`DECLARE @EmployeeName NVARCHAR(50);
DECLARE @Salary DECIMAL(10,2) = 0;

SET @EmployeeName = 'Ali Khan';
SET @Salary = 65000;

SELECT @EmployeeName AS Name, @Salary AS Salary;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Variables are local to the batch (or procedure) in which they are
            declared. Names start with <code>@</code>. You can assign with
            <code>SET</code> or with <code>SELECT @var = column FROM table</code>
            (the latter is convenient when reading a single value from a query).
          </p>

          <CodeBlock
          language="sql"
            code={`-- Assign from a query (one row expected)
DECLARE @MaxSalary DECIMAL(10,2);
SELECT @MaxSalary = MAX(ListPrice) FROM Production.Product;
SELECT @MaxSalary AS HighestListPrice;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. Built-in Functions</h2>
          <p>SQL Server provides a large number of built-in functions:</p>

          <ul>
            <li><strong>String Functions</strong>: <code>LEN</code>, <code>SUBSTRING</code>, <code>REPLACE</code>, <code>UPPER</code>, <code>LOWER</code>, <code>LTRIM</code>, <code>RTRIM</code>, <code>CONCAT</code></li>
            <li><strong>Date Functions</strong>: <code>GETDATE</code>, <code>DATEADD</code>, <code>DATEDIFF</code>, <code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>FORMAT</code></li>
            <li><strong>Aggregate Functions</strong>: <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code></li>
            <li><strong>Mathematical Functions</strong>: <code>ROUND</code>, <code>CEILING</code>, <code>FLOOR</code>, <code>ABS</code></li>
            <li><strong>Conversion Functions</strong>: <code>CAST</code>, <code>CONVERT</code>, <code>TRY_CAST</code>, <code>TRY_CONVERT</code></li>
          </ul>

          <h3>Quick examples</h3>
          <CodeBlock
          language="sql"
            code={`-- String
SELECT UPPER('sql server') AS U, CONCAT('Ali', ' ', 'Khan') AS FullName,
       SUBSTRING('AdventureWorks', 1, 9) AS Part;

-- Date
SELECT GETDATE() AS Now,
       DATEADD(day, 7, GETDATE()) AS NextWeek,
       DATEDIFF(year, '2000-01-01', GETDATE()) AS YearsSince2000;

-- Math & conversion
SELECT ROUND(123.456, 2) AS R2, CEILING(3.2) AS C, FLOOR(3.8) AS F;
SELECT CAST(123.45 AS INT) AS AsInt, TRY_CAST('abc' AS INT) AS SafeCast;  -- SafeCast is NULL
`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Prefer <code>TRY_CAST</code> / <code>TRY_CONVERT</code> when the
            source data might not convert cleanly; they return NULL instead of
            raising an error.
          </p>

          <hr />

          <h2>6. User-Defined Functions (UDFs)</h2>
          <p>You can create your own functions in T-SQL.</p>

          <p>
            UDFs package reusable logic. Unlike stored procedures, functions
            can appear in the SELECT list, WHERE clause, or FROM clause
            (table-valued functions). Important restriction: classic T-SQL
            functions must not have side effects — they cannot modify tables
            with INSERT/UPDATE/DELETE (with limited exceptions for some newer
            features). Keep them deterministic when possible so the optimizer
            can use them efficiently.
          </p>

          <h3>Types of User-Defined Functions</h3>
          <ul>
            <li><strong>Scalar Functions</strong> – Return a single value</li>
            <li><strong>Table-Valued Functions (Inline / Multi-statement)</strong> – Return a table</li>
          </ul>

          <p>
            Inline table-valued functions are usually faster because SQL Server
            can expand them into the outer query (similar to a view).
            Multi-statement TVFs declare a return table variable and populate
            it with multiple statements; they are more flexible but often less
            optimizable.
          </p>

          <h3>Creating a Scalar Function</h3>
          <CodeBlock
          language="sql"
            code={`CREATE FUNCTION dbo.fn_GetFullName
(
    @FirstName NVARCHAR(50),
    @LastName  NVARCHAR(50)
)
RETURNS NVARCHAR(101)
AS
BEGIN
    RETURN @FirstName + ' ' + @LastName;
END;
GO

-- Using the function
SELECT dbo.fn_GetFullName('Ali', 'Khan') AS FullName;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Call scalar functions with the schema name:
            <code>dbo.fn_GetFullName(...)</code>. You can also use them in a
            SELECT against a table:
          </p>
          <CodeBlock
          language="sql"
            code={`SELECT EmployeeID, dbo.fn_GetFullName(FirstName, LastName) AS FullName
FROM Employees;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Creating an Inline Table-Valued Function</h3>
          <CodeBlock
          language="sql"
            code={`CREATE FUNCTION dbo.fn_GetEmployeesByDept
(
    @DepartmentID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT EmployeeID, FirstName, LastName, Salary
    FROM Employees
    WHERE DepartmentID = @DepartmentID
);
GO

-- Using the function
SELECT * FROM dbo.fn_GetEmployeesByDept(3);`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The function is used like a table in the FROM clause. Inline TVFs
            are a clean way to parameterize a view-like query.
          </p>

          <h3>Multi-statement Table-Valued Function (example)</h3>
          <CodeBlock
          language="sql"
            code={`CREATE FUNCTION dbo.fn_HighSalaryEmployees
(
    @MinSalary DECIMAL(10,2)
)
RETURNS @Result TABLE
(
    EmployeeID INT,
    FullName   NVARCHAR(101),
    Salary     DECIMAL(10,2)
)
AS
BEGIN
    INSERT INTO @Result (EmployeeID, FullName, Salary)
    SELECT EmployeeID, FirstName + ' ' + LastName, Salary
    FROM Employees
    WHERE Salary >= @MinSalary;

    RETURN;
END;
GO

SELECT * FROM dbo.fn_HighSalaryEmployees(70000);`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Altering and Dropping Functions</h3>
          <CodeBlock
          language="sql"
            code={`ALTER FUNCTION dbo.fn_GetFullName ...
DROP FUNCTION dbo.fn_GetFullName;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>ALTER FUNCTION</code> replaces the definition while keeping
            permissions. <code>DROP FUNCTION</code> removes it; dependent
            objects will fail until updated.
          </p>

          <hr />

          <h2>7. Window Functions and the OVER Clause</h2>
          <p><strong>Window functions</strong> perform calculations across a set of rows related to the current row (called a window).</p>

          <p>The <code>OVER</code> clause defines the window.</p>

          <p>
            Unlike GROUP BY, window functions do not collapse rows. Each input
            row remains in the result, and the function adds a calculated
            column based on a “window” of related rows. That window is defined
            by:
          </p>
          <ul>
            <li><code>PARTITION BY</code> — optional groups (like a soft GROUP BY)</li>
            <li><code>ORDER BY</code> — order inside each partition (required for ranking and for many framed aggregates)</li>
            <li>Frame clause (ROWS/RANGE) — advanced; controls which rows relative to the current row are included</li>
          </ul>

          <h3>Common Window Functions</h3>
          <ul>
            <li><code>ROW_NUMBER()</code></li>
            <li><code>RANK()</code></li>
            <li><code>DENSE_RANK()</code></li>
            <li><code>NTILE()</code></li>
            <li><code>SUM() OVER()</code>, <code>AVG() OVER()</code>, <code>COUNT() OVER()</code></li>
            <li><code>LAG()</code>, <code>LEAD()</code></li>
          </ul>

          <p>
            <strong>ROW_NUMBER</strong> assigns unique sequential numbers.
            <strong>RANK</strong> leaves gaps after ties (1, 2, 2, 4).
            <strong>DENSE_RANK</strong> does not leave gaps (1, 2, 2, 3).
            <strong>LAG</strong> / <strong>LEAD</strong> access the previous or
            next row’s value without a self-join.
          </p>

          <h3>Examples</h3>
          <CodeBlock
          language="sql"
            code={`-- Row number within each department
SELECT 
    EmployeeID,
    FirstName,
    DepartmentID,
    Salary,
    ROW_NUMBER() OVER(PARTITION BY DepartmentID ORDER BY Salary DESC) AS RowNum
FROM Employees;

-- Running total of salary
SELECT 
    EmployeeID,
    FirstName,
    Salary,
    SUM(Salary) OVER(ORDER BY EmployeeID) AS RunningTotal
FROM Employees;

-- Rank employees by salary
SELECT 
    FirstName,
    Salary,
    RANK() OVER(ORDER BY Salary DESC) AS SalaryRank
FROM Employees;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>RANK vs DENSE_RANK vs ROW_NUMBER</h3>
          <CodeBlock
          language="sql"
            code={`SELECT
    FirstName,
    Salary,
    ROW_NUMBER() OVER(ORDER BY Salary DESC) AS RowNum,
    RANK()       OVER(ORDER BY Salary DESC) AS RankNum,
    DENSE_RANK() OVER(ORDER BY Salary DESC) AS DenseRankNum
FROM Employees;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>LAG and LEAD</h3>
          <CodeBlock
          language="sql"
            code={`SELECT
    EmployeeID,
    FirstName,
    Salary,
    LAG(Salary, 1)  OVER(ORDER BY EmployeeID) AS PrevSalary,
    LEAD(Salary, 1) OVER(ORDER BY EmployeeID) AS NextSalary
FROM Employees;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Window functions are extremely useful for reports: top-N per group,
            running totals, period-over-period comparisons, and percentiles
            (with NTILE or PERCENT_RANK).
          </p>

          <hr />

          <h2>Session 13 Exercise</h2>

          <p>
            Practice each construct in isolation first, then combine them.
            For functions, create them, call them, and finally drop them if
            you are working in a shared practice database.
          </p>

          <ol>
            <li>Write a script using IF...ELSE to check whether a given salary is High, Medium, or Low.</li>
            <li>Write a WHILE loop that prints numbers from 1 to 10.</li>
            <li>Create a scalar function that calculates the annual salary (Monthly Salary × 12).</li>
            <li>Create an inline table-valued function that returns employees of a specific department.</li>
            <li>Write a query using <code>ROW_NUMBER()</code> and <code>RANK()</code> on the Employees table.</li>
          </ol>

          <hr />

          <h2>Session 13 Challenge</h2>
          <p>Create the following:</p>

          <p>
            The challenge mixes scalar logic, table-valued functions, and
            several window functions in one reporting query — a realistic
            pattern for business reports.
          </p>

          <ol>
            <li>A scalar function <code>fn_CalculateBonus</code> that returns 10% of salary if salary {'>'} 50000, otherwise 5%.</li>
            <li>A multi-statement table-valued function that returns high-salary employees.</li>
            <li>A query that shows:
              <ul>
                <li>Employee Name</li>
                <li>Salary</li>
                <li>Department-wise Rank</li>
                <li>Overall Rank</li>
                <li>Running Total of Salary</li>
              </ul>
            </li>
            <li>Use <code>LAG()</code> to show previous employee’s salary in the result.</li>
          </ol>

          <hr />

          <h2>Session 13 Quiz</h2>

          <p>
            Focus on the difference between batches and GO, scalar vs
            table-valued functions, and how RANK differs from DENSE_RANK and
            ROW_NUMBER.
          </p>

          <ol>
            <li>What is a batch in T-SQL?</li>
            <li>What is the purpose of the GO keyword?</li>
            <li>Name three control-of-flow statements.</li>
            <li>What is the difference between a scalar function and a table-valued function?</li>
            <li>Can User-Defined Functions modify data in tables?</li>
            <li>What is a window function?</li>
            <li>What does the OVER clause do?</li>
            <li>What is the difference between RANK() and DENSE_RANK()?</li>
            <li>What does PARTITION BY do in a window function?</li>
            <li>What is the purpose of LAG() and LEAD() functions?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 14):</strong> Transactions and Error Handling</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
