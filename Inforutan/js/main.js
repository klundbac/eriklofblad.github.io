$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    
    /*
    //Test för att parsa komplexa JSON
    $.getJSON('telefonbok_2.json', function(json) {
        $.each(json, function(key, value){
            $('#home').append('<h3>'+key+'</h3>')
            $.each(value, function(key2, value2){
                $('#home').append('<p>Phonenumber: '+value2.name+'</p>')
            });
        });
    });
    */

    $(document).tooltip({
        container: 'body',
        selector: '[data-toggle]'
    });
    
    // $("#driftinfo-body").load("Akut_driftinformation-Inuti_2.htm")

    /*
    $.ajax({
        url: 'https://eriklofblad.github.io/Inforutan/driftinfo_3.htm',
        type: 'GET',
        crossDomain: true,
        dataType: 'html',
        success: function(data){
            $('#driftinfo-body').append(data);
        }
    });
    */

    $.ajax({
        url: 'https://eriklofblad.github.io/Inforutan/driftinfo_3.htm',
        dataType: "html",
        context: document.body,
        success: function(data){
            //console.log(data);
            //console.log(initial);
            var split1 = data.split('<section class="news-list">');
            //onsole.log(split1[1]);
            var split2 = split1[1].split('</section>');
            var news_elements = $(split2[0]);
            $(news_elements).addClass('list-group').removeClass('news');
            //console.log(news_elements);
            $('#driftinfo-body').append(news_elements);
            $(".list-group li").addClass('list-group-item bg-warning');
            $(".list-group-item a").addClass('text-danger');
        }
    });

    $.ajax({
        url: 'https://schema.medinet.se/ksneurorad/schema/neuron/language/se',
        success: function(data){
            var oncalldoctor = $(data).find("#day-79-2018-08-06");
            $('#driftinfo-body').append(oncalldoctor);
        }

    });

    /*
    $.get('Akut_driftinformation-Inuti_2.htm', function(data){
        console.log("AJAX lyckad");
        //var news_selector = $('.news');
        // var news_elements = $(".news", data);
        var parser = new DOMParser();
        var news_elements = parser.parseFromString(data, "text/html");
        console.log(news_elements);
        // news_elements.innerHTML = data;
        // document.querySelector("#driftinfo-body").innerHTML = news_elements.getElementsByClassName("news").innerHTML;
        console.log(news_elements.getElementsByClassName("news"));

        $('#driftinfo-body').append(news_elements);

        // document.getElementById("driftinfo-body").innerHTML = news_elements2.innerHTML;
        // $(news_elements).addClass('list-group').removeClass('news');
        // $('#driftinfo-body').append(news_elements);
        // $('#driftinfo-body').html(news_elements2);
        $(".list-group li").addClass('list-group-item bg-warning');
        $(".list-group-item a").addClass('text-danger');
        console.log("efter ajax processning");
        
    });

    */





    $('#searchNumber').keyup(function(){
        $('#numberList').html('');
        //$('#state').val('');
        var searchField = $('#searchNumber').val();
        if(searchField != ''){
            var expression = new RegExp(searchField, 'i');
            $.getJSON('telefonbok_3.json', function(data) {
                $('#numberList').html('<thead><tr><th>Namn</th><th>Nummer</th><th>Roll</th><th>FO</th></thead>');
                $('#numberList').append('<tbody>');
                $.each(data, function(key1, value1){
                    $.each(value1, function(key, value){
                        if (value.name.search(expression) != -1)
                            {
                            //här väljer vi vilka noder som ska visas
                            $('#numberList').append('<tr><th id="erikstest" scope="row" data-toggle="tooltip" title="'+value.description+'">'+value.name+'</th><td>'+value.phonenumber+'</td><td>'+value.type+'</td><td>'+value.organisation+'</td></tr>');
                            }
                    });
                });
                $('#numberList').append('</tbody>');
            });
        };
    });
});