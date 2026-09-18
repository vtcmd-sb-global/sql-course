import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session13() {
  return (
    <Layout
      title="Session 13 — Programming Transact-SQL"
      description="Programming Transact-SQL — Control-of-Flow, Batches, User-Defined Functions, Window Functions with OVER"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 13 — Programming Transact-SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learning procedural programming features in T-SQL including control-of-flow, functions, and window functions.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 13</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain Transact-SQL programming</li>
            <li>Identify program flow statements</li>
            <li>Describe various Transact-SQL functions</li>
            <li>Explain the procedure to create and alter User-Defined Functions (UDFs)</li>
            <li>Elaborate on creation of windows with OVER</li>
            <li>Define window functions</li>
          </ul>

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

          <hr />

          <h2>2. Batches</h2>
          <p>A <strong>batch</strong> is a group of one or more T-SQL statements that are sent to the server as a single unit and executed together.</p>

          <pre>
            <code>{`PRINT 'This is the first statement';
PRINT 'This is the second statement';
GO                                  -- End of batch

PRINT 'This is a new batch';
GO`}</code>
          </pre>

          <p>The <code>GO</code> keyword is a batch separator used by SSMS (it is not a T-SQL statement).</p>

          <hr />

          <h2>3. Program Flow Statements (Control-of-Flow)</h2>

          <h3>3.1 BEGIN...END</h3>
          <p>Groups multiple statements into a single block.</p>

          <h3>3.2 IF...ELSE</h3>
          <pre>
            <code>{`DECLARE @Salary DECIMAL(10,2) = 75000;

IF @Salary > 70000
    PRINT 'High Salary';
ELSE
    PRINT 'Normal Salary';`}</code>
          </pre>

          <h3>3.3 WHILE Loop</h3>
          <pre>
            <code>{`DECLARE @Counter INT = 1;

WHILE @Counter <= 5
BEGIN
    PRINT @Counter;
    SET @Counter = @Counter + 1;
END;`}</code>
          </pre>

          <h3>3.4 Other Control-of-Flow Keywords</h3>
          <ul>
            <li><code>BREAK</code> – Exits the innermost loop</li>
            <li><code>CONTINUE</code> – Restarts the loop</li>
            <li><code>RETURN</code> – Exits from a procedure or batch</li>
            <li><code>WAITFOR</code> – Delays execution</li>
          </ul>

          <hr />

          <h2>4. Variables in T-SQL</h2>
          <pre>
            <code>{`DECLARE @EmployeeName NVARCHAR(50);
DECLARE @Salary DECIMAL(10,2) = 0;

SET @EmployeeName = 'Ali Khan';
SET @Salary = 65000;

SELECT @EmployeeName AS Name, @Salary AS Salary;`}</code>
          </pre>

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

          <hr />

          <h2>6. User-Defined Functions (UDFs)</h2>
          <p>You can create your own functions in T-SQL.</p>

          <h3>Types of User-Defined Functions</h3>
          <ul>
            <li><strong>Scalar Functions</strong> – Return a single value</li>
            <li><strong>Table-Valued Functions (Inline / Multi-statement)</strong> – Return a table</li>
          </ul>

          <h3>Creating a Scalar Function</h3>
          <pre>
            <code>{`CREATE FUNCTION dbo.fn_GetFullName
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
SELECT dbo.fn_GetFullName('Ali', 'Khan') AS FullName;`}</code>
          </pre>

          <h3>Creating an Inline Table-Valued Function</h3>
          <pre>
            <code>{`CREATE FUNCTION dbo.fn_GetEmployeesByDept
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
SELECT * FROM dbo.fn_GetEmployeesByDept(3);`}</code>
          </pre>

          <h3>Altering and Dropping Functions</h3>
          <pre>
            <code>{`ALTER FUNCTION dbo.fn_GetFullName ...
DROP FUNCTION dbo.fn_GetFullName;`}</code>
          </pre>

          <hr />

          <h2>7. Window Functions and the OVER Clause</h2>
          <p><strong>Window functions</strong> perform calculations across a set of rows related to the current row (called a window).</p>

          <p>The <code>OVER</code> clause defines the window.</p>

          <h3>Common Window Functions</h3>
          <ul>
            <li><code>ROW_NUMBER()</code></li>
            <li><code>RANK()</code></li>
            <li><code>DENSE_RANK()</code></li>
            <li><code>NTILE()</code></li>
            <li><code>SUM() OVER()</code>, <code>AVG() OVER()</code>, <code>COUNT() OVER()</code></li>
            <li><code>LAG()</code>, <code>LEAD()</code></li>
          </ul>

          <h3>Examples</h3>
          <pre>
            <code>{`-- Row number within each department
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
FROM Employees;`}</code>
          </pre>

          <hr />

          <h2>Session 13 Exercise</h2>
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
          <ol>
            <li>A scalar function <code>fn_CalculateBonus</code> that returns 10% of salary if salary &gt; 50000, otherwise 5%.</li>
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
