//  maps challenges title to challenge function name 
const challengeFunctionNameMap = {
  "dog-years": "dogYears",
}

const getUserCodeWrapper = ({ challengeTitle, lang, userCode, params }) => {
  const challengeFunctionName = challengeFunctionNameMap[challengeTitle]
  return {
    JS: `
      ${userCode}
      if (typeof ${challengeFunctionName} !== "function") 
        throw new Error ("Please make sure your function name is '${challengeFunctionName}\'");
      
      // keep following console, it's for splitting user console's from our console (the one below it)
      console.log(""); // splitting console
      console.log(${challengeFunctionName}(${params}));
    `,
    GO: `
      package main
      import "fmt"
      
      ${userCode}
      
      func main() {
          fmt.Println("")
          fmt.Println(${challengeFunctionName}(${params})
      }
    `,
    PYTHON: `
      print('')
      print(${challengeFunctionName}(${params})
    `

  }[lang];
};

module.exports = getUserCodeWrapper;