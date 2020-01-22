const sessionList = document.querySelector('#session-list');
const form = document.querySelector('#add-response');

function renderResponse(doc){

    let session_li = document.createElement('li');
    let session_id =  document.createElement('span');
    let session_name = document.createElement('span');
    let session_click = document.createElement('BUTTON');

    session_li.setAttribute('data-id',doc.id);
    session_id.textContent = doc.data().SessionId;
    session_name.textContent = doc.data().SessionName;
    session_click.textContent = "Enter Session";

    session_li.appendChild(session_id);
    session_li.appendChild(session_name);
    session_li.appendChild(session_click);

    sessionList.appendChild(session_li);
    
    
    session_click.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'student.html';
        let id = e.target.parentElement.getAttribute('data-id');
        var data = doc.data();
        var SessionName = data.SessionName;
        localStorage.setItem("sessionID",SessionName);
    })
}

// Real-time listener (Getting real-time data)
db.collection('Session').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let session_li = sessionList.querySelector('[data-id=' + change.doc.id + ']');
        sessionList.removeChild(session_li);
    }
    })
})