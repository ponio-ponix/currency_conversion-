// ①グローバル関数呼び出し：f() → 非strictでglobalThis、strictでundefined


function getThis() {
  return this;
}

function getThisStrict() {
  'use strict';
  return this;
}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

obj1.getThis = getThis;
obj2.getThis = getThis;

// ②メソッド基本呼び出し：obj.m() → this === obj

console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }

let c = obj1.getThis;
// グローバルオブジェクトを作るためにはlet c = obj1;だとNG。これだとobj1の参照となる。
console.log(c()); //この出力がglobalthis(nodeだといっぱいなんかでる)

// --- strict 実験 ---
obj1.getThis = getThisStrict;
console.log("obj1.getThis() (strict) →", obj1.getThis()); // { name: 'obj1', getThis: [Function] }

let cStrict = obj1.getThis;
console.log("detached cStrict() (strict) →", cStrict());  // undefined


// 明示指定：f.call(x) / f.apply(x) / f.bind(x) → this === x

// コンストラクタ：new C() → 新インスタンス

// ⑤アロー関数：自分のthisを持たず、外側をキャプチャ（bind無効）

const obj = {
  getThisGetter() {
    const getter = () => this;
    return getter;
  },
};

const fn = obj.getThisGetter();
console.log(fn() === obj); // true

const fn2 = obj.getThisGetter;
console.log(fn2()() === globalThis); // true in non-strict mode



  

//JSのthisがプリミティブ値（数値や文字列など）とどう関わるか


function getThisStrict() {
  "use strict"; // 厳格モードに入る
  return this;
}

// デモ専用のものです。組み込みのプロトタイプを変更しないでください。
Number.prototype.getThisStrict = getThisStrict;
console.log(typeof (1).getThisStrict()); // "number"

//これはまず非strictモードなので勝手にボクシングされると。
//だからオブジェクト型になるのでthisとして捉えられる、そしてプロトタイプにそのオブジェクト型となったメソッドが登録される。