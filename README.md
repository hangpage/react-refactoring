# react-refactoring

### 遇到的坑

- 在form中自定义combobox控件时，发现form中无法获取value 原因是目前 Form 的实现依赖控件的 ref，而函数式组件没有 ref，所以目前只能支持非函数式的组件

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

提供受控属性 value 或其它与 valuePropName 的值同名的属性。

提供 onChange 事件或 trigger 的值同名的事件。

不能是函数式组件。


### 定义组件的方式

 1. 传统写法
const App = React.createClass({});

 2. es6 的写法
class App extends React.Component({});

 3. stateless 的写法（我们推荐的写法）
const App = (props) => ({});

[自定义表单控件](https://ant.design/components/form-cn/#components-form-demo-customized-form-controls)


datepicker 需要是[moment](http://momentjs.cn/docs/#/parsing/now/)类型的


[Connect详解](https://blog.csdn.net/u010977147/article/details/53412381)


Q1:
    dva究竟是如何实现model与组件数据关联的，网上只是写了connect连接，还是不懂
    
    刚在routes/user/index中将users打印出来，发现是UserModel中的state数据，是不是只要注册过的页面都可以访问到model的？
    在model文档中提到过，当前model以key为namespace存在全局中。 
    
    mapStateToProps中第一个参数其实就是redux中的全局store，在我们userModel中通过{users}提取出usersmodel中的state与User组件进行了绑定！






    
    
    connect方法声明如下：
    connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])  
    
    作用：连接 React 组件与 Redux store。 
    连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。 
    
    返回值
    根据配置信息，返回一个注入了 state 和 action creator 的 React 组件。
    
    作者：李斌
    [链接：https://zhuanlan.zhihu.com/p/30671973](https://zhuanlan.zhihu.com/p/30671973)
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
    
    
    
    ### 生命函数
    
    
    componentWillReceiveProps
    
    当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
    
    `
      componentWillReceiveProps: function(nextProps) {
        this.setState({
          likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
      }
    `
