import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

type CardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

const DashboardCard: React.FC<CardProps> = ({ title, count, icon }) => {
  return (
    <Card sx={{ p: 2, flex: '1 1 calc(25% - 16px)', minWidth: 220 }}>
      <Stack gap={2} flexDirection="row" alignItems="center">
        <Box
          sx={{
            p: 3,
            borderRadius: '10px',
          }}
        >
          {icon}
        </Box>
        <Stack gap={1}>
          <Typography variant="caption">{title}</Typography>
          <Typography variant="h2" component="span" color="primary">
            {count}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DashboardCard;
