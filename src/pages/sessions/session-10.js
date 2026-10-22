import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session10() {
  return (
    <Layout
      title="Session 10 — Views"
      description="Creating and managing Views in SQL Server 2022"
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
          <h1>Session 10 — Views</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Creating, altering, and using views.</p>

          <hr />

          <h2>1. Creating a View</h2>
          <CodeBlock
          language="sql"
            code={`CREATE VIEW vw_EmployeeDetails
AS
SELECT
    e.EmployeeID,
    p.FirstName,
    p.LastName,
    e.JobTitle,
    e.HireDate
FROM HumanResources.Employee AS e
INNER JOIN Person.Person AS p
    ON e.BusinessEntityID = p.BusinessEntityID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. Querying a View</h2>
          <CodeBlock
          language="sql"
            code={`SELECT *
FROM vw_EmployeeDetails
WHERE JobTitle LIKE '%Manager%';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. Altering a View</h2>
          <CodeBlock
          language="sql"
            code={`ALTER VIEW vw_EmployeeDetails
AS
SELECT
    e.EmployeeID,
    p.FirstName,
    p.LastName,
    e.JobTitle,
    e.HireDate,
    e.VacationHours
FROM HumanResources.Employee AS e
INNER JOIN Person.Person AS p
    ON e.BusinessEntityID = p.BusinessEntityID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Dropping a View</h2>
          <CodeBlock
          language="sql"
            code={`DROP VIEW vw_EmployeeDetails;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. View with JOIN and Filter</h2>
          <CodeBlock
          language="sql"
            code={`CREATE VIEW vw_ProductList
AS
SELECT
    p.ProductID,
    p.Name AS ProductName,
    p.ListPrice,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice > 0;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT *
FROM vw_ProductList
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Indexed View (Schemabinding)</h2>
          <CodeBlock
          language="sql"
            code={`CREATE VIEW vw_SalesSummary
WITH SCHEMABINDING
AS
SELECT
    YEAR(OrderDate) AS OrderYear,
    COUNT_BIG(*) AS OrderCount,
    SUM(TotalDue) AS TotalSales
FROM Sales.SalesOrderHeader
GROUP BY YEAR(OrderDate);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. More Examples</h2>
          <CodeBlock
          language="sql"
            code={`-- Simple view on AdventureWorks
CREATE VIEW vw_PersonContact
AS
SELECT
    BusinessEntityID,
    FirstName,
    LastName,
    EmailPromotion
FROM Person.Person;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT FirstName, LastName
FROM vw_PersonContact
WHERE EmailPromotion = 1;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`IF OBJECT_ID('dbo.vw_PersonContact', 'V') IS NOT NULL
    DROP VIEW dbo.vw_PersonContact;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 10 Exercise</h2>
          <ol>
            <li>Create a view that joins Product and ProductCategory.</li>
            <li>Query the view with a WHERE clause.</li>
            <li>Alter the view to add one more column.</li>
            <li>Drop the view safely.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 11):</strong> Stored Procedures</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
