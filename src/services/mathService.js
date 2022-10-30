import * as ss from "simple-statistics";
import {
  getAllPlayersRb,
  getTeamsWins,
  getAllPlayersMpg,
  getAllPlayersPpg,
  getAllPlayersAge,
} from "./dataService";

export function pearsonCorrelation(x, y) {
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    sumY2 = 0;
  const minLength = (x.length = y.length = Math.min(x.length, y.length)),
    reduce = (xi, idx) => {
      const yi = y[idx];
      sumX += xi;
      sumY += yi;
      sumXY += xi * yi;
      sumX2 += xi * xi;
      sumY2 += yi * yi;
    };
  x.forEach(reduce);
  return (
    (minLength * sumXY - sumX * sumY) /
    Math.sqrt(
      (minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY)
    )
  ).toFixed(4);
}

export function getCorrInterpretation(corr) {
  if (Math.abs(corr) <= 0.3) return "Poor correlation";
  if (Math.abs(corr) > 0.3 && Math.abs(corr) <= 0.5)
    return "Moderate correlation";
  if (Math.abs(corr) > 0.5 && Math.abs(corr) <= 0.7)
    return "Strong correlation";
  if (Math.abs(corr) > 0.7) return "Very strong correlation";
}

export function getMeasuresOfDistribution(stat) {
  let allStats;

  switch (stat) {
    case "RB":
      allStats = getAllPlayersRb();
      break;
    case "Won games":
      allStats = getTeamsWins();
      break;
    case "MPG":
      allStats = getAllPlayersMpg();
      break;
    case "PPG":
      allStats = getAllPlayersPpg();
      break;
    case "Age":
      allStats = getAllPlayersAge();
      break;
  }

  const attribute = stat;
  const average = ss.average(allStats).toFixed(2);
  const mean = ss.mean(allStats).toFixed(2);
  const mode = ss.mode(allStats).toFixed(2);
  const geometricMean = ss.geometricMean(allStats);
  const rootMeanSquare = ss.rootMeanSquare(allStats).toFixed(2);
  const stdv = ss.standardDeviation(allStats).toFixed(2);
  const q1 = ss.quantile(allStats, 0.25).toFixed(2);
  const q3 = ss.quantile(allStats, 0.75).toFixed(2);
  const iqr = ss.interquartileRange(allStats).toFixed(2);
  const variance = ss.variance(allStats).toFixed(2);
  const meanAbsoluteDeviation = ss.medianAbsoluteDeviation(allStats).toFixed(2);
  const quarterDeviation = (iqr / 2).toFixed(2);
  const coefficientOfVariation = ss.coefficientOfVariation(allStats).toFixed(2);
  const kurtosis = ss.sampleKurtosis(allStats).toFixed(2);
  const skewness = ss.sampleSkewness(allStats).toFixed(2);
  const quantity = allStats.length;

  return {
    attribute,
    average,
    mean,
    mode,
    geometricMean,
    rootMeanSquare,
    stdv,
    q1,
    q3,
    iqr,
    variance,
    meanAbsoluteDeviation,
    quarterDeviation,
    coefficientOfVariation,
    kurtosis,
    skewness,
    quantity,
  };
}
