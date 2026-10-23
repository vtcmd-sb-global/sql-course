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

          <p>
            <strong>Focus:</strong> Understanding Azure SQL, cloud databases,
            deployment models, benefits, differences from on-premises SQL
            Server, and connecting to Azure SQL using SSMS.
          </p>

          <p>
            <strong>Practical Database:</strong> AdventureWorks2022
          </p>

          <p>
            <strong>Based on:</strong> Official Aptech Book – Session 7
          </p>

          <hr />

          <h2>Learning Objectives</h2>

          <p>By the end of this session, you should be able to:</p>

          <ul>
            <li>Explain cloud computing and cloud databases</li>
            <li>Explain what Azure SQL is</li>
            <li>Differentiate Azure SQL Database, Azure SQL Managed Instance, and SQL Server on Azure VM</li>
            <li>Explain IaaS and PaaS</li>
            <li>List important benefits of Azure SQL</li>
            <li>Compare Azure SQL with on-premises SQL Server</li>
            <li>Explain Azure SQL deployment options</li>
            <li>Explain how SSMS connects to Azure SQL</li>
            <li>Understand how AdventureWorks-style SQL knowledge transfers to Azure SQL</li>
          </ul>

          <hr />

          <h2>1. Introduction to Cloud Computing</h2>

          <p>
            <strong>Cloud computing</strong> is the delivery of computing
            resources and services over the Internet.
          </p>

          <p>
            Instead of purchasing and maintaining every physical server
            yourself, an organization can use cloud services provided by a
            cloud provider.
          </p>

          <p>
            Microsoft Azure is Microsoft's cloud platform. It provides
            services for computing, networking, storage, security,
            application development, analytics, and databases.
          </p>

          <p>
            Microsoft provides several SQL Server database options through
            Azure. These services are collectively referred to as
            <strong> Azure SQL</strong>.
          </p>

          <hr />

          <h2>2. What is Azure SQL?</h2>

          <p>
            <strong>Azure SQL</strong> is a family of cloud database products
            based on the SQL Server database engine.
          </p>

          <p>
            Azure SQL is not one single product. The main options are:
          </p>

          <ul>
            <li>
              <strong>Azure SQL Database</strong> — A fully managed
              Platform-as-a-Service database.
            </li>

            <li>
              <strong>Azure SQL Managed Instance</strong> — A managed Azure
              service designed to provide high compatibility with SQL Server.
            </li>

            <li>
              <strong>SQL Server on Azure Virtual Machines</strong> — SQL
              Server running inside an Azure virtual machine, providing
              infrastructure-level control.
            </li>
          </ul>

          <p>
            Microsoft describes Azure SQL as a family of SQL Server database
            engine products in Azure.
          </p>

          <hr />

          <h2>3. Azure SQL Database</h2>

          <p>
            <strong>Azure SQL Database</strong> is a fully managed
            Platform-as-a-Service database.
          </p>

          <p>
            Microsoft manages much of the underlying infrastructure,
            operating system, database engine maintenance, patching, backups,
            and availability.
          </p>

          <h3>Best suited for</h3>
          <ul>
            <li>Modern cloud applications</li>
            <li>SaaS applications</li>
            <li>Workloads that benefit from elastic scaling</li>
            <li>Teams that want minimal infrastructure management</li>
          </ul>

          <hr />

          <h2>4. Azure SQL Managed Instance</h2>

          <p>
            <strong>Azure SQL Managed Instance</strong> provides near
            100% compatibility with the latest SQL Server database engine.
          </p>

          <p>
            It is designed for customers who want to lift and shift
            on-premises SQL Server workloads to Azure with minimal code
            changes.
          </p>

          <h3>Best suited for</h3>
          <ul>
            <li>Migrating existing SQL Server applications</li>
            <li>Workloads that need instance-level features</li>
            <li>Organizations that want managed service with high compatibility</li>
          </ul>

          <hr />

          <h2>5. SQL Server on Azure Virtual Machines</h2>

          <p>
            <strong>SQL Server on Azure VMs</strong> is an Infrastructure-as-a-Service
            option. You get a full virtual machine with SQL Server installed.
          </p>

          <p>
            You manage the operating system, SQL Server configuration,
            patching (unless using automated options), and many operational
            tasks.
          </p>

          <h3>Best suited for</h3>
          <ul>
            <li>Maximum control over OS and SQL Server</li>
            <li>Custom configurations not available in PaaS</li>
            <li>Lift-and-shift of complex environments</li>
          </ul>

          <hr />

          <h2>6. IaaS vs PaaS</h2>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>IaaS (SQL on Azure VM)</th>
                <th>PaaS (Azure SQL DB / Managed Instance)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OS Management</td>
                <td>You manage</td>
                <td>Microsoft manages</td>
              </tr>
              <tr>
                <td>SQL Engine patching</td>
                <td>You manage (or configure automation)</td>
                <td>Microsoft manages</td>
              </tr>
              <tr>
                <td>Control</td>
                <td>Highest</td>
                <td>Lower but simpler</td>
              </tr>
              <tr>
                <td>Management effort</td>
                <td>Higher</td>
                <td>Lower</td>
              </tr>
              <tr>
                <td>Compatibility with on-premises</td>
                <td>Very high</td>
                <td>High (especially Managed Instance)</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>7. Benefits of Azure SQL</h2>

          <ul>
            <li>Managed backups, patching, and high availability</li>
            <li>Elastic scaling for performance and cost</li>
            <li>Built-in security and compliance features</li>
            <li>Global reach and geo-replication options</li>
            <li>T-SQL skills transfer from on-premises SQL Server</li>
            <li>Integration with other Azure services</li>
          </ul>

          <hr />

          <h2>8. Azure SQL vs On-Premises SQL Server</h2>

          <table>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>On-Premises SQL Server</th>
                <th>Azure SQL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware</td>
                <td>You buy and maintain</td>
                <td>Provided by Microsoft</td>
              </tr>
              <tr>
                <td>Patching</td>
                <td>Your responsibility</td>
                <td>Often handled by the service</td>
              </tr>
              <tr>
                <td>Scaling</td>
                <td>Buy more hardware</td>
                <td>Scale up/out through Azure portal or APIs</td>
              </tr>
              <tr>
                <td>High availability</td>
                <td>You design and implement</td>
                <td>Built into many Azure SQL options</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>9. Deployment Options Summary</h2>

          <ul>
            <li><strong>Azure SQL Database</strong> — best for new cloud-native apps</li>
            <li><strong>Azure SQL Managed Instance</strong> — best for migrating existing SQL Server apps with high compatibility needs</li>
            <li><strong>SQL Server on Azure VM</strong> — best when you need full OS and instance control</li>
          </ul>

          <hr />

          <h2>10. Pricing and Purchasing Models (Overview)</h2>

          <p>
            Azure SQL offers different purchasing models such as DTU-based and
            vCore-based models, as well as serverless options for Azure SQL
            Database. Exact pricing depends on region, performance tier, and
            usage.
          </p>

          <p>
            Always check the official Azure pricing calculator for current
            numbers.
          </p>

          <hr />

          <h2>11. Security Overview</h2>

          <ul>
            <li>Firewall rules and private endpoints</li>
            <li>Microsoft Entra ID (Azure AD) authentication</li>
            <li>Transparent Data Encryption (TDE)</li>
            <li>Always Encrypted and Dynamic Data Masking</li>
            <li>Auditing and threat detection features</li>
          </ul>

          <hr />

          <h2>12. High Availability and Business Continuity</h2>

          <p>
            Azure SQL provides built-in high availability. Additional options
            include geo-replication, failover groups, and point-in-time restore.
          </p>

          <hr />

          <h2>13. Connecting with SSMS</h2>

          <ol>
            <li>Open SQL Server Management Studio</li>
            <li>Server type: Database Engine</li>
            <li>Server name: <code>yourserver.database.windows.net</code></li>
            <li>Authentication: SQL Authentication or Microsoft Entra</li>
            <li>Enter credentials and Connect</li>
          </ol>

          <p>
            Ensure your client IP is allowed in the Azure SQL firewall rules.
          </p>

          <hr />

          <h2>14. AdventureWorks and Azure SQL</h2>

          <p>
            The T-SQL skills you learn with AdventureWorks also apply when
            working with Azure SQL. The same SELECT, JOIN, and DDL patterns
            transfer.
          </p>

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

          <h2>15. Practical — Connecting SQL Knowledge to Azure</h2>

          <ol>
            <li>Run the sample queries above against your local AdventureWorks database.</li>
            <li>Note that the same T-SQL works against Azure SQL Database once connected.</li>
            <li>(Optional) Create a free Azure trial and provision a small Azure SQL Database.</li>
            <li>Connect from SSMS using the server name and firewall rules.</li>
          </ol>

          <hr />

          <h2>16. Best Practices</h2>

          <ul>
            <li>Choose the right Azure SQL option for your compatibility and control needs</li>
            <li>Use Microsoft Entra authentication where possible</li>
            <li>Configure firewalls and private endpoints carefully</li>
            <li>Monitor costs with the Azure pricing calculator and budgets</li>
            <li>Treat snapshots and geo-replication as part of a broader HA/DR plan</li>
          </ul>

          <hr />

          <h2>Session 7 Exercise</h2>
          <ol>
            <li>Explain the difference between Azure SQL Database and SQL Server on Azure VM.</li>
            <li>List three benefits of using Azure SQL.</li>
            <li>What is the difference between IaaS and PaaS?</li>
            <li>Run the sample queries above against your local AdventureWorks database to reinforce that T-SQL skills transfer.</li>
            <li>Describe when you would choose Managed Instance over Azure SQL Database.</li>
          </ol>

          <hr />

          <h2>Session 7 Challenge</h2>
          <ol>
            <li>Create a comparison table of the three Azure SQL options for a real project scenario.</li>
            <li>Document the steps to connect SSMS to an Azure SQL Database including firewall configuration.</li>
            <li>Research Elastic Pools and explain when they are useful.</li>
          </ol>

          <hr />

          <h2>Session 7 Quiz</h2>
          <ol>
            <li>What is Azure SQL?</li>
            <li>Name the three main Azure SQL options.</li>
            <li>What does PaaS mean in the context of Azure SQL Database?</li>
            <li>Which option gives the most control over the operating system?</li>
            <li>What is Microsoft Entra authentication?</li>
            <li>What is an Elastic Pool?</li>
            <li>How is AdventureWorks useful when learning Azure SQL?</li>
            <li>Which Azure SQL option provides the greatest level of control over the operating system and SQL Server environment?</li>
            <li>Why might an organization choose Managed Instance for migration?</li>
            <li>What should you configure before connecting SSMS to Azure SQL Database?</li>
          </ol>

          <hr />

          <p>
            <strong>Next up (Session 08):</strong> Accessing Data
          </p>

        </article>
      </CustomLayout>
    </Layout>
  );
}
