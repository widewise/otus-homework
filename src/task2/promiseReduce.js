const promiseReduce = async (asyncFunctions, reduce, initialValue) => {
    let previousResult = initialValue;
    for (const asyncFunction of asyncFunctions) {
        previousResult = await asyncFunction()
            .then((data) => {
                return reduce(previousResult, data);
            });
    }
    return previousResult;
};
const fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
};
const fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
});
//act
promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
).then(console.log);
