import { render } from 'solid-js/web';
import './index.css';
import 'virtual:windi.css';
import App from './App';
import getRibbon from './utils/getRibbon';

getRibbon();
render(() => <App />, document.querySelector('div#root')!);
