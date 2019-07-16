function jestLogger(str) {
    console.log(str);
}

module.exports = {
    log: jestLogger, 
    bindings: {}
};