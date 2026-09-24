import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

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
            engine products in Azure. :contentReference[oaicite:1]{index=1}
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

          <h3>Simple Example</h3>

          <p>
            Imagine an online shopping application that stores:
          </p>

          <ul>
            <li>Customers</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Payments</li>
            <li>Addresses</li>
          </ul>

          <p>
            Instead of installing SQL Server on your own physical server, the
            application can use Azure SQL Database as its cloud database.
          </p>

          <p>
            Azure SQL Database is a fully managed PaaS database service with
            built-in capabilities such as backups, patching, monitoring, and
            high availability. :contentReference[oaicite:2]{index=2}
          </p>

          <hr />

          <h2>4. Azure SQL Managed Instance</h2>

          <p>
            <strong>Azure SQL Managed Instance</strong> is another fully
            managed PaaS option.
          </p>

          <p>
            It is designed to provide a high level of compatibility with
            existing SQL Server workloads while still providing managed cloud
            infrastructure.
          </p>

          <p>
            This makes Managed Instance particularly relevant when an
            organization wants to move existing SQL Server applications to
            Azure with relatively few changes.
          </p>

          <p>
            Microsoft describes SQL Managed Instance as a fully managed PaaS
            database engine with close to 100% compatibility with SQL Server
            for many workloads. :contentReference[oaicite:3]{index=3}
          </p>

          <hr />

          <h2>5. SQL Server on Azure Virtual Machines</h2>

          <p>
            Another option is to install and run SQL Server inside an
            <strong> Azure Virtual Machine</strong>.
          </p>

          <p>
            This is an <strong>Infrastructure-as-a-Service (IaaS)</strong>
            approach.
          </p>

          <p>
            You receive a virtual machine and have much greater control over
            the operating system and SQL Server instance.
          </p>

          <p>
            This also means that you have more management responsibilities.
          </p>

          <p>
            SQL Server on Azure VMs provides a cloud environment with control
            similar to an on-premises SQL Server installation. :contentReference[oaicite:4]{index=4}
          </p>

          <hr />

          <h2>6. IaaS vs PaaS</h2>

          <p>
            Two important cloud service models for understanding Azure SQL are
            <strong> IaaS</strong> and <strong>PaaS</strong>.
          </p>

          <h3>IaaS — Infrastructure as a Service</h3>

          <p>
            IaaS provides virtualized infrastructure such as virtual machines,
            storage, and networking.
          </p>

          <p>
            In the SQL Server world, SQL Server running on an Azure VM is an
            example of IaaS.
          </p>

          <ul>
            <li>You manage the operating system.</li>
            <li>You manage SQL Server.</li>
            <li>You manage many configuration and maintenance tasks.</li>
            <li>You have significant control over the environment.</li>
          </ul>

          <p>
            <strong>Simple meaning:</strong> You rent the server from the
            cloud provider, but you still manage much of the software
            environment.
          </p>

          <h3>PaaS — Platform as a Service</h3>

          <p>
            PaaS provides a managed platform so that developers and database
            administrators can focus more on their applications and databases
            instead of managing the underlying infrastructure.
          </p>

          <ul>
            <li>Microsoft manages the underlying infrastructure.</li>
            <li>Platform maintenance is largely handled by Microsoft.</li>
            <li>Backups and availability features are built into the service.</li>
            <li>You focus primarily on databases, data, queries, and applications.</li>
          </ul>

          <p>
            <strong>Simple meaning:</strong> Microsoft manages much of the
            platform, while you focus on your database and application.
          </p>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>IaaS — SQL Server on Azure VM</th>
                <th>PaaS — Azure SQL Database / Managed Instance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Physical Hardware</td>
                <td>Microsoft</td>
                <td>Microsoft</td>
              </tr>

              <tr>
                <td>Operating System</td>
                <td>You manage it</td>
                <td>Microsoft manages it</td>
              </tr>

              <tr>
                <td>SQL Server Engine</td>
                <td>You manage it</td>
                <td>Microsoft manages the platform</td>
              </tr>

              <tr>
                <td>Control</td>
                <td>Higher</td>
                <td>Lower than IaaS, but easier to manage</td>
              </tr>

              <tr>
                <td>Management Effort</td>
                <td>Higher</td>
                <td>Lower</td>
              </tr>

              <tr>
                <td>Example</td>
                <td>SQL Server on Azure VM</td>
                <td>Azure SQL Database</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>7. Why Use Azure SQL?</h2>

          <p>
            Consider a government or business application that experiences
            heavy database usage during certain periods of the year.
          </p>

          <p>
            With traditional on-premises infrastructure, the organization may
            need to purchase enough hardware to handle the maximum expected
            workload.
          </p>

          <p>
            Cloud database services provide options for adjusting resources
            according to application requirements.
          </p>

          <h3>Important Benefits</h3>

          <ul>
            <li>
              <strong>Managed Service</strong> — Microsoft handles much of the
              infrastructure and platform maintenance.
            </li>

            <li>
              <strong>Scalability</strong> — Resources can be adjusted based
              on workload requirements.
            </li>

            <li>
              <strong>High Availability</strong> — Azure SQL provides built-in
              availability capabilities.
            </li>

            <li>
              <strong>Security</strong> — Azure provides database security,
              authentication, encryption, networking, and related controls.
            </li>

            <li>
              <strong>Backups</strong> — Managed Azure SQL services provide
              automated backup capabilities.
            </li>

            <li>
              <strong>Global Availability</strong> — Azure provides
              infrastructure across multiple geographic regions.
            </li>

            <li>
              <strong>SQL Server Compatibility</strong> — Azure SQL uses the
              SQL Server database engine and familiar T-SQL concepts.
            </li>
          </ul>

          <p>
            Azure SQL Database provides managed backups, patching, high
            availability, and other database management capabilities. :contentReference[oaicite:5]{index=5}
          </p>

          <hr />

          <h2>8. Azure SQL vs On-Premises SQL Server</h2>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>On-Premises SQL Server</th>
                <th>Azure SQL</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Physical Hardware</td>
                <td>Organization manages it</td>
                <td>Azure infrastructure</td>
              </tr>

              <tr>
                <td>Operating System</td>
                <td>Organization manages it</td>
                <td>Managed by Microsoft for PaaS services</td>
              </tr>

              <tr>
                <td>SQL Server Maintenance</td>
                <td>Organization manages it</td>
                <td>Mostly managed for PaaS services</td>
              </tr>

              <tr>
                <td>Scaling</td>
                <td>May require hardware planning</td>
                <td>Cloud resources can be adjusted</td>
              </tr>

              <tr>
                <td>Backups</td>
                <td>Organization designs and manages backup strategy</td>
                <td>Managed services provide automated backup capabilities</td>
              </tr>

              <tr>
                <td>Infrastructure Location</td>
                <td>Organization's data center</td>
                <td>Azure data centers</td>
              </tr>

              <tr>
                <td>Management Responsibility</td>
                <td>Higher</td>
                <td>Lower for PaaS services</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>9. Azure SQL Deployment Options</h2>

          <h3>9.1 Single Database</h3>

          <p>
            A single Azure SQL Database receives its own database resources
            through a logical Azure SQL server.
          </p>

          <p>
            This model is commonly used for modern cloud applications.
          </p>

          <h3>9.2 Elastic Pool</h3>

          <p>
            An <strong>Elastic Pool</strong> allows multiple Azure SQL
            databases to share a pool of computing resources.
          </p>

          <p>
            This can be useful when multiple databases have varying or
            unpredictable workloads.
          </p>

          <h3>9.3 Managed Instance</h3>

          <p>
            Managed Instance provides a managed SQL Server environment with
            high compatibility for many existing SQL Server applications.
          </p>

          <h3>9.4 SQL Server on Azure VM</h3>

          <p>
            SQL Server runs inside an Azure virtual machine. This provides
            greater control but also requires more administration.
          </p>

          <hr />

          <h2>10. AdventureWorks2022 and Azure SQL</h2>

          <p>
            Throughout this SQL course, we are using
            <strong> AdventureWorks2022</strong> to learn SQL Server concepts.
          </p>

          <p>
            AdventureWorks2022 is our local/on-premises practice database for
            this course.
          </p>

          <p>
            The important idea is that many of the SQL skills students learn
            using AdventureWorks2022 are also useful when working with Azure
            SQL.
          </p>

          <h3>For Example</h3>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <p>
            The important SQL concepts here are:
          </p>

          <ul>
            <li><code>SELECT</code></li>
            <li>Column names</li>
            <li>Tables</li>
            <li>Schemas</li>
            <li>T-SQL</li>
          </ul>

          <p>
            These concepts remain important when working with SQL Server
            databases in Azure.
          </p>

          <p>
            However, students should understand that Azure SQL Database is a
            managed cloud service and does not provide exactly the same
            server-level environment as a traditional SQL Server installation.
          </p>

          <hr />

          <h2>11. Connecting Azure SQL Database with SSMS</h2>

          <p>
            <strong>SQL Server Management Studio (SSMS)</strong> can be used
            to connect to and manage Azure SQL resources.
          </p>

          <h3>Basic Connection Steps</h3>

          <ol>
            <li>Open <strong>SQL Server Management Studio</strong>.</li>

            <li>
              Open the <strong>Connect to Server</strong> window.
            </li>

            <li>
              Set <strong>Server type</strong> to:
              <code> Database Engine</code>
            </li>

            <li>
              Enter the Azure SQL server name, for example:
              <code> myserver.database.windows.net</code>
            </li>

            <li>
              Select an appropriate authentication method.
            </li>

            <li>
              Enter the required credentials.
            </li>

            <li>
              Configure the Azure SQL networking/firewall settings if required.
            </li>

            <li>
              Click <strong>Connect</strong>.
            </li>
          </ol>

          <p>
            Microsoft documents SSMS connections using server names in the
            <code>&lt;server-name&gt;.database.windows.net</code> format and
            supports Microsoft Entra authentication as well as SQL Server
            Authentication. :contentReference[oaicite:6]{index=6}
          </p>

          <hr />

          <h2>12. Azure SQL Authentication</h2>

          <p>
            Azure SQL supports different authentication methods.
          </p>

          <h3>SQL Server Authentication</h3>

          <p>
            A SQL login and password are used to connect to the database.
          </p>

          <h3>Microsoft Entra Authentication</h3>

          <p>
            Microsoft Entra ID can be used to authenticate users and
            applications.
          </p>

          <p>
            Depending on the environment, SSMS provides authentication
            options such as Microsoft Entra MFA, Microsoft Entra Integrated,
            Microsoft Entra Password, and other Microsoft Entra-based
            authentication methods. :contentReference[oaicite:7]{index=7}
          </p>

          <p>
            <strong>Note:</strong> Microsoft Entra ID was previously known as
            Azure Active Directory (Azure AD).
          </p>

          <hr />

          <h2>13. Azure SQL Firewall</h2>

          <p>
            Azure SQL networking controls which clients can connect to the
            service.
          </p>

          <p>
            If a student's computer cannot connect to an Azure SQL Database,
            one possible reason is that the client's network access has not
            been allowed by the configured firewall rules.
          </p>

          <p>
            Therefore, when connecting from SSMS, students should understand
            that successful authentication alone may not be enough. Network
            access must also be configured appropriately.
          </p>

          <p>
            Microsoft includes firewall configuration as part of the Azure SQL
            connection process. :contentReference[oaicite:8]{index=8}
          </p>

          <hr />

          <h2>14. Creating an Azure SQL Database — Overview</h2>

          <p>
            The Azure Portal can be used to create an Azure SQL Database.
          </p>

          <h3>High-Level Process</h3>

          <ol>
            <li>Open the Azure Portal.</li>

            <li>
              Search for <strong>Azure SQL</strong>.
            </li>

            <li>
              Select <strong>SQL databases</strong>.
            </li>

            <li>
              Select <strong>Create</strong>.
            </li>

            <li>
              Select or create a resource group.
            </li>

            <li>
              Enter the database name.
            </li>

            <li>
              Select or create the logical SQL server.
            </li>

            <li>
              Configure compute and storage options.
            </li>

            <li>
              Configure networking and firewall settings.
            </li>

            <li>
              Review the configuration.
            </li>

            <li>
              Create the resource.
            </li>
          </ol>

          <p>
            <strong>Important:</strong> Azure resources can incur charges
            depending on the selected configuration and usage. Students
            should check the current Azure pricing and free-account terms
            before creating resources.
          </p>

          <hr />

          <h2>15. Practical — Connecting SQL Knowledge to Azure</h2>

          <p>
            If you have access to Azure SQL, perform the following practical.
            If you do not have an Azure subscription, complete the theoretical
            portion and continue using your local AdventureWorks2022 database.
          </p>

          <h3>Practical 1 — Local AdventureWorks2022</h3>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 2 — Understand the Database</h3>

          <pre>
            <code>{`SELECT
    DB_NAME() AS CurrentDatabase;
GO`}</code>
          </pre>

          <h3>Practical 3 — Check Tables</h3>

          <pre>
            <code>{`SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}</code>
          </pre>

          <h3>Practical 4 — Compare the Environment</h3>

          <p>
            Discuss the following with your instructor:
          </p>

          <ul>
            <li>
              Local SQL Server → You manage the SQL Server installation.
            </li>

            <li>
              Azure SQL Database → Microsoft manages the database platform.
            </li>

            <li>
              Both environments use SQL concepts such as tables, queries,
              relationships, constraints, and T-SQL.
            </li>
          </ul>

          <h3>Practical 5 — Azure SQL Connection</h3>

          <p>
            If an Azure SQL Database has been provided by the instructor,
            connect to it using SSMS.
          </p>

          <ol>
            <li>Open SSMS.</li>
            <li>Select Database Engine.</li>
            <li>Enter the Azure SQL server name.</li>
            <li>Select the assigned authentication method.</li>
            <li>Enter credentials if required.</li>
            <li>Connect.</li>
            <li>Run a simple SELECT query.</li>
          </ol>

          <pre>
            <code>{`SELECT
    DB_NAME() AS CurrentDatabase;
GO`}</code>
          </pre>

          <hr />

          <h2>16. Best Practices</h2>

          <ul>
            <li>
              Understand the difference between Azure SQL Database, Managed
              Instance, and SQL Server on Azure VM.
            </li>

            <li>
              Choose PaaS when you want less infrastructure management.
            </li>

            <li>
              Choose IaaS when you need greater operating-system and
              SQL Server control.
            </li>

            <li>
              Use strong authentication methods and follow organizational
              security policies.
            </li>

            <li>
              Configure networking and firewall access carefully.
            </li>

            <li>
              Do not expose database access unnecessarily to the Internet.
            </li>

            <li>
              Monitor Azure resource usage and costs.
            </li>

            <li>
              Continue using AdventureWorks2022 locally for course exercises
              when Azure access is unavailable.
            </li>
          </ul>

          <hr />

          <h2>Session 7 Exercise</h2>

          <ol>
            <li>
              What is cloud computing?
            </li>

            <li>
              What is Azure SQL?
            </li>

            <li>
              Explain the difference between Azure SQL Database and Azure SQL
              Managed Instance.
            </li>

            <li>
              Explain the difference between PaaS and IaaS.
            </li>

            <li>
              What is SQL Server on Azure Virtual Machines?
            </li>

            <li>
              List five benefits of using Azure SQL.
            </li>

            <li>
              Explain two differences between on-premises SQL Server and Azure
              SQL Database.
            </li>

            <li>
              Why might an organization choose SQL Server on an Azure VM
              instead of Azure SQL Database?
            </li>

            <li>
              What is the purpose of an Azure SQL firewall rule?
            </li>

            <li>
              What is the typical server name format for Azure SQL Database?
            </li>
          </ol>

          <hr />

          <h2>Session 7 Challenge</h2>

          <p>
            Research and answer the following questions:
          </p>

          <ol>
            <li>
              What is the difference between the DTU and vCore purchasing
              models?
            </li>

            <li>
              What is an Elastic Pool?
            </li>

            <li>
              Why might an organization use Azure SQL Managed Instance for
              migration?
            </li>

            <li>
              What is Microsoft Entra authentication?
            </li>

            <li>
              Why is firewall configuration important for Azure SQL?
            </li>

            <li>
              What happens if your computer's network access is not allowed
              by the Azure SQL firewall configuration?
            </li>

            <li>
              <strong>Optional Practical:</strong> If you have an Azure
              subscription provided by your instructor, connect to the Azure
              SQL database using SSMS and execute:
            </li>
          </ol>

          <pre>
            <code>{`SELECT
    DB_NAME() AS CurrentDatabase,
    @@VERSION AS SQLServerVersion;
GO`}</code>
          </pre>

          <p>
            Do not create paid Azure resources without instructor or account
            owner approval.
          </p>

          <hr />

          <h2>Session 7 Quiz</h2>

          <ol>
            <li>
              What is Azure SQL?
            </li>

            <li>
              Name the three main Azure SQL deployment options.
            </li>

            <li>
              What does PaaS stand for?
            </li>

            <li>
              What does IaaS stand for?
            </li>

            <li>
              What is the difference between Azure SQL Database and SQL Server
              on an Azure VM?
            </li>

            <li>
              What is Azure SQL Managed Instance?
            </li>

            <li>
              List four benefits of Azure SQL.
            </li>

            <li>
              Can SSMS be used to connect to Azure SQL?
            </li>

            <li>
              What is the typical server name format for Azure SQL Database?
            </li>

            <li>
              Why may firewall configuration be required before connecting to
              Azure SQL?
            </li>

            <li>
              What is Microsoft Entra authentication?
            </li>

            <li>
              What is an Elastic Pool?
            </li>

            <li>
              How is AdventureWorks2022 useful when learning Azure SQL?
            </li>

            <li>
              Which Azure SQL option provides the greatest level of control
              over the operating system and SQL Server environment?
            </li>
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






// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';

// export default function Session07() {
//   return (
//     <Layout
//       title="Session 07 — Microsoft Azure SQL"
//       description="Microsoft Azure SQL — Cloud Database, Features, Benefits, Differences from On-Premises SQL Server, Connecting with SSMS"
//     >
//       <CustomLayout>
//         <article className="session-content">
//           <h1>Session 07 — Microsoft Azure SQL</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p><strong>Focus:</strong> Understanding Azure SQL and how it differs from on-premises SQL Server.</p>
//           <p><strong>Based on:</strong> Official Aptech Book – Session 7</p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>Explain Azure SQL</li>
//             <li>List the features and benefits of Azure SQL</li>
//             <li>State the differences between Azure SQL and on-premises SQL Server</li>
//             <li>Explain steps to connect Azure SQL with SSMS</li>
//           </ul>

//           <hr />

//           <h2>1. Introduction to Cloud Computing</h2>
//           <p>Cloud computing is a technology trend that involves delivery of software, platforms, and infrastructure as services through the Internet.</p>

//           <p>Microsoft Azure is Microsoft’s cloud computing platform that provides a wide range of services including computing, storage, networking, analytics, and databases.</p>

//           <p>The database services of Microsoft’s cloud platform are provided by <strong>Azure SQL</strong>.</p>

//           <hr />

//           <h2>2. What is Azure SQL?</h2>
//           <p><strong>Azure SQL</strong> is a family of managed, secure, and intelligent products that use the SQL Server database engine in the Azure cloud.</p>

//           <p>It is not a single product. It includes:</p>
//           <ul>
//             <li><strong>Azure SQL Database</strong> – Fully managed Platform-as-a-Service (PaaS) database</li>
//             <li><strong>Azure SQL Managed Instance</strong> – Near 100% compatibility with on-premises SQL Server (PaaS)</li>
//             <li><strong>SQL Server on Azure Virtual Machines</strong> – Infrastructure-as-a-Service (IaaS)</li>
//           </ul>

//         <h2>2.1 Understanding IaaS and PaaS</h2>

//         <p>When we talk about cloud services, two important terms are <strong>IaaS</strong> and <strong>PaaS</strong>.</p>
        
//         <h3>IaaS – Infrastructure as a Service</h3>
//         <p>
//           <strong>IaaS</strong> provides virtualized computing resources over the internet 
//           (virtual machines, storage, networking).
//         </p>
//         <ul>
//           <li>You manage the operating system, SQL Server installation, updates, and patches.</li>
//           <li>Microsoft only manages the physical hardware and virtualization layer.</li>
//           <li><strong>Example in Azure:</strong> SQL Server on Azure Virtual Machines</li>
//         </ul>
        
//         <p><strong>Simple meaning:</strong> You rent the server, but you still manage everything on it (just like a traditional server, but in the cloud).</p>
        
//         <h3>PaaS – Platform as a Service</h3>
//         <p>
//           <strong>PaaS</strong> provides a complete platform for developing, running, and managing applications 
//           without managing the underlying infrastructure.
//         </p>
//         <ul>
//           <li>Microsoft manages the operating system, SQL Server engine, patching, backups, and high availability.</li>
//           <li>You only manage your databases, data, and queries.</li>
//           <li><strong>Examples in Azure:</strong> Azure SQL Database and Azure SQL Managed Instance</li>
//         </ul>
        
//         <p><strong>Simple meaning:</strong> You only focus on the database and data. Microsoft takes care of the server, operating system, and SQL Server software.</p>
        
//         <table>
//           <thead>
//             <tr>
//               <th>Feature</th>
//               <th>IaaS (SQL Server on Azure VM)</th>
//               <th>PaaS (Azure SQL Database / Managed Instance)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Who manages Hardware?</td>
//               <td>Microsoft</td>
//               <td>Microsoft</td>
//             </tr>
//             <tr>
//               <td>Who manages Operating System?</td>
//               <td>You</td>
//               <td>Microsoft</td>
//             </tr>
//             <tr>
//               <td>Who manages SQL Server software?</td>
//               <td>You</td>
//               <td>Microsoft</td>
//             </tr>
//             <tr>
//               <td>Who manages Backups &amp; High Availability?</td>
//               <td>You</td>
//               <td>Microsoft</td>
//             </tr>
//             <tr>
//               <td>Level of Control</td>
//               <td>Very High</td>
//               <td>Medium to High</td>
//             </tr>
//             <tr>
//               <td>Management Effort</td>
//               <td>High</td>
//               <td>Low</td>
//             </tr>
//           </tbody>
//         </table>
        

//           <p>Azure SQL was earlier known by names such as SQL Azure and SQL Server Data Services.</p>

//           <hr />

//           <h2>3. Why Use Azure SQL? (Benefits)</h2>
//           <p>Consider a scenario of an Income Tax department:</p>
//           <ul>
//             <li>During March (peak season) → Heavy workload</li>
//             <li>Rest of the year → Resources are under-utilized</li>
//           </ul>

//           <p>With traditional on-premises servers, you have to buy and maintain hardware for the peak load all year. With Azure SQL, you can scale resources up or down as needed and pay only for what you use.</p>

//           <h3>Key Benefits</h3>
//           <ul>
//             <li><strong>Fully Managed</strong> – Microsoft handles backups, patching, high availability, and maintenance</li>
//             <li><strong>Scalability</strong> – Easily scale up or down based on demand</li>
//             <li><strong>High Availability</strong> – Built-in high availability and disaster recovery</li>
//             <li><strong>Security</strong> – Advanced threat protection, encryption, firewall rules, and Azure AD authentication</li>
//             <li><strong>Intelligence</strong> – Built-in AI and machine learning features for performance tuning and security</li>
//             <li><strong>Cost Efficiency</strong> – Pay-as-you-go model</li>
//             <li><strong>Global Reach</strong> – Deploy databases close to your users in different Azure regions</li>
//             <li><strong>Compatibility</strong> – Uses the same T-SQL language as on-premises SQL Server</li>
//           </ul>

//           <hr />

//           <h2>4. Azure SQL vs On-Premises SQL Server</h2>

//           <table>
//             <thead>
//               <tr>
//                 <th>Feature</th>
//                 <th>On-Premises SQL Server</th>
//                 <th>Azure SQL</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Management</td>
//                 <td>You manage hardware, OS, and SQL Server</td>
//                 <td>Microsoft manages most of the infrastructure</td>
//               </tr>
//               <tr>
//                 <td>Hardware</td>
//                 <td>You buy and maintain servers</td>
//                 <td>No hardware purchase required</td>
//               </tr>
//               <tr>
//                 <td>Scaling</td>
//                 <td>Manual and time-consuming</td>
//                 <td>Quick and easy (scale up/down)</td>
//               </tr>
//               <tr>
//                 <td>High Availability</td>
//                 <td>You configure Always On, clustering, etc.</td>
//                 <td>Built-in high availability</td>
//               </tr>
//               <tr>
//                 <td>Backups</td>
//                 <td>You configure and manage</td>
//                 <td>Automated backups</td>
//               </tr>
//               <tr>
//                 <td>Cost Model</td>
//                 <td>High upfront cost + maintenance</td>
//                 <td>Pay-as-you-go</td>
//               </tr>
//               <tr>
//                 <td>Updates &amp; Patching</td>
//                 <td>Manual</td>
//                 <td>Automatic</td>
//               </tr>
//               <tr>
//                 <td>Location</td>
//                 <td>Your data center</td>
//                 <td>Microsoft Azure data centers</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>5. Deployment Options in Azure SQL</h2>
//           <ul>
//             <li><strong>Single Database</strong> – Best for modern cloud applications</li>
//             <li><strong>Elastic Pool</strong> – Multiple databases sharing resources (cost-effective for many small databases)</li>
//             <li><strong>Managed Instance</strong> – Best for migrating existing on-premises applications with minimal changes</li>
//             <li><strong>SQL Server on Azure VM</strong> – Full control (almost like on-premises)</li>
//           </ul>

//           <hr />

//           <h2>6. Connecting Azure SQL Database with SSMS</h2>
//           <p>You can manage Azure SQL databases using the same SQL Server Management Studio (SSMS) that you use for on-premises servers.</p>

//           <h3>Steps to Connect</h3>
//           <ol>
//             <li>Open <strong>SQL Server Management Studio (SSMS)</strong></li>
//             <li>In the Connect to Server window:
//               <ul>
//                 <li><strong>Server type</strong>: Database Engine</li>
//                 <li><strong>Server name</strong>: Your Azure SQL server name  
//                   (example: <code>myserver.database.windows.net</code>)</li>
//                 <li><strong>Authentication</strong>:  
//                   - SQL Server Authentication, or  
//                   - Azure Active Directory authentication</li>
//                 <li>Enter Login and Password</li>
//               </ul>
//             </li>
//             <li>Click <strong>Connect</strong></li>
//           </ol>

//           <h3>Important Notes</h3>
//           <ul>
//             <li>You must add your client IP address in the Azure SQL Firewall rules</li>
//             <li>By default, Azure SQL blocks all external connections until you configure the firewall</li>
//             <li>You can also connect using Azure Data Studio or Visual Studio</li>
//           </ul>

//           <hr />

//           <h2>7. Creating an Azure SQL Database (Overview)</h2>
//           <p>High-level steps in Azure Portal:</p>
//           <ol>
//             <li>Go to Azure Portal → Create a resource → SQL Database</li>
//             <li>Select subscription and resource group</li>
//             <li>Enter database name and server details</li>
//             <li>Choose compute + storage (Basic, Standard, Premium, or vCore-based)</li>
//             <li>Configure networking (firewall rules)</li>
//             <li>Review + Create</li>
//           </ol>

//           <hr />

//           <h2>Session 7 Exercise</h2>
//           <ol>
//             <li>Explain the difference between IaaS and PaaS in the context of Azure SQL.</li>
//             <li>List any five benefits of using Azure SQL over traditional on-premises SQL Server.</li>
//             <li>What is the main difference between Azure SQL Database and Azure SQL Managed Instance?</li>
//             <li>Why do we need to configure firewall rules when connecting to Azure SQL?</li>
//             <li>Write the typical server name format used when connecting to Azure SQL Database from SSMS.</li>
//           </ol>

//           <hr />

//           <h2>Session 7 Challenge</h2>
//           <p>Research and answer the following:</p>
//           <ol>
//             <li>What is DTU and vCore purchasing model in Azure SQL?</li>
//             <li>What is the difference between Single Database and Elastic Pool?</li>
//             <li>List three authentication methods supported by Azure SQL.</li>
//             <li>(Optional Practical) If you have an Azure free account, try creating a free Azure SQL Database and connect it using SSMS.</li>
//           </ol>

//           <hr />

//           <h2>Session 7 Quiz</h2>
//           <ol>
//             <li>What is Azure SQL?</li>
//             <li>Name the three main deployment options under Azure SQL.</li>
//             <li>What does PaaS stand for?</li>
//             <li>List any four benefits of Azure SQL.</li>
//             <li>What is the major advantage of Azure SQL Managed Instance?</li>
//             <li>Can you use SSMS to manage Azure SQL databases?</li>
//             <li>What must you configure before connecting to Azure SQL from your local computer?</li>
//             <li>What is the difference between on-premises SQL Server and Azure SQL Database in terms of management?</li>
//             <li>What is an Elastic Pool?</li>
//             <li>Which Azure SQL option gives you the highest compatibility with on-premises SQL Server?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 08):</strong> Accessing Data</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
