import { alpha } from '@mui/material/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Stack,
  useTheme,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessRequestCard from 'src/pages/AccessRequests/components/AccessRequestCard.tsx';
import { AccessRequest } from 'src/types';
import { FC } from 'react';

type Props = {
  data?: AccessRequest[];
};

const PendingAccessRequests: FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <div style={{ marginBottom: 24 }}>
      <Accordion
        sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.3) }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack flexDirection="row" gap={1} alignItems="center">
            <Typography component="span">Requests pending approval</Typography>
            <Box>
              <Chip
                label={data ? data.length : 0}
                color="primary"
                size="small"
              />
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <AccessRequestCard
                  data={item}
                  key={`${item.roleRef?.name}-${index}`}
                  isLoading={false}
                />
              ))
            ) : (
              <Typography>No pending requests found</Typography>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PendingAccessRequests;
