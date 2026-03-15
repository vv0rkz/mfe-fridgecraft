import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { useInventoryStore } from './store/inventoryStore';

window.__fridgecraft = { useInventoryStore };

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
