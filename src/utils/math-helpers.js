const parsedArg = (arg) => parseInt(arg, 10);

const calculateSum = (...args) => {
  return args
    .map(arg => parsedArg(arg))
    .filter(arg => !isNaN(arg))
    .reduce((acc, curr) => parsedArg(acc) + parsedArg(curr));
};

const calculateAverage = (...args) => {
  const filteredArgs = args
    .map(arg => parsedArg(arg))
    .filter(arg => !isNaN(arg))
    .filter(arg => arg > 0);

  return filteredArgs
    .reduce((acc, curr, i, arr) => parsedArg(acc) + parsedArg(curr)) / filteredArgs.length;
};

const calculateMaleBodyDensity = (measurementSum, age) => {
  const sumSquared = Math.pow(measurementSum, 2);
  const eq = 1.10938 - (0.0008267 * parsedArg(measurementSum)) + (0.0000016 * sumSquared) - (0.0002574 * parsedArg(age));

  return eq;
};

const findNonZeros = (obj) => Object.values(obj).reduce((acc, val) => (val > 0), false);

const siriEquation = (p) => (4.95 / p - 4.5) * 100;

const calculateLeanBodyMass = (w, f) => w - (w * f);

const calculateWeightInFat = (w, lbm) => w - lbm;

const roundTwoDecimals = (num) => Math.ceil(num * 1000) / 1000;

export {
  calculateSum,
  calculateAverage,
  calculateMaleBodyDensity,
  findNonZeros,
  siriEquation,
  calculateLeanBodyMass,
  calculateWeightInFat,
  roundTwoDecimals
}
