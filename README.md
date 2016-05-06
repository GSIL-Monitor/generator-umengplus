# generator-umengplus
scaffold for umengplus web

## 使用方法

### 1. 安装脚手架工具
```
npm install -g yo
```

### 2. 安装生成器
```
npm install --save-dev generator-umengplus
```

### 3. 创建项目
```
yo umengplus
```

### 4. 目录结构
按上述步骤操作后，会得到如下目录结构：
```
├───package.json
├───webpack.dev.config.js
├───webpack.prod.config.js
├───.gitignore
├───static/
│   └───font
│   └───img
│   └───js
│     └───actions
│     └───components
│     └───constants
│     └───container
│     └───lib
│     └───reducers
│     └───routes
│     └───utils
│     └───my-project.js
│   └───css/less/sass/stylus
```

### 5. 创建react组件
1. 进入到组件目录：`cd static/components`
2. 执行`yo umengplus:react-component`
