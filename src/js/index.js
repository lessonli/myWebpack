
/*
* 注意 该 index.js 不同于 学习模块化时 用于汇总js 的文件
* */

import '@babel/polyfill' //缺点(不推荐使用) 转换所有的高级语法, 实际上可以只转换一部分

import {sum} from './module1'
import {sub} from './module2'
import module from './module3'
import a from '../json/test.json'
import '../css/index.less'


console.log(sum(1,2))
console.log(sub(1,2))
console.log(module.mul(1,2))
console.log(a,typeof a)
