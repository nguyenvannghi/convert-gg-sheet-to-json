const beforeString = (str, substr) => {
    return str.substring(0, str.indexOf(substr));
};
const afterString = (str, substr) => {
    return str.slice(str.indexOf(substr) + substr.length, str.length);
};

module.exports = {
    beforeString,
    afterString,
};
