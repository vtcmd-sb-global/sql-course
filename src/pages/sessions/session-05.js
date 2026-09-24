import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session05() {
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
      title="Session 05 — Creating and Managing Databases"
      description="Creating and Managing Databases in SQL Server 2022 — System Databases, User Databases, Filegroups, Transaction Logs, Snapshots"
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

          <h1>Session 05 — Creating and Managing Databases</h1>

          <p><strong>Duration:</strong> 2 hours</p>

          <p>
            <strong>Focus:</strong> Learning how to create, modify, and manage
            databases in SQL Server 2022.
          </p>

          <p>
            <strong>Based on:</strong> Official Aptech Book – Session 5
          </p>

          <p>
            <strong>Practical Database:</strong> AdventureWorks2019
          </p>

          <hr />

          <h2>Learning Objectives</h2>

          <p>By the end of this session, you should be able to:</p>

          <ul>
            <li>Explain modification of system data</li>
            <li>Describe adding of filegroups and transaction logs</li>
            <li>Outline the process to create a database</li>
            <li>Describe how to modify a database</li>
            <li>Describe how to drop a database</li>
            <li>Explain database snapshots</li>
            <li>Inspect the properties of the AdventureWorks2019 database</li>
            <li>Work with database files and filegroups</li>
          </ul>

          <hr />

          <h2>1. System Databases vs User Databases</h2>

          <p>
            SQL Server contains different types of databases. The most important
            distinction for beginners is between <strong>system databases</strong>
            and <strong>user databases</strong>.
          </p>

          <h3>System Databases</h3>

          <p>
            System databases are created automatically when SQL Server is
            installed. They are required for SQL Server to operate correctly.
          </p>

          <ul>
            <li>
              <strong>master</strong> – Stores system-level information such as
              server configuration, logins, and information about databases.
            </li>

            <li>
              <strong>model</strong> – Acts as a template when new databases
              are created.
            </li>

            <li>
              <strong>msdb</strong> – Stores information used by SQL Server
              Agent, jobs, alerts, backup history, and other tasks.
            </li>

            <li>
              <strong>tempdb</strong> – Temporary workspace used by SQL Server.
              It is recreated whenever SQL Server starts.
            </li>

            <li>
              <strong>Resource</strong> – A hidden, read-only database
              containing system objects.
            </li>
          </ul>

          <h3>User Databases</h3>

          <p>
            User databases are databases created for applications, businesses,
            learning, testing, or other purposes.
          </p>

          <p>
            In this course, we will use the
            <strong> AdventureWorks2019 </strong>
            sample database as our main practical database.
          </p>

          <p>
            AdventureWorks2019 is a sample business database containing
            realistic tables for areas such as products, customers, employees,
            sales, purchasing, and addresses.
          </p>

          <hr />

          <h2>2. Modifying System Data</h2>

          <p>
            SQL Server contains many internal system objects. Students should
            not directly modify system tables or internal system information.
          </p>

          <p>
            Examples of system objects include:
          </p>

          <ul>
            <li>System tables</li>
            <li>System stored procedures</li>
            <li>Catalog views</li>
            <li>System metadata</li>
          </ul>

          <p>
            SQL Server provides supported methods for administration instead.
          </p>

          <ul>
            <li>
              <strong>SQL Server Management Studio (SSMS)</strong> – Graphical
              administration tool.
            </li>

            <li>
              <strong>SQL Server Management Objects (SMO)</strong> –
              Programming API for SQL Server administration.
            </li>

            <li>
              <strong>T-SQL</strong> – Used for many database administration
              tasks.
            </li>
          </ul>

          <p>
            <strong>Best Practice:</strong> Never directly modify internal
            system tables. Always use supported SQL Server tools and commands.
          </p>

          <hr />

          <h2>3. Creating a Database</h2>

          <p>
            A database can be created using either SSMS or T-SQL.
          </p>

          <p>
            AdventureWorks2019 is already supplied as the sample database for
            this course, so we will not create another copy of AdventureWorks.
            Instead, we will use a small disposable database named
            <code>SQLDemoDB</code> when demonstrating database creation.
          </p>

          <h3>Method 1: Using T-SQL</h3>

          <pre style={codeBlockStyle}>
            <code>{`CREATE DATABASE SQLDemoDB;
GO`}</code>
          </pre>

          <p>
            After executing the command, refresh the
            <strong> Databases </strong>
            folder in SSMS.
          </p>

          <p>
            You should see <code>SQLDemoDB</code> listed as a user database.
          </p>

          <h3>Creating a Database with File Options</h3>

          <p>
            SQL Server also allows us to specify the size, growth, maximum size,
            and physical location of database files.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`CREATE DATABASE SQLDemoDB
ON
(
    NAME = SQLDemoDB_Data,
    FILENAME = 'C:\\SQLData\\SQLDemoDB.mdf',
    SIZE = 10MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 10MB
)
LOG ON
(
    NAME = SQLDemoDB_Log,
    FILENAME = 'C:\\SQLData\\SQLDemoDB_Log.ldf',
    SIZE = 5MB,
    MAXSIZE = 50MB,
    FILEGROWTH = 5MB
);
GO`}</code>
          </pre>

          <p>
            <strong>Important:</strong> The folder used in the
            <code>FILENAME</code> option must already exist and SQL Server must
            have permission to access it.
          </p>

          <p>
            For beginner students, the simple
            <code>CREATE DATABASE</code> command is recommended during the
            first demonstration.
          </p>

          <h3>Method 2: Using SSMS</h3>

          <ol>
            <li>Right-click <strong>Databases</strong>.</li>
            <li>Select <strong>New Database</strong>.</li>
            <li>Enter <code>SQLDemoDB</code> as the database name.</li>
            <li>Review the database file settings.</li>
            <li>Click <strong>OK</strong>.</li>
          </ol>

          <hr />

          <h2>4. Filegroups and Transaction Logs</h2>

          <h3>Primary Data File (.mdf)</h3>

          <p>
            The primary data file normally has the
            <code>.mdf</code> extension. It contains database information and
            is associated with the PRIMARY filegroup.
          </p>

          <h3>Secondary Data Files (.ndf)</h3>

          <p>
            Secondary data files normally use the
            <code>.ndf</code> extension. A database can have additional data
            files when required.
          </p>

          <h3>Transaction Log File (.ldf)</h3>

          <p>
            The transaction log records changes made to the database. It is
            important for transaction recovery and rollback operations.
          </p>

          <h3>Filegroups</h3>

          <p>
            A filegroup is a logical container used to organize data files.
          </p>

          <ul>
            <li>
              <strong>PRIMARY</strong> – Default filegroup containing the
              primary data file.
            </li>

            <li>
              <strong>User-defined filegroups</strong> – Additional filegroups
              created for organizing database data.
            </li>
          </ul>

          <h3>Adding a Filegroup</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE SQLDemoDB;
GO

ALTER DATABASE SQLDemoDB
ADD FILEGROUP FG_Sales;
GO`}</code>
          </pre>

          <h3>Adding a Data File to a Filegroup</h3>

          <pre style={codeBlockStyle}>
            <code>{`ALTER DATABASE SQLDemoDB
ADD FILE
(
    NAME = SQLDemoDB_Sales,
    FILENAME = 'C:\\SQLData\\SQLDemoDB_Sales.ndf',
    SIZE = 10MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 10MB
)
TO FILEGROUP FG_Sales;
GO`}</code>
          </pre>

          <p>
            The physical path must be changed if the SQL Server installation
            uses a different data directory.
          </p>

          <hr />

          <h2>5. Modifying a Database</h2>

          <p>
            The <code>ALTER DATABASE</code> statement is used to modify
            database-level settings.
          </p>

          <h3>View AdventureWorks2019 Properties</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name,
    database_id,
    compatibility_level,
    recovery_model_desc,
    state_desc
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <h3>View AdventureWorks2019 Database Files</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT
    name AS LogicalFileName,
    type_desc AS FileType,
    physical_name AS PhysicalFileName,
    size AS SizeInPages,
    growth
FROM sys.database_files;
GO`}</code>
          </pre>

          <h3>View AdventureWorks2019 Filegroups</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT
    name AS FilegroupName,
    type_desc,
    is_default
FROM sys.filegroups;
GO`}</code>
          </pre>

          <h3>View Recovery Model</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name AS DatabaseName,
    recovery_model_desc AS RecoveryModel
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <h3>Changing the Recovery Model</h3>

          <p>
            The recovery model determines how SQL Server manages transaction
            log records and affects backup and recovery options.
          </p>

          <p>
            For a classroom demonstration, use the disposable
            <code>SQLDemoDB</code> database instead of changing
            AdventureWorks2019.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`ALTER DATABASE SQLDemoDB
SET RECOVERY FULL;
GO`}</code>
          </pre>

          <h3>Changing Database Compatibility Level</h3>

          <p>
            SQL Server 2022 uses compatibility level <code>160</code> for
            databases configured for SQL Server 2022 behavior.
          </p>

          <p>
            First inspect the current compatibility level:
          </p>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name,
    compatibility_level
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <p>
            <strong>Instructor demonstration only:</strong>
          </p>

          <pre style={codeBlockStyle}>
            <code>{`ALTER DATABASE AdventureWorks2019
SET COMPATIBILITY_LEVEL = 160;
GO`}</code>
          </pre>

          <p>
            Do not change the compatibility level on the classroom database
            unless the instructor specifically wants to demonstrate this
            administrative operation.
          </p>

          <hr />

          <h2>6. Dropping a Database</h2>

          <p>
            The <code>DROP DATABASE</code> statement permanently removes a
            database and its associated files.
          </p>

          <p>
            <strong>
              Never use DROP DATABASE on AdventureWorks2019 during the student
              practical.
            </strong>
          </p>

          <h3>Safe Demonstration</h3>

          <p>
            Use the disposable <code>SQLDemoDB</code> database for this
            demonstration.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`DROP DATABASE SQLDemoDB;
GO`}</code>
          </pre>

          <h3>Checking Whether a Database Exists</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name,
    state_desc
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <p>
            This allows us to check the status of AdventureWorks2019 without
            modifying or deleting it.
          </p>

          <p><strong>Important Notes:</strong></p>

          <ul>
            <li>
              Do not drop the AdventureWorks2019 database used by this course.
            </li>

            <li>
              Always verify the database name before using
              <code>DROP DATABASE</code>.
            </li>

            <li>
              Production databases should be backed up appropriately before
              destructive operations.
            </li>

            <li>
              System databases should not be dropped.
            </li>
          </ul>

          <hr />

          <h2>7. Database Snapshots</h2>

          <p>
            A <strong>database snapshot</strong> is a read-only, static view of
            a source database at a specific point in time.
          </p>

          <h3>Important Characteristics</h3>

          <ul>
            <li>Snapshots are read-only.</li>
            <li>A snapshot belongs to a specific source database.</li>
            <li>Snapshots use sparse files.</li>
            <li>
              Snapshots must be created on the same SQL Server instance as the
              source database.
            </li>
            <li>
              A snapshot is not a replacement for a proper database backup.
            </li>
          </ul>

          <h3>Step 1 — Find the AdventureWorks2019 Data File</h3>

          <p>
            Before creating a snapshot, first find the logical name and
            physical location of the database file.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT
    name,
    physical_name,
    type_desc
FROM sys.database_files;
GO`}</code>
          </pre>

          <h3>Step 2 — Create the Snapshot</h3>

          <p>
            The following is an example. The logical file name and physical
            path must match the actual AdventureWorks2019 installation.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`CREATE DATABASE AdventureWorks2019_Snapshot
ON
(
    NAME = AdventureWorks2019_Data,
    FILENAME = 'C:\\SQLData\\AdventureWorks2019_Snapshot.ss'
)
AS SNAPSHOT OF AdventureWorks2019;
GO`}</code>
          </pre>

          <p>
            <strong>Instructor Note:</strong> The
            <code>NAME</code> value must match the logical name returned by
            <code>sys.database_files</code>. The folder in
            <code>FILENAME</code> must exist and be accessible to SQL Server.
          </p>

          <hr />

          <h2>8. Practical — Managing AdventureWorks2019</h2>

          <p>
            Now we will perform practical activities using the
            <strong> AdventureWorks2019 </strong>
            sample database.
          </p>

          <p>
            Open <strong>SQL Server Management Studio (SSMS)</strong> and
            connect to your SQL Server instance.
          </p>

          <h3>Practical 1 — Check AdventureWorks2019</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name,
    database_id,
    create_date,
    state_desc
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <p>
            This query confirms that AdventureWorks2019 exists and shows its
            current state.
          </p>

          <h3>Practical 2 — Select AdventureWorks2019</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT DB_NAME() AS CurrentDatabase;
GO`}</code>
          </pre>

          <p>
            The <code>DB_NAME()</code> function returns the name of the current
            database.
          </p>

          <h3>Practical 3 — View Database Files</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT
    name AS LogicalFileName,
    type_desc AS FileType,
    physical_name AS PhysicalFileName
FROM sys.database_files;
GO`}</code>
          </pre>

          <h3>Practical 4 — View Filegroups</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT
    name AS FilegroupName,
    type_desc,
    is_default
FROM sys.filegroups;
GO`}</code>
          </pre>

          <h3>Practical 5 — View Recovery Model</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name AS DatabaseName,
    recovery_model_desc AS RecoveryModel
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <h3>Practical 6 — View Compatibility Level</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    name AS DatabaseName,
    compatibility_level
FROM sys.databases
WHERE name = 'AdventureWorks2019';
GO`}</code>
          </pre>

          <h3>Practical 7 — List AdventureWorks Tables</h3>

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

          <p>
            This query displays the schemas and tables available in the
            AdventureWorks2019 database.
          </p>

          <h3>Practical 8 — Explore the Production.Product Table</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2019;
GO

SELECT TOP 10
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <p>
            This is our first practical look at an actual AdventureWorks table.
            The <code>Production</code> part is the schema and
            <code>Product</code> is the table name.
          </p>

          <h3>Practical 9 — Inspect Product Table Columns</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Production'
  AND TABLE_NAME = 'Product'
ORDER BY ORDINAL_POSITION;
GO`}</code>
          </pre>

          <p>
            This query shows the column names and data types of the
            <code>Production.Product</code> table.
          </p>

          <h3>Practical 10 — Create a Temporary Teaching Database</h3>

          <p>
            To understand database creation, students can create a disposable
            practice database.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`CREATE DATABASE SQLDemoDB;
GO

SELECT
    name,
    database_id,
    create_date
FROM sys.databases
WHERE name = 'SQLDemoDB';
GO`}</code>
          </pre>

          <p>
            After demonstrating the database properties, the instructor can
            remove the demonstration database:
          </p>

          <pre style={codeBlockStyle}>
            <code>{`DROP DATABASE SQLDemoDB;
GO`}</code>
          </pre>

          <p>
            <strong>Never perform this operation on AdventureWorks2019.</strong>
          </p>

          <hr />

          <h2>9. Best Practices</h2>

          <ul>
            <li>
              Always plan database file locations and sizes carefully.
            </li>

            <li>
              Use meaningful database names.
            </li>

            <li>
              Configure appropriate file growth settings.
            </li>

            <li>
              Avoid unnecessary percentage-based growth for large databases.
            </li>

            <li>
              Regularly perform appropriate backups.
            </li>

            <li>
              Do not directly modify system database tables.
            </li>

            <li>
              Never perform destructive operations on the course's
              AdventureWorks2019 database.
            </li>

            <li>
              Always verify the database name before executing administrative
              commands.
            </li>
          </ul>

          <hr />

          <h2>Session 5 Exercise</h2>

          <p>
            Perform the following activities using SSMS.
          </p>

          <ol>
            <li>
              Check whether <code>AdventureWorks2019</code> exists.
            </li>

            <li>
              Display the current database name using
              <code>DB_NAME()</code>.
            </li>

            <li>
              Display the logical and physical files of
              <code>AdventureWorks2019</code>.
            </li>

            <li>
              Display the filegroups available in
              <code>AdventureWorks2019</code>.
            </li>

            <li>
              Display the recovery model of
              <code>AdventureWorks2019</code>.
            </li>

            <li>
              Display the compatibility level of
              <code>AdventureWorks2019</code>.
            </li>

            <li>
              List all base tables in <code>AdventureWorks2019</code>.
            </li>

            <li>
              Display the first 10 products from
              <code>Production.Product</code>.
            </li>

            <li>
              Display the columns and data types of
              <code>Production.Product</code>.
            </li>
          </ol>

          <hr />

          <h2>Session 5 Challenge</h2>

          <p>
            Create a separate practice database named
            <code>InventoryDB</code>. Do not modify AdventureWorks2019.
          </p>

          <p>The database should have:</p>

          <ul>
            <li>
              Primary data file with an initial size of
              <strong>50MB</strong>
            </li>

            <li>
              Primary data-file growth of <strong>10MB</strong>
            </li>

            <li>
              Transaction log file with an initial size of
              <strong>15MB</strong>
            </li>

            <li>
              Log-file growth of <strong>5MB</strong>
            </li>

            <li>
              An additional filegroup named <code>FG_Archive</code>
            </li>

            <li>
              A secondary data file inside <code>FG_Archive</code>
            </li>
          </ul>

          <p>
            Write the complete T-SQL script and save it as
            <code>Session05_Challenge.sql</code>.
          </p>

          <p>
            <strong>Important:</strong> Use a valid SQL Server data directory
            for the <code>FILENAME</code> values.
          </p>

          <hr />

          <h2>Session 5 Quiz</h2>

          <ol>
            <li>
              Name the main system databases in SQL Server.
            </li>

            <li>
              What is the purpose of the <code>model</code> database?
            </li>

            <li>
              Why should users avoid directly modifying system tables?
            </li>

            <li>
              What is the difference between an <code>.mdf</code>,
              <code>.ndf</code>, and <code>.ldf</code> file?
            </li>

            <li>
              What is a filegroup?
            </li>

            <li>
              Write the basic syntax for creating a database.
            </li>

            <li>
              What is the purpose of the transaction log?
            </li>

            <li>
              What is the purpose of <code>ALTER DATABASE</code>?
            </li>

            <li>
              What happens when a database is dropped?
            </li>

            <li>
              What is a database snapshot?
            </li>

            <li>
              Why should AdventureWorks2019 not be used for destructive
              database-management demonstrations?
            </li>

            <li>
              What is the difference between a database and a filegroup?
            </li>
          </ol>

          <hr />

          <p>
            <strong>Next up (Session 06):</strong> Creating Tables
          </p>

        </article>
      </CustomLayout>
    </Layout>
  );
}





// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';

// export default function Session05() {
//   const codeBlockStyle = {
//     backgroundColor: '#1e1e1e',
//     color: '#d4d4d4',
//     padding: '12px 16px',
//     borderRadius: '6px',
//     fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
//     fontSize: '0.9rem',
//     overflowX: 'auto',
//     lineHeight: '1.5',
//     margin: '12px 0 24px 0'
//   };

//   const inlineCodeStyle = {
//     backgroundColor: '#f4f4f4',
//     color: '#d10057',
//     padding: '2px 6px',
//     borderRadius: '4px',
//     fontFamily: 'Consolas, Monaco, monospace',
//     fontSize: '0.9em'
//   };
//   return (
//     <Layout
//       title="Session 05 — Creating and Managing Databases"
//       description="Creating and Managing Databases in SQL Server 2022 — System Databases, User Databases, Filegroups, Transaction Logs, Snapshots"
//     >
//       <CustomLayout>
//         <article className="session-content">
//         <style>{`
//           article code:not(pre code) {
//             background-color: #f4f4f4;
//             color: #d10057;
//             padding: 2px 6px;
//             border-radius: 4px;
//             font-family: Consolas, Monaco, monospace;
//             font-size: 0.9em;
//           }
//         `}</style>
//           <h1>Session 05 — Creating and Managing Databases</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p><strong>Focus:</strong> Learning how to create, modify, and manage databases in SQL Server 2022.</p>
//           <p><strong>Based on:</strong> Official Aptech Book – Session 5</p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>Explain modification of system data</li>
//             <li>Describe adding of filegroups and transaction logs</li>
//             <li>Outline the process to create a database</li>
//             <li>Describe how to drop a database</li>
//             <li>Explain database snapshots</li>
//           </ul>

//           <hr />

//           <h2>1. System Databases vs User Databases</h2>
//           <p>SQL Server has two main types of databases:</p>

//           <h3>System Databases</h3>
//           <p>These are created automatically when SQL Server is installed. They are critical for the proper functioning of SQL Server.</p>
//           <ul>
//             <li><strong>master</strong> – Stores system-level information (logins, configurations, other databases metadata)</li>
//             <li><strong>model</strong> – Template used when creating new user databases</li>
//             <li><strong>msdb</strong> – Used by SQL Server Agent for jobs, alerts, and backups</li>
//             <li><strong>tempdb</strong> – Temporary workspace (recreated every time SQL Server starts)</li>
//             <li><strong>resource</strong> – Hidden read-only database containing system objects</li>
//           </ul>

//           <h3>User Databases</h3>
// <p>
//   These are databases created by users or applications for storing business
//   data. Examples include application databases and the
//   <strong> AdventureWorks2019 </strong>
//   sample database used throughout this course.
// </p>
//           <hr />

//           <h2>2. Modifying System Data</h2>
//           <p>Users are <strong>not allowed</strong> to directly update information in system database objects such as:</p>
//           <ul>
//             <li>System tables</li>
//             <li>System stored procedures</li>
//             <li>Catalog views</li>
//           </ul>

//           <p>Instead, SQL Server provides safe administrative tools:</p>
//           <ul>
//             <li><strong>SSMS Administration Utilities</strong> – Graphical tools inside SQL Server Management Studio</li>
//             <li><strong>SQL Server Management Objects (SMO) API</strong> – For managing SQL Server programmatically</li>
//             <li><strong>Transact-SQL scripts and system stored procedures</strong> – Recommended way for most administrative tasks</li>
//           </ul>

//           <p><strong>Best Practice:</strong> Never try to directly modify system tables. Always use the provided tools and documented procedures.</p>

//           <hr />

//           <h2>3. Creating a Database</h2>
//           <p>You can create a database using SSMS (GUI) or T-SQL.</p>

//           <h3>Method 1: Using T-SQL (Recommended)</h3>
//           <pre>
//             <code>{`-- Simple way
// CREATE DATABASE SchoolDB;
// GO

// -- Complete way with options
// CREATE DATABASE SchoolDB
// ON 
// ( 
//     NAME = SchoolDB_Data,
//     FILENAME = 'C:\\Data\\SchoolDB.mdf',
//     SIZE = 100MB,
//     MAXSIZE = 1GB,
//     FILEGROWTH = 20MB
// )
// LOG ON 
// ( 
//     NAME = SchoolDB_Log,
//     FILENAME = 'C:\\Data\\SchoolDB_Log.ldf',
//     SIZE = 20MB,
//     MAXSIZE = 500MB,
//     FILEGROWTH = 10MB
// );
// GO`}</code>
//           </pre>

//           <h3>Method 2: Using SSMS</h3>
//           <ol>
//             <li>Right-click on <strong>Databases</strong> → <strong>New Database</strong></li>
//             <li>Enter database name</li>
//             <li>Configure file locations, size, and growth settings (optional)</li>
//             <li>Click <strong>OK</strong></li>
//           </ol>

//           <hr />

//           <h2>4. Filegroups and Transaction Logs</h2>

//           <h3>Primary Data File (.mdf)</h3>
//           <p>Every database has one primary data file. It contains the startup information and system tables.</p>

//           <h3>Secondary Data Files (.ndf)</h3>
//           <p>Optional additional data files. Useful for large databases to spread data across multiple disks.</p>

//           <h3>Transaction Log File (.ldf)</h3>
//           <p>Records all transactions and database modifications. Essential for:</p>
//           <ul>
//             <li>Recovery (point-in-time recovery)</li>
//             <li>Transaction rollback</li>
//             <li>Replication and high availability features</li>
//           </ul>

//           <h3>Filegroups</h3>
//           <p>Filegroups allow you to group data files together for better management and performance.</p>
//           <ul>
//             <li><strong>PRIMARY</strong> filegroup – Contains the primary file (default)</li>
//             <li>User-defined filegroups – Can be created for performance or organization</li>
//           </ul>

//           <pre>
//             <code>{`-- Adding a filegroup
// ALTER DATABASE SchoolDB
// ADD FILEGROUP FG_Sales;
// GO

// -- Adding a file to the filegroup
// ALTER DATABASE SchoolDB
// ADD FILE 
// (
//     NAME = SalesData,
//     FILENAME = 'C:\\Data\\SchoolDB_Sales.ndf',
//     SIZE = 50MB,
//     FILEGROWTH = 10MB
// )
// TO FILEGROUP FG_Sales;
// GO`}</code>
//           </pre>

//           <hr />

//           <h2>5. Modifying a Database</h2>
//           <p>You can change database settings using the <code>ALTER DATABASE</code> statement.</p>

//           <pre>
//             <code>{`-- Change database name
// ALTER DATABASE SchoolDB MODIFY NAME = CollegeDB;
// GO

// -- Add more space
// ALTER DATABASE SchoolDB
// MODIFY FILE (NAME = SchoolDB_Data, SIZE = 200MB);
// GO

// -- Change recovery model
// ALTER DATABASE SchoolDB SET RECOVERY FULL;
// GO

// -- Set database to single user mode
// ALTER DATABASE SchoolDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
// GO`}</code>
//           </pre>

//           <hr />

//           <h2>6. Dropping a Database</h2>
//           <p>Use the <code>DROP DATABASE</code> statement to permanently delete a database.</p>

//           <pre>
//             <code>{`-- Drop a single database
// DROP DATABASE SchoolDB;
// GO

// -- Drop multiple databases
// DROP DATABASE SchoolDB, TestDB;
// GO`}</code>
//           </pre>

//           <p><strong>Important Notes:</strong></p>
//           <ul>
//             <li>You cannot drop a database that is currently in use.</li>
//             <li>Always take a backup before dropping a database in production.</li>
//             <li>System databases cannot be dropped.</li>
//           </ul>

//           <hr />

//           <h2>7. Database Snapshots</h2>
//           <p>A <strong>database snapshot</strong> is a read-only, static view of a database at a specific point in time.</p>

//           <p><strong>Key Points:</strong></p>
//           <ul>
//             <li>Snapshots are useful for reporting and recovering data</li>
//             <li>They are very space-efficient (use sparse files)</li>
//             <li>You can revert the source database to a snapshot (careful!)</li>
//             <li>Snapshots must be on the same SQL Server instance</li>
//           </ul>

//           <pre>
//             <code>{`-- Create a database snapshot
// CREATE DATABASE SchoolDB_Snapshot_20260918
// ON 
// (
//     NAME = SchoolDB_Data,
//     FILENAME = 'C:\\Data\\SchoolDB_Snapshot.ss'
// )
// AS SNAPSHOT OF SchoolDB;
// GO`}</code>
//           </pre>

//           <hr />

//           <h2>8. Best Practices</h2>
//           <ul>
//             <li>Always plan file locations and sizes carefully</li>
//             <li>Place data files and log files on different disks for better performance</li>
//             <li>Use meaningful database names</li>
//             <li>Set appropriate growth settings (avoid percentage growth for large databases)</li>
//             <li>Regularly take backups</li>
//             <li>Avoid modifying system databases directly</li>
//           </ul>

//           <hr />

//           <h2>Session 5 Exercise</h2>
//           <ol>
//             <li>Create a new database named <code>LearningDB</code> using T-SQL.</li>
//             <li>Check the files created for <code>LearningDB</code> using Object Explorer or a query.</li>
//             <li>Add a secondary data file to <code>LearningDB</code>.</li>
//             <li>Change the recovery model of <code>LearningDB</code> to <code>FULL</code>.</li>
//             <li>Write the command to drop <code>LearningDB</code> (do not execute it yet if you want to keep it).</li>
//           </ol>

//           <hr />

//           <h2>Session 5 Challenge</h2>
//           <p>Create a database named <code>InventoryDB</code> with the following specifications:</p>
//           <ul>
//             <li>Primary data file: 50MB initial size, growth by 10MB</li>
//             <li>Log file: 15MB initial size, growth by 5MB</li>
//             <li>Add one additional filegroup named <code>FG_Archive</code></li>
//             <li>Add one secondary data file to the <code>FG_Archive</code> filegroup</li>
//           </ul>

//           <p>Write all the required T-SQL commands and save them in a script file.</p>

//           <hr />

//           <h2>Session 5 Quiz</h2>
//           <ol>
//             <li>Name the four main system databases.</li>
//             <li>What is the purpose of the <code>model</code> database?</li>
//             <li>Can users directly update system tables? Why or why not?</li>
//             <li>What is the difference between .mdf, .ndf, and .ldf files?</li>
//             <li>What is a filegroup?</li>
//             <li>Write the basic syntax to create a database.</li>
//             <li>How do you rename a database using T-SQL?</li>
//             <li>What happens when you drop a database?</li>
//             <li>What is a database snapshot?</li>
//             <li>Why should data files and log files preferably be stored on different disks?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 06):</strong> Creating Tables</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
