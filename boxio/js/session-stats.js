google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
var sessionID = localStorage.getItem("sessionID");
var header = document.getElementById('header');
header.textContent = sessionID + " Session Statistics";

var Yes = 0;
var No = 0;
var Unsure = 0;
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Yes', Yes],
        ['No', No],
        ['Unsure', Unsure],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'Session Statistics', 'width': 550, 'height': 400 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}
// Real-time listener (Getting real-time data)
db.collection('Response').where("SessionID", "==", sessionID).onSnapshot(snapshot => {
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
function renderResponse(doc) {
    if (doc.data().Answer == "Yes") {
        Yes += 1;
    }
    else if (doc.data().Answer == "No") {
        No += 1;
    }
    else if (doc.data().Answer == "Unsure") {
        Unsure += 1;
    }
    setInterval(drawChart, 2000);
}
