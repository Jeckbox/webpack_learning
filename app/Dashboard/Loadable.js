
import Loadable from 'react-loadable';


export default Loadable({
    loader: () => import('./index.js'),
    loading: () => null,
});

// 记得npm install --save-dev babel-plugin-syntax-dynamic-import,
// 然后在.babelrc中配置，否则再Loadable中使用import会报错
// Loadable中的import不可以替换成require，require不是个异步函数

// 使用eslint的时候，要install babel-eslint,在安装它之前，eslint会提示Loadable中的import非法
