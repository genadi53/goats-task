/**
 * @param numberGoats integers showing the number of goats
 * @param numberCourses integers showing the max number of courses
 * @param goatsSizes array of integersfor each goats'size
 * @returns sum of all the integers in the array
 */
const raft = (numberGoats, numberCourses, goatsSizes = []) => {
  if (numberGoats !== goatsSizes.length) return 0;

  // Calculate the total weight and then get the average weight per course
  // because that is close number to the minimum, for a start
  let capacity = 0;
  const totalWeight = calculateTotalGoatWeight(goatsSizes);
  const avgWeightPerCourse = Math.round(totalWeight / numberCourses);

  capacity = avgWeightPerCourse;
  let isFinished = false;

  while (!isFinished) {
    let goatsLeft = goatsSizes;

    // With this loop, we get the biggest goats for each course,
    // and  the remove them from the others
    let coursesGoats = [];
    for (let i = 0; i < numberCourses; i++) {
      const heaviestGoatWeight = getHeaviestGoat(goatsLeft);
      goatsLeft = removeGoat(goatsLeft, heaviestGoatWeight);
      coursesGoats = [...coursesGoats, [heaviestGoatWeight]];
    }

    // start a loop that gets the weight of the biggest goat and then
    // loop through until its filled the coursesGoats with weight closest to the capacity
    for (let i = 0; i < coursesGoats.length; i++) {
      let weight = coursesGoats[i][0];
      let isFull = false;
      while (!isFull) {
        const closest = findClosest(goatsLeft, capacity - weight);
        // console.log(closest);
        if (closest > 0 && capacity >= weight + closest) {
          coursesGoats[i].push(closest);
          goatsLeft = removeGoat(goatsLeft, closest);
          weight += closest;
        } else {
          isFull = true;
        }
      }
      // console.log(coursesGoats[i]);
      // console.log(goatsLeft);
    }
    console.log(coursesGoats);

    // Check if there are goats that are left, and if there are the capacity is increased
    // if there are not the loop end and we have found the minimum capacity needed
    if (calculateTotalGoatWeight(goatsLeft) !== 0) {
      capacity++;
    } else {
      isFinished = true;
    }
  }

  return capacity;
};

/**
 * @param goats array of integers
 * @returns sum of all the integers in the array
 */
const calculateTotalGoatWeight = (goats = []) => {
  let totalWeight = 0;
  goats.forEach((goat) => (totalWeight += goat));
  return totalWeight;
};

/**
 * @param goats array of integers
 * @returns the highest integer in the array
 */
const getHeaviestGoat = (goats = []) => {
  let heaviestGoatWeight = 0;
  for (let i = 0; i < goats.length; i++) {
    if (goats[i] > heaviestGoatWeight) {
      heaviestGoatWeight = goats[i];
    }
  }
  return heaviestGoatWeight;
};

/**
 * @param goats array of integers
 * @param weight integer indicating the value to be removed
 * @returns new array without the removed integer
 */
const removeGoat = (goats = [], weight) => {
  const newGoats = [];
  goats.forEach((g) => {
    if (g !== weight) newGoats.push(g);
  });
  return newGoats;
};

/**
 * @param goats array of integers
 * @param value integer that is used for getting the closest smaller number
 * @returns closest number that is smaller than the passed value
 */
const findClosest = (goats = [], value) => {
  if (goats.length === 0) return 0;
  const sorted = goats.sort(
    (a, b) => Math.abs(value - a) - Math.abs(value - b)
  );
  return sorted.find((elm) => elm <= value);
};

console.log(raft(6, 2, [26, 7, 10, 30, 5, 4]));
console.log("**********************************");
console.log(raft(6, 2, [4, 8, 15, 16, 23, 42]));
console.log("**********************************");
console.log(
  raft(
    15,
    3,
    [666, 42, 7, 13, 400, 511, 600, 200, 202, 111, 313, 94, 280, 72, 42]
  )
);
