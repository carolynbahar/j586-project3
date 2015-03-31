 var farmerMarket = [];
    
    
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
            //var name = $ROW.attr("name");
            //var description = $person.find('description').text();
            //var imageurl = $person.attr('imageurl');
	    farmerMarket.push(parseInt($ROW.find('markets').text())); //parseInt is a function that says turn this text into an integer. Push adds the data to the back of each one so that order makes sense. Pop goes to the front.

            //var html = '<dt> <img class="bioImage" alt="" src="' + imageurl + '" /> </dt>';
            //html += '<dd> <span class="loadingPic" alt="Loading" />';
            //html += '<p class="name">' + name + '</p>';
            //html += '<p> ' + description + '</p>' ;
            //html += '</dd>';

            //$('dl').append($(html));
            
	    
        });
	
	console.log(farmerMarket);
	buildChart(); //finally builds chart -- needs to be inside function but outside loop so it won't try to write the chart 100 times, etc.
    }

    function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
	
	
	var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'bar'
        },
        title: {
            text: 'tears cried'
        },
        xAxis: {
            categories: ['Hearst', 'Marrow', 'Woodward']
        },
        yAxis: {
            title: {
                text: 'Awards'
            }
        },
        series: [{
            name: 'Putlizers',
            data: [1, 0, 4]
        }, {
            name: 'Other',
            data: farmerMarket
        }]
    });
	
	

    }	
});