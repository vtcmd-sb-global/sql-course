import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session12() {
  return (
    <Layout
      title="Session 12 — Triggers"
      description="Triggers in SQL Server 2022 — DML Triggers, Nested Triggers, INSTEAD OF Triggers, and Performance Considerations"
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
          <p><strong>Focus:</strong> Understanding and working with Triggers in SQL Server.</p>
          <p><strong>Based on:</strong> Official Book – Session 12</p>

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

          <p>
            Triggers let the database itself react to data changes. When a row
            is inserted, updated, or deleted, a trigger can log the change,
            enforce a rule that is hard to express with a constraint, or keep
            related tables in sync. Used carefully they are powerful; used
            carelessly they can make systems hard to understand and slow.
          </p>

          <hr />

          <h2>1. What is a Trigger?</h2>
          <p>A <strong>Trigger</strong> is a special type of stored procedure that automatically executes when an event occurs in the database server.</p>

          <p>Triggers are tightly bound to a table or view and are executed automatically — they cannot be called directly.</p>

          <p>
            Unlike a normal stored procedure that you run with EXEC, a trigger
            fires as part of the statement that caused the event. The original
            INSERT, UPDATE, or DELETE and the trigger body run in the same
            transaction. If the trigger raises an error and rolls back, the
            original data change is also undone.
          </p>

          <h3>Common Use Cases</h3>
          <ul>
            <li>Enforcing complex business rules</li>
            <li>Auditing changes (who changed what and when)</li>
            <li>Maintaining summary tables</li>
            <li>Preventing invalid transactions</li>
            <li>Logging historical data</li>
          </ul>

          <p>
            Auditing is the most frequent real-world use. A trigger can write
            the old and new values, the user name, and the time into an audit
            table every time a critical table changes. That gives you a history
            without requiring every application to remember to log the change.
          </p>

          <hr />

          <h2>2. Types of Triggers</h2>

          <h3>DML Triggers</h3>
          <p>Fired in response to data modification events:</p>
          <ul>
            <li><code>INSERT</code></li>
            <li><code>UPDATE</code></li>
            <li><code>DELETE</code></li>
          </ul>

          <p>
            DML triggers can be defined as AFTER (also called FOR) or as
            INSTEAD OF. AFTER triggers run after the data change has been
            applied (but still inside the same transaction). INSTEAD OF
            triggers replace the original statement entirely.
          </p>

          <h3>DDL Triggers</h3>
          <p>Fired in response to Data Definition Language events (CREATE, ALTER, DROP, etc.) — mainly used for database-level auditing.</p>

          <p>
            DDL triggers are useful for preventing accidental drops of tables
            or for logging schema changes in regulated environments. They are
            outside the scope of the hands-on examples in this session.
          </p>

          <h3>LOGON Triggers</h3>
          <p>Fired when a user session is established with SQL Server.</p>

          <p>
            LOGON triggers can restrict logins by time of day, application
            name, or other session properties. They are advanced and rarely
            needed in application development courses.
          </p>

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

          <p>
            Understanding which table holds what is essential:
          </p>
          <ul>
            <li><strong>INSERT</strong> — only <code>inserted</code> has rows; <code>deleted</code> is empty.</li>
            <li><strong>DELETE</strong> — only <code>deleted</code> has rows; <code>inserted</code> is empty.</li>
            <li><strong>UPDATE</strong> — both tables have rows. <code>deleted</code> holds the values before the update; <code>inserted</code> holds the values after the update. You join them on the primary key to pair old and new versions of each row.</li>
          </ul>

          <p>
            The structure of <code>inserted</code> and <code>deleted</code>
            matches the base table (same columns and types). You can SELECT
            from them, join them, and use them in set-based INSERT statements
            into audit tables.
          </p>

          <hr />

          <h2>4. Creating DML Triggers</h2>

          <h3>INSERT Trigger Example</h3>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_Insert
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            The trigger is named <code>trg_Employee_Insert</code>, is bound to
            the Employees table, and fires AFTER INSERT. Inside the body it
            reads every row from <code>inserted</code> and writes a matching
            audit row. Using <code>SELECT ... FROM inserted</code> ensures that
            a multi-row INSERT still produces one audit row per inserted
            employee.
          </p>

          <p>
            <code>SET NOCOUNT ON</code> is often added at the start of triggers
            to suppress the “n rows affected” messages that can confuse some
            client applications.
          </p>

          <h3>UPDATE Trigger Example</h3>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_Update
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            For UPDATE both magic tables are populated. Joining
            <code>inserted</code> to <code>deleted</code> on the primary key
            pairs each row’s new values with its old values so you can log
            OldSalary and NewSalary side by side. If only some columns changed,
            you can further filter with the UPDATE() function (see below).
          </p>

          <h3>UPDATE() Function</h3>
          <p>
            Inside an UPDATE trigger you can test whether a specific column
            was mentioned in the SET clause:
          </p>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_SalaryChange
ON Employees
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Only log when Salary was part of the UPDATE statement
    IF UPDATE(Salary)
    BEGIN
        INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate, OldSalary, NewSalary)
        SELECT
            i.EmployeeID,
            'SALARY_CHANGE',
            GETDATE(),
            d.Salary,
            i.Salary
        FROM inserted i
        INNER JOIN deleted d ON i.EmployeeID = d.EmployeeID
        WHERE ISNULL(i.Salary, -1) <> ISNULL(d.Salary, -1);  -- value actually changed
    END
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>UPDATE(column)</code> returns true if the column appeared in the
            SET list, even if the new value equals the old value. Combining it
            with a comparison of inserted vs deleted values gives you precise
            “value actually changed” logic.
          </p>

          <h3>DELETE Trigger Example</h3>
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

          <p>
            For DELETE you read from <code>deleted</code>. A common pattern is
            to archive the full row into a history table before (or as) the
            row disappears from the main table.
          </p>

          <h3>Combined DML Trigger (optional pattern)</h3>
          <p>
            You can put INSERT, UPDATE, and DELETE logic in one trigger:
          </p>
          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_Employee_AuditAll
ON Employees
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Inserts
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'INSERT', GETDATE()
    FROM inserted
    WHERE NOT EXISTS (SELECT 1 FROM deleted);

    -- Deletes
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate)
    SELECT EmployeeID, 'DELETE', GETDATE()
    FROM deleted
    WHERE NOT EXISTS (SELECT 1 FROM inserted);

    -- Updates
    INSERT INTO EmployeeAudit (EmployeeID, Action, ActionDate, OldSalary, NewSalary)
    SELECT i.EmployeeID, 'UPDATE', GETDATE(), d.Salary, i.Salary
    FROM inserted i
    INNER JOIN deleted d ON i.EmployeeID = d.EmployeeID;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Detecting the operation type by testing which of inserted/deleted
            is empty is a common technique when you want a single trigger body.
          </p>

          <hr />

          <h2>5. INSTEAD OF Triggers</h2>
          <p>An <strong>INSTEAD OF</strong> trigger executes <em>instead of</em> the original triggering action.</p>

          <p>These are commonly used on views to make them updatable.</p>

          <p>
            With an AFTER trigger the data change has already happened when
            the trigger runs. With INSTEAD OF the original statement is
            skipped; your trigger code decides what actually gets written.
            That makes INSTEAD OF ideal for:
          </p>
          <ul>
            <li>Enforcing rules that reject some of the incoming rows while accepting others</li>
            <li>Redirecting inserts on a view into one or more base tables</li>
            <li>Implementing soft deletes (mark a row inactive instead of deleting it)</li>
          </ul>

          <CodeBlock
          language="sql"
            code={`CREATE TRIGGER trg_InsteadOf_Insert_Employee
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
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            In the example above, any inserted row with Salary {'<='} 0 is
            silently ignored. Rows with a positive salary are written to
            Employees by the trigger itself.
          </p>

          <h3>INSTEAD OF on a View (common pattern)</h3>
          <CodeBlock
          language="sql"
            code={`-- Assume a view that joins Employees and Departments
CREATE VIEW vw_EmployeeDept
AS
SELECT e.EmployeeID, e.FirstName, e.LastName, e.Salary, d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;
GO

-- Make the view accept inserts by writing to the base table
CREATE TRIGGER trg_vw_EmployeeDept_Insert
ON vw_EmployeeDept
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO Employees (FirstName, LastName, Salary, DepartmentID)
    SELECT i.FirstName, i.LastName, i.Salary, d.DepartmentID
    FROM inserted i
    INNER JOIN Departments d ON d.DepartmentName = i.DepartmentName;
END;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>6. Nested Triggers</h2>
          <p>A trigger can cause another trigger to fire. This is called <strong>nesting</strong>.</p>

          <ul>
            <li>SQL Server allows nested triggers up to <strong>32 levels</strong>.</li>
            <li>Nesting can be enabled or disabled using the server configuration option <code>nested triggers</code>.</li>
          </ul>

          <p>
            Example: an AFTER INSERT trigger on Orders inserts a row into
            OrderLog. If OrderLog also has an AFTER INSERT trigger, that second
            trigger fires as well. Each level counts toward the 32-level limit.
            Recursive triggers (a trigger on a table that updates the same
            table) are controlled by a separate setting,
            <code>recursive triggers</code>, which is off by default.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Check current setting
EXEC sp_configure 'nested triggers';

-- Enable nested triggers
EXEC sp_configure 'nested triggers', 1;
RECONFIGURE;

-- Recursive triggers (same table) — usually left OFF
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'recursive triggers', 0;
RECONFIGURE;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            Deep nesting makes debugging difficult and can surprise developers
            who did not realize their INSERT would fire a chain of triggers.
            Prefer shallow designs and document any intentional nesting.
          </p>

          <hr />

          <h2>7. Handling Multiple Rows</h2>
          <p>Triggers must be written to handle multi-row operations correctly. Never assume only one row is affected.</p>

          <p>
            A single INSERT statement can add hundreds of rows. A trigger that
            assigns <code>SELECT @id = EmployeeID FROM inserted</code> will
            capture only one arbitrary id and ignore the rest. Always write
            set-based logic that processes the entire contents of
            <code>inserted</code> / <code>deleted</code>.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Correct way (set-based)
INSERT INTO AuditTable (EmployeeID, ActionDate)
SELECT EmployeeID, GETDATE()
FROM inserted;

-- Wrong way (will fail or work incorrectly with multiple rows)
-- DECLARE @EmpID INT
-- SELECT @EmpID = EmployeeID FROM inserted`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            If you truly need row-by-row logic (rare), use a cursor or a
            WHILE loop over the magic tables — but measure the cost carefully.
            Set-based code is almost always faster and clearer.
          </p>

          <hr />

          <h2>8. Altering and Dropping Triggers</h2>

          <CodeBlock
          language="sql"
            code={`-- Alter a trigger
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
ENABLE TRIGGER trg_Employee_Insert ON Employees;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            <code>DISABLE TRIGGER</code> is useful during bulk loads or data
            fixes when you do not want audit or business-rule triggers to fire
            for every row. Always re-enable afterward. You can also disable
            all triggers on a table with
            <code>DISABLE TRIGGER ALL ON table_name</code>.
          </p>

          <p>
            To list triggers on a table:
          </p>
          <CodeBlock
          language="sql"
            code={`SELECT name, is_disabled, create_date, modify_date
FROM sys.triggers
WHERE parent_id = OBJECT_ID('Employees');
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <hr />

          <h2>9. Performance Implications of Triggers</h2>
          <ul>
            <li>Triggers add overhead to DML operations (INSERT/UPDATE/DELETE become slower).</li>
            <li>Poorly written triggers (especially with cursors or row-by-row logic) can severely hurt performance.</li>
            <li>Triggers can cause unexpected cascading effects when nested.</li>
            <li>Debugging issues caused by triggers can be harder because they execute automatically.</li>
            <li>Prefer constraints, application logic, or stored procedures when possible. Use triggers only when necessary.</li>
          </ul>

          <p>
            Because the trigger runs inside the same transaction as the
            original statement, any expensive work it does (extra writes,
            network calls, complex joins) directly increases the duration of
            every INSERT/UPDATE/DELETE on that table. Keep trigger logic small
            and set-based. For heavy processing, consider writing minimal data
            to a queue table and handling the rest asynchronously.
          </p>

          <p>
            Constraints (PRIMARY KEY, UNIQUE, CHECK, FOREIGN KEY) are usually
            faster and clearer than triggers for the rules they can express.
            Use triggers for rules that constraints cannot handle, such as
            cross-table audits or soft-delete redirection.
          </p>

          <hr />

          <h2>Practical Example – CollegeDB</h2>

          <p>
            The following script builds a small audit trail for the Students
            table. It adds a UserID column, creates an audit table, and
            installs an AFTER INSERT trigger that records every new student.
          </p>

          <CodeBlock
          language="sql"
            code={`-- Supporting tables
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

SELECT TOP 1 * FROM StudentAudit ORDER BY AuditID DESC;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

          <p>
            After the INSERT, the trigger writes one row into StudentAudit.
            Querying the audit table confirms the action type, the student id,
            and the user who performed the insert (if supplied).
          </p>

          <h3>Extend the example — UPDATE and DELETE triggers</h3>
          <CodeBlock
          language="sql"
            code={`-- UPDATE trigger for Students
CREATE TRIGGER trg_Student_Update
ON Students
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO StudentAudit (StudentID, ActionType, UserID)
    SELECT i.StudentID, 'UPDATE', i.UserID
    FROM inserted i;
END;
GO

-- DELETE trigger for Students
CREATE TRIGGER trg_Student_Delete
ON Students
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO StudentAudit (StudentID, ActionType, UserID)
    SELECT d.StudentID, 'DELETE', d.UserID
    FROM deleted d;
END;
GO

-- Quick tests
UPDATE Students SET City = 'Karachi' WHERE Name = 'Ahsan Khan';
DELETE FROM Students WHERE Name = 'Ahsan Khan';

SELECT * FROM StudentAudit ORDER BY AuditID;
GO`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>

  <hr />

          <h2>Session 12 Exercise</h2>

          <p>
            Build the audit table first, then create each trigger and test it
            with at least one multi-row statement so you verify set-based
            behavior.
          </p>

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

          <p>
            Aim for a design you could reuse in a real project: clear action
            codes, old and new values where relevant, and queries that answer
            “what happened to this employee?”
          </p>

          <ol>
            <li>Create an <code>EmployeeAudit</code> table with suitable columns (AuditID, EmployeeID, Action, OldValues, NewValues, ActionDate, etc.).</li>
            <li>Write triggers for INSERT, UPDATE, and DELETE that populate the audit table.</li>
            <li>Handle multi-row operations correctly.</li>
            <li>Write a query to view the audit history for a specific employee.</li>
            <li>(Optional) Create an INSTEAD OF trigger on a view.</li>
          </ol>

          <hr />

          <h2>Session 12 Quiz</h2>

          <p>
            Review the magic tables, AFTER vs INSTEAD OF, multi-row handling,
            and when not to use triggers before answering.
          </p>

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
