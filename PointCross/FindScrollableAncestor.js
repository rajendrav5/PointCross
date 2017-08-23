export default function findScrollableAncestor (rootNode) {
    let node = rootNode;
    if (typeof window !== 'undefined') {
        while (node.parentNode) {
            node = node.parentNode;

            /* istanbul ignore if */
            if (node === document.body) {
                return window;
            }

            const overflow = window.getComputedStyle(node).getPropertyValue('overflow');
            if (overflow === 'scroll') {
                return node;
            }
        }
        return window;
    }
    return null;
}
