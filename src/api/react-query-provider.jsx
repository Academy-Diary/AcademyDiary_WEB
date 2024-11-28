import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProviders({ children }) {
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.log('Error occured at useQuery:', error);
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true, // 윈도우가 다시 포커스되었을때
          refetchOnMount: true, // 새로운 컴포넌트 마운트가 발생한 경우
          refetchOnReconnect: true, // 네트워크 재연결이 발생한 경우
          staleTime: 0, // 데이터가 fresh -> stale 되는 시간
          gcTime: 0, // 캐시된 데이터가 얼마나 오랫동안 메모리에 유지될 것인지
          retry: 0, // API 요청 실패시 재시도 하는 횟수
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
