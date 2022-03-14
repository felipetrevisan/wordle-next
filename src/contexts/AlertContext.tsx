import { createContext, useCallback, useContext, useState } from 'react';

type AlertStatus = 'success' | 'error' | undefined;

type ShowOptions = {
  persist?: boolean;
  delay?: number;
  duration?: number;
  onClose?: () => void;
};

type AlertContextValue = {
  status: AlertStatus;
  message: string | null;
  isVisible: boolean;
  showSuccess: (message: string, options?: ShowOptions) => void;
  showError: (message: string, options?: ShowOptions) => void;
};

export const AlertContext = createContext<AlertContextValue | null>({
  status: 'success',
  message: null,
  isVisible: false,
  showSuccess: () => null,
  showError: () => null,
});

AlertContext.displayName = 'AlertContext';

export const useAlert = () => useContext(AlertContext) as AlertContextValue;

export const AlertProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<AlertStatus>('success');
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(
    (showStatus: AlertStatus, newMessage: string, options?: ShowOptions) => {
      const { delay = 0, persist, onClose, duration = 2000 } = options || {};

      setTimeout(() => {
        setStatus(showStatus);
        setMessage(newMessage);
        setIsVisible(true);

        if (!persist) {
          setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
              onClose();
            }
          }, duration);
        }
      }, delay);
    },
    [setStatus, setMessage, setIsVisible]
  );

  const showError = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      show('error', newMessage, options);
    },
    [show]
  );

  const showSuccess = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      show('success', newMessage, options);
    },
    [show]
  );

  return (
    <AlertContext.Provider
      value={{
        status,
        message,
        isVisible,
        showError,
        showSuccess,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
