function renderControls(response){
    console.log('Realizando render: ' + response);
    res = JSON.parse(response);
    
    ctl = document.getElementById(res.name);
    ctl.setAttribute(res.state);
    ctl.value = "Rele "+ res.name + "  " + res.state
}

/**
    Llama a la funcion para abrir o cerrar un rele
*/
function controlRele(src){
   var req = { name: src.id , state: $('#' + src.id).attr('class')  }

   $.post('/relay',
         req, 
         function(data){
            console.log('Recibiendo data');
            var id = '#' + data.name;
            console.log(id);
            console.log($(id).attr('class'));
            $(id).removeClass($(id).attr('class')).addClass(data.state);
            console.log('Finalizando proceso de respuesta');
         },'json');

}


function i_controlRele(src){
     console.log(src.id );
     var form1 = document.forms[0];
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          console.log('###  Recibiendo respuesta');
          renderControls(this.responseText);
       }
     };
     xhttp.open("POST", "/relay", true);
     request = new Object();
     request.name = src.id
     request.state = src.getAttribute('class');
     
     /*
     var request = Array();
     document.getElementsByName('ctl').forEach(function(item){
        clss  =  ( src.id != item.id ) ? 
                 item.getAttribute('class') : 
                 ['', item.getAttribute('class') ];
        console.log(item.id + " " + item.getAttribute('class'));
	
        var itemrow= new Object();
        itemrow[item.id] = clss
        request.push( itemrow  );
     });
     */
     str = JSON.stringify(request)
     console.log('Retornando ' + JSON.stringify(request));
//     xhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
     
//     xhttp.send(str);
}

 var global = setInterval(                                                                 
        function loadDoc() {                                                                   
                                                                                               
          //console.log('llamado AJAX');                                                         
          var xhttp = new XMLHttpRequest();                                                    
          xhttp.onreadystatechange = function() {                                              
            if (this.readyState == 4 && this.status == 200) {                                  
               //console.log(this.responseText);                                                 
               document.getElementById("temperatura").value = JSON.parse(this.responseText).t; 
            }                                                                                  
          };                                                                                   
          xhttp.open("GET", "/temp", true);                                                    
          xhttp.send();                                                                        
        },3000);     
