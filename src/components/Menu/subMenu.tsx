import React, {useContext, useState} from 'react';
import classNames from "classnames";
import {MenuContext} from "./menu";
import {MenuItemProps} from "./menuItem";

export interface SubMenuProps {
    index: string;
    title: string;
    //用户自定义的className
    className?: string;
    children: React.ReactNode;

}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as string[]
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpened)

    const classess = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })


    //当menu的mode是vertical竖直的时候 通过点击来打开和关闭子菜单
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
        console.log(menuOpen)
    }

    //当menu的mode是horizontal水平的时候 通过鼠标hover来打开和关闭子菜单
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 50)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent)=>{handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent)=>{handleMouse(e, false)}
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('showmaker-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem!")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classess} {...hoverEvents}>
            <div className={'submenu-title'} {...clickEvents} >
                {title}
            </div>
            {renderChildren()}
        </li>
    );
};
SubMenu.displayName = 'SubMenu'

export default SubMenu;