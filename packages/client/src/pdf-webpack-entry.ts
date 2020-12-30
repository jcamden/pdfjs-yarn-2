import { getDocument } from 'pdfjs-dist/webpack';

export const pdfWebpackEntry = async (src: string) => {
  // pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.worker.js';

  // var defined through a Django template tag
  const loadingTask = getDocument(src);

  const loadedPdf = await loadingTask.promise.then((pdf) => {
    return pdf;
  });

  console.log(loadedPdf);
};
