let buttons = $(".number");
let numberString = [];
let botonera = $(".signaler");
let operador = "";
let firstNumber = "";
let secondNumber = "";
let result = "";

buttons.on("click", function (event) {
  var a = event.target.innerHTML;
  if (result === "") {
    numberString.push(String(a));
    $("p").html(numberString);
  }
});

botonera.on("click", function (event) {
  var a = event.target.innerHTML;
  switch (String(a)) {
    //si apretas tecla que borra
    case "&lt;":
      if (operador === "") {
        //si borras numero
        numberString.splice(numberString.length - 1, 1);
        $("p").html(numberString);
      } else if (operador != "" && secondNumber != "") {
        // si borras el operador
        operador = "";
        secondNumber = "";
        numberString.splice(numberString.length - 1, 1);
        $("p").html(numberString);
        if (numberString.length === 0) {
          firstNumber = "";
          numberString = [];
          // $("p").html("_");
        }
      }
      break;
    //si apretas igual
    case "=":
      // cuando es "=", tengo que ir pasando todo a una variable, cuando encuentro el operador,
      //paro de llenar la variable del numero 1 y comienzo con el segundo numero
      for (let i = 0; i < numberString.length; i++) {
        const element = numberString[i];
        if (element === "+" || element === "-" || element === "×" || element === "÷") {
          // guardar en la variable operador y crear secondNumber
          operador = element;
          var j = i;
          // al encontrar el operador, corto el array
          // y comienzo con el segundo numero
          var fakeSecondNumber = numberString.slice(j + 1);
          for (let k = 0; k < fakeSecondNumber.length; k++) {
            const element2 = fakeSecondNumber[k];
            secondNumber += String(element2);
          }
        } else if (element != "+" && element != "-" && element != "×" && element != "÷" && operador === "") {
          firstNumber += String(element);
        }
      }
      // antes de operar, volver el array de numeros un numero
      switch (operador) {
        case "-":
          result = parseFloat(firstNumber) - parseFloat(secondNumber);
          $("p").html(result);
          break;
        case "+":
          result = parseFloat(firstNumber) + parseFloat(secondNumber);
          $("p").html(result);
          break;
        case "×":
          result = parseFloat(firstNumber) * parseFloat(secondNumber);
          $("p").html(result);
          break;
        case "÷":
          result = parseFloat(firstNumber) / parseFloat(secondNumber);
          $("p").html(result);
          break;
        default:
          break;
      }
      break;
    case "AC":
      numberString = [];
      operador = "";
      firstNumber = "";
      secondNumber = "";
      result = "";
      $("p").html("_");
      break;
    default:
      numberString.push(a);
      $("p").html(numberString);
      break;
  }
});
// al apretar el operador, asignarle el operador a una variable global,
