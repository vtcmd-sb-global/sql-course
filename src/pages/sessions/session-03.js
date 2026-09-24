import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session03() {
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
      title="Session 03 — Introduction to SQL Server 2022"
      description="Introduction to SQL Server 2022, Architecture, New Features, SSMS, AdventureWorks2022, and Executing T-SQL Queries"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 03 — Introduction to SQL Server 2022</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Getting familiar with SQL Server 2022, its tools, and running your first queries.</p>
          <p><strong>Follows Book:</strong> From Book – Session 3</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Describe an overview of SQL Server 2022</li>
            <li>Explain basic architecture and version history of SQL Server 2022</li>
            <li>Identify new features added to SQL Server 2022</li>
            <li>Outline the process of connecting to SQL Server instances</li>
            <li>Define databases and list the key features of collegeDb sample database</li>
            <li>Explain the components of SQL Server Management Studio (SSMS)</li>
            <li>Elaborate on script file creation and organization</li>
            <li>Explain the process to execute Transact-SQL queries</li>
          </ul>

          <hr />

          <h2>1. Introduction to SQL Server 2022</h2>
          <p>SQL Server is a <strong>Relational Database Management System (RDBMS)</strong> developed by Microsoft. It is designed for creating a wide variety of database applications and provides an enterprise-level data management platform.</p>

          <p>SQL Server can be used in many sectors such as:</p>
          <ul>
            <li>Banking</li>
            <li>Telecommunication</li>
            <li>Retail &amp; E-commerce</li>
            <li>Education</li>
            <li>Travel &amp; Hospitality</li>
          </ul>

          <p>Microsoft launched <strong>SQL Server 2022</strong> in November 2022. It provides industry-leading security, performance, and intelligence for both structured and unstructured data.</p>

          <hr />

          <h2>2. Key Features of SQL Server 2022</h2>
          <p>Some important new and enhanced features in SQL Server 2022 include:</p>
          <ul>
            <li>Improved performance and query intelligence</li>
            <li>Enhanced security features</li>
            <li>Better support for hybrid cloud (Azure integration)</li>
            <li>Ledger tables for tamper-evident data</li>
            <li>Improved machine learning and AI capabilities</li>
            <li>PolyBase enhancements for external data sources</li>
            <li>Query Store improvements</li>
            <li>Support for Linux and containers</li>
          </ul>

          <hr />

          <h2>3. SQL Server Architecture (Basic Overview)</h2>
          <p>At a high level, SQL Server consists of the following major components:</p>
          <ul>
            <li><strong>Database Engine</strong> – Core service for storing, processing, and securing data</li>
            <li><strong>SQL Server Agent</strong> – Used for job scheduling and automation</li>
            <li><strong>SQL Server Management Studio (SSMS)</strong> – Graphical tool for managing SQL Server</li>
            <li><strong>SQL Server Analysis Services (SSAS)</strong></li>
            <li><strong>SQL Server Reporting Services (SSRS)</strong></li>
            <li><strong>SQL Server Integration Services (SSIS)</strong></li>
            <li><strong>Machine Learning Services</strong></li>
          </ul>

          <p>For this course, we will mainly work with the <strong>Database Engine</strong> and <strong>SSMS</strong>.</p>

          <hr />

          <h2>4. Connecting to SQL Server Instances</h2>
          <p>An <strong>instance</strong> is a complete SQL Server installation that runs as a service.</p>

          <p>Common ways to connect:</p>
          <ul>
            <li>Windows Authentication (recommended for local development)</li>
            <li>SQL Server Authentication (username + password)</li>
          </ul>

          <h3>Steps to Connect using SSMS</h3>
          <ol>
            <li>Open <strong>SQL Server Management Studio (SSMS)</strong></li>
            <li>In the Connect to Server window:
              <ul>
                <li>Server type: Database Engine</li>
                <li>Server name: <code>.</code> or <code>localhost</code> or your instance name (e.g., <code>.\SQLEXPRESS</code>)</li>
                <li>Authentication: Windows Authentication (or SQL Server Authentication)</li>
              </ul>
            </li>
            <li>Click <strong>Connect</strong></li>
          </ol>

          <hr />

          <h2>5. System Databases vs User Databases</h2>
          <p>When you install SQL Server, several system databases are created automatically:</p>
          <ul>
            <li><strong>master</strong> – Stores system-level information</li>
            <li><strong>model</strong> – Template for new databases</li>
            <li><strong>msdb</strong> – Used by SQL Server Agent</li>
            <li><strong>tempdb</strong> – Temporary database (recreated every time SQL Server starts)</li>
          </ul>

          <p>User databases are the ones you create for your applications (e.g., SchoolDB, InventoryDB, AdventureWorks2022).</p>

          <hr />

          <article style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#333', lineHeight: '1.6' }}>
      <header>
        <h2>6. AdventureWorks2019 Sample Database</h2>
      </header>

      <section>
        <p>
          For this course, we will use the <strong>AdventureWorks2019</strong> sample database.
        </p>

        <p>
          AdventureWorks represents a fictional company called <strong>Adventure Works Cycles</strong>, which manufactures and sells bicycles and related products.
        </p>

        <p>The database contains several schemas and tables representing areas such as:</p>
        <ul>
          <li>Human Resources</li>
          <li>Sales</li>
          <li>Production</li>
          <li>Purchasing</li>
          <li>Person</li>
          <li>Manufacturing</li>
        </ul>

        <p>The main database used in this course is:</p>
        <pre style={codeBlockStyle}>
          <code>AdventureWorks2019</code>
        </pre>

        <p>Before executing SQL queries, select the database:</p>
        <pre style={codeBlockStyle}>
          <code>{`USE AdventureWorks2019;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Check the Current Database</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT DB_NAME() AS CurrentDatabase;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>View All Databases</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT name
FROM sys.databases;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Check SQL Server Version</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT @@VERSION;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Check the AdventureWorks Database</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT name
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>View AdventureWorks Tables</h3>
        <pre style={codeBlockStyle}>
          <code>{`USE AdventureWorks2019;
GO

SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>View Tables by Schema</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Example: View Products</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT *
FROM Production.Product;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Example: View People</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT *
FROM Person.Person;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Example: View Employees</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT *
FROM HumanResources.Employee;
GO`}</code>
        </pre>
      </section>

      <section>
        <h3>Example: View Customers</h3>
        <pre style={codeBlockStyle}>
          <code>{`SELECT *
FROM Sales.Customer;
GO`}</code>
        </pre>
      </section>

      <footer>
        <p>The important point for students is:</p>
        <p style={{ padding: '12px', backgroundColor: '#e6f7ff', borderLeft: '4px solid #1890ff', borderRadius: '2px' }}>
          <strong>
            <code style={inlineCodeStyle}>AdventureWorks2019</code> is our common database for SQL practice throughout this course.
          </strong>
        </p>
      </footer>
    </article>

          <hr />

          <h2>7. SQL Server Management Studio (SSMS)</h2>
          <p>SSMS is the main graphical tool used to manage SQL Server.</p>

          <h3>Important Components of SSMS</h3>
          <ul>
            <li><strong>Object Explorer</strong> – Shows servers, databases, tables, views, etc.</li>
            <li><strong>Query Window</strong> – Where you write and execute T-SQL code</li>
            <li><strong>Results Pane</strong> – Displays query results</li>
            <li><strong>Messages Pane</strong> – Shows success/error messages</li>
            <li><strong>Properties Window</strong></li>
            <li><strong>Registered Servers</strong></li>
            <li><strong>Template Explorer</strong></li>
          </ul>

          <hr />

          <h2>8. Creating and Organizing Script Files</h2>
          <p>It is a good practice to save your SQL code in <strong>.sql</strong> script files.</p>

          <h3>How to create a script file in SSMS</h3>
          <ol>
            <li>Click <strong>New Query</strong></li>
            <li>Write your T-SQL code</li>
            <li>Go to <strong>File → Save As</strong></li>
            <li>Save with <code>.sql</code> extension (example: <code>Session03_Practice.sql</code>)</li>
          </ol>

          <p>Organize your scripts in folders by session or topic for easy management.</p>

          <hr />

          <h2>9. Executing Transact-SQL Queries</h2>
          <p>There are multiple ways to execute queries in SSMS:</p>
          <ul>
            <li>Press <strong>F5</strong></li>
            <li>Click the <strong>Execute</strong> button (green play icon)</li>
            <li>Select specific code and press F5 (to run only selected part)</li>
          </ul>

          <h3>Basic Example</h3>
          <pre>
            <code>{`-- Simple query to check current date and time
select getdate() as currentDateTime;

-- View all databases
select name from sys.databases;`}</code>
          </pre>

          <hr />

          <h2>Session 3 Exercise</h2>
          <ol>
            <li>Connect to your local SQL Server instance using SSMS.</li>
            <li>Expand the System Databases and note their names.</li>
            <li>Create a new query window and run:
              <pre><code>{`select @@VERSION;`}</code></pre>
            </li>
            <li>Save the query as <code>Session03_FirstQuery.sql</code>.</li>
            <li>Explore Object Explorer and locate the collegeDb database (if installed).</li>
          </ol>

          <hr />

          <h2>Session 3 Challenge</h2>
          <p>Perform the following tasks:</p>
          <ol>
            <li>Connect to SQL Server using both Windows Authentication and SQL Server Authentication (if available).</li>
            <li>Write and execute a query that displays:
              <ul>
                <li>Current server name</li>
                <li>Current date and time</li>
                <li>SQL Server version</li>
              </ul>
            </li>
            <li>Save the script properly with comments.</li>
          </ol>

          <hr />

          <h2>Session 3 Quiz</h2>
          <ol>
            <li>What is SQL Server?</li>
            <li>In which year was SQL Server 2022 released?</li>
            <li>Name any four features of SQL Server 2022.</li>
            <li>What is the difference between a system database and a user database?</li>
            <li>List the four main system databases.</li>
            <li>What is collegeDb?</li>
            <li>What is the full form of SSMS?</li>
            <li>Name any three components of SSMS.</li>
            <li>How do you execute a query in SSMS?</li>
            <li>What is the recommended way to organize SQL scripts?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 04):</strong> Transact-SQL</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
