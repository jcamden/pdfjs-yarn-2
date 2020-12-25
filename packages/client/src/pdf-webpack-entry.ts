import pdfjsLib from 'pdfjs-dist/webpack';

export const pdfWebpackEntry = async (src: string) => {
  // pdfjsLib.GlobalWorkerOptions.workerSrc = 'index.worker.js';

  // var defined through a Django template tag
  const loadingTask = pdfjsLib.getDocument(src);

  const loadedPdf = await loadingTask.promise.then((pdf) => {
    return pdf;
  });

  console.log(loadedPdf);
};
