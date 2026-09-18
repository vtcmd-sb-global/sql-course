import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session07() {
  return (
    <Layout
      title="Session 07 — Microsoft Azure SQL"
      description="Microsoft Azure SQL — Cloud Database, Features, Benefits, Differences from On-Premises SQL Server, Connecting with SSMS"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 07 — Microsoft Azure SQL</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding Azure SQL and how it differs from on-premises SQL Server.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 7</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain Azure SQL</li>
            <li>List the features and benefits of Azure SQL</li>
            <li>State the differences between Azure SQL and on-premises SQL Server</li>
            <li>Explain steps to connect Azure SQL with SSMS</li>
          </ul>

          <hr />

          <h2>1. Introduction to Cloud Computing</h2>
          <p>Cloud computing is a technology trend that involves delivery of software, platforms, and infrastructure as services through the Internet.</p>

          <p>Microsoft Azure is Microsoft’s cloud computing platform that provides a wide range of services including computing, storage, networking, analytics, and databases.</p>

          <p>The database services of Microsoft’s cloud platform are provided by <strong>Azure SQL</strong>.</p>

          <hr />

          <h2>2. What is Azure SQL?</h2>
          <p><strong>Azure SQL</strong> is a family of managed, secure, and intelligent products that use the SQL Server database engine in the Azure cloud.</p>

          <p>It is not a single product. It includes:</p>
          <ul>
            <li><strong>Azure SQL Database</strong> – Fully managed Platform-as-a-Service (PaaS) database</li>
            <li><strong>Azure SQL Managed Instance</strong> – Near 100% compatibility with on-premises SQL Server (PaaS)</li>
            <li><strong>SQL Server on Azure Virtual Machines</strong> – Infrastructure-as-a-Service (IaaS)</li>
          </ul>

        <h2>2.1 Understanding IaaS and PaaS</h2>

        <p>When we talk about cloud services, two important terms are <strong>IaaS</strong> and <strong>PaaS</strong>.</p>
        
        <h3>IaaS – Infrastructure as a Service</h3>
        <p>
          <strong>IaaS</strong> provides virtualized computing resources over the internet 
          (virtual machines, storage, networking).
        </p>
        <ul>
          <li>You manage the operating system, SQL Server installation, updates, and patches.</li>
          <li>Microsoft only manages the physical hardware and virtualization layer.</li>
          <li><strong>Example in Azure:</strong> SQL Server on Azure Virtual Machines</li>
        </ul>
        
        <p><strong>Simple meaning:</strong> You rent the server, but you still manage everything on it (just like a traditional server, but in the cloud).</p>
        
        <h3>PaaS – Platform as a Service</h3>
        <p>
          <strong>PaaS</strong> provides a complete platform for developing, running, and managing applications 
          without managing the underlying infrastructure.
        </p>
        <ul>
          <li>Microsoft manages the operating system, SQL Server engine, patching, backups, and high availability.</li>
          <li>You only manage your databases, data, and queries.</li>
          <li><strong>Examples in Azure:</strong> Azure SQL Database and Azure SQL Managed Instance</li>
        </ul>
        
        <p><strong>Simple meaning:</strong> You only focus on the database and data. Microsoft takes care of the server, operating system, and SQL Server software.</p>
        
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>IaaS (SQL Server on Azure VM)</th>
              <th>PaaS (Azure SQL Database / Managed Instance)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Who manages Hardware?</td>
              <td>Microsoft</td>
              <td>Microsoft</td>
            </tr>
            <tr>
              <td>Who manages Operating System?</td>
              <td>You</td>
              <td>Microsoft</td>
            </tr>
            <tr>
              <td>Who manages SQL Server software?</td>
              <td>You</td>
              <td>Microsoft</td>
            </tr>
            <tr>
              <td>Who manages Backups &amp; High Availability?</td>
              <td>You</td>
              <td>Microsoft</td>
            </tr>
            <tr>
              <td>Level of Control</td>
              <td>Very High</td>
              <td>Medium to High</td>
            </tr>
            <tr>
              <td>Management Effort</td>
              <td>High</td>
              <td>Low</td>
            </tr>
          </tbody>
        </table>
        

          <p>Azure SQL was earlier known by names such as SQL Azure and SQL Server Data Services.</p>

          <hr />

          <h2>3. Why Use Azure SQL? (Benefits)</h2>
          <p>Consider a scenario of an Income Tax department:</p>
          <ul>
            <li>During March (peak season) → Heavy workload</li>
            <li>Rest of the year → Resources are under-utilized</li>
          </ul>

          <p>With traditional on-premises servers, you have to buy and maintain hardware for the peak load all year. With Azure SQL, you can scale resources up or down as needed and pay only for what you use.</p>

          <h3>Key Benefits</h3>
          <ul>
            <li><strong>Fully Managed</strong> – Microsoft handles backups, patching, high availability, and maintenance</li>
            <li><strong>Scalability</strong> – Easily scale up or down based on demand</li>
            <li><strong>High Availability</strong> – Built-in high availability and disaster recovery</li>
            <li><strong>Security</strong> – Advanced threat protection, encryption, firewall rules, and Azure AD authentication</li>
            <li><strong>Intelligence</strong> – Built-in AI and machine learning features for performance tuning and security</li>
            <li><strong>Cost Efficiency</strong> – Pay-as-you-go model</li>
            <li><strong>Global Reach</strong> – Deploy databases close to your users in different Azure regions</li>
            <li><strong>Compatibility</strong> – Uses the same T-SQL language as on-premises SQL Server</li>
          </ul>

          <hr />

          <h2>4. Azure SQL vs On-Premises SQL Server</h2>

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
                <td>Management</td>
                <td>You manage hardware, OS, and SQL Server</td>
                <td>Microsoft manages most of the infrastructure</td>
              </tr>
              <tr>
                <td>Hardware</td>
                <td>You buy and maintain servers</td>
                <td>No hardware purchase required</td>
              </tr>
              <tr>
                <td>Scaling</td>
                <td>Manual and time-consuming</td>
                <td>Quick and easy (scale up/down)</td>
              </tr>
              <tr>
                <td>High Availability</td>
                <td>You configure Always On, clustering, etc.</td>
                <td>Built-in high availability</td>
              </tr>
              <tr>
                <td>Backups</td>
                <td>You configure and manage</td>
                <td>Automated backups</td>
              </tr>
              <tr>
                <td>Cost Model</td>
                <td>High upfront cost + maintenance</td>
                <td>Pay-as-you-go</td>
              </tr>
              <tr>
                <td>Updates &amp; Patching</td>
                <td>Manual</td>
                <td>Automatic</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>Your data center</td>
                <td>Microsoft Azure data centers</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>5. Deployment Options in Azure SQL</h2>
          <ul>
            <li><strong>Single Database</strong> – Best for modern cloud applications</li>
            <li><strong>Elastic Pool</strong> – Multiple databases sharing resources (cost-effective for many small databases)</li>
            <li><strong>Managed Instance</strong> – Best for migrating existing on-premises applications with minimal changes</li>
            <li><strong>SQL Server on Azure VM</strong> – Full control (almost like on-premises)</li>
          </ul>

          <hr />

          <h2>6. Connecting Azure SQL Database with SSMS</h2>
          <p>You can manage Azure SQL databases using the same SQL Server Management Studio (SSMS) that you use for on-premises servers.</p>

          <h3>Steps to Connect</h3>
          <ol>
            <li>Open <strong>SQL Server Management Studio (SSMS)</strong></li>
            <li>In the Connect to Server window:
              <ul>
                <li><strong>Server type</strong>: Database Engine</li>
                <li><strong>Server name</strong>: Your Azure SQL server name  
                  (example: <code>myserver.database.windows.net</code>)</li>
                <li><strong>Authentication</strong>:  
                  - SQL Server Authentication, or  
                  - Azure Active Directory authentication</li>
                <li>Enter Login and Password</li>
              </ul>
            </li>
            <li>Click <strong>Connect</strong></li>
          </ol>

          <h3>Important Notes</h3>
          <ul>
            <li>You must add your client IP address in the Azure SQL Firewall rules</li>
            <li>By default, Azure SQL blocks all external connections until you configure the firewall</li>
            <li>You can also connect using Azure Data Studio or Visual Studio</li>
          </ul>

          <hr />

          <h2>7. Creating an Azure SQL Database (Overview)</h2>
          <p>High-level steps in Azure Portal:</p>
          <ol>
            <li>Go to Azure Portal → Create a resource → SQL Database</li>
            <li>Select subscription and resource group</li>
            <li>Enter database name and server details</li>
            <li>Choose compute + storage (Basic, Standard, Premium, or vCore-based)</li>
            <li>Configure networking (firewall rules)</li>
            <li>Review + Create</li>
          </ol>

          <hr />

          <h2>Session 7 Exercise</h2>
          <ol>
            <li>Explain the difference between IaaS and PaaS in the context of Azure SQL.</li>
            <li>List any five benefits of using Azure SQL over traditional on-premises SQL Server.</li>
            <li>What is the main difference between Azure SQL Database and Azure SQL Managed Instance?</li>
            <li>Why do we need to configure firewall rules when connecting to Azure SQL?</li>
            <li>Write the typical server name format used when connecting to Azure SQL Database from SSMS.</li>
          </ol>

          <hr />

          <h2>Session 7 Challenge</h2>
          <p>Research and answer the following:</p>
          <ol>
            <li>What is DTU and vCore purchasing model in Azure SQL?</li>
            <li>What is the difference between Single Database and Elastic Pool?</li>
            <li>List three authentication methods supported by Azure SQL.</li>
            <li>(Optional Practical) If you have an Azure free account, try creating a free Azure SQL Database and connect it using SSMS.</li>
          </ol>

          <hr />

          <h2>Session 7 Quiz</h2>
          <ol>
            <li>What is Azure SQL?</li>
            <li>Name the three main deployment options under Azure SQL.</li>
            <li>What does PaaS stand for?</li>
            <li>List any four benefits of Azure SQL.</li>
            <li>What is the major advantage of Azure SQL Managed Instance?</li>
            <li>Can you use SSMS to manage Azure SQL databases?</li>
            <li>What must you configure before connecting to Azure SQL from your local computer?</li>
            <li>What is the difference between on-premises SQL Server and Azure SQL Database in terms of management?</li>
            <li>What is an Elastic Pool?</li>
            <li>Which Azure SQL option gives you the highest compatibility with on-premises SQL Server?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 08):</strong> Accessing Data</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
