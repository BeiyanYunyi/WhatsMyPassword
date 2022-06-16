import { ParentComponent } from 'solid-js';

const Panel: ParentComponent = (prop) => (
  <div class="rounded-lg border-2 border-dashed backdrop-filter backdrop-saturate-50 backdrop-blur-8 border-gray-200 p-4 text-center hover:border-solid">
    {prop.children}
  </div>
);

export default Panel;
