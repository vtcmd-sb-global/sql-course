import React from "react";
import Link from "@docusaurus/Link";

const HomePage = () => {
  return (
    <div className="home-page">
      <main>
        <h1>SQL Server – The Definitive Guide</h1>
        <p>
          Welcome to the <strong>SQL Server Course</strong>.
        </p>
        <p>
          This course takes you from fundamental database concepts to advanced
          SQL Server 2022 features, including T-SQL programming, performance
          tuning, and modern data capabilities.
        </p>

        {/* Course Levels */}
        <section>
          <h2>Course Levels</h2>

          <h3>Beginner</h3>
          <ul>
            <li>RDBMS Concepts</li>
            <li>Entity-Relationship (E-R) Model & Normalization</li>
            <li>Introduction to SQL Server 2022</li>
            <li>Transact-SQL Basics</li>
            <li>Creating and Managing Databases</li>
            <li>Creating Tables</li>
          </ul>

          <h3>Intermediate</h3>
          <ul>
            <li>Microsoft Azure SQL</li>
            <li>Accessing Data (SELECT & Clauses)</li>
            <li>Advanced Queries and Joins</li>
            <li>Views, Stored Procedures & Metadata</li>
            <li>Indexes</li>
            <li>Triggers</li>
          </ul>

          <h3>Advanced</h3>
          <ul>
            <li>Programming Transact-SQL</li>
            <li>Transactions and Error Handling</li>
            <li>PolyBase and Query Store</li>
            <li>Artificial Intelligence and Machine Learning in SQL Server 2022</li>
          </ul>
        </section>

        {/* Course Structure */}
        <section>
          <h2>Course Structure</h2>
          <p>
            The course contains <strong>16 sessions</strong>, with each session
            lasting approximately <strong>2 hours</strong>.
          </p>
          <p>
            These guides are prepared according to the official Aptech book
            <strong> “SQL Server – The Definitive Guide”</strong> so that students
            can follow both the book and practical examples easily.
          </p>
        </section>

        {/* Student Expectations */}
        <section>
          <h2>Student Expectations</h2>
          <p>Students are expected to:</p>
          <ol>
            <li>Read the lesson material carefully.</li>
            <li>Type and execute all examples themselves in SSMS.</li>
            <li>Complete the exercises and challenges.</li>
            <li>Complete the assignments.</li>
            <li>Practice outside the classroom regularly.</li>
            <li>Build the final project using SQL Server.</li>
          </ol>
        </section>

        <hr />

        {/* Sessions */}
        <section>
          <h2>Sessions</h2>
          <p>Start with:</p>
          <ul>
            <li>
              <Link to="/sessions/session-01">
                Session 01 — RDBMS Concepts
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-02">
                Session 02 — Entity-Relationship (E-R) Model and Normalization
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-03">
                Session 03 — Introduction to SQL Server 2022
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-04">
                Session 04 — Transact-SQL
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-05">
                Session 05 — Creating and Managing Databases
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-06">
                Session 06 — Creating Tables
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-07">
                Session 07 — Microsoft Azure SQL
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-08">
                Session 08 — Accessing Data
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-09">
                Session 09 — Advanced Queries and Joins
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-10">
                Session 10 — Using Views, Stored Procedures, and Querying Metadata
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-11">
                Session 11 — Indexes
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-12">
                Session 12 — Triggers
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-13">
                Session 13 — Programming Transact-SQL
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-14">
                Session 14 — Transactions and Error Handling
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-15">
                Session 15 — PolyBase and Query Store
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-16">
                Session 16 — Artificial Intelligence and Machine Learning in SQL Server 2022
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
