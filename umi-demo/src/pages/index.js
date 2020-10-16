import React from 'react';
import { connect, useIntl, getLocale, setLocale } from 'umi';
import { Button } from 'antd';
const Home = (props) => {
    const { title } = props;
    console.log('renderd', title);
    const changeLangs = () => {
        const lang = getLocale();
        console.log('changeLangs', lang);
        const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
        //     // 刷新页面
        // setLocale('zh-TW', true);
        // // 不刷新页面
        setLocale(change, false);
    };
    const intl = useIntl();
    return (React.createElement("div", null,
        React.createElement("h1", null, title),
        React.createElement("h2", null, intl.formatMessage({
            id: 'umi',
        })),
        React.createElement("h3", null, intl.formatMessage({
            id: 'name',
        })),
        React.createElement(Button, { onClick: changeLangs }, "\u5207\u6362\u8BED\u8A00"),
        React.createElement(Button, { onClick: changeLangs }, "888\u5207\u6362\u8BED\u8A00111")));
};
Home.getInitialProps = (async ({ store, isServer, history, match, route }) => {
    // console.log(ctx);
    if (!isServer) {
        return;
    }
    await store.dispatch({ type: 'test/test' });
    const { test } = store.getState();
    return { test };
});
export default connect((({ test }) => ({ title: test.title })))(Home);
//# sourceMappingURL=index.js.map