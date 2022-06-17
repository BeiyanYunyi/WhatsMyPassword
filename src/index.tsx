import { render } from 'solid-js/web';
import 'virtual:windi.css';
import App from './App';
import './index.css';

render(() => <App />, document.querySelector('div#root')!);
