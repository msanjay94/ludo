const loadingDiv = '<div id="loading-dialog" title="Loading">\
    <div style="margin:auto; height:90px; width:90px" id="loginLoader" class="spin-loader"></div>\
</div>';
const initDiv = '<div style="font-size:1.5em; display:none" id="init-dialog-form" title="Start Game">\
<form>\
<fieldset>\
<div style="width:fit-content; margin:auto; margin-top:20px;">\
<input type="radio" id="2p" name="players" checked><span style="margin-left:10px">2 Players</span></input>\
<input type="radio" id="4p" name="players" style="margin-left:25px"><span style="margin-left:10px">4 Players</span></input>\
</div>\
<div style="margin:auto; width:fit-content; margin-top:40px">\
<div>\
<label>Player 1</label>\
</div>\
<div>\
<input maxlength="10" style="border:1px solid black" type="text" id="p2name" value="" class="text ui-widget-content ui-corner-all">\
</div>\
</div>\
<div style="margin:auto; width:fit-content; margin-top:10px">\
<div>\
<label>Player 2</label>\
</div>\
<div>\
<input maxlength="10" style="border:1px solid black" type="text" id="p2name" value="" class="text ui-widget-content ui-corner-all">\
</div>\
</div>\
<div id="3pdiv" style="display:none; margin:auto; width:fit-content; margin-top:10px">\
<div>\
<label>Player 3</label>\
</div>\
<div>\
<input maxlength="10" style="border:1px solid black" type="text" id="p2name" value="" class="text ui-widget-content ui-corner-all">\
</div>\
</div>\
<div id="4pdiv" style="display:none; margin:auto; width:fit-content; margin-top:10px">\
<div>\
<label>Player 4</label>\
</div>\
<div>\
<input maxlength="10" style="border:1px solid black" type="text" id="p2name" value="" class="text ui-widget-content ui-corner-all">\
</div>\
</div>\
<!-- Allow form submission with keyboard without duplicating the dialog button -->\
<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">\
</fieldset>\
</form>\
<div style="display:none; margin:auto; height:30px" id="loginLoader" class="spin-loader"></div>\
</div>';

var dialog = null;
var overlayTimeout = null;

function openInitDiv(callback) {
    addOverlayElement();
    if ($("#init-dialog-form").length == 0) {
        $("body").append(initDiv);
        $("#2p").click(function() {
            $("#3pdiv").hide();
            $("#4pdiv").hide();
        });
        $("#4p").click(function() {
            $("#3pdiv").show();
            $("#4pdiv").show();
        });
    }
    dialog = $("#init-dialog-form").dialog({
        autoOpen: false,
        height: 550,
        width: 350,
        modal: true,
        show: {
            effect: "clip",
            duration: 300
        },
        hide: {
            effect: "clip",
            duration: 300
        },
        buttons: {
            "Start": function() {
                var twoplayers = $($("#init-dialog-form input[type='radio']")[0]).prop('checked');
                var p1 = $("#init-dialog-form input[type='text'")[0].value;
                var p2 = $("#init-dialog-form input[type='text'")[1].value;
                var p3 = $("#init-dialog-form input[type='text'")[2].value;
                var p4 = $("#init-dialog-form input[type='text'")[3].value;
                callback(twoplayers, p1, p2, p3, p4);
                dialog.dialog('close');
            },
            Cancel: function() {
                clearFields();
                dialog.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
            $("#init-dialog-form").remove();
            hideOverlayElement();
        }
    });

    form = dialog.find("form").on("submit", function(event) {
        event.preventDefault();
    });

    dialog.dialog("open");

}

function showLoading() {
    addOverlayElement();
    if ($("#loading-dialog").length == 0) {
        $("body").append(loadingDiv);
    }
    dialog = $("#loading-dialog").dialog({
        modal: true,
        height: 200,
        width: 200,
        show: {
            effect: "clip",
            duration: 300
        },
        hide: {
            effect: "clip",
            duration: 300
        },
        closeOnEscape: false,
        open: function(event, ui) {
            $(".ui-dialog-titlebar").css({ "visibility": "hidden" });
        },
        close: function() {
            hideOverlayElement();
        }
    });
}

function hideLoading() {
    if ($("#loading-dialog").length) {
        $("#loading-dialog").dialog("close");
    }
}

function addOverlayElement() {
    if (overlayTimeout) {
        clearTimeout(overlayTimeout);
    }
    var div = '<div id="overlay" style="\
            opacity: 0.0;\
            top:0px;\
            left:0px;\
            position: absolute;\
            height: 100%;\
            width: 100%;\
            z-index: 10;\
            background: black;\
        "></div>';
    if (!$("#overlay").length) {
        $("body").append(div);
    }
    $("#overlay").stop().animate({ "opacity": "0.5" }, 300);
    $("#overlay").css({ "z-index": 10 });
}

function hideOverlayElement() {
    $("#overlay").stop().animate({ "opacity": "0.0" }, 300);
    if (overlayTimeout) {
        clearTimeout(overlayTimeout);
    }
    overlayTimeout = setTimeout(function() {
        $("#overlay").css({ "z-index": -10 });
    }, 500);

}