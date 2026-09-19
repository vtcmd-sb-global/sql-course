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
            <code>{`select column1, column2, ...
from table_name
where condition
order by column1 asc|desc;`}</code>
          </pre>

          <h3>Simple Examples</h3>
          <pre>
            <code>{`-- Select all columns
select * from students;

-- Select specific columns
select studentName, age, marks from students;

-- Select with alias
select studentName as StudentName, marks as StudentMarks
from students;`}</code>
          </pre>

          <hr />

          <h2>3. Important Clauses used with SELECT</h2>

          <h3>3.1 from Clause</h3>
          <p>Specifies the table(s) from which to retrieve data.</p>
  
          <h3>3.2 where Clause</h3>
          <p>Filters rows based on a condition.</p>
  
          <pre>
            <code>{`select * from students
where marks > 80;

select * from students
where city = 'Karachi' and gender = 'Female';`}</code>
          </pre>

          <h3>3.3 order by Clause</h3>

          <p>Sorts the result set in ascending (asc) or descending (desc) order.</p>
  
          <pre>
            <code>{`-- Sort by Marks ascending (default)
select studentName, marks from students
order by marks;

-- Sort by Marks descending
select studentName, marks from students
order by marks desc;

-- Sort by multiple columns
select studentName, city, marks from students
order by city asc, marks desc;`}</code>
          </pre>

          <h3>3.4 Other Useful Clauses</h3>
          <ul>
            <li><code>top</code> – Limits the number of rows returned</li>
            <li><code>distinct</code> – Removes duplicate rows</li>
            <li><code>group by</code> – Groups rows (covered in later sessions)</li>
            <li><code>having</code> – Filters groups (covered in later sessions)</li>
          </ul>
  
          <pre>
            <code>{`-- Top 3 highest scoring students
select top 3 studentName, marks from students
order by marks desc;

-- Distinct cities
select distinct city from students;`}</code>
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
            <code>{`create table studentInfo
(
    studentId int primary key,
    studentDetails xml
);

insert into studentInfo values
(1, '<student><studentName>Ali</studentName><marks>85</marks><city>Karachi</city></student>');`}</code>
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
            <code>{`create xml schema collection studentSchema as
'<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="student">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="studentName" type="xs:string"/>
        <xs:element name="marks" type="xs:int"/>
        <xs:element name="city" type="xs:string"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>';
`}</code>
          </pre>

          <h3>Using Typed XML</h3>
          <pre>
            <code>{`create table studentInfoTyped
(
    studentId int primary key,
    studentDetails xml (studentSchema)
);`}</code>
          </pre>

          <h3>Viewing XML Schema Collections</h3>
          <pre>
            <code>{`-- List all XML schema collections
select * from sys.xml_schema_collections;

-- View details of a specific schema collection
select * from sys.xml_schema_collections
where name = 'studentSchema';`}</code>
          </pre>

          <hr />

          <h2>7. Querying XML Data (Basic)</h2>
          <pre>
            <code>{`-- Extract value from XML
select 
    studentId,
    studentDetails.value('(/student/name)[1]', 'nvarchar(50)') as studentName,
    studentDetails.value('(/student/marks)[1]', 'int') as marks,
    studentDetails.value('(/student/city)[1]', 'nvarchar(50)') as city
from studentInfo;`}</code>
          </pre>

          <hr />

            <hr />

          <h2>Practical Example – CollegeDB</h2>

          <h3>select Statement</h3>
          <pre>
            <code>{`-- Select every column
select * from Students;

-- Select specific columns
select studentName, age, marks from students;

-- Rename a column using (as)
select studentName, marks as studentMarks from students;

-- Calculated column
select studentName, marks, marks + 5 as marksAfterBonus from students;`}</code>
          </pre>

          <h3>where Clause</h3>
          <pre>
            <code>{`select * from students where city = 'Karachi';
select * from students where marks > 80;
select * from students where marks < 70;
select * from students where age >= 21;
select * from students where city <> 'Karachi';`}</code>
          </pre>

          <h3>and | or | not</h3>
          <pre>
            <code>{`select * from students where city = 'Karachi' and marks > 80;
select * from students where city = 'Karachi' or city = 'Lahore';
select * from students where not city = 'Karachi';

select * from students
where gender = 'Female' and city = 'Karachi' and Marks >= 80;

-- Complex condition with parentheses
select studentName, city, marks
from students
where (city = 'Karachi' or city = 'Lahore') and marks >= 70;`}</code>
          </pre>

          <h3>order by</h3>
          <pre>
            <code>{`select * from students order by marks asc;
select * from students order by marks desc;
select * from students order by name asc;
select * from students order by city asc, marks desc;`}</code>
          </pre>

          <h3>top</h3>
          <pre>
            <code>{`select top 3 * FROM Students ORDER BY Marks DESC;
select top 1 * from students order by marks desc;
select top 50 percent * from students order by marks desc;`}</code>
          </pre>

          <h3>distinct</h3>
          <pre>
            <code>{`select distinct city from students;
select distinct departmentId from students;
select distinct city, departmentId from students;`}</code>
          </pre>

          <h3>like</h3>
          <pre>
            <code>{`select * from students where studentName like 'A%';      -- starts with A
select * from students where studentName like '%a';      -- ends with a
select * from students where studentName like '%ha%';    -- contains "ha"
select * from students where studentName like '____';    -- exactly 4 characters
select * from students where studentName like '_a%';     -- second character is 'a'`}</code>
          </pre>

          <h3>in</h3>
          <pre>
            <code>{`select * from students where city in ('Karachi', 'Lahore');
select * from students where departmentId in (1, 2, 3);
select * from students where city not in ('Karachi', 'Lahore');`}</code>
          </pre>

          <h3>between</h3>
          <pre>
            <code>{`select * from students where marks between 70 and 90;
select * from students where age between 20 and 22;
select * from students where marks not between 70 and 90;`}</code>
          </pre>

          <h3>null Handling</h3>
          <pre>
            <code>{`-- Insert a student with NULL City
insert into students (studentName, age, gender, city, marks, departmentId)
values ('Noor', 21, 'Female', NULL, 76, 3);

select * from students where city is null;
select * from students where city is not null;
-- Never use: where city = null`}</code>
          </pre>

          <h3>update</h3>
          <pre>
            <code>{`update students set marks = 90 WHERE studentId = 2;
update students set city = 'Karachi' where studentId = 2;

update students
set marks = 88, city = 'Lahore'
where studentId = 2;

-- DANGEROUS (updates ALL rows)
-- update students set marks = 100;`}</code>
          </pre>

          <h3>delete</h3>
          <pre>
            <code>{`delete from students where studentId = 11;

-- Always test with SELECT first
select * from students where marks < 60;
-- Then:
-- delete from students where marks < 60;

-- DANGEROUS
-- delete from students;`}</code>
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
