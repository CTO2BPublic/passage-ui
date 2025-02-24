import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

const CardSection = ({
  title,
  text,
  content,
  noDataText,
}: {
  title: string;
  text?: string;
  content?: ReactNode;
  noDataText?: string;
}) => (
  <div>
    <Typography variant="h6">{title}</Typography>
    <Divider />
    <Box mt={2}>
      {text || content ? (
        <>
          {text && <Typography variant="body2">{text}</Typography>}
          {content && content}
        </>
      ) : (
        <Typography variant="body2">{noDataText}</Typography>
      )}
    </Box>
  </div>
);

export default CardSection;
