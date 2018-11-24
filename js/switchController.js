

function init()
{
    loadJason();
    setView();
}

function loadJason()
{
    console.log(controllers)
    //$.getJSON(controllersFile, function (data){
     //   console.log (data);
    //});
    //$.each(controllers, function (controller){
    //});
}

function setView()
{
    $.each(controllers, function (key,controller){
        console.log ("Add raw for " + controller.name);
        $("<div id='controllerRaw"+ controller.id+"' class='controllerRaw round-corner'></div>").appendTo($("#view-container"));
        $("<span class='controllerCell'>"+controller.name+"</span>").appendTo($('#controllerRaw'+ controller.id));
        $("<span class='controllerCell' id='controllerCell"+ controller.id+"'></span>").appendTo($('#controllerRaw'+ controller.id));
        $('#controllerCell'+ controller.id).append(createSwitch(controller.id))
        $('#switch'+ controller.id).change(function() {
            if(this.checked) {
                console.log ("set set" + controller.id) ;
                openController(controllers[key]);
                setTimeout(function (){switchOff(controller.id)}, 1000);                
            }
            else
            {
                closeController(controllers[key]);
            }
        });
    });
}

function openController(controller)
{
    $.get(
        controller.host+"/set_521.htm",
        {   CHANNEL_NO:0,
            DO_MODE_C:0,
            DO_STATUS_ENABLE:1,
            PWM_LO_C:1,
            PWM_HI_C:1,
            PWM_CNT_C:0,
            DO_VALUE_P:0,
            DO_VALUE_S:2,
            POWER_DELAYTIME:0,
            ALIAS_CHANNEL:"DO",
            LOGIC_0:"OFF",
            LOGIC_1:"ON",
            Submit:"Submit"},
        function(data) {
           alert('page content: ' + data);
        }
    );
}

function closeController()
{
    
}

function switchOff(id)
{
    $('#switch'+id).prop('checked',false);
}

function createSwitch(id)
{
    var _switch = $('<label class="switch"> <input type="checkbox" id="switch'+ id +'"> <span class="slider round"></span> </label>');
    
    return _switch;
}

var controller = {
    name:"",
    host:"",
    port:"",
    type:"",
    status:""
}

//var controllers = [];
var controllersFile="./data/controllers.json"
