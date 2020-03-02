export const getActiveTime = taskList => {
  const result = {
    start: Math.min(
      ...taskList
        .filter(item => item.from !== null)
        .map(item => Date.parse(item.from))
    ),
    end: Math.max(
      ...taskList
        .filter(item => item.tom !== null)
        .map(item => Date.parse(item.tom))
    )
  };

  return result.end - result.start;
};

export const getAverageAge = data => {
  return Math.floor(
    data.map(person => getAge(person.fodd_ar)).reduce((a, b) => a + b, 0) /
      data.length
  );
};

export const getAge = year => {
  return new Date().getFullYear() - Number(year);
};

export const getGender = gender => {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
};

export const getGenderDistribution = data => {
  let genders = [];
  let values = [];
  let colors = [];

  const colorsArr = {
    kvinna: "#413677",
    man: "#5e5b6b"
  };

  const map = data.reduce(
    (acc, person) => acc.set(person.kon, (acc.get(person.kon) || 0) + 1),
    new Map()
  );

  map.forEach(function(val, key) {
    colors.push(colorsArr[key]);
    genders.push(key);
    values.push(val);
  });

  return { genders, values, colors };
};

export const getOverallActivity = data => {
  const taskList = data.map(person => person.personuppdrag.uppdrag);
  const newTaskList = [].concat.apply([], taskList);

  const result = {
    start: Math.min(
      ...newTaskList
        .filter(item => item.from !== null)
        .map(item => Date.parse(item.from))
    ),
    end: Math.max(
      ...newTaskList
        .filter(item => item.tom !== null)
        .map(item => Date.parse(item.tom))
    )
  };

  return result.end - result.start;
};

export const getOverallAge = data => {
  const ageRange = data.map(person => getAge(person.fodd_ar));
  return { min: Math.min(...ageRange), max: Math.max(...ageRange) };
};

export function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const getPartyDistribution = data => {
  let parties = [];
  let values = [];
  let colors = [];

  const colorsArr = {
    "-": "#919191",
    C: "#026D41",
    KD: "#0073CA",
    L: "#0168B4",
    M: "#3C2CFF",
    MP: "#0FAA4C",
    S: "#FF3845",
    SD: "#d8d800",
    V: "#FF0000"
  };

  const map = data
    .sort(sortBy("parti"))
    .reduce(
      (acc, person) => acc.set(person.parti, (acc.get(person.parti) || 0) + 1),
      new Map()
    );

  map.forEach((val, key) => {
    colors.push(colorsArr[key]);
    parties.push(key);
    values.push(val);
  });

  return { parties, values, colors };
};

export const sortBy = key => {
  return (a, b) => {
    a = a[key];
    b = b[key];
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  };
};
