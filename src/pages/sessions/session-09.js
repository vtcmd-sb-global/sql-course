import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session09() {
  return (
    <Layout
      title="Session 09 — Joins and Set Operators"
      description="INNER, LEFT, RIGHT, FULL, CROSS joins and set operators in SQL Server"
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

          <h1>Session 09 — Joins and Set Operators</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Combining data from multiple tables using joins and set operators.</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Write INNER, LEFT, RIGHT, and FULL OUTER joins</li>
            <li>Use CROSS JOIN</li>
            <li>Apply UNION, UNION ALL, INTERSECT, and EXCEPT</li>
            <li>Join multiple tables in a single query</li>
          </ul>

          <hr />

          <h2>1. INNER JOIN</h2>
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

          <h2>2. LEFT OUTER JOIN</h2>
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

          <h2>3. RIGHT OUTER JOIN</h2>
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

          <h2>4. FULL OUTER JOIN</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
FULL OUTER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. CROSS JOIN</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.Name AS ProductName,
    c.Name AS CategoryName
FROM Production.Product AS p
CROSS JOIN Production.ProductCategory AS c;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Multiple Joins</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName,
    pc.Name AS CategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
INNER JOIN Production.ProductCategory AS pc
    ON ps.ProductCategoryID = pc.ProductCategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. UNION / UNION ALL</h2>
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

          <hr />

          <h2>8. INTERSECT and EXCEPT</h2>
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

          <h2>Session 9 Exercise</h2>
          <ol>
            <li>Write an INNER JOIN between Product and ProductSubcategory.</li>
            <li>Write a LEFT JOIN that shows products without a subcategory.</li>
            <li>Join three tables: Product, ProductSubcategory, ProductCategory.</li>
            <li>Demonstrate UNION vs UNION ALL with two simple queries.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 10):</strong> Views</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
