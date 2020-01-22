const studentList = document.querySelector('#student-list');
const form = document.querySelector('#add-response');
const button1 = document.querySelector('.button1')
const button2 = document.querySelector('.button2')
const button3 = document.querySelector('.button3')
document.getElementById("header").innerHTML = localStorage.getItem("sessionID");
var sessionID = localStorage.getItem("sessionID");


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
// saving data
form.addEventListener('click', (e) => {
    e.preventDefault();
    if (event.target == button1)
    {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.ROne.value,
                SessionID: sessionID

            })     
            alert("Successfully submitted reponse");
    }
    else if (event.target == button2) {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.RTwo.value,
                SessionID: sessionID

            })
            alert("Successfully submitted reponse"); 

    }
    else if (event.target == button3) {
        db.collection('Response').add(    
            {
                StudentName: studentname,
                StudentID: studentid,
                Answer: form.RThree.value,
                SessionID: sessionID

            })        
            alert("Successfully submitted reponse");   

    }
  }) 
