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

          <p>
            This session builds on the basic SELECT skills from previous sessions
            and teaches you how to summarize large amounts of data, combine
            information from multiple related tables, and reshape results for
            reporting. These techniques are used every day in business reporting,
            dashboards, and data analysis.
          </p>

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

          <p>
            AdventureWorks2019 is a sample database provided by Microsoft that
            models a fictional bicycle manufacturer. It contains realistic
            business data across multiple schemas such as Production, Sales,
            HumanResources, and Person. Using a consistent sample database
            allows you to practice the same queries many times and compare
            results with other students.
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

          <p>
            These tables are related through foreign-key columns. For example,
            <code>Production.Product.ProductSubcategoryID</code> points to
            <code>Production.ProductSubcategory.ProductSubcategoryID</code>, and
            <code>ProductSubcategory.ProductCategoryID</code> points to
            <code>ProductCategory.ProductCategoryID</code>. Understanding these
            relationships is essential when you start writing JOINs later in
            this session.
          </p>

          <hr />

          <h2>1. Grouping and Aggregating Data</h2>

          <p>
            We use aggregate functions together with the
            <code> GROUP BY </code> clause to summarize data.
          </p>

          <p>
            Aggregate functions take a set of values (usually from many rows)
            and return a single summary value. Without aggregation, a query
            returns one row for every matching record. With aggregation you can
            answer questions such as “How many products are there?”, “What is
            the total sales amount?”, or “What is the average list price?”.
          </p>

          <h3>Common Aggregate Functions</h3>

          <ul>
            <li><code>COUNT()</code> – Counts rows (or non-NULL values in a column)</li>
            <li><code>SUM()</code> – Calculates the total of numeric values</li>
            <li><code>AVG()</code> – Calculates the arithmetic average of numeric values</li>
            <li><code>MIN()</code> – Finds the minimum (smallest) value</li>
            <li><code>MAX()</code> – Finds the maximum (largest) value</li>
          </ul>

          <p>
            <strong>Important notes about aggregate functions:</strong>
          </p>
          <ul>
            <li>
              <code>COUNT(*)</code> counts every row, including rows that
              contain NULLs. <code>COUNT(column)</code> counts only the rows
              where that column is not NULL.
            </li>
            <li>
              <code>SUM</code> and <code>AVG</code> ignore NULL values. If all
              values are NULL, the result is NULL.
            </li>
            <li>
              Aggregate functions cannot be used in the <code>WHERE</code>
              clause. Filtering on an aggregate is done with the
              <code>HAVING</code> clause (covered later).
            </li>
            <li>
              When you mix regular columns and aggregate functions in the same
              SELECT list, every non-aggregated column must appear in the
              <code>GROUP BY</code> clause.
            </li>
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

          <p>
            Notice that all five aggregate functions are calculated in a single
            pass over the table. SQL Server optimizes this efficiently, so
            combining multiple aggregates in one query is preferred over
            running several separate queries.
          </p>

          <hr />

          <h2>2. GROUP BY</h2>

          <p>
            The <code>GROUP BY</code> clause divides rows into groups and
            allows aggregate functions to calculate values for each group.
          </p>

          <p>
            Without <code>GROUP BY</code>, an aggregate function returns one
            value for the entire result set. With <code>GROUP BY</code>, the
            engine first partitions the rows according to the columns you list,
            then applies the aggregate function to each partition separately.
            The final result contains one row per distinct group.
          </p>

          <p>
            <strong>Rules to remember:</strong>
          </p>
          <ul>
            <li>
              Every column that appears in the SELECT list and is not inside an
              aggregate function must also appear in the <code>GROUP BY</code>
              list.
            </li>
            <li>
              You may group by columns that are not selected, but the opposite
              is not allowed.
            </li>
            <li>
              <code>NULL</code> values form their own group. All rows where the
              grouping column is NULL are placed together.
            </li>
            <li>
              The order of columns in <code>GROUP BY</code> does not affect the
              grouping logic, only the visual order of columns in the result.
            </li>
          </ul>

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

          <p>
            This query returns one row for each distinct color (including a
            row for NULL if any products have no color). The
            <code>COUNT(*)</code> shows how many products share that color.
            Ordering by the aggregate makes the most frequent colors appear
            first.
          </p>

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

          <p>
            The <code>WHERE Color IS NOT NULL</code> filter removes the NULL
            group before aggregation. Filtering with <code>WHERE</code> happens
            before the groups are formed, so it is the correct place to exclude
            unwanted rows early.
          </p>

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

          <p>
            While <code>WHERE</code> filters individual rows before they are
            grouped, <code>HAVING</code> filters the groups themselves after
            the aggregate calculations have been performed. You typically put
            conditions that involve aggregate functions inside
            <code>HAVING</code>.
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

          <p>
            In the example above, SQL Server first discards rows with a NULL
            color, then groups the remaining rows by Color, then calculates
            <code>COUNT(*)</code> for each group, and finally keeps only those
            groups whose count is greater than 10.
          </p>

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

          <p>
            <strong>Summary of the difference:</strong>
          </p>
          <ul>
            <li>
              <code>WHERE</code> works on individual rows and cannot reference
              aggregate functions.
            </li>
            <li>
              <code>HAVING</code> works on groups and can (and usually does)
              reference aggregate functions.
            </li>
            <li>
              You can use both in the same query: <code>WHERE</code> first
              reduces the number of rows that enter the grouping stage, then
              <code>HAVING</code> reduces the number of groups that appear in
              the final result.
            </li>
          </ul>

          <hr />

          <h2>4. Subqueries</h2>

          <p>
            A <strong>subquery</strong> is a query nested inside another query.
          </p>

          <p>
            Subqueries let you break a complex problem into smaller pieces.
            The inner query (the subquery) is usually evaluated first and its
            result is then used by the outer query. Subqueries can appear in
            the <code>SELECT</code> list, the <code>FROM</code> clause, the
            <code>WHERE</code> clause, or even inside another subquery.
          </p>

          <h3>Types of Subqueries</h3>

          <ul>
            <li>
              <strong>Single-row subquery</strong> – Returns exactly one value
              (one row, one column). It can be compared with operators such as
              <code>=</code>, <code>{'>'}</code>, <code>{'<'}</code>, etc.
            </li>
            <li>
              <strong>Multi-row subquery</strong> – Returns multiple values.
              It is typically used with operators such as <code>IN</code>,
              <code>ANY</code>, or <code>ALL</code>.
            </li>
            <li>
              <strong>Correlated subquery</strong> – References columns from
              the outer query. It is re-evaluated once for every row of the
              outer query and is therefore often slower than a non-correlated
              subquery.
            </li>
          </ul>

          <p>
            Most of the examples in this section are non-correlated single-row
            subqueries, which are the easiest to understand and the most
            commonly used form when filtering against an aggregate value.
          </p>

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

          <p>
            In the first example the subquery calculates the average list
            price of the entire Product table. The outer query then returns
            only those products whose ListPrice is higher than that average.
            Because the subquery does not depend on any column from the outer
            query, it is executed only once.
          </p>

          <p>
            The second example finds the single highest price and returns every
            product that has exactly that price (there could be more than one
            product sharing the maximum price).
          </p>

          <p>
            The third example shows that a subquery can itself contain a
            <code>WHERE</code> clause, so you can compare against the average
            of a subset of the data rather than the whole table.
          </p>

          <hr />

          <h2>5. Table Expressions</h2>

          <p>
            Table expressions allow us to work with the result of a query as
            if it were a table.
          </p>

          <p>
            Instead of repeating a complex subquery in multiple places, or
            writing nested derived tables that become hard to read, you can
            give the intermediate result a name. The two most common table
            expressions in SQL Server are Common Table Expressions (CTEs) and
            derived tables.
          </p>

          <h3>5.1 Common Table Expression (CTE)</h3>

          <p>
            A <strong>CTE</strong> is a temporary named result set that exists
            for the duration of a single statement.
          </p>

          <p>
            A CTE is introduced with the <code>WITH</code> keyword, followed by
            the name of the CTE, an optional column list, the <code>AS</code>
            keyword, and a parenthesized query. After the CTE is defined you
            can reference it just like a normal table in the main query that
            follows.
          </p>

          <p>
            Advantages of CTEs:
          </p>
          <ul>
            <li>They improve readability by giving intermediate results meaningful names.</li>
            <li>They can be referenced multiple times in the same statement.</li>
            <li>They support recursion (useful for hierarchical data such as employee-manager relationships).</li>
            <li>They make complex queries easier to debug step by step.</li>
          </ul>

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

          <p>
            Unlike a CTE, a derived table does not have a name defined with
            <code>WITH</code>; instead you must give it an alias in the FROM
            clause (the <code>AS ProductSummary</code> part). Functionally a
            derived table and a non-recursive CTE achieve the same goal. Many
            developers prefer CTEs because the syntax is clearer when the
            intermediate result is large or when the same result needs to be
            referenced more than once.
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

          <p>
            In a relational database the data is intentionally split across
            multiple tables to avoid redundancy. A product name is stored once
            in the Product table; its subcategory name is stored once in the
            ProductSubcategory table. When you need both pieces of information
            together you use a JOIN that matches the foreign-key column in one
            table with the primary-key column in the other.
          </p>

          <p>
            The matching condition is written in the <code>ON</code> clause.
            Most joins are based on equality (<code>=</code>), but other
            comparison operators are also allowed.
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

          <p>
            Choosing the correct join type is important. An INNER JOIN is the
            most common when you only care about rows that have a match in both
            tables. LEFT (or RIGHT) JOIN is used when you must keep every row
            from one side even if the other side has no match. CROSS JOIN is
            rarely used in ordinary queries because it produces a Cartesian
            product that grows very quickly.
          </p>

          <hr />

          <h2>7. INNER JOIN</h2>

          <p>
            An <code>INNER JOIN</code> returns only records that have matching
            values in both tables.
          </p>

          <p>
            If a product has a <code>ProductSubcategoryID</code> that does not
            exist in the ProductSubcategory table (or is NULL), that product
            will be excluded from the result. Likewise, any subcategory that
            has no products will not appear. INNER JOIN is therefore the
            strictest of the common join types.
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

          <p>
            When joining more than two tables you simply chain additional
            <code>JOIN ... ON</code> clauses. The order of the joins can
            affect readability and sometimes the optimizer’s plan, but the
            logical result is the same as long as the join conditions are
            correct. Always start from the “main” table that drives the query
            and then bring in related tables one by one.
          </p>

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

          <p>
            The table written before the <code>LEFT JOIN</code> keyword is the
            “left” table. All of its rows appear in the result. Columns that
            come from the right table will contain NULL for any left-side row
            that has no match.
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

          <p>
            LEFT JOIN is especially useful when you need a complete list of
            items from one table and optionally want related information from
            another table (for example, “show every product and its subcategory
            name if it has one”).
          </p>

          <hr />

          <h2>9. RIGHT JOIN</h2>

          <p>
            A <code>RIGHT JOIN</code> returns every row from the right table
            and matching rows from the left table.
          </p>

          <p>
            RIGHT JOIN is the mirror image of LEFT JOIN. Every row from the
            table written after the <code>RIGHT JOIN</code> keyword appears in
            the result; columns from the left table become NULL when there is
            no match.
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

          <p>
            Both LEFT and RIGHT joins preserve all rows from one side. The
            choice is mostly a matter of which table you consider the “main”
            table in the query.
          </p>

          <hr />

          <h2>10. JOIN + GROUP BY</h2>

          <p>
            Joins can be combined with aggregate functions and
            <code> GROUP BY </code>.
          </p>

          <p>
            This is a very common pattern in real-world reporting: you first
            join the tables that contain the related data, then group the
            joined result and apply aggregates. When you use a LEFT JOIN before
            grouping you can still see groups that have zero matching rows
            (the aggregate will return 0 or NULL depending on the function).
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

          <p>
            Unlike joins (which combine columns from different tables), set
            operators combine rows from different queries. The two queries
            must return the same number of columns and the corresponding
            columns must have compatible data types. Column names in the final
            result are taken from the first query.
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

          <p>
            <code>UNION</code> performs an implicit DISTINCT across the
            combined result. Because of the extra work required to eliminate
            duplicates, <code>UNION</code> is slower than
            <code>UNION ALL</code> when you know that duplicates cannot occur
            or when you actually want to keep them.
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

          <p>
            <strong>Quick comparison of set operators:</strong>
          </p>
          <ul>
            <li><code>UNION</code> – all rows from both queries, duplicates removed.</li>
            <li><code>UNION ALL</code> – all rows from both queries, duplicates kept.</li>
            <li><code>INTERSECT</code> – only rows that appear in both queries.</li>
            <li><code>EXCEPT</code> – rows that appear in the first query but not in the second.</li>
          </ul>

          <p>
            Set operators are evaluated from left to right, but you can use
            parentheses to control the order when you combine more than two
            queries.
          </p>

          <hr />

          <h2>13. PIVOT and UNPIVOT</h2>

          <p>
            <strong>PIVOT</strong> rotates rows into columns.
          </p>

          <p>
            <strong>UNPIVOT</strong> converts columns back into rows.
          </p>

          <p>
            PIVOT is especially useful for cross-tab reports where you want
            categories (for example years or colors) to appear as column
            headers rather than as values in a single column. The operator
            takes three pieces of information:
          </p>
          <ul>
            <li>The aggregate function that produces the cell values (COUNT, SUM, AVG, …).</li>
            <li>The column whose distinct values will become the new column headers (the FOR … IN list).</li>
            <li>The source data, which is usually supplied as a derived table or CTE.</li>
          </ul>

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

          <p>
            Each value listed in the <code>IN (...)</code> clause becomes a
            column in the output. Products whose color is not in that list are
            ignored for the purpose of the pivot. You must explicitly name
            every column you want to see; there is no automatic “all possible
            values” option.
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

          <p>
            Normally you would need several separate queries (or a UNION of
            several GROUP BY queries) to obtain totals at different levels of
            aggregation. GROUPING SETS lets you request all of those levels in
            one statement. SQL Server computes each grouping set and returns
            the combined result. The empty parentheses <code>()</code>
            represent the grand-total grouping (no columns).
          </p>

          <p>
            Related features that you may meet later are <code>CUBE</code>
            (all possible combinations of the listed columns) and
            <code>ROLLUP</code> (hierarchical subtotals). GROUPING SETS gives
            you the most explicit control.
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

          <p>
            When a column is not part of a particular grouping set its value
            appears as NULL in the result. You can use the
            <code>GROUPING()</code> function to distinguish a real NULL from a
            NULL that simply means “this column was not grouped on”.
          </p>

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
            code={`-- Products by color
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
ORDER BY AveragePrice DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <h3>JOIN + GROUP BY</h3>

          <CodeBlock
          language="sql"
            code={`-- Number of products in each subcategory
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

          <p>
            Work through each exercise using the AdventureWorks2019 database.
            Try to write the queries yourself before looking at earlier
            examples. After you have a working solution, experiment by adding
            extra columns, changing filters, or combining techniques
            (for example JOIN + GROUP BY + HAVING).
          </p>

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

          <p>
            The challenges are intentionally a step harder than the exercises.
            They require combining several concepts from this session
            (joins, aggregates, CTEs, filtering). If you get stuck, break the
            problem into smaller pieces: first write the join, then add the
            aggregate, then wrap it in a CTE if needed.
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
              Create an INNER JOIN between Sales.SalesOrderHeader and
              Sales.SalesTerritory and show territory name with total sales.
            </li>

            <li>
              Use a subquery to find products more expensive than the average
              price of products in subcategory 1.
            </li>
          </ol>

          <hr />

          <h2>18. Review Questions</h2>

          <ol>
            <li>
              What is the purpose of the <code>GROUP BY</code> clause?
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
            The power of SQL comes from the ability to reassemble related data
            at query time using joins, to summarize it with aggregates and
            GROUP BY, and to reshape it with techniques such as PIVOT. Once you
            master these building blocks you can answer almost any business
            question that can be expressed against the data model.
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
