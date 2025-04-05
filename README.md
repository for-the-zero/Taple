# Taple - Simple Table

一个简单好看的表格，完全由canvas渲染，纯浏览器环境前端项目

A pretty simple and beautiful table made by canvas, a front-end project that runs in a browser environment.

---

## 功能

- 保存为PNG图片（透明背景） / Save as PNG (transparent background)
- 保存为JSON+从JSON导入数据 / Save as JSON and import data from JSON
- 可以开关单元格分割线 / Toggle cell divider lines
- - 关闭：更加简约好看 / Off: Simpler and cleaner
- - 打开：对于合并的单元格，能够清晰明了地看到界限 / On: Clearer and more visible for merged cells
- AI生成支持（展开菜单，在最底下可以打开面板） / AI-generated support (expand the menu, and you can open the panel at the bottom)
- 撤销/重做（`ctrl+z / ctrl+y`） // Undo/Redo (`ctrl+z / ctrl+y`)
- 移动画布 / Move canvas
- 增删行列 / Add/Delete rows/columns

以及……

And...

**特色功能：异形合并单元格**
**SPECIAL FEATURE: Merged cells with irregular shapes**

你可以随你所想地合并单元格，只要是连在一起的

You can merge cells as you like, as long as they are connected.

不单单能够拼成`L` `T` `O`之类的形状！

Not only can they be formed into `L` `T` `O` shapes!

---

## 有感 / Thoughts

这是我花了很长时间去做的，基本上就是一个学期

This project took me a whole semester

关于缩放功能：我觉得这个功能可以加上，但我没有实现，因为有点麻烦，如果你有尽力做的话你可以帮我做一下，谢谢

About zooming: I think this feature can be added, but I haven't implemented it, because it's a bit troublesome. If you can do it, please help me do it, thanks.

我想到的缩放方法：方法一————缩放canvas，但是这个要修改包括但不限于调用时传入的坐标，点击时点击位置的计算等等，而且不清晰；方法二————修改`renderer.js`为`function taple(...)`添加一个`zoom`参数，但是几乎所有常数和变量都要乘以这个参数，超级麻烦！

The zooming method I thought of: Method 1 - Zooming the canvas, but this involves modifying coordinates that are passed in when calling the function, the calculation of the click position, etc., and it's not clear when display. Method 2 - Modifying `renderer.js` to `function taple(...)` to add a `zoom` parameter, but almost all constants and variables need to be multiplied by this parameter, which is super troublesome!

虽然这个项目很~简单（吗？），我花了不少心血，希望大家关注一下，谢谢喵~

Although this project is very simple (is it?), I spent a lot of time on it, and I hope that you will pay attention to it, thank you~

---

## 使用教程 / Usage Guide

你将看到7个按钮在顶上

You will see 7 buttons at the top.

1. 弹出 菜单/设置/关于 // Pop up Menu/Settings/About
2. 编辑：选择一个单元格后可在弹出菜单中编辑文字、调节大小。点击右上角按钮收起才能够记录到`撤销/重做`里面 / Edit: After selecting a cell, you can edit the text and adjust the size in the pop-up menu. Click the top right button to collapse the menu and record it in `Undo/Redo`.
3. 合并：选择两个相邻的单元格，即可合并在一起 / Merge: Select two adjacent cells to merge them together.
4. 取消合并：选择一个单元格，他对应的所有子单元格全部分开来 / Split: Select a cell, and all its subcells will be separated.
5. 增加行列 // Add/Delete Rows/Columns
6. 删除行列 // Delete Rows/Columns

增删行列的面板中两个按钮图标会互换，因为在不同模式下对应的行或列是相反的

The two buttons in the panel for adding/deleting rows/columns will be swapped, because the corresponding row or column is opposite in different modes.

增加模式时，下箭头代表向下添加一行；删除模式时，下箭头代表删除当前一列；右箭头同理

In the add mode, the down arrow means adding a row down; in the delete mode, the down arrow means deleting the current column; the right arrow is the same.