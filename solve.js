const solve = (str)=>{
    let map = {
      zero: "0",
      one: "1",
      two: "2",
      three: " 3",
      four: "4",
      five: "5",
      six: "6",
      seven: " 7",
      eight: " 8",
      nine: "9",
      plus: "+",
      division: "/",
      times: "*",
    };
    
    const resultMap = {};
    // let str = "nine(times(four()))";
    let genereatedString = "";
    let stack = [];
    for (let item of str) {
      if (item == "(") {
        stack.push(genereatedString);
        genereatedString = "";
      } else if (item == ")") break;
      else genereatedString += item;
    }
    //console.log(stack);
    let newString = "";
    for (let item of stack) {
      newString += map[item];
    }
     resultMap[str] = eval(`Math.floor(${newString})`);
     return resultMap
    }
    //resultMap[str] = eval(`Math.floor(${newString})`);
    solve("str")
    //console.log(ans);
    module.exports = solve
    