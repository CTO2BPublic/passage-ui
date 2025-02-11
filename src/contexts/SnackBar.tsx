import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React, {
  createContext,
  FC,
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';

type SnackbarContextState = {
  snackbarText: string;
  snackbarType?: AlertColor;
  isSnackbarVisible: boolean;
  showSuccessSnackbar: (text?: string) => void;
  showErrorSnackbar: (data?: { title?: string; error?: string }) => void;
  hideSnackBar: () => void;
};

type ProviderProps = {
  children: ReactElement;
};

const defaultValues: SnackbarContextState = {
  snackbarText: '',
  snackbarType: undefined,
  isSnackbarVisible: false,
  showSuccessSnackbar: () => {},
  showErrorSnackbar: () => {},
  hideSnackBar: () => {},
};

export const SnackbarContext =
  createContext<SnackbarContextState>(defaultValues);

export const SnackbarProvider: FC<ProviderProps> = (props) => {
  const [snackbarText, setSnackbarText] = useState<string>('');
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);

  const showSuccessSnackbar = (text?: string) => {
    setSnackbarText(text || 'Success');
    setSnackbarType('success');
    setIsSnackbarVisible(true);
  };

  const showErrorSnackbar = (data?: { title?: string; error?: string }) => {
    const { title, error } = data || {};
    setSnackbarText(
      title || error
        ? `${title}${title && error ? `: ${error}` : error}`
        : 'Something went wrong, please try again later',
    );
    setSnackbarType('error');
    setIsSnackbarVisible(true);
  };

  const hideSnackBar = () => {
    setIsSnackbarVisible(false);
  };

  useEffect(() => {
    if (!isSnackbarVisible) {
      setTimeout(() => {
        if (snackbarText) setSnackbarText('');
        if (snackbarType) setSnackbarType(undefined);
      }, 1000);
    }
  }, [isSnackbarVisible, snackbarText, snackbarType]);

  return (
    <SnackbarContext.Provider
      value={{
        snackbarText,
        snackbarType,
        isSnackbarVisible,
        showSuccessSnackbar,
        showErrorSnackbar,
        hideSnackBar,
      }}
    >
      <Snackbar />
      {props.children}
    </SnackbarContext.Provider>
  );
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

const Snackbar = () => {
  const { snackbarText, snackbarType, isSnackbarVisible, hideSnackBar } =
    useContext(SnackbarContext);

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    hideSnackBar();
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSnackbarVisible}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarType}
        sx={{ width: '100%' }}
      >
        {snackbarText}
      </Alert>
    </MuiSnackbar>
  );
};
