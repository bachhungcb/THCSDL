import React from 'react';
import { Tabs } from 'antd';
import MainLayout from '../templates/MainLayout';
import InsertForm from './InsertForm';
import DeleteAnimeForm from './DeleteInformation'; // Corrected import path

const { TabPane } = Tabs;

function DashBoard() {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
      <Tabs defaultActiveKey="insert" className="dashboard-tabs">
        <TabPane tab="Insert Form" key="insert">
          <InsertForm />
        </TabPane>
        <TabPane tab="Delete Anime Form" key="delete">
          <DeleteAnimeForm />
        </TabPane>
      </Tabs>
    </MainLayout>
  );
}

export default DashBoard;
