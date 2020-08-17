var list = document.getElementById("list");

firebase
  .database()
  .ref("Todo-List")
  .on("child_added", function (data) {
    // console.log(data.val());
    // create li tag
    var li = document.createElement("li");
    //   console.log(li);
    var liText = document.createTextNode(data.val().name); // 2nd -->data show in list throgh "firebase" so that if page reload data will be save

    li.appendChild(liText);
    //   console.log(li);

    // create delete button tag

    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.setAttribute("class", "btn");
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.setAttribute("id", data.val().key); //// isy isliye use kiya ta k hamen iski ID mil jaye
    delBtn.appendChild(delText);

    // create edit button tag
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.setAttribute("class", "btnHover");
    editBtn.setAttribute("id", data.val().key);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });

function addTodo() {
  var todoitem = document.getElementById("todo-item");
  //   console.log(todoitem.value);
  var database = firebase.database().ref("Todo-List");
  var key = database.push().key; //key <-- push k sath link kr k firebase sy key  generate krta hai
  // console.log(key);
  var todoObj = {
    name: todoitem.value,
    key: key,
  };
  firebase //1st ---> here data save in Firebase
    .database()
    .ref("Todo-List/" + key)
    .set(todoObj);
  ////both same
  // database.child(key).set(todoObj);      ////here  var database = firebase.database().ref("Todo-List");
  todoitem.value = "";
}
function deleteItem(e) {
  //   console.log(e);
  firebase.database().ref("Todo-List").child(e.id).remove();
  e.parentNode.remove();
}
function deleteAll() {
  firebase.database().ref().remove();
  list.innerHTML = "";
}
function editItem(e) {
  // var firstVal = e.parentNode.firstChild.nodeValue;
  var editValue = prompt("Enter New TODO", e.parentNode.firstChild.nodeValue);
  // console.log(e.id);
  var editTodo = {
    name: editValue,
    key: e.id,
  };
  // console.log(firstVal);
  firebase.database().ref("Todo-List").child(e.id).set(editTodo);
  e.parentNode.firstChild.nodeValue = editValue;
}
