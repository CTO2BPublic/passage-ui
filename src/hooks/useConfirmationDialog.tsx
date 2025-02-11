import { useState } from 'react';
import useVisibility from 'src/hooks/useVisibility';

export interface UseConfirmationDialogProps {
  onConfirm: () => void | Promise<void>;
  onClose?: () => void;
}

export const useConfirmationDialog = ({
  onConfirm,
  onClose,
}: UseConfirmationDialogProps) => {
  const { isVisible, show, hide } = useVisibility();
  const [isLoading, setIsLoading] = useState(false);

  const openDialog = () => show();
  const closeDialog = () => {
    hide();
    if (onClose) onClose();
  };

  const confirmAction = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      closeDialog();
    }
  };

  return {
    isOpen: isVisible,
    isLoading,
    openDialog,
    closeDialog,
    confirmAction,
  };
};

export default useConfirmationDialog;
