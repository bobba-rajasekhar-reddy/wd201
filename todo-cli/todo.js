const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

 const overdue = () => {
  const overdueTasks = [];
  all.forEach((task) => {
    if (task.deadline < today) {
      overdueTasks.push(task);
    }
  });
  return overdueTasks;
};

const dueToday = () => {
  const tasksDueToday = [];
  all.forEach((task) => {
    if (task.deadline === today) {
      tasksDueToday.push(task);
    }
  });
  return tasksDueToday;
};

const dueLater = () => {
  const tasksDueLater = [];
  all.forEach((task) => {
    if (task.deadline > today) {
      tasksDueLater.push(task);
    }
  });
  return tasksDueLater;
};

const toDisplayableList = (list) => {
  const generateOutputArray = (list, today) => {
    const taskList = [];
    list.forEach((task) => {
      if (task.deadline === today) {
        if (task.completed === true) {
          taskList.push(`[x] ${task.title}`);
        } else {
          taskList.push(`[ ] ${task.title}`);
        }
      } else {
        if (task.completed === true) {
          taskList.push(`[x] ${task.title} ${task.deadline}`);
        } else {
          taskList.push(`[ ] ${task.title} ${task.deadline}`);
        }
      }
    });
    const output = taskList.join("\n");
    return output;
  };

  return generateOutputArray(list, today);
};


  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
const overdues = todos.overdue();
const formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
const itemsDueToday = todos.dueToday();
const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
const itemsDueLater = todos.dueLater();
const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");

module.exports = todoList;
