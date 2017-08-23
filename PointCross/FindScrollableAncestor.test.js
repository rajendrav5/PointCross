import FindScrollableAncestor from './FindScrollableAncestor';

describe('<FindScrollableAncestor Testcases />', () => {
    const windowBackUp = global.window;

    it('FindScrollableAncestor calls', () => {
        global.window = undefined;
        FindScrollableAncestor({ parentNode: {} });
    });

    it('FindScrollableAncestor calls', () => {
        global.window = windowBackUp;
        global.window.getComputedStyle = () => ({ getPropertyValue: () => 'hidden' });
        FindScrollableAncestor({ parentNode: {} });
    });

    it('FindScrollableAncestor calls', () => {
        global.window.getComputedStyle = () => ({ getPropertyValue: () => 'scroll' });
        FindScrollableAncestor({ parentNode: {} });
    });
});
