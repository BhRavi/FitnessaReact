import { estimatedCalorieBurnCalculator } from "../../src/shared/functions";

describe('estimatedCalorieBurnCalculator', () => {
  it('should calculate the estimated calorie burn for running', () => {
    const activity = 'running';
    const weightKg = 70;
    const activityTimeInMin = 30;
    const expectedCalorieBurn = 199.5; // 0.095 * 30 * 70

    const result = estimatedCalorieBurnCalculator(activity, weightKg, activityTimeInMin);

    expect(result).toBeCloseTo(expectedCalorieBurn);
  });

  it('should calculate the estimated calorie burn for walking', () => {
    const activity = 'walking';
    const weightKg = 60;
    const activityTimeInMin = 45;
    const expectedCalorieBurn = 97.2; // 0.036 * 45 * 60

    const result = estimatedCalorieBurnCalculator(activity, weightKg, activityTimeInMin);

    expect(result).toBeCloseTo(expectedCalorieBurn);
  });

  it('should calculate the estimated calorie burn for swimming', () => {
    const activity = 'swimming';
    const weightKg = 80;
    const activityTimeInMin = 60;
    const expectedCalorieBurn = 316.8; // 0.066 * 60 * 80

    const result = estimatedCalorieBurnCalculator(activity, weightKg, activityTimeInMin);

    expect(result).toBeCloseTo(expectedCalorieBurn);
  });
});