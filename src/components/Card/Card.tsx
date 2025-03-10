import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CardHeaderSettings from 'src/components/Card/CardHeaderSettings.tsx';

type Props = {
  id: string;
  header: {
    title: ReactNode;
    tags: ReactNode;
  };
  subheader?: ReactNode;
  menuItems?: {
    label: string;
    onClick: () => void;
    hidden?: boolean;
    disabled?: boolean;
  }[];
  content: ReactNode;
  expandable?: boolean;
  isMenuLoading?: boolean;
};

const Card: FC<Props> = ({
  id,
  header,
  subheader,
  menuItems = [],
  content,
  expandable = false,
  isMenuLoading = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MuiCard sx={{ width: '100%' }} id={id}>
      <CardHeader
        action={
          expandable && (
            <Button
              size="large"
              sx={{ marginLeft: 'auto' }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-controls={`${id}-collapse`}
              id={`${id}-expand-button`}
              color="inherit"
              variant="text"
              endIcon={
                expanded ? (
                  <KeyboardArrowUpIcon color="primary" />
                ) : (
                  <KeyboardArrowDownIcon color="primary" />
                )
              }
            >
              {expanded ? 'Show less' : 'Show more'}
            </Button>
          )
        }
        title={
          <Stack
            flexWrap="wrap"
            flexDirection={['column', 'row']}
            alignItems={'center'}
            gap={1}
            pb={1}
            id={`${id}-header`}
          >
            <Stack gap={1} flexDirection="row" alignItems={'center'}>
              {menuItems.length > 0 && (
                <Box>
                  <CardHeaderSettings
                    menuItems={menuItems}
                    isLoading={isMenuLoading}
                  />
                </Box>
              )}
              {header.title && (
                <Typography variant="h5">{header.title}</Typography>
              )}
            </Stack>
            {header.tags && (
              <Stack gap={1} flexDirection="row">
                {header.tags}
              </Stack>
            )}
          </Stack>
        }
        subheader={<Box ml={2}>{subheader}</Box>}
      />

      {expandable ? (
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          id={`${id}-collapse`}
        >
          <CardContent>
            <Stack flexDirection="column" gap={4}>
              {content}
            </Stack>
          </CardContent>
        </Collapse>
      ) : (
        <CardContent>{content}</CardContent>
      )}
    </MuiCard>
  );
};

export default Card;
