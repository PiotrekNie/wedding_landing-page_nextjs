import React, { useState } from "react";
import Image from "next/image";

interface Image {
  photos: {
    id: string;
    url: string;
    fileName: string;
    height: number;
    width: number;
  };
}

export interface GalleryItems {
  weddingGalleries: Image[];
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlurImage({
  image,
  imageUrl,
}: {
  image: Image;
  imageUrl: (url: string) => void;
}) {
  const [isLoading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(true);

  return (
    <button
      className='group relative h-[450px] overflow-hidden before:content-dp before:absolute before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none before:-z-3'
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        imageUrl(image.photos.url);

        window.dataLayer?.push({
          event: "OpenImage",
          imageName: image.photos.fileName,
        });
      }}>
      <span className='w-full flex absolute h-[450px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Image
          src={image.photos.url}
          width={600}
          height={500}
          id={image.photos.id}
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out h-[450px] w-full object-cover",
            isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100",
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </span>
    </button>
  );
}
