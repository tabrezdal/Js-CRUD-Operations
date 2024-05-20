var totalRecords = 0; // created for asigning id to new records
let userData;



window.addEventListener("load", function () {

    // Data
    function getData(){
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
                <button class="update" onclick="updateHandler('${item.id}')">Update</button>
                <button class="delete" onclick="deleteHandler('${item.id}')">Delete</button>
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
        let id = totalRecords;

        // console.log("Total Records::", totalRecords)

        let newRecord = {
            id,
            name,
            email,
            age
        }

        // console.log("newRecord",newRecord)
        userData.push(newRecord);

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

    // console.log("currentID from Function Call:::",currentID)

    // console.log("update function called from record ", currentID);
    document.querySelector(".create-form").classList.replace("show", "hide");
    document.querySelector(".update-form").classList.replace("hide", "show");

    // console.log("userData name::", userData[currentID].name)

    document.querySelector("#uid").value = userData[currentID].id;
    document.querySelector("#uname").value = userData[currentID].name;
    document.querySelector("#uemail").value = userData[currentID].email;
    document.querySelector("#uage").value = userData[currentID].age;
}


// Function to Udpate Existing Records
function updateRecord(event) {

    event.preventDefault(); // Prevent form submission

    // console.table("before update userData::", userData);

    let name = document.querySelector("#uname").value;
    let email = document.querySelector("#uemail").value;
    let age = document.querySelector("#uage").value;
    let id = Number(document.querySelector("#uid").value);
    // let filteredUserData = userData.filter((item) => item !== uid);

    if (name !== "" && email !== "" && (age > 0 && age < 100)) {
        let updatedValues = {
            id,
            name,
            email,
            age
        }

        // console.log("updatedValues",updatedValues)

        userData[id] = updatedValues;
        document.querySelector(".create-form").classList.replace("hide", "show");
        document.querySelector(".update-form").classList.replace("show", "hide");

        // console.table(userData);

        document.querySelector("#uid").value = "";
        document.querySelector("#uname").value = "";
        document.querySelector("#uemail").value = "";
        document.querySelector("#uage").value = "";
        loadData(userData);
    } else {
        let createForm = document.querySelector(".forms-container");

        createForm.innerHTML += `<p class="error create-form-error">Please fill the form properly!</p>`

        setTimeout(() => {
            let error = document.querySelector(".create-form-error");
            error.remove();
        }, 3000)
    }
}

// Function to Delete Records
function deleteHandler(currentID) {
    // console.log("delete function called from record ID is:: ", currentID);

    // Convert currentID to a number if necessary
    const idToDelete = Number(currentID);

    // Filtering out the element with the specified id
    userData = userData.filter(ele => ele.id !== idToDelete);

    // console.log("delete function called from record now::")
    // console.table(userData);
    loadData(userData);
}