//  maps challenges title to challenge function name
const challengeFunctionNameMap = {
  "dog-years": "dogYears",
  ispowerof2: "isPowerOf2",
  "sum-birds": "sumBirds",
  "hello-world": "helloWorld",
};

const getUserCodeWrapper = ({ challengeTitle, lang, userCode, params }) => {
  const challengeFunctionName = challengeFunctionNameMap[challengeTitle];
  const stringParams = params.join(", ");

  return {
    JS: `
      ${userCode}
      if (typeof ${challengeFunctionName} !== "function") 
        throw new Error ("Please make sure your function name is '${challengeFunctionName}\'");
      
      // keep following console, it's for splitting user console's from our console (the one below it)
      console.log(""); // splitting console
      console.log(${challengeFunctionName}(${stringParams}));
    `,
    GO: `
      package main
      import "fmt"
      
      ${userCode}
      
      func main() {
          fmt.Println("")
          fmt.Println(${challengeFunctionName}(${stringParams}))
      }
    `,
    PYTHON: `${userCode} 
print ''
print ${challengeFunctionName}(${stringParams})`,
  }[lang];
};

module.exports = getUserCodeWrapper;
