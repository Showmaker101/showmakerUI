import React, {createContext, HTMLAttributes, InputHTMLAttributes, useState} from 'react';
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps{
    //默认是哪个Item高亮
    defaultIndex?: string;
    //设置CSS类
    className?: string;
    //vertical和horizontal两种展示模式
    mode?: MenuMode;
    children: React.ReactNode;
    
    style?: React.CSSProperties;

    //设置被选中时的回调
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode
    defaultOpenSubMenus?: string[]

}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode, style, children, defaultIndex, defaultOpenSubMenus, onSelect} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('showmaker-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== "vertical"
    })

    // 用于放置在context容器中传递给MenuItem的东西
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    // 用于确定Menu中的子节点都是MenuItem
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return child
            } else {
                console.error("warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;