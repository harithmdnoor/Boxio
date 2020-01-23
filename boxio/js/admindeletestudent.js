// JavaScript source code
// JavaScript source code
//deleting
const studentList = document.querySelector('#student-list');
const form = document.querySelector('#delete-student');

// create element & render
function renderResponse(doc) {
    let li = document.createElement('li');
    let id = document.createElement('span');
    let name = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    id.textContent = doc.data().Id;
    name.textContent = doc.data().Name;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(id);
    li.appendChild(cross);

    studentList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Students').doc(id).delete();
    })
}
// Real-time listener (Getting real-time data)
db.collection('Students').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderResponse(change.doc);
        } else if (change.type == 'removed') {
            let li = studentList.querySelector('[data-id=' + change.doc.id + ']');
            studentList.removeChild(li);
        }
    })
})