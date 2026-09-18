import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import Homepage from '@site/src/components/Homepage/home';

export default function Home() {
  return (
    <Layout
      title="SQL Server The Definitive Guide For Bginners"
      description="SQL Server course from beginner to advanced">
        {/* <Homepage /> */}

      <CustomLayout>
        <Homepage />
      </CustomLayout>
    </Layout>
  );
}
