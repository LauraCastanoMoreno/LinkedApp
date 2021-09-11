aChannels=["General","Dudas","Recursos"]
aEntries=[["General","11-08-2021  20:08","Laura","(Mensaje de prueba)"],["General","11-08-2021  20:12","Laura","Mensaje prueba 2"],["Dudas","11-08-2021  20:02","Laura","Mensaje prueba 3"]]


function newChannel(name){
    // if not in channels
    aChannels.push(name);
    addChannel(name);
}


function addChannel(name){
    //$('#dChannels').append('<div>'+name+'</div>');
    $('<div/>',{text: name,class: "nameChannel"}).appendTo('#dChannels').click();
}

aChannels.forEach(element => {
     addChannel(element)
});

$('#bChannels').click(function(){
    $('#iCreate').val('');
    $('#myModal').modal();
});

$(document).on('click','.nameChannel',function(){
    textChannel=$(this).text();
    $('.channel__input').show();
    $('#ch_input').attr('placeholder','Escribir mensaje en '+textChannel)
    $('#ssChannel').text(textChannel);
    $('#sContent').html('');
    aEntries.forEach(function(entry){
        if (entry[0]==textChannel){
            showItem(entry);
        }
    });
});


function showItem(pEntry,pNeedle=null){
    date=pEntry[1];
    user=pEntry[2];
    text=pEntry[3];
    var regEx = new RegExp(pNeedle, "ig");
    user=user.replaceAll(regEx,'<span class="searched">'+pNeedle+'</span>');
    text=text.replaceAll(regEx,'<span class="searched">'+pNeedle+'</span>');

    $('#sContent').append('<div>'
        +'<span class="channel__i__user">'+user+'</span>'
        +'<span class="channel__i__date">'+date+'</span><br>'
        +'<span class="channel__i__text">'+text+'</span>'
      +'</div>');
}

$('#logo').click(function(){
   $('#sContent').html('<img src="img/LinkedAppBackgroundW.png" alt="LinkedAppLogo"></img>');
   $('.channel__input').hide();
});

$('#hamb').click(function(){
    $('nav').toggle();
})

$('#bCreate').click(function(){
    var cnn=$('#iCreate').val();
    if (cnn !=null && cnn!=""){
        newChannel(cnn);
    }  
    $('#myModal').modal('hide');
});
$('#myModal').on('shown.bs.modal', function () {
    $('#iCreate').focus();
});

$('#ch_input').on('keypress',function(e) {
    if(e.which == 13) {
        zchan=$('#ssChannel').text();
        d=new Date();
        zdate=("0"+d.getDate()).slice(-2)+ "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() 
        + " &nbsp;"+ ("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2);

        zuser='LauraC';
        ztext=$('#ch_input').val();

        let zdata=[zchan,zdate,zuser,ztext];
        aEntries.push(zdata);
        showItem(zdata);
        $('#ch_input').val('');
        return false;
    }
    
});

$('#search').on('keypress',function(e) {
    if(e.which == 13) {
        do_search();
    }  
});

$('#btn_search').on('click',function(e) {
    if ($(this).html().includes('search')){
        do_search();
    } else{
        textChannel=$('#ssChannel').text();
        $('#btn_search').html('<i class="fa fa-search"></i>');
        $('#sContent').html('');
        $('#search').val('');
        aEntries.forEach(function(entry){
            if (entry[0]==textChannel){
                showItem(entry);
            }
        });
    }
});

function do_search(){
    needle=$('#search').val().toLowerCase();
    textChannel=$('#ssChannel').text();
    $('#sContent').html('');
    aEntries.forEach(function(entry){
        if (entry[0]==textChannel){
            if ((entry[2]).toLowerCase().includes(needle) || (entry[3]).toLowerCase().includes(needle)){    
              showItem(entry,needle);
            }  
        }
    });
    $('#btn_search').html('<i class="fa fa-times"></i>');
}


$('#myModal').on('keypress',function(e) {
    if(e.which == 13) {
        $('#bCreate').click();
        return false;
    }
    
});


$(document).ready(function(){
    $('.channel__input').hide();
})