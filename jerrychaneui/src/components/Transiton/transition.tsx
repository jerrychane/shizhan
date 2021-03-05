import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

type TransitonProps = CSSTransitionProps & {
    animation?: AnimationName,
    wrapper?: boolean,
}

const Transition: React.FC<TransitonProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        ...restProps
    } = props
    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}
export default Transition;