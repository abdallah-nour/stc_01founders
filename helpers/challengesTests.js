// params, for stings, put them inside single quote, then double quote '""'
module.exports = {
    "sum-birds": { id: 1, params: ["[1, 2, 3]"], expectedResult: "6" },
    "hello-world": { id: 2, params: [""], expectedResult: "Hello, World!" },
    "dog-years": {
        id: 3,
        params: ['"venus"', 189839836],
        expectedResult: "68.45",
    },
    ispowerof2: { id: 4, params: [513], expectedResult: "false" },
};
