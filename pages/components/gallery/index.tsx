import React, { useState, useEffect } from "react";

interface Gallery {
  id: string;
  images: {
    id: string;
    url: string;
    fileName: string;
  }[];
}

interface Section {
  galleries: Gallery[];
}

function GallerySection(props: Section) {
  const [gallery, setGallery] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const rand: number = Math.floor(Math.random() * (props.galleries.length - 1 - 0 + 1)) + 0;

      setGallery(rand);

      return rand;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.gallery__container--col'));

    const removeHideAll = (objects: HTMLCollection) => {
      Array.from(objects).forEach((key) => key.classList.remove('show'));
    };

    (() =>
      new Promise<HTMLCollection>((resolve) => {
        resolve(elements[gallery].children);
      })
        .then((children) => {
          removeHideAll(children);

          return children;
        })
        .then((children) => {
          const rand: number = Math.floor(Math.random() * (children.length - 1 - 0 + 1)) + 0;

          children[rand].classList.add('show');
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
                    Delfina{' '}
                    <a href='tel:+48508093384' className='btn'>
                      +48 508 093 384
                    </a>
                  </p>
                  <p>
                    Piotrek{' '}
                    <a href='tel:+48509235952' className='btn'>
                      +48 509 235 952
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='md:col-span-6 grid grid-flow-row-dense lg:grid-cols-3 sm:grid-cols-2 gap-5 items-end gallery__container'>
              {props.galleries.map((gallery: Gallery, index) => (
                <div key={index} className={`gallery__container--col obj-${index}`}>
                  {gallery.images.map((img, index: number) => (
                    <div
                      key={index}
                      className={`gallery__container--img ${index === 0 ? 'show' : ''}`}>
                      <img src={img.url} alt={img.fileName} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
