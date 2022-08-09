// 数据类型
console.log('Undefined,Null, Boolean,Number,String, Object (Array, Function, Date, Error) ,Symbol,BigInt');
console.log( 'Object 是复杂数据类型，其他7个是基本数据类型' )
// Symbol   BigInt 是 ES6 单独新增
console.log( 'Symbol: 代表独一无二的值，最大的用法是用来定义对象的唯一属性名' );
console.log( 'BigInt: 以表示任意大小的整数' );
console.log( '' );
console.log( '' );

/**
 * typeof: 能判断所有值类型，函数。不可对 null、对象、数组进行精确判断，因为都返回 object
*/
console.log( '--------typeof' )
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function

// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof Error); // function
console.log(typeof new Date()); // object

console.log( '' );
console.log( '' );

/**
 * instanceof: 能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。比如考虑以下代码：
 *      其实现就是顺着原型链去找，如果能找到对应的 Xxxxx.prototype  即为 true 。比如这里的 vortesnail  
 *      作为实例，顺着原型链能找到 Student.prototype  及 People.prototype ，所以都为 true 。
*/
console.log( '--------instanceof' )
class People {};
class Student extends People {};
const vortesnail = new Student();
console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true
console.log( '' );
console.log( '' );


/**
 * Object.prototype.toString.call()：所有原始数据类型都是能判断的，还有 Error 对象，Date 对象等
*/
console.log( '--------Object.prototype.toString.call ' )
console.log( Object.prototype.toString.call(2) );// "[object String]"
console.log( Object.prototype.toString.call("") );// "[object String]"
console.log( Object.prototype.toString.call(true) )// "[object Boolean]"
console.log( Object.prototype.toString.call(undefined) );// "[object Undefined]"
console.log( Object.prototype.toString.call(null) );// "[object Null]"
console.log( Object.prototype.toString.call(Math) );// "[object Math]"
console.log( Object.prototype.toString.call({}) );// "[object Object]"
console.log( Object.prototype.toString.call([]) );// "[object Array]"
console.log( Object.prototype.toString.call(function () {}) );// "[object Function]"
console.log( Object.prototype.toString.call(Error) );// [object Function]"
console.log( Object.prototype.toString.call(new Date()) );// "[object Date]"
console.log( '' );
console.log( '' );


/**
 * 如何判断变量是否为数组？
*/
console.log( '如何判断变量是否为数组？' )
var arr = [];
console.log( typeof arr ); // object
console.log( Array.isArray(arr) ); // true
console.log( arr.__proto__ === Array.prototype ); // true
console.log( arr instanceof Array ); // true
console.log( Object.prototype.toString.call(arr) ); // "[object Array]"
console.log( '' );
console.log( '' );


/**
 * TODO FIXME --------------------------------------------------------
 * 手写【深拷贝】
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
*/

/**
 * @param {1} 方法1
*/

// function deepClone(obj = {}, map = new Map()) {
//     if(typeof obj !== 'object') {
//         return obj;
//     }
//     if(map.get(obj)) {
//         return map.get(obj);
//     }

//     // 初始化返回结果
//     let result = {};

//     // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
//     if(obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]') {
//         return result = [];
//     }

//     // 防止循环引用
//     map.set(obj, result);
//     for(const key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             // 递归调用
//             result[key] = deepClone(obj[key], map);
//         }
//     }

//     return result;
// };

/**
 * @param {2} 方法2
*/
var deepClone = function(obj){
	var str, newobj = obj.constructor === Array ? [] : {};
	if(typeof obj !== 'object'){
    	return;
	} else if(window.JSON){
    	str = JSON.stringify(obj), //系列化对象
   	 	newobj = JSON.parse(str); //还原
	} else {
    	for(var i in obj){
        	newobj[i] = typeof obj[i] === 'object' ?
        	deepClone(obj[i]) : obj[i];
    	}
	}
	return newobj;
};


var defaultObj = {
    name: '秋秋',
    age: '23岁',
    someThingFn: function() {
        console.log(this.name);
    }
};
var newObj = deepClone(defaultObj);
newObj.name = '熊熊11';
newObj.age = '27岁';
newObj.someThingFn = function() {
    console.log(this)
    console.log(this.age)
    console.log(this.name)
};
console.log( newObj );
console.log( newObj.name );
defaultObj.someThingFn();
newObj.someThingFn();
console.log( newObj === defaultObj )

/**
 * @param {3} 方法3
*/
// function deepClone(initalObj, finalObj) {    
//     var obj = finalObj || {};    
//     for (var i in initalObj) {
//       // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况    
//       var prop = initalObj[i];
//       // 如果被拷贝值的第i个 === 拷贝至的值
//       if(prop === obj) {
//         // 则跳出本次for循环,进入下一个for循环         
//         continue;
//       }
//       // 如果被拷贝值的第i个是对象
//       if (typeof prop === 'object') {
//         // 被拷贝值的类型是数组,拷贝至的值的第i个 = []
//         // 被拷贝值的类型不是数组,拷贝至的值的第i个 = {}
//         obj[i] = (prop.constructor === Array) ? [] : {};
//         // callee属性是 arguments 对象的一个成员,它表示对函数对
//         // 对象本身的引用，这有利于匿名函数的递归或者保证函数的封装性
//         arguments.callee(prop, obj[i]);
//         // 可用调用自身代替
//         deepClone(prop,obj[i])
//       } else {
//         // 如果被拷贝值的第i个不是对象
//         // 拷贝至的值的第i个 = 被拷贝值的第i个
//         obj[i] = prop;
//       }
//     }
//     // return 拷贝至的所有数据 
//     return obj;
// }
// 被拷贝对象
// var obj = { a: {a: "hello", b: 21} };
// // 拷贝至
// var str = {c:1};
// deepClone(obj, str);
// str.a.a = 'well';
// str.a.b = 27;
// console.log(str);
// console.log(obj);
// console.log(str.a === obj.a)// false


console.log( '' );
console.log( '' );

/**
 * @argument IEEE754 通过64位来表示一个数字
 * @argument { 0.1+0.2 !== 0.3 }
 * 
 * @param { 进制转换 }
 *      js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，
 *      但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，
 *      于是大于 53 位后面的会全部截掉，将导致精度丢失。
 * 
 * @param { 对阶运算 }
 *      由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（0舍1入），
 *      尾数位移时可能会发生数丢失的情况，影响精度
 * 
 * @param { 解决办法 } IEEE754Fn/IEEE754Fn2    IEEE754FnError为错误写法
 *      1、使用 Number.EPSILON 实质是一个可以接受的最小误差范围，一般来说为 Math.pow(2, -52) 。详见MDN
 *      2、转成字符串，对字符串做加法运算 (IEEE754Fn2) 只能运行 < 1 的
 *      
*/
console.log('--------0.1+0.2 !== 0.3--------: ', 0.1+0.2 !== 0.3);

// function IEEE754Fn(a, b) {
//     return Math.abs(a - b) < Number.EPSILON;
// }
// console.log(IEEE754Fn(0.1 + 0.2, 0.3)); // true


// 字符串数字相加，只能运行 < 1 的
var IEEE754Fn2 = function (num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    const res = [];
    let carry = 0;
    while (i >= 0 || j >= 0) {
        const n1 = i >= 0 ? Number(num1[i]) : 0;
        const n2 = j >= 0 ? Number(num2[j]) : 0;
        const sum = n1 + n2 + carry;
        res.unshift(sum % 10);
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }
    if (carry) {
        res.unshift(carry);
    }
    return res.join("");
  };
  
function isEqual(a, b, sum) {
    const [intStr1, deciStr1] = a.toString().split(".");
    const [intStr2, deciStr2] = b.toString().split(".");
    const inteSum = IEEE754Fn2(intStr1, intStr2); // 获取整数相加部分
    const deciSum = IEEE754Fn2(deciStr1, deciStr2); // 获取小数相加部分
    return inteSum + "." + deciSum === String(sum);
}
console.log(isEqual(0.4, 0.5, 0.9)); // true


/**
 * @deprecated
 * 这里代码是有问题的，因为最后计算 bigRes 的大数相除（即 /）是会把小数部分截掉的，
 * 所以我很疑惑为什么网络上很多文章都说可以通过先转为整数运算再除回去，
 * 为了防止转为的整数超出 js 表示范围，还可以运用到 ES6 新增的大数类型，我真的很疑惑，希望有好心人能解答下。
 */
// function IEEE754FnError(a, b) {
//     const maxLen = Math.max(
//       a.toString().split(".")[1].length,
//       b.toString().split(".")[1].length
//     );
//     const base = 10 ** maxLen;
//     const bigA = BigInt(base * a);
//     const bigB = BigInt(base * b);
//     const bigRes = (bigA + bigB) / BigInt(base); // 如果是 (1n + 2n) / 10n 是等于 0n的。。。
//     return Number(bigRes);
// }


console.log( '' );
console.log( '' );
