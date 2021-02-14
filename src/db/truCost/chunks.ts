import { CHUNK_SIZE } from "./constants";

const getChunks = (arrayLength: number): number[][] => {
  const cycles: number = Math.ceil(arrayLength / CHUNK_SIZE);
  let allIndexes: number[][] = [];

  for (let i = 0; i <= cycles - 1; i++) {
    let startValue: number = i * CHUNK_SIZE;
    let endValue: number = startValue + CHUNK_SIZE - 1;

    if (endValue > arrayLength - 1) {
      endValue = arrayLength;
    }
    const cycleIndex: number[] = [startValue, endValue];
    allIndexes.push(cycleIndex);
  }
  console.log(allIndexes.length);
  return allIndexes;
};

const getChunkedData = (formattedData: string[][] | number[][]) => {
  console.log(formattedData.length);
  const cycleIndexes: number[][] = getChunks(formattedData.length);
  let allChunks = [];
  for (let i = 0; i < cycleIndexes.length; i++) {
    const cycleStart: number = cycleIndexes[i][0];
    const cycleEnd: number = cycleIndexes[i][1] + 1;
    const chunkedData: string[][] | number[][] = formattedData.slice(
      cycleStart,
      cycleEnd
    );
    const cleanChunk: string[][] | number[][] = cleanChunkedData(chunkedData);
    allChunks.push(cleanChunk);
  }
  return allChunks;
};

const cleanChunkedData = (chunkedData: string[][] | number[][]) => {
  for (let j = 0; j < chunkedData.length; j++) {
    for (let i = 0; i < chunkedData[0].length; i++) {
      if (chunkedData[j][i] === "null") {
        chunkedData[j][i] = 0;
      }
      if (chunkedData[j][i] === "") {
        console.log("found value null");
        console.log(typeof chunkedData[j][i]);
        chunkedData[j][i] = 0;
      }
    }
  }
  return chunkedData;
};

export { getChunkedData };