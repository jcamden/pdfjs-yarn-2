const pdfjs = require('pdfjs-dist');

// This is actually not working for Webpack.
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const pdfSetWorkerManually = async (src: string) => {
  // pdfjsLib.GlobalWorkerOptions.workerSrc = 'index.worker.js';

  // var defined through a Django template tag
  const loadingTask = pdfjs.getDocument(src);

  const loadedPdf = await loadingTask.promise.then((pdf: any) => {
    return pdf;
  });

  console.log(loadedPdf);
};
