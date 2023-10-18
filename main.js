//TO MAKE THE APP VANISH AND THE FORM OPEN
const app = document.querySelector(".app");
const addNew = document.getElementById("addNew");
const taskForm = document.getElementById("task-form");

//TO SUMBIT THE FORM AND CREATE THE TASK
const taskTitle = document.getElementById("task-title");
const dueDate = document.getElementById("date");
const taskDescp = document.getElementById("descp");

const addTask = document.getElementById("add-task");
const feedback = document.querySelector(".feedback");

const tasks = document.getElementById("tasks");
const tasksArray = [];

//TO CLOSE FORM IF NOT NEEDED
const closeForm = document.getElementById("close-form");

//TO UPDATE A TASK
const tasksContainer = document.getElementById("tasks");

//TO DELETE A TASK
const deleteForm = document.getElementById("delete-btn");

//INITIALLY MAKING THE FORM VANISH
document.addEventListener("DOMContentLoaded", () => {
  taskForm.style.display = "none";

  //TO OPEN THE TASK FORM
  addNew.addEventListener("click", () => {
    app.style.display = "none";
    taskForm.style.transition = "all ease-in 5s";
    taskForm.style.display = "block";
  });

  //TO CREATE A NEW TASK AND APPEND IT
  addTask.addEventListener("click", () => {
    newTask();
  });

  //ADDING TO ARRAY FOR FUTURE USE
  let addArray = () => {
    const taskObj = {
      name: taskTitle.value,
      due_Date: dueDate.value,
      description: taskDescp.value,
      id: tasksArray.length + 1,
    };

    tasksArray.push(taskObj);
  };

  let newTask = () => {
    //DECLARE VARIABLES TO HOLD OUR INPUTS
    let titleTask = taskTitle.value;
    let dateDue = dueDate.value;
    let descpTask = taskDescp.value;

    //SET UP ERROR MESSAGE
    if (titleTask === "" || dateDue === "" || descpTask.value === "") {
      feedback.style.display = "block";
      feedback.innerHTML = `<p>Field cannot be empty</p>`;

      setTimeout(() => {
        feedback.style.display = "none";
      }, 2500);
      return; //to leave the function completely
    } else {
      //PUSH NAME INTO OBJECT & ARRAY
      addArray();
      console.log(tasksArray);

      taskForm.style.display = "none";
      app.style.display = "block";
    }

    //INSERT THE TASK TAB

    const div = document.createElement("div");
    div.innerHTML = `<span class="title">${titleTask}</span>
          <span class="date">${dateDue}</span>
          <p>${descpTask}</p>

           <span class="options">
            <img src="../YT-CRUD/icons8-edit-24.png" alt="edit-icon" id="update-btn"  class="update-button"/>
            <img src="../YT-CRUD/icons8-delete-24.png" alt="delete-icon" id="delete-btn" class="delete-button" />
          </span>`;
    div.className = "task";

    tasks.appendChild(div);
    console.log(div.innerHTML);

    //RESET THE FORM
    taskTitle.value = "";
    dueDate.value = "";
    taskDescp.value = "";
  };

  //TO CLOSE THE FORM IF NOT NEEDED
  closeForm.addEventListener("click", () => {
    taskForm.style.display = "none";
    app.style.display = "block";
  });

  let shouldUpdate = false;
  // Add an event listener to the tasks container
  tasksContainer.addEventListener("click", (event) => {
    // Check if the clicked element has the "update-button" class
    if (event.target.classList.contains("update-button")) {
      // Retrieve the index of the task that was clicked
      const taskIndex = Array.from(
        event.target.closest(".task").parentElement.children
      ).indexOf(event.target.closest(".task"));

      // Use the taskIndex to access the correct task data in tasksArray
      const task = tasksArray[taskIndex];

      // Show the form for updating
      taskForm.style.display = "block";
      app.style.display = "none";

      // Populate the form with the task details
      document.getElementById("task-title").value = task.name;
      document.getElementById("date").value = task.due_Date;
      document.getElementById("descp").value = task.description;

      // Add an event listener to the close button within the form
      document.getElementById("close-form").addEventListener("click", () => {
        shouldUpdate = false;
        // Close the form without deleting the task
        taskForm.style.display = "none";
        app.style.display = "block";
      });

      // Add an event listener to the update button within the form
      document.getElementById("add-task").addEventListener("click", () => {
        shouldUpdate = true;
        // Check if the user wants to update the task
        if (shouldUpdate) {
          // Delete the task since the user wants to update it
          event.target.parentElement.parentElement.remove();
        } else {
          // Close the form without deleting the task
          taskForm.style.display = "none";
          app.style.display = "block";
        }
      });
    }

    //TO DELETE A TASK
    // Add an event listener to the tasks container
    if (event.target.classList.contains("delete-button")) {
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        // User clicked "OK" (Yes), delete the task
        event.target.closest(".task").remove();
      }
    }
  });
});
