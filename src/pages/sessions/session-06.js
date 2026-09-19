import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session06() {
  return (
    <Layout
      title="Session 06 — Creating Tables"
      description="Creating Tables in SQL Server 2022 — Data Types, Constraints, ALTER TABLE, DROP TABLE"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 06 — Creating Tables</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Learning how to create, modify, and manage tables and columns in SQL Server 2022.</p>
          <p><strong>Follows Book:</strong> From Book – Session 6</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>List SQL Server 2022 data types</li>
            <li>Describe the procedure to create, modify, and drop tables in an SQL Server database</li>
            <li>Describe the procedure to add, modify, and drop columns in a table</li>
          </ul>

          <hr />

          <h2>1. Introduction to Tables</h2>
          <p>A <strong>table</strong> is the most important database object in SQL Server. It stores data in the form of rows and columns.</p>
          <ul>
            <li><strong>Rows</strong> (also called records) represent individual entries</li>
            <li><strong>Columns</strong> (also called fields) represent attributes of the data</li>
          </ul>

          <p>Each column must have a specific data type and size.</p>

          <hr />

          <h2>2. Common Data Types in SQL Server 2022</h2>

          <h3>Numeric Types</h3>
          <ul>
            <li><code>tinyint</code>, <code>smallint</code>, <code>int</code>, <code>bigint</code></li>
            <li><code>decimal(p,s)</code>, <code>numeric(p,s)</code></li>
            <li><code>float</code>, <code>real</code></li>
            <li><code>money</code>, <code>smallmoney</code></li>
          </ul>

          <h3>String / Character Types</h3>
          <ul>
            <li><code>char(n)</code>, <code>varchar(n)</code>, <code>varchar(max)</code></li>
            <li><code>nchar(n)</code>, <code>nvarchar(n)</code>, <code>nvarchar(max)</code></li>
          </ul>

          <h3>Date and Time Types</h3>
          <ul>
            <li><code>date</code>, <code>time</code></li>
            <li><code>datetime</code>, <code>datetime2</code></li>
            <li><code>smalldatetime</code>, <code>datetimeoffset</code></li>
          </ul>

          <h3>Other Common Types</h3>
          <ul>
            <li><code>bit</code> (0 or 1)</li>
            <li><code>uniqueidentifier</code></li>
            <li><code>xml</code></li>
            <li><code>varbinary(n)</code>, <code>varbinary(max)</code></li>
          </ul>

          <hr />

          <h2>3. Advanced Data Types</h2>
          <p>SQL Server also supports several advanced data types:</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>hierarchyid</code></td>
                <td>System data type with variable length. Used to represent a position in a hierarchy (e.g., employee-manager relationship).</td>
              </tr>
              <tr>
                <td><code>geometry</code></td>
                <td>Spatial data type for Euclidean (flat) coordinate systems. Useful for storing geometric shapes.</td>
              </tr>
              <tr>
                <td><code>geography</code></td>
                <td>Spatial data type for storing ellipsoidal (round-earth) data such as GPS latitude and longitude coordinates.</td>
              </tr>
            </tbody>
          </table>

          <hr />

                    <h2>4. Creating a Table</h2>
          <p>Use the <code>create table</code> statement to create a new table.</p>

          <pre>
            <code>{`create table students
(
    studentId    int primary key identity(1,1),
    studentName  varchar(100) not null,
    age          int,
    gender       varchar(10),
    city         varchar(50),
    marks        int,
    departmentId int,

    constraint ck_students_age   check (age >= 16),
    constraint ck_students_marks check (marks between 0 and 100)
);
`}</code>
          </pre>

          <h3>Important Points</h3>
          <ul>
            <li><code>identity(1,1)</code> → Auto-increment starting from 1</li>
            <li><code>primary key</code> → Uniquely identifies each row</li>
            <li><code>not null</code> → Column cannot contain NULL values</li>
            <li><code>unique</code> → All values in the column must be unique</li>
            <li><code>default</code> → Provides a default value</li>
            <li><code>check</code> → Enforces a condition on the values</li>
          </ul>

          <hr />

          <h2>5. Common Constraints</h2>
          <table>
            <thead>
              <tr>
                <th>Constraint</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>primary key</td>
                <td>Uniquely identifies each row (cannot be NULL)</td>
              </tr>
              <tr>
                <td>foreign key</td>
                <td>Creates a relationship with another table</td>
              </tr>
              <tr>
                <td>unique</td>
                <td>Ensures all values in a column are unique</td>
              </tr>
              <tr>
                <td>not null</td>
                <td>Prevents NULL values</td>
              </tr>
              <tr>
                <td>check</td>
                <td>Enforces a condition (e.g., Marks BETWEEN 0 AND 100)</td>
              </tr>
              <tr>
                <td>defaults</td>
                <td>Sets a default value when none is provided</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>6. Adding a Foreign Key</h2>
          <pre>
            <code>{`-- first create the parent table
create table departments
(
    departmentId   int primary key identity(1,1),
    departmentName varchar(100) not null unique
);

-- then create the child table with foreign Key
create table students
(
    studentID    int primary key identity(1,1),
    studentName  varchar(100) not null,
    age          int,
    gender       varchar(10),
    city         varchar(50),
    marks        int,
    departmentId int,

    constraint ck_students_age   check (age >= 16),
    constraint ck_students_marks check (marks between 0 and 100),
    constraint fk_students_departments
        foreign key (departmentId) references departments(departmentId)
        );
        `}
</code>
          </pre>

          <hr />

          <h2>7. Modifying a Table (ALTER TABLE)</h2>
          <p>Use <code>ALTER TABLE</code> to add, modify, or drop columns and constraints.</p>

          <h3>Add a Column</h3>
          <pre>
            <code>
                  {`alter table students
                  add PhoneNumber nvarchar(20);
                  `}</code>
          </pre>

          <h3>Modify a Column</h3>
          <pre>
            <code>{`alter table students
alter column PhoneNumber nvarchar(30);`}</code>
          </pre>

          <h3>Drop a Column</h3>
          <pre>
            <code>{`alter table Students
drop column PhoneNumber;
`}</code>
          </pre>

          <h3>Add a Constraint</h3>
          <pre>
            <code>{`alter table students
add constraint uq_students_name unique (studentName);`}</code>
          </pre>

          <hr />

          <h2>8. Dropping a Table</h2>
          <pre>
            <code>{`-- drop a table
drop table students;

-- check if table exists before dropping (safer)
if object_id('students', 'u') is not null
    drop table students;`}</code>
          </pre>

          <p><strong>Note:</strong> You cannot drop a table if it is referenced by a foreign key in another table. Drop the foreign key first or drop the child table first.</p>

          <hr />

          <h2>9. Best Practices</h2>
          <ul>
            <li>Always define a Primary Key for every table</li>
            <li>Use appropriate data types (don’t use nvarchar(MAX) unnecessarily)</li>
            <li>Prefer <code>nvarchar</code> over <code>varchar</code> when storing Unicode data</li>
            <li>Use meaningful table and column names</li>
            <li>Add constraints to enforce data integrity</li>
            <li>Avoid using reserved keywords as object names</li>
            <li>Document important design decisions</li>
          </ul>
  
          <hr />

          <h2>Practical Example – collegeDb (Full Setup)</h2>
          <p>
            Run the following script <strong>once</strong> to create the practice database and tables 
            that we will use throughout the rest of the course.
          </p>

          <pre>
            <code>{`-- =============================================
                    -- collegeDb - complete setup for sample data
                    -- =============================================
                    
                    -- create database collegeDb;
                    
                    -- use collegeDb; -- (to set the newly created database in the current context, SQL script file)
                    
                    -- 1. departments
                    create table departments
                    (
                        departmentId   int primary key identity(1,1),
                        departmentName varchar(100) not null unique
                    );
                    
                    -- 2. classes
                    create table classes
                    (
                        classId   int primary key identity(1,1),
                        className varchar(100) not null
                    );                    

                    
                    -- 3. teachers
                    create table teachers
                    (
                        teacherId    int primary key identity(1,1),
                        teacherName  varchar(100) not null,
                        age          int,
                        gender       varchar(10),
                        city         varchar(50),
                        departmentId int,
                        classId      int,
                    
                        constraint fk_teachers_departments
                            foreign key (departmentId) references departments(departmentId),
                        constraint fk_teachers_classes
                            foreign key (classId) references classes(classId)
                    );
                    
                    -- 4. students
                    create table students
                    (
                        studentId    int primary key identity(1,1),
                        studentName  varchar(100) not null,
                        age          int,
                        gender       varchar(10),
                        city         varchar(50),
                        marks        int,
                        departmentId int,
                    
                        constraint ck_students_age   check (age >= 16),
                        constraint ck_students_marks check (marks between 0 and 100),
                        constraint fk_students_departments
                            foreign key (departmentId) references departments(departmentId)
                    );
                    
                    
                    
                    -- =============================================
                    -- sample data
                    -- =============================================

                    -- sample data for departments
                    insert into departments (departmentName)
                    values
                    ('Computer Science'),
                    ('Information Technology'),
                    ('Software Engineering'),
                    ('Business Administration'),
                    ('Accounting & Finance'),
                    ('Psychology');
                    

                    -- sample data for classes
                    insert into classes (className)
                    values
                    ('1-A'),('1-B'),('2-A'),('2-B'),('3-A'),('3-B'),
                    ('4-A'),('4-B'),('5-A'),('5-B'),('6-A'),('6-B'),
                    ('7-A'),('7-B'),('8-A'),('8-B'),('9-A'),('9-B'),
                    ('10-A'),('10-B');
                    

                    -- sample data for teachers
                    insert into teachers (teacherName, age, gender, city, departmentId, classId)
                    values
                    ('Ali', 20, 'Male', 'Karachi', 1, 1),
                    ('Ahmed', 21, 'Male', 'Lahore', 4, 2),
                    ('Sara', 20, 'Female', 'Karachi', 3, 4),
                    ('Ayesha', 22, 'Female', 'Islamabad', 2, 20),
                    ('Hamza', 23, 'Male', 'Karachi', 1, 18),
                    ('Usman', 21, 'Male', 'Lahore', 4, 1),
                    ('Hina', 20, 'Female', 'Karachi', 3, 11),
                    ('Bilal', 24, 'Male', 'Islamabad', 4, 15),
                    ('Fatima', 22, 'Female', 'Karachi', 2, 17),
                    ('Zain', 19, 'Male', 'Lahore', 1, 5);
                    

                    -- Sample Data for students
                    insert into students (studentName, age, gender, city, marks, departmentId)
                    values
                    ('Ali', 20, 'Male', 'Karachi', 85, 1),
                    ('Ahmed', 21, 'Male', 'Lahore', 72, 2),
                    ('Sara', 20, 'Female', 'Karachi', 91, 1),
                    ('Ayesha', 22, 'Female', 'Islamabad', 88, 3),
                    ('Hamza', 23, 'Male', 'Karachi', 65, 2),
                    ('Usman', 21, 'Male', 'Lahore', 78, 1),
                    ('Hina', 20, 'Female', 'Karachi', 95, 2),
                    ('Bilal', 24, 'Male', 'Islamabad', 55, 4),
                    ('Fatima', 22, 'Female', 'Karachi', 82, 3),
                    ('Zain', 19, 'Male', 'Lahore', 69, 1);
                    
                    
                    -- Verify after inserting all sample data in each respective tables
                    select * from departments;
                    select * from classes;
                    select * from teachers;
                    select * from students;
                    `
                  }
            </code>
          </pre>
          
          <hr />
              
          <h2>Session 6 Exercise</h2>
          <ol>
            <li>Create a table named <code>Students</code> with appropriate columns (StudentID, FirstName, LastName, Email, DateOfBirth, EnrollmentDate).</li>
            <li>Add a Primary Key and at least two other constraints.</li>
            <li>Create a table named <code>Courses</code> and link it with <code>Students</code> using a junction table <code>StudentCourses</code> (Many-to-Many).</li>
            <li>Add a new column <code>PhoneNumber</code> to the Students table.</li>
            <li>Write the command to drop the PhoneNumber column.</li>
          </ol>

          <hr />

          <h2>Session 6 Challenge</h2>
          <p>Design and create the following tables for a simple Library System:</p>
          <ul>
            <li><strong>Books</strong> (BookID, Title, Author, ISBN, PublishedYear, AvailableCopies)</li>
            <li><strong>Members</strong> (MemberID, FullName, Email, JoinDate, Phone)</li>
            <li><strong>Borrowings</strong> (BorrowingID, BookID, MemberID, BorrowDate, ReturnDate)</li>
          </ul>

          <p>Requirements:</p>
          <ul>
            <li>Proper data types</li>
            <li>Primary Keys</li>
            <li>Foreign Keys</li>
            <li>At least one CHECK and one DEFAULT constraint</li>
          </ul>

          <hr />

          <h2>Session 6 Quiz</h2>
          <ol>
            <li>What is a table in SQL Server?</li>
            <li>What is the difference between <code>char</code> and <code>varchar</code>?</li>
            <li>What does the <code>IDENTITY</code> property do?</li>
            <li>Name five common constraints and their purpose.</li>
            <li>What is the purpose of a Foreign Key?</li>
            <li>How do you add a new column to an existing table?</li>
            <li>How do you change the data type of an existing column?</li>
            <li>What happens if you try to drop a table that is referenced by a foreign key?</li>
            <li>What is the <code>hierarchyid</code> data type used for?</li>
            <li>What is the difference between <code>geometry</code> and <code>geography</code> data types?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 07):</strong> Microsoft Azure SQL</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
