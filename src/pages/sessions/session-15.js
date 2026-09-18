import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session15() {
  return (
    <Layout
      title="Session 15 — PolyBase and Query Store"
      description="PolyBase and Query Store in SQL Server 2022 — Querying External Data and Performance Tuning"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 15 — PolyBase and Query Store</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Querying external data sources with PolyBase and monitoring/tuning query performance using Query Store.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 15</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Describe PolyBase</li>
            <li>Explain features and advantages of PolyBase</li>
            <li>Define and describe Query Store</li>
            <li>Describe how to tune workload performance with Query Store</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>
          <p>This session introduces two powerful features of SQL Server:</p>
          <ul>
            <li><strong>PolyBase</strong> – Allows you to run T-SQL queries that read data from external data sources.</li>
            <li><strong>Query Store</strong> – Helps you monitor, analyze, and tune query performance using built-in reports and tools.</li>
          </ul>

          <hr />

          <h2>2. Understanding PolyBase</h2>
          <p><strong>PolyBase</strong> enables the SQL Server instance to process Transact-SQL queries that read data from external data sources.</p>

          <p>Supported external sources include:</p>
          <ul>
            <li>Hadoop</li>
            <li>Azure Blob Storage</li>
            <li>Azure Data Lake Storage</li>
            <li>Oracle</li>
            <li>Teradata</li>
            <li>MongoDB</li>
            <li>SQL Server (other instances)</li>
            <li>Delimited text files</li>
          </ul>

          <p>With PolyBase you can combine external data with relational data inside SQL Server in a single query.</p>

          <hr />

          <h2>3. Key Features and Advantages of PolyBase</h2>
          <ul>
            <li>Query external data using standard T-SQL</li>
            <li>Push computation to the external system when possible (improves performance)</li>
            <li>No need to import large volumes of data into SQL Server</li>
            <li>Supports both structured and semi-structured data</li>
            <li>Works with big data platforms (Hadoop) and cloud storage (Azure Blob)</li>
            <li>Enables hybrid data scenarios (on-premises + cloud + big data)</li>
          </ul>

          <h3>Common Scenarios</h3>
          <ul>
            <li>Query data stored in Hadoop from SQL Server or Parallel Data Warehouse (PDW)</li>
            <li>Query data stored in Azure Blob Storage using T-SQL</li>
            <li>Join external data with local relational tables</li>
          </ul>

          <hr />

          <h2>4. PolyBase Architecture (High Level)</h2>
          <p>PolyBase uses:</p>
          <ul>
            <li><strong>External Data Sources</strong> – Defines the connection to the external system</li>
            <li><strong>External File Formats</strong> – Describes the format of the external data (for file-based sources)</li>
            <li><strong>External Tables</strong> – Appear like normal tables but point to external data</li>
          </ul>

          <pre>
            <code>{`-- Example: Create External Data Source (Azure Blob)
CREATE EXTERNAL DATA SOURCE AzureBlobStorage
WITH (
    TYPE = BLOB_STORAGE,
    LOCATION = 'https://myaccount.blob.core.windows.net/mycontainer'
);

-- Create External File Format
CREATE EXTERNAL FILE FORMAT TextFileFormat
WITH (
    FORMAT_TYPE = DELIMITEDTEXT,
    FORMAT_OPTIONS (FIELD_TERMINATOR = ',', STRING_DELIMITER = '"')
);

-- Create External Table
CREATE EXTERNAL TABLE ExternalCustomers
(
    CustomerID INT,
    CustomerName NVARCHAR(100),
    City NVARCHAR(50)
)
WITH (
    LOCATION = '/customers/',
    DATA_SOURCE = AzureBlobStorage,
    FILE_FORMAT = TextFileFormat
);`}</code>
          </pre>

          <hr />

          <h2>5. Query Store</h2>
          <p><strong>Query Store</strong> is a built-in feature that automatically captures query history, execution plans, and runtime statistics.</p>

          <p>It acts like a “flight data recorder” for your database queries.</p>

          <h3>What Query Store Captures</h3>
          <ul>
            <li>Query text</li>
            <li>Execution plans</li>
            <li>Runtime statistics (duration, CPU, reads, writes, etc.)</li>
            <li>Wait statistics</li>
            <li>Plan regressions</li>
          </ul>

          <hr />

          <h2>6. Enabling Query Store</h2>
          <pre>
            <code>{`-- Enable Query Store
ALTER DATABASE AdventureWorks2022
SET QUERY_STORE = ON;

-- Recommended configuration
ALTER DATABASE AdventureWorks2022
SET QUERY_STORE (
    OPERATION_MODE = READ_WRITE,
    CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30),
    DATA_FLUSH_INTERVAL_SECONDS = 900,
    MAX_STORAGE_SIZE_MB = 1000,
    INTERVAL_LENGTH_MINUTES = 60
);`}</code>
          </pre>

          <hr />

          <h2>7. Using Query Store for Performance Tuning</h2>
          <p>Query Store provides several built-in reports in SSMS:</p>
          <ul>
            <li><strong>Regressed Queries</strong> – Queries that became slower</li>
            <li><strong>Overall Resource Consumption</strong></li>
            <li><strong>Top Resource Consuming Queries</strong></li>
            <li><strong>Queries with Forced Plans</strong></li>
            <li><strong>Tracked Queries</strong></li>
          </ul>

          <h3>Forcing a Plan</h3>
          <p>If a query has a good plan and a bad plan, you can force the good plan:</p>
          <pre>
            <code>{`EXEC sp_query_store_force_plan @query_id = 101, @plan_id = 5;`}</code>
          </pre>

          <h3>Unforcing a Plan</h3>
          <pre>
            <code>{`EXEC sp_query_store_unforce_plan @query_id = 101, @plan_id = 5;`}</code>
          </pre>

          <hr />

          <h2>8. Benefits of Query Store</h2>
          <ul>
            <li>Identify queries that regressed after upgrades or changes</li>
            <li>Find the most expensive queries easily</li>
            <li>Compare different execution plans for the same query</li>
            <li>Force a stable plan to avoid performance issues</li>
            <li>Helps in troubleshooting parameter sniffing problems</li>
            <li>Useful for both on-premises and Azure SQL</li>
          </ul>

          <hr />

          <h2>Session 15 Exercise</h2>
          <ol>
            <li>Explain the main purpose of PolyBase in your own words.</li>
            <li>List any four external data sources supported by PolyBase.</li>
            <li>What is the difference between an External Data Source and an External Table?</li>
            <li>Enable Query Store on one of your databases using T-SQL.</li>
            <li>Open SSMS and explore the Query Store reports available under your database.</li>
          </ol>

          <hr />

          <h2>Session 15 Challenge</h2>
          <p>Perform the following tasks:</p>
          <ol>
            <li>Write the T-SQL commands to create an External Data Source and External Table (you can use a sample text file or Azure Blob if available).</li>
            <li>Enable Query Store with a suitable configuration on your practice database.</li>
            <li>Run several queries and then check the “Top Resource Consuming Queries” report.</li>
            <li>Identify one query and view its execution plans in Query Store.</li>
            <li>(Optional) Force a specific plan and observe the behavior.</li>
          </ol>

          <hr />

          <h2>Session 15 Quiz</h2>
          <ol>
            <li>What is PolyBase?</li>
            <li>Name any three external data sources supported by PolyBase.</li>
            <li>What are the three main objects used in PolyBase (Data Source, File Format, Table)?</li>
            <li>What is Query Store?</li>
            <li>What kind of information does Query Store capture?</li>
            <li>How do you enable Query Store on a database?</li>
            <li>What is a regressed query?</li>
            <li>What does the sp_query_store_force_plan procedure do?</li>
            <li>Why is Query Store useful after a SQL Server upgrade?</li>
            <li>Can Query Store be used in Azure SQL Database?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 16):</strong> Artificial Intelligence and Machine Learning in SQL Server 2022</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
