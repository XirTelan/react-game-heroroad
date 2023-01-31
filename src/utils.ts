export function isInViewRange(
  i: number,
  j: number,
  heroX: number,
  heroY: number
) {
  return Math.abs(i - heroX) <= 1 && Math.abs(j - heroY) <= 1;
}

export function getScrollPos(
  x: number,
  y: number,
  fieldWindow: React.RefObject<HTMLDivElement>
) {
  if (!fieldWindow.current) return;
  const scrollHeight = fieldWindow.current?.scrollHeight;
  const scrollHeightClient = fieldWindow.current?.clientHeight;
  const scrollWidth = fieldWindow.current?.scrollWidth;
  const scrollWidthClient = fieldWindow.current?.clientWidth;

  const rowSize = scrollHeight / 20;
  const columnSize = scrollWidth / 20;
  const scrollYVal = rowSize * x;
  const scrollY =
    scrollYVal <= scrollHeightClient / 2
      ? 0
      : (scrollHeight - scrollHeightClient) / 2 >= scrollHeight - scrollYVal
      ? scrollHeight
      : scrollYVal / 2;

  const scrollXVal = columnSize * y;
  const scrollX =
    scrollXVal <= scrollWidthClient / 2
      ? 0
      : (scrollWidth - scrollWidthClient) / 2 >= scrollWidth - scrollXVal
      ? scrollWidth
      : scrollXVal / 2;

  fieldWindow.current.scrollTo({
    top: scrollY,
    left: scrollX,
    behavior: 'smooth',
  });
}

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
