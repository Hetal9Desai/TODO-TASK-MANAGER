let tasks = [];

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
  displayTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addOrUpdateTask() {
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const status = document.getElementById("status").value;
  const taskId = document.getElementById("taskId").value.trim();

  if (!title || !desc) {
    alert("Both title and description are required!");
    return;
  }

  if (taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].desc = desc;
      tasks[taskIndex].status = status;
    }

    document.querySelector("button").innerText = "Add Task";
    document.querySelector("h5").innerText = "Add Task";
  } else {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      desc,
      status,
    };
    tasks.push(newTask);
  }

  saveTasks();
  resetForm();
  displayTasks();
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("status").value = "todo";
  document.getElementById("taskId").value = "";
  document.querySelector("button").innerText = "Add Task";
  document.querySelector("h5").innerText = "Add Task";

  disableStatusOptions();
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    document.getElementById("title").value = task.title;
    document.getElementById("desc").value = task.desc;
    document.getElementById("status").value = task.status;
    document.getElementById("taskId").value = task.id;
    document.querySelector("button").innerText = "Update Task";
    document.querySelector("h5").innerText = "Edit Task";

    enableStatusOptions();
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("status").value = "todo";
  document.getElementById("taskId").value = "";
  document.querySelector("button").innerText = "Add Task";
  document.querySelector("h5").innerText = "Add Task";

  disableStatusOptions();
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    document.getElementById("title").value = task.title;
    document.getElementById("desc").value = task.desc;
    document.getElementById("status").value = task.status;
    document.getElementById("taskId").value = task.id;
    document.querySelector("button").innerText = "Update Task";
    document.querySelector("h5").innerText = "Edit Title";

    enableStatusOptions();
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("status").value = "todo";
  document.getElementById("taskId").value = "";
  document.querySelector("button").innerText = "Add Task";
  document.querySelector("h5").innerText = "Add Task";

  disableStatusOptions();
}

function disableStatusOptions() {
  document
    .getElementById("status")
    .querySelector('option[value="inprogress"]').disabled = true;
  document
    .getElementById("status")
    .querySelector('option[value="done"]').disabled = true;
}

function enableStatusOptions() {
  document
    .getElementById("status")
    .querySelector('option[value="inprogress"]').disabled = false;
  document
    .getElementById("status")
    .querySelector('option[value="done"]').disabled = false;
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filterTitle = document
    .getElementById("filterTitle")
    .value.toLowerCase();
  const filterDesc = document.getElementById("filterDesc").value.toLowerCase();
  const filterTitleDesc = document
    .getElementById("filterTitleDesc")
    .value.toLowerCase();
  const filterStatus = document.getElementById("filterStatus").value;

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(filterTitle);
    const descMatch = task.desc.toLowerCase().includes(filterDesc);
    const titleDescMatch =
      task.title.toLowerCase().includes(filterTitleDesc) ||
      task.desc.toLowerCase().includes(filterTitleDesc);
    const statusMatch = filterStatus === "" || task.status === filterStatus;

    return titleMatch && descMatch && titleDescMatch && statusMatch;
  });

  if (filteredTasks.length === 0) {
    let message = "No tasks found.";

    if (filterStatus === "todo") {
      message = "No tasks To-Do found.";
    } else if (filterStatus === "inprogress") {
      message = "No tasks In Progress found.";
    } else if (filterStatus === "done") {
      message = "No completed tasks found.";
    }

    taskList.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center">
          ${message}
        </div>
      </div>
    `;
  } else {
    filteredTasks.forEach((task) => {
      taskList.innerHTML += `
        <div class="col-md-4">
            <div class="card ${getStatusClass(task.status)} shadow">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.desc}</p>
                    <select class="form-select form-select-sm mb-2" onchange="updateTaskStatus('${
                      task.id
                    }', this.value)">
                        <option value="todo" ${
                          task.status === "todo" ? "selected" : ""
                        }>To Do</option>
                        <option value="inprogress" ${
                          task.status === "inprogress" ? "selected" : ""
                        }>In Progress</option>
                        <option value="done" ${
                          task.status === "done" ? "selected" : ""
                        }>Done</option>
                    </select>
                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-warning btn-sm" onclick="editTask('${
                          task.id
                        }')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask('${
                          task.id
                        }')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    });
  }
}

function filterTasks() {
  displayTasks();
}

function updateTaskStatus(id, newStatus) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = newStatus;
    saveTasks();
    displayTasks();
  }
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    document.getElementById("title").value = task.title;
    document.getElementById("desc").value = task.desc;
    document.getElementById("status").value = task.status;
    document.getElementById("taskId").value = task.id;
    document.querySelector("button").innerText = "Update Task";
    document.querySelector("h5").innerText = "Update Task";

    enableStatusOptions();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  displayTasks();
}

function getStatusClass(status) {
  return status === "todo"
    ? "bg-danger bg-opacity-25 border border-danger"
    : status === "inprogress"
    ? "bg-warning bg-opacity-25 border border-warning"
    : "bg-success bg-opacity-25 border border-success";
}

document.addEventListener("DOMContentLoaded", loadTasks);
