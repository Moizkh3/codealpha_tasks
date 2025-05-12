document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    function addTask() {
        if (inputBox.value.trim() === '') {
            alert("You must write something!");
            return;
        }

        let li = document.createElement("li");
        li.innerText = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Delete button
        span.classList.add("delete");
        li.appendChild(span);

        listContainer.appendChild(li);
        inputBox.value = ""; // Clear input field

        saveData(); // Save updated list
    }

    document.querySelector("button").addEventListener("click", addTask);

    // Event delegation for toggling and deleting tasks
    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData(); // Save the checked state
        } else if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
            saveData();
        }
    });

    // Save the list to localStorage
    function saveData() {
        let tasks = [];
        document.querySelectorAll("#list-container li").forEach(li => {
            tasks.push({
                text: li.childNodes[0].nodeValue, // Task text
                checked: li.classList.contains("checked") // Checked state
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks on page load
    function showTask() {
        let savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            let tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerText = task.text;
                if (task.checked) {
                    li.classList.add("checked");
                }

                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                span.classList.add("delete");
                li.appendChild(span);

                listContainer.appendChild(li);
            });
        }
    }

    showTask(); // Load stored tasks on refresh
});
