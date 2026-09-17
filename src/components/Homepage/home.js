import React from "react";
import Link from "@docusaurus/Link";

const HomePage = () => {
  return (
    <div className="home-page">
      <main>
        <h1>Proficient Programming with C#</h1>

        <p>
          Welcome to the <strong>C# (C-Sharp) Course</strong>.
        </p>

        <p>
          This course takes you from C# fundamentals to advanced C# and
          professional application development.
        </p>

        {/* Course Levels */}
        <section>
          <h2>Course Levels</h2>

          <h3>Beginner</h3>
          <ul>
            <li>C# Fundamentals</li>
            <li>Variables & Data Types</li>
            <li>Operators</li>
            <li>Conditions & Loops</li>
            <li>Arrays</li>
            <li>Methods</li>
          </ul>

          <h3>Intermediate</h3>
          <ul>
            <li>Classes & Objects</li>
            <li>Inheritance & Polymorphism</li>
            <li>Abstract Classes & Interfaces</li>
            <li>Properties, Indexers & Records</li>
            <li>Exception Handling</li>
            <li>Delegates, Events & Collections</li>
          </ul>

          <h3>Advanced</h3>
          <ul>
            <li>Generics & Iterators</li>
            <li>Windows Forms + SQL Server</li>
            <li>Advanced C# Features</li>
            <li>.NET MAUI (Cross-Platform Apps)</li>
            <li>Modern .NET & Future</li>
          </ul>
        </section>

        {/* Course Structure */}
        <section>
          <h2>Course Structure</h2>
          <p>
            The course contains <strong>14 sessions</strong>, with each session
            lasting approximately <strong>2 hours</strong>.
          </p>
          <p>
            These guides are prepared according to the official Aptech C# book
            so that students can follow both the book and practical examples
            easily.
          </p>
        </section>

        {/* Student Expectations */}
        <section>
          <h2>Student Expectations</h2>
          <p>Students are expected to:</p>
          <ol>
            <li>Read the lesson material.</li>
            <li>Type and execute the examples themselves.</li>
            <li>Complete the exercises.</li>
            <li>Complete the assignments.</li>
            <li>Practice outside the classroom.</li>
            <li>Build the final project.</li>
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
                Session 01 — Getting Started with C#
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-02">
                Session 02 — Basic Building Blocks in C#
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-03">
                Session 03 — Programming Constructs and Arrays
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-04">
                Session 04 — Classes and Methods in C#
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-05">
                Session 05 — Inheritance and Polymorphism
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-06">
                Session 06 — Abstract Classes and Interfaces
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-07">
                Session 07 — Properties, Indexers, and Record Types
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-08">
                Session 08 — Namespaces and Exception Handling
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-09">
                Session 09 — Events, Delegates, and Collections
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-10">
                Session 10 — Generics and Iterators
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-11">
                Session 11 — GUI and Connectivity with SQL Database
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-12">
                Session 12 — Advanced Concepts in C#
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-13">
                Session 13 — Building Cross-Platform Mobile Apps Using .NET MAUI
              </Link>
            </li>
            <li>
              <Link to="/sessions/session-14">
                Session 14 — .NET Development and the Future
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;




// import React from "react";
// import Link from "@docusaurus/Link";

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       {/* Header / Nav can be handled by your layout */}
//       <main>
//         <h1>Proficient Programming with C#</h1>

//         <p>
//           Welcome to the <strong>C# (C-Sharp) Course</strong>.
//         </p>

//         <p>
//           This course takes you from C# fundamentals to advanced C# and
//           professional application development.
//         </p>

//         {/* Course Levels */}
//         <section>
//           <h2>Course Levels</h2>

//           <h3>Beginner</h3>
//           <ul>
//             <li>C# Fundamentals</li>
//             <li>Variables</li>
//             <li>Data Types</li>
//             <li>Operators</li>
//             <li>Conditions</li>
//             <li>Loops</li>
//             <li>Methods</li>
//             <li>Arrays</li>
//             <li>Collections</li>
//           </ul>

//           <h3>Intermediate</h3>
//           <ul>
//             <li>Classes</li>
//             <li>Objects</li>
//             <li>Constructors</li>
//             <li>Properties</li>
//             <li>Encapsulation</li>
//             <li>Inheritance</li>
//             <li>Polymorphism</li>
//             <li>Interfaces</li>
//           </ul>

//           <h3>Advanced</h3>
//           <ul>
//             <li>Generics</li>
//             <li>Delegates</li>
//             <li>Lambda Expressions</li>
//             <li>LINQ</li>
//             <li>Exception Handling</li>
//             <li>JSON</li>
//             <li>Async/Await</li>
//             <li>SQL Server</li>
//             <li>ASP.NET Core Web API</li>
//             <li>Dependency Injection</li>
//             <li>SOLID Principles</li>
//           </ul>
//         </section>

//         <hr />

//         {/* Sessions */}
//         <section>
//           <h2>Sessions</h2>
//           <p>Start with:</p>
//           <ul>
//             <li>
//               <Link to="/sessions/session-01">
//                 Session 01 — C# Fundamentals
//               </Link>
//             </li>

//             <li>
//               <Link to="/sessions/session-02">
//                 Session 02 — Variables &amp; Data Types
//               </Link>
//             </li>

//             <li>
//               <Link to="/sessions/session-03">
//                 Session 03 — Conditions
//               </Link>
//             </li>

//             <li>
//               <Link to="/sessions/session-04">
//                 Session 04 — Loops &amp; Iterations
//               </Link>
//             </li>

//             <li>
//               <Link to="/sessions/session-05">
//                 Session 05 — Methods, Parameters &amp; Recursion
//               </Link>
//             </li>
//           <li>
//               <Link to="/sessions/session-06">
//                 Session 06 — Array & Strings
//               </Link>
//             </li>
//           <li>
//               <Link to="/sessions/session-07">
//                 Session 07 — Advanced Parameters, Tuples & Exception Handling
//               </Link>
//           </li>
//           <li>
//               <Link to="/sessions/session-08">
//                 Session 08 — Classes, Objects, Fields, Properties, Constructors & Encapsulation
//               </Link>
//           </li>
//           <li>
//               <Link to="/sessions/session-09">
//                 Session 09 — Inheritance, Method Overriding & protected
//               </Link>
//           </li>
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default HomePage;
