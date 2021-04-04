/**
 * The type representing integers
 */
export type Int = number & {__int__: void};

export function roundToInt(num: number): Int {
  return Math.round(num) as Int;
}

export function toInt(value: string): Int {
  return Number.parseInt(value) as Int;
};

export function checkIsInt(num: number): num is Int {
  return  num % 1 === 0
};

export function assertAsInt(num: number): Int {

  try {
    
    if (checkIsInt(num)) {
      return num;
    }

  } catch (err) {
    throw new Error(`Invalid Int value (error): ${num}`);
  }

  throw new Error(`Invalid Int value: ${num}`);
};