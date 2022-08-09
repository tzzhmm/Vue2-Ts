// 数据类型
console.log('Undefined,Null, Boolean,Number,String, Object (Array, Function, Date, Error) ,Symbol,BigInt');
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
 * TODO FIXME
 * 手写【深拷贝】
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
*/

/**
 * @param {1} 方法1
*/

function deepClone(obj = {}, map = new Map()) {
    if(typeof obj !== 'object') {
        return obj;
    }
    if(map.get(obj)) {
        return map.get(obj);
    }

    // 初始化返回结果
    let result = {};

    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    if(obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]') {
        return result = [];
    }

    // 防止循环引用
    map.set(obj, result);
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key], map);
        }
    }

    return result;
};

/**
 * @param {2} 方法2
*/
// var deepClone = function(obj){
// 	var str, newobj = obj.constructor === Array ? [] : {};
// 	if(typeof obj !== 'object'){
//     	return;
// 	} else if(window.JSON){
//     	str = JSON.stringify(obj), //系列化对象
//    	 	newobj = JSON.parse(str); //还原
// 	} else {
//     	for(var i in obj){
//         	newobj[i] = typeof obj[i] === 'object' ?
//         	deepClone(obj[i]) : obj[i];
//     	}
// 	}
// 	return newobj;
// };


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