// Math Toolを参考にして開発しましょう。
class CurrencyConvertApp {

  constructor() {
    this.CLITextInput = document.getElementById("commandInput");
    this.CLIOutputDiv = document.getElementById("output");
    this.form = document.getElementById("terminalForm");

    this.denominationToJPY = {
      Rupee: 1.4442,
      Paisa: 0.014442,
      Dollar: 106.10,
      USCent: 1.0610,
      Euro: 125.56,
      EuroCent: 1.2556,
      Dirham: 28.89,
      Fils: 0.2889
    };

    this.commands = {
      showAvailableLocales: {
        expectedTokens: 2,
        validate: (tokens) => {
          // 例: 引数0個かどうか
          if (tokens.length !== 2) {
            return { isValid: false, errorMessage: "showAvailableLocales は引数不要です" };
          }
          return { isValid: true, errorMessage: "" };
        }
      },
    
      showDenominations: {
        expectedTokens: 3,
        validate: (tokens) => {
          const validLocales = ["India", "USA", "Europe", "UAE", "Japan"];
          if (!validLocales.includes(tokens[2])) {
            return { isValid: false, errorMessage: `${tokens[2]} は利用可能なロケールではありません` };
          }
          return { isValid: true, errorMessage: "" };
        }
      },

          // CurrencyConvert Rupee 100 Dollar
          //最初の通貨がNG
          //金額の数値が適切でない
          //２番目の通貨がNG
      //[1][3]はshowDenominationsである必要がある
    
      convert: {
        expectedTokens: 4,
        validate: (tokens) => {
          const denominationToJPY = {
            Rupee: 1.4442,
            Paisa: 0.014442,
            Dollar: 106.10,
            USCent: 1.0610,
            Euro: 125.56,
            EuroCent: 1.2556,
            Dirham: 28.89,
            Fils: 0.2889
          };
          if (!denominationToJPY[tokens[1]]) {
            return { isValid: false, errorMessage: `無効な通貨: ${tokens[1]}` };
          }
          if (isNaN(tokens[2]) || Number(tokens[2]) <= 0) {
            return { isValid: false, errorMessage: `金額が正しくありません: ${tokens[2]}` };
          }
          if (!denominationToJPY[tokens[3]]) {
            return { isValid: false, errorMessage: `無効な通貨: ${tokens[3]}` };
          }
          return { isValid: true, errorMessage: "" };
        }
      }
    };
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const userInput = (this.CLITextInput.value || "").trim();
      this.main(userInput);
    });

    // this.form.addEventListener("submit", function (event) {
    //   event.preventDefault(); // ページリロードを防ぐ
    //   const userInput = this.CLITextInput;
    //   main(userInput); // 値をmainに渡して実行
    // });
  }




  parsedArrayValidator(tokens){

      let validatorResponse = universalValidator(tokens);
      if(!validatorResponse["isValid"]) return validatorResponse;

      validatorResponse = commandArgumentsValidator(tokens);
      if(!validatorResponse["isValid"]) return validatorResponse;

      return{'isValid': true,'errorMessage':''}

      // commandArgumentsValidator(parsedCLIArray);
  }

  universalValidator(parsedCLIArray){
      //最初にパッケージ名は常に CurrencyConvert であることを確認する必要があります。
      if(parsedCLIArray[0] !==  "CurrencyConvert"){
          console.log("CurrencyConvertと認識できないのでfalseになってます");
          return {'isValid': false, 'errorMessage': `CurrencyConvert以外のメッセージが使われています'`}

      }

      return {'isValid': true, 'errorMessage': ''}


      //convert以降がshowAvailableLocale　、showDenominations、どこかの通貨か（指定したコマンドリストに則っているか）
      
  }
      



  commandArgumentsValidator(parsedCLIArray){
      const index_one =  parsedCLIArray[1];
      const index_two =  parsedCLIArray[2];

      const index_four =  parsedCLIArray[2];

      if(index_one === "showAvailableLocales"){

      }
      else if(index_one === "showDenominations"){

      }

      // CurrencyConvert Rupee 100 Dollar
          //最初の通貨がNG
          //金額の数値が適切でない
          //２番目の通貨がNG
      //[1][3]はshowDenominationsである必要がある

      else if(denominationToJPY[index_two] != -1 && denominationToJPY[index_four] != -1 && parsedCLIArray){
          console.log("denominationToJPY[index_two]あります");
          return {'isValid': true, 'errorMessage': 'denominationToJPY[index_two]あります'}

      }
      console.log("commandArgumentsValidatorどのifにも引っかからず");

      return {'isValid': true, 'errorMessage': ''}



      //そもそも数だったら判定させる感じかコマンドから判定させるのがいいのかどっちの方が良いか
      //入力をできる限り対象のもの以外は弾けるようにしたいつまりバリデーションの数が少ないものでできる限り弾けるようにしたい




  }


  main(input) {
      const tokens = input.split(" ");
      console.log("入力トークン:", tokens);

      let validatorResponse = parsedArrayValidator(tokens);

      if(validatorResponse['isValid'] == false){ 
          appendResultParagraph(CLIOutputDiv, false, validatorResponse['errorMessage']);
          console.log("反応");
      }
          


      //convert showAvailableLocales
      //CurrencyConvert showAvailableLocales
      
      // コマンドが convert 形式だったら処理（例: convert India Rupee 100 Europe Euro）
      else if (tokens[0] === "CurrencyConvert" && tokens[1] === "showAvailableLocales" ) {
          const array = showAvailableLocales();
          //function appendResultParagraph(parentDiv, isValid, message)
          appendResultParagraph(CLIOutputDiv, true, array);

      }


      //convert showDenominations India
      //CurrencyConvert showDenominations India

      else if (tokens[0] === "CurrencyConvert" && tokens[1] === "showDenominations" ) {
          const sourceDenomination = tokens[2];

          const whatLocale = showDenominations(sourceDenomination);

          appendResultParagraph(CLIOutputDiv, true, whatLocale);

          
      }

      //convert Rupee 100 Dollar
      //CurrencyConvert Rupee 100 Dollar
      //IndiaとかはNG、単位ではなくロケールだから。
      
      else if(tokens[0] === "CurrencyConvert" && denominationToJPY[tokens[1]]&& denominationToJPY[tokens[3]]){    

          const sourceDenomination = tokens[1];
          const sourceAmount = tokens[2];
          const destDenomination = tokens[3];
          
        
          convert(sourceDenomination, sourceAmount, destDenomination);


      }

  }



  // 利用可能なロケールのリストから1つの要素を引数として受け取り、そのロケールでサポートされているデノミテーション（通貨の単位）のリストを表示します。
  showDenominations(sourceDenomination){
      //ローカルに対して通貨単位のリストを返す

      const localeToDenominations = {
          India:  ["Rupee", "Paisa"],
          USA:    ["Dollar", "USCent"],
          Europe: ["Euro", "EuroCent"],
          UAE:    ["Dirham", "Fils"],
          Japan: ["Yen"]
      };
      const result = localeToDenominations[sourceDenomination]

      return result;

  }

  appendResultParagraph(parentDiv, isValid, message)
      {
          let promptName = "";
          let promptColor = "";
          if (isValid){
              promptName = "MTools";
              promptColor = "turquoise";
          }
          else{
              promptName = "MToolsError";
              promptColor = "red";
          }
          parentDiv.innerHTML+=
                  `<p class="m-0">
                      <span style='color: ${promptColor}'>${promptName}</span>: ${message}
                  </p>`;
          return;
      }


  // 引数は受け取らず、変換するための利用可能なロケールのリストを表示します。(ただコマンドとして表示させるだけ)
  //
  showAvailableLocales(){
      //ローケルリストをただ返すだけ
      const locales = ["India", "USA", "Europe", "UAE", "Japan"];
      return locales;
  }





  // 変換前の通貨の単位、通貨量、変換先の通貨の単位の3つの引数を受け取り、
  // 通貨を変換し、入力と出力の値、通貨単位を表示します。sourceAmountは数値に変換される必要があります。

      //通過を変換して入力と出力の値、通貨単位を出す


  convert(sourceDenomination, sourceAmount, destinationDenomination){
      const sourceJPYRate = denominationToJPY[sourceDenomination];
      const destJPYRate   = denominationToJPY[destinationDenomination];

      if (!sourceJPYRate || !destJPYRate) {
          appendResultParagraph(CLIOutputDiv, false, "不正な通貨単位が指定されました。");
          return;
      }

      const amountInJPY = parseFloat(sourceAmount) * sourceJPYRate;
      const convertedAmount = amountInJPY / destJPYRate;

      const message = `${sourceAmount} ${sourceDenomination} = ${convertedAmount.toFixed(2)} ${destinationDenomination}`;
      appendResultParagraph(CLIOutputDiv, true, message);
  }

}

// expose instance
window.app = new CurrencyConvertApp();




  //sourceAmountは