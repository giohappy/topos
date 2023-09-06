import { type UserAPI } from "./API";
export {};

declare global {
  interface Array<T> {
    add(amount: number): number[];
    sub(amount: number): number[];
    mult(amount: number): number[];
    division(amount: number): number[];
    palindrome(): T[];
    random(index: number): T;
    rand(index: number): T;
    degrade(amount: number): T;
    repeatAll(amount: number): T;
    repeatPair(amount: number): T;
    repeatOdd(amount: number): T;
    beat(): T;
    bar(): T;
    pulse(): T;
    pick(): T;
    loop(index: number): T;
    div(division: number): T;
    shuffle(): this;
    rotate(steps: number): this;
    unique(): this;
    in(value: T): boolean;
    square(): number[];
    sqrt(): number[];
  }
}

export const makeArrayExtensions = (api: UserAPI) => {
  Array.prototype.in = function <T>(this: T[], value: T): boolean {
    return this.includes(value);
  };

  Array.prototype.square = function (): number[] {
    /**
     * @returns New array with squared values.
     */
    return this.map((x: number) => x * x);
  };

  Array.prototype.sqrt = function (): number[] {
    /**
     * @returns New array with square roots of values. Throws if any element is negative.
     */
    if (this.some((x) => x < 0))
      throw new Error("Cannot take square root of negative number");
    return this.map((x: number) => Math.sqrt(x));
  };

  Array.prototype.add = function (amount: number): number[] {
    /**
     * @param amount - The value to add to each element in the array.
     * @returns New array with added values.
     */
    return this.map((x: number) => x + amount);
  };

  Array.prototype.sub = function (amount: number): number[] {
    /**
     * @param amount - The value to subtract from each element in the array.
     * @returns New array with subtracted values.
     */
    return this.map((x: number) => x - amount);
  };

  Array.prototype.mult = function (amount: number): number[] {
    /**
     * @param amount - The value to multiply with each element in the array.
     * @returns New array with multiplied values.
     */
    return this.map((x: number) => x * amount);
  };

  Array.prototype.division = function (amount: number): number[] {
    /**
     * @param amount - The value to divide each element in the array by.
     * @returns New array with divided values. Throws if division by zero.
     */
    if (amount === 0) throw new Error("Division by zero");
    return this.map((x: number) => x / amount);
  };

  Array.prototype.pick = function () {
    /**
     * Returns a random element from an array.
     *
     * @param array - The array of values to pick from
     */
    return this[Math.floor(api.randomGen() * this.length)];
  };

  Array.prototype.beat = function (beat: number = 1) {
    /**
     * Returns the element corresponding to the current beat
     *
     * @returns The element corresponding to the current beat
     */
    return this[(api.app.clock.beats_since_origin  / beat) % this.length];
  };

  Array.prototype.bar = function () {
    /**
     * Returns an element from an array based on the current bar.
     *
     * @param array - The array of values to pick from
     */
    return this[api.app.clock.time_position.bar % this.length];
  };

  Array.prototype.pulse = function () {
    /**
     * Returns an element from an array based on the current pulse.
     *
     * @param array - The array of values to pick from
     */
    return this[api.app.clock.time_position.pulse % this.length];
  };

  Array.prototype.div = function (divisor: number) {
    const chunk_size = divisor; // Get the first argument (chunk size)
    const timepos = api.app.clock.pulses_since_origin;
    const slice_count = Math.floor(
      timepos / Math.floor(chunk_size * api.ppqn())
    );
    return this[slice_count % this.length];
  };

  Array.prototype.shuffle = function () {
    /**
     * Shuffles the array in place.
     *
     * @returns The shuffled array
     */
    let currentIndex = this.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this[currentIndex], this[randomIndex]] = [
        this[randomIndex],
        this[currentIndex],
      ];
    }
    return this;
  };

  Array.prototype.rotate = function (steps: number) {
    /**
     * Rotates the array in place.
     *
     * @param steps - The number of steps to rotate the array by
     * @returns The rotated array
     */
    const length = this.length;
    if (steps < 0) {
      steps = length + (steps % length);
    } else if (steps > 0) {
      steps = steps % length;
    } else {
      return this;
    }
    const rotated = this.splice(-steps, steps);
    this.unshift(...rotated);
    return this;
  };

  Array.prototype.unique = function () {
    /**
     * Removes duplicate elements from the array in place.
     *
     * @returns The array without duplicates
     */
    const seen = new Set();
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < this.length; readIndex++) {
      const value = this[readIndex];
      if (!seen.has(value)) {
        seen.add(value);
        this[writeIndex++] = value;
      }
    }
    this.length = writeIndex;
    return this;
  };

  Array.prototype.degrade = function <T>(this: T[], amount: number) {
    /**
     * Removes elements from the array at random. If the array has
     * only one element left, it will not be removed.
     *
     * @param amount - The amount of elements to remove
     * @returns The degraded array
     */
    if (amount < 0 || amount > 100) {
      throw new Error("Amount should be between 0 and 100");
    }
    if (this.length <= 1) {
      return this;
    }
    for (let i = 0; i < this.length; ) {
      const rand = Math.random() * 100;
      if (rand < amount) {
        if (this.length > 1) {
          this.splice(i, 1);
        } else {
          return this;
        }
      } else {
        i++;
      }
    }
    return this;
  };

  Array.prototype.repeatAll = function <T>(this: T[], amount: number = 1) {
    /**
     * Repeats all elements in the array n times.
     *
     * @param amount - The amount of times to repeat the elements
     * @returns The repeated array
     */
    if (amount < 1) {
      throw new Error("Amount should be at least 1");
    }
    let result = [];
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < amount; j++) {
        result.push(this[i]);
      }
    }
    this.length = 0;
    this.push(...result);
    return this;
  };

  Array.prototype.repeatPair = function <T>(this: T[], amount: number = 1) {
    /**
     * Repeats all elements in the array n times, except for the
     * elements at odd indexes.
     *
     * @param amount - The amount of times to repeat the elements
     * @returns The repeated array
     */
    if (amount < 1) {
      throw new Error("Amount should be at least 1");
    }

    let result = [];

    for (let i = 0; i < this.length; i++) {
      // If the index is even, repeat the element
      if (i % 2 === 0) {
        for (let j = 0; j < amount; j++) {
          result.push(this[i]);
        }
      } else {
        result.push(this[i]);
      }
    }

    this.length = 0;
    this.push(...result);
    return this;
  };

  Array.prototype.repeatOdd = function <T>(this: T[], amount: number = 1) {
    /**
     * Repeats all elements in the array n times, except for the
     * elements at even indexes.
     *
     * @param amount - The amount of times to repeat the elements
     * @returns The repeated array
     *
     * @remarks
     * This function is the opposite of repeatPair.
     */
    if (amount < 1) {
      throw new Error("Amount should be at least 1");
    }

    let result = [];

    for (let i = 0; i < this.length; i++) {
      // If the index is odd, repeat the element
      if (i % 2 !== 0) {
        for (let j = 0; j < amount; j++) {
          result.push(this[i]);
        }
      } else {
        result.push(this[i]);
      }
    }

    // Update the original array
    this.length = 0;
    this.push(...result);
    return this;
  };

  // @ts-ignore
  Array.prototype.palindrome = function <T>() {
    /**
     * Returns a palindrome of the array.
     *
     * @returns The palindrome of the array
     */
    let left_to_right = Array.from(this);
    let right_to_left = Array.from(this.reverse());
    return left_to_right.concat(right_to_left);
  };

  Array.prototype.loop = function (index: number) {
    /**
     * Returns an element from the array based on the index.
     * The index will wrap over the array.
     *
     * @param index - The index of the element to return
     * @returns The element at the given index
     */
    return this[index % this.length];
  };

  Array.prototype.random = function () {
    /**
     * Returns a random element from the array.
     *
     * @returns A random element from the array
     */
    return this[Math.floor(Math.random() * this.length)];
  };
  Array.prototype.rand = Array.prototype.random;
};