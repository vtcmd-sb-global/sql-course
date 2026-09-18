import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session04() {
  return (
    <Layout
      title="Session 04 — Transact-SQL"
      description="Transact-SQL (T-SQL), Categories of Statements, Data Types, Language Elements, Sets, Predicate Logic and Logical Order of SELECT"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 04 — Transact-SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding Transact-SQL (T-SQL) — the language used to work with SQL Server.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 4</p>

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
                <td>CREATE, ALTER, DROP, TRUNCATE</td>
              </tr>
              <tr>
                <td>DML</td>
                <td>Data Manipulation Language</td>
                <td>Work with data inside tables</td>
                <td>SELECT, INSERT, UPDATE, DELETE, MERGE</td>
              </tr>
              <tr>
                <td>DCL</td>
                <td>Data Control Language</td>
                <td>Control access and permissions</td>
                <td>GRANT, REVOKE, DENY</td>
              </tr>
              <tr>
                <td>TCL</td>
                <td>Transaction Control Language</td>
                <td>Manage transactions</td>
                <td>BEGIN TRAN, COMMIT, ROLLBACK, SAVE TRAN</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>3. Data Types in Transact-SQL</h2>
          <p>SQL Server supports a rich set of data types. Here are the most commonly used ones:</p>

          <h3>Numeric Data Types</h3>
          <ul>
            <li><code>int</code>, <code>bigint</code>, <code>smallint</code>, <code>tinyint</code></li>
            <li><code>decimal(p,s)</code>, <code>numeric(p,s)</code></li>
            <li><code>float</code>, <code>real</code></li>
            <li><code>money</code>, <code>smallmoney</code></li>
          </ul>

          <h3>Character / String Data Types</h3>
          <ul>
            <li><code>char(n)</code>, <code>varchar(n)</code>, <code>varchar(max)</code></li>
            <li><code>nchar(n)</code>, <code>nvarchar(n)</code>, <code>nvarchar(max)</code></li>
            <li><code>text</code>, <code>ntext</code> (legacy – avoid using)</li>
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
            <li><code>bit</code> (true/false → 1/0)</li>
            <li><code>uniqueidentifier</code> (GUID)</li>
            <li><code>xml</code></li>
            <li><code>json</code> (handled as nvarchar in older versions, native support improved in recent versions)</li>
            <li><code>varbinary</code>, <code>image</code> (for binary data)</li>
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
            <li><strong>Control-of-flow</strong> – IF...ELSE, WHILE, BEGIN...END, RETURN, etc.</li>
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
          <p>A <strong>predicate</strong> is a condition that evaluates to TRUE, FALSE, or UNKNOWN (three-valued logic).</p>

          <p>Examples of predicates:</p>
          <ul>
            <li><code>Age &gt; 18</code></li>
            <li><code>City = 'Karachi'</code></li>
            <li><code>Salary BETWEEN 50000 AND 100000</code></li>
            <li><code>Name LIKE 'A%'</code></li>
            <li><code>DepartmentID IS NULL</code></li>
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
          <pre>
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
            <li><strong>SELECT</strong> (including DISTINCT)</li>
            <li><strong>ORDER BY</strong></li>
            <li><strong>OFFSET-FETCH</strong> / TOP</li>
          </ol>

          <p><strong>Why is this important?</strong><br />
          Because you cannot use a column alias defined in SELECT inside the WHERE clause — the WHERE clause is processed before SELECT.</p>

          <hr />

          <h2>Session 4 Exercise</h2>
          <ol>
            <li>Write the full forms of DDL, DML, DCL, and TCL.</li>
            <li>Give two examples of each category of T-SQL statements.</li>
            <li>List any five commonly used data types with examples.</li>
            <li>What is the difference between <code>char</code> and <code>varchar</code>?</li>
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
