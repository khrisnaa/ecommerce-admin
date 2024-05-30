import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { FaCopy, FaServer } from 'react-icons/fa';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);

    toast({
      variant: 'default',
      description: 'API Route coppied to the clipboard!',
    });
  };
  return (
    <Alert>
      <FaServer className="h-4 w-4" />
      <AlertTitle className="flex items-center  gap-x-2">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-x-2">
        <code className="relative rounded bg-muted px-2 py-1  font-mono text-sm font-semibold">
          {description}
        </code>
        <Button onClick={onCopy} variant="outline" size="icon">
          <FaCopy className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
