type ResponsiveSpans = {
  base?: 1 | 2 | 3 | 4;
  sm?: 1 | 2 | 3 | 4;
  md?: 1 | 2 | 3 | 4;
  lg?: 1 | 2 | 3 | 4;
  xl?: 1 | 2 | 3 | 4;
};

export type DynamicGridItem<Content> = {
  key: string | number;
  content: Content;
  color: string;
  spans: ResponsiveSpans;
};

export default function DynamicGrid<
  Content,
  I extends DynamicGridItem<Content>,
>({
  items,
  contentMapper,
}: {
  items: I[];
  contentMapper: (content: Content) => React.ReactNode;
}) {
  const spanClassMap = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
  };

  const responsivePrefix = {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
  };

  const buildSpanClasses = (spans: ResponsiveSpans) =>
    Object.entries(spans)
      .map(
        ([bp, val]) =>
          `${responsivePrefix[bp as keyof ResponsiveSpans]}${spanClassMap[val!]}`
      )
      .join(" ");

  console.log(items);
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          className={`${item.color} ${buildSpanClasses(
            item.spans
          )} p-4 rounded text-center`}
        >
          {contentMapper(item.content)}
        </div>
      ))}
    </div>
  );
}
