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
          <p><strong>Focus:</strong> Learning how to create, modify, and manage databases in SQL Server 2022.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 5</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain modification of system data</li>
            <li>Describe adding of filegroups and transaction logs</li>
            <li>Outline the process to create a database</li>
            <li>Describe how to drop a database</li>
            <li>Explain database snapshots</li>
          </ul>

          <hr />

          <h2>1. System Databases vs User Databases</h2>
          <p>SQL Server has two main types of databases:</p>

          <h3>System Databases</h3>
          <p>These are created automatically when SQL Server is installed. They are critical for the proper functioning of SQL Server.</p>
          <ul>
            <li><strong>master</strong> – Stores system-level information (logins, configurations, other databases metadata)</li>
            <li><strong>model</strong> – Template used when creating new user databases</li>
            <li><strong>msdb</strong> – Used by SQL Server Agent for jobs, alerts, and backups</li>
            <li><strong>tempdb</strong> – Temporary workspace (recreated every time SQL Server starts)</li>
            <li><strong>resource</strong> – Hidden read-only database containing system objects</li>
          </ul>

          <h3>User Databases</h3>
          <p>These are databases created by users or applications for storing business data (e.g., SchoolDB, InventoryDB, AdventureWorks2022).</p>

          <hr />

          <h2>2. Modifying System Data</h2>
          <p>Users are <strong>not allowed</strong> to directly update information in system database objects such as:</p>
          <ul>
            <li>System tables</li>
            <li>System stored procedures</li>
            <li>Catalog views</li>
          </ul>

          <p>Instead, SQL Server provides safe administrative tools:</p>
          <ul>
            <li><strong>SSMS Administration Utilities</strong> – Graphical tools inside SQL Server Management Studio</li>
            <li><strong>SQL Server Management Objects (SMO) API</strong> – For managing SQL Server programmatically</li>
            <li><strong>Transact-SQL scripts and system stored procedures</strong> – Recommended way for most administrative tasks</li>
          </ul>

          <p><strong>Best Practice:</strong> Never try to directly modify system tables. Always use the provided tools and documented procedures.</p>

          <hr />

          <h2>3. Creating a Database</h2>
          <p>You can create a database using SSMS (GUI) or T-SQL.</p>

          <h3>Method 1: Using T-SQL (Recommended)</h3>
          <pre>
            <code>{`-- Simple way
CREATE DATABASE SchoolDB;
GO

-- Complete way with options
CREATE DATABASE SchoolDB
ON 
( 
    NAME = SchoolDB_Data,
    FILENAME = 'C:\\Data\\SchoolDB.mdf',
    SIZE = 100MB,
    MAXSIZE = 1GB,
    FILEGROWTH = 20MB
)
LOG ON 
( 
    NAME = SchoolDB_Log,
    FILENAME = 'C:\\Data\\SchoolDB_Log.ldf',
    SIZE = 20MB,
    MAXSIZE = 500MB,
    FILEGROWTH = 10MB
);
GO`}</code>
          </pre>

          <h3>Method 2: Using SSMS</h3>
          <ol>
            <li>Right-click on <strong>Databases</strong> → <strong>New Database</strong></li>
            <li>Enter database name</li>
            <li>Configure file locations, size, and growth settings (optional)</li>
            <li>Click <strong>OK</strong></li>
          </ol>

          <hr />

          <h2>4. Filegroups and Transaction Logs</h2>

          <h3>Primary Data File (.mdf)</h3>
          <p>Every database has one primary data file. It contains the startup information and system tables.</p>

          <h3>Secondary Data Files (.ndf)</h3>
          <p>Optional additional data files. Useful for large databases to spread data across multiple disks.</p>

          <h3>Transaction Log File (.ldf)</h3>
          <p>Records all transactions and database modifications. Essential for:</p>
          <ul>
            <li>Recovery (point-in-time recovery)</li>
            <li>Transaction rollback</li>
            <li>Replication and high availability features</li>
          </ul>

          <h3>Filegroups</h3>
          <p>Filegroups allow you to group data files together for better management and performance.</p>
          <ul>
            <li><strong>PRIMARY</strong> filegroup – Contains the primary file (default)</li>
            <li>User-defined filegroups – Can be created for performance or organization</li>
          </ul>

          <pre>
            <code>{`-- Adding a filegroup
ALTER DATABASE SchoolDB
ADD FILEGROUP FG_Sales;
GO

-- Adding a file to the filegroup
ALTER DATABASE SchoolDB
ADD FILE 
(
    NAME = SalesData,
    FILENAME = 'C:\\Data\\SchoolDB_Sales.ndf',
    SIZE = 50MB,
    FILEGROWTH = 10MB
)
TO FILEGROUP FG_Sales;
GO`}</code>
          </pre>

          <hr />

          <h2>5. Modifying a Database</h2>
          <p>You can change database settings using the <code>ALTER DATABASE</code> statement.</p>

          <pre>
            <code>{`-- Change database name
ALTER DATABASE SchoolDB MODIFY NAME = CollegeDB;
GO

-- Add more space
ALTER DATABASE SchoolDB
MODIFY FILE (NAME = SchoolDB_Data, SIZE = 200MB);
GO

-- Change recovery model
ALTER DATABASE SchoolDB SET RECOVERY FULL;
GO

-- Set database to single user mode
ALTER DATABASE SchoolDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO`}</code>
          </pre>

          <hr />

          <h2>6. Dropping a Database</h2>
          <p>Use the <code>DROP DATABASE</code> statement to permanently delete a database.</p>

          <pre>
            <code>{`-- Drop a single database
DROP DATABASE SchoolDB;
GO

-- Drop multiple databases
DROP DATABASE SchoolDB, TestDB;
GO`}</code>
          </pre>

          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>You cannot drop a database that is currently in use.</li>
            <li>Always take a backup before dropping a database in production.</li>
            <li>System databases cannot be dropped.</li>
          </ul>

          <hr />

          <h2>7. Database Snapshots</h2>
          <p>A <strong>database snapshot</strong> is a read-only, static view of a database at a specific point in time.</p>

          <p><strong>Key Points:</strong></p>
          <ul>
            <li>Snapshots are useful for reporting and recovering data</li>
            <li>They are very space-efficient (use sparse files)</li>
            <li>You can revert the source database to a snapshot (careful!)</li>
            <li>Snapshots must be on the same SQL Server instance</li>
          </ul>

          <pre>
            <code>{`-- Create a database snapshot
CREATE DATABASE SchoolDB_Snapshot_20260918
ON 
(
    NAME = SchoolDB_Data,
    FILENAME = 'C:\\Data\\SchoolDB_Snapshot.ss'
)
AS SNAPSHOT OF SchoolDB;
GO`}</code>
          </pre>

          <hr />

          <h2>8. Best Practices</h2>
          <ul>
            <li>Always plan file locations and sizes carefully</li>
            <li>Place data files and log files on different disks for better performance</li>
            <li>Use meaningful database names</li>
            <li>Set appropriate growth settings (avoid percentage growth for large databases)</li>
            <li>Regularly take backups</li>
            <li>Avoid modifying system databases directly</li>
          </ul>

          <hr />

          <h2>Session 5 Exercise</h2>
          <ol>
            <li>Create a new database named <code>LearningDB</code> using T-SQL.</li>
            <li>Check the files created for <code>LearningDB</code> using Object Explorer or a query.</li>
            <li>Add a secondary data file to <code>LearningDB</code>.</li>
            <li>Change the recovery model of <code>LearningDB</code> to <code>FULL</code>.</li>
            <li>Write the command to drop <code>LearningDB</code> (do not execute it yet if you want to keep it).</li>
          </ol>

          <hr />

          <h2>Session 5 Challenge</h2>
          <p>Create a database named <code>InventoryDB</code> with the following specifications:</p>
          <ul>
            <li>Primary data file: 50MB initial size, growth by 10MB</li>
            <li>Log file: 15MB initial size, growth by 5MB</li>
            <li>Add one additional filegroup named <code>FG_Archive</code></li>
            <li>Add one secondary data file to the <code>FG_Archive</code> filegroup</li>
          </ul>

          <p>Write all the required T-SQL commands and save them in a script file.</p>

          <hr />

          <h2>Session 5 Quiz</h2>
          <ol>
            <li>Name the four main system databases.</li>
            <li>What is the purpose of the <code>model</code> database?</li>
            <li>Can users directly update system tables? Why or why not?</li>
            <li>What is the difference between .mdf, .ndf, and .ldf files?</li>
            <li>What is a filegroup?</li>
            <li>Write the basic syntax to create a database.</li>
            <li>How do you rename a database using T-SQL?</li>
            <li>What happens when you drop a database?</li>
            <li>What is a database snapshot?</li>
            <li>Why should data files and log files preferably be stored on different disks?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 06):</strong> Creating Tables</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
