const studentList = document.querySelector('#student-list');

var sessionID = localStorage.getItem("sessionID");

var header = document.getElementById('header');
header.textContent = sessionID;

/*
// getting data
db.collection('Students').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderStudents(doc);
    });
});
*/
function renderResponse(doc){
    let li = document.createElement('li');
    let id = document.createElement('span');
    let name = document.createElement('span');
    let answer = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    id.textContent = doc.data().StudentID;
    name.textContent = doc.data().StudentName;
    answer.textContent = doc.data().Answer;
    cross.textContent = 'x';

    li.appendChild(id);
    li.appendChild(name);
    li.appendChild(answer);
    li.appendChild(cross);


    studentList.appendChild(li);

    
// delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Response').doc(id).delete();
    })
}


// Real-time listener (Getting real-time data)
db.collection('Response').where("SessionID", "==", sessionID ).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let li = studentList.querySelector('[data-id=' + change.doc.id + ']');
        studentList.removeChild(li);
    }
    })
})

/*
function dropDown() {
    document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
*/