const fs = require("fs");

var writeStream;
var passCounter = 0;

function createAppendStream(path) {
    writeStream = fs.createWriteStream(path, {
        flags: "w"
    });
    writeStream.write("[");
    firstWrite = true;

    return this;
}

function write(data) {
    if (passCounter > 0) {
        writeStream.write(",");
    }
    var content = JSON.stringify(data).replace(/^\[/, "").replace(/\]$/, "");
    writeStream.write(content);

    passCounter++;
}

function close() {
    console.log(`Wrote ${passCounter} passes`)
    writeStream.write("]");
    writeStream.close();
}

const jappend = {
    createAppendStream,
    write,
    close,
}

module.exports = jappend;