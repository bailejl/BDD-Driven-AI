import React from 'react';

const SvgrMock = React.forwardRef((props, ref) => React.createElement('svg', { ...props, ref }));

export { SvgrMock as ReactComponent };
export default SvgrMock;