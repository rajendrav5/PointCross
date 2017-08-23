import sinon from 'sinon';
import { expect } from 'chai';
import { on, off } from './events';

describe('<Event Testcases />', () => {
    const addEventListener = (e, callback) => {
        callback.call();
    };
    const removeEventListener = () => {};
    let attachEvent = (e, call) => {
        call({});
    };
    const detachEvent = () => {};
    const callback = {
        call: sinon.spy(),
    };

    it('on - event with addEventListener', () => {
        on({ addEventListener }, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(true);
    });

    it('on - event without data', () => {
        on(undefined, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(true);
    });

    it('on - event with attachEvent', () => {
        on({ attachEvent }, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('on - event with attachEvent - immediate callback', () => {
        attachEvent = (e, callbck) => {
            callbck();
        };
        on({ attachEvent }, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('on - event with no listener', () => {
        attachEvent = (e, callbck) => {
            callbck();
        };
        on({}, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('off - event with removeEventListener', () => {
        off({ removeEventListener }, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('off - event without data', () => {
        off(undefined, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('off - event with detachEvent', () => {
        off({ detachEvent }, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });

    it('off - event with no listener', () => {
        off({}, 'Scroll', callback);
        expect(callback.call.calledOnce).to.equal(false);
    });
});
