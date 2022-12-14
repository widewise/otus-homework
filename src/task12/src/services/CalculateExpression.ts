const actions : Array<IActionInfo> = [
    {
        value: '*',
        label: 'multiplication',
        func: (a,b) => (parseInt(a) * parseInt(b))
    },
    {
        value: '/',
        label: 'division',
        func: (a,b) => (parseInt(a) / parseInt(b))
    },
    {
        value: '+',
        label: 'addintion',
        func: (a,b) => (parseInt(a) + parseInt(b))
    },
    {
        value: '-',
        label: 'subtraction',
        func: (a,b) => (parseInt(a) - parseInt(b))
    }
];
interface IActionInfo {
    value: string;
    label: string;
    func: (a: string, b: string) => number;
}

interface ICalculateResult {
    str: string;
    value: number;
}

function parseExpr(str: string, action: IActionInfo) : ICalculateResult | undefined {
    const reg = new RegExp(`(([0-9]+)\\s*\\${action.value}\\s*([0-9]+))`);
    const out = str.match(reg);
    if (!out) return;
    return {
        str: out[1],
        value: action.func(out[2], out[3])
    };
}

export const calculateExpression = (str: string) => {
    let res;
    for (const action of actions) {
        res = parseExpr(str, action);
        if (res) {
            str = str.replace(res.str, res.value.toString());
            str = calculateExpression(str);
        }
    }
    return str;
}