# generator-umengplus
scaffold for umengplus web

## 使用方法

### 1. 安装脚手架工具
```
npm install -g yo
```

### 2. 安装生成器
```
npm install -g generator-umengplus
```

>使用-g进行全局安装，在以后每次新建项目时不需再次安装，可直接创建项目

### 3. 创建项目
```
yo umengplus
```

### 4. 目录结构
按上述步骤操作后，会得到如下目录结构：
```
├───package.json                  //包描述文件，包含基本模块的依赖
├───webpack.dev.config.js         //用于开发环境的webpack配置文件
├───webpack.prod.config.js        //用于生产环境的webpack配置文件
├───.gitignore                    //忽略上传时不必要的文件
├───static/                       //源码的根目录
│   └───font                      //放置自定义字体
│   └───img                       //放置图片资源
│   └───js                        //存放脚本的根目录
│     └───actions                 //放置redux的actions，该目录只在选择了redux选项时存在
│     └───components              //放置组件
│     └───constants               //放置常量
│     └───container               //放置容器组件，对于简单的项目，一般用于放置根组件
│     └───lib                     //放置第三方库
│     └───reducers                //放置redux的reducers，该目录只在选择了redux选项时存在
│     └───utils                   //放置项目中的公共代码
│     └───my-project.js           //入口脚本文件，对于简单的项目，一般用于绘制根组件
│   └───css/less/sass/stylus      //放置样式文件
```

## 使用步骤

### 1. 安装基本模块
进入到项目根目录，执行：
```
npm install
```

### 2. 创建组件
进入到组件目录
```
cd static/components
```
执行
```
yo umengplus:react-component
```
