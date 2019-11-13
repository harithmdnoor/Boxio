const studentList = document.querySelector('#student-list');
const form = document.querySelector('#add-response');
const button1 = document.querySelector('.button1')
const button2 = document.querySelector('.button2')
const button3 = document.querySelector('.button3')

// create element & render
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

/*
// getting data
db.collection('Students').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderStudents(doc);
    });
});
*/

// saving data
form.addEventListener('click', (e) => {
    e.preventDefault();
    if (event.target == button1)
    {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.ROne.value
            })        
    }
    else if (event.target == button2) {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.RTwo.value
            })
    }
    else if (event.target == button3) {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.RThree.value
            })        
    }
  }) 

// Real-time listener (Getting real-time data)
db.collection('Response').onSnapshot(snapshot => {
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