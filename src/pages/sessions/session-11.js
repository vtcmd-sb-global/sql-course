import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session11() {
  return (
    <Layout
      title="Session 11 — Indexes"
      description="Indexes in SQL Server 2022 — Clustered, Nonclustered, Unique, Columnstore Indexes and Index Management"
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
          <h1>Session 11 — Indexes</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding indexes, their types, and how to manage them for better query performance.</p>
          <p><strong>Based on:</strong> Official Book – Session 11</p>
          <p><strong>Practical Database:</strong> AdventureWorks2019</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define and explain Indexes</li>
            <li>Explain the storage structure of indexes</li>
            <li>Explain different types of Indexes</li>
            <li>Create, view, rebuild, reorganize, and drop indexes</li>
            <li>Use indexes effectively in real queries (AdventureWorks examples)</li>
            <li>Elaborate on Index Management</li>
          </ul>

          <hr />

          <h2>1. What is an Index?</h2>
          <p>An <strong>Index</strong> is a special data structure associated with a table or view that helps speed up the retrieval of rows.</p>

          <p>Think of an index in a book — instead of scanning every page, you look at the index to find the exact page number.</p>

          <p>In SQL Server, indexes work in a similar way to help the database engine find data quickly without scanning the entire table.</p>

          <hr />

          <h2>2. Why Do We Need Indexes?</h2>
          <ul>
            <li>Improve SELECT query performance</li>
            <li>Speed up searching, sorting, and joining data</li>
            <li>Enforce uniqueness (Unique Indexes / Primary Keys)</li>
          </ul>

          <p><strong>Trade-off:</strong> Indexes speed up reads but can slow down INSERT, UPDATE, and DELETE operations because the index also needs to be maintained.</p>

          <hr />

          <h2>3. Types of Indexes</h2>

          <table>
            <thead>
              <tr>
                <th>Index Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Clustered Index</strong></td>
                <td>
                  Sorts and stores the data rows of the table based on the clustered index key.
                  A table can have only <strong>one</strong> clustered index.
                  The leaf level of a clustered index contains the actual data rows.
                </td>
              </tr>
              <tr>
                <td><strong>Nonclustered Index</strong></td>
                <td>
                  Contains a sorted list of keys with pointers (row locators) to the actual data rows.
                  A table can have multiple nonclustered indexes.
                  The data rows are stored independently of the nonclustered index.
                </td>
              </tr>
              <tr>
                <td><strong>Unique Index</strong></td>
                <td>
                  Ensures that the index key contains no duplicate values.
                  Can be created as clustered or nonclustered.
                  Primary Key and Unique constraints create unique indexes automatically.
                </td>
              </tr>
              <tr>
                <td><strong>Columnstore Index</strong></td>
                <td>
                  Stores and manages data by using column-based data storage and column-based query processing.
                  Extremely efficient for data warehousing and analytics workloads.
                  Can provide significant compression and performance gains (up to 10x query performance and 7x data compression).
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>4. Clustered vs Nonclustered Index</h2>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Clustered Index</th>
                <th>Nonclustered Index</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number per table</td>
                <td>Only one</td>
                <td>Multiple (up to 999)</td>
              </tr>
              <tr>
                <td>Data storage</td>
                <td>Data rows are stored in the order of the index</td>
                <td>Separate structure with pointers to data</td>
              </tr>
              <tr>
                <td>Leaf level contains</td>
                <td>Actual data rows</td>
                <td>Index rows with key + row locator</td>
              </tr>
              <tr>
                <td>Performance impact</td>
                <td>Affects physical order of data</td>
                <td>Does not affect physical order of data</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>5. How SQL Server Uses Indexes (Seek vs Scan)</h2>
          <p>
            Understanding <strong>how</strong> the engine uses an index is as important as knowing the types.
          </p>
          <ul>
            <li>
              <strong>Index Seek</strong> — SQL Server uses the index tree to jump directly to the matching rows.
              This is usually efficient for selective filters (e.g. one ProductID or a narrow range).
            </li>
            <li>
              <strong>Index Scan / Table Scan</strong> — SQL Server reads a large portion (or all) of the index or table.
              This can be acceptable for small tables or queries that need most of the rows.
            </li>
          </ul>
          <p>
            In SSMS, turn on <strong>Include Actual Execution Plan</strong> (Ctrl+M) before running a query.
            Look for operators named <code>Index Seek</code>, <code>Index Scan</code>, or <code>Clustered Index Seek</code>.
          </p>

          <hr />

          <h2>6. Inspecting Indexes on AdventureWorks2019</h2>
          <p>
            Always inspect what already exists before creating new indexes.
            AdventureWorks already has many indexes created by Microsoft.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

-- List indexes on Production.Product
SELECT
    i.name AS IndexName,
    i.type_desc AS IndexType,
    i.is_unique,
    i.is_primary_key,
    COL_NAME(ic.object_id, ic.column_id) AS ColumnName,
    ic.key_ordinal
FROM sys.indexes AS i
INNER JOIN sys.index_columns AS ic
    ON i.object_id = ic.object_id
   AND i.index_id = ic.index_id
INNER JOIN sys.tables AS t
    ON i.object_id = t.object_id
WHERE t.name = 'Product'
  AND SCHEMA_NAME(t.schema_id) = 'Production'
  AND i.type > 0   -- exclude heaps
ORDER BY i.name, ic.key_ordinal;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            You will typically see a clustered index on <code>ProductID</code> (from the primary key)
            and several nonclustered indexes used by real queries and foreign keys.
          </p>

          <hr />

          <h2>7. Real Query Examples — Using Indexes</h2>

          <h3>7.1 Filter by primary key (clustered index seek)</h3>
          <p>
            Looking up a single product by <code>ProductID</code> uses the clustered index (primary key).
          </p>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT ProductID, Name, ProductNumber, ListPrice
FROM Production.Product
WHERE ProductID = 870;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>7.2 Filter by a nonclustered index column</h3>
          <p>
            <code>ProductNumber</code> has a unique nonclustered index in AdventureWorks.
            Queries that filter on it can seek that index.
          </p>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ProductNumber, ListPrice
FROM Production.Product
WHERE ProductNumber = 'BK-M68B-38';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>7.3 Range query that benefits from an index</h3>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 1000 AND 2000
ORDER BY ListPrice;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>7.4 JOIN that uses indexes on both sides</h3>
          <p>
            Joins are faster when the join columns are indexed (primary key / foreign key indexes).
          </p>
          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice > 1000;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. Creating Indexes</h2>

          <p>
            Prefer practicing on a small disposable table so you never damage AdventureWorks structure.
          </p>

          <h3>Practice table for this session</h3>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

IF OBJECT_ID('dbo.PracticeProducts', 'U') IS NOT NULL
    DROP TABLE dbo.PracticeProducts;
GO

SELECT
    ProductID,
    Name,
    ProductNumber,
    Color,
    ListPrice,
    SellStartDate
INTO dbo.PracticeProducts
FROM Production.Product;
GO

-- Heap at first (no clustered index yet)
SELECT name, type_desc
FROM sys.indexes
WHERE object_id = OBJECT_ID('dbo.PracticeProducts');
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Creating a Clustered Index</h3>
          <CodeBlock
          language="sql"
            code={`-- Usually created automatically with PRIMARY KEY
CREATE CLUSTERED INDEX IX_PracticeProducts_ProductID
ON dbo.PracticeProducts(ProductID);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Creating a Nonclustered Index</h3>
          <CodeBlock
          language="sql"
            code={`CREATE NONCLUSTERED INDEX IX_PracticeProducts_ListPrice
ON dbo.PracticeProducts(ListPrice);
GO

-- Composite Index (multiple columns) — column order matters
CREATE NONCLUSTERED INDEX IX_PracticeProducts_Color_ListPrice
ON dbo.PracticeProducts(Color, ListPrice);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <strong>Composite index tip:</strong> Put the most selective / most commonly filtered column first.
            An index on <code>(Color, ListPrice)</code> helps filters on <code>Color</code> or on
            <code>Color + ListPrice</code>, but is less useful for filters on <code>ListPrice</code> alone.
          </p>

          <h3>Creating a Unique Index</h3>
          <CodeBlock
          language="sql"
            code={`CREATE UNIQUE NONCLUSTERED INDEX IX_PracticeProducts_ProductNumber
ON dbo.PracticeProducts(ProductNumber);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Covering Index with INCLUDE</h3>
          <p>
            A <strong>covering index</strong> contains all columns a query needs, so SQL Server does not
            have to look up the base table (no key lookup). Use <code>INCLUDE</code> for columns that
            appear only in the SELECT list, not in the search condition.
          </p>
          <CodeBlock
          language="sql"
            code={`CREATE NONCLUSTERED INDEX IX_PracticeProducts_Color_Covering
ON dbo.PracticeProducts(Color)
INCLUDE (Name, ListPrice, ProductNumber);
GO

-- This query can be satisfied entirely from the index
SELECT Name, ListPrice, ProductNumber
FROM dbo.PracticeProducts
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Creating a Columnstore Index</h3>
          <CodeBlock
          language="sql"
            code={`-- Clustered Columnstore Index (typically one per table; analytics workload)
-- Example shape only — do not run against production OLTP tables without planning
/*
CREATE CLUSTERED COLUMNSTORE INDEX IX_Sales_Columnstore
ON SalesData;
*/

-- Nonclustered Columnstore Index
/*
CREATE NONCLUSTERED COLUMNSTORE INDEX IX_Employees_Columnstore
ON Employees(EmployeeID, DepartmentID, Salary);
*/`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. Seeing the Index in Action</h2>
          <p>
            After creating indexes on <code>PracticeProducts</code>, run these queries with
            <strong>Actual Execution Plan</strong> enabled and compare operators.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Likely Index Seek on ListPrice index
SELECT ProductID, Name, ListPrice
FROM dbo.PracticeProducts
WHERE ListPrice = 337.22;
GO

-- Likely Index Seek on (Color, ListPrice)
SELECT ProductID, Name, Color, ListPrice
FROM dbo.PracticeProducts
WHERE Color = 'Red' AND ListPrice > 1000;
GO

-- Covering index can serve this without looking up the clustered index
SELECT Name, ListPrice, ProductNumber
FROM dbo.PracticeProducts
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>10. Index Management</h2>

          <h3>Viewing Existing Indexes</h3>
          <CodeBlock
          language="sql"
            code={`-- Using system view
SELECT
    i.name AS IndexName,
    t.name AS TableName,
    i.type_desc AS IndexType,
    i.is_unique
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE t.name = 'PracticeProducts';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Checking Index Usage</h3>
          <CodeBlock
          language="sql"
            code={`SELECT
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates
FROM sys.dm_db_index_usage_stats AS s
INNER JOIN sys.indexes AS i
    ON s.object_id = i.object_id
   AND s.index_id = i.index_id
WHERE s.database_id = DB_ID('AdventureWorks2019')
  AND OBJECT_NAME(s.object_id) = 'PracticeProducts';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Checking Fragmentation</h3>
          <CodeBlock
          language="sql"
            code={`SELECT
    OBJECT_NAME(ips.object_id) AS TableName,
    i.name AS IndexName,
    ips.index_type_desc,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(
    DB_ID('AdventureWorks2019'),
    OBJECT_ID('dbo.PracticeProducts'),
    NULL, NULL, 'LIMITED'
) AS ips
INNER JOIN sys.indexes AS i
    ON ips.object_id = i.object_id
   AND ips.index_id = i.index_id
WHERE i.name IS NOT NULL;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Dropping an Index</h3>
          <CodeBlock
          language="sql"
            code={`DROP INDEX IX_PracticeProducts_ListPrice ON dbo.PracticeProducts;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Rebuilding an Index</h3>
          <CodeBlock
          language="sql"
            code={`ALTER INDEX IX_PracticeProducts_Color_ListPrice
ON dbo.PracticeProducts REBUILD;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Reorganizing an Index</h3>
          <CodeBlock
          language="sql"
            code={`ALTER INDEX IX_PracticeProducts_Color_ListPrice
ON dbo.PracticeProducts REORGANIZE;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>When to Rebuild vs Reorganize</h3>
          <ul>
            <li><strong>Fragmentation 5% – 30%</strong> → REORGANIZE</li>
            <li><strong>Fragmentation above 30%</strong> → REBUILD</li>
          </ul>

          <h3>Clean up practice objects</h3>
          <CodeBlock
          language="sql"
            code={`IF OBJECT_ID('dbo.PracticeProducts', 'U') IS NOT NULL
    DROP TABLE dbo.PracticeProducts;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>11. Best Practices for Indexes</h2>
          <ul>
            <li>Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses</li>
            <li>Avoid over-indexing (too many indexes slow down data modifications)</li>
            <li>Use INCLUDE columns for covering indexes when needed</li>
            <li>Watch composite key order: leading column should match common filters</li>
            <li>Regularly monitor index fragmentation and maintain indexes</li>
            <li>Prefer narrow indexes (fewer columns) when possible</li>
            <li>Consider Columnstore indexes for analytical / reporting workloads</li>
            <li>Do not index every column — unused indexes still cost writes and storage</li>
            <li>Inspect AdventureWorks (or your app) indexes before inventing new ones</li>
          </ul>

          <hr />

          <h2>Session 11 Exercise</h2>
          <ol>
            <li>Create the <code>dbo.PracticeProducts</code> table as shown above.</li>
            <li>Create a clustered index on <code>ProductID</code>.</li>
            <li>Create a nonclustered index on <code>ListPrice</code> and a composite index on <code>(Color, ListPrice)</code>.</li>
            <li>Create a covering index on <code>Color</code> that INCLUDE <code>Name, ListPrice, ProductNumber</code>.</li>
            <li>Run the sample filter queries with Actual Execution Plan and note Seek vs Scan.</li>
            <li>List all indexes on <code>PracticeProducts</code>, then drop one of them.</li>
            <li>Drop the practice table when finished.</li>
          </ol>

          <hr />

          <h2>Session 11 Challenge</h2>
          <p>Perform the following tasks:</p>
          <ol>
            <li>Identify which columns in your tables are good candidates for indexes and justify why.</li>
            <li>Create appropriate indexes (clustered / nonclustered / unique / covering).</li>
            <li>Write a query to check index fragmentation (using <code>sys.dm_db_index_physical_stats</code>).</li>
            <li>Rebuild or reorganize indexes based on fragmentation level.</li>
            <li>Compare a query on AdventureWorks <code>Production.Product</code> with and without filtering on an indexed column (use the execution plan).</li>
            <li>(Optional) Create a nonclustered columnstore index on a suitable table and compare query performance.</li>
          </ol>

          <hr />

          <h2>Session 11 Quiz</h2>
          <ol>
            <li>What is an Index in SQL Server?</li>
            <li>How many clustered indexes can a table have?</li>
            <li>What is the main difference between a clustered and a nonclustered index?</li>
            <li>What does a Unique Index enforce?</li>
            <li>What is the difference between an Index Seek and an Index Scan?</li>
            <li>What is a covering index, and what does INCLUDE do?</li>
            <li>Why does column order matter in a composite index?</li>
            <li>What type of workload benefits most from Columnstore indexes?</li>
            <li>What is index fragmentation?</li>
            <li>When should you use REBUILD vs REORGANIZE?</li>
            <li>Do indexes improve the performance of INSERT and UPDATE operations? Explain.</li>
            <li>Which system views help you list indexes and check their usage?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 12):</strong> Triggers</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
















// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';
// import CodeBlock from '@site/src/components/CodeBlock';

// export default function Session11() {
//   return (
//     <Layout
//       title="Session 11 — Indexes"
//       description="Indexes in SQL Server 2022 — Clustered, Nonclustered, Unique, Columnstore Indexes and Index Management"
//     >
//       <CustomLayout>
//         <article className="session-content">
//         <style>{`
//             article code:not(pre code) {
//               background-color: #f4f4f4;
//               color: #d10057;
//               padding: 2px 6px;
//               border-radius: 4px;
//               font-family: Consolas, Monaco, monospace;
//               font-size: 0.9em;
//             }
//           `}</style>
//           <h1>Session 11 — Indexes</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p><strong>Focus:</strong> Understanding indexes, their types, and how to manage them for better query performance.</p>
//           <p><strong>Based on:</strong> Official Book – Session 11</p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>Define and explain Indexes</li>
//             <li>Explain the storage structure of indexes</li>
//             <li>Explain different types of Indexes</li>
//             <li>Elaborate on Index Management</li>
//           </ul>

//           <hr />

//           <h2>1. What is an Index?</h2>
//           <p>An <strong>Index</strong> is a special data structure associated with a table or view that helps speed up the retrieval of rows.</p>

//           <p>Think of an index in a book — instead of scanning every page, you look at the index to find the exact page number.</p>

//           <p>In SQL Server, indexes work in a similar way to help the database engine find data quickly without scanning the entire table.</p>

//           <hr />

//           <h2>2. Why Do We Need Indexes?</h2>
//           <ul>
//             <li>Improve SELECT query performance</li>
//             <li>Speed up searching, sorting, and joining data</li>
//             <li>Enforce uniqueness (Unique Indexes / Primary Keys)</li>
//           </ul>

//           <p><strong>Trade-off:</strong> Indexes speed up reads but can slow down INSERT, UPDATE, and DELETE operations because the index also needs to be maintained.</p>

//           <hr />

//           <h2>3. Types of Indexes</h2>

//           <table>
//             <thead>
//               <tr>
//                 <th>Index Type</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td><strong>Clustered Index</strong></td>
//                 <td>
//                   Sorts and stores the data rows of the table based on the clustered index key. 
//                   A table can have only <strong>one</strong> clustered index. 
//                   The leaf level of a clustered index contains the actual data rows.
//                 </td>
//               </tr>
//               <tr>
//                 <td><strong>Nonclustered Index</strong></td>
//                 <td>
//                   Contains a sorted list of keys with pointers (row locators) to the actual data rows. 
//                   A table can have multiple nonclustered indexes. 
//                   The data rows are stored independently of the nonclustered index.
//                 </td>
//               </tr>
//               <tr>
//                 <td><strong>Unique Index</strong></td>
//                 <td>
//                   Ensures that the index key contains no duplicate values. 
//                   Can be created as clustered or nonclustered. 
//                   Primary Key and Unique constraints create unique indexes automatically.
//                 </td>
//               </tr>
//               <tr>
//                 <td><strong>Columnstore Index</strong></td>
//                 <td>
//                   Stores and manages data by using column-based data storage and column-based query processing. 
//                   Extremely efficient for data warehousing and analytics workloads. 
//                   Can provide significant compression and performance gains (up to 10x query performance and 7x data compression).
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>4. Clustered vs Nonclustered Index</h2>

//           <table>
//             <thead>
//               <tr>
//                 <th>Feature</th>
//                 <th>Clustered Index</th>
//                 <th>Nonclustered Index</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Number per table</td>
//                 <td>Only one</td>
//                 <td>Multiple (up to 999)</td>
//               </tr>
//               <tr>
//                 <td>Data storage</td>
//                 <td>Data rows are stored in the order of the index</td>
//                 <td>Separate structure with pointers to data</td>
//               </tr>
//               <tr>
//                 <td>Leaf level contains</td>
//                 <td>Actual data rows</td>
//                 <td>Index rows with key + row locator</td>
//               </tr>
//               <tr>
//                 <td>Performance impact</td>
//                 <td>Affects physical order of data</td>
//                 <td>Does not affect physical order of data</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>5. Creating Indexes</h2>

//           <h3>Creating a Clustered Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`-- Usually created automatically with PRIMARY KEY
// CREATE CLUSTERED INDEX IX_Employees_EmployeeID
// ON Employees(EmployeeID);`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Creating a Nonclustered Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`CREATE NONCLUSTERED INDEX IX_Employees_LastName
// ON Employees(LastName);

// -- Composite Index (multiple columns)
// CREATE NONCLUSTERED INDEX IX_Employees_LastName_FirstName
// ON Employees(LastName, FirstName);`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Creating a Unique Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`CREATE UNIQUE NONCLUSTERED INDEX IX_Employees_Email
// ON Employees(Email);`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Creating a Columnstore Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`-- Clustered Columnstore Index
// CREATE CLUSTERED COLUMNSTORE INDEX IX_Sales_Columnstore
// ON SalesData;

// -- Nonclustered Columnstore Index
// CREATE NONCLUSTERED COLUMNSTORE INDEX IX_Employees_Columnstore
// ON Employees(EmployeeID, DepartmentID, Salary);`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>6. Index Management</h2>

//           <h3>Viewing Existing Indexes</h3>
//           <CodeBlock
//           language="sql"
//             code={`-- Using system view
// SELECT 
//     i.name AS IndexName,
//     t.name AS TableName,
//     i.type_desc AS IndexType,
//     i.is_unique
// FROM sys.indexes i
// INNER JOIN sys.tables t ON i.object_id = t.object_id
// WHERE t.name = 'Employees';`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Dropping an Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`DROP INDEX IX_Employees_LastName ON Employees;`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Rebuilding an Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`ALTER INDEX IX_Employees_LastName ON Employees REBUILD;`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>Reorganizing an Index</h3>
//           <CodeBlock
//           language="sql"
//             code={`ALTER INDEX IX_Employees_LastName ON Employees REORGANIZE;`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>When to Rebuild vs Reorganize</h3>
//           <ul>
//             <li><strong>Fragmentation 5% – 30%</strong> → REORGANIZE</li>
//             <li><strong>Fragmentation above 30%</strong> → REBUILD</li>
//           </ul>

//           <hr />

//           <h2>7. Best Practices for Indexes</h2>
//           <ul>
//             <li>Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses</li>
//             <li>Avoid over-indexing (too many indexes slow down data modifications)</li>
//             <li>Use included columns for covering indexes when needed</li>
//             <li>Regularly monitor index fragmentation and maintain indexes</li>
//             <li>Prefer narrow indexes (fewer columns) when possible</li>
//             <li>Consider Columnstore indexes for analytical / reporting workloads</li>
//           </ul>

//           <hr />

//           <h2>Session 11 Exercise</h2>
//           <ol>
//             <li>Create a nonclustered index on the LastName column of the Employees table.</li>
//             <li>Create a unique nonclustered index on the Email column.</li>
//             <li>Create a composite index on (DepartmentID, HireDate).</li>
//             <li>Write a query to list all indexes on the Employees table.</li>
//             <li>Drop one of the indexes you created.</li>
//           </ol>

//           <hr />

//           <h2>Session 11 Challenge</h2>
//           <p>Perform the following tasks:</p>
//           <ol>
//             <li>Identify which columns in your tables are good candidates for indexes and justify why.</li>
//             <li>Create appropriate indexes (clustered / nonclustered / unique).</li>
//             <li>Write a query to check index fragmentation (using sys.dm_db_index_physical_stats).</li>
//             <li>Rebuild or reorganize indexes based on fragmentation level.</li>
//             <li>(Optional) Create a nonclustered columnstore index on a suitable table and compare query performance.</li>
//           </ol>

//           <hr />

//           <h2>Session 11 Quiz</h2>
//           <ol>
//             <li>What is an Index in SQL Server?</li>
//             <li>How many clustered indexes can a table have?</li>
//             <li>What is the main difference between a clustered and a nonclustered index?</li>
//             <li>What does a Unique Index enforce?</li>
//             <li>What type of workload benefits most from Columnstore indexes?</li>
//             <li>What is index fragmentation?</li>
//             <li>When should you use REBUILD vs REORGANIZE?</li>
//             <li>What is a covering index?</li>
//             <li>Do indexes improve the performance of INSERT and UPDATE operations? Explain.</li>
//             <li>Which system view can be used to get information about indexes?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 12):</strong> Triggers</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
