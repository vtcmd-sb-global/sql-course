import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session11() {
  return (
    <Layout
      title="Session 11 — Indexes"
      description="Indexes in SQL Server 2022 — Clustered, Nonclustered, Unique, Columnstore Indexes and Index Management"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 11 — Indexes</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding indexes, their types, and how to manage them for better query performance.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 11</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define and explain Indexes</li>
            <li>Explain the storage structure of indexes</li>
            <li>Explain different types of Indexes</li>
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

          <h2>5. Creating Indexes</h2>

          <h3>Creating a Clustered Index</h3>
          <pre>
            <code>{`-- Usually created automatically with PRIMARY KEY
CREATE CLUSTERED INDEX IX_Employees_EmployeeID
ON Employees(EmployeeID);`}</code>
          </pre>

          <h3>Creating a Nonclustered Index</h3>
          <pre>
            <code>{`CREATE NONCLUSTERED INDEX IX_Employees_LastName
ON Employees(LastName);

-- Composite Index (multiple columns)
CREATE NONCLUSTERED INDEX IX_Employees_LastName_FirstName
ON Employees(LastName, FirstName);`}</code>
          </pre>

          <h3>Creating a Unique Index</h3>
          <pre>
            <code>{`CREATE UNIQUE NONCLUSTERED INDEX IX_Employees_Email
ON Employees(Email);`}</code>
          </pre>

          <h3>Creating a Columnstore Index</h3>
          <pre>
            <code>{`-- Clustered Columnstore Index
CREATE CLUSTERED COLUMNSTORE INDEX IX_Sales_Columnstore
ON SalesData;

-- Nonclustered Columnstore Index
CREATE NONCLUSTERED COLUMNSTORE INDEX IX_Employees_Columnstore
ON Employees(EmployeeID, DepartmentID, Salary);`}</code>
          </pre>

          <hr />

          <h2>6. Index Management</h2>

          <h3>Viewing Existing Indexes</h3>
          <pre>
            <code>{`-- Using system view
SELECT 
    i.name AS IndexName,
    t.name AS TableName,
    i.type_desc AS IndexType,
    i.is_unique
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE t.name = 'Employees';`}</code>
          </pre>

          <h3>Dropping an Index</h3>
          <pre>
            <code>{`DROP INDEX IX_Employees_LastName ON Employees;`}</code>
          </pre>

          <h3>Rebuilding an Index</h3>
          <pre>
            <code>{`ALTER INDEX IX_Employees_LastName ON Employees REBUILD;`}</code>
          </pre>

          <h3>Reorganizing an Index</h3>
          <pre>
            <code>{`ALTER INDEX IX_Employees_LastName ON Employees REORGANIZE;`}</code>
          </pre>

          <h3>When to Rebuild vs Reorganize</h3>
          <ul>
            <li><strong>Fragmentation 5% – 30%</strong> → REORGANIZE</li>
            <li><strong>Fragmentation above 30%</strong> → REBUILD</li>
          </ul>

          <hr />

          <h2>7. Best Practices for Indexes</h2>
          <ul>
            <li>Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses</li>
            <li>Avoid over-indexing (too many indexes slow down data modifications)</li>
            <li>Use included columns for covering indexes when needed</li>
            <li>Regularly monitor index fragmentation and maintain indexes</li>
            <li>Prefer narrow indexes (fewer columns) when possible</li>
            <li>Consider Columnstore indexes for analytical / reporting workloads</li>
          </ul>

          <hr />

          <h2>Session 11 Exercise</h2>
          <ol>
            <li>Create a nonclustered index on the LastName column of the Employees table.</li>
            <li>Create a unique nonclustered index on the Email column.</li>
            <li>Create a composite index on (DepartmentID, HireDate).</li>
            <li>Write a query to list all indexes on the Employees table.</li>
            <li>Drop one of the indexes you created.</li>
          </ol>

          <hr />

          <h2>Session 11 Challenge</h2>
          <p>Perform the following tasks:</p>
          <ol>
            <li>Identify which columns in your tables are good candidates for indexes and justify why.</li>
            <li>Create appropriate indexes (clustered / nonclustered / unique).</li>
            <li>Write a query to check index fragmentation (using sys.dm_db_index_physical_stats).</li>
            <li>Rebuild or reorganize indexes based on fragmentation level.</li>
            <li>(Optional) Create a nonclustered columnstore index on a suitable table and compare query performance.</li>
          </ol>

          <hr />

          <h2>Session 11 Quiz</h2>
          <ol>
            <li>What is an Index in SQL Server?</li>
            <li>How many clustered indexes can a table have?</li>
            <li>What is the main difference between a clustered and a nonclustered index?</li>
            <li>What does a Unique Index enforce?</li>
            <li>What type of workload benefits most from Columnstore indexes?</li>
            <li>What is index fragmentation?</li>
            <li>When should you use REBUILD vs REORGANIZE?</li>
            <li>What is a covering index?</li>
            <li>Do indexes improve the performance of INSERT and UPDATE operations? Explain.</li>
            <li>Which system view can be used to get information about indexes?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 12):</strong> Triggers</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
