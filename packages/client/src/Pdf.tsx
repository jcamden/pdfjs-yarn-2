import React, { useEffect, useRef, useState } from 'react';

const pdfjs = require('pdfjs-dist');

// This is actually not working for Webpack.
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface PdfProps {
  src: string;
  pageNum: number;
  scale: number;
}

export const Pdf: React.FC<PdfProps> = ({ src, pageNum = 1, scale = 1.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [textLayerLoading, setTextLayerLoading] = useState(true);
  const [textStyle, setTextStyle] = useState({
    left: `0px`,
    top: `0px`,
    height: `0px`,
    width: `0px`,
  });

  useEffect(() => {
    const fetchPdf = async (): Promise<void> => {
      const loadingTask = pdfjs.getDocument({
        url: src,
        httpHeaders: { authorization: localStorage.token },
      });
      const pdf = await loadingTask.promise;
      const firstPageNumber = pageNum;
      const page = await pdf.getPage(firstPageNumber);

      const viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      if (canvasRef && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext);

          const textContent = await page.getTextContent();

          setTextStyle({
            left: `${canvas.offsetLeft}px`,
            top: `${canvas.offsetTop}px`,
            height: `${canvas.height}px`,
            width: `${canvas.width}px`,
          });

          pdfjs.renderTextLayer({
            textContent: textContent,
            container: textLayerRef.current,
            viewport: viewport,
            textDivs: [],
          });

          setTextLayerLoading(false);
        }
      }
    };

    fetchPdf();
  }, [src, pageNum, scale]);

  return (
    <>
      <canvas
        className="shadow"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div
        ref={textLayerRef}
        style={
          textLayerLoading
            ? {}
            : {
                ...textStyle,
                position: 'relative',
                left: '0',
                top: '0',
                right: '0',
                bottom: '0',
                overflow: 'hidden',
                opacity: '0.2',
                lineHeight: '1.0',
                color: 'transparent',
                whiteSpace: 'pre',
                cursor: 'text',
                transformOrigin: '0% 0%',
              }
        }
      ></div>
    </>
  );
};

export default Pdf;
