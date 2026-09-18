import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';

export default function Session16() {
  return (
    <Layout
      title="Session 16 — Artificial Intelligence and Machine Learning in SQL Server 2022"
      description="Intelligent Query Processing, Parameter Sensitive Plan Optimization, and Machine Learning Services in SQL Server 2022"
    >
      <CustomLayout>
        <article className="session-content">
          <h1>Session 16 — Artificial Intelligence and Machine Learning in SQL Server 2022</h1>

          <p><strong>Duration:</strong> 2 hours</p>
          <p><strong>Focus:</strong> Exploring Intelligent Query Processing features and Machine Learning capabilities in SQL Server 2022.</p>
          <p><strong>Based on:</strong> Official Aptech Book – Session 16</p>

          <hr />

          <h2>Learning Objectives</h2>
          <p>By the end of this session, you should be able to:</p>
          <ul>
            <li>Describe Intelligent Query Processing (IQP)</li>
            <li>Describe Parameter Sensitive Plan (PSP) optimization</li>
            <li>Explain the features of Machine Learning Services</li>
            <li>List the steps for installation of Machine Learning Services</li>
            <li>Explain the steps to run Python scripts in SQL Server</li>
            <li>Explain the steps to predict future data using linear regression with SQL Server Machine Learning Services</li>
          </ul>

          <hr />

          <h2>1. Introduction</h2>
          <p>SQL Server 2022 includes powerful features that bring Artificial Intelligence and Machine Learning closer to your data. Two major areas covered in this session are:</p>
          <ul>
            <li><strong>Intelligent Query Processing (IQP)</strong> – Improves query performance automatically</li>
            <li><strong>Machine Learning Services</strong> – Allows you to run Python and R scripts directly inside SQL Server</li>
          </ul>

          <hr />

          <h2>2. Intelligent Query Processing (IQP)</h2>
          <p><strong>Intelligent Query Processing</strong> is a family of features that improve the performance of existing workloads with minimal or no code changes.</p>

          <p>IQP features were introduced in earlier versions and have been enhanced in SQL Server 2022.</p>

          <h3>Key IQP Features</h3>
          <ul>
            <li>Batch Mode on Rowstore</li>
            <li>Memory Grant Feedback</li>
            <li>Degree of Parallelism (DOP) Feedback</li>
            <li>Cardinality Estimation Feedback</li>
            <li>Approximate Query Processing (APPROX_COUNT_DISTINCT, APPROX_PERCENTILE)</li>
            <li>Table Variable Deferred Compilation</li>
            <li>Parameter Sensitive Plan (PSP) Optimization (new in SQL Server 2022)</li>
          </ul>

          <pre>
            <code>{`-- Enable IQP features by setting database compatibility level
ALTER DATABASE [YourDatabase]
SET COMPATIBILITY_LEVEL = 160;   -- 160 = SQL Server 2022`}</code>
          </pre>

          <hr />

          <h2>3. Parameter Sensitive Plan (PSP) Optimization</h2>
          <p>One of the important new features in SQL Server 2022 is <strong>Parameter Sensitive Plan Optimization</strong>.</p>

          <p>Previously, SQL Server cached only one execution plan for a parameterized query. This caused problems when different parameter values needed different plans (classic parameter sniffing issue).</p>

          <p>With PSP Optimization, SQL Server can cache multiple plans for the same query based on parameter values.</p>

          <p><strong>Benefits:</strong></p>
          <ul>
            <li>Reduces parameter sniffing problems</li>
            <li>Improves performance for queries with uneven data distribution</li>
            <li>Works automatically when compatibility level is 160</li>
          </ul>

          <hr />

          <h2>4. Machine Learning Services in SQL Server</h2>
          <p><strong>SQL Server Machine Learning Services</strong> allows you to run Python and R scripts directly inside the SQL Server engine using the <code>sp_execute_external_script</code> stored procedure.</p>

          <h3>Key Features</h3>
          <ul>
            <li>Execute Python and R code from T-SQL</li>
            <li>Use data stored in SQL Server without moving it</li>
            <li>Train and deploy machine learning models</li>
            <li>Score (predict) data using trained models</li>
            <li>Supports popular packages (pandas, scikit-learn, numpy, etc.)</li>
          </ul>

          <hr />

          <h2>5. Installing Machine Learning Services</h2>
          <p>High-level steps:</p>
          <ol>
            <li>Run SQL Server Installation Center</li>
            <li>Select “New SQL Server stand-alone installation”</li>
            <li>On the Feature Selection page, check:
              <ul>
                <li>Python</li>
                <li>R</li>
                <li>Machine Learning Services and Language Extensions</li>
              </ul>
            </li>
            <li>Complete the installation</li>
            <li>Enable external scripts:
              <pre>
                <code>{`EXEC sp_configure 'external scripts enabled', 1;
RECONFIGURE WITH OVERRIDE;`}</code>
              </pre>
            </li>
          </ol>

          <hr />

          <h2>6. Running Python Scripts in SQL Server</h2>
          <pre>
            <code>{`EXECUTE sp_execute_external_script
    @language = N'Python',
    @script = N'
import sys
print("Python version:", sys.version)
print("Hello from SQL Server Machine Learning Services!")
';`}</code>
          </pre>

          <h3>Using Data from SQL Server in Python</h3>
          <pre>
            <code>{`EXECUTE sp_execute_external_script
    @language = N'Python',
    @script = N'
import pandas as pd
OutputDataSet = InputDataSet
print(InputDataSet.head())
',
    @input_data_1 = N'SELECT TOP 10 * FROM Employees'
WITH RESULT SETS ((
    EmployeeID INT,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Salary DECIMAL(10,2)
));`}</code>
          </pre>

          <hr />

          <h2>7. Predicting Data with Linear Regression</h2>
          <p>You can train a simple linear regression model and use it for predictions entirely inside SQL Server.</p>

          <pre>
            <code>{`-- Example: Simple linear regression using Python
EXECUTE sp_execute_external_script
    @language = N'Python',
    @script = N'
from sklearn.linear_model import LinearRegression
import pandas as pd

# InputDataSet contains the training data
df = InputDataSet
X = df[["YearsExperience"]]
y = df["Salary"]

model = LinearRegression()
model.fit(X, y)

# Predict for new values
new_data = pd.DataFrame({"YearsExperience": [5, 8, 12]})
predictions = model.predict(new_data)

print(predictions)
',
    @input_data_1 = N'SELECT YearsExperience, Salary FROM EmployeeSalaryData'
;`}</code>
          </pre>

          <hr />

          <h2>8. Benefits of Using Machine Learning Inside SQL Server</h2>
          <ul>
            <li>Data does not need to leave the database server (better security)</li>
            <li>Reduced data movement and ETL overhead</li>
            <li>Leverage existing T-SQL skills together with Python/R</li>
            <li>Easier operationalization of models</li>
            <li>Can be combined with SQL Server Agent for scheduling</li>
          </ul>

          <hr />

          <h2>Session 16 Exercise</h2>
          <ol>
            <li>What is Intelligent Query Processing (IQP)?</li>
            <li>Set the compatibility level of your database to 160 and explain why it is important.</li>
            <li>What problem does Parameter Sensitive Plan (PSP) Optimization solve?</li>
            <li>Enable external scripts on your SQL Server instance.</li>
            <li>Run a simple Python script using <code>sp_execute_external_script</code> that prints “Hello from SQL Server”.</li>
          </ol>

          <hr />

          <h2>Session 16 Challenge</h2>
          <p>Complete the following advanced tasks:</p>
          <ol>
            <li>Write a Python script that receives data from a SQL table, calculates the average salary, and returns the result.</li>
            <li>Create a simple linear regression example (even with sample data) that predicts salary based on years of experience.</li>
            <li>Research and list three other IQP features available in SQL Server 2022.</li>
            <li>Explain how Machine Learning Services can help in a real business scenario (e.g., sales forecasting or customer churn).</li>
          </ol>

          <hr />

          <h2>Session 16 Quiz</h2>
          <ol>
            <li>What does IQP stand for?</li>
            <li>Which compatibility level enables SQL Server 2022 features?</li>
            <li>What is Parameter Sensitive Plan Optimization?</li>
            <li>Which stored procedure is used to run external scripts?</li>
            <li>Which languages are supported by SQL Server Machine Learning Services?</li>
            <li>What command is used to enable external scripts?</li>
            <li>What is the main advantage of running machine learning inside SQL Server?</li>
            <li>Name any two Intelligent Query Processing features.</li>
            <li>Can you use popular Python libraries like pandas and scikit-learn inside SQL Server?</li>
            <li>What is the purpose of the @input_data_1 parameter in sp_execute_external_script?</li>
          </ol>

          <hr />

          <h2>Course Completion</h2>
          <p>Congratulations! You have completed all 16 sessions of the <strong>SQL Server – The Definitive Guide</strong> course.</p>

          <p>You have learned:</p>
          <ul>
            <li>Core database concepts and data modeling</li>
            <li>SQL Server architecture and tools</li>
            <li>T-SQL programming (queries, joins, views, procedures, triggers, functions)</li>
            <li>Performance features (Indexes, Query Store, Intelligent Query Processing)</li>
            <li>Cloud capabilities (Azure SQL)</li>
            <li>Advanced topics (PolyBase and Machine Learning)</li>
          </ul>

          <p><strong>Recommended Next Steps:</strong></p>
          <ul>
            <li>Build a complete real-world project using SQL Server</li>
            <li>Practice with AdventureWorks2022 regularly</li>
            <li>Explore Microsoft certifications (e.g., DP-900, DP-300)</li>
            <li>Learn integration with .NET / C# applications</li>
          </ul>

          <p>Well done and best of luck for your database career!</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
