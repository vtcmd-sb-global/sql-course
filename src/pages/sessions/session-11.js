import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session11() {
  return (
    <Layout
      title="Session 11 — Stored Procedures"
      description="Stored Procedures in SQL Server 2022"
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
          <h1>Session 11 — Stored Procedures</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Creating and using stored procedures in SQL Server.</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Explain what a stored procedure is</li>
            <li>Create, alter, and drop stored procedures</li>
            <li>Use input and output parameters</li>
            <li>Execute stored procedures</li>
          </ul>

          <hr />

          <h2>1. What is a Stored Procedure?</h2>
          <p>A <strong>stored procedure</strong> is a prepared SQL code that you can save and reuse.</p>

          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SELECT ProductID, Name, ListPrice
    FROM Production.Product;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`EXEC GetAllProducts;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. Stored Procedure with Parameters</h2>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE GetProductsByColor
    @Color NVARCHAR(15)
AS
BEGIN
    SELECT ProductID, Name, Color, ListPrice
    FROM Production.Product
    WHERE Color = @Color;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`EXEC GetProductsByColor @Color = 'Black';
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. Output Parameters</h2>
          <CodeBlock
          language="sql"
            code={`CREATE PROCEDURE GetProductCount
    @Count INT OUTPUT
AS
BEGIN
    SELECT @Count = COUNT(*)
    FROM Production.Product;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`DECLARE @Total INT;
EXEC GetProductCount @Count = @Total OUTPUT;
SELECT @Total AS ProductCount;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Alter and Drop</h2>
          <CodeBlock
          language="sql"
            code={`ALTER PROCEDURE GetAllProducts
AS
BEGIN
    SELECT ProductID, Name, ListPrice, Color
    FROM Production.Product;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`DROP PROCEDURE GetAllProducts;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 11 Exercise</h2>
          <ol>
            <li>Create a stored procedure that returns products with ListPrice greater than a given value.</li>
            <li>Add an output parameter that returns the number of rows.</li>
            <li>Execute and test your procedure.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 12):</strong> Triggers</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
