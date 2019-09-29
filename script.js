const form = document.querySelector("form#addform");
const formedit = document.querySelector("form#editform");
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
  post();
});
formedit.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
  put();
});

function get() {
  fetch("https://todolist-8cdd.restdb.io/rest/todolost", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d71c1ce70f637985513f",
      "cache-control": "no-cahce"
    }
  })
    .then(e => e.json())
    .then(lists => {
      console.log(lists);
      lists.forEach(addHereToTheDom);
    });
}
function addHereToTheDom(list) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.list").dataset.listid = list._id;
  copy.querySelector("h1").textContent = list.name;
  copy.querySelector("h2").textContent = list.tasks;
  copy.querySelector("p").textContent = list.time + " days";
  copy.querySelector("button").addEventListener("click", () => {
    deleteIt(list._id);
  });

  //   copy.querySelector("button.secondbtn").addEventListener("click", () => {
  //     fetchAndPopulate(list._id);
  // document.querySelector("#editform").className = "display";
  //   });

  document.querySelector(".app").prepend(copy);
}

get();

function fetchAndPopulate(id) {
  fetch(`https://todolist-8cdd.restdb.io/rest/todolost/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d71c1ce70f637985513f",
      "cache-control": "no-cahce"
    }
  })
    .then(e => e.json())
    .then(lists => {
      console.log(lists);
      formedit.elements.name.value = lists.name;
      formedit.elements.tasks.value = lists.tasks;
      formedit.elements.time.value = lists.time;
      formedit.elements.id.value = lists._id;
    });
}

function post() {
  const data = {
    name: form.elements.name.value,
    tasks: form.elements.tasks.value,
    time: form.elements.time.value
  };

  const postData = JSON.stringify(data);
  fetch("https://todolist-8cdd.restdb.io/rest/todolost", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d71c1ce70f637985513f",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addHereToTheDom(data);
    });
}

// function put() {
//   const data = {
//     name: formedit.elements.name.value,
//     tasks: formedit.elements.tasks.value,
//     time: formedit.elements.time.value
//   };

//   const postData = JSON.stringify(data);
//   const superID = formedit.elements.id.value;

//   fetch("https://todolist-8cdd.restdb.io/rest/todolost/" + superID, {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "x-apikey": "5d90d71c1ce70f637985513f",
//       "cache-control": "no-cache"
//     },
//     body: postData
//   })
//     .then(res => res.json())
//     .then(updatedList => {
//       const parentElement = document.querySelector(`.list[data-listid="${updatedList._id}"]`);

//       parentElement.querySelector("h1").textContent = updatedList.name;
//       parentElement.querySelector("h2").textContent = updatedList.tasks;
//       parentElement.querySelector("p").textContent = updatedList.time;
//     });

function deleteIt(id) {
  console.log(id);
  fetch("https://todolist-8cdd.restdb.io/rest/todolost/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d71c1ce70f637985513f",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //TODO: delete from DOM
      document.querySelector(`.list[data-listid="${id}"]`).remove();
    });
}
