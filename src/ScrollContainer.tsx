import { FC, ReactNode } from "react";

interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  onScrollBottomEnd?: () => any | Promise<any>;
}

const ScrollContainer: FC<ScrollContainerProps> = ({
  children,
  className,
  height = 400,
  width = "100%",
  onScrollBottomEnd
}) => {
  const onScroll = async (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - clientHeight === scrollTop) {
      if (onScrollBottomEnd) {
        await onScrollBottomEnd();
      }
    }
  };

  return (
    <div
      onScroll={onScroll}
      className={className}
      style={{
        position: "sticky",
        overflow: "auto",
        width,
        height
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
