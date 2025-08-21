# JavaScript `this` の挙動まとめ

## 基本ルール
JavaScript の `this` は **関数の定義ではなく、呼び出し方で決まる**。  
Java のようにコンパイルエラーにはならず、呼び出し元を失った場合は  
- 非 strict モード: `globalThis` に置き換えられる  
- strict モード: `undefined` になる  

---

💡 **自分メモ**  （翻訳）
Javaなら「所有者を失ったthis」はコンパイル不可。  
JSは実行されるが、所有者不在なら globalThis (strictだと undefined) になる。

### アロー関数
普通の関数なら globalThisになるものが「外側の obj」が残るという仕様
もともとのオブジェクトの
