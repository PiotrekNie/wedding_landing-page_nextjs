import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface Image {
  id: string;
  url: string;
  fileName: string;
}

interface Gallery {
  id: string;
  images: Image[];
}

interface Section {
  galleries: Gallery[];
}

function GallerySection(props: Section): JSX.Element {
  const [gallery, setGallery]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);

  const { galleries }: Section = props;

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      const rand: number = Math.floor(Math.random() * (galleries.length - 1 - 0 + 1)) + 0;

      setGallery(rand);

      return rand;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements: Element[] = Array.from(document.querySelectorAll(".gallery__container--col"));

    const removeHideAll: (objects: HTMLCollection) => void = (objects: HTMLCollection) => {
      Array.from(objects).forEach((key: Element) => key.classList.remove("show"));
    };

    (() =>
      new Promise<HTMLCollection>(
        (resolve: (value: HTMLCollection | PromiseLike<HTMLCollection>) => void) => {
          resolve(elements[gallery].children);
        },
      )
        .then((children: HTMLCollection) => {
          removeHideAll(children);

          return children;
        })
        .then((children: HTMLCollection) => {
          const rand: number = Math.floor(Math.random() * (children.length - 1 - 0 + 1)) + 0;

          children[rand].classList.add("show");
        }))();
  });

  return (
    <section className='container max-w-fhd px-2 md:px-4 gallery show'>
      <div className='flex justify-center'>
        <div className='md:w-11/12 f-full'>
          <div className='grid grid-cols-10 gap-x-4'>
            <div className='md:col-span-4'>
              <div className='sticky top-0'>
                <h2>
                  Masz pytanie, <br />
                  zadzwoń :)
                </h2>
                <div className='text-4xl'>
                  <p>
                    Delfina{" "}
                    <a href='tel:+48508093384' className='btn'>
                      +48 508 093 384
                    </a>
                  </p>
                  <p>
                    Piotrek{" "}
                    <a href='tel:+48509235952' className='btn'>
                      +48 509 235 952
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='md:col-span-6 grid grid-flow-row-dense lg:grid-cols-3 sm:grid-cols-2 gap-5 items-end gallery__container'>
              {galleries.map((galleryItems: Gallery, index: number) => {
                const id: Gallery = galleryItems;
                const num: number = index;
                return (
                  <div key={num} className={`gallery__container--col obj-${index}`}>
                    {id.images.map((img: Image, keyIndex: number) => {
                      const item: Image = img;
                      const i: number = keyIndex;
                      return (
                        <div key={i} className={`gallery__container--img ${i === 0 ? "show" : ""}`}>
                          <img src={item.url} alt={item.fileName} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
