import React from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import HomePage from './HomePage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "0";
  const activeTab = parseInt(currentTab);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <HomePage />;
      case 1:
        return <TasksPage />;
      case 2:
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
      <Box sx={{ pt: 2 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default DashboardPage;
