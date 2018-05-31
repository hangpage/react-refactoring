# react-refactoring

### 遇到的坑

- 在form中自定义combobox控件时，发现form中无法获取value 原因是目前 Form 的实现依赖控件的 ref，而函数式组件没有 ref，所以目前只能支持非函数式的组件

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

提供受控属性 value 或其它与 valuePropName 的值同名的属性。

提供 onChange 事件或 trigger 的值同名的事件。

不能是函数式组件。

[自定义表单控件](https://ant.design/components/form-cn/#components-form-demo-customized-form-controls)
