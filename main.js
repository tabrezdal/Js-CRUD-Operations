var totalRecords = 0; // created for asigning id to new records
let userData;


window.addEventListener("load", function () {

    // Data
    function getData() {
        const url = "http://localhost:3000/users";

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                userData = result;
                loadData(userData); // Call loadData here
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    // loads data into table
    getData();
})


// Function to Load Records into table
function loadData(data) {

    let tableData = "";

    if (data.length !== 0) {
        document.querySelector(".table-container").classList.replace("hide", "show");

        data.map(item => {
            tableData +=
                `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.age}</td>
            <td>
                <button class="update" onclick="updateHandler(${item.id})">Update</button>
                <button class="delete" onclick="deleteHandler(${item.id})">Delete</button>
            </td>
        </tr>`

        });
        document.querySelector(".no-data").classList.replace("show", "hide");
    } else {
        document.querySelector(".table-container").classList.replace("show", "hide");
        document.querySelector(".no-data").classList.replace("hide", "show");
    }

    // console.log("tableData::", tableData)

    const tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = tableData;

    // set totalRecords
    totalRecords = userData.length;
    // console.log("Total Records::", totalRecords)
}


// Function to Create New Records
function createRecord(event) {

    event.preventDefault(); // Prevent form submission

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let age = document.querySelector("#age").value;

    if (name !== "" && email !== "" && (age > 0 && age < 100)) {

        let randomId = Math.floor(Math.random() * 90) + 10;
        // console.log("randomId", randomId)

        let id = String(randomId);

        // console.log("Total Records::", totalRecords)

        let newRecord = {
            id,
            name,
            email,
            age
        }

        const createUrl = `http://localhost:3000/users/`;
        fetch(createUrl, { 
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })

        // console.log("newRecord",newRecord)
        // userData.push(newRecord);

        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#age").value = "";
        loadData(userData);

        // console.log("userData::", userData);
    } else {
        let createForm = document.querySelector(".forms-container");

        createForm.innerHTML += `<p class="error create-form-error">Please fill the form properly!</p>`

        setTimeout(() => {
            let error = document.querySelector(".create-form-error");
            error.remove();
        }, 3000)
    }

    //    console.log("After Create totalRecords::", totalRecords)
};


// Function to Open Update Form and populate values from Records
function updateHandler(currentID) {
    currentID = Number(currentID);
    
    // Find the user data by id
    const user = userData.find(user => Number(user.id) === currentID);

    if (user) {
        document.querySelector(".create-form").classList.replace("show", "hide");
        document.querySelector(".update-form").classList.replace("hide", "show");

        document.querySelector("#uid").value = user.id;
        document.querySelector("#uname").value = user.name;
        document.querySelector("#uemail").value = user.email;
        document.querySelector("#uage").value = user.age;
    } else {
        console.error(`User with ID ${currentID} not found`);
    }
}


// Function to Udpate Existing Records
function updateRecord(event) {
    event.preventDefault(); // Prevent form submission

    let name = document.querySelector("#uname").value;
    let email = document.querySelector("#uemail").value;
    let age = document.querySelector("#uage").value;
    let id = Number(document.querySelector("#uid").value);

    if (name !== "" && email !== "" && (age > 0 && age < 100)) {
        let updatedValues = {
            id,
            name,
            email,
            age
        }

        const updateUrl = `http://localhost:3000/users/${id}`;
        fetch(updateUrl, { 
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedValues)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const index = userData.findIndex(user => Number(user.id) === id);
            if (index !== -1) {
                loadData(userData);
            }
        })
        .catch(error => console.error('Error updating data:', error));

        document.querySelector(".create-form").classList.replace("hide", "show");
        document.querySelector(".update-form").classList.replace("show", "hide");

        document.querySelector("#uid").value = "";
        document.querySelector("#uname").value = "";
        document.querySelector("#uemail").value = "";
        document.querySelector("#uage").value = "";
    } else {
        let createForm = document.querySelector(".forms-container");

        createForm.innerHTML += `<p class="error create-form-error">Please fill the form properly!</p>`

        setTimeout(() => {
            let error = document.querySelector(".create-form-error");
            error.remove();
        }, 3000);
    }
}


// Function to Delete Records
function deleteHandler(currentID) {
    // Convert currentID to a number if necessary
    const idToDelete = Number(currentID);

    const delUrl = `http://localhost:3000/users/${idToDelete}`;

    // console.log("delUrl::", delUrl);

    fetch(delUrl, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // console.log("userData::",userData)
            loadData(userData);
        })
        .catch(error => console.error('Error deleting data:', error));
}
