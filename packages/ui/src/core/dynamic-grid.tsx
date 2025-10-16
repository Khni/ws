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
  // helper to map spans to valid Tailwind classes
  const buildSpanClasses = (spans: ResponsiveSpans) => {
    const map: Record<string, string> = {
      base: "",
      sm: "sm:",
      md: "md:",
      lg: "lg:",
      xl: "xl:",
    };

    return Object.entries(spans)
      .map(([bp, val]) => `${map[bp]}col-span-${val}`)
      .join(" ");
  };

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
