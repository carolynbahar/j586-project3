var otherAwards = [];

    
    $(document).ready(function() //runs the functions
      {
  
        $('#example').dataTable( {
            "ajax": 'dataTable.json'
        } );
        
        
        
        
        $.ajax({ //loads in xml file
		type: "GET",
		url: "myData.xml",
		dataType: "xml",
		success: parseXML
	});
	
	function parseXML(xml) { 
                    

        $(xml).find('person').each(function(){ //starts loop to find all people, etc
            //console.log("once for every person");
            var $person = $(this); 
            var name = $person.attr("name");
            var description = $person.find('description').text();
            var imageurl = $person.attr('imageurl');
	    otherAwards.push(parseInt($person.find('other-awards').text())); //parseInt is a function that says turn this text into an integer. Push adds the data to the back of each one so that order makes sense. Pop goes to the front.

            var html = '<dt> <img class="bioImage" alt="" src="' + imageurl + '" /> </dt>';
            html += '<dd> <span class="loadingPic" alt="Loading" />';
            html += '<p class="name">' + name + '</p>';
            html += '<p> ' + description + '</p>' ;
            html += '</dd>';

            $('dl').append($(html));
            
	    
        });
	
	console.log(otherAwards);
	buildChart(); //finally builds chart -- needs to be inside function but outside loop so it won't try to write the chart 100 times, etc.
    }

    function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
	
	
	var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'bar'
        },
        title: {
            text: 'Awards Won'
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
            data: otherAwards
        }]
    });
	
	

    }	
});

