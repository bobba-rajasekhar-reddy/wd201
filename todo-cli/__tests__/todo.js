/* eslint-disable indent */
/* eslint-disable no-undef */

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();



describe("todo test", () => {
  beforeAll(() => {
    add({
        title: "Finish Yesterday's Task",
        completed: false,
        dueDate: yesterday,
      });
      
      add({
        title: "Complete Today's Assignment",
        completed: false,
        dueDate: today,
      });
      
      add({
        title: "Prepare for Tomorrow's Meeting",
        completed: false,
        dueDate: tomorrow,
      });
      
  });
  test("should add new todo", () => {
    expect(all.length).toBe(3);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue", () => {
    const result = overdue();

    expect(result.length).toBe(1);
  });
  test("dueToday", () => {
    const result = dueToday();

    expect(result.length).toBe(1);
  });
  test("dueLater", () => {
    const result = dueLater();

    expect(result.length).toBe(1);
  });
});



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
