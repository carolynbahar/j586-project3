var farmerMarket = [];
var funding = [];
var cities = [];
 
    $(document).ready(function() //runs the functions
      {

        $.ajax({ //loads in xml file
		type: "GET",
		url: "MINE.xml",
		dataType: "xml",
		success: parseXML
	});
	
	function parseXML(xml) { 
                    

        $(xml).find('ROW').each(function(){ //starts loop to find all people, etc
            //console.log("once for every person");
            var $ROW = $(this); 
	    farmerMarket.push(parseInt($ROW.find('markets').text())); //parseInt is a function that says turn this text into an integer. Push adds the data to the back of each one so that order makes sense. Pop goes to the front.
	    funding.push(parseInt($ROW.find('fund').text()));
	    cities.push($ROW.find('city').text());
	    
        });
	
	//console.log(farmerMarket);
	//console.log(funding);
	buildChart(); //finally builds chart -- needs to be inside function but outside loop so it won't try to write the chart 100 times, etc.
    }
    
    
    function buildChart(xml) {
    var chart1 = new Highcharts.Chart({
	
	chart: {
            zoomType: 'xy',
		renderTo: 'chart2' // not in demo ... assigns id ****
        },
        title: {
            text: 'Farmers Markets vs. Health/Food Initiatives'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: [{
            categories: cities,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '${value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Amount of Funding',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Number of Farmers Markets',
                //style: {
                //    color: Highcharts.getOptions().colors[0]
                //}
            },
            labels: {
                format: '{value}',
                //style: {
                  //  color: Highcharts.getOptions().colors[0]
                //}
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Number of Food Markets',
            type: 'column',
            yAxis: 1,
            data: farmerMarket,
        }, {
            name: 'Amount of Funding',
            type: 'spline',
            data: funding,
            tooltip: {
                valuePrefix: '$'
            }
        }]
    });
};
    
});