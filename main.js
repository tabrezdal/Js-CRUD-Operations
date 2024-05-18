window.addEventListener("load", function(){
    // loads data into table
    loadData();
})


var totalRecords = 0;   // created for asigning id to new records

// Data
let userData = [
    {
        "id": 1,
        "name": "Tabrez",
        "email": "tabrez@tz.com",
        "age": "29"
    },
    {
        "id": 2,
        "name": "Shahnawaz",
        "email": "shahnawaz@sd.com",
        "age": "25"
    }
]


function loadData () {

    let tableData = "";

    userData.map(item => {
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

    // console.log("tableData::", tableData)
        
    const tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = tableData;
}



function createRecord(event){
 
    event.preventDefault(); // Prevent form submission
    
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let age = document.querySelector("#age").value;
    
   if(name !=="" && email !=="" && (age > 0 && age < 100)){
        let id = ++totalRecords;

        let newRecord = {id, name, email, age}

        console.log("newRecord",newRecord)
        userData.push(newRecord);

        name.value = "";
        email.value = "";
        age.value = "";
        loadData();
   }
   else{
       let createForm = document.querySelector(".forms-container");

       createForm.innerHTML +=`<p class="error create-form-error">Please fill the form properly!</p>`

       setTimeout(()=> {
           let error = document.querySelector(".create-form-error");
           error.remove();
       },3000)
   }
};



function updateHandler(id){
    console.log("update function called from record ", id);
    document.querySelector(".create-form").classList.replace("show", "hide");
    document.querySelector(".update-form").classList.replace("hide", "show");
}


function deleteHandler(id){
    console.log("delete function called from record ", id);
}