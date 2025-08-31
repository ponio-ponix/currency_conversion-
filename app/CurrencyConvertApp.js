// CurrencyConvertApp.js
class CurrencyConvertApp {
  constructor() {
    // DOM refs
    this.input  = document.getElementById("CLITextInput");
    this.output = document.getElementById("output");
    this.form   = document.getElementById("terminalForm");

    // Rates (base: JPY)
    this.denominationToJPY = {
      Rupee: 1.4442,
      Paisa: 0.014442,
      Dollar: 106.10,
      USCent: 1.0610,
      Euro: 125.56,
      EuroCent: 1.2556,
      Dirham: 28.89,
      Fils: 0.2889,
      Yen: 1 // enable Japan
    };

    this.validLocales = ["India", "USA", "Europe", "UAE", "Japan"];
    this.localeToDenominations = {
      India:  ["Rupee", "Paisa"],
      USA:    ["Dollar", "USCent"],
      Europe: ["Euro", "EuroCent"],
      UAE:    ["Dirham", "Fils"],
      Japan:  ["Yen"]
    };

    // Command registry
    this.COMMANDS = {
      showAvailableLocales: {
        expectedTokens: 2,
        validate: (tokens) => {
          const ok = tokens.length === 2;
          return { isValid: ok, errorMessage: ok ? "" : "showAvailableLocales は引数不要です" };
        }
      },
      showDenominations: {
        expectedTokens: 3,
        validate: (tokens) => {
          const ok = this.validLocales.includes(tokens[2]);
          return { isValid: ok, errorMessage: ok ? "" : `${tokens[2]} は利用可能なロケールではありません` };
        }
      },
      convert: {
        expectedTokens: 4,
        validate: (tokens) => {
          const src = tokens[1], dst = tokens[3];
          const amt = Number(tokens[2]);
          if (!this.denominationToJPY[src])  return { isValid: false, errorMessage: `無効な通貨: ${src}` };
          if (!Number.isFinite(amt) || amt <= 0) return { isValid: false, errorMessage: `金額が正しくありません: ${tokens[2]}` };
          if (!this.denominationToJPY[dst])  return { isValid: false, errorMessage: `無効な通貨: ${dst}` };
          return { isValid: true, errorMessage: "" };
        }
      }
    };

    // Submit handler (keep `this` as the class)
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userInput = this.input.value.trim();
      if (!userInput) return;
      this.input.value = "";
      this.main(userInput);
    });
  }

  // ===== main flow =====
  main(input) {
    const tokens = input.split(" ").filter(Boolean);
    const base = this.universalValidator(tokens);
    if (!base.isValid) return this.appendResultParagraph(false, base.errorMessage);

    const cmdName = tokens[1];
    const cmd = this.COMMANDS[cmdName];
    if (!cmd) return this.appendResultParagraph(false, `未知のコマンド: ${cmdName}`);

    if (tokens.length !== cmd.expectedTokens) {
      return this.appendResultParagraph(false, `${cmdName} はトークン数 ${cmd.expectedTokens} を期待します`);
    }

    const v2 = cmd.validate(tokens);
    if (!v2.isValid) return this.appendResultParagraph(false, v2.errorMessage);

    // Execute command
    if (cmdName === "showAvailableLocales") {
      this.appendResultParagraph(true, this.showAvailableLocales().join(", "));
    } else if (cmdName === "showDenominations") {
      const locale = tokens[2];
      this.appendResultParagraph(true, this.showDenominations(locale).join(", "));
    } else if (cmdName === "convert") {
      const [, src, amt, dst] = tokens;
      const msg = this.convert(src, Number(amt), dst);
      this.appendResultParagraph(true, msg);
    }
  }

  universalValidator(tokens) {
    if (tokens.length === 0) {
      return { isValid: false, errorMessage: "空の入力です" };
    }
    if (tokens[0] !== "CurrencyConvert") {
      return { isValid: false, errorMessage: "入力は 'CurrencyConvert' から始めてください" };
    }
    if (tokens.length < 2) {
      return { isValid: false, errorMessage: "コマンド名が不足しています" };
    }
    return { isValid: true, errorMessage: "" };
  }

  // ===== view =====
  appendResultParagraph(isValid, message) {
    const promptName  = isValid ? "CurrencyConvert" : "CurrencyConvertError";
    const promptColor = isValid ? "turquoise" : "red";
    this.output.innerHTML +=
      `<p class="m-0"><span style="color:${promptColor}">${promptName}</span>: ${message}</p>`;
    this.output.scrollTop = this.output.scrollHeight;
  }

  // ===== domain =====
  showAvailableLocales() {
    return this.validLocales.slice();
  }

  showDenominations(locale) {
    return this.localeToDenominations[locale] || [];
  }

  convert(sourceDenomination, amount, destinationDenomination) {
    const jpy = amount * this.denominationToJPY[sourceDenomination];
    const converted = jpy / this.denominationToJPY[destinationDenomination];
    return `${amount} ${sourceDenomination} = ${converted.toFixed(2)} ${destinationDenomination}`;
  }
}

// expose instance
window.app = new CurrencyConvertApp();


// aaa




  