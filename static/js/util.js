const loadingDiv = '<div id="loading-dialog" title="Loading">\
    <div style="margin:auto; height:90px; width:90px" id="loginLoader" class="spin-loader"></div>\
</div>';

var dialog = null;
var overlayTimeout = null;

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