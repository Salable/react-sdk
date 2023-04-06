/**
 * Transform unit function appends px to unit value if it's missing as a suffix
 *
 * @param defaultUnit
 * @param unit
 * @param multiply
 * @returns string
 */
export const transformUnit = (defaultUnit: string, unit?: string, multiply = 1) => {
  const splitSpacingUnit = unit
    ? unit.match(/^([+-]?\d*\.?\d+)(.*)$/)
    : defaultUnit?.match(/^([+-]?\d*\.?\d+)(.*)$/);

  const newSpacingUnit = splitSpacingUnit?.length
    ? `${Number(splitSpacingUnit[1]) * multiply}${splitSpacingUnit[2] || 'px'}`
    : defaultUnit;

  return newSpacingUnit;
};
