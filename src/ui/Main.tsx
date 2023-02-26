import * as React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import {SessionContext,sessionIO} from '../system/Session';
import MyList from './List';
import SamplePage from './SamplePage';

export default function Main(){
    const {virtualUrl} = React.useContext(SessionContext);
/*
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<MyList />} />
                    <Route path="/sample" element={<SamplePage />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
*/
// ↑ ページ遷移時にURLを変える場合はRouterを使用するが今回は使用しないでSPA実装 ↓
    return (
        <React.Fragment>
            {(virtualUrl === "/") && <MyList />}
            {(virtualUrl === "/sample") && <SamplePage />}
        </React.Fragment>
    );
    //※ SPAの利点はページ遷移が高速かつスムーズなこと。React等 ( VueやAnjularも同様 ) を利用する最大の利点
}



