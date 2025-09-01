import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface SuccessAlertProps {
    title?: string;
    message: string;
    onClose: () => void;
}

export function SuccessAlert({ title = 'Success', message, onClose }: SuccessAlertProps) {
    return (
        <div className="fixed top-5 right-5 z-50 max-w-sm animate-in fade-in-0 slide-in-from-top-5">
            <Alert
                variant="default"
                className="border-green-400 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-200"
            >
                <AlertCircle className="h-4 w-4 !text-green-700 dark:!text-green-200" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
                <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-2 right-2">
                    X
                </Button>
            </Alert>
        </div>
    );
}
