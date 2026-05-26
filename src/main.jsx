import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PanacheBenefitPage from './panache-benefit-page.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PanacheBenefitPage />
  </StrictMode>,
);
