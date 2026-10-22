import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session07() {
  return (
    <Layout
      title="Session 07 — Microsoft Azure SQL"
      description="Microsoft Azure SQL — Cloud Database, Features, Benefits, Azure SQL Database, Managed Instance, SQL Server on Azure VM, SSMS"
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

          <h1>Session 07 — Microsoft Azure SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding Azure SQL, cloud databases, deployment models, benefits, differences from on-premises SQL Server, and connecting to Azure SQL using SSMS.</p>
          <p><strong>Practical Database:</strong> AdventureWorks2022</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 7</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Explain cloud computing and cloud databases</li>
            <li>Explain what Azure SQL is</li>
            <li>Differentiate Azure SQL Database, Azure SQL Managed Instance, and SQL Server on Azure VM</li>
            <li>Explain IaaS and PaaS</li>
            <li>List important benefits of Azure SQL</li>
            <li>Compare Azure SQL with on-premises SQL Server</li>
            <li>Explain Azure SQL deployment options</li>
            <li>Explain how SSMS connects to Azure SQL</li>
          </ul>

          <hr />

          <h2>1. Introduction to Cloud Computing</h2>
          <p><strong>Cloud computing</strong> is the delivery of computing resources and services over the Internet. Microsoft Azure is Microsoft's cloud platform.</p>

          <hr />

          <h2>2. What is Azure SQL?</h2>
          <p><strong>Azure SQL</strong> is a family of cloud database products based on the SQL Server database engine:</p>
          <ul>
            <li><strong>Azure SQL Database</strong> — Fully managed PaaS database</li>
            <li><strong>Azure SQL Managed Instance</strong> — High compatibility with SQL Server</li>
            <li><strong>SQL Server on Azure Virtual Machines</strong> — IaaS approach</li>
          </ul>

          <hr />

          <h2>3. IaaS vs PaaS</h2>
          <table>
            <thead>
              <tr><th>Feature</th><th>IaaS (SQL on Azure VM)</th><th>PaaS (Azure SQL DB / MI)</th></tr>
            </thead>
            <tbody>
              <tr><td>OS Management</td><td>You manage</td><td>Microsoft manages</td></tr>
              <tr><td>SQL Engine</td><td>You manage</td><td>Microsoft manages</td></tr>
              <tr><td>Control</td><td>Higher</td><td>Lower but easier</td></tr>
              <tr><td>Management Effort</td><td>Higher</td><td>Lower</td></tr>
            </tbody>
          </table>

          <hr />

          <h2>4. Benefits of Azure SQL</h2>
          <ul>
            <li>Managed service (patching, backups, high availability)</li>
            <li>Scalability</li>
            <li>Security and compliance features</li>
            <li>Global availability</li>
            <li>SQL Server compatibility (T-SQL skills transfer)</li>
          </ul>

          <hr />

          <h2>5. AdventureWorks and Azure SQL</h2>
          <p>The T-SQL skills you learn with AdventureWorks also apply when working with Azure SQL.</p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2022;
GO

SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT DB_NAME() AS CurrentDatabase;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    DB_NAME() AS CurrentDatabase,
    @@VERSION AS SQLServerVersion;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Connecting to Azure SQL with SSMS</h2>
          <ol>
            <li>Open SQL Server Management Studio</li>
            <li>Server type: Database Engine</li>
            <li>Server name: <code>yourserver.database.windows.net</code></li>
            <li>Authentication: SQL Server Authentication (or Azure AD)</li>
            <li>Enter login and password, then Connect</li>
          </ol>

          <hr />

          <h2>Session 7 Exercise</h2>
          <ol>
            <li>Explain the difference between Azure SQL Database and SQL Server on Azure VM.</li>
            <li>List three benefits of using Azure SQL.</li>
            <li>What is the difference between IaaS and PaaS?</li>
            <li>Run the sample queries above against your local AdventureWorks database to reinforce that T-SQL skills transfer.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 08):</strong> Indexes</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
