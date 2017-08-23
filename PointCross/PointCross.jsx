import React, { Component, PropTypes } from 'react';
import { on, off } from './events';
import { findScrollableAncestor } from './FindScrollableAncestor';

/**
 * Point Cross originally authored by Rajendra kumar Vankadari
*/

class PointCross extends Component {
    static propTypes = {
        inPoint: PropTypes.func,
        beforePoint: PropTypes.func,
        afterPoint: PropTypes.func,
        children: PropTypes.node,
        bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        topOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        findYourAncestor: PropTypes.bool,
    }

    static defaultProps = {
        inPoint: () => {},
        beforePoint: () => {},
        afterPoint: () => {},
        children: '',
        bottomOffset: 0,
        topOffset: 0,
        findYourAncestor: false,
    }

    constructor(props) {
        super(props);
        this.ticking = false;

        if (typeof window !== 'undefined') {
            this.node = window;
        }

        /* istanbul ignore if */
        if (props.findYourAncestor) {
            this.node = findScrollableAncestor(this.rootNode);
        }
    }

    componentDidMount() {
        this.scrollEventCB(true);
        on(this.node, 'scroll', this.scrollEventCB);
        on(this.node, 'resize', this.scrollEventCB);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.adios) { //eslint-disable-line
            off(this.node, 'scroll', this.scrollEventCB);
            off(this.node, 'resize', this.scrollEventCB);
        }
    }

    componentWillUnmount() {
        off(this.node, 'scroll', this.scrollEventCB);
        off(this.node, 'resize', this.scrollEventCB);
    }

    ref = (node) => { this.rootNode = node; };

    scrollEventCB = (isInitial) => {
        const bottomOffset = parseInt(this.props.bottomOffset, 0);
        const topOffset = parseInt(this.props.topOffset, 0);
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                if (this.rootNode) {
                    if (parseInt(this.rootNode.getBoundingClientRect().top, 0) > topOffset) {
                        this.props.beforePoint(isInitial);
                    }

                    if (parseInt(this.rootNode.getBoundingClientRect().top, 0) <= topOffset &&
                        (parseInt(this.rootNode.getBoundingClientRect().bottom, 0)) > bottomOffset) {
                        this.props.inPoint(isInitial);
                    }

                    if ((parseInt(this.rootNode.getBoundingClientRect().bottom, 0)) < bottomOffset) {
                        this.props.afterPoint(isInitial);
                    }
                }
                this.ticking = false;
            });
        }
        this.ticking = true;
    }

    render() {
        return (<div ref={this.ref}>
            {this.props.children}
        </div>);
    }
}

export default PointCross;
