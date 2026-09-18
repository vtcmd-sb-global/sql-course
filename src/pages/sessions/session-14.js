import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session14() {
  return (
    <Layout
      title="Session 14 — Transactions and Error Handling"
      description="Transactions, Isolation Levels, Locks, TRY...CATCH, THROW, and Error Handling in SQL Server 2022"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 14 — Transactions and Error Handling</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding transactions, concurrency, and professional error handling in T-SQL.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 14</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Define and describe transactions</li>
            <li>Explain the procedure to implement transactions</li>
            <li>Explain the steps to mark a transaction</li>
            <li>Distinguish between implicit and explicit transactions</li>
            <li>Explain isolation levels</li>
            <li>Explain the scope and different types of locks</li>
            <li>Explain error handling and its implementation</li>
            <li>Elaborate on the TRY...CATCH block</li>
            <li>Explain the use of ERROR_NUMBER, ERROR_SEVERITY, ERROR_STATE, ERROR_PROCEDURE, ERROR_LINE, and ERROR_MESSAGE</li>
            <li>Elaborate on the THROW statement</li>
          </ul>

          <hr />

          <h2>1. What is a Transaction?</h2>
          <p>A <strong>transaction</strong> is a single unit of work. It is a sequence of one or more operations that are executed as a single logical unit.</p>

          <p>A transaction must follow the <strong>ACID</strong> properties:</p>
          <ul>
            <li><strong>Atomicity</strong> – All operations succeed or all fail</li>
            <li><strong>Consistency</strong> – Database remains in a consistent state</li>
            <li><strong>Isolation</strong> – Transactions do not interfere with each other</li>
            <li><strong>Durability</strong> – Once committed, changes are permanent</li>
          </ul>

          <hr />

          <h2>2. Explicit vs Implicit Transactions</h2>

          <h3>Explicit Transactions</h3>
          <p>You explicitly control the transaction using:</p>
          <pre>
            <code>{`BEGIN TRANSACTION;   -- or BEGIN TRAN
-- SQL statements
COMMIT TRANSACTION;   -- or COMMIT
-- or
ROLLBACK TRANSACTION; -- or ROLLBACK`}</code>
          </pre>

          <h3>Implicit Transactions</h3>
          <p>When <code>IMPLICIT_TRANSACTIONS</code> is set to ON, SQL Server automatically starts a transaction for certain statements. You still need to issue COMMIT or ROLLBACK.</p>

          <pre>
            <code>{`SET IMPLICIT_TRANSACTIONS ON;`}</code>
          </pre>

          <hr />

          <h2>3. Implementing Transactions</h2>
          <pre>
            <code>{`BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Accounts
    SET Balance = Balance - 5000
    WHERE AccountID = 101;

    UPDATE Accounts
    SET Balance = Balance + 5000
    WHERE AccountID = 102;

    COMMIT TRANSACTION;
    PRINT 'Transaction committed successfully.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Transaction rolled back due to error.';
    THROW;
END CATCH;`}</code>
          </pre>

          <hr />

          <h2>4. Savepoints (Marking a Transaction)</h2>
          <p>You can create savepoints to partially roll back a transaction.</p>

          <pre>
            <code>{`BEGIN TRANSACTION;

UPDATE Employees SET Salary = Salary * 1.10 WHERE DepartmentID = 1;
SAVE TRANSACTION SavePoint1;

UPDATE Employees SET Salary = Salary * 1.20 WHERE DepartmentID = 2;

-- Rollback only the second update
ROLLBACK TRANSACTION SavePoint1;

COMMIT TRANSACTION;`}</code>
          </pre>

          <hr />

          <h2>5. Isolation Levels</h2>
          <p>Isolation levels control how one transaction is isolated from other concurrent transactions.</p>

          <table>
            <thead>
              <tr>
                <th>Isolation Level</th>
                <th>Dirty Read</th>
                <th>Non-Repeatable Read</th>
                <th>Phantom Read</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>READ UNCOMMITTED</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>READ COMMITTED (Default)</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>REPEATABLE READ</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>SERIALIZABLE</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <td>SNAPSHOT</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>

          <pre>
            <code>{`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
-- queries
COMMIT;`}</code>
          </pre>

          <hr />

          <h2>6. Locks</h2>
          <p>SQL Server uses locks to control concurrent access to resources.</p>

          <h3>Common Lock Types</h3>
          <ul>
            <li><strong>Shared (S)</strong> – For reading data</li>
            <li><strong>Exclusive (X)</strong> – For modifying data</li>
            <li><strong>Update (U)</strong> – Prevents deadlock in some cases</li>
            <li><strong>Intent locks</strong> – Indicate intention to acquire locks at lower level</li>
            <li><strong>Schema locks</strong> – Protect table structure</li>
          </ul>

          <p>Lock escalation can convert many fine-grained locks into a single table-level lock for efficiency.</p>

          <hr />

          <h2>7. Error Handling in T-SQL</h2>
          <p>Modern error handling is done using the <strong>TRY...CATCH</strong> block (introduced in SQL Server 2005).</p>

          <h3>Basic Structure</h3>
          <pre>
            <code>{`BEGIN TRY
    -- Statements that might cause error
END TRY
BEGIN CATCH
    -- Error handling code
END CATCH`}</code>
          </pre>

          <hr />

          <h2>8. Error Information Functions</h2>
          <p>Inside the CATCH block, you can use these functions:</p>

          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ERROR_NUMBER()</code></td>
                <td>Returns the error number</td>
              </tr>
              <tr>
                <td><code>ERROR_SEVERITY()</code></td>
                <td>Returns the severity level</td>
              </tr>
              <tr>
                <td><code>ERROR_STATE()</code></td>
                <td>Returns the state number</td>
              </tr>
              <tr>
                <td><code>ERROR_PROCEDURE()</code></td>
                <td>Returns the name of the stored procedure/trigger</td>
              </tr>
              <tr>
                <td><code>ERROR_LINE()</code></td>
                <td>Returns the line number where the error occurred</td>
              </tr>
              <tr>
                <td><code>ERROR_MESSAGE()</code></td>
                <td>Returns the complete error message text</td>
              </tr>
            </tbody>
          </table>

          <pre>
            <code>{`BEGIN TRY
    SELECT 1 / 0;
END TRY
BEGIN CATCH
    SELECT 
        ERROR_NUMBER()   AS ErrorNumber,
        ERROR_SEVERITY() AS ErrorSeverity,
        ERROR_STATE()    AS ErrorState,
        ERROR_PROCEDURE() AS ErrorProcedure,
        ERROR_LINE()     AS ErrorLine,
        ERROR_MESSAGE()  AS ErrorMessage;
END CATCH;`}</code>
          </pre>

          <hr />

          <h2>9. THROW Statement</h2>
          <p><code>THROW</code> is the modern recommended way to raise errors (preferred over <code>RAISERROR</code> in new code).</p>

          <pre>
            <code>{`-- Re-throw the original error
BEGIN CATCH
    THROW;
END CATCH;

-- Throw a custom error
THROW 50001, 'Custom error: Invalid salary value.', 1;`}</code>
          </pre>

          <hr />

          <h2>10. Complete Example – Transaction + Error Handling</h2>
          <pre>
            <code>{`BEGIN TRY
    BEGIN TRANSACTION;

    -- Debit
    UPDATE Accounts SET Balance = Balance - 10000 WHERE AccountID = 101;

    -- Credit
    UPDATE Accounts SET Balance = Balance + 10000 WHERE AccountID = 102;

    -- Simulate error
    -- DECLARE @x INT = 1/0;

    COMMIT TRANSACTION;
    PRINT 'Transfer successful';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    PRINT 'Transfer failed';
    PRINT ERROR_MESSAGE();

    THROW;  -- Re-throw to caller
END CATCH;`}</code>
          </pre>

          <hr />

          <h2>Session 14 Exercise</h2>
          <ol>
            <li>Write a simple transaction that transfers money between two accounts and handles errors using TRY...CATCH.</li>
            <li>Create a savepoint example and perform a partial rollback.</li>
            <li>Write a CATCH block that displays all error information functions.</li>
            <li>Use the THROW statement to raise a custom error.</li>
            <li>Test different isolation levels with concurrent sessions (if possible).</li>
          </ol>

          <hr />

          <h2>Session 14 Challenge</h2>
          <p>Create a robust money transfer stored procedure that:</p>
          <ol>
            <li>Accepts FromAccount, ToAccount, and Amount as parameters.</li>
            <li>Uses an explicit transaction.</li>
            <li>Validates that the FromAccount has sufficient balance.</li>
            <li>Uses TRY...CATCH for error handling.</li>
            <li>Rolls back on any error and returns a meaningful message.</li>
            <li>Uses THROW to re-throw unexpected errors.</li>
          </ol>

          <hr />

          <h2>Session 14 Quiz</h2>
          <ol>
            <li>What does ACID stand for?</li>
            <li>What is the difference between COMMIT and ROLLBACK?</li>
            <li>What is a savepoint?</li>
            <li>What is the default isolation level in SQL Server?</li>
            <li>Which isolation level prevents dirty reads but allows non-repeatable reads?</li>
            <li>What is the purpose of the TRY...CATCH block?</li>
            <li>Name any four error information functions available in the CATCH block.</li>
            <li>What is the advantage of THROW over RAISERROR?</li>
            <li>What does @@TRANCOUNT return?</li>
            <li>Why should you always check @@TRANCOUNT before rolling back?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 15):</strong> PolyBase and Query Store</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
