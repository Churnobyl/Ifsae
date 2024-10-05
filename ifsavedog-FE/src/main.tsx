import { queryClient } from '@/queries/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from '@/routers/Router';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/** 쿠키 제공 */}
    <CookiesProvider>
      {/** 탄스택 쿼리 제공 */}
      <QueryClientProvider client={queryClient}>
        {/** 라우팅 제공 */}
        <Router />
        {/** 탄스택 쿼리 데브 툴 제공 */}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>,
);
