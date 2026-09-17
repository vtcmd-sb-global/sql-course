import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session01() {
  return (
    <Layout
      title="Session 01 — RDBMS Concepts"
      description="RDBMS Concepts — Data, Database, DBMS, Database Models, RDBMS, Entities and Tables"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 01 — RDBMS Concepts</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Building a strong foundation of database concepts before touching SQL Server.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 1 (RDBMS Concepts)</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain the concept of <strong>data</strong> and <strong>database</strong></li>
            <li>Describe the different approaches to data management</li>
            <li>Define a <strong>Database Management System (DBMS)</strong> and list its benefits</li>
            <li>Explain the major database models</li>
            <li>Define and explain <strong>RDBMS</strong></li>
            <li>Describe <strong>entities</strong> and <strong>tables</strong> and list the characteristics of tables</li>
            <li>List the key differences between a DBMS and an RDBMS</li>
          </ul>

          <hr />

          <h2>1. What is Data?</h2>
          <p><strong>Data</strong> means raw facts or figures. It has no meaning by itself until it is processed or organized.</p>

          <p><strong>Examples of data:</strong></p>
          <ul>
            <li>85</li>
            <li>Ali</li>
            <li>03001234567</li>
            <li>15-08-2025</li>
          </ul>

          <p>When we process or organize this data, it becomes <strong>information</strong>.</p>

          <p><strong>Example:</strong><br />
          “Ali scored 85 marks in the exam held on 15-08-2025” → This is information.</p>

          <hr />

          <h2>2. What is a Database?</h2>
          <p>A <strong>database</strong> is an organized collection of related data that can be easily accessed, managed, and updated.</p>

          <p>Think of a database as a well-organized digital filing cabinet.</p>

          <p><strong>Real-life examples:</strong></p>
          <ul>
            <li>Student records in a college</li>
            <li>Customer and order information in an online store</li>
            <li>Employee details and salary records in a company</li>
            <li>Patient records in a hospital</li>
          </ul>

          <p><strong>Key point from the book:</strong><br />
          A database consists of one or more related data items called <strong>records</strong>. Different questions can be asked on this data.</p>

          <hr />

          <h2>3. Approaches to Data Management</h2>
          <p>There are two main approaches:</p>

          <h3>A. File-Based Approach (Traditional Method)</h3>
          <ul>
            <li>Data is stored in separate files (Excel, text files, etc.)</li>
            <li>Each department maintains its own files</li>
          </ul>

          <p><strong>Problems:</strong></p>
          <ul>
            <li>Data redundancy (same data stored multiple times)</li>
            <li>Data inconsistency</li>
            <li>Difficulty in sharing data</li>
            <li>Hard to maintain security and integrity</li>
          </ul>

          <h3>B. Database Approach</h3>
          <ul>
            <li>All data is stored in a central database</li>
            <li>Multiple users and applications can access the same data</li>
            <li>Controlled by a Database Management System (DBMS)</li>
          </ul>

          <p>The database approach solves most problems of the file-based approach.</p>

          <hr />

          <h2>4. What is a DBMS?</h2>
          <p>A <strong>Database Management System (DBMS)</strong> is software that helps us create, manage, and control databases.</p>

          <p><strong>Popular DBMS examples:</strong></p>
          <ul>
            <li>Microsoft SQL Server</li>
            <li>MySQL</li>
            <li>Oracle</li>
            <li>PostgreSQL</li>
            <li>MongoDB (NoSQL)</li>
          </ul>

          <p><strong>Main benefits of a DBMS (as per the book):</strong></p>
          <ul>
            <li>Reduced data redundancy</li>
            <li>Improved data consistency</li>
            <li>Better data security</li>
            <li>Data integrity</li>
            <li>Easy data sharing</li>
            <li>Backup and recovery facilities</li>
            <li>Concurrent access by multiple users</li>
          </ul>

          <hr />

          <h2>5. Database Models</h2>
          <p>A database model defines how data is structured and related.</p>

          <p><strong>Major models:</strong></p>

          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Description</th>
                <th>Example Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hierarchical</td>
                <td>Data organized like a tree (parent-child)</td>
                <td>Old mainframe systems</td>
              </tr>
              <tr>
                <td>Network</td>
                <td>More flexible than hierarchical (many-to-many)</td>
                <td>Early complex systems</td>
              </tr>
              <tr>
                <td>Relational</td>
                <td>Data stored in tables (rows &amp; columns)</td>
                <td>Most modern systems</td>
              </tr>
              <tr>
                <td>Object-Oriented</td>
                <td>Data stored as objects</td>
                <td>Complex applications</td>
              </tr>
              <tr>
                <td>Document / NoSQL</td>
                <td>Flexible, document-based</td>
                <td>Big data, web apps</td>
              </tr>
            </tbody>
          </table>

          <p>The most widely used model today is the <strong>Relational Model</strong>.</p>

          <hr />

          <h2>6. What is RDBMS?</h2>
          <p><strong>RDBMS</strong> stands for <strong>Relational Database Management System</strong>.</p>

          <p>It is a DBMS that is based on the <strong>relational model</strong>.</p>

          <p>In an RDBMS:</p>
          <ul>
            <li>Data is stored in <strong>tables</strong></li>
            <li>Tables are related to each other using <strong>keys</strong></li>
            <li>You use <strong>SQL</strong> (Structured Query Language) to work with data</li>
          </ul>

          <p><strong>Examples of RDBMS:</strong></p>
          <ul>
            <li>Microsoft SQL Server</li>
            <li>MySQL</li>
            <li>Oracle Database</li>
            <li>PostgreSQL</li>
            <li>MariaDB</li>
          </ul>

          <p>SQL Server 2022 (the focus of this course) is a powerful RDBMS.</p>

          <hr />

          <h2>7. Entities and Tables</h2>

          <h3>Entity</h3>
          <p>An <strong>entity</strong> is a real-world object about which we want to store data.</p>

          <p><strong>Examples:</strong></p>
          <ul>
            <li>Student</li>
            <li>Employee</li>
            <li>Customer</li>
            <li>Product</li>
            <li>Order</li>
          </ul>

          <h3>Table</h3>
          <p>In an RDBMS, an entity is represented as a <strong>table</strong>.</p>

          <p>A table consists of:</p>
          <ul>
            <li><strong>Rows</strong> (also called records or tuples)</li>
            <li><strong>Columns</strong> (also called fields or attributes)</li>
          </ul>

          <p><strong>Example: Student Table</strong></p>

          <table>
            <thead>
              <tr>
                <th>StudentID</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>101</td>
                <td>Ali</td>
                <td>20</td>
                <td>Karachi</td>
                <td>SQL</td>
              </tr>
              <tr>
                <td>102</td>
                <td>Sara</td>
                <td>21</td>
                <td>Lahore</td>
                <td>C#</td>
              </tr>
              <tr>
                <td>103</td>
                <td>Ahmed</td>
                <td>19</td>
                <td>Islamabad</td>
                <td>Web</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>8. Characteristics of Tables</h2>
          <p>According to the book, tables have the following important characteristics:</p>
          <ol>
            <li>Each table has a unique name</li>
            <li>Each column has a unique name within the table</li>
            <li>Order of rows and columns does not matter</li>
            <li>Each row is unique (no duplicate rows)</li>
            <li>Each column contains data of the same type</li>
            <li>Intersection of a row and column contains a single value (atomic)</li>
          </ol>

          <hr />

          <h2>9. Differences between DBMS and RDBMS</h2>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>DBMS</th>
                <th>RDBMS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data Storage</td>
                <td>Files or hierarchical</td>
                <td>Tables (rows &amp; columns)</td>
              </tr>
              <tr>
                <td>Relationship</td>
                <td>Limited or no relationships</td>
                <td>Strong relationships using keys</td>
              </tr>
              <tr>
                <td>Data Redundancy</td>
                <td>Higher</td>
                <td>Lower</td>
              </tr>
              <tr>
                <td>Normalization</td>
                <td>Not strictly followed</td>
                <td>Strongly supported</td>
              </tr>
              <tr>
                <td>Data Integrity</td>
                <td>Limited</td>
                <td>High (constraints, keys)</td>
              </tr>
              <tr>
                <td>Examples</td>
                <td>Early file systems, some old DBMS</td>
                <td>SQL Server, MySQL, Oracle</td>
              </tr>
              <tr>
                <td>Access Language</td>
                <td>Varies</td>
                <td>Primarily SQL</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Simple way to remember:</strong><br />
          Every RDBMS is a DBMS, but not every DBMS is an RDBMS.</p>

          <hr />

          <h2>Session 1 Exercise</h2>
          <ol>
            <li>List 5 real-life examples of databases you use or see around you.</li>
            <li>Write the difference between data and information with your own example.</li>
            <li>Why is the file-based approach not preferred in large organizations?</li>
            <li>Convert the following information into a table format:<br />
              “There are three employees: Ali (age 28, Karachi), Sara (age 25, Lahore), and Usman (age 30, Islamabad).”
            </li>
          </ol>

          <hr />

          <h2>Session 1 Challenge</h2>
          <p>Create a small table (on paper or in Excel) for a <strong>Library System</strong> with at least these entities:</p>
          <ul>
            <li>Books</li>
            <li>Members</li>
            <li>Issue/Return records</li>
          </ul>

          <p>Write down:</p>
          <ul>
            <li>What columns each table should have</li>
            <li>How the tables might be related</li>
          </ul>

          <hr />

          <h2>Session 1 Quiz</h2>
          <ol>
            <li>What is the difference between data and information?</li>
            <li>Define a database.</li>
            <li>What are the two main approaches to data management?</li>
            <li>List any four benefits of using a DBMS.</li>
            <li>Name the most popular database model used today.</li>
            <li>What does RDBMS stand for?</li>
            <li>What is an entity? Give two examples.</li>
            <li>What are the two main parts of a table?</li>
            <li>List any three characteristics of a table.</li>
            <li>What is the main difference between DBMS and RDBMS?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 02):</strong> Entity-Relationship (E-R) Model and Normalization</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
