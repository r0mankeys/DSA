/* Goal: Create `Comparator` class to handle all compare methods,
         these compare methods should be able to compare two values,
         and tell if they are:

         - equal
         - first is greater than next
         - first is less than next
         - first is greater than or equal to next
         - first is less than or equal to next

         these values will be type agnostic, so the user of the class 
         should be able to input their own custom compare function
         that must return 0 if the comparison returns as excpected
         or -1 or 1 for other cases

         e.g. 
         - lengths of data types
         - indices of data types 
*/

/*
    I am going to strongly type the optional argument for the comparator,
    it wil be a custom compare function that allows the user of the program
    to define checking for things that are not just numbers (that is why the
    parametrs for the methods are `any`)

    The actual compare function will take in any value to compare and a strongly typed
    comparator, this type will be decided when making instances of the function type,
    allowing specific functions that can be tested while still giving flexibility

    The result of the compare function should be one of four values, 0 for equal, 1 for greater than
    (if applicable), -1 for less than (if applicable), and null for a final case the programmer can decide 
*/

export type CompareFunctionResult = 0 | 1 | -1 | null;
export type CompareFunction<T> = (
  value: any,
  comparator: T
) => CompareFunctionResult;

export class Comparator<T> {
  compare: Function;
  constructor(compareFunction: CompareFunction<T> | undefined = undefined) {
    this.compare = compareFunction || Comparator.baseCompareFunction;
  }
  static baseCompareFunction(first: any, second: any) {
    /*
        PROGRAM (first_value, second_value)
            Pre: first_value and second_value are the values to be compared
            Post: 0 IF equal, -1 IF first_value less than second_value, 1 IF first_value is more than second_value

           IF firstValue === second_value
            THEN return 0
           ELSE IF firstValue > second_value
            THEN return 1
           ElSE IF firstValue < second_value
            THEN return -1
           ENDIF 
        END
        */
    if (first === second) return 0;
    return first > second ? 1 : -1;
  }
  isEqual(first: any, second: T) {
    return this.compare(first, second) === 0;
  }
  lessThan(first: any, second: T) {
    return this.compare(first, second) === -1;
  }
  greaterThan(first: any, second: T) {
    return this.compare(first, second) === 1;
  }
  lessThanOrEqual(first: any, second: T) {
    return this.lessThan(first, second) || this.isEqual(first, second);
  }
  greaterThanOrEqual(first: any, second: T) {
    return this.greaterThan(first, second) || this.isEqual(first, second);
  }
}
