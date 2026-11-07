import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session04() {
  return (
    <Layout
      title="Session 04 — Transact-SQL"
      description="Transact-SQL (T-SQL), Categories of Statements, Data Types, Language Elements, Sets, Predicate Logic and Logical Order of SELECT"
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
          <h1>Session 04 — Transact-SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding Transact-SQL (T-SQL) — the language used to work with SQL Server.</p>
          <p><strong>Follows Book:</strong> From Book – Session 4</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain Transact-SQL</li>
            <li>List different categories of Transact-SQL statements</li>
            <li>Explain various data types supported by Transact-SQL</li>
            <li>Explain Transact-SQL language elements</li>
            <li>Explain sets and predicate logic</li>
            <li>Describe logical order of operators in the SELECT statement</li>
            <li>Identify and correctly use T-SQL reserved keywords, special keywords and operators</li>
            <li>Recognize and apply common built-in functions and system stored procedures with correct syntax and examples</li>
          </ul>

          <hr />

          <h2>1. Introduction to SQL and Transact-SQL</h2>
          <p><strong>Structured Query Language (SQL)</strong> is the standard language used to communicate with Relational Database Management Systems (RDBMS).</p>

          <p><strong>Transact-SQL (T-SQL)</strong> is Microsoft’s implementation (dialect) of the SQL standard. It is an enhanced version of SQL that includes:</p>
          <ul>
            <li>Procedural programming features</li>
            <li>Local variables</li>
            <li>Control-of-flow statements (IF, WHILE, etc.)</li>
            <li>Error handling</li>
            <li>Support for transactions</li>
          </ul>

          <p>Almost everything you do in SQL Server is done using T-SQL.</p>

          <h3>Additional Details on Transact-SQL</h3>
          <p>T-SQL is the proprietary extension of SQL developed by Microsoft for use with Microsoft SQL Server and Azure SQL Database. While standard ANSI SQL provides the core language for querying and manipulating relational data, T-SQL adds powerful proprietary features that make it a complete programming language for database development.</p>

          <p>Key enhancements that distinguish T-SQL from pure ANSI SQL include:</p>
          <ul>
            <li><strong>Procedural extensions</strong> — You can write complete programs inside the database using variables, loops, conditional logic, and error handling.</li>
            <li><strong>Local variables</strong> — Declared with the <code>DECLARE</code> statement and prefixed with <code>@</code>.</li>
            <li><strong>Control-of-flow language</strong> — <code>IF...ELSE</code>, <code>WHILE</code>, <code>BEGIN...END</code>, <code>RETURN</code>, <code>GOTO</code>, <code>WAITFOR</code>, <code>TRY...CATCH</code>.</li>
            <li><strong>Error handling</strong> — Structured exception handling with <code>TRY...CATCH</code> blocks and the <code>RAISERROR</code> / <code>THROW</code> statements.</li>
            <li><strong>Transaction control</strong> — Full support for explicit transactions, nested transactions, savepoints and distributed transactions.</li>
            <li><strong>Built-in functions and system procedures</strong> — Hundreds of functions and system stored procedures that extend the language far beyond basic SQL.</li>
            <li><strong>Support for XML, JSON, Spatial, HierarchyID and Graph data</strong> — Modern data types and related functions.</li>
          </ul>

          <p>Because T-SQL is the native language of SQL Server, every tool that interacts with SQL Server (SSMS, Azure Data Studio, sqlcmd, applications using ADO.NET, ODBC, JDBC, etc.) ultimately sends T-SQL statements to the engine.</p>

          <hr />

          <h2>2. Categories of Transact-SQL Statements</h2>
          <p>T-SQL statements are broadly divided into the following categories:</p>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Full Form</th>
                <th>Purpose</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DDL</td>
                <td>Data Definition Language</td>
                <td>Define and manage database structure</td>
                <td>create, alter, drop, truncate</td>
              </tr>
              <tr>
                <td>DML</td>
                <td>Data Manipulation Language</td>
                <td>Work with data inside tables</td>
                <td>select, insert, update, delete, merge</td>
              </tr>
              <tr>
                <td>DCL</td>
                <td>Data Control Language</td>
                <td>Control access and permissions</td>
                <td>grant, revoke, deny</td>
              </tr>
              <tr>
                <td>TCL</td>
                <td>Transaction Control Language</td>
                <td>Manage transactions</td>
                <td>begin tran, commit, rollback, save tran</td>
              </tr>
            </tbody>
          </table>

          <h3>Detailed Explanation of Each Category</h3>

          <h4>DDL — Data Definition Language</h4>
          <p>DDL statements create, modify or remove the structure (schema) of database objects. They do not work with the actual rows of data; they work with the definition of tables, views, indexes, procedures, etc.</p>
          <p><strong>Common DDL statements:</strong></p>
          <ul>
            <li><code>CREATE</code> — Creates a new object (database, table, view, index, procedure, function, trigger, schema, ...)</li>
            <li><code>ALTER</code> — Modifies an existing object (add/drop columns, change data type, rename, ...)</li>
            <li><code>DROP</code> — Permanently removes an object</li>
            <li><code>TRUNCATE TABLE</code> — Removes all rows from a table very quickly and resets identity counters (still considered DDL because it deallocates data pages)</li>
            <li><code>CREATE / ALTER / DROP INDEX</code>, <code>CREATE / ALTER / DROP VIEW</code>, <code>CREATE / ALTER / DROP PROCEDURE</code>, etc.</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- Example: Create a simple table
CREATE TABLE dbo.Employees
(
    EmployeeID   INT IDENTITY(1,1) PRIMARY KEY,
    FirstName    NVARCHAR(50) NOT NULL,
    LastName     NVARCHAR(50) NOT NULL,
    HireDate     DATE,
    Salary       DECIMAL(12,2)
);
GO

-- Example: Add a new column
ALTER TABLE dbo.Employees
ADD Email NVARCHAR(100) NULL;
GO

-- Example: Remove the table completely
DROP TABLE dbo.Employees;
GO`}
          caption="DDL examples — CREATE, ALTER, DROP"/>

          <h4>DML — Data Manipulation Language</h4>
          <p>DML statements work with the actual data stored inside tables and views. These are the statements you use most frequently in day-to-day work.</p>
          <p><strong>Common DML statements:</strong></p>
          <ul>
            <li><code>SELECT</code> — Retrieves data</li>
            <li><code>INSERT</code> — Adds new rows</li>
            <li><code>UPDATE</code> — Modifies existing rows</li>
            <li><code>DELETE</code> — Removes rows</li>
            <li><code>MERGE</code> — Performs insert, update or delete in a single statement based on matching conditions (very powerful for ETL / upsert scenarios)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- INSERT example
INSERT INTO dbo.Employees (FirstName, LastName, HireDate, Salary)
VALUES (N'Ali', N'Khan', '2024-01-15', 75000.00);

-- UPDATE example
UPDATE dbo.Employees
SET Salary = Salary * 1.10
WHERE HireDate < '2023-01-01';

-- DELETE example
DELETE FROM dbo.Employees
WHERE EmployeeID = 5;

-- MERGE example (upsert)
MERGE INTO dbo.Employees AS target
USING (SELECT 10 AS EmployeeID, N'Sara' AS FirstName, N'Ahmed' AS LastName) AS source
ON target.EmployeeID = source.EmployeeID
WHEN MATCHED THEN
    UPDATE SET FirstName = source.FirstName, LastName = source.LastName
WHEN NOT MATCHED THEN
    INSERT (FirstName, LastName) VALUES (source.FirstName, source.LastName);`}
          caption="DML examples — INSERT, UPDATE, DELETE, MERGE"/>

          <h4>DCL — Data Control Language</h4>
          <p>DCL statements control who can access what. They are used by database administrators to grant or revoke permissions.</p>
          <p><strong>Common DCL statements:</strong></p>
          <ul>
            <li><code>GRANT</code> — Gives a permission to a user or role</li>
            <li><code>REVOKE</code> — Removes a previously granted permission</li>
            <li><code>DENY</code> — Explicitly denies a permission (takes precedence over GRANT)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- Give a user the ability to SELECT from a table
GRANT SELECT ON dbo.Employees TO [AppUser];

-- Remove that permission
REVOKE SELECT ON dbo.Employees FROM [AppUser];

-- Explicitly deny INSERT even if the user is in a role that has it
DENY INSERT ON dbo.Employees TO [AppUser];`}
          caption="DCL examples — GRANT, REVOKE, DENY"/>

          <h4>TCL — Transaction Control Language</h4>
          <p>TCL statements manage the transactional behavior of the database so that a group of statements either all succeed or all fail together (ACID properties).</p>
          <p><strong>Common TCL statements:</strong></p>
          <ul>
            <li><code>BEGIN TRANSACTION</code> (or <code>BEGIN TRAN</code>) — Starts an explicit transaction</li>
            <li><code>COMMIT TRANSACTION</code> (or <code>COMMIT</code>) — Makes all changes permanent</li>
            <li><code>ROLLBACK TRANSACTION</code> (or <code>ROLLBACK</code>) — Undoes all changes made inside the transaction</li>
            <li><code>SAVE TRANSACTION</code> (or <code>SAVE TRAN</code>) — Creates a savepoint inside a transaction so you can roll back to that point only</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`BEGIN TRANSACTION;

UPDATE Accounts SET Balance = Balance - 1000 WHERE AccountID = 1;
UPDATE Accounts SET Balance = Balance + 1000 WHERE AccountID = 2;

-- If everything is fine
COMMIT TRANSACTION;

-- If something went wrong
-- ROLLBACK TRANSACTION;`} caption="TCL example — simple money transfer"/>

          <hr />

          <h2>3. Data Types in Transact-SQL</h2>
          <p>SQL Server supports a rich set of data types. Here are the most commonly used ones:</p>

          <h3>Numeric Data Types</h3>
          <ul>
            <li><code>INT</code>, <code>BIGINT</code>, <code>SMALLINT</code>, <code>TINYINT</code></li>
            <li><code>DECIMAL(p,s)</code>, <code>NUMERIC(p,s)</code></li>
            <li><code>FLOAT</code>, <code>REAL</code></li>
            <li><code>MONEY</code>, <code>SMALLMONEY</code></li>
          </ul>

          <h3>Character / String Data Types</h3>
          <ul>
            <li><code>CHAR(N)</code>, <code>VARCHAR(N)</code>, <code>VARCHAR(MAX)</code></li>
            <li><code>NCHAR(N)</code>, <code>NVARCHAR(N)</code>, <code>NVARCHAR(MAX)</code></li>
            <li><code>TEXT</code>, <code>NTEXT</code></li>
          </ul>

          <h3>Date and Time Data Types</h3>
          <ul>
            <li><code>date</code></li>
            <li><code>time</code></li>
            <li><code>datetime</code>, <code>datetime2</code></li>
            <li><code>smalldatetime</code></li>
            <li><code>datetimeoffset</code></li>
          </ul>

          <h3>Other Important Types</h3>
          <ul>
            <li><code>BIT</code> (true/false → 1/0)</li>
            <li><code>UNIQUEIDENTIFIER</code> (GUID)</li>
            <li><code>XML</code></li>
            <li><code>JSON</code> (handled as nvarchar in older versions, native support improved in recent versions)</li>
            <li><code>VARBINARY</code>, <code>IMAGE</code> (for binary data)</li>
          </ul>

          <h3>Complete Reference of All SQL Server Data Types</h3>
          <p>Below is a comprehensive list of all system data types available in modern SQL Server (including Azure SQL). Use the most specific type that fits your data to save storage and improve performance.</p>

          <h4>Exact Numeric Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Range / Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BIT</code></td>
                <td>1 bit</td>
                <td>0, 1 or NULL (Boolean)</td>
                <td><code>IsActive BIT = 1</code></td>
              </tr>
              <tr>
                <td><code>TINYINT</code></td>
                <td>1 byte</td>
                <td>0 to 255</td>
                <td><code>Age TINYINT</code></td>
              </tr>
              <tr>
                <td><code>SMALLINT</code></td>
                <td>2 bytes</td>
                <td>-32,768 to 32,767</td>
                <td><code>Quantity SMALLINT</code></td>
              </tr>
              <tr>
                <td><code>INT</code></td>
                <td>4 bytes</td>
                <td>-2,147,483,648 to 2,147,483,647</td>
                <td><code>ProductID INT</code></td>
              </tr>
              <tr>
                <td><code>BIGINT</code></td>
                <td>8 bytes</td>
                <td>-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807</td>
                <td><code>OrderID BIGINT</code></td>
              </tr>
              <tr>
                <td><code>DECIMAL(p,s)</code> / <code>NUMERIC(p,s)</code></td>
                <td>5–17 bytes</td>
                <td>Fixed precision and scale. p = 1–38, s = 0–p</td>
                <td><code>Salary DECIMAL(12,2)</code></td>
              </tr>
              <tr>
                <td><code>MONEY</code></td>
                <td>8 bytes</td>
                <td>-922,337,203,685,477.5808 to 922,337,203,685,477.5807</td>
                <td><code>Price MONEY</code></td>
              </tr>
              <tr>
                <td><code>SMALLMONEY</code></td>
                <td>4 bytes</td>
                <td>-214,748.3648 to 214,748.3647</td>
                <td><code>Discount SMALLMONEY</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Approximate Numeric Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Range / Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>FLOAT(n)</code></td>
                <td>4 or 8 bytes</td>
                <td>Approximate floating-point. n = 1–53 (default 53)</td>
                <td><code>Measurement FLOAT</code></td>
              </tr>
              <tr>
                <td><code>REAL</code></td>
                <td>4 bytes</td>
                <td>Equivalent to FLOAT(24)</td>
                <td><code>Temperature REAL</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Date and Time Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Range / Accuracy</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>DATE</code></td>
                <td>3 bytes</td>
                <td>0001-01-01 to 9999-12-31</td>
                <td><code>BirthDate DATE</code></td>
              </tr>
              <tr>
                <td><code>TIME(n)</code></td>
                <td>3–5 bytes</td>
                <td>00:00:00.0000000 to 23:59:59.9999999 (n = 0–7)</td>
                <td><code>StartTime TIME(0)</code></td>
              </tr>
              <tr>
                <td><code>DATETIME</code></td>
                <td>8 bytes</td>
                <td>1753-01-01 to 9999-12-31, accuracy ~3.33 ms</td>
                <td><code>CreatedOn DATETIME</code></td>
              </tr>
              <tr>
                <td><code>DATETIME2(n)</code></td>
                <td>6–8 bytes</td>
                <td>0001-01-01 to 9999-12-31, accuracy 100 ns (n = 0–7)</td>
                <td><code>LastLogin DATETIME2(3)</code></td>
              </tr>
              <tr>
                <td><code>SMALLDATETIME</code></td>
                <td>4 bytes</td>
                <td>1900-01-01 to 2079-06-06, accuracy 1 minute</td>
                <td><code>Appointment SMALLDATETIME</code></td>
              </tr>
              <tr>
                <td><code>DATETIMEOFFSET(n)</code></td>
                <td>8–10 bytes</td>
                <td>Same as DATETIME2 + time zone offset</td>
                <td><code>EventTime DATETIMEOFFSET(3)</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Character String Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>CHAR(n)</code></td>
                <td>n bytes</td>
                <td>Fixed-length non-Unicode (1–8000)</td>
                <td><code>Code CHAR(5)</code></td>
              </tr>
              <tr>
                <td><code>VARCHAR(n)</code></td>
                <td>actual + 2 bytes</td>
                <td>Variable-length non-Unicode (1–8000)</td>
                <td><code>Name VARCHAR(100)</code></td>
              </tr>
              <tr>
                <td><code>VARCHAR(MAX)</code></td>
                <td>up to 2 GB</td>
                <td>Large variable-length non-Unicode</td>
                <td><code>Description VARCHAR(MAX)</code></td>
              </tr>
              <tr>
                <td><code>TEXT</code></td>
                <td>up to 2 GB</td>
                <td>Legacy large text (prefer VARCHAR(MAX))</td>
                <td><code>Notes TEXT</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Unicode Character String Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>NCHAR(n)</code></td>
                <td>2 × n bytes</td>
                <td>Fixed-length Unicode (1–4000)</td>
                <td><code>Code NCHAR(10)</code></td>
              </tr>
              <tr>
                <td><code>NVARCHAR(n)</code></td>
                <td>2 × actual + 2</td>
                <td>Variable-length Unicode (1–4000)</td>
                <td><code>Name NVARCHAR(100)</code></td>
              </tr>
              <tr>
                <td><code>NVARCHAR(MAX)</code></td>
                <td>up to 2 GB</td>
                <td>Large variable-length Unicode</td>
                <td><code>Bio NVARCHAR(MAX)</code></td>
              </tr>
              <tr>
                <td><code>NTEXT</code></td>
                <td>up to 2 GB</td>
                <td>Legacy large Unicode text (prefer NVARCHAR(MAX))</td>
                <td><code>Comments NTEXT</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Binary String Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BINARY(n)</code></td>
                <td>n bytes</td>
                <td>Fixed-length binary (1–8000)</td>
                <td><code>Hash BINARY(32)</code></td>
              </tr>
              <tr>
                <td><code>VARBINARY(n)</code></td>
                <td>actual + 2</td>
                <td>Variable-length binary (1–8000)</td>
                <td><code>FileData VARBINARY(500)</code></td>
              </tr>
              <tr>
                <td><code>VARBINARY(MAX)</code></td>
                <td>up to 2 GB</td>
                <td>Large binary data</td>
                <td><code>Document VARBINARY(MAX)</code></td>
              </tr>
              <tr>
                <td><code>IMAGE</code></td>
                <td>up to 2 GB</td>
                <td>Legacy binary large object (prefer VARBINARY(MAX))</td>
                <td><code>Photo IMAGE</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Other Data Types</h4>
          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>UNIQUEIDENTIFIER</code></td>
                <td>16-byte GUID</td>
                <td><code>RowID UNIQUEIDENTIFIER DEFAULT NEWID()</code></td>
              </tr>
              <tr>
                <td><code>XML</code></td>
                <td>Stores XML documents / fragments</td>
                <td><code>Settings XML</code></td>
              </tr>
              <tr>
                <td><code>SQL_VARIANT</code></td>
                <td>Can store values of various data types</td>
                <td><code>FlexibleValue SQL_VARIANT</code></td>
              </tr>
              <tr>
                <td><code>HIERARCHYID</code></td>
                <td>Represents position in a hierarchy</td>
                <td><code>OrgNode HIERARCHYID</code></td>
              </tr>
              <tr>
                <td><code>GEOMETRY</code> / <code>GEOGRAPHY</code></td>
                <td>Spatial data types</td>
                <td><code>Location GEOGRAPHY</code></td>
              </tr>
              <tr>
                <td><code>TABLE</code></td>
                <td>Table-valued type (used for variables and parameters)</td>
                <td><code>DECLARE @T TABLE (ID INT)</code></td>
              </tr>
              <tr>
                <td><code>CURSOR</code></td>
                <td>Reference to a cursor</td>
                <td>Used with DECLARE CURSOR</td>
              </tr>
              <tr>
                <td><code>TIMESTAMP</code> / <code>ROWVERSION</code></td>
                <td>Automatically generated binary number for versioning</td>
                <td><code>Version ROWVERSION</code></td>
              </tr>
            </tbody>
          </table>

          <h4>Usage Examples for Common Data Types</h4>

          <CodeBlock
          language="sql"
            code={`-- Creating a table that demonstrates many data types
CREATE TABLE dbo.DemoDataTypes
(
    ID              INT IDENTITY(1,1) PRIMARY KEY,
    IsActive        BIT NOT NULL DEFAULT 1,
    TinyVal         TINYINT,
    SmallVal        SMALLINT,
    IntVal          INT,
    BigVal          BIGINT,
    Price           DECIMAL(12,2),
    ApproxVal       FLOAT,
    MoneyVal        MONEY,
    BirthDate       DATE,
    StartTime       TIME(0),
    CreatedAt       DATETIME2(3),
    EventTime       DATETIMEOFFSET(3),
    Code            CHAR(5),
    Name            VARCHAR(100),
    Description     VARCHAR(MAX),
    UnicodeName     NVARCHAR(100),
    BinaryHash      VARBINARY(32),
    GuidCol         UNIQUEIDENTIFIER DEFAULT NEWID(),
    XmlData         XML,
    GeoLocation     GEOGRAPHY
);
GO

-- Inserting sample data
INSERT INTO dbo.DemoDataTypes
(
    IsActive, TinyVal, SmallVal, IntVal, BigVal,
    Price, ApproxVal, MoneyVal,
    BirthDate, StartTime, CreatedAt, EventTime,
    Code, Name, Description, UnicodeName,
    BinaryHash, XmlData
)
VALUES
(
    1, 200, 15000, 123456, 9876543210,
    1999.99, 3.14159, 25000.50,
    '1990-05-15', '09:30:00', SYSDATETIME(), SYSDATETIMEOFFSET(),
    'A1234', 'Sample Product', 'This is a long description...',
    N'علی خان',  -- Unicode
    0x1A2B3C4D,  -- binary literal
    '<settings><theme>dark</theme></settings>'
);
GO`} caption="Complete data-type demonstration table and INSERT"/>

          <hr />

          <h2>4. Transact-SQL Language Elements</h2>
          <p>Important language elements you will use frequently:</p>
          <ul>
            <li><strong>Identifiers</strong> – Names of databases, tables, columns, etc.</li>
            <li><strong>Variables</strong> – Declared using <code>DECLARE @variable</code></li>
            <li><strong>Expressions</strong> – Combinations of values, operators, and functions</li>
            <li><strong>Operators</strong> – Arithmetic, Comparison, Logical, etc.</li>
            <li><strong>Comments</strong>
              <ul>
                <li>Single-line: <code>--</code></li>
                <li>Multi-line: <code>/* ... */</code></li>
              </ul>
            </li>
            <li><strong>Batches</strong> – Groups of statements executed together (separated by <code>GO</code>)</li>
            <li><strong>Control-of-flow</strong> – if...else, while, begin...end, return, etc.</li>
          </ul>

          <h3>Expanded Details on Language Elements</h3>

          <h4>Identifiers</h4>
          <p>An identifier is the name you give to a database object (table, column, view, procedure, variable, etc.). Rules:</p>
          <ul>
            <li>Can be up to 128 characters</li>
            <li>Must begin with a letter, underscore (_), at sign (@) or number sign (#)</li>
            <li>Can contain letters, numbers, @, $, # and _</li>
            <li>Regular identifiers cannot be reserved keywords unless delimited</li>
            <li>Delimited identifiers are enclosed in square brackets <code>[ ]</code> or double quotes <code>" "</code> (when QUOTED_IDENTIFIER is ON)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- Regular identifier
CREATE TABLE Employees (EmployeeID INT);

-- Delimited identifier (allows spaces and keywords)
CREATE TABLE [Order Details] ([Order ID] INT, [Select] VARCHAR(50));`} caption="Regular vs delimited identifiers"/>

          <h4>Variables</h4>
          <p>Local variables are declared with <code>DECLARE</code> and always start with <code>@</code>.</p>

          <CodeBlock
          language="sql"
            code={`DECLARE @EmployeeName NVARCHAR(100);
DECLARE @Salary DECIMAL(12,2) = 75000.00;   -- can initialize at declaration
DECLARE @IsActive BIT = 1, @HireDate DATE = GETDATE();

SET @EmployeeName = N'Ayesha Khan';

SELECT @EmployeeName AS Name, @Salary AS Salary, @IsActive AS Active;`} caption="Declaring and using variables"/>

          <h4>Operators</h4>
          <p><strong>Arithmetic operators:</strong> <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> (modulo)</p>
          <p><strong>Comparison operators:</strong> <code>=</code> <code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code> <code>&lt;&gt;</code> <code>!=</code> <code>!&gt;</code> <code>!&lt;</code></p>
          <p><strong>Logical operators:</strong> <code>AND</code> <code>OR</code> <code>NOT</code></p>
          <p><strong>Other important operators:</strong> <code>IN</code> <code>BETWEEN</code> <code>LIKE</code> <code>IS NULL</code> <code>IS NOT NULL</code> <code>EXISTS</code> <code>ANY</code> <code>ALL</code> <code>SOME</code></p>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 100 AND 500          -- BETWEEN
  AND Color IN ('Black', 'Red', 'Blue')      -- IN
  AND Name LIKE N'%Frame%'                   -- LIKE
  AND SellEndDate IS NULL;                   -- IS NULL`} caption="Common operators in a WHERE clause"/>

          <h4>Comments and Batches</h4>
          <CodeBlock
          language="sql"
            code={`-- This is a single-line comment

/*
   This is a multi-line comment.
   It can span several lines.
*/

USE AdventureWorks2019;   -- first batch
GO                        -- batch separator (recognized by SSMS / sqlcmd)

SELECT TOP 10 * FROM Production.Product;  -- second batch
GO`} caption="Comments and GO batches"/>

          <hr />

          <h2>5. Sets and Predicate Logic</h2>
          <p>SQL is based on <strong>set theory</strong> and <strong>predicate logic</strong>.</p>

          <h3>Sets</h3>
          <p>A set is a collection of distinct objects. In SQL:</p>
          <ul>
            <li>A table is a set of rows</li>
            <li>A result of a query is also a set (or multiset)</li>
          </ul>

          <h3>Predicate Logic</h3>
          <p>A <strong>predicate</strong> is a condition that evaluates to true, false, or unknown (three-valued logic).</p>

          <p>Examples of predicates:</p>
          <ul>
            <li><code>Age &gt; 18</code></li>
            <li><code>City = 'Karachi'</code></li>
            <li><code>Salary between 50000 and 100000</code></li>
            <li><code>Name like 'A%'</code></li>
            <li><code>DepartmentID is null</code></li>
          </ul>

          <p>Predicates are used in:</p>
          <ul>
            <li>WHERE clause</li>
            <li>HAVING clause</li>
            <li>JOIN conditions</li>
            <li>CHECK constraints</li>
          </ul>

          <h3>Three-Valued Logic (TRUE / FALSE / UNKNOWN)</h3>
          <p>Because SQL supports NULL, every predicate can evaluate to three possible results:</p>
          <ul>
            <li><strong>TRUE</strong></li>
            <li><strong>FALSE</strong></li>
            <li><strong>UNKNOWN</strong> (when any operand is NULL)</li>
          </ul>
          <p>This is why <code>WHERE Column = NULL</code> never returns rows — you must write <code>WHERE Column IS NULL</code>.</p>

          <hr />

          <h2>6. Logical Order of Operations in SELECT Statement</h2>
          <p>This is one of the most important concepts in SQL. The order in which you <strong>write</strong> a SELECT statement is different from the order in which SQL Server <strong>processes</strong> it.</p>

          <h3>Written Order (Syntax Order)</h3>
          <CodeBlock
          language="sql"
            code={`SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
OFFSET-FETCH`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Logical Processing Order (Execution Order)</h3>
          <ol>
            <li><strong>FROM</strong> (+ JOINs)</li>
            <li><strong>WHERE</strong></li>
            <li><strong>GROUP BY</strong></li>
            <li><strong>HAVING</strong></li>
            <li><strong>SELECT</strong> (including distinct)</li>
            <li><strong>ORDER BY</strong></li>
            <li><strong>OFFSET-FETCH</strong> / TOP</li>
          </ol>

          <p><strong>Why is this important?</strong><br />
          Because you cannot use a column Alias defined in SELECT inside the WHERE clause because the WHERE clause is processed before SELECT.</p>

          <hr />

          <h2>Additional Reference — Reserved Keywords, Operators, Functions & System Procedures</h2>

                    <h3>T-SQL Reserved Keywords (Most Common)</h3>
          <p>
            These words have special meaning to the T-SQL parser. 
            You should avoid using them as identifiers. 
            If you must use them, enclose them in square brackets <code>[ ]</code>.
          </p>

          <h4>A – C</h4>
          <p>
            <code>ADD</code> <code>ALL</code> <code>ALTER</code> <code>AND</code> <code>ANY</code> <code>AS</code> <code>ASC</code> 
            <code>AUTHORIZATION</code> <code>BACKUP</code> <code>BEGIN</code> <code>BETWEEN</code> <code>BREAK</code> 
            <code>BROWSE</code> <code>BULK</code> <code>BY</code> <code>CASCADE</code> <code>CASE</code> <code>CHECK</code> 
            <code>CHECKPOINT</code> <code>CLOSE</code> <code>CLUSTERED</code> <code>COALESCE</code> <code>COLLATE</code> 
            <code>COLUMN</code> <code>COMMIT</code> <code>COMPUTE</code> <code>CONSTRAINT</code> <code>CONTAINS</code> 
            <code>CONTAINSTABLE</code> <code>CONTINUE</code> <code>CONVERT</code> <code>CREATE</code> <code>CROSS</code> 
            <code>CURRENT</code> <code>CURRENT_DATE</code> <code>CURRENT_TIME</code> <code>CURRENT_TIMESTAMP</code> 
            <code>CURRENT_USER</code> <code>CURSOR</code>
          </p>

          <h4>D – F</h4>
          <p>
            <code>DATABASE</code> <code>DBCC</code> <code>DEALLOCATE</code> <code>DECLARE</code> <code>DEFAULT</code> 
            <code>DELETE</code> <code>DENY</code> <code>DESC</code> <code>DISK</code> <code>DISTINCT</code> 
            <code>DISTRIBUTED</code> <code>DOUBLE</code> <code>DROP</code> <code>DUMP</code> <code>ELSE</code> 
            <code>END</code> <code>ERRLVL</code> <code>ESCAPE</code> <code>EXCEPT</code> <code>EXEC</code> 
            <code>EXECUTE</code> <code>EXISTS</code> <code>EXIT</code> <code>EXTERNAL</code> <code>FETCH</code> 
            <code>FILE</code> <code>FILLFACTOR</code> <code>FOR</code> <code>FOREIGN</code> <code>FREETEXT</code> 
            <code>FREETEXTTABLE</code> <code>FROM</code> <code>FULL</code> <code>FUNCTION</code>
          </p>

          <h4>G – L</h4>
          <p>
            <code>GOTO</code> <code>GRANT</code> <code>GROUP</code> <code>HAVING</code> <code>HOLDLOCK</code> 
            <code>IDENTITY</code> <code>IDENTITY_INSERT</code> <code>IDENTITYCOL</code> <code>IF</code> <code>IN</code> 
            <code>INDEX</code> <code>INNER</code> <code>INSERT</code> <code>INTERSECT</code> <code>INTO</code> 
            <code>IS</code> <code>JOIN</code> <code>KEY</code> <code>KILL</code> <code>LEFT</code> <code>LIKE</code> 
            <code>LINENO</code> <code>LOAD</code>
          </p>

          <h4>M – P</h4>
          <p>
            <code>MERGE</code> <code>NATIONAL</code> <code>NOCHECK</code> <code>NONCLUSTERED</code> <code>NOT</code> 
            <code>NULL</code> <code>NULLIF</code> <code>OF</code> <code>OFF</code> <code>OFFSETS</code> <code>ON</code> 
            <code>OPEN</code> <code>OPENDATASOURCE</code> <code>OPENQUERY</code> <code>OPENROWSET</code> 
            <code>OPENXML</code> <code>OPTION</code> <code>OR</code> <code>ORDER</code> <code>OUTER</code> 
            <code>OVER</code> <code>PERCENT</code> <code>PIVOT</code> <code>PLAN</code> <code>PRECISION</code> 
            <code>PRIMARY</code> <code>PRINT</code> <code>PROC</code> <code>PROCEDURE</code> <code>PUBLIC</code>
          </p>

          <h4>R – S</h4>
          <p>
            <code>RAISERROR</code> <code>READ</code> <code>READTEXT</code> <code>RECONFIGURE</code> 
            <code>REFERENCES</code> <code>REPLICATION</code> <code>RESTORE</code> <code>RESTRICT</code> 
            <code>RETURN</code> <code>REVERT</code> <code>REVOKE</code> <code>RIGHT</code> <code>ROLLBACK</code> 
            <code>ROWCOUNT</code> <code>ROWGUIDCOL</code> <code>RULE</code> <code>SAVE</code> <code>SCHEMA</code> 
            <code>SECURITYAUDIT</code> <code>SELECT</code> <code>SEMANTICKEYPHRASETABLE</code> 
            <code>SEMANTICSIMILARITYDETAILSTABLE</code> <code>SEMANTICSIMILARITYTABLE</code> 
            <code>SESSION_USER</code> <code>SET</code> <code>SETUSER</code> <code>SHUTDOWN</code> <code>SOME</code> 
            <code>STATISTICS</code> <code>SYSTEM_USER</code>
          </p>

          <h4>T – W</h4>
          <p>
            <code>TABLE</code> <code>TABLESAMPLE</code> <code>TEXTSIZE</code> <code>THEN</code> <code>TO</code> 
            <code>TOP</code> <code>TRAN</code> <code>TRANSACTION</code> <code>TRIGGER</code> <code>TRUNCATE</code> 
            <code>TSEQUAL</code> <code>UNION</code> <code>UNIQUE</code> <code>UNPIVOT</code> <code>UPDATE</code> 
            <code>UPDATETEXT</code> <code>USE</code> <code>USER</code> <code>VALUES</code> <code>VARYING</code> 
            <code>VIEW</code> <code>WAITFOR</code> <code>WHEN</code> <code>WHERE</code> <code>WHILE</code> 
            <code>WITH</code> <code>WRITETEXT</code>
          </p>

          <p>
            There are also many words reserved for future use 
            (<code>ABSOLUTE</code>, <code>ACTION</code>, <code>ADMIN</code>, <code>AFTER</code>, 
            <code>AGGREGATE</code>, <code>ALIAS</code>, …). 
            Always check the official Microsoft documentation when in doubt.
          </p>
            
          <h3>Special Keywords & Operators Frequently Used in T-SQL</h3>
          <ul>
            <li><code>GO</code> — Batch separator (client tool keyword, not a T-SQL statement)</li>
            <li><code>TOP (n)</code> / <code>TOP (n) PERCENT</code> / <code>TOP (n) WITH TIES</code></li>
            <li><code>DISTINCT</code></li>
            <li><code>AS</code> (alias)</li>
            <li><code>INTO</code> (SELECT INTO)</li>
            <li><code>OUTPUT</code> clause (INSERT / UPDATE / DELETE / MERGE)</li>
            <li><code>APPLY</code> (CROSS APPLY / OUTER APPLY)</li>
            <li><code>PIVOT</code> / <code>UNPIVOT</code></li>
            <li><code>OVER</code> (window functions)</li>
            <li><code>WITH</code> (Common Table Expressions – CTEs)</li>
            <li><code>OPTION</code> (query hints)</li>
            <li><code>TABLESAMPLE</code></li>
            <li><code>FOR XML</code> / <code>FOR JSON</code></li>
          </ul>

          <h3>Built-in Functions (by Category) with Examples</h3>

          <h4>1. Aggregate Functions</h4>
          <p>Operate on a set of values and return a single summary value.</p>
          <ul>
            <li><code>COUNT</code>, <code>COUNT_BIG</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code></li>
            <li><code>STDEV</code>, <code>STDEVP</code>, <code>VAR</code>, <code>VARP</code></li>
            <li><code>STRING_AGG</code> (SQL Server 2017+)</li>
            <li><code>CHECKSUM_AGG</code>, <code>GROUPING</code>, <code>GROUPING_ID</code></li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS ProductCount,
    AVG(ListPrice) AS AvgPrice,
    MIN(ListPrice) AS MinPrice,
    MAX(ListPrice) AS MaxPrice,
    SUM(ListPrice) AS TotalListPrice
FROM Production.Product
WHERE ListPrice > 0
GROUP BY Color
ORDER BY ProductCount DESC;`} caption="Aggregate functions example"/>

          <h4>2. String Functions</h4>
          <ul>
            <li><code>LEN</code>, <code>DATALENGTH</code></li>
            <li><code>LEFT</code>, <code>RIGHT</code>, <code>SUBSTRING</code></li>
            <li><code>CHARINDEX</code>, <code>PATINDEX</code></li>
            <li><code>REPLACE</code>, <code>STUFF</code>, <code>TRANSLATE</code></li>
            <li><code>UPPER</code>, <code>LOWER</code>, <code>LTRIM</code>, <code>RTRIM</code>, <code>TRIM</code></li>
            <li><code>CONCAT</code>, <code>CONCAT_WS</code>, <code>+</code> (concatenation)</li>
            <li><code>FORMAT</code>, <code>STR</code>, <code>REPLICATE</code>, <code>REVERSE</code>, <code>SPACE</code></li>
            <li><code>ASCII</code>, <code>CHAR</code>, <code>UNICODE</code>, <code>NCHAR</code></li>
            <li><code>SOUNDEX</code>, <code>DIFFERENCE</code></li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    Name,
    LEFT(Name, 5) AS FirstFive,
    RIGHT(Name, 3) AS LastThree,
    UPPER(Name) AS UpperName,
    LEN(Name) AS NameLength,
    REPLACE(Name, 'Frame', 'Chassis') AS ReplacedName,
    CONCAT(ProductNumber, ' - ', Name) AS FullLabel
FROM Production.Product
WHERE Name LIKE N'%Frame%';`} caption="String functions example"/>

          <h4>3. Date and Time Functions</h4>
          <ul>
            <li><code>GETDATE</code>, <code>SYSDATETIME</code>, <code>SYSUTCDATETIME</code>, <code>SYSDATETIMEOFFSET</code></li>
            <li><code>CURRENT_TIMESTAMP</code></li>
            <li><code>DATEADD</code>, <code>DATEDIFF</code>, <code>DATEDIFF_BIG</code></li>
            <li><code>DATENAME</code>, <code>DATEPART</code>, <code>DAY</code>, <code>MONTH</code>, <code>YEAR</code></li>
            <li><code>EOMONTH</code>, <code>DATEFROMPARTS</code>, <code>DATETIMEFROMPARTS</code>, <code>TIMEFROMPARTS</code></li>
            <li><code>SWITCHOFFSET</code>, <code>TODATETIMEOFFSET</code></li>
            <li><code>ISDATE</code></li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    GETDATE() AS CurrentDateTime,
    SYSDATETIME() AS HighPrecision,
    DATEADD(DAY, 30, GETDATE()) AS ThirtyDaysLater,
    DATEDIFF(YEAR, '1990-05-15', GETDATE()) AS AgeInYears,
    DATENAME(WEEKDAY, GETDATE()) AS TodayName,
    EOMONTH(GETDATE()) AS EndOfThisMonth;`} caption="Date and time functions example"/>

          <h4>4. Mathematical Functions</h4>
          <ul>
            <li><code>ABS</code>, <code>CEILING</code>, <code>FLOOR</code>, <code>ROUND</code></li>
            <li><code>POWER</code>, <code>SQRT</code>, <code>SQUARE</code>, <code>EXP</code>, <code>LOG</code>, <code>LOG10</code></li>
            <li><code>SIN</code>, <code>COS</code>, <code>TAN</code>, <code>ASIN</code>, <code>ACOS</code>, <code>ATAN</code>, <code>ATN2</code></li>
            <li><code>PI</code>, <code>RADIANS</code>, <code>DEGREES</code></li>
            <li><code>SIGN</code>, <code>RAND</code></li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    ABS(-15.7) AS AbsoluteValue,
    CEILING(15.2) AS CeilingValue,
    FLOOR(15.8) AS FloorValue,
    ROUND(15.6789, 2) AS Rounded,
    POWER(2, 10) AS TwoToTheTenth,
    SQRT(144) AS SquareRoot;`} caption="Mathematical functions example"/>

          <h4>5. Conversion Functions</h4>
          <ul>
            <li><code>CAST</code>, <code>CONVERT</code>, <code>TRY_CAST</code>, <code>TRY_CONVERT</code></li>
            <li><code>PARSE</code>, <code>TRY_PARSE</code></li>
            <li><code>FORMAT</code> (culture-aware)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    CAST(ListPrice AS INT) AS PriceAsInt,
    CONVERT(VARCHAR(20), ListPrice, 1) AS PriceFormatted,
    TRY_CAST('abc' AS INT) AS SafeCast,          -- returns NULL instead of error
    FORMAT(GETDATE(), 'dd-MMM-yyyy') AS FormattedDate
FROM Production.Product
WHERE ProductID = 680;`} caption="Conversion functions example"/>

          <h4>6. Logical Functions</h4>
          <ul>
            <li><code>IIF</code>, <code>CHOOSE</code></li>
            <li><code>COALESCE</code>, <code>NULLIF</code>, <code>ISNULL</code></li>
            <li><code>CASE</code> expression (searched and simple)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    Name,
    ListPrice,
    IIF(ListPrice > 1000, 'Expensive', 'Affordable') AS PriceCategory,
    COALESCE(Color, 'No Color') AS ColorOrDefault,
    CASE
        WHEN ListPrice = 0 THEN 'Free'
        WHEN ListPrice < 100 THEN 'Cheap'
        WHEN ListPrice < 1000 THEN 'Medium'
        ELSE 'Premium'
    END AS PriceBand
FROM Production.Product;`} caption="Logical functions and CASE example"/>

          <h4>7. System & Metadata Functions (Selected)</h4>
          <ul>
            <li><code>DB_NAME()</code>, <code>DB_ID()</code>, <code>OBJECT_NAME()</code>, <code>OBJECT_ID()</code></li>
            <li><code>SCHEMA_NAME()</code>, <code>USER_NAME()</code>, <code>SUSER_SNAME()</code>, <code>SYSTEM_USER</code>, <code>CURRENT_USER</code>, <code>SESSION_USER</code></li>
            <li><code>@@VERSION</code>, <code>@@SERVERNAME</code>, <code>@@SPID</code>, <code>@@ROWCOUNT</code>, <code>@@IDENTITY</code>, <code>SCOPE_IDENTITY()</code>, <code>IDENT_CURRENT()</code></li>
            <li><code>NEWID()</code>, <code>NEWSEQUENTIALID()</code></li>
            <li><code>ISNULL</code>, <code>ISNUMERIC</code>, <code>ISDATE</code></li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT
    DB_NAME() AS CurrentDatabase,
    @@SERVERNAME AS ServerName,
    SYSTEM_USER AS LoginName,
    USER_NAME() AS DatabaseUser,
    @@VERSION AS SqlServerVersion;`} caption="System functions example"/>

          <h3>Common System Stored Procedures</h3>
          <p>System stored procedures are pre-written procedures that live in the <code>master</code> database and are available in every database. They usually start with <code>sp_</code>.</p>

          <table>
            <thead>
              <tr>
                <th>Procedure</th>
                <th>Purpose</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sp_help</code></td>
                <td>Returns information about an object</td>
                <td><code>EXEC sp_help 'Production.Product';</code></td>
              </tr>
              <tr>
                <td><code>sp_helptext</code></td>
                <td>Shows the definition of a procedure / view / function</td>
                <td><code>EXEC sp_helptext 'dbo.uspGetEmployeeManagers';</code></td>
              </tr>
              <tr>
                <td><code>sp_columns</code></td>
                <td>Returns column information for a table</td>
                <td><code>EXEC sp_columns 'Product', 'Production';</code></td>
              </tr>
              <tr>
                <td><code>sp_tables</code></td>
                <td>Lists tables and views</td>
                <td><code>EXEC sp_tables;</code></td>
              </tr>
              <tr>
                <td><code>sp_who</code> / <code>sp_who2</code></td>
                <td>Shows current sessions / processes</td>
                <td><code>EXEC sp_who2;</code></td>
              </tr>
              <tr>
                <td><code>sp_spaceused</code></td>
                <td>Shows disk space used by a table or database</td>
                <td><code>EXEC sp_spaceused 'Production.Product';</code></td>
              </tr>
              <tr>
                <td><code>sp_rename</code></td>
                <td>Renames an object or column</td>
                <td><code>EXEC sp_rename 'dbo.OldName', 'NewName';</code></td>
              </tr>
              <tr>
                <td><code>sp_executesql</code></td>
                <td>Executes a dynamic SQL string with parameters (preferred over EXEC)</td>
                <td>See example below</td>
              </tr>
              <tr>
                <td><code>sp_configure</code></td>
                <td>Displays or changes server configuration settings</td>
                <td><code>EXEC sp_configure;</code></td>
              </tr>
              <tr>
                <td><code>sp_addmessage</code></td>
                <td>Adds a custom error message</td>
                <td>Used with RAISERROR</td>
              </tr>
            </tbody>
          </table>

          <CodeBlock
          language="sql"
            code={`-- Safe dynamic SQL with sp_executesql
DECLARE @sql NVARCHAR(MAX);
DECLARE @color NVARCHAR(20) = N'Black';

SET @sql = N'SELECT ProductID, Name, ListPrice
             FROM Production.Product
             WHERE Color = @pColor;';

EXEC sp_executesql
    @sql,
    N'@pColor NVARCHAR(20)',
    @pColor = @color;`} caption="sp_executesql — preferred way to run dynamic SQL"/>

          <hr />
          <h2>7. Practical — Working with AdventureWorks2019</h2>

          <p>
            Now let's apply the concepts covered in this session using the
            <strong> AdventureWorks2019 </strong>
            sample database used throughout the Aptech SQL Server course.
          </p>

          <p>
            Open <strong>SQL Server Management Studio (SSMS)</strong>, connect
            to your SQL Server instance, and make sure the
            <strong> AdventureWorks2019 </strong> database is available.
          </p>

          <h3>Step 1 — Select the AdventureWorks2019 Database</h3>

          <p>
            Before running our queries, we can explicitly select the
            AdventureWorks2019 database using the <code>USE</code> statement.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The <code>USE</code> statement tells SQL Server which database
            should be the current database for the following statements.
          </p>

          <h3>Step 2 — View Products</h3>

          <p>
            AdventureWorks contains real sample data related to products.
            The <code>Production.Product</code> table contains product
            information.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT *
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Here:
          </p>

          <ul>
            <li><code>Production</code> is the schema.</li>
            <li><code>Product</code> is the table.</li>
            <li><code>*</code> means all columns.</li>
          </ul>

          <h3>Step 3 — Select Specific Columns</h3>

          <p>
            Instead of retrieving every column, we can select only the columns
            we need.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This demonstrates the basic <code>SELECT</code> and
            <code>FROM</code> clauses.
          </p>

          <h3>Step 4 — Using a WHERE Predicate</h3>

          <p>
            A <code>WHERE</code> clause allows us to filter rows. The
            condition inside the <code>WHERE</code> clause is called a
            <strong> predicate</strong>.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Only products whose <code>ListPrice</code> is greater than
            <code>1000</code> are returned.
          </p>

          <h3>Step 5 — Using AND</h3>

          <p>
            We can combine multiple predicates using the
            <code>AND</code> logical operator.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
  AND Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Both conditions must be true for a row to be returned.
          </p>

          <h3>Step 6 — Using OR</h3>

          <p>
            The <code>OR</code> operator returns a row when at least one of
            the conditions is true.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE Color = 'Black'
   OR Color = 'Red';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Step 7 — Using ORDER BY</h3>

          <p>
            We can sort the result using <code>ORDER BY</code>.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>DESC</code> sorts from highest to lowest.
            If <code>DESC</code> is not specified, SQL Server sorts in
            ascending order by default.
          </p>

          <h3>Step 8 — Understanding Logical Processing Order</h3>

          <p>
            Consider the following query:
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Although we <strong>write</strong> the query in this order:
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
FROM
WHERE
ORDER BY`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            SQL Server logically processes the query in this order:
          </p>

          <ol>
            <li><strong>FROM</strong> — identify the source table.</li>
            <li><strong>WHERE</strong> — filter the rows.</li>
            <li><strong>SELECT</strong> — return the requested columns.</li>
            <li><strong>ORDER BY</strong> — sort the final result.</li>
          </ol>

          <h3>Step 9 — Practical Task</h3>

          <p>
            Try the following query yourself before looking at the solution:
          </p>

          <p>
            <strong>Task:</strong> Display the product ID, product name,
            color, and list price for products whose list price is greater
            than 500. Display the most expensive products first.
          </p>

          <p><strong>Solution:</strong></p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 500
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Step 10 — Practical Challenge</h3>

          <p>
            Write a query that displays:
          </p>

          <ul>
            <li><code>ProductID</code></li>
            <li><code>Name</code></li>
            <li><code>Color</code></li>
            <li><code>ListPrice</code></li>
          </ul>

          <p>
            Your query should return only products where:
          </p>

          <ul>
            <li>The list price is greater than <code>1000</code></li>
            <li>The color is <code>Black</code></li>
            <li>The results are sorted by price from highest to lowest</li>
          </ul>

          <p><strong>Try it yourself first.</strong></p>

          <p><strong>Expected solution:</strong></p>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
  AND Color = 'Black'
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />
  
          <hr />

          <h2>Session 4 Exercise</h2>
          <ol>
            <li>Write the full forms of DDL, DML, DCL, and TCL.</li>
            <li>Give two examples of each category of T-SQL statements.</li>
            <li>List any five commonly used data types with examples.</li>
            <li>What is the difference between <code>CHAR</code> and <code>VARCHAR</code>?</li>
            <li>Explain the difference between written order and logical processing order of a SELECT statement.</li>
          </ol>

          <hr />

          <h2>Session 4 Challenge</h2>
          <p>Open SSMS and perform the following:</p>
          <ol>
            <li>Write a simple query using <code>SELECT</code>, <code>FROM</code>, and <code>WHERE</code>.</li>
            <li>Add comments (both single-line and multi-line) in your script.</li>
            <li>Declare a variable and use it in a SELECT statement.</li>
            <li>Save the script as <code>Session04_Practice.sql</code>.</li>
          </ol>

          <hr />

          <h2>Session 4 Quiz</h2>
          <ol>
            <li>What is Transact-SQL?</li>
            <li>What is the difference between SQL and T-SQL?</li>
            <li>Name the four main categories of T-SQL statements.</li>
            <li>Which category does the SELECT statement belong to?</li>
            <li>What is the difference between <code>varchar</code> and <code>nvarchar</code>?</li>
            <li>What does the <code>bit</code> data type store?</li>
            <li>What is a predicate in SQL?</li>
            <li>In which logical order is the WHERE clause processed compared to SELECT?</li>
            <li>Can you use a column alias in the WHERE clause? Why or why not?</li>
            <li>What keyword is used to separate batches in SSMS?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 05):</strong> Creating and Managing Databases</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
