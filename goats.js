const raft = (numberGoats, numberCourses, goatsSizes = []) => {
  if (numberGoats !== goatsSizes.length) return 0;

  let minCapacity = 0;
  const totalWeight = calculateTotalGoatWeight(goatsSizes);
  const avgWeightPerCourse = Math.round(totalWeight / numberCourses);

  minCapacity = avgWeightPerCourse;
  let isFinished = false;

  while (!isFinished) {
    let goatsLeft = goatsSizes;
    let currentWeight = 0;
    const heaviestGoatWeight = getHeaviestGoat(goatsLeft);
    currentWeight += heaviestGoatWeight;
    goatsLeft = removeGoat(goatsLeft, heaviestGoatWeight);

    const secondheaviestGoatWeight = getHeaviestGoat(goatsLeft);
    goatsLeft = removeGoat(goatsLeft, secondheaviestGoatWeight);

    while (minCapacity > currentWeight) {
      const closest = findClosest(goatsLeft, minCapacity - currentWeight);
      console.log(closest);
      if (closest + currentWeight <= minCapacity) {
        currentWeight += closest;
        goatsLeft = removeGoat(goatsLeft, closest);
      }
      // if(minCapacity >= (currentWeight + goatsLeft[j])){
      //     currentWeight += goatsLeft[j];
      //     goatsLeft = removeGoat(goatsLeft, goatsLeft[j])
      // }
    }

    if (calculateTotalGoatWeight(goatsLeft) > minCapacity) {
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
  return array.sort((a, b) => Math.abs(value - a) - Math.abs(value - b))[0];
};

console.log(raft(6, 2, [26, 7, 10, 30, 5, 4]));
// console.log(raft(6,2,[4,8,15,16,23,42]))
// console.log(raft(15,3,[666,42,7,13,400,511,600,200,202,111,313,94,280,72,42]))
