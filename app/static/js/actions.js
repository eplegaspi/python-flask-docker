$(document).ready(function(){

     $("#myInput").keyup(function(){
          console.log("Live Promos");

          if($(this).val().length > 4){

               search_term = $(this).val()

               console.log(search_term)

               var data = {
                    "query": {
                        "bool": {
                            "should": [
                                {
                                    "multi_match": {
                                        "query": search_term,
                                        "type": "phrase",
                                        "fields": [
                                            "doc.name"
                                        ],
                                        "boost": 10
                                    }
                                },
                                {
                                    "multi_match": {
                                        "query": search_term,
                                        "type": "most_fields",
                                        "fields": [
                                            "doc.name"
                                        ],
                                        "fuzziness": "AUTO"
                                    }
                                }
                            ]
                        }
                    }
                }

               $.ajax({
               type: "POST",
               url: "http://34.143.248.73:9200/clothing/_search?size=25",
               data: JSON.stringify(data), // elastic filter
               dataType: "json",
               contentType: "application/json;charset=UTF-8",
               processData: false,
               success: function(data) {
                    hits = data['hits']['hits']

                    console.log(hits)

                    table_body = ''

                    hits.forEach(function (item, index) {
                         console.log(item, index);



                         table_row_start = '<tr>' 
                         table_field1 =  '<td>' + item['_source']['doc']['name'] + '</td>' 
                         table_row_end = + '</tr>'
                         table_row = table_row_start + table_field1 + table_row_end

                         table_body += table_row
                    });

                    $('#myTable tbody').html(table_body);


                    },
               error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr);
                     }
               });
                  
                
          
          }else{
               $('#myTable tbody').html('')
          }
     });

});

