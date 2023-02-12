import React, {InputHTMLAttributes, ReactElement} from 'react';
import classNames from 'classnames'


type InputSize = 'lg' | 'sm'

// 忽略掉InputHTMLAttributes里面本身具备的size属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    prepand?: string | ReactElement;
    append?: string | ReactElement;
}

const Input: React.FC<InputProps> = (props) => {
    // 取出所有props属性
    const {disabled, size, prepand, append, style, ...restProps} = props
    // 根据属性计算不同的className
    const cnames = classNames('showmaker-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || append,

        // 把append和prepend从字符串转换为布尔值
        'input-group-append': !!append,
        'input-group-prepend': !!prepand
    })

    return (
        // 根据属性判断是否要添加特定的节点
        <div className={cnames} style={style}>
            {prepand && <div className={'showmaker-input-group-prepend'}>{prepand}</div>}
            <input className={'showmaker-input-inner'} disabled={disabled} {...restProps} />
            {append && <div className={'showmaker-input-group-append'}>{append}</div>}
        </div>
    )
};

export default Input;