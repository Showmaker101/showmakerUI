import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Input from "./components/Input/input"
import Upload from './components/Upload/upload'
import React from "react";

function App() {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files
        console.log(files, '测试一下')
    }
    return (
        <>
            <Upload action={'http://localhost:3000'}></Upload>
            <input type="file" onChange={handleFileChange}/>
            <Input disabled={true} placeholder={'disabled'}></Input>
            <Input prepand={'http://'} placeholder={'prepand'}></Input>
            <Input append={'.com'} placeholder={'append'}></Input>


            <Menu defaultIndex={'0'} defaultOpenSubMenus={['2']} mode={"horizontal"}>
                <MenuItem index={'1'}>cool link</MenuItem>
                <SubMenu index={'2'} title={'dropdown'}>
                    <MenuItem index={'2-0'}>cool dropdown 0</MenuItem>
                    <MenuItem index={'2-1'}>cool dropdown 1</MenuItem>
                    <MenuItem index={'2-2'}>cool dropdown 2</MenuItem>
                </SubMenu>
                <MenuItem index={'3'}>cool link3</MenuItem>
            </Menu>

            <header className="App-header">
                <Button>Hello</Button>
                <Button btnType={ButtonType.Default} disabled size={ButtonSize.Large}>Disabled Button</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Button</Button>
                <Button btnType={ButtonType.Danger}>Danger Button</Button>
                <Button btnType={ButtonType.Link} href="http://www.baidu.com">Baidu link</Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </>
    );
}

export default App;
