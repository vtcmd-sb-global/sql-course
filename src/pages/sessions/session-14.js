import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session14() {
  return (
    <Layout
      title="Session 14 — Transactions and Error Handling"
      description="Transactions, isolation levels, TRY...CATCH, and error handling in SQL Server"
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
          <h1>Session 14 — Transactions and Error Handling</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Transactions, isolation levels, and structured error handling.</p>

          <hr />

          <h2>1. Basic Transaction</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRANSACTION;  -- or BEGIN TRAN
-- SQL statements
COMMIT TRANSACTION; -- or COMMIT
-- or
ROLLBACK TRANSACTION; -- or ROLLBACK`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>2. Transaction with TRY...CATCH</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Accounts
    SET Balance = Balance - 1000
    WHERE AccountID = 1;

    UPDATE Accounts
    SET Balance = Balance + 1000
    WHERE AccountID = 2;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    THROW;
END CATCH;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. Simple Update in a Transaction</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRANSACTION;

UPDATE Employees
SET Salary = Salary * 1.10
WHERE DepartmentID = 5;

-- Check results, then:
COMMIT;   -- or ROLLBACK;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. Isolation Level</h2>
          <CodeBlock
          language="sql"
            code={`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
-- queries here
COMMIT;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. TRY...CATCH Structure</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRY
    -- Statements that might cause error
END TRY
BEGIN CATCH
    -- Error handling code
END CATCH;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Error Information Functions</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRY
    SELECT 1 / 0;
END TRY
BEGIN CATCH
    SELECT
        ERROR_NUMBER()    AS ErrorNumber,
        ERROR_SEVERITY()  AS ErrorSeverity,
        ERROR_STATE()     AS ErrorState,
        ERROR_PROCEDURE() AS ErrorProcedure,
        ERROR_LINE()      AS ErrorLine,
        ERROR_MESSAGE()   AS ErrorMessage;
END CATCH;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. THROW</h2>
          <CodeBlock
          language="sql"
            code={`-- Re-throw the original error
BEGIN CATCH
    THROW;
END CATCH;

-- Throw a custom error
THROW 50001, 'Custom error message', 1;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. Complete Money Transfer Example</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRY
    BEGIN TRANSACTION;

    -- Debit
    UPDATE Accounts SET Balance = Balance - 500
    WHERE AccountID = 101;

    -- Credit
    UPDATE Accounts SET Balance = Balance + 500
    WHERE AccountID = 102;

    COMMIT TRANSACTION;
    PRINT 'Transfer successful';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    PRINT 'Transfer failed: ' + ERROR_MESSAGE();
    THROW;
END CATCH;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9–11. Practice Transactions</h2>
          <CodeBlock
          language="sql"
            code={`BEGIN TRANSACTION;
UPDATE Students SET Marks = Marks + 5 WHERE DepartmentID = 1;
COMMIT;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`BEGIN TRANSACTION;
UPDATE Students SET Marks = 0 WHERE DepartmentID = 2;
ROLLBACK;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <CodeBlock
          language="sql"
            code={`BEGIN TRY
    BEGIN TRANSACTION;
    UPDATE Students SET Marks = 100 WHERE StudentID = 1;
    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
    SELECT ERROR_MESSAGE();
END CATCH;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 14 Exercise</h2>
          <ol>
            <li>Write a transaction that updates two tables and commits only if both succeed.</li>
            <li>Demonstrate ROLLBACK.</li>
            <li>Use TRY...CATCH and display ERROR_MESSAGE().</li>
            <li>Explain the difference between COMMIT and ROLLBACK.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 15):</strong> PolyBase and Query Store</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
