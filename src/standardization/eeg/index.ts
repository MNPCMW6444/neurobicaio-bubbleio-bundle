enum FrequencyBandsPoints {
  minTheta = 4,
  minAlphaLow = 8,
  minAlphaHigh = 10,
  minBetaLow = 12.5,
  minBetaMid = 16.5,
  minBetaHigh = 21,
  minGamma = 30,
  max = 60,
}

const FrequencyBands = {
  THETA: {
    minFrequencyiInHz: FrequencyBandsPoints.minTheta,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
  },
  ALPHA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
  },
  ALPHA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
  },
  BETA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
  },
  BETA_MID: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
  },
  BETA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minGamma,
  },
  GAMMA: {
    minFrequencyiInHz: FrequencyBandsPoints.minGamma,
    maxFrequencyiInHz: FrequencyBandsPoints.max,
  },
};
