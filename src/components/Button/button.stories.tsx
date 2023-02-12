import React from 'react';
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Button, {ButtonSize, ButtonType} from './button'

const defaultButton = () => {
    return <Button onClick={action('clicked')}>default button</Button>
}

const buttonWithSize = () => {
    return <>
        <Button size={ButtonSize.Large}>large button</Button>
        <Button size={ButtonSize.Small}>small button</Button>
    </>
}

const buttonWithType = () => {
    return <>
        <Button btnType={ButtonType.Primary}>primary button</Button>
        <Button btnType={ButtonType.Danger}>primary button</Button>
        <Button btnType={ButtonType.Default}>primary button</Button>
        <Button btnType={ButtonType.Link} href={'#'}>primary button</Button>
    </>
}


storiesOf('Button Component', module)
    .add('默认Button按钮', defaultButton)
    .add('不同尺寸的Button按钮', buttonWithSize)
    .add('不同类型的Button按钮', buttonWithType)

