const create = document.querySelector(".create");
const form = document.querySelector(".form");
const hide = document.querySelector(".hide");
const option = document.querySelector(".options");
const table = document.querySelector("table");
const confirm = document.querySelector(".confirm");
const view = document.querySelector(".view");
const clear = document.querySelector(".clear");
const empty = document.querySelector(".empty");
let update = null;

let data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];

view.addEventListener("click", function () {
  console.log("hello");
  form.classList.add("hidden");
  option.classList.toggle("hidden");
  option.style.opacity = "1";
  option.classList.remove("hide");
  table.classList.add("hidden");
});

create.addEventListener("click", function () {
  console.log("CREATE COMMAND ACTIVATED");
  form.classList.toggle("hidden");
  if (data.length) {
    table.classList.toggle("hidden");
  }
  empty.classList.add("hidden");
  hide.classList.toggle("blur");
  option.classList.add("hidden");
  update = null;
});

const createRow = (obj, id) => {
  let tr = document.createElement("tr");

  for (const key in obj) {
    let td = document.createElement("td");
    td.innerText = obj[key];
    tr.append(td);
  }

  let td = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit");
  editButton.addEventListener("click", () => {
    form.classList.remove("hidden");
    //  console.log(obj);
    console.log(obj.firstName);
    //console.log( document.getElementById("student-firstname.value"));
    document.getElementById("student-firstname").value = obj.firstName;
    document.getElementById("student-lastname").value = obj.lastName;
    document.getElementById("student-id").value = obj.id;
    document.getElementById("student-department").value = obj.department;
    document.getElementById("student-section").value = obj.section;
    document.getElementById("student-year").value = obj.year;

    table.classList.add("hidden");
    update = id;
  });
  editButton.setAttribute("id", id);

  td.append(editButton);
  tr.append(td);
  let td2 = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    data = data.filter((item, index) => index !== id);
    savingRecords();
    location.reload();
  });
  td2.append(deleteButton);
  tr.append(td2);

  return tr;
};
// let list1=[];
// let list2=[];
// let list3=[];
// let list4=[];

// const list1 = JSON.parse(localStorage.getItem("list1")) || [];
// const list2 = JSON.parse(localStorage.getItem("list2")) || [];
// const list3 = JSON.parse(localStorage.getItem("list3")) || [];
// const list4 = JSON.parse(localStorage.getItem("list4")) || [];
// const list5 = JSON.parse(localStorage.getItem("list5")) || [];
// const list6 = JSON.parse(localStorage.getItem("list6")) || [];

// let n =JSON.parse(localStorage.getItem("n")) || 1;
let x = 0;
let n = 1;
// console.log(list1);
// console.log(list2);

const appendDataInTabel = () => {
  if (!data.length) {
    table.classList.add("hidden");
    empty.classList.remove("hidden");
    return;
  }
  data.forEach((obj, i) => {
    const row = createRow(obj, i);
    table.appendChild(row);
  });
  table.classList.remove("hidden");
  document.getElementById("myForm").reset();
  form.classList.add("hidden");
  // empty.classList.remove("hidden");
};
window.addEventListener("load", appendDataInTabel);

console.log(n);
// function addData() {
//   for (let a = 1; a < n; a++) {
//     let AddRown = document.getElementById("show");
//     let NewRow = AddRown.insertRow(a);
//     console.log("helloji");
//     list1[x] = document.getElementById("student-firstname").value;
//     list2[x] = document.getElementById("student-lastname").value;
//     list3[x] = document.getElementById("student-id").value;
//     list4[x] = document.getElementById("student-department").value;
//     list5[x] = document.getElementById("student-section").value;
//     list6[x] = document.getElementById("student-year").value;

//     console.log(list1, list2);
//     let cel1 = NewRow.insertCell(0);
//     let cel2 = NewRow.insertCell(1);
//     let cel3 = NewRow.insertCell(2);
//     let cel4 = NewRow.insertCell(3);
//     let cel5 = NewRow.insertCell(4);
//     let cel6 = NewRow.insertCell(5);

//     cel1.innerHTML = list1[x];
//     cel2.innerHTML = list2[x];
//     cel3.innerHTML = list3[x];
//     cel4.innerHTML = list4[x];
//     cel5.innerHTML = list5[x];
//     cel6.innerHTML = list6[x];

//     a++;
//     x++;
//   }
// }

confirm.addEventListener("click", function (e) {
  e.preventDefault();
  // if (n > 1) {
  //   addData();
  // }
  console.log(e);
  let AddRown = document.getElementById("show");
  let NewRow = AddRown.insertRow(n);
  console.log("helloji");
  firstName = document.getElementById("student-firstname").value;
  lastName = document.getElementById("student-lastname").value;
  id = document.getElementById("student-id").value;
  department = document.getElementById("student-department").value;
  section = document.getElementById("student-section").value;
  year = document.getElementById("student-year").value;

  const newData = { firstName, lastName, id, department, section, year };
  if (update === null) {
    data.push(newData);
    let tr = createRow(newData, data.length - 1);

    table.appendChild(tr);
  } else {
    data[update] = newData;
    savingRecords();

    location.reload();
  }

  // console.log(list1, list2);

  // let tr = createRow(newData, data.length - 1);

  // table.appendChild(tr);

  // editButton.innerText = "EDIT";
  // cel1.innerText = list1[x];
  // cel2.innerText = list2[x];
  // cel3.innerHTML = list3[x];
  // cel4.innerHTML = list4[x];
  // cel5.innerHTML = list5[x];
  // cel6.innerHTML = list6[x];
  // cel7.append(editButton);
  // console.log(AddRown);
  // n++;
  // x++;
  table.classList.remove("hidden");
  // document.getElementById("myForm").reset();
  form.classList.add("hidden");
  savingRecords();
});

function savingRecords() {
  localStorage.setItem("data", JSON.stringify(data));
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
