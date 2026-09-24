import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session06() {
  const codeBlockStyle = {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '12px 16px',
    borderRadius: '6px',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
    lineHeight: '1.5',
    margin: '12px 0 24px 0'
  };

  const inlineCodeStyle = {
    backgroundColor: '#f4f4f4',
    color: '#d10057',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '0.9em'
  };

  return (
    <Layout
      title="Session 06 — Creating Tables"
      description="Creating Tables in SQL Server 2022 — Data Types, Constraints, ALTER TABLE, DROP TABLE, AdventureWorks2022"
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

          <h1>Session 06 — Creating Tables</h1>

          <p><strong>Duration:</strong> 2 hours</p>

          <p>
            <strong>Focus:</strong> Learning how to create, modify, and manage
            tables and columns in SQL Server 2022.
          </p>

          <p>
            <strong>Practical Database:</strong> AdventureWorks2022
          </p>

          <p>
            <strong>Follows Book:</strong> From Book – Session 6
          </p>

          <hr />

          <h2>Learning Objectives</h2>

          <p>By the end of this session, you should be able to:</p>

          <ul>
            <li>List common SQL Server 2022 data types</li>
            <li>Explain the purpose of tables, rows, and columns</li>
            <li>Create tables using T-SQL</li>
            <li>Apply Primary Key, Foreign Key, UNIQUE, CHECK, DEFAULT, and NOT NULL constraints</li>
            <li>Explain how AdventureWorks2022 uses tables and relationships</li>
            <li>Add, modify, and drop columns using ALTER TABLE</li>
            <li>Understand how to safely drop tables</li>
            <li>Inspect existing AdventureWorks2022 tables and their structures</li>
          </ul>

          <hr />

          <h2>1. Introduction to Tables</h2>

          <p>
            A <strong>table</strong> is a database object used to store data
            in rows and columns.
          </p>

          <ul>
            <li>
              <strong>Rows</strong> represent individual records.
            </li>
            <li>
              <strong>Columns</strong> represent attributes or properties of
              those records.
            </li>
          </ul>

          <p>
            For example, AdventureWorks2022 contains a table named
            <code>Production.Product</code> that stores information about
            products.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT TOP 10
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <p>
            Here:
          </p>

          <ul>
            <li><code>ProductID</code> identifies the product.</li>
            <li><code>Name</code> stores the product name.</li>
            <li><code>ProductNumber</code> stores the product number.</li>
            <li><code>ListPrice</code> stores the product price.</li>
          </ul>

          <hr />

          <h2>2. Common Data Types in SQL Server 2022</h2>

          <h3>Numeric Types</h3>

          <ul>
            <li><code>tinyint</code></li>
            <li><code>smallint</code></li>
            <li><code>int</code></li>
            <li><code>bigint</code></li>
            <li><code>decimal(p,s)</code></li>
            <li><code>numeric(p,s)</code></li>
            <li><code>float</code></li>
            <li><code>real</code></li>
            <li><code>money</code></li>
            <li><code>smallmoney</code></li>
          </ul>

          <h3>String / Character Types</h3>

          <ul>
            <li><code>char(n)</code></li>
            <li><code>varchar(n)</code></li>
            <li><code>varchar(max)</code></li>
            <li><code>nchar(n)</code></li>
            <li><code>nvarchar(n)</code></li>
            <li><code>nvarchar(max)</code></li>
          </ul>

          <h3>Date and Time Types</h3>

          <ul>
            <li><code>date</code></li>
            <li><code>time</code></li>
            <li><code>datetime</code></li>
            <li><code>datetime2</code></li>
            <li><code>smalldatetime</code></li>
            <li><code>datetimeoffset</code></li>
          </ul>

          <h3>Other Common Types</h3>

          <ul>
            <li><code>bit</code> — stores 0, 1, or NULL</li>
            <li><code>uniqueidentifier</code> — stores GUID values</li>
            <li><code>xml</code> — stores XML data</li>
            <li><code>varbinary</code> — stores binary data</li>
          </ul>

          <hr />

          <h2>3. Advanced Data Types</h2>

          <p>
            SQL Server also provides specialized data types for particular
            requirements.
          </p>

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
                <td>
                  Represents a position in a hierarchy, such as an
                  employee-manager structure.
                </td>
              </tr>

              <tr>
                <td><code>geometry</code></td>
                <td>
                  Stores spatial data using a flat or Euclidean coordinate
                  system.
                </td>
              </tr>

              <tr>
                <td><code>geography</code></td>
                <td>
                  Stores spatial data based on the earth's surface, such as
                  latitude and longitude.
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>4. Understanding Existing AdventureWorks2022 Tables</h2>

          <p>
            Before creating our own tables, let's inspect the tables already
            available in AdventureWorks2022.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}</code>
          </pre>

          <p>
            This query lists the base tables available in the database.
          </p>

          <h3>Example AdventureWorks2022 Tables</h3>

          <ul>
            <li><code>Production.Product</code></li>
            <li><code>Production.ProductCategory</code></li>
            <li><code>Production.ProductSubcategory</code></li>
            <li><code>Person.Person</code></li>
            <li><code>Person.Address</code></li>
            <li><code>Sales.Customer</code></li>
            <li><code>Sales.SalesOrderHeader</code></li>
            <li><code>Sales.SalesOrderDetail</code></li>
          </ul>

          <p>
            AdventureWorks uses <strong>schemas</strong> to organize tables.
            For example, <code>Production.Product</code> means:
          </p>

          <ul>
            <li><code>Production</code> = schema</li>
            <li><code>Product</code> = table</li>
          </ul>

          <hr />

          <h2>5. Inspecting Table Columns</h2>

          <p>
            We can use <code>INFORMATION_SCHEMA.COLUMNS</code> to examine the
            structure of an existing table.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Production'
  AND TABLE_NAME = 'Product'
ORDER BY ORDINAL_POSITION;
GO`}</code>
          </pre>

          <p>
            This allows us to see the column names, data types, maximum
            character lengths, and whether NULL values are allowed.
          </p>

          <hr />

          <h2>6. Creating a Table</h2>

          <p>
            Use the <code>CREATE TABLE</code> statement to create a new table.
          </p>

          <p>
            For learning purposes, we will create a small temporary practice
            table. We will <strong>not modify AdventureWorks2022 tables</strong>.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

CREATE TABLE CourseStudents
(
    StudentID INT PRIMARY KEY IDENTITY(1,1),
    StudentName VARCHAR(100) NOT NULL,
    Age INT,
    Gender VARCHAR(10),
    City VARCHAR(50),
    Marks INT,

    CONSTRAINT CK_CourseStudents_Age
        CHECK (Age >= 16),

    CONSTRAINT CK_CourseStudents_Marks
        CHECK (Marks BETWEEN 0 AND 100)
);
GO`}</code>
          </pre>

          <h3>Important Points</h3>

          <ul>
            <li>
              <code>IDENTITY(1,1)</code> automatically generates numbers
              starting from 1 and increasing by 1.
            </li>

            <li>
              <code>PRIMARY KEY</code> uniquely identifies each row.
            </li>

            <li>
              <code>NOT NULL</code> prevents NULL values.
            </li>

            <li>
              <code>CHECK</code> enforces a condition.
            </li>

            <li>
              <code>DEFAULT</code> can provide a value automatically when a
              value is not supplied.
            </li>

            <li>
              <code>UNIQUE</code> prevents duplicate values.
            </li>
          </ul>

          <hr />

          <h2>7. Common Constraints</h2>

          <table>
            <thead>
              <tr>
                <th>Constraint</th>
                <th>Purpose</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><code>PRIMARY KEY</code></td>
                <td>Uniquely identifies each row.</td>
              </tr>

              <tr>
                <td><code>FOREIGN KEY</code></td>
                <td>Creates a relationship between tables.</td>
              </tr>

              <tr>
                <td><code>UNIQUE</code></td>
                <td>Prevents duplicate values.</td>
              </tr>

              <tr>
                <td><code>NOT NULL</code></td>
                <td>Prevents NULL values.</td>
              </tr>

              <tr>
                <td><code>CHECK</code></td>
                <td>Ensures that data satisfies a condition.</td>
              </tr>

              <tr>
                <td><code>DEFAULT</code></td>
                <td>Provides a default value when no value is supplied.</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>8. Adding a Foreign Key</h2>

          <p>
            A <strong>Foreign Key</strong> creates a relationship between a
            child table and a parent table.
          </p>

          <p>
            AdventureWorks2022 contains many examples of this concept.
            For example, products are connected to product subcategories.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.ProductSubcategoryID,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}</code>
          </pre>

          <p>
            Here, <code>ProductSubcategoryID</code> connects the
            <code>Production.Product</code> table with the
            <code>Production.ProductSubcategory</code> table.
          </p>

          <p>
            We can also demonstrate the concept using our own practice tables.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

CREATE TABLE Departments
(
    DepartmentID INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE PracticeStudents
(
    StudentID INT PRIMARY KEY IDENTITY(1,1),
    StudentName VARCHAR(100) NOT NULL,
    DepartmentID INT,

    CONSTRAINT FK_PracticeStudents_Departments
        FOREIGN KEY (DepartmentID)
        REFERENCES Departments(DepartmentID)
);
GO`}</code>
          </pre>

          <hr />

          <h2>9. Modifying a Table — ALTER TABLE</h2>

          <p>
            The <code>ALTER TABLE</code> statement is used to change an
            existing table.
          </p>

          <h3>Add a Column</h3>

          <pre style={codeBlockStyle}>
            <code>{`ALTER TABLE CourseStudents
ADD PhoneNumber NVARCHAR(20);
GO`}</code>
          </pre>

          <h3>Modify a Column</h3>

          <pre style={codeBlockStyle}>
            <code>{`ALTER TABLE CourseStudents
ALTER COLUMN PhoneNumber NVARCHAR(30);
GO`}</code>
          </pre>

          <h3>Drop a Column</h3>

          <pre style={codeBlockStyle}>
            <code>{`ALTER TABLE CourseStudents
DROP COLUMN PhoneNumber;
GO`}</code>
          </pre>

          <h3>Add a UNIQUE Constraint</h3>

          <pre style={codeBlockStyle}>
            <code>{`ALTER TABLE CourseStudents
ADD CONSTRAINT UQ_CourseStudents_StudentName
UNIQUE (StudentName);
GO`}</code>
          </pre>

          <p>
            <strong>Important:</strong> Before changing an existing column,
            make sure the new data type is compatible with the existing data.
          </p>

          <hr />

          <h2>10. Inspecting Constraints in AdventureWorks2022</h2>

          <p>
            AdventureWorks2022 contains many Primary Key and Foreign Key
            relationships. We can inspect them using system catalog views.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT
    fk.name AS ForeignKeyName,
    OBJECT_SCHEMA_NAME(fk.parent_object_id) AS ChildSchema,
    OBJECT_NAME(fk.parent_object_id) AS ChildTable,
    OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS ParentSchema,
    OBJECT_NAME(fk.referenced_object_id) AS ParentTable
FROM sys.foreign_keys AS fk
ORDER BY ChildSchema, ChildTable;
GO`}</code>
          </pre>

          <p>
            This is a useful way to see how tables in a real-world database
            are connected.
          </p>

          <hr />

          <h2>11. Dropping a Table</h2>

          <p>
            The <code>DROP TABLE</code> statement permanently removes a table
            and its data.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`DROP TABLE CourseStudents;
GO`}</code>
          </pre>

          <p>
            A safer approach is to check whether the table exists first.
          </p>

          <pre style={codeBlockStyle}>
            <code>{`IF OBJECT_ID('dbo.CourseStudents', 'U') IS NOT NULL
    DROP TABLE dbo.CourseStudents;
GO`}</code>
          </pre>

          <p>
            <strong>Important:</strong> Do not execute <code>DROP TABLE</code>
            against AdventureWorks2022 tables during this course.
          </p>

          <p>
            For example, students should <strong>not</strong> run:
          </p>

          <pre style={codeBlockStyle}>
            <code>{`DROP TABLE Production.Product;`}</code>
          </pre>

          <p>
            This would attempt to remove an important AdventureWorks table and
            may also be blocked by existing relationships.
          </p>

          <hr />

          <h2>12. Practical — Working with AdventureWorks2022</h2>

          <p>
            Now let's apply what we have learned to the real AdventureWorks2022
            database.
          </p>

          <h3>Practical 1 — Select a Table</h3>

          <pre style={codeBlockStyle}>
            <code>{`USE AdventureWorks2022;
GO

SELECT TOP 10 *
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 2 — Select Specific Columns</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    ProductID,
    Name,
    ProductNumber,
    Color,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 3 — Inspect the Table Structure</h3>

          <pre style={codeBlockStyle}> 
            <code>{`SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Production'
  AND TABLE_NAME = 'Product'
ORDER BY ORDINAL_POSITION;
GO`}</code>
          </pre>

          <h3>Practical 4 — Find Primary Key Information</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    tc.CONSTRAINT_NAME,
    tc.TABLE_SCHEMA,
    tc.TABLE_NAME,
    kcu.COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc
INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS kcu
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
  AND tc.TABLE_SCHEMA = 'Production'
  AND tc.TABLE_NAME = 'Product';
GO`}</code>
          </pre>

          <h3>Practical 5 — Explore Product Relationships</h3>

          <pre style={codeBlockStyle}>
            <code>{`SELECT
    p.ProductID,
    p.Name AS ProductName,
    pc.Name AS CategoryName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
LEFT JOIN Production.ProductCategory AS pc
    ON ps.ProductCategoryID = pc.ProductCategoryID;
GO`}</code>
          </pre>

          <p>
            This practical demonstrates how tables, columns, keys, and
            relationships work together inside a real database.
          </p>

          <hr />

          <h2>13. Best Practices</h2>

          <ul>
            <li>Always define a Primary Key for important tables.</li>

            <li>
              Use appropriate data types instead of choosing
              <code>nvarchar(max)</code> for everything.
            </li>

            <li>
              Use <code>nvarchar</code> when Unicode support is required.
            </li>

            <li>Use meaningful table and column names.</li>

            <li>Use schemas to organize database objects.</li>

            <li>Add constraints to protect data integrity.</li>

            <li>Avoid reserved keywords as object names.</li>

            <li>
              Do not modify or delete AdventureWorks2022 tables during
              practice.
            </li>

            <li>
              Use separate practice tables for destructive operations such as
              <code>DROP TABLE</code>.
            </li>
          </ul>

          <hr />

          <h2>Session 6 Exercise</h2>

          <p>
            Complete the following exercises using
            <strong>AdventureWorks2022</strong> where possible.
          </p>

          <ol>
            <li>
              List all tables in the <code>Production</code> schema.
            </li>

            <li>
              Display the columns and data types of
              <code>Production.Product</code>.
            </li>

            <li>
              Display the Primary Key information for
              <code>Production.Product</code>.
            </li>

            <li>
              Display the Foreign Key relationships involving
              <code>Production.Product</code>.
            </li>

            <li>
              Display the first 10 products from
              <code>Production.Product</code>.
            </li>

            <li>
              Display products together with their product subcategory.
            </li>

            <li>
              Create a separate practice table named
              <code>PracticeProducts</code> with:
              <ul>
                <li>ProductID</li>
                <li>ProductName</li>
                <li>Price</li>
                <li>Quantity</li>
              </ul>
            </li>

            <li>
              Add a <code>CHECK</code> constraint so Price cannot be negative.
            </li>

            <li>
              Add a new column named <code>ProductCode</code>.
            </li>

            <li>
              Modify the <code>ProductCode</code> column.
            </li>

            <li>
              Drop the <code>ProductCode</code> column.
            </li>
          </ol>

          <hr />

          <h2>Session 6 Challenge</h2>

          <p>
            Create a small <strong>Library System</strong> using your own
            practice tables.
          </p>

          <h3>Books</h3>

          <ul>
            <li>BookID</li>
            <li>Title</li>
            <li>Author</li>
            <li>ISBN</li>
            <li>PublishedYear</li>
            <li>AvailableCopies</li>
          </ul>

          <h3>Members</h3>

          <ul>
            <li>MemberID</li>
            <li>FullName</li>
            <li>Email</li>
            <li>JoinDate</li>
            <li>Phone</li>
          </ul>

          <h3>Borrowings</h3>

          <ul>
            <li>BorrowingID</li>
            <li>BookID</li>
            <li>MemberID</li>
            <li>BorrowDate</li>
            <li>ReturnDate</li>
          </ul>

          <p><strong>Requirements:</strong></p>

          <ul>
            <li>Use appropriate data types.</li>
            <li>Add Primary Keys.</li>
            <li>Add Foreign Keys.</li>
            <li>Add at least one CHECK constraint.</li>
            <li>Add at least one DEFAULT constraint.</li>
            <li>Add at least one UNIQUE constraint.</li>
            <li>Use meaningful constraint names.</li>
          </ul>

          <p>
            <strong>Important:</strong> Create these tables as your own
            practice tables. Do not create or modify tables inside the
            AdventureWorks2022 schema for this challenge.
          </p>

          <hr />

          <h2>Session 6 Quiz</h2>

          <ol>
            <li>What is a table in SQL Server?</li>

            <li>
              What is the difference between a row and a column?
            </li>

            <li>
              What is the difference between <code>char</code> and
              <code>varchar</code>?
            </li>

            <li>
              What does the <code>IDENTITY</code> property do?
            </li>

            <li>
              What is a Primary Key?
            </li>

            <li>
              What is a Foreign Key?
            </li>

            <li>
              Name five common constraints and explain their purpose.
            </li>

            <li>
              How do you add a new column to an existing table?
            </li>

            <li>
              How do you modify the data type of an existing column?
            </li>

            <li>
              What happens when you use <code>DROP TABLE</code>?
            </li>

            <li>
              What is the purpose of <code>INFORMATION_SCHEMA.COLUMNS</code>?
            </li>

            <li>
              What is the difference between a schema and a table?
            </li>

            <li>
              What is the purpose of the <code>Production</code> schema in
              AdventureWorks2022?
            </li>

            <li>
              Give an example of a relationship between two AdventureWorks2022
              tables.
            </li>

            <li>
              Why should students avoid modifying or dropping AdventureWorks2022
              tables during practical exercises?
            </li>
          </ol>

          <hr />

          <p>
            <strong>Next up (Session 07):</strong> Microsoft Azure SQL
          </p>

        </article>
      </CustomLayout>
    </Layout>
  );
}





// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';

// export default function Session06() {
//   return (
//     <Layout
//       title="Session 06 — Creating Tables"
//       description="Creating Tables in SQL Server 2022 — Data Types, Constraints, ALTER TABLE, DROP TABLE"
//     >
//       <CustomLayout>
//         <article className="session-content">
//           <h1>Session 06 — Creating Tables</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p><strong>Focus:</strong> Learning how to create, modify, and manage tables and columns in SQL Server 2022.</p>
//           <p><strong>Follows Book:</strong> From Book – Session 6</p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>List SQL Server 2022 data types</li>
//             <li>Describe the procedure to create, modify, and drop tables in an SQL Server database</li>
//             <li>Describe the procedure to add, modify, and drop columns in a table</li>
//           </ul>

//           <hr />

//           <h2>1. Introduction to Tables</h2>
//           <p>A <strong>table</strong> is the most important database object in SQL Server. It stores data in the form of rows and columns.</p>
//           <ul>
//             <li><strong>Rows</strong> (also called records) represent individual entries</li>
//             <li><strong>Columns</strong> (also called fields) represent attributes of the data</li>
//           </ul>

//           <p>Each column must have a specific data type and size.</p>

//           <hr />

//           <h2>2. Common Data Types in SQL Server 2022</h2>

//           <h3>Numeric Types</h3>
//           <ul>
//             <li><code>tinyint</code>, <code>smallint</code>, <code>int</code>, <code>bigint</code></li>
//             <li><code>decimal(p,s)</code>, <code>numeric(p,s)</code></li>
//             <li><code>float</code>, <code>real</code></li>
//             <li><code>money</code>, <code>smallmoney</code></li>
//           </ul>

//           <h3>String / Character Types</h3>
//           <ul>
//             <li><code>char(n)</code>, <code>varchar(n)</code>, <code>varchar(max)</code></li>
//             <li><code>nchar(n)</code>, <code>nvarchar(n)</code>, <code>nvarchar(max)</code></li>
//           </ul>

//           <h3>Date and Time Types</h3>
//           <ul>
//             <li><code>date</code>, <code>time</code></li>
//             <li><code>datetime</code>, <code>datetime2</code></li>
//             <li><code>smalldatetime</code>, <code>datetimeoffset</code></li>
//           </ul>

//           <h3>Other Common Types</h3>
//           <ul>
//             <li><code>bit</code> (0 or 1)</li>
//             <li><code>uniqueidentifier</code></li>
//             <li><code>xml</code></li>
//             <li><code>varbinary(n)</code>, <code>varbinary(max)</code></li>
//           </ul>

//           <hr />

//           <h2>3. Advanced Data Types</h2>
//           <p>SQL Server also supports several advanced data types:</p>

//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td><code>hierarchyid</code></td>
//                 <td>System data type with variable length. Used to represent a position in a hierarchy (e.g., employee-manager relationship).</td>
//               </tr>
//               <tr>
//                 <td><code>geometry</code></td>
//                 <td>Spatial data type for Euclidean (flat) coordinate systems. Useful for storing geometric shapes.</td>
//               </tr>
//               <tr>
//                 <td><code>geography</code></td>
//                 <td>Spatial data type for storing ellipsoidal (round-earth) data such as GPS latitude and longitude coordinates.</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//                     <h2>4. Creating a Table</h2>
//           <p>Use the <code>create table</code> statement to create a new table.</p>

//           <pre>
//             <code>{`create table students
// (
//     studentId    int primary key identity(1,1),
//     studentName  varchar(100) not null,
//     age          int,
//     gender       varchar(10),
//     city         varchar(50),
//     marks        int,
//     departmentId int,

//     constraint ck_students_age   check (age >= 16),
//     constraint ck_students_marks check (marks between 0 and 100)
// );
// `}</code>
//           </pre>

//           <h3>Important Points</h3>
//           <ul>
//             <li><code>identity(1,1)</code> → Auto-increment starting from 1</li>
//             <li><code>primary key</code> → Uniquely identifies each row</li>
//             <li><code>not null</code> → Column cannot contain NULL values</li>
//             <li><code>unique</code> → All values in the column must be unique</li>
//             <li><code>default</code> → Provides a default value</li>
//             <li><code>check</code> → Enforces a condition on the values</li>
//           </ul>

//           <hr />

//           <h2>5. Common Constraints</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Constraint</th>
//                 <th>Purpose</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>primary key</td>
//                 <td>Uniquely identifies each row (cannot be NULL)</td>
//               </tr>
//               <tr>
//                 <td>foreign key</td>
//                 <td>Creates a relationship with another table</td>
//               </tr>
//               <tr>
//                 <td>unique</td>
//                 <td>Ensures all values in a column are unique</td>
//               </tr>
//               <tr>
//                 <td>not null</td>
//                 <td>Prevents NULL values</td>
//               </tr>
//               <tr>
//                 <td>check</td>
//                 <td>Enforces a condition (e.g., Marks BETWEEN 0 AND 100)</td>
//               </tr>
//               <tr>
//                 <td>defaults</td>
//                 <td>Sets a default value when none is provided</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>6. Adding a Foreign Key</h2>
//           <pre>
//             <code>{`-- first create the parent table
// create table departments
// (
//     departmentId   int primary key identity(1,1),
//     departmentName varchar(100) not null unique
// );

// -- then create the child table with foreign Key
// create table students
// (
//     studentID    int primary key identity(1,1),
//     studentName  varchar(100) not null,
//     age          int,
//     gender       varchar(10),
//     city         varchar(50),
//     marks        int,
//     departmentId int,

//     constraint ck_students_age   check (age >= 16),
//     constraint ck_students_marks check (marks between 0 and 100),
//     constraint fk_students_departments
//         foreign key (departmentId) references departments(departmentId)
//         );
//         `}
// </code>
//           </pre>

//           <hr />

//           <h2>7. Modifying a Table (ALTER TABLE)</h2>
//           <p>Use <code>ALTER TABLE</code> to add, modify, or drop columns and constraints.</p>

//           <h3>Add a Column</h3>
//           <pre>
//             <code>
//                   {`alter table students
//                   add PhoneNumber nvarchar(20);
//                   `}</code>
//           </pre>

//           <h3>Modify a Column</h3>
//           <pre>
//             <code>{`alter table students
// alter column PhoneNumber nvarchar(30);`}</code>
//           </pre>

//           <h3>Drop a Column</h3>
//           <pre>
//             <code>{`alter table Students
// drop column PhoneNumber;
// `}</code>
//           </pre>

//           <h3>Add a Constraint</h3>
//           <pre>
//             <code>{`alter table students
// add constraint uq_students_name unique (studentName);`}</code>
//           </pre>

//           <hr />

//           <h2>8. Dropping a Table</h2>
//           <pre>
//             <code>{`-- drop a table
// drop table students;

// -- check if table exists before dropping (safer)
// if object_id('students', 'u') is not null
//     drop table students;`}</code>
//           </pre>

//           <p><strong>Note:</strong> You cannot drop a table if it is referenced by a foreign key in another table. Drop the foreign key first or drop the child table first.</p>

//           <hr />

//           <h2>9. Best Practices</h2>
//           <ul>
//             <li>Always define a Primary Key for every table</li>
//             <li>Use appropriate data types (don’t use nvarchar(MAX) unnecessarily)</li>
//             <li>Prefer <code>nvarchar</code> over <code>varchar</code> when storing Unicode data</li>
//             <li>Use meaningful table and column names</li>
//             <li>Add constraints to enforce data integrity</li>
//             <li>Avoid using reserved keywords as object names</li>
//             <li>Document important design decisions</li>
//           </ul>
  
//           <hr />

//           <h2>Practical Example – collegeDb (Full Setup)</h2>
//           <p>
//             Run the following script <strong>once</strong> to create the practice database and tables 
//             that we will use throughout the rest of the course.
//           </p>

//           <pre>
//             <code>{`-- =============================================
//                     -- collegeDb - complete setup for sample data
//                     -- =============================================
                    
//                     -- create database collegeDb;
                    
//                     -- use collegeDb; -- (to set the newly created database in the current context, SQL script file)
                    
//                     -- 1. departments
//                     create table departments
//                     (
//                         departmentId   int primary key identity(1,1),
//                         departmentName varchar(100) not null unique
//                     );
                    
//                     -- 2. classes
//                     create table classes
//                     (
//                         classId   int primary key identity(1,1),
//                         className varchar(100) not null
//                     );                    

                    
//                     -- 3. teachers
//                     create table teachers
//                     (
//                         teacherId    int primary key identity(1,1),
//                         teacherName  varchar(100) not null,
//                         age          int,
//                         gender       varchar(10),
//                         city         varchar(50),
//                         departmentId int,
//                         classId      int,
                    
//                         constraint fk_teachers_departments
//                             foreign key (departmentId) references departments(departmentId),
//                         constraint fk_teachers_classes
//                             foreign key (classId) references classes(classId)
//                     );
                    
//                     -- 4. students
//                     create table students
//                     (
//                         studentId    int primary key identity(1,1),
//                         studentName  varchar(100) not null,
//                         age          int,
//                         gender       varchar(10),
//                         city         varchar(50),
//                         marks        int,
//                         departmentId int,
                    
//                         constraint ck_students_age   check (age >= 16),
//                         constraint ck_students_marks check (marks between 0 and 100),
//                         constraint fk_students_departments
//                             foreign key (departmentId) references departments(departmentId)
//                     );
                    
                    
                    
//                     -- =============================================
//                     -- sample data
//                     -- =============================================

//                     -- sample data for departments
//                     insert into departments (departmentName)
//                     values
//                     ('Computer Science'),
//                     ('Information Technology'),
//                     ('Software Engineering'),
//                     ('Business Administration'),
//                     ('Accounting & Finance'),
//                     ('Psychology');
                    

//                     -- sample data for classes
//                     insert into classes (className)
//                     values
//                     ('1-A'),('1-B'),('2-A'),('2-B'),('3-A'),('3-B'),
//                     ('4-A'),('4-B'),('5-A'),('5-B'),('6-A'),('6-B'),
//                     ('7-A'),('7-B'),('8-A'),('8-B'),('9-A'),('9-B'),
//                     ('10-A'),('10-B');
                    

//                     -- sample data for teachers
//                     insert into teachers (teacherName, age, gender, city, departmentId, classId)
//                     values
//                     ('Ali', 20, 'Male', 'Karachi', 1, 1),
//                     ('Ahmed', 21, 'Male', 'Lahore', 4, 2),
//                     ('Sara', 20, 'Female', 'Karachi', 3, 4),
//                     ('Ayesha', 22, 'Female', 'Islamabad', 2, 20),
//                     ('Hamza', 23, 'Male', 'Karachi', 1, 18),
//                     ('Usman', 21, 'Male', 'Lahore', 4, 1),
//                     ('Hina', 20, 'Female', 'Karachi', 3, 11),
//                     ('Bilal', 24, 'Male', 'Islamabad', 4, 15),
//                     ('Fatima', 22, 'Female', 'Karachi', 2, 17),
//                     ('Zain', 19, 'Male', 'Lahore', 1, 5);
                    

//                     -- Sample Data for students
//                     insert into students (studentName, age, gender, city, marks, departmentId)
//                     values
//                     ('Ali', 20, 'Male', 'Karachi', 85, 1),
//                     ('Ahmed', 21, 'Male', 'Lahore', 72, 2),
//                     ('Sara', 20, 'Female', 'Karachi', 91, 1),
//                     ('Ayesha', 22, 'Female', 'Islamabad', 88, 3),
//                     ('Hamza', 23, 'Male', 'Karachi', 65, 2),
//                     ('Usman', 21, 'Male', 'Lahore', 78, 1),
//                     ('Hina', 20, 'Female', 'Karachi', 95, 2),
//                     ('Bilal', 24, 'Male', 'Islamabad', 55, 4),
//                     ('Fatima', 22, 'Female', 'Karachi', 82, 3),
//                     ('Zain', 19, 'Male', 'Lahore', 69, 1);
                    
                    
//                     -- Verify after inserting all sample data in each respective tables
//                     select * from departments;
//                     select * from classes;
//                     select * from teachers;
//                     select * from students;
//                     `
//                   }
//             </code>
//           </pre>
          
//           <hr />
              
//           <h2>Session 6 Exercise</h2>
//           <ol>
//             <li>Create a table named <code>Students</code> with appropriate columns (StudentID, FirstName, LastName, Email, DateOfBirth, EnrollmentDate).</li>
//             <li>Add a Primary Key and at least two other constraints.</li>
//             <li>Create a table named <code>Courses</code> and link it with <code>Students</code> using a junction table <code>StudentCourses</code> (Many-to-Many).</li>
//             <li>Add a new column <code>PhoneNumber</code> to the Students table.</li>
//             <li>Write the command to drop the PhoneNumber column.</li>
//           </ol>

//           <hr />

//           <h2>Session 6 Challenge</h2>
//           <p>Design and create the following tables for a simple Library System:</p>
//           <ul>
//             <li><strong>Books</strong> (BookID, Title, Author, ISBN, PublishedYear, AvailableCopies)</li>
//             <li><strong>Members</strong> (MemberID, FullName, Email, JoinDate, Phone)</li>
//             <li><strong>Borrowings</strong> (BorrowingID, BookID, MemberID, BorrowDate, ReturnDate)</li>
//           </ul>

//           <p>Requirements:</p>
//           <ul>
//             <li>Proper data types</li>
//             <li>Primary Keys</li>
//             <li>Foreign Keys</li>
//             <li>At least one CHECK and one DEFAULT constraint</li>
//           </ul>

//           <hr />

//           <h2>Session 6 Quiz</h2>
//           <ol>
//             <li>What is a table in SQL Server?</li>
//             <li>What is the difference between <code>char</code> and <code>varchar</code>?</li>
//             <li>What does the <code>IDENTITY</code> property do?</li>
//             <li>Name five common constraints and their purpose.</li>
//             <li>What is the purpose of a Foreign Key?</li>
//             <li>How do you add a new column to an existing table?</li>
//             <li>How do you change the data type of an existing column?</li>
//             <li>What happens if you try to drop a table that is referenced by a foreign key?</li>
//             <li>What is the <code>hierarchyid</code> data type used for?</li>
//             <li>What is the difference between <code>geometry</code> and <code>geography</code> data types?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 07):</strong> Microsoft Azure SQL</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
