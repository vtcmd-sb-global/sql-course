import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session09() {
  return (
    <Layout
      title="Session 09 — Advanced Queries and Joins"
      description="Advanced Queries and Joins in SQL Server 2022 — GROUP BY, Aggregates, Subqueries, Joins, Set Operators, PIVOT"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 09 — Advanced Queries and Joins</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Writing powerful queries using grouping, subqueries, joins, set operators, and pivoting.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 9</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain grouping and aggregating data</li>
            <li>Describe subqueries</li>
            <li>Describe table expressions</li>
            <li>Explain Joins</li>
            <li>Describe various types of Joins</li>
            <li>Explain the use of various set operators to combine data</li>
            <li>Describe pivoting and grouping set operations</li>
          </ul>

          <hr />

          <h2>1. Grouping and Aggregating Data</h2>
          <p>We use aggregate functions together with the <code>GROUP BY</code> clause to summarize data.</p>

          <h3>Common Aggregate Functions</h3>
          <ul>
            <li><code>COUNT()</code> – Counts rows</li>
            <li><code>SUM()</code> – Calculates total</li>
            <li><code>AVG()</code> – Calculates average</li>
            <li><code>MIN()</code> – Finds minimum value</li>
            <li><code>MAX()</code> – Finds maximum value</li>
          </ul>

          <pre>
            <code>{`-- Total students in each department
SELECT DepartmentID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY DepartmentID;

-- Average marks by department
SELECT DepartmentID, AVG(Marks) AS AverageMarks
FROM Students
GROUP BY DepartmentID;`}</code>
          </pre>

          <h3>HAVING Clause</h3>
          <p>The <code>HAVING</code> clause is used to filter groups (after <code>GROUP BY</code>).</p>

          <pre>
            <code>{`SELECT DepartmentID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY DepartmentID
HAVING COUNT(*) > 2;`}</code>
          </pre>

          <hr />

          <h2>2. Subqueries</h2>
          <p>A <strong>subquery</strong> is a query nested inside another query.</p>

          <h3>Types of Subqueries</h3>
          <ul>
            <li><strong>Single-row subquery</strong> – Returns only one value</li>
            <li><strong>Multi-row subquery</strong> – Returns multiple values (used with IN, ANY, ALL)</li>
            <li><strong>Correlated subquery</strong> – Depends on the outer query</li>
          </ul>

          <pre>
            <code>{`-- Students who scored more than the average marks
SELECT Name, Marks
FROM Students
WHERE Marks > (SELECT AVG(Marks) FROM Students);

-- Students in Computer Science department
SELECT Name, Marks
FROM Students
WHERE DepartmentID = (
    SELECT DepartmentID FROM Departments
    WHERE DepartmentName = 'Computer Science'
);`}</code>
          </pre>

          <hr />

          <h2>3. Table Expressions</h2>
          <p>Table expressions allow you to create temporary named result sets.</p>

          <h3>Common Table Expressions (CTE)</h3>
          <pre>
            <code>{`WITH HighSalaryEmployees AS
(
    SELECT EmployeeID, FirstName, Salary
    FROM Employees
    WHERE Salary > 80000
)
SELECT * FROM HighSalaryEmployees
ORDER BY Salary DESC;`}</code>
          </pre>

          <h3>Derived Tables</h3>
          <pre>
            <code>{`SELECT *
FROM (
    SELECT DepartmentID, AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DepartmentID
) AS DeptSalaries
WHERE AvgSalary > 60000;`}</code>
          </pre>

          <hr />

          <h2>4. Joins</h2>
          <p>Joins are used to combine rows from two or more tables based on a related column.</p>

          <h3>Types of Joins</h3>

          <table>
            <thead>
              <tr>
                <th>Join Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INNER JOIN</td>
                <td>Returns only matching rows from both tables</td>
              </tr>
              <tr>
                <td>LEFT JOIN (LEFT OUTER JOIN)</td>
                <td>Returns all rows from left table + matching rows from right table</td>
              </tr>
              <tr>
                <td>RIGHT JOIN (RIGHT OUTER JOIN)</td>
                <td>Returns all rows from right table + matching rows from left table</td>
              </tr>
              <tr>
                <td>FULL JOIN (FULL OUTER JOIN)</td>
                <td>Returns all rows when there is a match in either table</td>
              </tr>
              <tr>
                <td>CROSS JOIN</td>
                <td>Returns Cartesian product (every row of first table with every row of second table)</td>
              </tr>
            </tbody>
          </table>

          <h3>Examples</h3>
          <pre>
            <code>{`-- INNER JOIN
SELECT s.Name, s.Marks, d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d ON s.DepartmentID = d.DepartmentID;

-- LEFT JOIN
SELECT d.DepartmentName, s.Name
FROM Departments AS d
LEFT JOIN Students AS s ON d.DepartmentID = s.DepartmentID;

-- RIGHT JOIN
SELECT s.Name, d.DepartmentName
FROM Students AS s
RIGHT JOIN Departments AS d ON s.DepartmentID = d.DepartmentID;`}</code>
          </pre>

          <hr />

          <h2>5. Set Operators</h2>
          <p>Set operators combine the results of two or more SELECT statements.</p>

          <table>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UNION</td>
                <td>Combines results and removes duplicates</td>
              </tr>
              <tr>
                <td>UNION ALL</td>
                <td>Combines results and keeps duplicates</td>
              </tr>
              <tr>
                <td>INTERSECT</td>
                <td>Returns only common rows</td>
              </tr>
              <tr>
                <td>EXCEPT</td>
                <td>Returns rows from first query that are not in the second query</td>
              </tr>
            </tbody>
          </table>

          <pre>
            <code>{`SELECT City FROM Employees
UNION
SELECT City FROM Customers;

SELECT ProductID FROM Products
INTERSECT
SELECT ProductID FROM OrderDetails;`}</code>
          </pre>

          <hr />

          <h2>6. PIVOT and UNPIVOT</h2>
          <p><strong>PIVOT</strong> rotates rows into columns.  
<strong>UNPIVOT</strong> does the opposite.</p>

          <pre>
            <code>{`-- Example of PIVOT
SELECT *
FROM (
    SELECT DepartmentID, Gender, EmployeeID
    FROM Employees
) AS SourceTable
PIVOT (
    COUNT(EmployeeID)
    FOR Gender IN ([Male], [Female])
) AS PivotTable;`}</code>
          </pre>

          <hr />

          <h2>7. GROUPING SETS</h2>
          <p>Allows multiple groupings in a single query.</p>

          <pre>
            <code>{`SELECT DepartmentID, Gender, COUNT(*) AS Total
FROM Employees
GROUP BY GROUPING SETS
(
    (DepartmentID, Gender),
    (DepartmentID),
    (Gender),
    ()
);`}</code>
          </pre>

          <hr />

          <h2>Practical Example – CollegeDB</h2>

          <h3>Aggregate Functions</h3>
          <pre>
            <code>{`SELECT COUNT(*) AS TotalStudents FROM Students;
SELECT COUNT(City) AS StudentsWithCity FROM Students;

SELECT SUM(Marks) AS TotalMarks FROM Students;
SELECT AVG(Marks) AS AverageMarks FROM Students;
SELECT MIN(Marks) AS LowestMarks FROM Students;
SELECT MAX(Marks) AS HighestMarks FROM Students;

SELECT
    COUNT(*) AS TotalStudents,
    SUM(Marks) AS TotalMarks,
    AVG(Marks) AS AverageMarks,
    MIN(Marks) AS LowestMarks,
    MAX(Marks) AS HighestMarks
FROM Students;`}</code>
          </pre>

          <h3>GROUP BY</h3>
          <pre>
            <code>{`SELECT City, COUNT(*) AS TotalStudents
FROM Students
GROUP BY City;

SELECT City, AVG(Marks) AS AverageMarks
FROM Students
GROUP BY City;

SELECT DepartmentID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY DepartmentID;

SELECT DepartmentID, MAX(Marks) AS HighestMarks
FROM Students
GROUP BY DepartmentID;`}</code>
          </pre>

          <h3>HAVING</h3>
          <pre>
            <code>{`SELECT DepartmentID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY DepartmentID
HAVING COUNT(*) > 2;

SELECT City, AVG(Marks) AS AverageMarks
FROM Students
WHERE City IS NOT NULL
GROUP BY City
HAVING AVG(Marks) > 75;

-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping
SELECT DepartmentID, AVG(Marks) AS AverageMarks
FROM Students
WHERE Marks >= 50
GROUP BY DepartmentID
HAVING AVG(Marks) > 70;`}</code>
          </pre>

          <h3>Table Alias</h3>
          <pre>
            <code>{`SELECT s.Name, s.Marks
FROM Students AS s;`}</code>
          </pre>

          <h3>INNER JOIN</h3>
          <pre>
            <code>{`SELECT
    s.StudentID, s.Name, s.Marks,
    d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d
    ON s.DepartmentID = d.DepartmentID;

-- JOIN + WHERE
SELECT s.Name, s.Marks, d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d ON s.DepartmentID = d.DepartmentID
WHERE s.Marks >= 80;

-- JOIN + ORDER BY
SELECT s.Name, s.Marks, d.DepartmentName
FROM Students AS s
INNER JOIN Departments AS d ON s.DepartmentID = d.DepartmentID
ORDER BY s.Marks DESC;`}</code>
          </pre>

          <h3>LEFT JOIN</h3>
          <pre>
            <code>{`SELECT d.DepartmentName, s.Name
FROM Departments AS d
LEFT JOIN Students AS s ON d.DepartmentID = s.DepartmentID;`}</code>
          </pre>

          <h3>RIGHT JOIN</h3>
          <pre>
            <code>{`SELECT s.Name, d.DepartmentName, s.City
FROM Students AS s
RIGHT JOIN Departments AS d ON s.DepartmentID = d.DepartmentID;`}</code>
          </pre>

          <h3>JOIN + GROUP BY</h3>
          <pre>
            <code>{`SELECT d.DepartmentName, COUNT(s.StudentID) AS TotalStudents
FROM Departments AS d
LEFT JOIN Students AS s ON d.DepartmentID = s.DepartmentID
GROUP BY d.DepartmentName;

SELECT d.DepartmentName, AVG(s.Marks) AS AverageMarks
FROM Departments AS d
LEFT JOIN Students AS s ON d.DepartmentID = s.DepartmentID
GROUP BY d.DepartmentName;`}</code>
          </pre>

          <h3>Subqueries</h3>
          <pre>
            <code>{`-- Students above average marks
SELECT * FROM Students
WHERE Marks > (SELECT AVG(Marks) FROM Students);

-- Student(s) with highest marks
SELECT * FROM Students
WHERE Marks = (SELECT MAX(Marks) FROM Students);

-- Students in Computer Science
SELECT * FROM Students
WHERE DepartmentID = (
    SELECT DepartmentID FROM Departments
    WHERE DepartmentName = 'Computer Science'
);`}</code>
          </pre>

  <hr />
          <h2>Session 9 Exercise</h2>
          <ol>
            <li>Write a query to show the total number of employees and average salary for each department.</li>
            <li>Find employees who earn more than the average salary of their own department (correlated subquery).</li>
            <li>Write an INNER JOIN and a LEFT JOIN between Employees and Departments.</li>
            <li>Use UNION to combine city names from two different tables.</li>
            <li>Create a simple PIVOT query.</li>
          </ol>

          <hr />

          <h2>Session 9 Challenge</h2>
          <p>Using AdventureWorks2022 (or your own database):</p>
          <ol>
            <li>Show the total sales amount for each year and each sales territory using GROUP BY.</li>
            <li>Write a query using CTE to find the top 5 products by total quantity sold.</li>
            <li>Write a query that uses both INNER JOIN and LEFT JOIN.</li>
            <li>Demonstrate UNION, INTERSECT, and EXCEPT with suitable tables.</li>
          </ol>

          <hr />

          <h2>Session 9 Quiz</h2>
          <ol>
            <li>What is the purpose of the GROUP BY clause?</li>
            <li>What is the difference between WHERE and HAVING?</li>
            <li>What is a subquery?</li>
            <li>What is a correlated subquery?</li>
            <li>Name the five main types of joins.</li>
            <li>What is the difference between UNION and UNION ALL?</li>
            <li>What does the INTERSECT operator return?</li>
            <li>What is the purpose of the PIVOT operator?</li>
            <li>What is a Common Table Expression (CTE)?</li>
            <li>What does GROUPING SETS allow you to do?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 10):</strong> Using Views, Stored Procedures, and Querying Metadata</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
