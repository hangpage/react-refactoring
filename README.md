# react-refactoring

### 备注一些吧。

- 在form中自定义combobox控件时，发现form中无法获取value 原因是目前 Form 的实现依赖控件的 ref，而函数式组件没有 ref，所以目前只能支持非函数式的组件
