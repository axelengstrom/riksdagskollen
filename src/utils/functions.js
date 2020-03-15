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

export const getAge = year => {
  return new Date().getFullYear() - Number(year);
};

export const getGender = gender => {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
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

export const sortBy = key => {
  return (a, b) => {
    a = a[key];
    b = b[key];
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  };
};
