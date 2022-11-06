let store = {};
global.localStorage = {
    getItem: (key) => store[key],
    setItem: (key, value) => {
        store[key] = value.toString();
    },
    clear: () => {
        store = {};
    },
    removeItem: (key) => {
        delete store[key];
    },
};