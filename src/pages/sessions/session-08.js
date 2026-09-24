import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session08() {
  return (
    <Layout
      title="Session 08 — Accessing Data"
      description="Accessing Data in SQL Server 2022 — SELECT Statement, WHERE, ORDER BY, TOP, DISTINCT, LIKE, IN, BETWEEN, NULL, XML"
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

          <h1>Session 08 — Accessing Data</h1>

          <p><strong>Duration:</strong> 2 hours</p>

          <p>
            <strong>Focus:</strong> Mastering the SELECT statement and
            accessing data using filtering, sorting, and other SELECT clauses.
            The session also introduces XML data in SQL Server.
          </p>

          <p>
            <strong>Practical Database:</strong> AdventureWorks2022
          </p>

          <p>
            <strong>Based on:</strong> Official Aptech Book – Session 8
          </p>

          <hr />

          <h2>Learning Objectives</h2>

          <p>By the end of this session, you should be able to:</p>

          <ul>
            <li>Describe the SELECT statement, its syntax, and use</li>
            <li>Retrieve data from AdventureWorks2022</li>
            <li>Use the WHERE clause to filter records</li>
            <li>Use ORDER BY to sort query results</li>
            <li>Use TOP and DISTINCT</li>
            <li>Use AND, OR, NOT, IN, BETWEEN, and LIKE</li>
            <li>Work with NULL values</li>
            <li>Understand typed and untyped XML</li>
            <li>Explain XML Schema Collections</li>
            <li>Extract values from XML data</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>

          <p>
            The <strong>SELECT</strong> statement is one of the most important
            and frequently used statements in SQL Server.
          </p>

          <p>
            It is used to retrieve data from one or more tables.
          </p>

          <p>
            Throughout this session, we will use the
            <strong> AdventureWorks2022</strong> database to practice
            accessing real-world sample data.
          </p>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

SELECT *
FROM Production.Product;
GO`}</code>
          </pre>

          <p>
            SQL Server also provides support for XML data. XML can be stored,
            validated, queried, and processed using SQL Server XML features.
          </p>

          <hr />

          <h2>2. The SELECT Statement</h2>

          <p>
            The basic syntax of the SELECT statement is:
          </p>

          <pre>
            <code>{`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1 ASC | DESC;`}</code>
          </pre>

          <h3>Simple AdventureWorks2022 Example</h3>

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

          <h3>Select All Columns</h3>

          <pre>
            <code>{`SELECT *
FROM Production.Product;
GO`}</code>
          </pre>

          <p>
            The <code>*</code> means that all columns are requested.
          </p>

          <p>
            Although <code>SELECT *</code> is useful while learning and
            exploring data, explicitly specifying columns is often preferable
            in application queries.
          </p>

          <h3>Column Aliases</h3>

          <pre>
            <code>{`SELECT
    ProductID AS ID,
    Name AS ProductName,
    ListPrice AS Price
FROM Production.Product;
GO`}</code>
          </pre>

          <hr />

          <h2>3. Important Clauses Used with SELECT</h2>

          <h3>3.1 FROM Clause</h3>

          <p>
            The <code>FROM</code> clause specifies the table or tables from
            which data will be retrieved.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>3.2 WHERE Clause</h3>

          <p>
            The <code>WHERE</code> clause filters rows based on a condition.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
GO`}</code>
          </pre>

          <p>
            Only products with a list price greater than 1000 are returned.
          </p>

          <h3>3.3 ORDER BY Clause</h3>

          <p>
            The <code>ORDER BY</code> clause sorts the result set.
          </p>

          <h4>Ascending Order</h4>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
ORDER BY ListPrice ASC;
GO`}</code>
          </pre>

          <h4>Descending Order</h4>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

          <h4>Sort by Multiple Columns</h4>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
ORDER BY Color ASC, ListPrice DESC;
GO`}</code>
          </pre>

          <hr />

          <h2>4. Other Useful SELECT Clauses</h2>

          <ul>
            <li>
              <code>TOP</code> — Limits the number of rows returned.
            </li>

            <li>
              <code>DISTINCT</code> — Removes duplicate rows from the result.
            </li>

            <li>
              <code>GROUP BY</code> — Groups rows and will be covered in a
              later session.
            </li>

            <li>
              <code>HAVING</code> — Filters grouped results and will be
              covered later.
            </li>
          </ul>

          <h3>TOP</h3>

          <pre>
            <code>{`SELECT TOP 10
    ProductID,
    Name,
    ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

          <p>
            This returns the 10 products with the highest list prices.
          </p>

          <h3>DISTINCT</h3>

          <pre>
            <code>{`SELECT DISTINCT
    Color
FROM Production.Product
WHERE Color IS NOT NULL;
GO`}</code>
          </pre>

          <p>
            This returns each available product color only once.
          </p>

          <hr />

          <h2>5. Filtering Data with WHERE</h2>

          <p>
            The WHERE clause can use comparison, logical, range, list, and
            pattern-matching operators.
          </p>

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
                <td><code>=, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=</code></td>
                <td>Comparison</td>
                <td><code>ListPrice &gt; 500</code></td>
              </tr>

              <tr>
                <td><code>AND, OR, NOT</code></td>
                <td>Logical operators</td>
                <td><code>ListPrice &gt; 500 AND Color = 'Black'</code></td>
              </tr>

              <tr>
                <td><code>BETWEEN</code></td>
                <td>Range</td>
                <td><code>ListPrice BETWEEN 500 AND 1000</code></td>
              </tr>

              <tr>
                <td><code>IN</code></td>
                <td>List of values</td>
                <td><code>Color IN ('Black', 'Red')</code></td>
              </tr>

              <tr>
                <td><code>LIKE</code></td>
                <td>Pattern matching</td>
                <td><code>Name LIKE 'Road%'</code></td>
              </tr>

              <tr>
                <td><code>IS NULL</code></td>
                <td>Checks for NULL</td>
                <td><code>Color IS NULL</code></td>
              </tr>

              <tr>
                <td><code>IS NOT NULL</code></td>
                <td>Checks for non-NULL values</td>
                <td><code>Color IS NOT NULL</code></td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>6. Comparison Operators</h2>

          <p>
            Comparison operators are used to compare values.
          </p>

          <h3>Greater Than</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
GO`}</code>
          </pre>

          <h3>Less Than</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice < 100;
GO`}</code>
          </pre>

          <h3>Greater Than or Equal To</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice >= 500;
GO`}</code>
          </pre>

          <h3>Not Equal</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color <> 'Black';
GO`}</code>
          </pre>

          <hr />

          <h2>7. AND, OR, and NOT</h2>

          <h3>AND</h3>

          <p>
            <code>AND</code> requires all specified conditions to be true.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE Color = 'Black'
  AND ListPrice > 500;
GO`}</code>
          </pre>

          <h3>OR</h3>

          <p>
            <code>OR</code> returns rows where at least one condition is true.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color = 'Black'
   OR Color = 'Red';
GO`}</code>
          </pre>

          <h3>NOT</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE NOT Color = 'Black';
GO`}</code>
          </pre>

          <h3>Using Parentheses</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE
    (Color = 'Black' OR Color = 'Red')
    AND ListPrice > 500;
GO`}</code>
          </pre>

          <p>
            Parentheses make complex conditions easier to understand and
            control the logical evaluation order.
          </p>

          <hr />

          <h2>8. LIKE Operator</h2>

          <p>
            The <code>LIKE</code> operator is used for pattern matching.
          </p>

          <h3>Starts With</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name
FROM Production.Product
WHERE Name LIKE 'Road%';
GO`}</code>
          </pre>

          <p>
            <code>%</code> represents zero or more characters.
          </p>

          <h3>Ends With</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name
FROM Production.Product
WHERE Name LIKE '%Bike';
GO`}</code>
          </pre>

          <h3>Contains Text</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name
FROM Production.Product
WHERE Name LIKE '%Mountain%';
GO`}</code>
          </pre>

          <h3>Single Character Wildcard</h3>

          <p>
            The underscore <code>_</code> represents exactly one character.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    ProductNumber
FROM Production.Product
WHERE ProductNumber LIKE 'BK-___';
GO`}</code>
          </pre>

          <hr />

          <h2>9. IN Operator</h2>

          <p>
            The <code>IN</code> operator checks whether a value matches one of
            several specified values.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color IN ('Black', 'Red', 'Blue');
GO`}</code>
          </pre>

          <p>
            The same condition could be written using multiple
            <code>OR</code> operators, but <code>IN</code> is easier to read.
          </p>

          <h3>NOT IN</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color NOT IN ('Black', 'Red');
GO`}</code>
          </pre>

          <hr />

          <h2>10. BETWEEN Operator</h2>

          <p>
            <code>BETWEEN</code> is used to search for values within a range.
          </p>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
GO`}</code>
          </pre>

          <p>
            <strong>Important:</strong> BETWEEN is inclusive, meaning the
            boundary values are included.
          </p>

          <h3>NOT BETWEEN</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice NOT BETWEEN 500 AND 1000;
GO`}</code>
          </pre>

          <hr />

          <h2>11. NULL Handling</h2>

          <p>
            <code>NULL</code> represents a missing or unknown value.
          </p>

          <p>
            We cannot correctly test for NULL using:
          </p>

          <pre>
            <code>{`WHERE Color = NULL;`}</code>
          </pre>

          <p>
            Instead, use <code>IS NULL</code> or <code>IS NOT NULL</code>.
          </p>

          <h3>IS NULL</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color IS NULL;
GO`}</code>
          </pre>

          <h3>IS NOT NULL</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color IS NOT NULL;
GO`}</code>
          </pre>

          <hr />

          <h2>12. Working with XML in SQL Server</h2>

          <p>
            SQL Server provides an <code>xml</code> data type for storing XML
            documents and fragments.
          </p>

          <p>
            XML can be stored as either:
          </p>

          <ul>
            <li><strong>Untyped XML</strong></li>
            <li><strong>Typed XML</strong></li>
          </ul>

          <hr />

          <h2>12.1 Untyped XML</h2>

          <p>
            Untyped XML is XML stored in a column of type
            <code>xml</code> without an associated XML Schema Collection.
          </p>

          <p>
            We will use a separate practice table for this demonstration
            rather than changing AdventureWorks2022.
          </p>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

CREATE TABLE StudentXMLPractice
(
    StudentID INT PRIMARY KEY,
    StudentDetails XML
);
GO`}</code>
          </pre>

          <h3>Insert XML Data</h3>

          <pre>
            <code>{`INSERT INTO StudentXMLPractice
(
    StudentID,
    StudentDetails
)
VALUES
(
    1,
    '<student>
        <studentName>Ali</studentName>
        <marks>85</marks>
        <city>Karachi</city>
     </student>'
),
(
    2,
    '<student>
        <studentName>Sara</studentName>
        <marks>92</marks>
        <city>Lahore</city>
     </student>'
);
GO`}</code>
          </pre>

          <h3>View XML Data</h3>

          <pre>
            <code>{`SELECT
    StudentID,
    StudentDetails
FROM StudentXMLPractice;
GO`}</code>
          </pre>

          <hr />

          <h2>12.2 Typed XML</h2>

          <p>
            Typed XML is associated with an XML Schema Collection.
          </p>

          <p>
            The schema defines rules for the XML structure and data types.
          </p>

          <p>
            This allows SQL Server to validate XML data against the defined
            schema.
          </p>

          <hr />

          <h2>13. XML Schema Collections</h2>

          <p>
            An <strong>XML Schema Collection</strong> stores one or more XML
            schemas that can be used to validate typed XML.
          </p>

          <h3>Creating an XML Schema Collection</h3>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

CREATE XML SCHEMA COLLECTION StudentSchema AS
N'
<xs:schema
    xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <xs:element name="student">
        <xs:complexType>
            <xs:sequence>

                <xs:element
                    name="studentName"
                    type="xs:string"/>

                <xs:element
                    name="marks"
                    type="xs:int"/>

                <xs:element
                    name="city"
                    type="xs:string"/>

            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>';
GO`}</code>
          </pre>

          <h3>Using Typed XML</h3>

          <pre>
            <code>{`CREATE TABLE StudentXMLTypedPractice
(
    StudentID INT PRIMARY KEY,
    StudentDetails XML(StudentSchema)
);
GO`}</code>
          </pre>

          <h3>Insert Typed XML</h3>

          <pre>
            <code>{`INSERT INTO StudentXMLTypedPractice
(
    StudentID,
    StudentDetails
)
VALUES
(
    1,
    '<student>
        <studentName>Ahmed</studentName>
        <marks>88</marks>
        <city>Karachi</city>
     </student>'
);
GO`}</code>
          </pre>

          <p>
            SQL Server validates the XML against the XML Schema Collection
            associated with the column.
          </p>

          <hr />

          <h2>14. Viewing XML Schema Collections</h2>

          <p>
            SQL Server provides system catalog views that can be used to
            inspect XML schema collections.
          </p>

          <pre>
            <code>{`SELECT
    name,
    xml_collection_id,
    principal_id
FROM sys.xml_schema_collections;
GO`}</code>
          </pre>

          <h3>Find Our Practice Schema</h3>

          <pre>
            <code>{`SELECT
    name,
    xml_collection_id
FROM sys.xml_schema_collections
WHERE name = 'StudentSchema';
GO`}</code>
          </pre>

          <hr />

          <h2>15. Querying XML Data</h2>

          <p>
            SQL Server provides XML methods such as
            <code>.value()</code> for extracting values from XML.
          </p>

          <h3>Extract Student Name</h3>

          <pre>
            <code>{`SELECT
    StudentID,
    StudentDetails.value(
        '(/student/studentName)[1]',
        'nvarchar(50)'
    ) AS StudentName
FROM StudentXMLPractice;
GO`}</code>
          </pre>

          <h3>Extract Multiple Values</h3>

          <pre>
            <code>{`SELECT
    StudentID,

    StudentDetails.value(
        '(/student/studentName)[1]',
        'nvarchar(50)'
    ) AS StudentName,

    StudentDetails.value(
        '(/student/marks)[1]',
        'int'
    ) AS Marks,

    StudentDetails.value(
        '(/student/city)[1]',
        'nvarchar(50)'
    ) AS City

FROM StudentXMLPractice;
GO`}</code>
          </pre>

          <hr />

          <h2>16. Practical — Working with AdventureWorks2022</h2>

          <p>
            This is the main practical section for Session 8.
            Students should use the AdventureWorks2022 database to practice
            accessing real-world data.
          </p>

          <h3>Practical 1 — Select All Products</h3>

          <pre>
            <code>{`USE AdventureWorks2022;
GO

SELECT *
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 2 — Select Specific Columns</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ProductNumber,
    Color,
    ListPrice
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 3 — Use an Alias</h3>

          <pre>
            <code>{`SELECT
    ProductID AS ID,
    Name AS ProductName,
    ListPrice AS Price
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 4 — Calculated Column</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice,
    ListPrice * 1.10 AS PriceWith10PercentIncrease
FROM Production.Product;
GO`}</code>
          </pre>

          <h3>Practical 5 — WHERE</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
GO`}</code>
          </pre>

          <h3>Practical 6 — AND</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
WHERE Color = 'Black'
  AND ListPrice > 500;
GO`}</code>
          </pre>

          <h3>Practical 7 — OR</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color = 'Black'
   OR Color = 'Red';
GO`}</code>
          </pre>

          <h3>Practical 8 — LIKE</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name
FROM Production.Product
WHERE Name LIKE '%Mountain%';
GO`}</code>
          </pre>

          <h3>Practical 9 — IN</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color IN ('Black', 'Red', 'Blue');
GO`}</code>
          </pre>

          <h3>Practical 10 — BETWEEN</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
GO`}</code>
          </pre>

          <h3>Practical 11 — TOP</h3>

          <pre>
            <code>{`SELECT TOP 10
    ProductID,
    Name,
    ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
GO`}</code>
          </pre>

          <h3>Practical 12 — DISTINCT</h3>

          <pre>
            <code>{`SELECT DISTINCT
    Color
FROM Production.Product
WHERE Color IS NOT NULL;
GO`}</code>
          </pre>

          <h3>Practical 13 — NULL</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color
FROM Production.Product
WHERE Color IS NULL;
GO`}</code>
          </pre>

          <h3>Practical 14 — ORDER BY</h3>

          <pre>
            <code>{`SELECT
    ProductID,
    Name,
    Color,
    ListPrice
FROM Production.Product
ORDER BY Color ASC, ListPrice DESC;
GO`}</code>
          </pre>

          <h3>Practical 15 — Working with Product Categories</h3>

          <pre>
            <code>{`SELECT
    ProductCategoryID,
    Name
FROM Production.ProductCategory
ORDER BY Name;
GO`}</code>
          </pre>

          <h3>Practical 16 — Working with Product Subcategories</h3>

          <pre>
            <code>{`SELECT
    ProductSubcategoryID,
    Name,
    ProductCategoryID
FROM Production.ProductSubcategory
ORDER BY Name;
GO`}</code>
          </pre>

          <p>
            These practical queries allow students to practice the SELECT
            statement against actual AdventureWorks2022 data instead of
            artificial student records.
          </p>

          <hr />

          <h2>17. Cleaning Up XML Practice Objects</h2>

          <p>
            The XML examples created practice objects inside
            AdventureWorks2022. These should be removed after the XML lesson
            so the sample database remains clean.
          </p>

          <pre>
            <code>{`DROP TABLE IF EXISTS StudentXMLTypedPractice;
GO

DROP TABLE IF EXISTS StudentXMLPractice;
GO

DROP XML SCHEMA COLLECTION StudentSchema;
GO`}</code>
          </pre>

          <p>
            <strong>Important:</strong> Do not drop any original
            AdventureWorks2022 tables.
          </p>

          <hr />

          <h2>18. Best Practices</h2>

          <ul>
            <li>
              Specify only the columns you need instead of always using
              <code>SELECT *</code>.
            </li>

            <li>
              Use meaningful aliases when they make query results easier to
              understand.
            </li>

            <li>
              Use <code>WHERE</code> to filter data as early as appropriate.
            </li>

            <li>
              Use <code>ORDER BY</code> when a specific result order is
              required.
            </li>

            <li>
              Use <code>IS NULL</code> and <code>IS NOT NULL</code> for NULL
              comparisons.
            </li>

            <li>
              Use parentheses when writing complex combinations of
              <code>AND</code> and <code>OR</code>.
            </li>

            <li>
              Use AdventureWorks2022 for read-only SQL practice whenever
              possible.
            </li>

            <li>
              Use separate practice objects for operations that create or
              modify database objects.
            </li>

            <li>
              Never drop or modify original AdventureWorks2022 tables during
              normal classroom practice.
            </li>
          </ul>

          <hr />

          <h2>Session 8 Exercise</h2>

          <p>
            Complete the following exercises using
            <strong>AdventureWorks2022</strong>.
          </p>

          <ol>

            <li>
              Display all columns from <code>Production.Product</code>.
            </li>

            <li>
              Display only ProductID, Name, ProductNumber, and ListPrice.
            </li>

            <li>
              Display ProductID, Name, and ListPrice using column aliases.
            </li>

            <li>
              Display products with a ListPrice greater than 500.
            </li>

            <li>
              Display products whose Color is Black.
            </li>

            <li>
              Display products whose Color is Black or Red.
            </li>

            <li>
              Display products with a ListPrice between 500 and 1500.
            </li>

            <li>
              Display products whose names contain the word
              <strong>Mountain</strong>.
            </li>

            <li>
              Display products whose Color is one of Black, Red, or Blue.
            </li>

            <li>
              Display the 10 most expensive products.
            </li>

            <li>
              Display all distinct product colors.
            </li>

            <li>
              Display products where Color is NULL.
            </li>

            <li>
              Sort products by ListPrice from highest to lowest.
            </li>

            <li>
              Create a separate XML practice table and insert at least two XML
              records.
            </li>

            <li>
              Extract values from the XML using the <code>.value()</code>
              method.
            </li>

          </ol>

          <hr />

          <h2>Session 8 Challenge</h2>

          <p>
            Using the <strong>AdventureWorks2022</strong> database, complete
            the following:
          </p>

          <ol>

            <li>
              Display ProductID, Product Name, Product Number, Color, and
              ListPrice.
            </li>

            <li>
              Show only products where ListPrice is greater than 1000.
            </li>

            <li>
              Show products whose names start with <code>Road</code>.
            </li>

            <li>
              Show products whose names contain <code>Bike</code>.
            </li>

            <li>
              Show products with colors Black, Red, or Silver.
            </li>

            <li>
              Show products with prices between 100 and 500.
            </li>

            <li>
              Sort the results by ListPrice descending.
            </li>

            <li>
              Display only the top 20 results.
            </li>

            <li>
              Display distinct product colors.
            </li>

            <li>
              Display Product Categories sorted alphabetically by category
              name.
            </li>

          </ol>

          <p>
            <strong>Bonus:</strong> Create a small XML practice table inside
            AdventureWorks2022, insert XML data, and use the
            <code>.value()</code> method to extract at least three values.
          </p>

          <hr />

          <h2>Session 8 Quiz</h2>

          <ol>

            <li>
              What is the purpose of the SELECT statement?
            </li>

            <li>
              What is the purpose of the FROM clause?
            </li>

            <li>
              What does the WHERE clause do?
            </li>

            <li>
              What does ORDER BY do?
            </li>

            <li>
              What is the default sorting direction of ORDER BY?
            </li>

            <li>
              What is the purpose of TOP?
            </li>

            <li>
              What does DISTINCT do?
            </li>

            <li>
              What is the difference between AND and OR?
            </li>

            <li>
              What is the purpose of the LIKE operator?
            </li>

            <li>
              What is the difference between IN and BETWEEN?
            </li>

            <li>
              How do you check whether a column contains NULL?
            </li>

            <li>
              What is the difference between typed and untyped XML?
            </li>

            <li>
              What is an XML Schema Collection?
            </li>

            <li>
              Which SQL Server XML method can be used to extract a value from
              XML?
            </li>

            <li>
              Why should students avoid modifying or dropping original
              AdventureWorks2022 tables during practical exercises?
            </li>

          </ol>

          <hr />

          <p>
            <strong>Next up (Session 09):</strong> Advanced Queries and Joins
          </p>

        </article>
      </CustomLayout>
    </Layout>
  );
}







// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';

// export default function Session08() {
//   return (
//     <Layout
//       title="Session 08 — Accessing Data"
//       description="Accessing Data in SQL Server 2022 — SELECT Statement, Clauses, ORDER BY, Working with XML"
//     >
//       <CustomLayout>
//         <article className="session-content">
//           <h1>Session 08 — Accessing Data</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p><strong>Focus:</strong> Mastering the SELECT statement and working with data (including XML) in SQL Server 2022.</p>
//           <p><strong>Based on:</strong> Official Aptech Book – Session 8</p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>Describe the SELECT statement, its syntax, and use</li>
//             <li>Explain various clauses used with SELECT</li>
//             <li>State the use of the ORDER BY clause</li>
//             <li>Describe working with typed and untyped XML</li>
//             <li>Explain the procedure to create, use, and view XML schemas</li>
//           </ul>

//           <hr />

//           <h2>1. Introduction</h2>
//           <p>The <strong>SELECT</strong> statement is the most important and most frequently used command in SQL. It is used to retrieve data from one or more tables.</p>

//           <p>XML is also supported in SQL Server and is commonly used for storing and exchanging structured data.</p>

//           <hr />

//                     <h2>2. The SELECT Statement</h2>
//           <p>Basic syntax:</p>

//           <pre>
//             <code>{`select column1, column2, ...
// from table_name
// where condition
// order by column1 asc|desc;`}</code>
//           </pre>

//           <h3>Simple Examples</h3>
//           <pre>
//             <code>{`-- Select all columns
// select * from students;

// -- Select specific columns
// select studentName, age, marks from students;

// -- Select with alias
// select studentName as StudentName, marks as StudentMarks
// from students;`}</code>
//           </pre>

//           <hr />

//           <h2>3. Important Clauses used with SELECT</h2>

//           <h3>3.1 from Clause</h3>
//           <p>Specifies the table(s) from which to retrieve data.</p>
  
//           <h3>3.2 where Clause</h3>
//           <p>Filters rows based on a condition.</p>
  
//           <pre>
//             <code>{`select * from students
// where marks > 80;

// select * from students
// where city = 'Karachi' and gender = 'Female';`}</code>
//           </pre>

//           <h3>3.3 order by Clause</h3>

//           <p>Sorts the result set in ascending (asc) or descending (desc) order.</p>
  
//           <pre>
//             <code>{`-- Sort by Marks ascending (default)
// select studentName, marks from students
// order by marks;

// -- Sort by Marks descending
// select studentName, marks from students
// order by marks desc;

// -- Sort by multiple columns
// select studentName, city, marks from students
// order by city asc, marks desc;`}</code>
//           </pre>

//           <h3>3.4 Other Useful Clauses</h3>
//           <ul>
//             <li><code>top</code> – Limits the number of rows returned</li>
//             <li><code>distinct</code> – Removes duplicate rows</li>
//             <li><code>group by</code> – Groups rows (covered in later sessions)</li>
//             <li><code>having</code> – Filters groups (covered in later sessions)</li>
//           </ul>
  
//           <pre>
//             <code>{`-- Top 3 highest scoring students
// select top 3 studentName, marks from students
// order by marks desc;

// -- Distinct cities
// select distinct city from students;`}</code>
//           </pre>

//           <hr />

//           <h2>4. Filtering Data with WHERE</h2>
//           <p>Common operators used in the WHERE clause:</p>

//           <table>
//             <thead>
//               <tr>
//                 <th>Operator</th>
//                 <th>Description</th>
//                 <th>Example</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>=, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=</td>
//                 <td>Comparison</td>
//                 <td>Salary &gt; 50000</td>
//               </tr>
//               <tr>
//                 <td>AND, OR, NOT</td>
//                 <td>Logical</td>
//                 <td>Age &gt; 25 AND City = 'Karachi'</td>
//               </tr>
//               <tr>
//                 <td>BETWEEN</td>
//                 <td>Range</td>
//                 <td>Salary BETWEEN 40000 AND 80000</td>
//               </tr>
//               <tr>
//                 <td>IN</td>
//                 <td>List of values</td>
//                 <td>DepartmentID IN (1, 3, 5)</td>
//               </tr>
//               <tr>
//                 <td>LIKE</td>
//                 <td>Pattern matching</td>
//                 <td>FirstName LIKE 'A%'</td>
//               </tr>
//               <tr>
//                 <td>IS NULL / IS NOT NULL</td>
//                 <td>Check for NULL</td>
//                 <td>Email IS NULL</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>5. Working with XML in SQL Server</h2>
//           <p>SQL Server provides strong support for XML data.</p>

//                     <h3>5.1 Untyped XML</h3>
//           <p>When you store XML data in a column of type <code>xml</code> without associating it with an XML schema, it is called <strong>untyped XML</strong>.</p>
//           <pre>
//             <code>{`create table studentInfo
// (
//     studentId int primary key,
//     studentDetails xml
// );

// insert into studentInfo values
// (1, '<student><studentName>Ali</studentName><marks>85</marks><city>Karachi</city></student>');`}</code>
//           </pre>

//           <h3>5.2 Typed XML</h3>
//           <p>When XML data is associated with an XML schema collection, it becomes <strong>typed XML</strong>. Typed XML provides:</p>
//           <ul>
//             <li>Data validation</li>
//             <li>Better type information</li>
//             <li>Improved query performance in some cases</li>
//           </ul>

//           <hr />

//                     <h2>6. XML Schema Collections</h2>
//           <p>An <strong>XML Schema Collection</strong> is a collection of XML schemas that can be used to validate typed XML data.</p>

//           <h3>Creating an XML Schema Collection</h3>
//           <pre>
//             <code>{`create xml schema collection studentSchema as
// '<?xml version="1.0"?>
// <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
//   <xs:element name="student">
//     <xs:complexType>
//       <xs:sequence>
//         <xs:element name="studentName" type="xs:string"/>
//         <xs:element name="marks" type="xs:int"/>
//         <xs:element name="city" type="xs:string"/>
//       </xs:sequence>
//     </xs:complexType>
//   </xs:element>
// </xs:schema>';
// `}</code>
//           </pre>

//           <h3>Using Typed XML</h3>
//           <pre>
//             <code>{`create table studentInfoTyped
// (
//     studentId int primary key,
//     studentDetails xml (studentSchema)
// );`}</code>
//           </pre>

//           <h3>Viewing XML Schema Collections</h3>
//           <pre>
//             <code>{`-- List all XML schema collections
// select * from sys.xml_schema_collections;

// -- View details of a specific schema collection
// select * from sys.xml_schema_collections
// where name = 'studentSchema';`}</code>
//           </pre>

//           <hr />

//           <h2>7. Querying XML Data (Basic)</h2>
//           <pre>
//             <code>{`-- Extract value from XML
// select 
//     studentId,
//     studentDetails.value('(/student/name)[1]', 'nvarchar(50)') as studentName,
//     studentDetails.value('(/student/marks)[1]', 'int') as marks,
//     studentDetails.value('(/student/city)[1]', 'nvarchar(50)') as city
// from studentInfo;`}</code>
//           </pre>

//           <hr />

//             <hr />

//           <h2>Practical Example – CollegeDB</h2>

//           <h3>select Statement</h3>
//           <pre>
//             <code>{`-- Select every column
// select * from Students;

// -- Select specific columns
// select studentName, age, marks from students;

// -- Rename a column using (as)
// select studentName, marks as studentMarks from students;

// -- Calculated column
// select studentName, marks, marks + 5 as marksAfterBonus from students;`}</code>
//           </pre>

//           <h3>where Clause</h3>
//           <pre>
//             <code>{`select * from students where city = 'Karachi';
// select * from students where marks > 80;
// select * from students where marks < 70;
// select * from students where age >= 21;
// select * from students where city <> 'Karachi';`}</code>
//           </pre>

//           <h3>and | or | not</h3>
//           <pre>
//             <code>{`select * from students where city = 'Karachi' and marks > 80;
// select * from students where city = 'Karachi' or city = 'Lahore';
// select * from students where not city = 'Karachi';

// select * from students
// where gender = 'Female' and city = 'Karachi' and Marks >= 80;

// -- Complex condition with parentheses
// select studentName, city, marks
// from students
// where (city = 'Karachi' or city = 'Lahore') and marks >= 70;`}</code>
//           </pre>

//           <h3>order by</h3>
//           <pre>
//             <code>{`select * from students order by marks asc;
// select * from students order by marks desc;
// select * from students order by name asc;
// select * from students order by city asc, marks desc;`}</code>
//           </pre>

//           <h3>top</h3>
//           <pre>
//             <code>{`select top 3 * FROM Students ORDER BY Marks DESC;
// select top 1 * from students order by marks desc;
// select top 50 percent * from students order by marks desc;`}</code>
//           </pre>

//           <h3>distinct</h3>
//           <pre>
//             <code>{`select distinct city from students;
// select distinct departmentId from students;
// select distinct city, departmentId from students;`}</code>
//           </pre>

//           <h3>like</h3>
//           <pre>
//             <code>{`select * from students where studentName like 'A%';      -- starts with A
// select * from students where studentName like '%a';      -- ends with a
// select * from students where studentName like '%ha%';    -- contains "ha"
// select * from students where studentName like '____';    -- exactly 4 characters
// select * from students where studentName like '_a%';     -- second character is 'a'`}</code>
//           </pre>

//           <h3>in</h3>
//           <pre>
//             <code>{`select * from students where city in ('Karachi', 'Lahore');
// select * from students where departmentId in (1, 2, 3);
// select * from students where city not in ('Karachi', 'Lahore');`}</code>
//           </pre>

//           <h3>between</h3>
//           <pre>
//             <code>{`select * from students where marks between 70 and 90;
// select * from students where age between 20 and 22;
// select * from students where marks not between 70 and 90;`}</code>
//           </pre>

//           <h3>null Handling</h3>
//           <pre>
//             <code>{`-- Insert a student with NULL City
// insert into students (studentName, age, gender, city, marks, departmentId)
// values ('Noor', 21, 'Female', NULL, 76, 3);

// select * from students where city is null;
// select * from students where city is not null;
// -- Never use: where city = null`}</code>
//           </pre>

//           <h3>update</h3>
//           <pre>
//             <code>{`update students set marks = 90 WHERE studentId = 2;
// update students set city = 'Karachi' where studentId = 2;

// update students
// set marks = 88, city = 'Lahore'
// where studentId = 2;

// -- DANGEROUS (updates ALL rows)
// -- update students set marks = 100;`}</code>
//           </pre>

//           <h3>delete</h3>
//           <pre>
//             <code>{`delete from students where studentId = 11;

// -- Always test with SELECT first
// select * from students where marks < 60;
// -- Then:
// -- delete from students where marks < 60;

// -- DANGEROUS
// -- delete from students;`}</code>
//           </pre>

//   <hr />
  
//           <h2>Session 8 Exercise</h2>
//           <ol>
//             <li>Write a query to display all employees with salary greater than 60,000 and sort them by salary descending.</li>
//             <li>Display the top 10 most recently hired employees.</li>
//             <li>Find all employees whose first name starts with ‘A’.</li>
//             <li>Create a table with an XML column and insert at least two records.</li>
//             <li>Write a query to extract values from the XML column.</li>
//           </ol>

//           <hr />

//           <h2>Session 8 Challenge</h2>
//           <p>Using the AdventureWorks2022 database (or your own tables):</p>
//           <ol>
//             <li>Write a SELECT statement that shows Employee Name, Job Title, and Hire Date for employees hired after 2015.</li>
//             <li>Sort the result by Hire Date descending.</li>
//             <li>Create a simple table that stores product information as XML (both typed and untyped versions if possible).</li>
//             <li>Query the XML data using the <code>.value()</code> method.</li>
//           </ol>

//           <hr />

//           <h2>Session 8 Quiz</h2>
//           <ol>
//             <li>What is the purpose of the SELECT statement?</li>
//             <li>What is the difference between WHERE and HAVING? (Basic idea)</li>
//             <li>What does the ORDER BY clause do?</li>
//             <li>What is the default sorting order in ORDER BY?</li>
//             <li>What is the difference between typed and untyped XML?</li>
//             <li>What is an XML Schema Collection?</li>
//             <li>Which system view can be used to see XML schema collections?</li>
//             <li>What method is commonly used to extract values from an XML column?</li>
//             <li>Can you use SELECT without a FROM clause? Give an example.</li>
//             <li>What is the purpose of the TOP clause?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 09):</strong> Advanced Queries and Joins</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
