import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session02() {
  return (
    <Layout
      title="Session 02 — Entity-Relationship (E-R) Model and Normalization"
      description="Entity-Relationship Model, Data Modeling, E-R Diagrams, Relationships, Normalization and Relational Operators"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 02 — Entity-Relationship (E-R) Model and Normalization</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding how to design a database properly using the E-R Model and Normalization.</p>
          <p><strong>Follows Book:</strong> From Book – Session 2</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define and describe data modeling</li>
            <li>Identify and describe the components of the E-R model</li>
            <li>Identify relationships that can be formed between entities</li>
            <li>Explain E-R diagrams and their use</li>
            <li>Describe an E-R diagram, the symbols used for drawing, and show various relationships</li>
            <li>Describe various Normal Forms</li>
            <li>Outline uses of different Relational Operators</li>
          </ul>

          <hr />

          <h2>1. What is Data Modeling?</h2>
          <p>A <strong>data model</strong> is a group of conceptual tools that describes data, its relationships, and semantics. It also consists of the consistency constraints that the data adheres to.</p>

          <p>The development of every database begins with the basic step of analyzing its data in order to determine the data model that would best represent it.</p>

          <p><strong>Data Modeling</strong> is the process of applying an appropriate data model to the data in order to organize and structure it.</p>

          <p>Building a database without a data model is similar to developing a project without plans and design.</p>

          <p>Data models help database developers to define:</p>
          <ul>
            <li>Relational tables</li>
            <li>Primary and Foreign keys</li>
            <li>Stored procedures</li>
            <li>Triggers required in the database</li>
          </ul>

          <hr />

          <h2>2. Entity-Relationship (E-R) Model</h2>
          <p>The <strong>Entity-Relationship Model</strong> is one of the most popular data models used for database design. It focuses on entities and the relationships between them.</p>

          <h3>Main Components of the E-R Model</h3>
          <ul>
            <li><strong>Entity</strong> – A real-world object about which we store data (e.g., Student, Employee, Product)</li>
            <li><strong>Attribute</strong> – Properties or characteristics of an entity (e.g., StudentName, Age, City)</li>
            <li><strong>Relationship</strong> – Association between two or more entities</li>
          </ul>

          <hr />

          <h2>3. Types of Attributes</h2>
          <ul>
            <li><strong>Simple Attribute</strong> – Cannot be divided further (e.g., Age)</li>
            <li><strong>Composite Attribute</strong> – Can be divided into smaller parts (e.g., Full Name → First Name + Last Name)</li>
            <li><strong>Single-valued Attribute</strong> – Has only one value (e.g., Date of Birth)</li>
            <li><strong>Multi-valued Attribute</strong> – Can have multiple values (e.g., Phone Numbers, Skills)</li>
            <li><strong>Derived Attribute</strong> – Value is calculated from other attributes (e.g., Age derived from Date of Birth)</li>
            <li><strong>Key Attribute</strong> – Uniquely identifies an entity (Primary Key)</li>
          </ul>

          <hr />

          <h2>4. Types of Relationships</h2>
          <p>Relationships describe how entities are connected.</p>

          <table>
            <thead>
              <tr>
                <th>Relationship Type</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>One-to-One (1:1)</td>
                <td>One record in Entity A is related to only one record in Entity B</td>
                <td>One person has one passport</td>
              </tr>
              <tr>
                <td>One-to-Many (1:M)</td>
                <td>One record in Entity A is related to many records in Entity B</td>
                <td>One department has many employees</td>
              </tr>
              <tr>
                <td>Many-to-Many (M:M)</td>
                <td>Many records in Entity A are related to many records in Entity B</td>
                <td>Students and Courses</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Note:</strong> Many-to-Many relationships are usually resolved by creating a third table (junction/bridge table).</p>

          <hr />

          <h2>5. E-R Diagrams</h2>
          <p>An <strong>E-R Diagram</strong> is a visual representation of entities, attributes, and relationships.</p>

          <h3>Common Symbols used in E-R Diagrams</h3>
          <ul>
            <li><strong>Rectangle</strong> → Entity</li>
            <li><strong>Ellipse / Oval</strong> → Attribute</li>
            <li><strong>Diamond</strong> → Relationship</li>
            <li><strong>Line</strong> → Links entities to attributes or relationships</li>
            <li><strong>Double Ellipse</strong> → Multi-valued attribute</li>
            <li><strong>Dashed Ellipse</strong> → Derived attribute</li>
            <li><strong>Underlined Attribute</strong> → Primary Key</li>
          </ul>

          <p>E-R diagrams help designers communicate the structure of the database clearly before creating actual tables.</p>

          <hr />

          <h2>6. Normalization</h2>
          <p><strong>Normalization</strong> is the process of organizing data in a database to reduce redundancy and improve data integrity.</p>

          <p>The main goals of normalization are:</p>
          <ul>
            <li>Eliminate duplicate data</li>
            <li>Ensure data dependencies make sense</li>
            <li>Make the database more flexible and efficient</li>
          </ul>

          <h3>Normal Forms</h3>

          <h4>1. First Normal Form (1NF)</h4>
          <ul>
            <li>Each column contains atomic (indivisible) values</li>
            <li>No repeating groups or arrays</li>
            <li>Each row is unique</li>
          </ul>

          <h4>2. Second Normal Form (2NF)</h4>
          <ul>
            <li>Must be in 1NF</li>
            <li>All non-key attributes must fully depend on the entire primary key (no partial dependency)</li>
          </ul>

          <h4>3. Third Normal Form (3NF)</h4>
          <ul>
            <li>Must be in 2NF</li>
            <li>No transitive dependency (non-key attributes should not depend on other non-key attributes)</li>
          </ul>

          <p>Higher normal forms (BCNF, 4NF, 5NF) exist, but for most practical applications, reaching <strong>3NF</strong> is sufficient.</p>

          <hr />

          <h2>7. Relational Operators</h2>
          <p>Relational operators are used to manipulate and retrieve data from relational tables. Common operators include:</p>

          <table>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Selection (σ)</td>
                <td>Selects rows that satisfy a condition</td>
              </tr>
              <tr>
                <td>Projection (π)</td>
                <td>Selects specific columns</td>
              </tr>
              <tr>
                <td>Union (∪)</td>
                <td>Combines rows from two tables (removes duplicates)</td>
              </tr>
              <tr>
                <td>Intersection (∩)</td>
                <td>Returns common rows from two tables</td>
              </tr>
              <tr>
                <td>Difference (−)</td>
                <td>Returns rows present in one table but not in the other</td>
              </tr>
              <tr>
                <td>Join (⋈)</td>
                <td>Combines rows from two or more tables based on a related column</td>
              </tr>
              <tr>
                <td>Cartesian Product (×)</td>
                <td>Combines every row of one table with every row of another</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Session 2 Exercise</h2>
          <ol>
            <li>Define Data Modeling in your own words.</li>
            <li>List the main components of the E-R Model.</li>
            <li>Give one real-life example each for 1:1, 1:M, and M:M relationships.</li>
            <li>What is the difference between a simple attribute and a composite attribute?</li>
            <li>Why do we need Normalization?</li>
          </ol>

          <hr />

          <h2>Session 2 Challenge</h2>
          <p>Design an E-R diagram (on paper) for a simple <strong>College Management System</strong> with at least these entities:</p>
          <ul>
            <li>Student</li>
            <li>Course</li>
            <li>Instructor</li>
            <li>Department</li>
          </ul>

          <p>Identify:</p>
          <ul>
            <li>Primary keys</li>
            <li>Attributes</li>
            <li>Relationships and their types (1:1, 1:M, M:M)</li>
          </ul>

          <hr />

          <h2>Session 2 Quiz</h2>
          <ol>
            <li>What is a data model?</li>
            <li>What is the purpose of data modeling?</li>
            <li>Name the three main components of the E-R Model.</li>
            <li>What symbol is used for an Entity in an E-R diagram?</li>
            <li>What is a multi-valued attribute? Give an example.</li>
            <li>Explain the difference between 1:1 and 1:M relationships.</li>
            <li>What is Normalization?</li>
            <li>What is the main rule of First Normal Form (1NF)?</li>
            <li>What is transitive dependency?</li>
            <li>Name any three relational operators.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 03):</strong> Introduction to SQL Server 2022</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
