const raft = (numberGoats, numberCourses, goatsSizes = []) => {
  if (numberGoats !== goatsSizes.length) return 0;

  let minCapacity = 0;
  const totalWeight = calculateTotalGoatWeight(goatsSizes);
  const avgWeightPerCourse = Math.round(totalWeight / numberCourses);

  minCapacity = avgWeightPerCourse;
  let isFinished = false;

  while (!isFinished) {
    let goatsLeft = goatsSizes;

    let coursesGoats = [];
    for (let i = 0; i < numberCourses; i++) {
      const heaviestGoatWeight = getHeaviestGoat(goatsLeft);
      goatsLeft = removeGoat(goatsLeft, heaviestGoatWeight);
      coursesGoats = [...coursesGoats, [heaviestGoatWeight]];
    }
    // console.log(coursesGoats);

    for (let i = 0; i < coursesGoats.length; i++) {
      let weight = coursesGoats[i][0];
      let isFull = false;
      while (!isFull) {
        const closest = findClosest(goatsLeft, minCapacity - weight);
        // console.log(closest);
        if (closest > 0 && minCapacity >= weight + closest) {
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

    if (calculateTotalGoatWeight(goatsLeft) !== 0) {
      minCapacity++;
    } else {
      isFinished = true;
    }
  }

  return minCapacity;
};

const calculateTotalGoatWeight = (goats = []) => {
  let weight = 0;
  for (let i = 0; i < goats.length; i++) {
    weight += goats[i];
  }
  return weight;
};

const getHeaviestGoat = (goats = []) => {
  let heaviestGoatWeight = 0;
  for (let i = 0; i < goats.length; i++) {
    if (goats[i] > heaviestGoatWeight) {
      heaviestGoatWeight = goats[i];
    }
  }
  return heaviestGoatWeight;
};

const removeGoat = (goats = [], weight) => {
  const newGoats = [];
  goats.forEach((g) => {
    if (g !== weight) newGoats.push(g);
  });
  return newGoats;
};

const findClosest = (array = [], value) => {
  if (array.length === 0) return 0;
  const sorted = array.sort(
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
