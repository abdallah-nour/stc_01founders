// params, for stings, put them inside single quote, then double quote '""'
module.exports = {
    "dog-years": {
        id: 1,
        params: ['"venus"', 189839836],
        expectedResult: "68.45",
    },
    ispowerof2: { id: 2, params: [513], expectedResult: "false" },
    "Hello-world": { id: 3, params: [], expectedResult: "Hello, World!" },
};
