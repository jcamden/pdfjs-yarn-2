import React from 'react';

import Pdf from './Pdf';
import { pdfSetWorkerManually } from './pdf-set-worker-manually';
import { pdfWebpackEntry } from './pdf-webpack-entry';

pdfSetWorkerManually('./dummy.pdf');
// pdfWebpackEntry('./dummy.pdf');

export const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <ul>
        <li>
          Pdfjs worker fails to be setup manually: 'Warning: Setting up fake
          worker.'
        </li>
        <li>
          This still works (see pdfjs object in console log), but without the
          benefit of a worker.
        </li>
        <li>
          Uncomment pdfWebpackEntry (above) to automatically setup a worker, and
          the build will fail: 'Error: Can't resolve 'worker-loader'...'{' '}
        </li>
      </ul>
      {/* To test via rendered pdf, uncomment the Pdf component: */}
      {/* <Pdf src="./dummy.pdf" pageNum={1} scale={1} /> */}
    </div>
  );
};
