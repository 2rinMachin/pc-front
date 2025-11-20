'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const PageContent = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <div className="grow">{children}</div>
  </QueryClientProvider>
);

export default PageContent;
