import { Alert } from './Alert';
import { useAlert } from '@/contexts/AlertContext';

export const AlertContainer = () => {
  const { message, status, isVisible } = useAlert();

  return <Alert isOpen={isVisible} message={message || ''} variant={status} />;
};
