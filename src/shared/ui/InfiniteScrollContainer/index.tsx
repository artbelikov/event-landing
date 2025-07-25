import React, { useEffect, useRef } from 'react';
import { Center, Loader, ScrollArea, Stack } from '@mantine/core';
import type { ScrollAreaProps } from '@mantine/core';

interface InfiniteScrollContainerProps<T> extends Omit<ScrollAreaProps, 'children'> {
  data: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyStateComponent?: React.ReactNode;
  containerProps?: React.ComponentProps<typeof Stack>;
}

export function InfiniteScrollContainer<T>({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  renderItem,
  loadingComponent,
  emptyStateComponent,
  containerProps,
  ...scrollAreaProps
}: InfiniteScrollContainerProps<T>) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <ScrollArea {...scrollAreaProps}>
        <Center py="xl">{loadingComponent || <Loader size="md" />}</Center>
      </ScrollArea>
    );
  }

  if (!data.length) {
    return (
      <ScrollArea {...scrollAreaProps}>
        <Center py="xl">{emptyStateComponent || <div>No items found</div>}</Center>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea {...scrollAreaProps}>
      <Stack gap="sm" {...containerProps}>
        {data.map((item, index) => renderItem(item, index))}

        {hasNextPage && (
          <div ref={loaderRef}>
            <Center py="md">
              {isFetchingNextPage && (loadingComponent || <Loader size="sm" />)}
            </Center>
          </div>
        )}
      </Stack>
    </ScrollArea>
  );
}
