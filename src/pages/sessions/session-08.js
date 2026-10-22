import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session08() {
  return (
    <Layout
      title="Session 08 — Indexes"
      description="Indexes in SQL Server 2022 — Clustered, Nonclustered, covering indexes, and performance"
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

          <h1>Session 08 — Indexes</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding and creating indexes to improve query performance.</p>
          <p><strong>Practical Database:</strong> AdventureWorks2022 / AdventureWorks2019</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Explain what an index is and why it is useful</li>
            <li>Differentiate clustered and nonclustered indexes</li>
            <li>Create, alter, and drop indexes</li>
            <li>Understand covering indexes and included columns</li>
            <li>Inspect existing indexes on AdventureWorks tables</li>
          </ul>

          <hr />

          <h2>1. Why Indexes Matter</h2>
          <p>Without an index, SQL Server may need to scan the entire table (table scan). An index helps the engine find rows faster (index seek / index scan).</p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT *
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. Basic SELECT Patterns</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID AS ID,
    Name AS ProductName,
    ListPrice AS Price
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. Creating a Nonclustered Index</h2>
          <CodeBlock
          language="sql"
            code={`CREATE NONCLUSTERED INDEX IX_Product_ListPrice
ON Production.Product (ListPrice);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Covering Index (INCLUDE)</h2>
          <CodeBlock
          language="sql"
            code={`CREATE NONCLUSTERED INDEX IX_Product_ListPrice_Covering
ON Production.Product (ListPrice)
INCLUDE (Name, ProductNumber);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. Inspecting Indexes</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    i.name AS IndexName,
    i.type_desc AS IndexType,
    COL_NAME(ic.object_id, ic.column_id) AS ColumnName
FROM sys.indexes AS i
INNER JOIN sys.index_columns AS ic
    ON i.object_id = ic.object_id
   AND i.index_id = ic.index_id
WHERE i.object_id = OBJECT_ID('Production.Product')
ORDER BY i.name, ic.key_ordinal;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Dropping an Index</h2>
          <CodeBlock
          language="sql"
            code={`DROP INDEX IX_Product_ListPrice
ON Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. Clustered vs Nonclustered</h2>
          <ul>
            <li><strong>Clustered</strong> — determines the physical order of rows (usually the Primary Key)</li>
            <li><strong>Nonclustered</strong> — separate structure that points back to the data rows</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- Most tables already have a clustered index on the Primary Key
-- Example of creating a nonclustered index on a frequently filtered column
CREATE NONCLUSTERED INDEX IX_SalesOrderHeader_OrderDate
ON Sales.SalesOrderHeader (OrderDate);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. Practical Queries That Benefit from Indexes</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1500
ORDER BY ListPrice;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name,
    p.ListPrice,
    ps.Name AS Subcategory
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice > 1000;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 8 Exercise</h2>
          <ol>
            <li>Create a nonclustered index on a column you frequently filter.</li>
            <li>Create a covering index using INCLUDE.</li>
            <li>Inspect the indexes on Production.Product.</li>
            <li>Drop a practice index you created.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 09):</strong> Joins and Set Operators</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
