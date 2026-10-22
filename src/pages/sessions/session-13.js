import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session13() {
  return (
    <Layout
      title="Session 13 — User-Defined Functions"
      description="User-Defined Functions, control-of-flow, and ranking functions in SQL Server"
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
          <h1>Session 13 — User-Defined Functions</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Control-of-flow statements and User-Defined Functions (UDFs).</p>

          <hr />

          <h2>1. Batches and GO</h2>
          <CodeBlock
          language="sql"
            code={`PRINT 'This is the first statement';
PRINT 'This is the second statement';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. IF...ELSE</h2>
          <CodeBlock
          language="sql"
            code={`DECLARE @Salary DECIMAL(10,2) = 75000;

IF @Salary > 70000
    PRINT 'High Salary';
ELSE
    PRINT 'Regular Salary';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. WHILE Loop</h2>
          <CodeBlock
          language="sql"
            code={`DECLARE @Counter INT = 1;

WHILE @Counter <= 5
BEGIN
    PRINT @Counter;
    SET @Counter = @Counter + 1;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Variables</h2>
          <CodeBlock
          language="sql"
            code={`DECLARE @EmployeeName NVARCHAR(50);
DECLARE @Salary DECIMAL(10,2) = 0;

SET @EmployeeName = 'Ali';
SET @Salary = 85000;

SELECT @EmployeeName AS Name, @Salary AS Salary;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. Scalar User-Defined Function</h2>
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Table-Valued Function</h2>
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
    SELECT EmployeeID, FirstName, LastName, HireDate
    FROM HumanResources.Employee
    WHERE DepartmentID = @DepartmentID
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. Alter / Drop Function</h2>
          <CodeBlock
          language="sql"
            code={`ALTER FUNCTION dbo.fn_GetFullName ...
DROP FUNCTION dbo.fn_GetFullName;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. Ranking Functions</h2>
          <CodeBlock
          language="sql"
            code={`-- Row number within each department
SELECT
    EmployeeID,
    FirstName,
    LastName,
    DepartmentID,
    ROW_NUMBER() OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS RowNum,
    RANK() OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS RankNum,
    DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS DenseRankNum
FROM HumanResources.Employee;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 13 Exercise</h2>
          <ol>
            <li>Write an IF...ELSE block that checks a variable.</li>
            <li>Create a scalar function that returns the square of a number.</li>
            <li>Create a simple inline table-valued function.</li>
            <li>Use ROW_NUMBER() on any AdventureWorks table.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 14):</strong> Indexes and Performance</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
