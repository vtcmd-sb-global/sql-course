import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session08() {
  return (
    <Layout
      title="Session 08 — Accessing Data"
      description="Accessing Data in SQL Server 2022 — SELECT, WHERE, Operators, Filtering, XML"
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
          <p><strong>Focus:</strong> Retrieving and filtering data using SELECT, WHERE, and related operators.</p>
          <p><strong>Practical Database:</strong> AdventureWorks2022</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 8</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Write SELECT statements to retrieve data</li>
            <li>Use WHERE to filter rows</li>
            <li>Apply comparison and logical operators</li>
            <li>Use LIKE, IN, BETWEEN, and NULL handling</li>
            <li>Work with basic XML data in SQL Server</li>
            <li>Practice queries against AdventureWorks2022</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>
          <p>Most database work starts with reading data. The <code>SELECT</code> statement is the primary way to query tables in SQL Server.</p>

          <hr />

          <h2>2. The SELECT Statement</h2>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2022;
GO

SELECT *
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2022;
GO

SELECT
    ProductID,
    Name,
    ProductNumber,
    ListPrice
FROM Production.Product;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. Important Clauses Used with SELECT</h2>
          <ul>
            <li><code>FROM</code> — specifies the table</li>
            <li><code>WHERE</code> — filters rows</li>
            <li><code>ORDER BY</code> — sorts the result</li>
            <li><code>GROUP BY</code> — groups rows for aggregates</li>
            <li><code>HAVING</code> — filters groups</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Other Useful SELECT Clauses</h2>
          <CodeBlock
          language="sql"
            code={`SELECT TOP 10
    ProductID,
    Name,
    ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT DISTINCT Color
FROM Production.Product
WHERE Color IS NOT NULL;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. Filtering Data with WHERE</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color, ListPrice
FROM Production.Product
WHERE Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Comparison Operators</h2>
          <p>Common operators: <code>=</code>, <code>{'<>'}</code>, <code>{'<'}</code>, <code>{'>'}</code>, <code>{'<='}</code>, <code>{'>='}</code></p>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice >= 1500;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. AND, OR, and NOT</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color, ListPrice
FROM Production.Product
WHERE Color = 'Red' AND ListPrice > 1000;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color
FROM Production.Product
WHERE Color = 'Red' OR Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color
FROM Production.Product
WHERE NOT Color = 'Red';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. LIKE Operator</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name
FROM Production.Product
WHERE Name LIKE 'Mountain%';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name
FROM Production.Product
WHERE Name LIKE '%Frame%';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. IN Operator</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color
FROM Production.Product
WHERE Color IN ('Red', 'Black', 'Blue');
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>10. BETWEEN Operator</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1500;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>11. NULL Handling</h2>
          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color
FROM Production.Product
WHERE Color IS NULL;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, Color
FROM Production.Product
WHERE Color IS NOT NULL;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>12. Working with XML in SQL Server</h2>
          <p>SQL Server can store and query XML data using the <code>xml</code> data type.</p>

          <h2>12.1 Untyped XML</h2>
          <CodeBlock
          language="sql"
            code={`CREATE TABLE StudentXMLPractice
(
    StudentID INT PRIMARY KEY,
    StudentData XML
);
GO

INSERT INTO StudentXMLPractice (StudentID, StudentData)
VALUES
(1, '<Student><Name>Ali</Name><City>Karachi</City></Student>');
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h2>12.2 Typed XML</h2>
          <p>Typed XML is validated against an XML schema collection.</p>

          <hr />

          <h2>13. XML Schema Collections</h2>
          <CodeBlock
          language="sql"
            code={`CREATE XML SCHEMA COLLECTION StudentSchema AS
N'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Student">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Name" type="xs:string"/>
        <xs:element name="City" type="xs:string"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>14. Viewing XML Schema Collections</h2>
          <CodeBlock
          language="sql"
            code={`SELECT name
FROM sys.xml_schema_collections
WHERE name = 'StudentSchema';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>15. Querying XML Data</h2>
          <CodeBlock
          language="sql"
            code={`SELECT
    StudentID,
    StudentData.value('(/Student/Name)[1]', 'NVARCHAR(100)') AS StudentName,
    StudentData.value('(/Student/City)[1]', 'NVARCHAR(100)') AS City
FROM StudentXMLPractice;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>16. Practical — Working with AdventureWorks2022</h2>
          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2022;
GO

SELECT TOP 20
    ProductID,
    Name,
    ProductNumber,
    Color,
    ListPrice
FROM Production.Product
WHERE ListPrice > 0
ORDER BY ListPrice DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS ProductCount
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
ORDER BY ProductCount DESC;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name LIKE '%Bike%'
  AND ListPrice BETWEEN 500 AND 3000;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>17. Cleaning Up XML Practice Objects</h2>
          <CodeBlock
          language="sql"
            code={`DROP TABLE IF EXISTS StudentXMLTypedPractice;
GO

DROP TABLE IF EXISTS StudentXMLPractice;
GO

DROP XML SCHEMA COLLECTION StudentSchema;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>18. Best Practices</h2>
          <ul>
            <li>Select only the columns you need instead of <code>SELECT *</code> in production code</li>
            <li>Filter early with WHERE to reduce rows processed</li>
            <li>Use meaningful aliases for readability</li>
            <li>Handle NULL values explicitly with IS NULL / IS NOT NULL</li>
            <li>Practice on AdventureWorks before changing production data</li>
            <li>Prefer parameterized queries in applications (avoid string concatenation)</li>
          </ul>

          <hr />

          <h2>Session 8 Exercise</h2>
          <ol>
            <li>Write a SELECT that returns ProductID, Name, and ListPrice for products over 1000.</li>
            <li>Filter products by Color using IN.</li>
            <li>Use LIKE to find product names containing "Bike".</li>
            <li>Find products where Color IS NULL.</li>
            <li>Write a query using BETWEEN on ListPrice.</li>
          </ol>

          <hr />

          <h2>Session 8 Challenge</h2>
          <ol>
            <li>Combine AND / OR filters to find expensive red or black products.</li>
            <li>Create a small XML practice table, insert one row, and query a value with <code>.value()</code>.</li>
            <li>Write a GROUP BY query on AdventureWorks product colors.</li>
          </ol>

          <hr />

          <h2>Session 8 Quiz</h2>
          <ol>
            <li>What does SELECT do?</li>
            <li>What is the purpose of the WHERE clause?</li>
            <li>How do you sort results in descending order?</li>
            <li>What does LIKE 'A%' match?</li>
            <li>What is the difference between IN and BETWEEN?</li>
            <li>How do you test for NULL values?</li>
            <li>What is the xml data type used for?</li>
            <li>Why avoid SELECT * in production queries?</li>
            <li>What does TOP 10 do?</li>
            <li>What does DISTINCT do?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 09):</strong> Advanced Queries and Joins</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
