import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session06() {

  return (
    <Layout
      title="Session 06 — Creating Tables"
      description="Creating Tables in SQL Server 2022 — Data Types, Constraints, ALTER TABLE, DROP TABLE, AdventureWorks2019"
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
            <strong>Practical Database:</strong> AdventureWorks2019
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
            <li>Explain how AdventureWorks2019 uses tables and relationships</li>
            <li>Add, modify, and drop columns using ALTER TABLE</li>
            <li>Understand how to safely drop tables</li>
            <li>Inspect existing AdventureWorks2019 tables and their structures</li>
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
            For example, AdventureWorks2019 contains a table named
            <code>Production.Product</code> that stores information about
            products.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT TOP 10
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

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

          <h2>4. Understanding Existing AdventureWorks2019 Tables</h2>

          <p>
            Before creating our own tables, let's inspect the tables already
            available in AdventureWorks2019.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This query lists the base tables available in the database.
          </p>

          <h3>Example AdventureWorks2019 Tables</h3>

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

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This allows us to see the column names, data types, maximum
            character lengths, and whether NULL values are allowed.
          </p>

          <hr />

          <h2>6. Creating a Schema</h2>

          <p>
            Use the <code>CREATE SCHEMA</code> statement to create a new schema.
            It's always a good practice for beginners to create separate schema for separating entity (real world object)
          </p>

          <p>
            For learning purposes, we will create a small temporary practice
            schema. We will <strong>not modify AdventureWorks2019 schemas</strong>.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

CREATE SCHEMA PracticeStudent;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Important Points</h3>

          <ul>
            <li>
              <code>SCHEMA</code> creates a separate namespace for organizing objects.
            </li>
          </ul>

          <hr />

          <h2>7. Creating a Table</h2>

          <p>
            Use the <code>CREATE TABLE</code> statement to create a new table.
          </p>

          <p>
            For learning purposes, we will create a small temporary practice
            table. We will <strong>not modify AdventureWorks2019 tables</strong>.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

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

          <h2>8. Common Constraints</h2>

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

          <h2>9. Adding a Foreign Key</h2>

          <p>
            A <strong>Foreign Key</strong> creates a relationship between a
            child table and a parent table.
          </p>

          <p>
            AdventureWorks2019 contains many examples of this concept.
            For example, products are connected to product subcategories.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.ProductSubcategoryID,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Here, <code>ProductSubcategoryID</code> connects the
            <code>Production.Product</code> table with the
            <code>Production.ProductSubcategory</code> table.
          </p>

          <p>
            We can also demonstrate the concept using our own practice tables.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>10. Modifying a Table — ALTER TABLE</h2>

          <p>
            The <code>ALTER TABLE</code> statement is used to change an
            existing table.
          </p>

          <h3>Add a Column</h3>

          <CodeBlock
          language="sql"
            code={`ALTER TABLE CourseStudents
ADD PhoneNumber NVARCHAR(20);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Modify a Column</h3>

          <CodeBlock
          language="sql"
            code={`ALTER TABLE CourseStudents
ALTER COLUMN PhoneNumber NVARCHAR(30);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Drop a Column</h3>

          <CodeBlock
          language="sql"
            code={`ALTER TABLE CourseStudents
DROP COLUMN PhoneNumber;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Add a UNIQUE Constraint</h3>

          <CodeBlock
          language="sql"
            code={`ALTER TABLE CourseStudents
ADD CONSTRAINT UQ_CourseStudents_StudentName
UNIQUE (StudentName);
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <strong>Important:</strong> Before changing an existing column,
            make sure the new data type is compatible with the existing data.
          </p>

          <hr />

          <h2>11. Inspecting Constraints in AdventureWorks2019</h2>

          <p>
            AdventureWorks2019 contains many Primary Key and Foreign Key
            relationships. We can inspect them using system catalog views.
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT
    fk.name AS ForeignKeyName,
    OBJECT_SCHEMA_NAME(fk.parent_object_id) AS ChildSchema,
    OBJECT_NAME(fk.parent_object_id) AS ChildTable,
    OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS ParentSchema,
    OBJECT_NAME(fk.referenced_object_id) AS ParentTable
FROM sys.foreign_keys AS fk
ORDER BY ChildSchema, ChildTable;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This is a useful way to see how tables in a real-world database
            are connected.
          </p>

          <hr />

          <h2>12. Dropping a Table</h2>

          <p>
            The <code>DROP TABLE</code> statement permanently removes a table
            and its data.
          </p>

          <CodeBlock
          language="sql"
            code={`DROP TABLE CourseStudents;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            A safer approach is to check whether the table exists first.
          </p>

          <CodeBlock
          language="sql"
            code={`IF OBJECT_ID('dbo.CourseStudents', 'U') IS NOT NULL
    DROP TABLE dbo.CourseStudents;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <strong>Important:</strong> Do not execute <code>DROP TABLE</code>
            against AdventureWorks2019 tables during this course.
          </p>

          <p>
            For example, students should <strong>not</strong> run:
          </p>

          <CodeBlock
          language="sql"
            code={`DROP TABLE Production.Product;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This would attempt to remove an important AdventureWorks table and
            may also be blocked by existing relationships.
          </p>

          <hr />

          <h2>13. Practical — Working with AdventureWorks2019</h2>

          <p>
            Now let's apply what we have learned to the real AdventureWorks2019
            database.
          </p>

          <h3>Practical 1 — Select a Table</h3>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO

SELECT TOP 10 *
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Practical 2 — Select Specific Columns</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ProductNumber,
    Color,
    ListPrice
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Practical 3 — Inspect the Table Structure</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Production'
  AND TABLE_NAME = 'Product'
ORDER BY ORDINAL_POSITION;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Practical 4 — Find Primary Key Information</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 6 Exercise</h2>
          <ol>
            <li>List five common data types used in SQL Server.</li>
            <li>Create a practice table with at least one PRIMARY KEY and one CHECK constraint.</li>
            <li>Use ALTER TABLE to add a column and then drop it.</li>
            <li>Inspect the columns of Production.Product in AdventureWorks2019.</li>
            <li>Explain why you should not drop AdventureWorks tables during this course.</li>
          </ol>

          <hr />

          <h2>Session 6 Challenge</h2>
          <p>Create two related practice tables (Departments and PracticeStudents) with a Foreign Key, insert a few sample rows, then drop the practice tables safely.</p>

          <hr />

          <h2>Session 6 Quiz</h2>
          <ol>
            <li>What is a table in an RDBMS?</li>
            <li>Name three common string data types.</li>
            <li>What does IDENTITY(1,1) do?</li>
            <li>What is the purpose of a PRIMARY KEY?</li>
            <li>What is a FOREIGN KEY used for?</li>
            <li>Which statement is used to modify an existing table?</li>
            <li>How do you add a column to an existing table?</li>
            <li>What does CHECK constraint enforce?</li>
            <li>Why is it dangerous to run DROP TABLE on AdventureWorks tables?</li>
            <li>What schema is used by the Product table in AdventureWorks2019?</li>
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
