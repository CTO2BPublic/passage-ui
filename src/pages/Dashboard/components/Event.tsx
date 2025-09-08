import { useFetchEvent } from 'src/hooks/services/useFetchEvent.tsx';
import { Skeleton, Stack, Typography } from '@mui/material';
import Modal from 'src/components/Modal.tsx';
import React from 'react';

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const Event: React.FC<Props> = ({ id, open, onClose }) => {
  const { data, isLoading } = useFetchEvent(id);

  if (isLoading) {
    return <Skeleton variant="text" width="100%" />;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Event Details"
      copyText={data ? JSON.stringify(data, null, 2) : undefined}
    >
      <Stack gap={1}>
        <Typography variant="body2" color="textSecondary">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Typography>
      </Stack>
    </Modal>
  );
};

export default Event;
