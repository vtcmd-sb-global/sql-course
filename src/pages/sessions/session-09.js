import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session09() {
  return (
    <Layout
      title="Session 09 — Advanced Queries and Joins"
      description="Advanced Queries and Joins — GROUP BY, HAVING, Subqueries, Joins, Set Operators, PIVOT"
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

          <h1>Session 09 — Advanced Queries and Joins</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Grouping, aggregating, subqueries, joins, and set operators.</p>
          <p><strong>Practical Database:</strong> AdventureWorks2019</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 9</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Use GROUP BY and aggregate functions</li>
            <li>Filter groups with HAVING</li>
            <li>Write subqueries and table expressions</li>
            <li>Use INNER, LEFT, and RIGHT joins</li>
            <li>Apply UNION, INTERSECT, and EXCEPT</li>
            <li>Understand PIVOT and GROUPING SETS at a basic level</li>
          </ul>

          <hr />

          <h2>0. Start with AdventureWorks2019</h2>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>1. Grouping and Aggregating Data</h2>
          <p>Aggregate functions summarize rows: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>.</p>

          <CodeBlock
          language="sql"
            code={`SELECT
    COUNT(*) AS ProductCount,
    AVG(ListPrice) AS AvgPrice,
    MIN(ListPrice) AS MinPrice,
    MAX(ListPrice) AS MaxPrice
FROM Production.Product
WHERE ListPrice > 0;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    SUM(ListPrice) AS TotalListPrice,
    COUNT(DISTINCT Color) AS DistinctColors
FROM Production.Product
WHERE ListPrice > 0;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. GROUP BY</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS ProductCount,
    AVG(ListPrice) AS AvgPrice
FROM Production.Product
WHERE Color IS NOT NULL AND ListPrice > 0
GROUP BY Color
ORDER BY ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductSubcategoryID,
    COUNT(*) AS ProductCount,
    AVG(ListPrice) AS AvgPrice
FROM Production.Product
WHERE ProductSubcategoryID IS NOT NULL
GROUP BY ProductSubcategoryID
ORDER BY ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. HAVING Clause</h2>
          <p>HAVING filters groups after aggregation. WHERE filters rows before grouping.</p>

          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS ProductCount
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING COUNT(*) > 20
ORDER BY ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Subqueries</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM Production.Product
    WHERE ListPrice > 0
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name
FROM Production.Product
WHERE ProductSubcategoryID IN (
    SELECT ProductSubcategoryID
    FROM Production.ProductSubcategory
    WHERE Name LIKE '%Bike%'
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice = (
    SELECT MAX(ListPrice)
    FROM Production.Product
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. Table Expressions</h2>
          <p>Common table expressions (CTEs) improve readability for complex queries.</p>

          <CodeBlock
          language="sql"
            code={`WITH ExpensiveProducts AS
(
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ListPrice > 1500
)
SELECT *
FROM ExpensiveProducts
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Joins</h2>
          <p>Joins combine rows from two or more tables based on related columns.</p>

          <hr />

          <h2>7. INNER JOIN</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. LEFT JOIN</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. RIGHT JOIN</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
RIGHT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>10. JOIN + GROUP BY</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    ps.Name AS SubcategoryName,
    COUNT(*) AS ProductCount,
    AVG(p.ListPrice) AS AvgPrice
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice > 0
GROUP BY ps.Name
ORDER BY ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>11. Sales Data with JOINs</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.Name AS ProductName,
    SUM(sod.OrderQty) AS TotalQty,
    SUM(sod.LineTotal) AS TotalSales
FROM Sales.SalesOrderDetail AS sod
INNER JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
GROUP BY p.Name
ORDER BY TotalSales DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    pc.Name AS CategoryName,
    COUNT(DISTINCT p.ProductID) AS ProductCount,
    SUM(sod.LineTotal) AS TotalSales
FROM Sales.SalesOrderDetail AS sod
INNER JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
INNER JOIN Production.ProductCategory AS pc
    ON ps.ProductCategoryID = pc.ProductCategoryID
GROUP BY pc.Name
ORDER BY TotalSales DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>12. Set Operators</h2>

          <h3>UNION / UNION ALL</h3>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name
FROM Production.Product
WHERE ListPrice > 1000

UNION

SELECT ProductID, Name
FROM Production.Product
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name
FROM Production.Product
WHERE ListPrice > 1000

UNION ALL

SELECT ProductID, Name
FROM Production.Product
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>INTERSECT and EXCEPT</h3>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID
FROM Production.Product
WHERE ListPrice > 1000

INTERSECT

SELECT ProductID
FROM Production.Product
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID
FROM Production.Product
WHERE ListPrice > 1000

EXCEPT

SELECT ProductID
FROM Production.Product
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>13. PIVOT and UNPIVOT</h2>
          <p>PIVOT rotates rows into columns for summary reports. UNPIVOT does the reverse.</p>

          <CodeBlock
          language="sql"
            code={`SELECT *
FROM
(
    SELECT Color, ListPrice
    FROM Production.Product
    WHERE Color IS NOT NULL AND ListPrice > 0
) AS SourceTable
PIVOT
(
    AVG(ListPrice)
    FOR Color IN ([Red], [Black], [Blue], [Silver])
) AS PivotTable;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>14. GROUPING SETS</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS ProductCount
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY GROUPING SETS
(
    (Color),
    ()
)
ORDER BY Color;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>15. Practical Example – AdventureWorks2019</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    pc.Name AS CategoryName,
    ps.Name AS SubcategoryName,
    COUNT(p.ProductID) AS ProductCount
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
INNER JOIN Production.ProductCategory AS pc
    ON ps.ProductCategoryID = pc.ProductCategoryID
GROUP BY pc.Name, ps.Name
ORDER BY CategoryName, ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>16. Session 9 Exercise</h2>
          <ol>
            <li>Write a GROUP BY query on product Color with COUNT and AVG(ListPrice).</li>
            <li>Add a HAVING clause to keep only colors with more than 10 products.</li>
            <li>Write an INNER JOIN between Product and ProductSubcategory.</li>
            <li>Write a LEFT JOIN that can show products without a subcategory.</li>
            <li>Demonstrate UNION vs UNION ALL.</li>
          </ol>

          <hr />

          <h2>17. Session 9 Challenge</h2>
          <ol>
            <li>Join Product, ProductSubcategory, and ProductCategory and aggregate by category.</li>
            <li>Write a subquery that finds products priced above the average.</li>
            <li>Create a CTE for expensive products and query it.</li>
            <li>Try a simple PIVOT on product colors.</li>
          </ol>

          <hr />

          <h2>18. Session 9 Quiz</h2>
          <ol>
            <li>What does GROUP BY do?</li>
            <li>When do you use HAVING instead of WHERE?</li>
            <li>What is a subquery?</li>
            <li>What is the difference between INNER JOIN and LEFT JOIN?</li>
            <li>What does UNION remove that UNION ALL keeps?</li>
            <li>What does INTERSECT return?</li>
            <li>What does EXCEPT return?</li>
            <li>What is a CTE?</li>
            <li>What is PIVOT used for?</li>
            <li>Why are joins important when data is normalized across tables?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 10):</strong> Using Views, Stored Procedures, and Querying Metadata</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
