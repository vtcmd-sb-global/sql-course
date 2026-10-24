import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session09() {
  return (
    <Layout
      title="Session 09 — Advanced Queries and Joins"
      description="Advanced Queries and Joins in SQL Server 2022 — GROUP BY, Aggregates, Subqueries, Joins, Set Operators, PIVOT"
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

        
          <h1>Session 09 — Advanced Queries and Joins</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p>
            <strong>Focus:</strong> Writing powerful queries using grouping,
            subqueries, joins, set operators, and pivoting.
          </p>
          <p><strong>Based on:</strong> Official Book – Session 9</p>
          <p>
            <strong>Practical Database:</strong> AdventureWorks2019
          </p>

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

          <h2>0. Start with AdventureWorks2019</h2>

          <p>
            In this course, all practical SQL examples use the
            <strong> AdventureWorks2019 </strong> sample database.
          </p>

          <p>
            Before running the examples in this session, make sure the
            AdventureWorks2019 database is installed and available in SQL Server
            Management Studio (SSMS).
          </p>

          <CodeBlock
          language="sql"
            code={`USE AdventureWorks2019;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Some of the important tables used in this session are:
          </p>

          <table>
            <thead>
              <tr>
                <th>Schema</th>
                <th>Table</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Production</td>
                <td>Product</td>
                <td>Product information</td>
              </tr>
              <tr>
                <td>Production</td>
                <td>ProductSubcategory</td>
                <td>Product subcategories</td>
              </tr>
              <tr>
                <td>Production</td>
                <td>ProductCategory</td>
                <td>Product categories</td>
              </tr>
              <tr>
                <td>Sales</td>
                <td>SalesOrderHeader</td>
                <td>Sales order information</td>
              </tr>
              <tr>
                <td>Sales</td>
                <td>SalesOrderDetail</td>
                <td>Products and quantities in sales orders</td>
              </tr>
              <tr>
                <td>Sales</td>
                <td>SalesTerritory</td>
                <td>Sales territory information</td>
              </tr>
              <tr>
                <td>HumanResources</td>
                <td>Employee</td>
                <td>Employee information</td>
              </tr>
              <tr>
                <td>Person</td>
                <td>Person</td>
                <td>Employee/person names and personal information</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>1. Grouping and Aggregating Data</h2>

          <p>
            We use aggregate functions together with the
            <code> GROUP BY </code> clause to summarize data.
          </p>

          <h3>Common Aggregate Functions</h3>

          <ul>
            <li><code>COUNT()</code> – Counts rows</li>
            <li><code>SUM()</code> – Calculates total</li>
            <li><code>AVG()</code> – Calculates average</li>
            <li><code>MIN()</code> – Finds minimum value</li>
            <li><code>MAX()</code> – Finds maximum value</li>
          </ul>

          <h3>Aggregate Functions with AdventureWorks2019</h3>

          <CodeBlock
          language="sql"
            code={`-- Count all products
SELECT COUNT(*) AS TotalProducts
FROM Production.Product;

-- Average product price
SELECT AVG(ListPrice) AS AveragePrice
FROM Production.Product;

-- Lowest product price
SELECT MIN(ListPrice) AS LowestPrice
FROM Production.Product;

-- Highest product price
SELECT MAX(ListPrice) AS HighestPrice
FROM Production.Product;

-- Total of all product list prices
SELECT SUM(ListPrice) AS TotalListPrice
FROM Production.Product;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Using Multiple Aggregate Functions</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    COUNT(*) AS TotalProducts,
    SUM(ListPrice) AS TotalListPrice,
    AVG(ListPrice) AS AveragePrice,
    MIN(ListPrice) AS LowestPrice,
    MAX(ListPrice) AS HighestPrice
FROM Production.Product;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. GROUP BY</h2>

          <p>
            The <code>GROUP BY</code> clause divides rows into groups and
            allows aggregate functions to calculate values for each group.
          </p>

          <h3>Group Products by Color</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    COUNT(*) AS TotalProducts
FROM Production.Product
GROUP BY Color
ORDER BY TotalProducts DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Average Price by Color</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    Color,
    AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Group Products by Product Subcategory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductSubcategoryID,
    COUNT(*) AS TotalProducts
FROM Production.Product
WHERE ProductSubcategoryID IS NOT NULL
GROUP BY ProductSubcategoryID
ORDER BY TotalProducts DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Group Sales by Territory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    TerritoryID,
    COUNT(*) AS TotalOrders
FROM Sales.SalesOrderHeader
GROUP BY TerritoryID
ORDER BY TotalOrders DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. HAVING Clause</h2>

          <p>
            The <code>HAVING</code> clause is used to filter groups after
            <code>GROUP BY</code>.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Show colors having more than 10 products
SELECT
    Color,
    COUNT(*) AS TotalProducts
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING COUNT(*) > 10;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>WHERE vs HAVING</h3>

          <CodeBlock
          language="sql"
            code={`-- WHERE filters individual rows BEFORE grouping
-- HAVING filters groups AFTER grouping

SELECT
    Color,
    AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE ListPrice > 100
GROUP BY Color
HAVING AVG(ListPrice) > 500;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Subqueries</h2>

          <p>
            A <strong>subquery</strong> is a query nested inside another query.
          </p>

          <h3>Types of Subqueries</h3>

          <ul>
            <li>
              <strong>Single-row subquery</strong> – Returns one value
            </li>
            <li>
              <strong>Multi-row subquery</strong> – Returns multiple values
            </li>
            <li>
              <strong>Correlated subquery</strong> – Depends on the outer query
            </li>
          </ul>

          <h3>Products More Expensive Than the Average</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM Production.Product
)
ORDER BY ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Products with the Highest Price</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice = (
    SELECT MAX(ListPrice)
    FROM Production.Product
);`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Products More Expensive Than a Specific Subcategory Average</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ProductID,
    Name,
    ListPrice,
    ProductSubcategoryID
FROM Production.Product
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM Production.Product
    WHERE ProductSubcategoryID = 1
)
ORDER BY ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The inner query executes first and produces a value that is then
            used by the outer query.
          </p>

          <hr />

          <h2>5. Table Expressions</h2>

          <p>
            Table expressions allow us to work with the result of a query as
            if it were a table.
          </p>

          <h3>5.1 Common Table Expression (CTE)</h3>

          <p>
            A <strong>CTE</strong> is a temporary named result set that exists
            for the duration of a single statement.
          </p>

          <CodeBlock
          language="sql"
            code={`WITH ExpensiveProducts AS
(
    SELECT
        ProductID,
        Name,
        ListPrice
    FROM Production.Product
    WHERE ListPrice > 1000
)
SELECT *
FROM ExpensiveProducts
ORDER BY ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>CTE with GROUP BY</h3>

          <CodeBlock
          language="sql"
            code={`WITH ProductSummary AS
(
    SELECT
        ProductSubcategoryID,
        COUNT(*) AS TotalProducts,
        AVG(ListPrice) AS AveragePrice
    FROM Production.Product
    WHERE ProductSubcategoryID IS NOT NULL
    GROUP BY ProductSubcategoryID
)
SELECT *
FROM ProductSummary
WHERE AveragePrice > 500
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>5.2 Derived Tables</h3>

          <p>
            A derived table is a subquery placed in the
            <code> FROM </code> clause.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT *
FROM
(
    SELECT
        ProductSubcategoryID,
        AVG(ListPrice) AS AveragePrice
    FROM Production.Product
    WHERE ProductSubcategoryID IS NOT NULL
    GROUP BY ProductSubcategoryID
) AS ProductSummary
WHERE AveragePrice > 500
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Joins</h2>

          <p>
            Joins are used to combine rows from two or more tables based on
            related columns.
          </p>

          <h3>AdventureWorks Relationship</h3>

          <p>
            A useful relationship for learning joins is:
          </p>

          <CodeBlock
          language="sql"
            code={`Production.Product
        |
        | ProductSubcategoryID
        v
Production.ProductSubcategory
        |
        | ProductCategoryID
        v
Production.ProductCategory`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

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
                <td>
                  Returns only matching rows from both tables
                </td>
              </tr>
              <tr>
                <td>LEFT JOIN</td>
                <td>
                  Returns all rows from the left table and matching rows from
                  the right table
                </td>
              </tr>
              <tr>
                <td>RIGHT JOIN</td>
                <td>
                  Returns all rows from the right table and matching rows from
                  the left table
                </td>
              </tr>
              <tr>
                <td>FULL OUTER JOIN</td>
                <td>
                  Returns rows when there is a match in either table
                </td>
              </tr>
              <tr>
                <td>CROSS JOIN</td>
                <td>
                  Returns every combination of rows from both tables
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>7. INNER JOIN</h2>

          <p>
            An <code>INNER JOIN</code> returns only records that have matching
            values in both tables.
          </p>

          <h3>Product and Product Subcategory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    p.ListPrice,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
ORDER BY p.ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Joining Three Tables</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName,
    pc.Name AS CategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
INNER JOIN Production.ProductCategory AS pc
    ON ps.ProductCategoryID = pc.ProductCategoryID
ORDER BY pc.Name, ps.Name, p.Name;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>JOIN + WHERE</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    p.ListPrice,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice > 1000
ORDER BY p.ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. LEFT JOIN</h2>

          <p>
            A <code>LEFT JOIN</code> returns every row from the left table,
            even if there is no matching row in the right table.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
ORDER BY p.Name;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            If a product does not have a matching subcategory, the
            <code> SubcategoryName </code> value will be
            <code> NULL </code>.
          </p>

          <hr />

          <h2>9. RIGHT JOIN</h2>

          <p>
            A <code>RIGHT JOIN</code> returns every row from the right table
            and matching rows from the left table.
          </p>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
RIGHT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
ORDER BY ps.Name;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            In practice, developers often rewrite a RIGHT JOIN as a LEFT JOIN
            by changing the order of the tables because LEFT JOIN is generally
            easier to read.
          </p>

          <hr />

          <h2>10. JOIN + GROUP BY</h2>

          <p>
            Joins can be combined with aggregate functions and
            <code> GROUP BY </code>.
          </p>

          <h3>Number of Products in Each Subcategory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ps.Name AS SubcategoryName,
    COUNT(p.ProductID) AS TotalProducts
FROM Production.ProductSubcategory AS ps
LEFT JOIN Production.Product AS p
    ON ps.ProductSubcategoryID = p.ProductSubcategoryID
GROUP BY ps.Name
ORDER BY TotalProducts DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Average Product Price by Subcategory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    ps.Name AS SubcategoryName,
    AVG(p.ListPrice) AS AveragePrice
FROM Production.ProductSubcategory AS ps
LEFT JOIN Production.Product AS p
    ON ps.ProductSubcategoryID = p.ProductSubcategoryID
GROUP BY ps.Name
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Product Count by Category</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    pc.Name AS CategoryName,
    COUNT(p.ProductID) AS TotalProducts
FROM Production.ProductCategory AS pc
INNER JOIN Production.ProductSubcategory AS ps
    ON pc.ProductCategoryID = ps.ProductCategoryID
INNER JOIN Production.Product AS p
    ON ps.ProductSubcategoryID = p.ProductSubcategoryID
GROUP BY pc.Name
ORDER BY TotalProducts DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>11. Sales Data with JOINs</h2>

          <p>
            AdventureWorks contains sales information that is useful for
            practicing real-world aggregate queries.
          </p>

          <h3>Total Sales Amount by Territory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    TerritoryID,
    SUM(TotalDue) AS TotalSales
FROM Sales.SalesOrderHeader
GROUP BY TerritoryID
ORDER BY TotalSales DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Total Sales by Territory Name</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    st.Name AS TerritoryName,
    SUM(soh.TotalDue) AS TotalSales
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesTerritory AS st
    ON soh.TerritoryID = st.TerritoryID
GROUP BY st.Name
ORDER BY TotalSales DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Sales by Year</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    YEAR(OrderDate) AS SalesYear,
    SUM(TotalDue) AS TotalSales
FROM Sales.SalesOrderHeader
GROUP BY YEAR(OrderDate)
ORDER BY SalesYear;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>12. Set Operators</h2>

          <p>
            Set operators combine the results of two or more
            <code> SELECT </code> statements.
          </p>

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
                <td>
                  Combines results and removes duplicate rows
                </td>
              </tr>
              <tr>
                <td>UNION ALL</td>
                <td>
                  Combines results and keeps duplicates
                </td>
              </tr>
              <tr>
                <td>INTERSECT</td>
                <td>
                  Returns rows that exist in both result sets
                </td>
              </tr>
              <tr>
                <td>EXCEPT</td>
                <td>
                  Returns rows from the first query that do not exist in the
                  second query
                </td>
              </tr>
            </tbody>
          </table>

          <h3>UNION</h3>

          <CodeBlock
          language="sql"
            code={`SELECT Color
FROM Production.Product
WHERE Color IS NOT NULL

UNION

SELECT Color
FROM Production.Product
WHERE Color IN ('Black', 'Red', 'Blue');`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The duplicate colors are removed by <code>UNION</code>.
          </p>

          <h3>UNION ALL</h3>

          <CodeBlock
          language="sql"
            code={`SELECT Color
FROM Production.Product
WHERE Color IS NOT NULL

UNION ALL

SELECT Color
FROM Production.Product
WHERE Color IN ('Black', 'Red', 'Blue');`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>UNION ALL</code> keeps duplicate rows.
          </p>

          <h3>INTERSECT</h3>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID
FROM Production.Product
WHERE ListPrice > 1000

INTERSECT

SELECT ProductID
FROM Production.Product
WHERE ListPrice < 3000;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This returns ProductIDs that satisfy both conditions.
          </p>

          <h3>EXCEPT</h3>

          <CodeBlock
          language="sql"
            code={`SELECT ProductID
FROM Production.Product
WHERE ListPrice > 1000

EXCEPT

SELECT ProductID
FROM Production.Product
WHERE Color = 'Black';`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This returns ProductIDs from the first result that are not present
            in the second result.
          </p>

          <hr />

          <h2>13. PIVOT and UNPIVOT</h2>

          <p>
            <strong>PIVOT</strong> rotates rows into columns.
          </p>

          <p>
            <strong>UNPIVOT</strong> converts columns back into rows.
          </p>

          <h3>PIVOT Example – Products by Color</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    [Black],
    [Red],
    [Blue],
    [Silver]
FROM
(
    SELECT
        Color,
        ProductID
    FROM Production.Product
    WHERE Color IS NOT NULL
) AS SourceTable
PIVOT
(
    COUNT(ProductID)
    FOR Color IN ([Black], [Red], [Blue], [Silver])
) AS PivotTable;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The result converts product colors from rows into separate
            columns.
          </p>

          <h3>PIVOT with Sales Data</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    [2005],
    [2006],
    [2007],
    [2008]
FROM
(
    SELECT
        YEAR(OrderDate) AS SalesYear,
        SalesOrderID
    FROM Sales.SalesOrderHeader
) AS SourceTable
PIVOT
(
    COUNT(SalesOrderID)
    FOR SalesYear IN ([2005], [2006], [2007], [2008])
) AS PivotTable;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>14. GROUPING SETS</h2>

          <p>
            <code>GROUPING SETS</code> allows multiple grouping combinations
            to be calculated in a single query.
          </p>

          <h3>Example with Sales</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    YEAR(OrderDate) AS SalesYear,
    TerritoryID,
    SUM(TotalDue) AS TotalSales
FROM Sales.SalesOrderHeader
GROUP BY GROUPING SETS
(
    (YEAR(OrderDate), TerritoryID),
    (YEAR(OrderDate)),
    (TerritoryID),
    ()
)
ORDER BY SalesYear, TerritoryID;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This single query produces:
          </p>

          <ul>
            <li>Sales by year and territory</li>
            <li>Total sales by year</li>
            <li>Total sales by territory</li>
            <li>Grand total sales</li>
          </ul>

          <hr />

          <h2>15. Practical Example – AdventureWorks2019</h2>

          <h3>Aggregate Functions</h3>

          <CodeBlock
          language="sql"
            code={`-- Total number of products
SELECT COUNT(*) AS TotalProducts
FROM Production.Product;

-- Products with a defined color
SELECT COUNT(Color) AS ProductsWithColor
FROM Production.Product;

-- Total list price
SELECT SUM(ListPrice) AS TotalListPrice
FROM Production.Product;

-- Average list price
SELECT AVG(ListPrice) AS AverageListPrice
FROM Production.Product;

-- Lowest list price
SELECT MIN(ListPrice) AS LowestListPrice
FROM Production.Product;

-- Highest list price
SELECT MAX(ListPrice) AS HighestListPrice
FROM Production.Product;

-- All aggregate values together
SELECT
    COUNT(*) AS TotalProducts,
    SUM(ListPrice) AS TotalListPrice,
    AVG(ListPrice) AS AverageListPrice,
    MIN(ListPrice) AS LowestListPrice,
    MAX(ListPrice) AS HighestListPrice
FROM Production.Product;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>GROUP BY</h3>

          <CodeBlock
          language="sql"
            code={`-- Number of products by color
SELECT
    Color,
    COUNT(*) AS TotalProducts
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
ORDER BY TotalProducts DESC;

-- Average price by color
SELECT
    Color,
    AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
ORDER BY AveragePrice DESC;

-- Number of products by subcategory
SELECT
    ProductSubcategoryID,
    COUNT(*) AS TotalProducts
FROM Production.Product
WHERE ProductSubcategoryID IS NOT NULL
GROUP BY ProductSubcategoryID
ORDER BY TotalProducts DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>HAVING</h3>

          <CodeBlock
          language="sql"
            code={`-- Colors containing more than 10 products
SELECT
    Color,
    COUNT(*) AS TotalProducts
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING COUNT(*) > 10;

-- Subcategories with average price greater than 500
SELECT
    ProductSubcategoryID,
    AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE ProductSubcategoryID IS NOT NULL
GROUP BY ProductSubcategoryID
HAVING AVG(ListPrice) > 500;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Table Alias</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name,
    p.ListPrice
FROM Production.Product AS p;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>INNER JOIN</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    p.ListPrice,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>INNER JOIN + WHERE</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    p.ListPrice,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
WHERE p.ListPrice >= 1000
ORDER BY p.ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>LEFT JOIN</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    p.ProductID,
    p.Name AS ProductName,
    ps.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID
ORDER BY p.Name;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>JOIN + GROUP BY</h3>

          <CodeBlock
          language="sql"
            code={`-- Count products in each subcategory
SELECT
    ps.Name AS SubcategoryName,
    COUNT(p.ProductID) AS TotalProducts
FROM Production.ProductSubcategory AS ps
LEFT JOIN Production.Product AS p
    ON ps.ProductSubcategoryID = p.ProductSubcategoryID
GROUP BY ps.Name
ORDER BY TotalProducts DESC;

-- Average product price by subcategory
SELECT
    ps.Name AS SubcategoryName,
    AVG(p.ListPrice) AS AveragePrice
FROM Production.ProductSubcategory AS ps
LEFT JOIN Production.Product AS p
    ON ps.ProductSubcategoryID = p.ProductSubcategoryID
GROUP BY ps.Name
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Subqueries</h3>

          <CodeBlock
          language="sql"
            code={`-- Products above the average price
SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM Production.Product
)
ORDER BY ListPrice DESC;

-- Product(s) with the highest price
SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice = (
    SELECT MAX(ListPrice)
    FROM Production.Product
);

-- Products with price above 1000
-- compared with products below the maximum price
SELECT
    ProductID,
    Name,
    ListPrice
FROM Production.Product
WHERE ListPrice > 1000
AND ListPrice < (
    SELECT MAX(ListPrice)
    FROM Production.Product
)
ORDER BY ListPrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>CTE</h3>

          <CodeBlock
            language="sql"
            code={`WITH ProductSummary AS
(
    SELECT
        ProductSubcategoryID,
        COUNT(*) AS TotalProducts,
        AVG(ListPrice) AS AveragePrice
    FROM Production.Product
    WHERE ProductSubcategoryID IS NOT NULL
    GROUP BY ProductSubcategoryID
)
SELECT *
FROM ProductSummary
WHERE TotalProducts > 5
ORDER BY TotalProducts DESC;`}
caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Sales Aggregation</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    YEAR(OrderDate) AS SalesYear,
    SUM(TotalDue) AS TotalSales,
    AVG(TotalDue) AS AverageOrderValue,
    COUNT(*) AS TotalOrders
FROM Sales.SalesOrderHeader
GROUP BY YEAR(OrderDate)
ORDER BY SalesYear;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>Sales by Territory</h3>

          <CodeBlock
          language="sql"
            code={`SELECT
    st.Name AS TerritoryName,
    COUNT(soh.SalesOrderID) AS TotalOrders,
    SUM(soh.TotalDue) AS TotalSales
FROM Sales.SalesTerritory AS st
INNER JOIN Sales.SalesOrderHeader AS soh
    ON st.TerritoryID = soh.TerritoryID
GROUP BY st.Name
ORDER BY TotalSales DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>16. Session 9 Exercise</h2>

          <ol>
            <li>
              Write a query to display the total number of products in
              AdventureWorks2019.
            </li>

            <li>
              Find the average <code>ListPrice</code> of all products.
            </li>

            <li>
              Group products by <code>Color</code> and display the number of
              products for each color.
            </li>

            <li>
              Display only colors having more than 10 products using
              <code>HAVING</code>.
            </li>

            <li>
              Write a query to display products whose
              <code>ListPrice</code> is greater than the average product price.
            </li>

            <li>
              Create an <code>INNER JOIN</code> between
              <code>Production.Product</code> and
              <code>Production.ProductSubcategory</code>.
            </li>

            <li>
              Create a <code>LEFT JOIN</code> between the same two tables.
            </li>

            <li>
              Display the number of products in each product subcategory.
            </li>

            <li>
              Display total sales for each sales territory.
            </li>

            <li>
              Create a simple CTE that displays products having a
              <code>ListPrice</code> greater than 1000.
            </li>
          </ol>

          <hr />

          <h2>17. Session 9 Challenge</h2>

          <p>
            Complete the following tasks using the
            <strong>AdventureWorks2019</strong> database.
          </p>

          <ol>
            <li>
              Display the total sales amount for each year using
              <code>GROUP BY</code>.
            </li>

            <li>
              Display total sales for each sales territory.
            </li>

            <li>
              Write a CTE that finds the top 5 products based on total quantity
              sold.
            </li>

            <li>
              Create an <code>INNER JOIN</code> between Product,
              ProductSubcategory, and ProductCategory.
            </li>

            <li>
              Create a <code>LEFT JOIN</code> between Product and
              ProductSubcategory.
            </li>

            <li>
              Find products whose price is greater than the average product
              price using a subquery.
            </li>

            <li>
              Demonstrate <code>UNION</code> and <code>UNION ALL</code>.
            </li>

            <li>
              Demonstrate <code>INTERSECT</code> using ProductID values.
            </li>

            <li>
              Demonstrate <code>EXCEPT</code> using ProductID values.
            </li>

            <li>
              Create a simple <code>PIVOT</code> query using product colors.
            </li>

            <li>
              Create a <code>GROUPING SETS</code> query showing sales by year,
              sales by territory, and a grand total.
            </li>
          </ol>

          <hr />

          <h2>18. Session 9 Quiz</h2>

          <ol>
            <li>
              What is the purpose of the <code>GROUP BY</code> clause?
            </li>

            <li>
              What is the difference between <code>WHERE</code> and
              <code>HAVING</code>?
            </li>

            <li>
              Name five commonly used aggregate functions.
            </li>

            <li>
              What is a subquery?
            </li>

            <li>
              What is the difference between a single-row and multi-row
              subquery?
            </li>

            <li>
              What is a correlated subquery?
            </li>

            <li>
              What is a Common Table Expression (CTE)?
            </li>

            <li>
              What is the difference between <code>INNER JOIN</code> and
              <code>LEFT JOIN</code>?
            </li>

            <li>
              Name the five main types of joins covered in this session.
            </li>

            <li>
              What is the difference between <code>UNION</code> and
              <code>UNION ALL</code>?
            </li>

            <li>
              What does the <code>INTERSECT</code> operator return?
            </li>

            <li>
              What does the <code>EXCEPT</code> operator return?
            </li>

            <li>
              What is the purpose of the <code>PIVOT</code> operator?
            </li>

            <li>
              What is the difference between <code>PIVOT</code> and
              <code>UNPIVOT</code>?
            </li>

            <li>
              What does <code>GROUPING SETS</code> allow you to do?
            </li>
          </ol>

          <hr />
          
          <h3>Important Point</h3>

          <p>
            You should understand that AdventureWorks2019 is not just a
            collection of unrelated tables. It is a relational database where
            tables are connected through keys.
          </p>

          <p>
            For example:
          </p>

          <CodeBlock
          language="sql"
            code={`Product
   |
   | ProductSubcategoryID
   v
ProductSubcategory
   |
   | ProductCategoryID
   v
ProductCategory`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            This relationship is what makes JOINs useful. Later, students can
            use the same concepts when working with their own real-world
            applications.
          </p>

          <hr />

          <p>
            <strong>Next up (Session 10):</strong> Using Views, Stored
            Procedures, and Querying Metadata
          </p>
        </article>
      </CustomLayout>
    </Layout>
  );
}










// import React from 'react';
// import Layout from '@theme/Layout';
// import CustomLayout from '@site/src/components/Layout/Layout';
// import CodeBlock from '@site/src/components/CodeBlock';

// export default function Session09() {
//   return (
//     <Layout
//       title="Session 09 — Advanced Queries and Joins"
//       description="Advanced Queries and Joins in SQL Server 2022 — GROUP BY, Aggregates, Subqueries, Joins, Set Operators, PIVOT"
//     >
//       <CustomLayout>
//         <article className="session-content">

//         <style>{`
//             article code:not(pre code) {
//               background-color: #f4f4f4;
//               color: #d10057;
//               padding: 2px 6px;
//               border-radius: 4px;
//               font-family: Consolas, Monaco, monospace;
//               font-size: 0.9em;
//             }
//           `}</style>

//           <h1>Session 09 — Advanced Queries and Joins</h1>

//           <p><strong>Duration:</strong> 2 hours</p>
//           <p>
//             <strong>Focus:</strong> Writing powerful queries using grouping,
//             subqueries, joins, set operators, and pivoting.
//           </p>
//           <p><strong>Based on:</strong> Official Aptech Book – Session 9</p>
//           <p>
//             <strong>Practical Database:</strong> AdventureWorks2019
//           </p>

//           <hr />

//           <h2>Learning Objectives</h2>
//           <p>By the end of this session, you should be able to:</p>
//           <ul>
//             <li>Explain grouping and aggregating data</li>
//             <li>Describe subqueries</li>
//             <li>Describe table expressions</li>
//             <li>Explain Joins</li>
//             <li>Describe various types of Joins</li>
//             <li>Explain the use of various set operators to combine data</li>
//             <li>Describe pivoting and grouping set operations</li>
//           </ul>

//           <hr />

//           <h2>0. Start with AdventureWorks2019</h2>

//           <p>
//             In this course, all practical SQL examples use the
//             <strong> AdventureWorks2019 </strong> sample database.
//           </p>

//           <p>
//             Before running the examples in this session, make sure the
//             AdventureWorks2019 database is installed and available in SQL Server
//             Management Studio (SSMS).
//           </p>

//           <CodeBlock
//           language="sql"
//             code={`USE AdventureWorks2019;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <p>Some of the important tables used in this session are:</p>

//           <table>
//             <thead>
//               <tr>
//                 <th>Schema</th>
//                 <th>Table</th>
//                 <th>Purpose</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Production</td>
//                 <td>Product</td>
//                 <td>Product information</td>
//               </tr>
//               <tr>
//                 <td>Production</td>
//                 <td>ProductSubcategory</td>
//                 <td>Product subcategories</td>
//               </tr>
//               <tr>
//                 <td>Production</td>
//                 <td>ProductCategory</td>
//                 <td>Product categories</td>
//               </tr>
//               <tr>
//                 <td>Sales</td>
//                 <td>SalesOrderHeader</td>
//                 <td>Sales order information</td>
//               </tr>
//               <tr>
//                 <td>Sales</td>
//                 <td>SalesOrderDetail</td>
//                 <td>Products and quantities in sales orders</td>
//               </tr>
//               <tr>
//                 <td>Sales</td>
//                 <td>SalesTerritory</td>
//                 <td>Sales territory information</td>
//               </tr>
//               <tr>
//                 <td>HumanResources</td>
//                 <td>Employee</td>
//                 <td>Employee information</td>
//               </tr>
//               <tr>
//                 <td>Person</td>
//                 <td>Person</td>
//                 <td>Employee/person names and personal information</td>
//               </tr>
//             </tbody>
//           </table>

//           <hr />

//           <h2>1. Grouping and Aggregating Data</h2>

//           <p>
//             We use aggregate functions together with the
//             <code> GROUP BY </code> clause to summarize data.
//           </p>

//           <h3>Common Aggregate Functions</h3>
//           <ul>
//             <li><code>COUNT()</code> – Counts rows</li>
//             <li><code>SUM()</code> – Calculates total</li>
//             <li><code>AVG()</code> – Calculates average</li>
//             <li><code>MIN()</code> – Finds minimum value</li>
//             <li><code>MAX()</code> – Finds maximum value</li>
//           </ul>

//           <h3>Aggregate Functions with AdventureWorks2019</h3>

//           <CodeBlock
//           language="sql"
//             code={`-- Count all products
// SELECT COUNT(*) AS TotalProducts
// FROM Production.Product;

// -- Average product price
// SELECT AVG(ListPrice) AS AveragePrice
// FROM Production.Product
// WHERE ListPrice > 0;

// -- Minimum and maximum price
// SELECT
//     MIN(ListPrice) AS MinPrice,
//     MAX(ListPrice) AS MaxPrice
// FROM Production.Product
// WHERE ListPrice > 0;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>2. GROUP BY</h2>

//           <p>
//             <code>GROUP BY</code> groups rows that have the same values in
//             specified columns so that aggregate functions can be applied to each group.
//           </p>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     Color,
//     COUNT(*) AS ProductCount,
//     AVG(ListPrice) AS AvgPrice
// FROM Production.Product
// WHERE Color IS NOT NULL AND ListPrice > 0
// GROUP BY Color
// ORDER BY ProductCount DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     ProductSubcategoryID,
//     COUNT(*) AS ProductCount,
//     AVG(ListPrice) AS AvgPrice
// FROM Production.Product
// WHERE ProductSubcategoryID IS NOT NULL
// GROUP BY ProductSubcategoryID
// ORDER BY ProductCount DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>3. HAVING Clause</h2>

//           <p>
//             <code>HAVING</code> filters groups after aggregation.
//             <code>WHERE</code> filters rows before grouping.
//           </p>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     Color,
//     COUNT(*) AS ProductCount
// FROM Production.Product
// WHERE Color IS NOT NULL
// GROUP BY Color
// HAVING COUNT(*) > 20
// ORDER BY ProductCount DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>4. Subqueries</h2>

//           <p>A subquery is a query nested inside another query.</p>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID, Name, ListPrice
// FROM Production.Product
// WHERE ListPrice > (
//     SELECT AVG(ListPrice)
//     FROM Production.Product
//     WHERE ListPrice > 0
// );
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID, Name
// FROM Production.Product
// WHERE ProductSubcategoryID IN (
//     SELECT ProductSubcategoryID
//     FROM Production.ProductSubcategory
//     WHERE Name LIKE '%Bike%'
// );
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID, Name, ListPrice
// FROM Production.Product
// WHERE ListPrice = (
//     SELECT MAX(ListPrice)
//     FROM Production.Product
// );
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>5. Table Expressions</h2>

//           <p>Common table expressions (CTEs) improve readability for complex queries.</p>

//           <CodeBlock
//           language="sql"
//             code={`WITH ExpensiveProducts AS
// (
//     SELECT ProductID, Name, ListPrice
//     FROM Production.Product
//     WHERE ListPrice > 1500
// )
// SELECT *
// FROM ExpensiveProducts
// ORDER BY ListPrice DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>6. Joins</h2>

//           <p>Joins combine rows from two or more tables based on related columns.</p>

//           <hr />

//           <h2>7. INNER JOIN</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     p.ProductID,
//     p.Name AS ProductName,
//     ps.Name AS SubcategoryName
// FROM Production.Product AS p
// INNER JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>8. LEFT JOIN</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     p.ProductID,
//     p.Name AS ProductName,
//     ps.Name AS SubcategoryName
// FROM Production.Product AS p
// LEFT JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>9. RIGHT JOIN</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     p.ProductID,
//     p.Name AS ProductName,
//     ps.Name AS SubcategoryName
// FROM Production.Product AS p
// RIGHT JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>10. JOIN + GROUP BY</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     ps.Name AS SubcategoryName,
//     COUNT(*) AS ProductCount,
//     AVG(p.ListPrice) AS AvgPrice
// FROM Production.Product AS p
// INNER JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID
// WHERE p.ListPrice > 0
// GROUP BY ps.Name
// ORDER BY ProductCount DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>11. Sales Data with JOINs</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     p.Name AS ProductName,
//     SUM(sod.OrderQty) AS TotalQty,
//     SUM(sod.LineTotal) AS TotalSales
// FROM Sales.SalesOrderDetail AS sod
// INNER JOIN Production.Product AS p
//     ON sod.ProductID = p.ProductID
// GROUP BY p.Name
// ORDER BY TotalSales DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     pc.Name AS CategoryName,
//     COUNT(DISTINCT p.ProductID) AS ProductCount,
//     SUM(sod.LineTotal) AS TotalSales
// FROM Sales.SalesOrderDetail AS sod
// INNER JOIN Production.Product AS p
//     ON sod.ProductID = p.ProductID
// INNER JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID
// INNER JOIN Production.ProductCategory AS pc
//     ON ps.ProductCategoryID = pc.ProductCategoryID
// GROUP BY pc.Name
// ORDER BY TotalSales DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>12. Set Operators</h2>

//           <h3>UNION / UNION ALL</h3>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID, Name
// FROM Production.Product
// WHERE ListPrice > 1000

// UNION

// SELECT ProductID, Name
// FROM Production.Product
// WHERE Color = 'Black';
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID, Name
// FROM Production.Product
// WHERE ListPrice > 1000

// UNION ALL

// SELECT ProductID, Name
// FROM Production.Product
// WHERE Color = 'Black';
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <h3>INTERSECT and EXCEPT</h3>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID
// FROM Production.Product
// WHERE ListPrice > 1000

// INTERSECT

// SELECT ProductID
// FROM Production.Product
// WHERE Color = 'Black';
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <CodeBlock
//           language="sql"
//             code={`SELECT ProductID
// FROM Production.Product
// WHERE ListPrice > 1000

// EXCEPT

// SELECT ProductID
// FROM Production.Product
// WHERE Color = 'Black';
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>13. PIVOT and UNPIVOT</h2>

//           <p>PIVOT rotates rows into columns for summary reports. UNPIVOT does the reverse.</p>

//           <CodeBlock
//           language="sql"
//             code={`SELECT *
// FROM
// (
//     SELECT Color, ListPrice
//     FROM Production.Product
//     WHERE Color IS NOT NULL AND ListPrice > 0
// ) AS SourceTable
// PIVOT
// (
//     AVG(ListPrice)
//     FOR Color IN ([Red], [Black], [Blue], [Silver])
// ) AS PivotTable;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>14. GROUPING SETS</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     Color,
//     COUNT(*) AS ProductCount
// FROM Production.Product
// WHERE Color IS NOT NULL
// GROUP BY GROUPING SETS
// (
//     (Color),
//     ()
// )
// ORDER BY Color;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>15. Practical Example – AdventureWorks2019</h2>

//           <CodeBlock
//           language="sql"
//             code={`SELECT
//     pc.Name AS CategoryName,
//     ps.Name AS SubcategoryName,
//     COUNT(p.ProductID) AS ProductCount
// FROM Production.Product AS p
// INNER JOIN Production.ProductSubcategory AS ps
//     ON p.ProductSubcategoryID = ps.ProductSubcategoryID
// INNER JOIN Production.ProductCategory AS pc
//     ON ps.ProductCategoryID = pc.ProductCategoryID
// GROUP BY pc.Name, ps.Name
// ORDER BY CategoryName, ProductCount DESC;
// GO`}
//           caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

//           <hr />

//           <h2>16. Session 9 Exercise</h2>
//           <ol>
//             <li>Write a GROUP BY query on product Color with COUNT and AVG(ListPrice).</li>
//             <li>Add a HAVING clause to keep only colors with more than 10 products.</li>
//             <li>Write an INNER JOIN between Product and ProductSubcategory.</li>
//             <li>Write a LEFT JOIN that can show products without a subcategory.</li>
//             <li>Demonstrate UNION vs UNION ALL.</li>
//           </ol>

//           <hr />

//           <h2>17. Session 9 Challenge</h2>
//           <ol>
//             <li>Join Product, ProductSubcategory, and ProductCategory and aggregate by category.</li>
//             <li>Write a subquery that finds products priced above the average.</li>
//             <li>Create a CTE for expensive products and query it.</li>
//             <li>Try a simple PIVOT on product colors.</li>
//           </ol>

//           <hr />

//           <h2>18. Session 9 Quiz</h2>
//           <ol>
//             <li>What does GROUP BY do?</li>
//             <li>When do you use HAVING instead of WHERE?</li>
//             <li>What is a subquery?</li>
//             <li>What is the difference between INNER JOIN and LEFT JOIN?</li>
//             <li>What does UNION remove that UNION ALL keeps?</li>
//             <li>What does INTERSECT return?</li>
//             <li>What does EXCEPT return?</li>
//             <li>What is a CTE?</li>
//             <li>What is PIVOT used for?</li>
//             <li>Why are joins important when data is normalized across tables?</li>
//           </ol>

//           <hr />

//           <p><strong>Next up (Session 10):</strong> Using Views, Stored Procedures, and Querying Metadata</p>
//         </article>
//       </CustomLayout>
//     </Layout>
//   );
// }
