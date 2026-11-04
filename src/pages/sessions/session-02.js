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

          <p>In addition, after studying the expanded content you will be able to:</p>
          <ul>
            <li>Explain why proper data modeling prevents costly redesign later</li>
            <li>Distinguish strong vs weak entities and identify identifying relationships</li>
            <li>Apply cardinality and participation constraints correctly</li>
            <li>Detect insertion, deletion and update anomalies in poorly designed tables</li>
            <li>Perform a complete normalization from unnormalized form through 3NF with real examples</li>
            <li>Translate an E-R diagram into relational tables with correct primary and foreign keys</li>
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

          <h3>Why Data Modeling Matters — A Practical View</h3>
          <p>
            Imagine you are asked to build a system for a college. Without modeling you might create one giant table that stores student name, course name, instructor name, department name, fees, marks, address, phone numbers, etc. 
            Very soon you will face:
          </p>
          <ul>
            <li>The same instructor name repeated hundreds of times (redundancy)</li>
            <li>Difficulty changing an instructor’s phone number because it appears in many places</li>
            <li>Inability to store a new course that has no students yet</li>
            <li>Loss of department information when the last student of that department leaves</li>
          </ul>
          <p>
            A proper data model (especially the E-R model followed by normalization) prevents these problems before a single table is created in SQL Server.
          </p>

          <h3>Levels of Data Modeling</h3>
          <ul>
            <li><strong>Conceptual Data Model</strong> — High-level view used by business stakeholders (entities and relationships only).</li>
            <li><strong>Logical Data Model</strong> — Adds attributes, keys, and normalization. Still independent of a specific DBMS.</li>
            <li><strong>Physical Data Model</strong> — Implementation details for a specific RDBMS (data types, indexes, partitions, etc.).</li>
          </ul>
          <p>In this session we focus on the conceptual and logical levels using the Entity-Relationship Model.</p>

          <hr />

          <h2>2. Entity-Relationship (E-R) Model</h2>
          <p>The <strong>Entity-Relationship Model</strong> is one of the most popular data models used for database design. It focuses on entities and the relationships between them.</p>

          <p>
            The E-R model was introduced by Peter Chen in 1976 and remains the foundation of almost every modern database design tool 
            (including the diagramming features inside SQL Server Management Studio, Azure Data Studio, and tools like draw.io, Lucidchart, and ERDPlus).
          </p>

          <h3>Main Components of the E-R Model</h3>
          <ul>
            <li><strong>Entity</strong> – A real-world object about which we store data (e.g., Student, Employee, Product)</li>
            <li><strong>Attribute</strong> – Properties or characteristics of an entity (e.g., StudentName, Age, City)</li>
            <li><strong>Relationship</strong> – Association between two or more entities</li>
          </ul>

          <h3>Entity Types in Detail</h3>
          <p><strong>Strong (Regular) Entity</strong></p>
          <ul>
            <li>Has its own primary key</li>
            <li>Can exist independently</li>
            <li>Drawn as a single rectangle</li>
            <li>Example: Student (StudentID is enough to uniquely identify a student)</li>
          </ul>

          <p><strong>Weak Entity</strong></p>
          <ul>
            <li>Does not have a primary key of its own (or the key is not sufficient)</li>
            <li>Depends on a strong entity for identification</li>
            <li>Drawn as a double rectangle</li>
            <li>The relationship that connects it is called an <strong>identifying relationship</strong> (drawn as a double diamond)</li>
            <li>Example: Dependent (of an Employee). A dependent is identified by EmployeeID + DependentName</li>
          </ul>

          <h3>Entity Sets and Instances</h3>
          <p>
            An <strong>entity set</strong> is a collection of similar entities (e.g., the set of all students). 
            An <strong>entity instance</strong> (or occurrence) is one particular student (Ali with StudentID 101).
          </p>

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

          <h3>Additional Attribute Classifications (Very Useful in Real Designs)</h3>
          <ul>
            <li><strong>Stored vs Derived</strong> — Age is usually derived; DateOfBirth is stored.</li>
            <li><strong>Null-able attributes</strong> — Some attributes may be allowed to be empty (e.g., MiddleName).</li>
            <li><strong>Complex attributes</strong> — Nested composite + multi-valued combinations (e.g., a list of addresses where each address is itself composite).</li>
          </ul>

          <h3>How Attributes Appear in E-R Diagrams</h3>
          <ul>
            <li>Simple / Single-valued → Oval connected by a line</li>
            <li>Composite → Oval with further ovals attached</li>
            <li>Multi-valued → Double oval</li>
            <li>Derived → Dashed oval</li>
            <li>Key Attribute → Oval with the name underlined</li>
          </ul>

          <h3>Example: Student Entity with Various Attributes</h3>
          <pre style={{background:'#f8f9fa', padding:'16px', borderRadius:'8px', overflowX:'auto', fontSize:'0.9em'}}>
{`Student (Strong Entity)
├── StudentID          (Key Attribute — underlined)
├── Name               (Composite)
│   ├── FirstName
│   ├── MiddleName
│   └── LastName
├── DateOfBirth        (Simple, Stored)
├── Age                (Derived — dashed oval)
├── PhoneNumbers       (Multi-valued — double oval)
└── Address            (Composite)
    ├── Street
    ├── City
    ├── State
    └── PostalCode`}
          </pre>

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

          <h3>Cardinality and Participation Constraints (Important for Accurate Design)</h3>
          <p>
            Simply saying “1:M” is not always enough. We also need to know whether every entity must participate in the relationship 
            (total participation) or whether participation is optional (partial participation).
          </p>

          <ul>
            <li><strong>Cardinality</strong> — Maximum number of relationship instances an entity can participate in (1 or Many).</li>
            <li><strong>Participation</strong> — Minimum number (0 = optional / partial, 1 = mandatory / total).</li>
          </ul>

          <p><strong>Common notation styles:</strong></p>
          <ul>
            <li>Chen notation: numbers written near the relationship diamond (1, N, M)</li>
            <li>Crow’s Foot notation (very popular in industry): 
              <ul>
                <li>Crow’s foot = many</li>
                <li>Single line = one</li>
                <li>Circle = optional (0)</li>
                <li>Bar = mandatory (1)</li>
              </ul>
            </li>
          </ul>

          <h3>Real-World Examples with Constraints</h3>
          <ul>
            <li><strong>Department – Employee</strong>: A department can have many employees (1:M). Every employee must belong to exactly one department (total participation on Employee side). A department may exist with zero employees (partial on Department side).</li>
            <li><strong>Student – Course</strong> (via Enrollment): Many-to-Many. A student may not be enrolled in any course yet (partial). A course may have no students yet (partial).</li>
            <li><strong>Employee – Dependent</strong>: 1:M identifying relationship. A dependent cannot exist without an employee (total participation of Dependent).</li>
          </ul>

          <h3>Degree of a Relationship</h3>
          <ul>
            <li><strong>Unary (Recursive)</strong> — Relationship within the same entity set (e.g., Employee manages Employee).</li>
            <li><strong>Binary</strong> — Between two entity sets (most common).</li>
            <li><strong>Ternary</strong> — Among three entity sets (e.g., Doctor, Patient, Medication — a doctor prescribes a medication to a patient).</li>
          </ul>

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

          <h3>Extended Symbols You Will Frequently Encounter</h3>
          <ul>
            <li><strong>Double Rectangle</strong> → Weak entity</li>
            <li><strong>Double Diamond</strong> → Identifying relationship</li>
            <li><strong>Double Line</strong> → Total (mandatory) participation</li>
            <li><strong>Single Line</strong> → Partial (optional) participation</li>
          </ul>

          <h3>Sample E-R Diagram Description — College Management System</h3>
          <p>Below is a textual representation of a typical college system (you should also draw this on paper):</p>
          <pre style={{background:'#f8f9fa', padding:'16px', borderRadius:'8px', overflowX:'auto', fontSize:'0.85em', lineHeight:1.4}}>
{`                    ┌─────────────┐
                    │  Department │
                    │─────────────│
                    │ DeptID (PK) │
                    │ DeptName    │
                    │ Location    │
                    └──────┬──────┘
                           │ 1
                           │
                           │ M
                    ┌──────▼──────┐         ┌─────────────┐
                    │  Instructor │────────▶│   Course    │
                    │─────────────│    M:N  │─────────────│
                    │ InstrID(PK) │         │ CourseID(PK)│
                    │ Name        │         │ Title       │
                    │ Email       │         │ Credits     │
                    └─────────────┘         └──────┬──────┘
                                                   │ M
                                                   │
                                                   │ M
                                            ┌──────▼──────┐
                                            │   Student   │
                                            │─────────────│
                                            │ StudentID(PK)│
                                            │ Name        │
                                            │ DOB         │
                                            │ Phone*      │  (* multi-valued)
                                            └─────────────┘

Note: The M:N between Student and Course is resolved later by an Enrollment 
junction table containing StudentID + CourseID + EnrollmentDate + Grade.`}
          </pre>

          <h3>Steps to Draw a Good E-R Diagram</h3>
          <ol>
            <li>Identify all entities from the requirements.</li>
            <li>List attributes for each entity and mark the primary key.</li>
            <li>Identify relationships and determine cardinality + participation.</li>
            <li>Resolve any many-to-many relationships by introducing a junction entity if needed at the logical level.</li>
            <li>Check for weak entities and mark identifying relationships.</li>
            <li>Review with stakeholders before moving to table design.</li>
          </ol>

          <hr />

          <h2>6. Normalization</h2>
          <p><strong>Normalization</strong> is the process of organizing data in a database to reduce redundancy and improve data integrity.</p>

          <p>The main goals of normalization are:</p>
          <ul>
            <li>Eliminate duplicate data</li>
            <li>Ensure data dependencies make sense</li>
            <li>Make the database more flexible and efficient</li>
          </ul>

          <h3>Why Normalization Is Critical — The Three Anomalies</h3>
          <p>When a table is not properly normalized you suffer from:</p>

          <h4>1. Insertion Anomaly</h4>
          <p>
            You cannot insert a piece of data because other required data is missing. 
            Example: You cannot add a new course until at least one student enrolls in it if Course information is mixed with Student information.
          </p>

          <h4>2. Deletion Anomaly</h4>
          <p>
            Deleting one piece of data unintentionally removes other valuable data. 
            Example: Deleting the last student of a department also deletes the department details forever.
          </p>

          <h4>3. Update Anomaly</h4>
          <p>
            Changing one value requires changing it in many places, and if you miss even one place the data becomes inconsistent. 
            Example: An instructor changes phone number — you must update every row where that instructor appears.
          </p>

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

          <h3>Complete Walk-Through Example — From Unnormalized to 3NF</h3>
          <p>Consider this unnormalized student registration data (common in poorly designed spreadsheets):</p>

          <table>
            <thead>
              <tr>
                <th>StudentID</th>
                <th>StudentName</th>
                <th>CourseID</th>
                <th>CourseName</th>
                <th>Instructor</th>
                <th>InstructorPhone</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S01</td>
                <td>Ali Khan</td>
                <td>C101</td>
                <td>Database Systems</td>
                <td>Dr. Ahmed</td>
                <td>0300-1111111</td>
                <td>A</td>
              </tr>
              <tr>
                <td>S01</td>
                <td>Ali Khan</td>
                <td>C102</td>
                <td>Web Development</td>
                <td>Ms. Sara</td>
                <td>0300-2222222</td>
                <td>B+</td>
              </tr>
              <tr>
                <td>S02</td>
                <td>Fatima Noor</td>
                <td>C101</td>
                <td>Database Systems</td>
                <td>Dr. Ahmed</td>
                <td>0300-1111111</td>
                <td>A-</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Problems visible:</strong> StudentName, CourseName, Instructor and Phone are repeated. Changing Dr. Ahmed’s phone requires multiple updates.</p>

          <h4>Step 1 → Convert to 1NF</h4>
          <p>
            Ensure atomic values and unique rows. The table above already has atomic values, but if a student had multiple phones in one cell we would split them into separate rows or a separate multi-valued structure.
            Primary key candidate becomes (StudentID, CourseID).
          </p>

          <h4>Step 2 → Convert to 2NF (Remove Partial Dependencies)</h4>
          <p>
            StudentName depends only on StudentID (part of the key).  
            CourseName, Instructor, InstructorPhone depend only on CourseID (part of the key).  
            Grade depends on the whole key (StudentID + CourseID).
          </p>
          <p>We therefore create three tables:</p>

          <p><strong>Student</strong></p>
          <table>
            <thead>
              <tr><th>StudentID (PK)</th><th>StudentName</th></tr>
            </thead>
            <tbody>
              <tr><td>S01</td><td>Ali Khan</td></tr>
              <tr><td>S02</td><td>Fatima Noor</td></tr>
            </tbody>
          </table>

          <p><strong>Course</strong></p>
          <table>
            <thead>
              <tr><th>CourseID (PK)</th><th>CourseName</th><th>Instructor</th><th>InstructorPhone</th></tr>
            </thead>
            <tbody>
              <tr><td>C101</td><td>Database Systems</td><td>Dr. Ahmed</td><td>0300-1111111</td></tr>
              <tr><td>C102</td><td>Web Development</td><td>Ms. Sara</td><td>0300-2222222</td></tr>
            </tbody>
          </table>

          <p><strong>Enrollment</strong> (junction table)</p>
          <table>
            <thead>
              <tr><th>StudentID (PK, FK)</th><th>CourseID (PK, FK)</th><th>Grade</th></tr>
            </thead>
            <tbody>
              <tr><td>S01</td><td>C101</td><td>A</td></tr>
              <tr><td>S01</td><td>C102</td><td>B+</td></tr>
              <tr><td>S02</td><td>C101</td><td>A-</td></tr>
            </tbody>
          </table>

          <h4>Step 3 → Convert to 3NF (Remove Transitive Dependencies)</h4>
          <p>
            In the Course table, InstructorPhone depends on Instructor, and Instructor depends on CourseID.  
            This is a transitive dependency. We move instructor data to its own table.
          </p>

          <p><strong>Instructor</strong></p>
          <table>
            <thead>
              <tr><th>InstructorID (PK)</th><th>InstructorName</th><th>Phone</th></tr>
            </thead>
            <tbody>
              <tr><td>I01</td><td>Dr. Ahmed</td><td>0300-1111111</td></tr>
              <tr><td>I02</td><td>Ms. Sara</td><td>0300-2222222</td></tr>
            </tbody>
          </table>

          <p><strong>Course</strong> (now in 3NF)</p>
          <table>
            <thead>
              <tr><th>CourseID (PK)</th><th>CourseName</th><th>InstructorID (FK)</th></tr>
            </thead>
            <tbody>
              <tr><td>C101</td><td>Database Systems</td><td>I01</td></tr>
              <tr><td>C102</td><td>Web Development</td><td>I02</td></tr>
            </tbody>
          </table>

          <p>All tables are now in Third Normal Form. Redundancy is minimized and anomalies are eliminated.</p>

          <h3>Quick Decision Guide</h3>
          <ul>
            <li>If a non-key column depends on only part of a composite key → violate 2NF</li>
            <li>If a non-key column depends on another non-key column → violate 3NF</li>
            <li>When in doubt, ask: “Does this fact depend on the whole key and nothing but the key?”</li>
          </ul>

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

          <h3>Relational Algebra Examples (Conceptual)</h3>
          <p>Assume two simple tables:</p>
          <p><strong>Student</strong></p>
          <table>
            <thead><tr><th>StudentID</th><th>Name</th><th>City</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Ali</td><td>Karachi</td></tr>
              <tr><td>2</td><td>Sara</td><td>Lahore</td></tr>
              <tr><td>3</td><td>Ahmed</td><td>Karachi</td></tr>
            </tbody>
          </table>

          <p><strong>Enrollment</strong></p>
          <table>
            <thead><tr><th>StudentID</th><th>Course</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>SQL</td></tr>
              <tr><td>1</td><td>C#</td></tr>
              <tr><td>2</td><td>SQL</td></tr>
            </tbody>
          </table>

          <ul>
            <li><strong>Selection</strong>: σ<sub>City='Karachi'</sub>(Student) → returns Ali and Ahmed</li>
            <li><strong>Projection</strong>: π<sub>Name</sub>(Student) → returns Ali, Sara, Ahmed</li>
            <li><strong>Join</strong>: Student ⋈ Enrollment → combines matching StudentID rows, giving each student’s courses</li>
            <li><strong>Union</strong> (of two compatible projections) would combine distinct values from two sets of rows</li>
          </ul>

          <p>
            These operators form the theoretical foundation of SQL. 
            When you write <code>SELECT ... FROM ... WHERE ... JOIN ...</code> you are essentially combining Selection, Projection and Join.
          </p>

          <hr />

          <h2>Putting It All Together — From E-R Diagram to Tables</h2>
          <p>After you finish the E-R diagram and normalize:</p>
          <ol>
            <li>Each strong entity becomes a table. The key attribute becomes the Primary Key.</li>
            <li>Each weak entity becomes a table whose Primary Key includes the Primary Key of its owner + its own discriminator.</li>
            <li>1:1 and 1:M relationships are usually implemented by placing a Foreign Key on the “many” or the optional side.</li>
            <li>M:N relationships become a junction table containing the Primary Keys of both participating entities (and any relationship attributes such as Grade or EnrollmentDate).</li>
            <li>Multi-valued attributes become their own table with a Foreign Key back to the parent entity.</li>
          </ol>

          <hr />

          <h2>Session 2 Exercise</h2>
          <ol>
            <li>Define Data Modeling in your own words.</li>
            <li>List the main components of the E-R Model.</li>
            <li>Give one real-life example each for 1:1, 1:M, and M:M relationships.</li>
            <li>What is the difference between a simple attribute and a composite attribute?</li>
            <li>Why do we need Normalization?</li>
          </ol>

          <p><strong>Additional Practice (recommended):</strong></p>
          <ol start="6">
            <li>Take the sample unnormalized table shown in the Normalization section and rewrite it yourself into 1NF, 2NF and 3NF without looking at the solution.</li>
            <li>Identify at least two insertion, deletion or update anomalies that would exist if we kept the original single table.</li>
            <li>Draw (on paper) the symbols for: strong entity, weak entity, multi-valued attribute, derived attribute, identifying relationship.</li>
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

          <p><strong>Extended Challenge:</strong></p>
          <ul>
            <li>Add a weak entity (for example, Dependent of an Instructor or Assignment belonging to a Course).</li>
            <li>Show total vs partial participation on at least two relationships.</li>
            <li>Resolve the M:N relationship between Student and Course with an Enrollment entity that also stores Grade and EnrollmentDate.</li>
            <li>List the final set of tables (with primary and foreign keys) that would result after converting your diagram to a relational schema in 3NF.</li>
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

          <p><strong>Extra Quiz Questions for Deeper Understanding:</strong></p>
          <ol start="11">
            <li>What is the difference between a strong entity and a weak entity?</li>
            <li>Why must a many-to-many relationship be resolved with a junction table?</li>
            <li>Give one example of an insertion anomaly and one example of a deletion anomaly.</li>
            <li>In Crow’s Foot notation, what does a crow’s foot with a circle mean?</li>
            <li>What is the difference between cardinality and participation?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 03):</strong> Introduction to SQL Server 2022</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
