import type { RuntimeAPIs } from '@/lib/api/types';
type AppProps = {
    apis: RuntimeAPIs;
};
export default function CompatibleApp(props: AppProps): import("react/jsx-runtime").JSX.Element;
export {};
