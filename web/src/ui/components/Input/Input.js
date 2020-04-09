import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { useFocus } from 'utils/hooks';

import { RenderIcon } from './RenderIcon';

const Input = React.forwardRef(function Input(
  { className, endIcon, RenderIcon, ...restProps },
  ref,
) {
  const [isFocused, focusHandlers] = useFocus(restProps.autoFocus);

  return (
    <div className={getStyles({ endIcon, isFocused, className })}>
      <input
        ref={ref}
        {...restProps}
        {...focusHandlers(restProps)}
        className="w-full h-full bg-transparent focus:outline-none"
      />
      {endIcon ? <RenderIcon>{endIcon}</RenderIcon> : null}
    </div>
  );
});

function getStyles({ endIcon, isFocused, className }) {
  return classNames(
    'relative inline-flex items-center rounded h-10 border pl-3',
    {
      'pr-3': !endIcon,
      'bg-white border-primary': isFocused,
      'bg-gray-200 border-transparent': !isFocused,
    },
    className,
  );
}

Input.defaultProps = {
  RenderIcon,
  type: 'input',
  autoFocus: false,
  'data-testid': 'Input',
};

Input.propTypes = {
  className: propTypes.string,
  endIcon: propTypes.element,
};

export default Input;
