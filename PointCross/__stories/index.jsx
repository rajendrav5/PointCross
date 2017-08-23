import React from 'react';
import PointCross from '../PointCross';

const stories = [
    {
        name: 'PointCross',
        story: () => (
            <div>
                <div>
                    <div>Point Cross is a Wrapper component to execute a
                        callback when the page is scrolled basing on
                        position of the wrapped children when they are, </div>
                    <ul>
                        <li>1. Before Point</li>
                        <li>2. In Point</li>
                        <li>3. After Point</li>
                    </ul>
                    <div>PointCross intuitively decides when the scroll
                        happens on window or even in a scrollable container.
                        And it also accepts additional offset,
                        ex: I want the callback to be executed when the component is Xpx before from viewport.</div>
                </div>
                <div>Usage:
                    <div>&lt;PointCross topOffset=&quot;45&quot;
                        beforePoint=&#123;this.beforePointOne&#125;
                        afterPoint=&#123;this.afterPoint&#125; inPoint=&#123;this.inPoint&#125; &gt;</div>
                    <div>This is a child component, mentioned callbacks executes basign on the
                        scroll point of this component in the scrollable area.</div>
                    &lt;/PointCross&gt;
                </div>
                <PointCross />
            </div>
        ),
    },
];

export default stories;
