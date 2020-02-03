const sessionList = document.querySelector('#session-list');
const form = document.querySelector('#add-response');
function renderResponse(doc){

    let session_li = document.createElement('li');
    let session_id =  document.createElement('span');
    let session_name = document.createElement('span');
    let session_click = document.createElement('BUTTON');
    let session_cross = document.createElement('div');
    let session_stat = document.createElement('BUTTON');

    
    session_li.setAttribute('data-id',doc.id);
    session_id.textContent = doc.data().SessionId;
    session_name.textContent = doc.data().SessionName;
    session_click.textContent = "Enter Session";
    session_cross.textContent = 'x';
    session_stat.textContent = 'Session Statistics';


    session_li.appendChild(session_id);
    session_li.appendChild(session_name);
    session_li.appendChild(session_click);
    session_li.appendChild(session_cross);
    session_li.appendChild(session_stat);


    sessionList.appendChild(session_li);
    
    
    session_click.addEventListener('click', (e) => {
        e.preventDefault();
        var data = doc.data();
        var SessionName = data.SessionName;
        localStorage.setItem("sessionID",SessionName);
        window.location.href = 'teacher.html';
    })

    session_cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Session').doc(id).delete();
    })

    session_stat.addEventListener('click', (e) => {
        e.preventDefault();
        var data = doc.data();
        var SessionName = data.SessionName;
        localStorage.setItem("sessionID",SessionName);
        window.location.href = 'session-stats.html';
    })
    
    
    
}
function createSession(){
    var newSession = document.getElementById("newSession").value;
    if (newSession !=""){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        db.collection('Session').add(    
            {
                SessionName: newSession.toString(),
                TimeCreated: dateTime.toString()

            })
            setTimeout(function () {
                window.alert("Added Successfully");
                location.reload();
            }, 1000);
    }
    else {
        window.alert("Failed to add");
        location.reload();
    }
    
    

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

