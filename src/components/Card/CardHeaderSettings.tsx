import { FC, MouseEvent, useState } from 'react';
import { IconButton, Menu, MenuItem, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface MenuItemProps {
  label: string;
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
}

export interface CardHeaderActionProps {
  menuItems: MenuItemProps[];
  isLoading?: boolean;
}

const CardHeaderSettings: FC<CardHeaderActionProps> = ({
  menuItems = [],
  isLoading = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'card-header-action-menu' : undefined}
        aria-haspopup="true"
        onClick={handleOpenMenu}
        disabled={isLoading}
        color="inherit"
      >
        {isLoading ? <CircularProgress size={24} /> : <MoreVertIcon />}
      </IconButton>
      <Menu
        id="card-header-action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        {menuItems
          .filter(({ hidden }) => !hidden) // Filtruojame paslėptus elementus
          .map(({ label, disabled, onClick }, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                onClick();
                handleCloseMenu();
              }}
              disabled={disabled}
            >
              {label}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default CardHeaderSettings;
