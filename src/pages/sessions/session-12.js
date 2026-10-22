import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session12() {
  return (
    <Layout
      title="Session 12 — Triggers"
      description="Triggers in SQL Server 2022 — AFTER, INSTEAD OF, nested triggers, and best practices"
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
          <h1>Session 12 — Triggers</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Understanding and creating triggers in SQL Server.</p>

          <hr />

          <h2>Learning Objectives</h2>
          <ul>
            <li>Explain what a trigger is and when to use it</li>
            <li>Create AFTER INSERT, UPDATE, and DELETE triggers</li>
            <li>Create INSTEAD OF triggers</li>
            <li>Understand nested triggers and best practices</li>
          </ul>

          <hr />

          <h2>1. What is a Trigger?</h2>
          <p>A <strong>trigger</strong> is a special stored procedure that automatically runs when a specific event occurs on a table (INSERT, UPDATE, or DELETE).</p>

          <hr />

          <h2>2. AFTER INSERT Trigger</h2>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_Insert
ON Employees
AFTER INSERT
AS
BEGIN
    PRINT 'New employee record has been inserted.';
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>3. AFTER UPDATE Trigger</h2>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_Update
ON Employees
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'UPDATE', GETDATE()
    FROM inserted;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>4. AFTER DELETE Trigger</h2>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_Delete
ON Employees
AFTER DELETE
AS
BEGIN
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'DELETE', GETDATE()
    FROM deleted;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>5. INSTEAD OF Trigger</h2>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_InsteadOf_Insert_Employee
ON Employees
INSTEAD OF INSERT
AS
BEGIN
    -- Custom logic before inserting
    INSERT INTO Employees (Name, Department)
    SELECT Name, Department
    FROM inserted
    WHERE Name IS NOT NULL;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Nested Triggers</h2>
          <CodeBlock
          language="sql"
            code={`-- Check current setting
EXEC sp_configure 'nested triggers';

-- Enable nested triggers
EXEC sp_configure 'nested triggers', 1;
RECONFIGURE;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>7. Set-Based Logic (Best Practice)</h2>
          <CodeBlock
          language="sql"
            code={`-- Correct way (set-based)
INSERT INTO AuditTable (EmployeeID, ActionDate)
SELECT EmployeeID, GETDATE()
FROM inserted;

-- Avoid row-by-row (cursor) logic inside triggers when possible
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>8. Alter and Drop Triggers</h2>
          <CodeBlock
          language="sql"
            code={`-- Alter a trigger
ALTER TRIGGER trg_Employee_Insert
ON Employees
AFTER INSERT
AS
BEGIN
    PRINT 'Employee insert trigger fired.';
END;
GO

-- Drop a trigger
DROP TRIGGER trg_Employee_Insert;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. Practical Example</h2>
          <CodeBlock
          language="sql"
            code={`-- Supporting tables
CREATE TABLE ProjectUsers (
    UserID   INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(150) NOT NULL,
    Email    NVARCHAR(200)
);
GO

CREATE TABLE ProjectUserAudit (
    AuditID   INT PRIMARY KEY IDENTITY(1,1),
    UserID    INT,
    Action    NVARCHAR(20),
    ActionDate DATETIME DEFAULT GETDATE()
);
GO

CREATE TRIGGER trg_ProjectUsers_Audit
ON ProjectUsers
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProjectUserAudit (UserID, Action)
    SELECT UserID, 'INSERT' FROM inserted
    WHERE NOT EXISTS (SELECT 1 FROM deleted);

    INSERT INTO ProjectUserAudit (UserID, Action)
    SELECT UserID, 'UPDATE' FROM inserted
    WHERE EXISTS (SELECT 1 FROM deleted);

    INSERT INTO ProjectUserAudit (UserID, Action)
    SELECT UserID, 'DELETE' FROM deleted
    WHERE NOT EXISTS (SELECT 1 FROM inserted);
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>Session 12 Exercise</h2>
          <ol>
            <li>Create an AFTER INSERT trigger that logs new rows into an audit table.</li>
            <li>Create an AFTER DELETE trigger.</li>
            <li>Write an INSTEAD OF INSERT trigger with a simple validation rule.</li>
          </ol>

          <hr />

          <p><strong>Next up (Session 13):</strong> User-Defined Functions</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
