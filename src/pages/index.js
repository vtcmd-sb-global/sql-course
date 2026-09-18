import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import Homepage from '@site/src/components/Homepage/home';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="SQL Server course from beginner to advanced">
      <main style={{padding: '2rem', maxWidth: 800, margin: '0 auto'}}>
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.tagline}</p>
        <p>
          <Link className="button button--primary button--lg" to="/sessions/session-01">
            Start with Session 1
          </Link>
        </p>
      </main>
    </Layout>
  );
}
