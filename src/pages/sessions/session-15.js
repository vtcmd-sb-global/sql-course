import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import CodeBlock from '@site/src/components/CodeBlock';

export default function Session15() {
  return (
    <Layout
      title="Session 15"
      description="Session 15"
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
          <h1>Session 15</h1>
          <p>Content converted to CodeBlock.</p>
          <CodeBlock
          language="sql"
            code={`SELECT 1;`}
          caption="Interactive preview: switch between themes to see the same C# snippet restyled."/>
          <p>Machine Learning in SQL Server 2022</p>
        </article>
      </CustomLayout>
    </Layout>
  );
}
