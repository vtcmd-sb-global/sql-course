import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session12() {
  return (
    <Layout
      title="Session 12 — Triggers"
      description="Triggers in SQL Server 2022 — DML Triggers, Nested Triggers, INSTEAD OF Triggers, and Performance Considerations"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 12 — Triggers</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding and working with Triggers in SQL Server.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 12</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Explain triggers</li>
            <li>Explain the procedure to create and alter DML triggers</li>
            <li>Describe nested triggers</li>
            <li>Describe update functions</li>
            <li>Explain the handling of multiple rows in a trigger</li>
            <li>Explain the performance implication of triggers</li>
          </ul>

          <hr />

          <h2>1. What is a Trigger?</h2>
          <p>A <strong>Trigger</strong> is a special type of stored procedure that automatically executes when an event occurs in the database server.</p>

          <p>Triggers are tightly bound to a table or view and are executed automatically — they cannot be called directly.</p>

          <h3>Common Use Cases</h3>
          <ul>
            <li>Enforcing complex business rules</li>
            <li>Auditing changes (who changed what and when)</li>
            <li>Maintaining summary tables</li>
            <li>Preventing invalid transactions</li>
            <li>Logging historical data</li>
          </ul>

          <hr />

          <h2>2. Types of Triggers</h2>

          <h3>DML Triggers</h3>
          <p>Fired in response to data modification events:</p>
          <ul>
            <li><code>INSERT</code></li>
            <li><code>UPDATE</code></li>
            <li><code>DELETE</code></li>
          </ul>

          <h3>DDL Triggers</h3>
          <p>Fired in response to Data Definition Language events (CREATE, ALTER, DROP, etc.) — mainly used for database-level auditing.</p>

          <h3>LOGON Triggers</h3>
          <p>Fired when a user session is established with SQL Server.</p>

          <p>In this session, we mainly focus on <strong>DML Triggers</strong>.</p>

          <hr />

          <h2>3. Magic Tables (Inserted & Deleted)</h2>
          <p>When a DML trigger fires, SQL Server automatically creates two special temporary tables:</p>

          <table>
            <thead>
              <tr>
                <th>Table</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>inserted</code></td>
                <td>Contains the new rows (for INSERT and UPDATE)</td>
              </tr>
              <tr>
                <td><code>deleted</code></td>
                <td>Contains the old rows (for DELETE and UPDATE)</td>
              </tr>
            </tbody>
          </table>

          <p>These tables are only available inside the trigger and are automatically managed by SQL Server.</p>

          <hr />

          <h2>4. Creating DML Triggers</h2>

          <h3>INSERT Trigger Example</h3>
          <pre>
            <code>{`CREATE TRIGGER trg_Employee_Insert
ON Employees
AFTER INSERT
AS
BEGIN
    PRINT 'New employee record has been inserted.';
    
    -- Example: Log the insertion
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'INSERT', GETDATE()
    FROM inserted;
END;
GO`}</code>
          </pre>

          <h3>UPDATE Trigger Example</h3>
          <pre>
            <code>{`CREATE TRIGGER trg_Employee_Update
ON Employees
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate, OldSalary, NewSalary)
    SELECT 
        i.EmployeeID,
        'UPDATE',
        GETDATE(),
        d.Salary,
        i.Salary
    FROM inserted i
    INNER JOIN deleted d ON i.EmployeeID = d.EmployeeID;
END;
GO`}</code>
          </pre>

          <h3>DELETE Trigger Example</h3>
          <pre>
            <code>{`CREATE TRIGGER trg_Employee_Delete
ON Employees
AFTER DELETE
AS
BEGIN
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'DELETE', GETDATE()
    FROM deleted;
END;
GO`}</code>
          </pre>

          <hr />

          <h2>5. INSTEAD OF Triggers</h2>
          <p>An <strong>INSTEAD OF</strong> trigger executes <em>instead of</em> the original triggering action.</p>

          <p>These are commonly used on views to make them updatable.</p>

          <pre>
            <code>{`CREATE TRIGGER trg_InsteadOf_Insert_Employee
ON Employees
INSTEAD OF INSERT
AS
BEGIN
    -- Custom logic before inserting
    INSERT INTO Employees (FirstName, LastName, Salary, DepartmentID)
    SELECT FirstName, LastName, Salary, DepartmentID
    FROM inserted
    WHERE Salary > 0;   -- Example business rule
END;
GO`}</code>
          </pre>

          <hr />

          <h2>6. Nested Triggers</h2>
          <p>A trigger can cause another trigger to fire. This is called <strong>nesting</strong>.</p>

          <ul>
            <li>SQL Server allows nested triggers up to <strong>32 levels</strong>.</li>
            <li>Nesting can be enabled or disabled using the server configuration option <code>nested triggers</code>.</li>
          </ul>

          <pre>
            <code>{`-- Check current setting
EXEC sp_configure 'nested triggers';

-- Enable nested triggers
EXEC sp_configure 'nested triggers', 1;
RECONFIGURE;`}</code>
          </pre>

          <hr />

          <h2>7. Handling Multiple Rows</h2>
          <p>Triggers must be written to handle multi-row operations correctly. Never assume only one row is affected.</p>

          <pre>
            <code>{`-- Correct way (set-based)
INSERT INTO AuditTable (EmployeeID, ActionDate)
SELECT EmployeeID, GETDATE()
FROM inserted;

-- Wrong way (will fail or work incorrectly with multiple rows)
-- DECLARE @EmpID INT
-- SELECT @EmpID = EmployeeID FROM inserted`}</code>
          </pre>

          <hr />

          <h2>8. Altering and Dropping Triggers</h2>

          <pre>
            <code>{`-- Alter a trigger
ALTER TRIGGER trg_Employee_Insert
ON Employees
AFTER INSERT
AS
BEGIN
    PRINT 'Employee insert trigger modified.';
END;
GO

-- Drop a trigger
DROP TRIGGER trg_Employee_Insert;
GO

-- Disable a trigger temporarily
DISABLE TRIGGER trg_Employee_Insert ON Employees;

-- Enable it again
ENABLE TRIGGER trg_Employee_Insert ON Employees;`}</code>
          </pre>

          <hr />

          <h2>9. Performance Implications of Triggers</h2>
          <ul>
            <li>Triggers add overhead to DML operations (INSERT/UPDATE/DELETE become slower).</li>
            <li>Poorly written triggers (especially with cursors or row-by-row logic) can severely hurt performance.</li>
            <li>Triggers can cause unexpected cascading effects when nested.</li>
            <li>Debugging issues caused by triggers can be harder because they execute automatically.</li>
            <li>Prefer constraints, application logic, or stored procedures when possible. Use triggers only when necessary.</li>
          </ul>

          <hr />

          <h2>Practical Example – CollegeDB</h2>
          <pre>
            <code>{`-- Supporting tables
CREATE TABLE ProjectUsers
(
    UserID   INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(150) NULL
);
GO

INSERT INTO ProjectUsers (UserName) VALUES ('Aousaja'), ('Shafqat');
GO

CREATE TABLE StudentAudit
(
    AuditID    INT PRIMARY KEY IDENTITY(1,1),
    StudentID  INT,
    ActionType VARCHAR(20),
    ActionDate DATETIME DEFAULT GETDATE(),
    UserID     INT NULL
);
GO

ALTER TABLE Students ADD UserID INT NULL;
GO

ALTER TABLE Students
ADD CONSTRAINT FK_Students_ProjectUsers
FOREIGN KEY (UserID) REFERENCES ProjectUsers(UserID);
GO

-- INSERT Trigger
CREATE TRIGGER trg_Student_Insert
ON Students
AFTER INSERT
AS
BEGIN
    INSERT INTO StudentAudit (StudentID, ActionType, UserID)
    SELECT StudentID, 'INSERT', UserID
    FROM inserted;
END;
GO

-- Test
INSERT INTO Students (Name, Age, Gender, City, Marks, DepartmentID, UserID)
VALUES ('Ahsan Khan', 30, 'Male', 'Quetta', 65, 2, 1);
GO

SELECT TOP 1 * FROM StudentAudit ORDER BY AuditID DESC;`}</code>
          </pre>

  <hr />

          <h2>Session 12 Exercise</h2>
          <ol>
            <li>Create an AFTER INSERT trigger that logs new employee records into an audit table.</li>
            <li>Create an AFTER UPDATE trigger that records old and new salary values.</li>
            <li>Create an AFTER DELETE trigger that logs deleted employees.</li>
            <li>Test all three triggers with sample INSERT, UPDATE, and DELETE statements.</li>
            <li>Disable and then re-enable one of the triggers.</li>
          </ol>

          <hr />

          <h2>Session 12 Challenge</h2>
          <p>Create a complete auditing solution:</p>
          <ol>
            <li>Create an <code>EmployeeAudit</code> table with suitable columns (AuditID, EmployeeID, Action, OldValues, NewValues, ActionDate, etc.).</li>
            <li>Write triggers for INSERT, UPDATE, and DELETE that populate the audit table.</li>
            <li>Handle multi-row operations correctly.</li>
            <li>Write a query to view the audit history for a specific employee.</li>
            <li>(Optional) Create an INSTEAD OF trigger on a view.</li>
          </ol>

          <hr />

          <h2>Session 12 Quiz</h2>
          <ol>
            <li>What is a Trigger?</li>
            <li>Can you explicitly execute a trigger using EXEC?</li>
            <li>What are the two magic tables available inside a DML trigger?</li>
            <li>What is the difference between AFTER and INSTEAD OF triggers?</li>
            <li>What is a nested trigger?</li>
            <li>What is the maximum nesting level for triggers in SQL Server?</li>
            <li>Why should triggers be written to handle multiple rows?</li>
            <li>How do you temporarily stop a trigger from firing without deleting it?</li>
            <li>What are the performance implications of using triggers?</li>
            <li>When should you prefer constraints over triggers?</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 13):</strong> Programming Transact-SQL</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
