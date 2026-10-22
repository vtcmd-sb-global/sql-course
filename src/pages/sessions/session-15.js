import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session15() {
  return (
    <Layout
      title="Session 15 — PolyBase and Query Store"
      description="PolyBase and Query Store in SQL Server 2022"
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
          <p><strong>Focus:</strong> Understanding PolyBase and Query Store in SQL Server 2022.</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Explain what PolyBase is and its use cases</li>
            <li>Describe how to query external data with PolyBase</li>
            <li>Explain the purpose of Query Store</li>
            <li>Enable and use Query Store to monitor query performance</li>
          </ul>

          <hr />

          <h2>1. Introduction to PolyBase</h2>
          <p>
            <strong>PolyBase</strong> allows SQL Server to query data stored in external sources
            such as Hadoop, Azure Blob Storage, and other relational databases using T-SQL.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Example: Create an external data source (conceptual)
CREATE EXTERNAL DATA SOURCE MyAzureBlob
WITH (
    TYPE = BLOB_STORAGE,
    LOCATION = 'https://mystorageaccount.blob.core.windows.net/mycontainer'
);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. Query Store</h2>
          <p>
            <strong>Query Store</strong> captures a history of queries, plans, and runtime
            statistics, helping you identify and fix performance regressions.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Enable Query Store on a database
ALTER DATABASE AdventureWorks2019
SET QUERY_STORE = ON;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`-- View top resource-consuming queries from Query Store
SELECT TOP 10
    q.query_id,
    qt.query_sql_text,
    rs.avg_duration,
    rs.count_executions
FROM sys.query_store_query AS q
JOIN sys.query_store_query_text AS qt
    ON q.query_text_id = qt.query_text_id
JOIN sys.query_store_runtime_stats AS rs
    ON q.query_id = rs.query_id
ORDER BY rs.avg_duration DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 15 Exercise</h2>
          <ol>
            <li>Explain the purpose of PolyBase in one or two sentences.</li>
            <li>Enable Query Store on a practice database and list the main system views it uses.</li>
            <li>Write a query that returns the most expensive queries from Query Store.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 16):</strong> Artificial Intelligence and Machine Learning in SQL Server 2022</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
