import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import PointCross from './PointCross';

describe('<Point Cross Data Testcases />', () => {
    let wrapper;
    const beforePointSpy = sinon.spy();
    const afterPointSpy = sinon.spy();
    global.window.requestAnimationFrame = sinon.spy();

    beforeEach(() => {
        global.window.getComputedStyle = () => ({
            getPropertyValue: () => 'scroll',
        });
        global.window.requestAnimationFrame = (callback) => {
            callback();
        };
        wrapper = mount(
            <PointCross beforePoint={beforePointSpy} afterPoint={afterPointSpy} containerHeight="80" />,
        );
    });

    it('Connected Smart Components, with connect', () => {
        expect(wrapper).to.exist;
    });

    it('PointCross on scrollEvents with top', () => {
        const spy = sinon.stub(global.HTMLElement.prototype, 'getBoundingClientRect', () => ({
            bottom: 10, height: 0, left: 0, right: 0, top: 5, width: 0,
        }));
        wrapper = mount(
            <PointCross containerHeight={-1} />,
        );
        expect(wrapper).to.exist;
        wrapper.instance().scrollEventCB(true);
        spy.restore();
    });

    it('PointCross on scrollEvents with top', () => {
        const spy = sinon.stub(global.HTMLElement.prototype, 'getBoundingClientRect', () => ({
            bottom: 10, height: 0, left: 0, right: 0, top: 0, width: 0,
        }));
        wrapper = mount(
            <PointCross containerHeight={-1} />,
        );
        wrapper.instance().scrollEventCB(true);
        spy.restore();
    });

    it('PointCross on scrollEvents without top', () => {
        const spy = sinon.stub(global.HTMLElement.prototype, 'getBoundingClientRect', () => ({
            bottom: 0, height: 0, left: 0, right: 0, top: -46, width: 0,
        }));
        wrapper = mount(
            <PointCross containerHeight={-1} bottomOffset={2}/>,
        );
        expect(wrapper).to.exist;
        wrapper.instance().scrollEventCB(true);
        spy.restore();
    });

    it('PointCross without DOM node', () => {
        wrapper = shallow(
            <PointCross containerHeight={-1} />,
        );
        wrapper.instance().scrollEventCB(true);
    });

    it('PointCross without DOM node', () => {
        const backUp = global.window;
        global.window = undefined;
        wrapper = shallow(
            <PointCross containerHeight={-1} />,
        );
        global.window = backUp;
    });

    it('PointCross show float filter', () => {
        wrapper.setState({ rise: true });
        wrapper.instance().rootNode = {
            getBoundingClientRect: () => ({ top: 10 }),
        };
        wrapper.instance().scrollEventCB(true);
    });

    it('PointCross show float filter', () => {
        wrapper.instance().componentWillReceiveProps({ adios: true });
        wrapper.instance().componentWillReceiveProps({ adios: false });
        wrapper.instance().componentWillUnmount();
        expect(wrapper).to.exist;
    });
});
