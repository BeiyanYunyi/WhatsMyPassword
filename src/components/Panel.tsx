import { ParentComponent } from 'solid-js';

const Panel: ParentComponent<{ center?: boolean; prose?: boolean }> = (prop) => (
  <div
    classList={{
      'backdrop-blur-8': true,
      'backdrop-filter': true,
      'backdrop-saturate-75': true,
      'hover:backdrop-blur-16': true,
      'hover:backdrop-saturate-50': true,
      'p-4': true,
      'rounded-lg': true,
      shadow: true,
      'shadow-gray-300': true,
      'text-center': prop.center,
      transition: true,
      'md:prose': prop.prose,
      'prose-sm': prop.prose,
    }}
  >
    {prop.children}
  </div>
);

export default Panel;
