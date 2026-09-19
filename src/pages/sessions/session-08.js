import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session08() {
  return (
    <Layout
      title="Session 08 — Accessing Data"
      description="Accessing Data in SQL Server 2022 — SELECT Statement, Clauses, ORDER BY, Working with XML"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 08 — Accessing Data</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Mastering the SELECT statement and working with data (including XML) in SQL Server 2022.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 8</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Describe the SELECT statement, its syntax, and use</li>
            <li>Explain various clauses used with SELECT</li>
            <li>State the use of the ORDER BY clause</li>
            <li>Describe working with typed and untyped XML</li>
            <li>Explain the procedure to create, use, and view XML schemas</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>
          <p>The <strong>SELECT</strong> statement is the most important and most frequently used command in SQL. It is used to retrieve data from one or more tables.</p>

          <p>XML is also supported in SQL Server and is commonly used for storing and exchanging structured data.</p>

          <hr />

                    <h2>2. The SELECT Statement</h2>
          <p>Basic syntax:</p>

          <pre>
            <code>{`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1 ASC|DESC;`}</code>
          </pre>

          <h3>Simple Examples</h3>
          <pre>
            <code>{`-- Select all columns
SELECT * FROM Students;

-- Select specific columns
SELECT Name, Age, Marks FROM Students;

-- Select with alias
SELECT Name AS StudentName, Marks AS StudentMarks
FROM Students;`}</code>
          </pre>

          <hr />

          <h2>3. Important Clauses used with SELECT</h2>

          <h3>3.1 FROM Clause</h3>
          <p>Specifies the table(s) from which to retrieve data.</p>
  
          <h3>3.2 WHERE Clause</h3>
          <p>Filters rows based on a condition.</p>
  
          <pre>
            <code>{`SELECT * FROM Students
WHERE Marks > 80;

SELECT * FROM Students
WHERE City = 'Karachi' AND Gender = 'Female';`}</code>
          </pre>

          <h3>3.3 ORDER BY Clause</h3>

          <p>Sorts the result set in ascending (ASC) or descending (DESC) order.</p>
  
          <pre>
            <code>{`-- Sort by Marks ascending (default)
SELECT Name, Marks FROM Students
ORDER BY Marks;

-- Sort by Marks descending
SELECT Name, Marks FROM Students
ORDER BY Marks DESC;

-- Sort by multiple columns
SELECT Name, City, Marks FROM Students
ORDER BY City ASC, Marks DESC;`}</code>
          </pre>

          <h3>3.4 Other Useful Clauses</h3>
          <ul>
            <li><code>TOP</code> – Limits the number of rows returned</li>
            <li><code>DISTINCT</code> – Removes duplicate rows</li>
            <li><code>GROUP BY</code> – Groups rows (covered in later sessions)</li>
            <li><code>HAVING</code> – Filters groups (covered in later sessions)</li>
          </ul>
  
          <pre>
            <code>{`-- Top 3 highest scoring students
SELECT TOP 3 Name, Marks FROM Students
ORDER BY Marks DESC;

-- Distinct cities
SELECT DISTINCT City FROM Students;`}</code>
          </pre>

          <hr />

          <h2>4. Filtering Data with WHERE</h2>
          <p>Common operators used in the WHERE clause:</p>

          <table>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>=, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=</td>
                <td>Comparison</td>
                <td>Salary &gt; 50000</td>
              </tr>
              <tr>
                <td>AND, OR, NOT</td>
                <td>Logical</td>
                <td>Age &gt; 25 AND City = 'Karachi'</td>
              </tr>
              <tr>
                <td>BETWEEN</td>
                <td>Range</td>
                <td>Salary BETWEEN 40000 AND 80000</td>
              </tr>
              <tr>
                <td>IN</td>
                <td>List of values</td>
                <td>DepartmentID IN (1, 3, 5)</td>
              </tr>
              <tr>
                <td>LIKE</td>
                <td>Pattern matching</td>
                <td>FirstName LIKE 'A%'</td>
              </tr>
              <tr>
                <td>IS NULL / IS NOT NULL</td>
                <td>Check for NULL</td>
                <td>Email IS NULL</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>5. Working with XML in SQL Server</h2>
          <p>SQL Server provides strong support for XML data.</p>

          <h3>5.1 Untyped XML</h3>
          <p>When you store XML data in a column of type <code>xml</code> without associating it with an XML schema, it is called <strong>untyped XML</strong>.</p>

          <pre>
            <code>{`CREATE TABLE ProductInfo
(
    ProductID INT PRIMARY KEY,
    ProductDetails XML
);

INSERT INTO ProductInfo VALUES
(1, '<Product><Name>Laptop</Name><Price>85000</Price></Product>');`}</code>
          </pre>

          <h3>5.2 Typed XML</h3>
          <p>When XML data is associated with an XML schema collection, it becomes <strong>typed XML</strong>. Typed XML provides:</p>
          <ul>
            <li>Data validation</li>
            <li>Better type information</li>
            <li>Improved query performance in some cases</li>
          </ul>

          <hr />

          <h2>6. XML Schema Collections</h2>
          <p>An <strong>XML Schema Collection</strong> is a collection of XML schemas that can be used to validate typed XML data.</p>

          <h3>Creating an XML Schema Collection</h3>
          <pre>
            <code>{`CREATE XML SCHEMA COLLECTION ProductSchema AS
'<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Product">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:string"/>
        <xs:element name="Price" type="xs:decimal"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>';
GO`}</code>
          </pre>

          <h3>Using Typed XML</h3>
          <pre>
            <code>{`CREATE TABLE ProductInfoTyped
(
    ProductID INT PRIMARY KEY,
    ProductDetails XML (ProductSchema)
);`}</code>
          </pre>

          <h3>Viewing XML Schema Collections</h3>
          <pre>
            <code>{`-- List all XML schema collections
SELECT * FROM sys.xml_schema_collections;

-- View details of a specific schema collection
SELECT * FROM sys.xml_schema_collections
WHERE name = 'ProductSchema';`}</code>
          </pre>

          <hr />

          <h2>7. Querying XML Data (Basic)</h2>
          <pre>
            <code>{`-- Extract value from XML
SELECT 
    ProductID,
    ProductDetails.value('(/Product/Name)[1]', 'NVARCHAR(50)') AS ProductName,
    ProductDetails.value('(/Product/Price)[1]', 'DECIMAL(10,2)') AS Price
FROM ProductInfo;`}</code>
          </pre>

          <hr />

            <hr />

          <h2>Practical Example – CollegeDB</h2>

          <h3>SELECT Statement</h3>
          <pre>
            <code>{`-- Select every column
SELECT * FROM Students;

-- Select specific columns
SELECT Name, Age, Marks FROM Students;

-- Rename a column using AS
SELECT Name, Marks AS StudentMarks FROM Students;

-- Calculated column
SELECT Name, Marks, Marks + 5 AS MarksAfterBonus FROM Students;`}</code>
          </pre>

          <h3>WHERE Clause</h3>
          <pre>
            <code>{`SELECT * FROM Students WHERE City = 'Karachi';
SELECT * FROM Students WHERE Marks > 80;
SELECT * FROM Students WHERE Marks < 70;
SELECT * FROM Students WHERE Age >= 21;
SELECT * FROM Students WHERE City <> 'Karachi';`}</code>
          </pre>

          <h3>AND | OR | NOT</h3>
          <pre>
            <code>{`SELECT * FROM Students WHERE City = 'Karachi' AND Marks > 80;
SELECT * FROM Students WHERE City = 'Karachi' OR City = 'Lahore';
SELECT * FROM Students WHERE NOT City = 'Karachi';

SELECT * FROM Students
WHERE Gender = 'Female' AND City = 'Karachi' AND Marks >= 80;

-- Complex condition with parentheses
SELECT Name, City, Marks
FROM Students
WHERE (City = 'Karachi' OR City = 'Lahore') AND Marks >= 70;`}</code>
          </pre>

          <h3>ORDER BY</h3>
          <pre>
            <code>{`SELECT * FROM Students ORDER BY Marks ASC;
SELECT * FROM Students ORDER BY Marks DESC;
SELECT * FROM Students ORDER BY Name ASC;
SELECT * FROM Students ORDER BY City ASC, Marks DESC;`}</code>
          </pre>

          <h3>TOP</h3>
          <pre>
            <code>{`SELECT TOP 3 * FROM Students ORDER BY Marks DESC;
SELECT TOP 1 * FROM Students ORDER BY Marks DESC;
SELECT TOP 50 PERCENT * FROM Students ORDER BY Marks DESC;`}</code>
          </pre>

          <h3>DISTINCT</h3>
          <pre>
            <code>{`SELECT DISTINCT City FROM Students;
SELECT DISTINCT DepartmentID FROM Students;
SELECT DISTINCT City, DepartmentID FROM Students;`}</code>
          </pre>

          <h3>LIKE</h3>
          <pre>
            <code>{`SELECT * FROM Students WHERE Name LIKE 'A%';      -- starts with A
SELECT * FROM Students WHERE Name LIKE '%a';      -- ends with a
SELECT * FROM Students WHERE Name LIKE '%ha%';    -- contains "ha"
SELECT * FROM Students WHERE Name LIKE '____';    -- exactly 4 characters
SELECT * FROM Students WHERE Name LIKE '_a%';     -- second character is 'a'`}</code>
          </pre>

          <h3>IN</h3>
          <pre>
            <code>{`SELECT * FROM Students WHERE City IN ('Karachi', 'Lahore');
SELECT * FROM Students WHERE DepartmentID IN (1, 2, 3);
SELECT * FROM Students WHERE City NOT IN ('Karachi', 'Lahore');`}</code>
          </pre>

          <h3>BETWEEN</h3>
          <pre>
            <code>{`SELECT * FROM Students WHERE Marks BETWEEN 70 AND 90;
SELECT * FROM Students WHERE Age BETWEEN 20 AND 22;
SELECT * FROM Students WHERE Marks NOT BETWEEN 70 AND 90;`}</code>
          </pre>

          <h3>NULL Handling</h3>
          <pre>
            <code>{`-- Insert a student with NULL City
INSERT INTO Students (Name, Age, Gender, City, Marks, DepartmentID)
VALUES ('Noor', 21, 'Female', NULL, 76, 3);

SELECT * FROM Students WHERE City IS NULL;
SELECT * FROM Students WHERE City IS NOT NULL;
-- Never use: WHERE City = NULL`}</code>
          </pre>

          <h3>UPDATE</h3>
          <pre>
            <code>{`UPDATE Students SET Marks = 90 WHERE StudentID = 2;
UPDATE Students SET City = 'Karachi' WHERE StudentID = 2;

UPDATE Students
SET Marks = 88, City = 'Lahore'
WHERE StudentID = 2;

-- DANGEROUS (updates ALL rows)
-- UPDATE Students SET Marks = 100;`}</code>
          </pre>

          <h3>DELETE</h3>
          <pre>
            <code>{`DELETE FROM Students WHERE StudentID = 11;

-- Always test with SELECT first
SELECT * FROM Students WHERE Marks < 60;
-- Then:
-- DELETE FROM Students WHERE Marks < 60;

-- DANGEROUS
-- DELETE FROM Students;`}</code>
          </pre>

  <hr />
  
          <h2>Session 8 Exercise</h2>
          <ol>
            <li>Write a query to display all employees with salary greater than 60,000 and sort them by salary descending.</li>
            <li>Display the top 10 most recently hired employees.</li>
            <li>Find all employees whose first name starts with ‘A’.</li>
            <li>Create a table with an XML column and insert at least two records.</li>
            <li>Write a query to extract values from the XML column.</li>
          </ol>

          <hr />

          <h2>Session 8 Challenge</h2>
          <p>Using the AdventureWorks2022 database (or your own tables):</p>
          <ol>
            <li>Write a SELECT statement that shows Employee Name, Job Title, and Hire Date for employees hired after 2015.</li>
            <li>Sort the result by Hire Date descending.</li>
            <li>Create a simple table that stores product information as XML (both typed and untyped versions if possible).</li>
            <li>Query the XML data using the <code>.value()</code> method.</li>
          </ol>

          <hr />

          <h2>Session 8 Quiz</h2>
          <ol>
            <li>What is the purpose of the SELECT statement?</li>
            <li>What is the difference between WHERE and HAVING? (Basic idea)</li>
            <li>What does the ORDER BY clause do?</li>
            <li>What is the default sorting order in ORDER BY?</li>
            <li>What is the difference between typed and untyped XML?</li>
            <li>What is an XML Schema Collection?</li>
            <li>Which system view can be used to see XML schema collections?</li>
            <li>What method is commonly used to extract values from an XML column?</li>
            <li>Can you use SELECT without a FROM clause? Give an example.</li>
            <li>What is the purpose of the TOP clause?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 09):</strong> Advanced Queries and Joins</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
