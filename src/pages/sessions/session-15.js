import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session15() {
  return (
    <Layout
      title="Session 15 — PolyBase and Query Store"
      description="PolyBase and Query Store in SQL Server 2022 — Querying External Data and Performance Tuning"
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
            <li>And more</li>
          </ul>

          <p>With PolyBase you can query external data as if it were a regular SQL Server table using <strong>External Tables</strong>.</p>

          <hr />

          <h2>3. Key Components of PolyBase</h2>
          <ul>
            <li><strong>External Data Source</strong> – Defines the connection to the external system</li>
            <li><strong>External File Format</strong> – Describes the format of the external files (for Hadoop/Blob)</li>
            <li><strong>External Table</strong> – Maps to the external data so you can query it with T-SQL</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`-- Example conceptual structure (adjust for your environment)
CREATE EXTERNAL DATA SOURCE MyExternalSource
WITH (
    TYPE = HADOOP,
    LOCATION = 'hdfs://mycluster:8020'
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`CREATE EXTERNAL FILE FORMAT MyFileFormat
WITH (
    FORMAT_TYPE = DELIMITEDTEXT,
    FORMAT_OPTIONS (FIELD_TERMINATOR = ',', STRING_DELIMITER = '"')
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`CREATE EXTERNAL TABLE ExternalSales
(
    OrderID INT,
    ProductName NVARCHAR(100),
    Quantity INT,
    OrderDate DATE
)
WITH (
    LOCATION = '/data/sales/',
    DATA_SOURCE = MyExternalSource,
    FILE_FORMAT = MyFileFormat
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Advantages of PolyBase</h2>
          <ul>
            <li>Query external data using familiar T-SQL</li>
            <li>No need to import/copy large datasets first</li>
            <li>Join external data with local SQL Server tables</li>
            <li>Supports scale-out for large workloads</li>
            <li>Works with big data and cloud storage</li>
          </ul>

          <hr />

          <h2>5. Introduction to Query Store</h2>
          <p><strong>Query Store</strong> is a built-in feature that captures a history of queries, plans, and runtime statistics.</p>

          <p>It helps you:</p>
          <ul>
            <li>Find the most expensive queries</li>
            <li>Detect plan regressions</li>
            <li>Force a known good plan</li>
            <li>Troubleshoot performance after upgrades</li>
          </ul>

          <hr />

          <h2>6. Enabling Query Store</h2>
          <CodeBlock
          language="sql"
            code={`ALTER DATABASE AdventureWorks2019
SET QUERY_STORE = ON
(
    OPERATION_MODE = READ_WRITE,
    CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30),
    DATA_FLUSH_INTERVAL_SECONDS = 900,
    MAX_STORAGE_SIZE_MB = 1000,
    INTERVAL_LENGTH_MINUTES = 60
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. Using Query Store Reports in SSMS</h2>
          <p>In Object Explorer, expand your database → Query Store. You will see reports such as:</p>
          <ul>
            <li>Regressed Queries</li>
            <li>Overall Resource Consumption</li>
            <li>Top Resource Consuming Queries</li>
            <li>Queries With Forced Plans</li>
            <li>Tracked Queries</li>
          </ul>

          <hr />

          <h2>8. Forcing a Plan</h2>
          <CodeBlock
          language="sql"
            code={`-- Force a specific plan for a query
EXEC sp_query_store_force_plan
    @query_id = 1,
    @plan_id = 5;
GO

-- Unforce a plan
EXEC sp_query_store_unforce_plan
    @query_id = 1,
    @plan_id = 5;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. Benefits of Query Store</h2>
          <ul>
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
