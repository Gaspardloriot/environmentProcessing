"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunkedData = void 0;
const color = require("bash-color");
const constants_1 = require("./constants");
const getChunks = (arrayLength) => {
    const cycles = Math.ceil(arrayLength / constants_1.CHUNK_SIZE);
    let allIndexes = [];
    for (let i = 0; i <= cycles - 1; i++) {
        let startValue = i * constants_1.CHUNK_SIZE;
        let endValue = startValue + constants_1.CHUNK_SIZE - 1;
        if (endValue > arrayLength - 1) {
            endValue = arrayLength;
        }
        const cycleIndex = [startValue, endValue];
        allIndexes.push(cycleIndex);
    }
    console.log(color.purple(`   chunks created :  ${allIndexes.length}\n`, true));
    return allIndexes;
};
const getChunkedData = (formattedData) => {
    console.log(color.purple(`\n   table length   :${formattedData.length}`, true));
    const cycleIndexes = getChunks(formattedData.length);
    let allChunks = [];
    for (let i = 0; i < cycleIndexes.length; i++) {
        const cycleStart = cycleIndexes[i][0];
        const cycleEnd = cycleIndexes[i][1] + 1;
        const chunkedData = formattedData.slice(cycleStart, cycleEnd);
        const cleanChunk = cleanChunkedData(chunkedData);
        allChunks.push(cleanChunk);
    }
    return allChunks;
};
exports.getChunkedData = getChunkedData;
const cleanChunkedData = (chunkedData) => {
    for (let j = 0; j < chunkedData.length; j++) {
        chunkedData[j][0] = parseInt(`${chunkedData[j][1]}${chunkedData[j][4]}`);
        for (let i = 0; i < chunkedData[0].length; i++) {
            if (chunkedData[j][i] === "null") {
                chunkedData[j][i] = 0;
            }
            if (chunkedData[j][i] === "") {
                console.log("handled value", color.purple("null", true), color.yellow(`row index ${j}:${i} of CHUNK`, true));
                chunkedData[j][i] = 0;
            }
        }
    }
    return chunkedData;
};
