import './styles/fonts';
import './styles/katex-css';
import './index.css';
import './lib/debug';
import type { RuntimeAPIs } from './lib/api/types';
declare global {
    interface Window {
        __OPENCHAMBER_RUNTIME_APIS__?: RuntimeAPIs;
    }
}
