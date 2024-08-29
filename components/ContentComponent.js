'use client';
import React from 'react';
import parse from 'html-react-parser';

import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

const ContentComponent = ({ content }) => {
  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === 'figure' && attribs.class?.includes('wp-block-gallery')) {
        // Extract image details from the gallery block
        const images = children
          .filter((child) => child.name === 'figure' && child.children[0].name === 'img')
          .map((imgFigure) => {
            const imgElement = imgFigure.children[0];
            return {
              src: imgElement.attribs.src,
              alt: imgElement.attribs.alt || '',
              width: imgElement.attribs.width ? parseInt(imgElement.attribs.width) : 600, // Default width
              height: imgElement.attribs.height ? parseInt(imgElement.attribs.height) : 400, // Default height
            };
          });

        return (
          <div className='my-3'>
            <ColumnsPhotoAlbum photos={images}  columns={2}/>
          </div>
        );
      }
    },
  };

  return <div>{parse(content, options)}</div>;
};

export default ContentComponent;
