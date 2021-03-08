import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export type ButtonSize = "lg" | "sm"
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string,
    /**设置 Button 的禁用 */
    disabled?: boolean,
    /**设置 Button 的尺寸 */
    size?: ButtonSize,
    /**设置 Button 的类型 */
    btnType?: ButtonType,
    children?: ReactNode,
    href?: string,
}
// 获取按钮上的属性，并合并
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 获取链接上的属性，并合并
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// 合并所有属性，并导出
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 这是我们的第一个 Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        disabled,
        size,
        className,
        btnType,
        children,
        href,
        ...resProps
    } = props
    // btn,btn-lg,btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    })
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...resProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...resProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;