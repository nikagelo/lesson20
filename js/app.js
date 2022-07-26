// // COMMENT modals, popup
function dynamicOpenModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.add("open");

    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      dynamicCloseModal(selector);
    });
  }
}

function dynamicCloseModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.remove("open");
  }
}

const openRegFormBtn = document.querySelector("#open-reg-form");
openRegFormBtn.addEventListener("click", () => {
  dynamicOpenModal("#reg-modal");
});

//NOTE Requests and Responses

const createUserUrl = "http://borjomi.loremipsum.ge/api/register", //method POST
  getAllUsersUrl = "http://borjomi.loremipsum.ge/api/all-users", //method GET
  getSingleUserUrl = "http://borjomi.loremipsum.ge/api/get-user/1 ", //id method  GET
  updateUserUrl = "http://borjomi.loremipsum.ge/api/update-user/1 ", //id method PUT
  deleteUserUrl = "http://borjomi.loremipsum.ge/api/delete-user/1"; //id method DELETE

const regForm = document.querySelector("#reg"),
  user_Name = document.querySelector("#user_name"),
  userSurname = document.querySelector("#user_surname"),
  userEmail = document.querySelector("#user_email"),
  userPhone = document.querySelector("#user_phone"),
  userPersonalID = document.querySelector("#user_personal-id"),
  userZip = document.querySelector("#user_zip-code"),
  userGender = document.querySelector("#user_gender"),
  table = document.querySelector("#table");

// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
user_id = document.querySelector("#user_id");

// TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
  // TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
  // TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

  buildTable(usersArray);
  userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

function buildTable(data) {
  var table = document.getElementById("myTable");

  for (var i = 0; i < data.length; i++) {
    var row = `
             
              <tr>
              
							<td>${data[i].id}</td>
							<td>${data[i].first_name}</td>
							<td>${data[i].last_name}</td>
              <td>${data[i].email}</td>
              <td>${data[i].id_number}</td>
              <td>${data[i].phone}</td>
              <td>${data[i].zip_code}</td>
              <td>${data[i].gender}</td>
              <td>
              <button id="edit">Edit</button>
              <button id="delete">Delete</button>
              </td>
             
              
              </tr>
              
              `;
    table.innerHTML += row;
  }
}

const editUser = document.querySelector("#edit");
const deleteUsers = document.querySelector("#delete");

// TODO: დაასრულე
function userActions() {
  // 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
  // 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
  // 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით
  //  selectedElement.dataset
  // 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
  // 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი
  // ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს
  // და არა მასივს)
  // ეს დატა უნდა შეივსოს ფორმში
  // და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია და ფორმის დასაბმითებისას უნდა მოხდეს updateUser()
  // ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც
  // მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლია შეინახოთ
}

function getUsers() {
  fetch("http://borjomi.loremipsum.ge/api/all-users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let users = data.users;
      // console.log(users);

      // html-ში გამოტანა მონაცემების
      renderUsers(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(id) {
  fetch(`http://borjomi.loremipsum.ge/api/delete-user/${id}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // გვიბრუნებს სტატუსს
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUser(id) {
  fetch(`http://borjomi.loremipsum.ge/api/get-user/${id}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      // გვიბრუნებს იუზერის ობიექტს
      console.log(data);
      getUsers(); //TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(userObj) {
  // მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
  // TODO დაასრულეთ ფუნქცია
  //  method: "put",  http://borjomi.loremipsum.ge/api/update-user/${userObj.id}
  // TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
}

function createUser(userData) {
  fetch("http://borjomi.loremipsum.ge/api/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // გვიბრუნებს სტატსუსს (წარმატებით გაიგზავნა თუ არა) და დამატებული იუზერის ობიექტს
      // დატის მიღების შემდეგ ვწერთ ჩვენს კოდს
      console.log(data);
      // ხელახლა გამოგვაქვს ყველა იუზერი
      // TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
      // getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

// იგივე ფუნქცია async await ის გამოყენებით

// async function createUser(userData) {
// 	try {
// 		const response = await fetch("http://borjomi.loremipsum.ge/api/register", {
// 			method: "post",
//			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(userData),
//
// 		});
// 		const data = await response.json();
// 		// დატის მიღების შემდეგ ვწერთ ჩვენს კოდს
// 		console.log(data);
// 		getUsers();
// 	} catch (e) {
// 		console.log("Error - ", e);
// 	}
// }

getUsers();

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInfo = {
    id: user_id.value,
    first_name: user_Name.value,
    last_name: userSurname.value,
    phone: userPhone.value,
    id_number: userPersonalID.value,
    email: userEmail.value,
    gender: userGender.value,
    zip_code: userZip.value,
  };

  //  TODO: თუ user_id.value არის ცარიელი მაშინ უნდა შევქმნათ  -->  createUser(userData);
  // TODO: თუ user_id.value არის მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფოთი
  // ვავსებთ, ვაედითებთ და ვასაბმითებს) -->  updateUser(userData);

  // console.log(userInfo, JSON.stringify(userInfo));
  // ინფორმაციის გაგზავნის შემდეგ ფორმის გასუფთავება
  regForm.reset();
});

// jsonplaceholder-ის სატესტო დატა, გაგზავნა მონაცემების

// function createData(testData) {
// 	fetch("https://jsonplaceholder.typicode.com/posts", {
// 		method: "POST",
// 		body: JSON.stringify(testData),
// 		headers: {
// 			"Content-type": "application/json; charset=UTF-8",
// 		},
// 	})
// 		.then((response) => response.json())
// 		.then((json) => {
// 			console.log(json);
// 		});
// }

// const data = {
// 	title: "example title",
// 	body: "example text",
// 	userId: 1,
// };

// const data2 = {
// 	title: "example title 2",
// 	body: "example text",
// 	userId: 1,
// };

// createData(data);
// createData(data2);
