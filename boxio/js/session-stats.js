var displayMode = true;

$scope.statistics = function () {
    $mdSidenav('left').close();
    $state.go('statistics');
    $timeout(function () {
        setUpChart();
        var timer;
        $(window).on('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                setUpChart();
            }, 250);
        });
    });
};

function setUpChart() {

    $.ajax({
        url: '//https://portfolio-2-boxio.firebaseio.com',
        dataType: 'script',
        cache: true,
        success: function () {
            google.load('visualization', '1', {
                'packages': ['corechart'],
                'callback': drawChart
            });
        }
    });

    function drawChart() {

        // This links to my Firebase url
        userRef.on('value', function (snapshot) {

            var pass = 0;
            var fail = 0;

            snapshot.forEach(function (snapshot) {
                var userResults = snapshot.val();
                if (userResults.passFail === 'Pass') {
                    pass = pass + 1;
                }
                if (userResults.passFail === 'Fail') {
                    fail = fail + 1;
                }
            });

            if (pass === 0 && fail === 0) {
                console.log('No data: ' + pass + ' & ' + fail);
                $scope.error = true;
                $scope.errorMessage = 'No user data available, please try  
                again later.';
            } else {
                console.log('Is data: ' + pass + ' & ' + fail);
                $scope.error = false;
                $scope.errorMessage = null;
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Result');
                data.addColumn('number', 'Delegates');
                data.addRows([
                    ['Pass', pass],
                    ['Fail', fail]
                ]);

                var options = {
                    'is3D': displayMode,
                    'chartArea': {'width': '100%', 'height': '80%'},
                    'legend': {'position': 'top', 'alignment': 'center'}
                };

                var chart = new 
         google.visualization.PieChart(document.getElementById('pieChart'));
                chart.draw(data, options);
            }

        });

    }

}

// Changes chart type to 3D or top view on a butto click
$scope.chartFormat = function () {
    if (displayMode == true)
        displayMode = false;
    else
        displayMode = true;
    setUpChart();
};