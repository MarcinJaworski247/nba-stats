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
