import React, {ReactNode, useContext} from 'react';
import classNames from 'classnames'
import {MenuContext} from './menu'


export interface MenuItemProps {
    index: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children} = props
    const context = useContext(MenuContext)
    const classess = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        if(context.onSelect && !disabled){
            context.onSelect(index)
        }
    }
    return (
        <li className={classess} style={style} onClick={handleClick}
        >
            {children}
        </li>
    );
};
MenuItem.displayName = 'MenuItem'

export default MenuItem;