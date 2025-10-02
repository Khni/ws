export type Step<C extends React.ComponentType<any>> = {
  id: string;
  name: string;
  component: C;
  customProps?: React.ComponentProps<C>;
};

// helper that infers component + props correctly
export function defineSteps<T extends Step<React.ComponentType<any>>[]>(
  steps: [...T]
) {
  return steps;
}
