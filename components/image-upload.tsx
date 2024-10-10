'use client';

import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import { ImagePlusIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  //handle hydration problem
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(value);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                onClick={() => onRemove(url)}
                variant="destructive"
                type="button"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} alt="Image" fill className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="i8vifzrk">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              onClick={onClick}
              type="button"
              variant="secondary"
              disabled={disabled}
            >
              <ImagePlusIcon className="h-4 w-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
