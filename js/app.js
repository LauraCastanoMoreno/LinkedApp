aChannels=["General","Dudas","Recursos"]
aEntries=[["General","20 de enero","diezy cuarto","Laura","Me parece interesante"],["General","2de febrero","once","Laura","Si"],["Dudas","marzo","ocho","Laura","¿Que?"]]


function newChannel(name){
    // if not in channels
    aChannels.push(name);
    addChannel(name);
}


function addChannel(name){
    $('#dChannels').append('<div>'+name+'</div>')
}

aChannels.forEach(element => {
     addChannel(element)
});
$('#bChannels').click(function(){
    var cnn = prompt("What's your sign?");
    newChannel(cnn);
})