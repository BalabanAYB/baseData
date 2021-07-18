let infoStudents = [
  { id: 1, surName: "Дейкун", name: "Алексей", patronymic: "Александрович", faculty: "Биологический", birthday: '18.02.1996', training: '02.08.2018' },
  { id: 2, surName: "Верном", name: "Тимофей", patronymic: "Игоревич", faculty: "Исторический", birthday: '07.11.2000', training: '02.08.2019' },
];

let infoStudentSearch;

const ageItem = [2, 3, 4];

document.addEventListener('DOMContentLoaded', () => {

  function createRowTable() {                // Создаем разметку строки в таблице

    tbody = document.querySelector('tbody');
    stringInfo = document.createElement('tr');
    scoreStudent = document.createElement('th');
    nameStudent = document.createElement('td');
    facultyStudent = document.createElement('td');
    birthdayStudent = document.createElement('td');
    trainingStudent = document.createElement('td');

    scoreStudent.scope = 'row';
    tbody.append(stringInfo);
    stringInfo.append(scoreStudent);
    stringInfo.append(nameStudent);
    stringInfo.append(facultyStudent);
    stringInfo.append(birthdayStudent);
    stringInfo.append(trainingStudent);
  }

  function get_current_age(dat) {
    let now = new Date(); //Текущя дата
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
    dates = dat.split('.').reverse();
    dob = new Date(dates[0], dates[1], dates[2]); //Дата рождения
    let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
    let age; //Возраст

    //Возраст = текущий год - год рождения
    age = today.getFullYear() - dob.getFullYear();
    //Если ДР в этом году ещё предстоит, то вычитаем из age один год
    if (today < dobnow) {
      age = age - 1;
    };
    return age
  };

  function arrayStudentsList(array) {                            //Преобразуем массив в таблицу
    for (let i = 0; i < infoStudents.length; i++) {
      let item = array[i];
      createStudentsList(item, i, get_current_age(item.birthday))
    };
  };

  function createStudentsList(item, i, age) {
    let id = item.id;
    let fullName = item.surName + ' ' + item.name + ' ' + item.patronymic;
    let birthdayDate = `${item.birthday} (${age} лет/года)`;
    let endAge = Number(item.training.split('.')[2]) + 4;
    startAge = item.training.split('.');
    let endTraining = [];
    let session;

    function parseEmployeesData(dataString) {
      dataString.push(startAge[0]);
      dataString.push(startAge[1]);
      dataString.push(String(endAge));
      session = dataString.join('.');
    };
    parseEmployeesData(endTraining);
    if (get_current_age(item.training) >= 1 && get_current_age(item.training) <= 4) {
      trainingAge = `${item.training} - ${session} (${get_current_age(item.training)} курс)`;
    }
    else if (get_current_age(item.training) > 4) {
      trainingAge = 'закончил';
    };

    createRowTable();
    scoreStudent.innerHTML = id;
    nameStudent.innerHTML = fullName;
    facultyStudent.innerHTML = item.faculty;
    birthdayStudent.innerHTML = birthdayDate;
    trainingStudent.innerHTML = trainingAge;
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '.' + dd + '.' + yyyy;

  let birthdayDate = document.querySelector('.birthday');
  let trainingDate = document.querySelector('.training');

  birthdayDate.max = today;
  trainingDate.max = today;
  let form = document.querySelector('form');
  let input = document.querySelectorAll('input');

  function register (elements){
    elements = elements[0].toUpperCase() + elements.slice(1).toLowerCase();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let surname = form[0].value;
    let name = form[1].value;
    let patronymic = form[2].value;
    let faculty = form[3].value;
    let birthday = form[4].value;
    let training = form[5].value;


    if (surname !== '' && name !== '' && patronymic !== '' && faculty !== '' && birthday !== '' && training !== '') {

      let birthdayArray = birthday.split('-');
      birthday = [birthdayArray[2], birthdayArray[1], birthdayArray[0]].join('.');
      console.log(birthdayArray);
      let trainingArray = training.split('-');
      training = [trainingArray[2], trainingArray[1], trainingArray[0]].join('.');
      console.log(trainingArray);
      if ((Number(birthdayArray[0]) > 1900 && Number(birthdayArray[0]) <= yyyy) && (Number(birthdayArray[1]) >= 1 && Number(birthdayArray[1]) <= 12) && (Number(birthdayArray[2]) >= 1 && Number(birthdayArray[2]) <= 31 &&
        Number(trainingArray[0]) > 2000 && Number(trainingArray[0]) <= yyyy) && (Number(trainingArray[1]) >= 1 && Number(trainingArray[1]) <= 12) && (Number(trainingArray[2]) >= 1 && Number(trainingArray[2]) <= 31)) {


        surname = surname[0].toUpperCase() + surname.slice(1).toLowerCase();
        name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        patronymic = patronymic[0].toUpperCase() + patronymic.slice(1).toLowerCase();
        faculty = faculty[0].toUpperCase() + faculty.slice(1).toLowerCase();

        infoStudents.push({ id: infoStudents.length + 1, surName: surname, name: name, patronymic: patronymic, faculty: faculty, birthday: birthday, training: training })

        let item = infoStudents[infoStudents.length - 1];
        let age = get_current_age(String(item.birthday));

        createStudentsList(item, infoStudents.length - 1, age);

        for (let i = 0; i < input.length; i++) {
          input[i].value = ''
        };
      };
    };

  });
  arrayStudentsList(infoStudents);


  function searchStudents(studentSearch) {

    let searchName = document.querySelector('.search_name');
    let searchFaculty = document.querySelector('.search_faculty');
    let searchAgeStart = document.querySelector('.search_ageStart');
    let searchAgeEnd = document.querySelector('.search_ageEnd');


    function forList(studentSearch) {
      if (tbody.children.length) {
        for (let i = tbody.children.length - 1; i >= 0; i--) {
          tbody.children[i].remove();
        };
      };
      if (studentSearch.length >= 1) {
        for (let j = 0; j < studentSearch.length; j++) {
          let item = studentSearch[j];
          let age = get_current_age(String(item.birthday));
          createStudentsList(item, studentSearch.length - 1, age)
        };
      }
      /*else if (searchAgeStart.value === '' || searchAgeEnd.value === '') {
        arrayStudentsList(studentSearch);
      };*/
    };


    searchName.addEventListener('input', () => {
      searchItem = searchName.value;
      console.log(tbody.children.length);
      studentSearch = infoStudents.filter(student => student.surName.includes(searchItem) || student.name.includes(searchItem) || student.patronymic.includes(searchItem))
      forList(studentSearch);
    });

    searchFaculty.addEventListener('input', () => {
      searchItem = searchFaculty.value;
      if (searchName.value !== '') {
        studentSearch = studentSearch.filter(student => student.faculty.includes(searchItem));
      }
      else {
        studentSearch = infoStudents.filter(student => student.faculty.includes(searchItem));
      };
      forList(studentSearch);
      console.log({ studentSearch });
    });
    //(Number(student.training.split('.')[2])) == searchItem)
    searchAgeEnd.addEventListener('input', () => {
      searchItem = Number(searchAgeEnd.value);
      let searchItems = searchItem - 4;
      console.log(searchItems)
      if (searchName.value !== '' || searchFaculty.value !== '') {
        studentSearch = studentSearch.filter(student => student.training.includes(searchItem));
      }
      else if (searchAgeEnd.value == ''){
        studentSearch = infoStudents.filter(student => student.training.includes(searchItem));
      }
      else{
        studentSearch = infoStudents.filter(student => student.training.includes(searchItems));
      }


      forList(studentSearch);
      console.log(studentSearch);
    });

    searchAgeStart.addEventListener('input', () => {

      searchItem = Number(searchAgeStart.value);
      console.log(searchItem)
      if (searchName.value !== '' || searchFaculty.value !== '') {
        studentSearch = studentSearch.filter(student => student.training.includes(searchItem));
      }
      else {
        studentSearch = infoStudents.filter(student => student.training.includes(searchItem));
      };
      forList(studentSearch);
      console.log(studentSearch);
    });



  };

  function sortedList(studentSorted) {
    let numberSorted = document.querySelector('.number_filter');
    let nameSorted = document.querySelector('.fullname_filter');
    let facultySorted = document.querySelector('.faculty_filter');
    let birthdaySorted = document.querySelector('.birthday_filter');
    let trainingSorted = document.querySelector('.training_filter');

    function forListSorted() {
      if (tbody.children.length) {
        for (let i = tbody.children.length - 1; i >= 0; i--) {
          tbody.children[i].remove();
        };
      };
      if (studentSorted.length >= 1) {
        for (let j = 0; j < studentSorted.length; j++) {
          let item = studentSorted[j];
          let age = get_current_age(String(item.birthday));
          createStudentsList(item, studentSorted.length - 1, age);
        };
      }
      else if (!studentSorted.length) {
        arrayStudentsList(studentSorted);
      };
    };

    nameSorted.addEventListener('click', () => {
      studentSorted.sort((prev, next) => {
        if (prev.surName < next.surName) return -1;
        if (prev.surName < next.surName) return 1;
      });
      forListSorted();
    })
    facultySorted.addEventListener('click', () => {
      studentSorted.sort((prev, next) => {
        if (prev.faculty < next.faculty) return -1;
        if (prev.faculty < next.faculty) return 1;
      });
      forListSorted();
    })
    numberSorted.addEventListener('click', () => {
      studentSorted.sort((prev, next) => prev.id - next.id);
      forListSorted();
    })
    birthdaySorted.addEventListener('click', () => {
      let studentSortedReversed = studentSorted.reverse();
      studentSortedReversed.sort((prev, next) => next.birthday.split('.')[2] - prev.birthday.split('.')[2]);
      forListSorted();
    })
    trainingSorted.addEventListener('click', () => {
      studentSorted.sort((prev, next) => next.training.split('.')[2] - prev.training.split('.')[2]);
      forListSorted();
    })
  };


  sortedList(infoStudents);

  searchStudents(infoStudentSearch);
});


