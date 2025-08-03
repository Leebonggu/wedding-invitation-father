import { createPortal } from 'react-dom';

// 라이트박스 포탈 렌더러
export function LightboxPortal({ children }: { children: React.ReactNode }) {
    if (typeof window === "undefined") return null;
    const el = document.getElementById('lightbox-root') || (() => {
        const node = document.createElement('div');
        node.id = 'lightbox-root';
        document.body.appendChild(node);
        return node;
    })();
    return createPortal(children, el);
}