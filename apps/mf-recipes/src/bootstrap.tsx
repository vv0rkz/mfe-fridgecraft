import ReactDOM from 'react-dom/client';
// Токены берём из shell — временно, пока не перенесём в ui-kit (v2.5)
// В проде каждый remote будет импортировать их из @fridgecraft/ui-kit
import '../../shell/src/styles/tokens.css';
import './styles/standalone.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
