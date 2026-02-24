const form = document.getElementById("form");
const FullName = document.getElementById("FullName");
const DateOfBirth = document.getElementById("DateOfBirth");
const IDNumber = document.getElementById("IDNumber");
const Email = document.getElementById("Email");
const MobileNumber = document.getElementById("MobileNumber");
const course = document.getElementById("course");
const Photo = document.getElementById("Photo");
const nameErrMsgEl = document.getElementById("nameErrMsgEl");
const tableBody = document.getElementById("tableBody");

let editIndex = null;


/* LOCAL STORAGe*/

function getStudentsData() {
  const data = localStorage.getItem("studentDetails");
  return data ? JSON.parse(data) : [];
}

let studentDetails = getStudentsData();

function updateLocalStorage() {
  localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
}


function validateNameErr() {
  if (FullName.value.trim() === "") {
    nameErrMsgEl.textContent = "Required*";
    nameErrMsgEl.style.color = "red";
    return false;
  }
  nameErrMsgEl.textContent = "";
  return true;
}

/* DISPLAY TABLE*/

function displayStudents() {
  tableBody.innerHTML = "";

  studentDetails.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.dob}</td>
      <td>${student.idNumber}</td>
      <td>${student.email}</td>
      <td>${student.mobile}</td>
      <td>${student.course}</td>
      <td>
        ${
          student.photo
            ? `<img src="${student.photo}" width="50" height="50" style="object-fit:cover;border-radius:5px;">`
            : "No Photo"
        }
      </td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editStudent(${index})">Edit</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ===============================
// IMAGE CONVERSION
// ===============================

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


/* EDIT FUNCTION */

window.editStudent = function (index) {
  const student = studentDetails[index];

  FullName.value = student.name;
  DateOfBirth.value = student.dob;
  IDNumber.value = student.idNumber;
  Email.value = student.email;
  MobileNumber.value = student.mobile;
  course.value = student.course;

  editIndex = index;
};


/*FORM SUBMIT (ADD + UPDATE)*/


form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!validateNameErr()) return;

  const idValue = IDNumber.value.trim();
  
  const duplicate = studentDetails.some((student, index) => {
    return student.idNumber === idValue && index !== editIndex;
  });

  if (duplicate) {
    alert("ID Number already exists!");
    return;
  }

  let photoData = editIndex !== null ? studentDetails[editIndex].photo : "";

  if (Photo.files.length > 0) {
    photoData = await convertImageToBase64(Photo.files[0]);
  }

  const student = {
    name: FullName.value.trim(),
    dob: DateOfBirth.value,
    idNumber: idValue,
    email: Email.value.trim(),
    mobile: MobileNumber.value.trim(),
    course: course.value,
    photo: photoData
  };

  if (editIndex === null) {
    // ADD
    studentDetails.push(student);
  } else {
    // UPDATE
    studentDetails[editIndex] = student;
    editIndex = null;
  }

  updateLocalStorage();
  displayStudents();
  form.reset();
});

FullName.addEventListener("blur", validateNameErr);

displayStudents();