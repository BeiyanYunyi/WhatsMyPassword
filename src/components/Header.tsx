import { Component } from 'solid-js';

interface Props {
  title: string;
}

const Header: Component<Props> = (props) => {
  return (
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{props.title}</h1>
      </div>
    </header>
  );
};

export default Header;
