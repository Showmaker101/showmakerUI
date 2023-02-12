import React from 'react';
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

// 交叉类型 将原生的Button的属性和Showmaker组件库定义的Button的属性 交叉在一起
// React自带的HTML原生标签的一些属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
    // 根据不同的 props 生成不同的Button
    const {
        btnType,
        //用户自定义的className
        className,
        disabled,
        size,
        children,
        href,
        // 剩下的Props
        ...restProps
    } = props

    // btn, btn-lg, btn-primary
    // ES6的计算属性
    const classess = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })

    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classess}
               href={href}
               {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return <button
            className={classess}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    }
}

Button.defaultProps = {
    btnType: ButtonType.Default,
    disabled: false
}

export default Button;