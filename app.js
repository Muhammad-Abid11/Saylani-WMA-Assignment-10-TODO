var list = document.getElementById("list");

function addTodo() {
  var todoitem = document.getElementById("todo-item");
  //   console.log(todoitem.value);

  // create li tag
  var li = document.createElement("li");
  //   console.log(li);
  var liText = document.createTextNode(todoitem.value);
  li.appendChild(liText);
  //   console.log(li);

  // create delete button tag

  var delBtn = document.createElement("button");
  var delText = document.createTextNode("Delete");
  delBtn.setAttribute("class", "btn");
  delBtn.setAttribute("onclick", "deleteItem(this)");
  delBtn.appendChild(delText);

  // create edit button tag
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("EDIT");
  editBtn.appendChild(editText);
  editBtn.setAttribute("onclick", "editItem(this)");
  editBtn.setAttribute("id", "btnHover");
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  list.appendChild(li);
  todoitem.value = "";
}
function deleteItem(e) {
  //   console.log(e);
  e.parentNode.remove();
}
function deleteAll() {
  list.innerHTML = "";
}
function editItem(e) {
  var firstVal = e.parentNode.firstChild.nodeValue;
  e.parentNode.firstChild.nodeValue = prompt("Enter New TODO", firstVal);
  //   console.log(e.parentNode.firstChild);
}
