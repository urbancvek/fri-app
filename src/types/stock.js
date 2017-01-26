// @flow
declare type ScrollViewType = {
  scrollTo: (options: { x?: number, y?: number }, animated?: boolean) => void,
};

declare type ScrollEventType = {
  nativeEvent: {
    contentOffset: {
      x: number,
      y: number,
    },
  },
};
