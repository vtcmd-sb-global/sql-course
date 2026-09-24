import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session04() {
  const codeBlockStyle = {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '12px 16px',
    borderRadius: '6px',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
    lineHeight: '1.5',
    margin: '12px 0 24px 0'
  };

  const inlineCodeStyle = {
    backgroundColor: '#f4f4f4',
    color: '#d10057',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '0.9em'
  };
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

          <hr />

          <h2>6. Logical Order of Operations in SELECT Statement</h2>
          <p>This is one of the most important concepts in SQL. The order in which you <strong>write</strong> a SELECT statement is different from the order in which SQL Server <strong>processes</strong> it.</p>

          <h3>Written Order (Syntax Order)</h3>
          <pre style={codeBlockStyle}>
            <code>{`SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
OFFSET-FETCH`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT *
FROM Production.Product;
GO`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
GO`}</code>
          </pre>

          <p>
            Only products whose <code>ListPrice</code> is greater than
            <code>1000</code> are returned.
          </p>

          <h3>Step 5 — Using AND</h3>

          <p>
            We can combine multiple predicates using the
            <code>AND</code> logical operator.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
  AND Color = 'Black';
GO`}</code>
          </pre>

          <p>
            Both conditions must be true for a row to be returned.
          </p>

          <h3>Step 6 — Using OR</h3>

          <p>
            The <code>OR</code> operator returns a row when at least one of
            the conditions is true.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE Color = 'Black'
   OR Color = 'Red';
GO`}</code>
          </pre>

          <h3>Step 7 — Using ORDER BY</h3>

          <p>
            We can sort the result using <code>ORDER BY</code>.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

          <p>
            <code>DESC</code> sorts from highest to lowest.
            If <code>DESC</code> is not specified, SQL Server sorts in
            ascending order by default.
          </p>

          <h3>Step 8 — Understanding Logical Processing Order</h3>

          <p>
            Consider the following query:
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

          <p>
            Although we <strong>write</strong> the query in this order:
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
FROM
WHERE
ORDER BY`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 500
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

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

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
  AND Color = 'Black'
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

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
