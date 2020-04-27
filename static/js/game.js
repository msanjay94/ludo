//Todo : endgame check

const safeZones = [1, 9, 14, 22, 27, 35, 40, 48];
const endZones = ["p1-h", "p2-h", "p3-h", "p4-h"];
const stars = [9, 22, 35, 49];
const playerHomes = {
    "1": 1,
    "2": 14,
    "3": 27,
    "4": 40
};
const pColors = {
    "1": "red",
    "2": "#01f301",
    "3": "#ffbe00",
    "4": "#2f9dfb"
};

const pDarkColors = {
    "1": "#980000",
    "2": "#009800",
    "3": "#967000",
    "4": "#006098"
}

function mergeCoins(box, player, ids) {
    //Todo : vettu
    if (ids.length > 4) {
        return;
    }

    if (player > 4) {
        return;
    }

    if (safeZones.indexOf(box) != -1) {
        return;
    }

    var rows = 0,
        columns = 0;
    if (ids.length == 1) {
        rows = 1, columns = 1;
    } else if (ids.length <= 4) {
        rows = 2, columns = 2;
    }

    var colors = [];
    for (var i = 0; i < ids.length; i++) {
        var id = "p" + player + "c" + ids[i];
        var color = pColors[player];
        if (box[0] == 'p') {
            color = "white";
        }
        colors.push({ "id": id, "color": color });
    }

    var table = "";
    var index = 0;

    var boxId = "#box-" + box;
    var marginTop = null;
    if ($(boxId).find("span").length) {
        var span = $(boxId).find("span");
        var h = $(span).outerHeight();
        var mt = Number($(span).css('margin-top').split("px")[0]);
        h = Math.ceil(h + mt);
        marginTop = "margin-top: -" + h + "px";
    }

    var factor = rows > columns ? rows : columns;
    for (var i = 0; i < rows; i++) {
        table += "<tr>";
        for (var j = 0; j < columns; j++) {
            var ele = (index < colors.length ? colors[index] : "");
            if (ele) {
                var id = ele.id;
                table += "<td id='" + id + "'>" + getCoin(ele, factor) + "</td>";
            }
            index++;
        }
        table += "</tr>";
    }
    table = "<table style='height:100%; width:100%;" + marginTop + "'><tbody>" + table + "</tbody></table>";
    if (marginTop) {
        $(boxId).find("table").each(function(index, element) {
            $(element).remove();
        });
        $(boxId).append(table);
    } else {
        $(boxId).html(table);
    }
}

function setBoxStateAtSafeZone(box, boxState) {
    mergeAtSafeZone(box, boxState[1] || [], boxState[2] || [], boxState[3] || [], boxState[4] || []);
    boxStates[box] = boxState;
}

function mergeAtSafeZone(box, p1, p2, p3, p4, callback) {
    if (safeZones.indexOf(box) == -1 && endZones.indexOf(box) == -1) {
        return;
    }
    if (p1.length > 4 || p2.length > 4 || p3.length > 4 || p4.length > 4) {
        return;
    }
    var boxId = "#box-" + box;
    var total = p1.length + p2.length + p3.length + p4.length;
    var rows = 0,
        columns = 0;
    if (total == 1) {
        rows = 1, columns = 1;
    } else if (total <= 4) {
        rows = 2, columns = 2;
    } else if (total <= 9) {
        rows = 3, columns = 3;
    } else {
        rows = 4, columns = 4;
    }

    var marginTop = "";
    if (stars.indexOf(box) != -1) {
        var h = $(boxId).find(".star").outerHeight() + 2;
        marginTop = "margin-top:-" + h + "px";
    }

    var colors = [];
    for (var i = 0; i < p1.length; i++) {
        var id = "p1c" + p1[i];
        var color = pColors["1"];
        if (box == 1) {
            color = "white";
        } else if (box == "p1-h") {
            color = "black";
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p2.length; i++) {
        var id = "p2c" + p2[i];
        var color = pColors["2"];
        if (box == 14) {
            color = "white";
        } else if (box == "p2-h") {
            color = "black";
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p3.length; i++) {
        var id = "p3c" + p3[i];
        var color = pColors["3"];
        if (box == 27) {
            color = "white";
        } else if (box == "p3-h") {
            color = "black";
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p4.length; i++) {
        var id = "p4c" + p4[i];
        var color = pColors["4"];
        if (box == 40) {
            color = "white";
        } else if (box == "p4-h") {
            color = "black";
        }
        colors.push({ "id": id, "color": color });
    }

    var table = "";
    var index = 0;

    var factor = rows > columns ? rows : columns;
    for (var i = 0; i < rows; i++) {
        table += "<tr>";
        for (var j = 0; j < columns; j++) {
            var ele = (index < colors.length ? colors[index] : "");
            if (ele) {
                var id = ele.id;
                table += "<td id='" + id + "'>" + getCoin(ele, factor) + "</td>";
            }
            index++;
        }
        table += "</tr>";
    }
    table = "<table style='height:100%; width:100%;" + marginTop + "'><tbody>" + table + "</tbody></table>";
    if (marginTop) {
        var starElement = $(boxId).find(".star")[0].outerHTML;
        $(boxId).html(starElement + table);
    } else {
        $(boxId).html(table);
    }
    if (callback) {
        callback();
    }
}

function getCoin(color, factor, border) {
    if (!border) {
        border = "border: 1px solid black";
    }
    var bgColor = color["color"];
    var radius = $("#box-1").outerHeight();
    radius = radius / factor;
    radius = Math.floor(radius * 0.75);
    return "<div style='margin:auto; background-color:" + bgColor + ";border-radius:50%; height:" + radius + "px; width: " + radius +
        "px;" + border + "'></div>";
}

function getNextCurPos(player, curPos, offset) {
    if (curPos == 'p' + player + '-h') {
        return -1;
    }
    switch (player) {
        case 1:
            if (curPos[0] == 'p') {
                var hId = Number(curPos.split("-")[1][1]);
                if (hId == 5 && offset == 1) {
                    return "p1-h";
                } else if (hId + offset > 6) {
                    return -1;
                } else {
                    return "p1-h" + (hId + 1);
                }
            } else {
                curPos = Number(curPos) + 1;
                if (curPos == 52) {
                    curPos = "p1-h1";
                }
                return curPos;
            }
        case 2:
            if (curPos[0] == 'p') {
                var hId = Number(curPos.split("-")[1][1]);
                if (hId + offset == 6) {
                    return "p2-h";
                } else if (hId + offset > 6) {
                    return -1;
                } else {
                    return "p2-h" + (hId + 1);
                }
            } else {
                curPos = Number(curPos) + 1;
                if (curPos == 13) {
                    curPos = "p2-h1";
                } else if (curPos == 53) {
                    curPos = 1;
                }
                return curPos;
            }
            break;
        case 3:
            if (curPos[0] == 'p') {
                var hId = Number(curPos.split("-")[1][1]);
                if (hId + offset == 6) {
                    return "p3-h";
                } else if (hId + offset > 6) {
                    return -1;
                } else {
                    return "p3-h" + (hId + 1);
                }
            } else {
                curPos = Number(curPos) + 1;
                if (curPos == 26) {
                    curPos = "p3-h1";
                } else if (curPos == 53) {
                    curPos = 1;
                }
                return curPos;
            }
            break;
        case 4:
            if (curPos[0] == 'p') {
                var hId = Number(curPos.split("-")[1][1]);
                if (hId + offset == 6) {
                    return "p4-h";
                } else if (hId + offset > 6) {
                    return -1;
                } else {
                    return "p4-h" + (hId + 1);
                }
            } else {
                curPos = Number(curPos) + 1;
                if (curPos == 39) {
                    curPos = "p4-h1";
                } else if (curPos == 53) {
                    curPos = 1;
                }
                return curPos;
            }
            break;
    }
}

function moveCoin(player, coinNumber, offset, random, prevId, html, callback) {
    if (moving) {
        if (moving != random) {
            return;
        }
    } else {
        moving = Math.random();
    }
    if (offset > 6) {
        moving = false;
        return;
    }
    var coinId = "#p" + player + "c" + coinNumber;
    if (isCoinAtBase(coinId)) {
        moving = false;
        return;
    }
    var id = $($(coinId).parents('div')[0]).attr('id');
    var curPos = id.substring(id.indexOf("-") + 1);
    var oldPos = curPos;
    curPos = getNextCurPos(player, curPos, offset);
    if (curPos == -1) {
        moving = false;
        return;
    }
    var bstatet = boxStates[oldPos];
    var array = [];
    if (bstatet) {
        array = bstatet[player] || [];
    }
    if (offset > 0) {
        if (array.indexOf(coinNumber != -1)) {
            array.splice(array.indexOf(coinNumber), 1);
        }
        $(coinId).animate({ 'opacity': 0 }, 200, function() {
            var table = $(coinId).parents('table');
            $(coinId).remove();
            if ($(table).find("td").length == 0) {
                $(table).remove();
            }
            if (prevId && html) {
                $(prevId).html(html);
                prevId = null;
                html = null;
            }

            var boxId = "#box-" + curPos;
            var boxState = boxStates[curPos] || {};
            if (safeZones.indexOf(curPos) != -1 || endZones.indexOf(curPos) != -1) {
                if (offset == 1) {
                    // merge
                    var playersAtBox = boxState[player] || [];
                    playersAtBox.push(coinNumber);
                    boxState[player] = playersAtBox;
                    setBoxStateAtSafeZone(curPos, boxState);
                    if (callback) {
                        callback(false);
                    }
                } else {
                    // jump
                    if ($(boxId).children().length != 0) {
                        html = $(boxId).html();
                        prevId = boxId;
                    } else {
                        html = null;
                        prevId = null;
                    }
                    var bstates = {};
                    bstates[1] = [];
                    bstates[2] = [];
                    bstates[3] = [];
                    bstates[4] = [];
                    bstates[player].push(coinNumber);
                    mergeAtSafeZone(curPos, bstates[1], bstates[2], bstates[3], bstates[4]);
                }
            } else {
                if (offset == 1) {
                    // vettu
                    var kill = false;
                    for (var i = 1; i <= 4; i++) {
                        if (i != player) {
                            var coins = boxState[i] || [];
                            for (var j in coins) {
                                goHome(i, coins[j], true);
                                kill = true;
                            }
                        }
                    }

                    var playersAtBox = boxState[player] || [];
                    playersAtBox.push(coinNumber);
                    mergeCoins(curPos, player, playersAtBox);
                    boxState[player] = playersAtBox;
                    boxStates[curPos] = boxState;
                    if (callback) {
                        callback(kill);
                    }
                } else {
                    // jump
                    if ($(boxId).children().length != 0 || Object.keys(boxState).length != 0) {
                        html = $(boxId).html();
                        prevId = boxId;
                    } else {
                        html = null;
                        prevId = null;
                    }
                    var pbox = [];
                    pbox.push(coinNumber);
                    mergeCoins(curPos, player, pbox);
                }
            }
            $(coinId).animate({ 'opacity': 1 }, 200, function() {
                moveCoin(player, coinNumber, offset - 1, moving, prevId, html, callback);
            });
        });
    } else {
        moving = false;
    }
}

function startBlink(objectId, player, blinkColors, defaultColor) {
    cblink = true;
    blink(objectId, player, blinkColors, defaultColor);
}

function blink(objectId, player, colors, defaultColor) {
    var animeSpeed = 300;
    if (!defaultColor) {
        defaultColor = pColors[player];
    }
    if (!cblink) {
        $(objectId).animate({ 'background-color': defaultColor });
        return;
    }
    if (!colors || colors.length == 0) {
        colors = [pDarkColors[player], pColors[player]];
    }
    $(objectId).animate({ 'background-color': colors[0] }, animeSpeed, function() {
        var newColors = [colors[1], colors[0]];
        blink(objectId, player, newColors);
    });
}

function setHomeDiv() {
    var height = $("#home").outerHeight() / 2;
    height += "px";
    $("#home").css({
        'border-top': height + ' solid ' + pColors["3"],
        'border-bottom': height + ' solid ' + pColors["1"],
        'border-left': height + ' solid ' + pColors["2"],
        'border-right': height + ' solid ' + pColors["4"],
    });

    var boxD = Math.ceil($("#box-1").outerHeight());
    var json = { 'width': boxD + "px", 'height': boxD + "px" };
    $("#box-p1-h").css(json);
    $("#box-p2-h").css(json);
    $("#box-p3-h").css(json);
    $("#box-p4-h").css(json);

    var homeD = Math.ceil($("#home").outerHeight());
    var t1 = -1 * Math.ceil(homeD / 2);
    $("#box-p3-h").css({ 'margin-top': t1 + "px" });
    $("#box-p2-h").css({ 'margin-left': t1 + "px" });
    var t2 = -1 * Math.ceil(boxD / 2);
    $("#box-p4-h").css({ 'margin-left': (-1 * t2) + "px" });
    $("#box-p4-h").css({ 'margin-top': '-' + boxD + "px" });
    $("#box-p3-h").css({ 'margin-left': t2 + "px" });
    $("#box-p1-h").css({ 'margin-left': t2 + "px" });
}

function setVerticalPathway(element, bgClass, top) {
    var div = "",
        bgm = "",
        bgr = "",
        bgl = "";
    var bl = "",
        bt = "",
        bb = "",
        br = " br-r";
    var arrow = "";
    var starl = "",
        starr = "";
    var lid = 0,
        rid = 0,
        mid = 0;
    for (var i = 0; i < 6; i++) {
        if (top) {
            lid = 24 - i;
            rid = 26 + i;
            if (i == 0) {
                mid = 25;
                arrow = "<span class='glyphicon glyphicon-arrow-down arrow p3-fcolor'></span>";
            } else {
                arrow = "";
                mid = "p3-h" + (i);
            }
            if (i == 2) {
                starl = "<span class='glyphicon glyphicon-star-empty star'></span>";
            } else {
                starl = "";
            }
            if (i != 0) {
                bgm = " " + bgClass;
            }
            if (i == 1) {
                bgr = " " + bgClass;
            } else {
                bgr = "";
            }
            bb = " br-b";
        } else {
            lid = 5 - i;
            rid = 45 + i;
            mid = "p1-h" + (5 - i);
            if (lid == 0) {
                lid = 52;
            }
            if (i == 5) {
                arrow = "<span class='glyphicon glyphicon-arrow-up p1-fcolor arrow'></span>";
                mid = 51;
            }
            if (i == 3) {
                starr = "<span class='glyphicon glyphicon-star-empty star'></span>";
            } else {
                starr = "";
            }
            if (i != 5) {
                bgm = " " + bgClass;
            } else {
                bgm = "";
            }
            if (i == 4) {
                bgl = " " + bgClass;
            } else {
                bgl = "";
            }
            bt = " br-t";
        }
        div += "<div class='pw-row'>\
                    <div id = 'box-" + lid + "' class='pw-box" + bgl + bt + br + bb + "'>" + starl + "</div>\
                    <div id = 'box-" + mid + "' class='pw-box" + bgm + bt + br + bb + "'>" + arrow + "</div>\
                    <div id = 'box-" + rid + "'  class='pw-box" + bgr + bt + bb + "'>" + starr + "</div>\
                </div>";
    }
    $(element).html(div);
}

function setHorizontalPathway(element, bgClass, left) {
    var div = "",
        bgm = "",
        bgt = "",
        bgb = "";
    var bl = "",
        br = "",
        bt = "",
        bb = " br-b";
    var tid = 0,
        bid = 0,
        mid = 0;
    var arrow = "";
    var start = "",
        starb = "";
    for (var i = 0; i < 6; i++) {
        if (left) {
            tid = 13 + i;
            bid = 11 - i;
            if (i == 0) {
                arrow = "<span class='glyphicon glyphicon-arrow-right p2-fcolor arrow'></span>";
                mid = 12;
            } else {
                arrow = "";
                mid = "p2-h" + (i);
            }
            if (i == 2) {
                starb = "<span class='glyphicon glyphicon-star-empty star'></span>";
            } else {
                starb = "";
            }
            if (i != 0) {
                bgm = " " + bgClass;
            }
            if (i == 1) {
                bgt = " " + bgClass;
            } else {
                bgt = "";
            }
            if (i == 0) {
                arrowClass = " arrow";
            }
            br = " br-r";
        } else {
            tid = 32 + i;
            bid = 44 - i;
            mid = "p4-h" + (5 - i);
            if (i == 5) {
                mid = 38;
                arrow = "<span class='glyphicon glyphicon-arrow-left p4-fcolor arrow'></span>";
            }
            if (i == 3) {
                start = "<span class='glyphicon glyphicon-star-empty star'></span>";
            } else {
                start = "";
            }
            if (i != 5) {
                bgm = " " + bgClass;
            } else {
                bgm = "";
            }
            if (i == 4) {
                bgb = " " + bgClass;
            } else {
                bgb = "";
            }
            if (i == 5) {
                arrowClass = " arrow";
            }
            bl = " br-l";
        }
        div += "<div class='pw-col'>\
                    <div id = 'box-" + tid + "''  class='pw-box" + bgt + bl + bb + br + "'>" + start + "</div>\
                    <div id = 'box-" + mid + "''  class='pw-box" + bgm + bl + bb + br + "'>" + arrow + "</div>\
                    <div id = 'box-" + bid + "''  class='pw-box" + bgb + bl + br + "'>" + starb + "</div>\
                </div>";
    }
    $(element).html(div);
}

function setPlayerIds(callback) {
    $("#bottom .playerbase-left .player").each(function(index, element) {
        var id = "p1c" + (index + 1);
        $(element).attr('id', id);
    });

    $("#top .playerbase-left .player").each(function(index, element) {
        var id = "p2c" + (index + 1);
        $(element).attr('id', id);
    });

    $("#top .playerbase-right .player").each(function(index, element) {
        var id = "p3c" + (index + 1);
        $(element).attr('id', id);
    });

    $("#bottom .playerbase-right .player").each(function(index, element) {
        var id = "p4c" + (index + 1);
        $(element).attr('id', id);
    });

    if (callback) {
        callback();
    }
}

function isCoinAtBase(coinId) {
    if ($(coinId).parent().find(".player").length) {
        return true;
    }
    return false;
}

function startPlayer(playerNumber, coinNumber, callback) {
    var coinId = "#p" + playerNumber + "c" + coinNumber;
    if (!isCoinAtBase(coinId)) {
        return;
    }
    $(coinId).animate({ "background-color": "#fff" }, 500, function() {
        $(coinId).attr('id', '');
        var homeBox = playerHomes[playerNumber];
        var boxState = boxStates[homeBox] || {};
        var playersAtBox = boxState[playerNumber] || [];
        playersAtBox.push(coinNumber);
        boxState[playerNumber] = playersAtBox;
        setBoxStateAtSafeZone(homeBox, boxState);
        if (callback) {
            callback();
        }
    });
}

function goHome(player, coinNumber, start, prevId, prevHtml) {
    var coinId = "#p" + player + "c" + coinNumber;
    if (isCoinAtBase(coinId)) {
        return;
    }
    var boxId = $($(coinId).parents('div')[0]).attr('id');
    var curPos = boxId.substring(boxId.indexOf("-") + 1);
    if (start) {
        var array = boxStates[curPos][player];
        array.splice(array.indexOf(coinNumber), 1);
    }
    if (curPos[0] == 'p') {
        return;
    } else {
        curPos = Number(curPos);
        if (start && safeZones.indexOf(curPos) != -1) {
            return;
        }
        var html = document.getElementById(coinId.substring(1)).outerHTML;
        $(coinId).animate({ 'opacity': '0.0' }, 50, function() {
            $(coinId).remove();
            if (prevId && prevHtml) {
                $(prevId).html(prevHtml);
                prevId = null;
                prevHtml = null;
            }
            curPos = curPos - 1;
            if (curPos == 0) {
                curPos = 52;
            }
            var boxId = "#box-" + curPos;
            var marginTop = "";
            if ($(boxId).find("span").length) {
                var span = $(boxId).find("span");
                var h = $(span).outerHeight();
                var mt = Number($(span).css('margin-top').split("px")[0]);
                h = Math.ceil(h + mt);
                marginTop = "margin-top: -" + h + "px";
            }
            var table = "<table style='height:100%; width:100%;" + marginTop + "'><tbody>" + html + "</tbody></table>";
            prevHtml = $(boxId).html();
            prevId = boxId;
            if (marginTop) {
                var spanElement = $(boxId).find("span")[0].outerHTML;
                $(boxId).html(spanElement + table);
            } else {
                $(boxId).html(table);
            }
            if (player == 1 && curPos == 1) {
                endPlayer(player, coinNumber, prevId, prevHtml);
            } else if (player == 2 && curPos == 14) {
                endPlayer(player, coinNumber, prevId, prevHtml);
            } else if (player == 3 && curPos == 27) {
                endPlayer(player, coinNumber, prevId, prevHtml);
            } else if (player == 4 && curPos == 40) {
                endPlayer(player, coinNumber, prevId, prevHtml);
            } else {
                goHome(player, coinNumber, false, prevId, prevHtml);
            }
        });
    }
}

function endPlayer(player, coinNumber, prevId, prevHtml) {
    var coinId = "#p" + player + "c" + coinNumber;
    if (isCoinAtBase(coinId)) {
        return;
    }
    var boxId = prevId;
    $(coinId).animate({ 'opacity': '0.0' }, 50, function() {
        $(coinId).remove();
        $(boxId).html(prevHtml);
        switch (player) {
            case 1:
                var coinBase = $("#bottom .playerbase-left .player")[coinNumber - 1];
                $(coinBase).attr('id', 'p1c' + coinNumber);
                $(coinBase).animate({ 'background-color': pColors[player] }, 200);
                break;
            case 2:
                var coinBase = $("#top .playerbase-left .player")[coinNumber - 1];
                $(coinBase).attr('id', 'p2c' + coinNumber);
                $(coinBase).animate({ 'background-color': pColors[player] }, 200);
                break;
            case 3:
                var coinBase = $("#top .playerbase-right .player")[coinNumber - 1];
                $(coinBase).attr('id', 'p3c' + coinNumber);
                $(coinBase).animate({ 'background-color': pColors[player] }, 200);
                break;
            case 4:
                var coinBase = $("#bottom .playerbase-right .player")[coinNumber - 1];
                $(coinBase).attr('id', 'p4c' + coinNumber);
                $(coinBase).animate({ 'background-color': pColors[player] }, 200);
                break;
        }
    });

}

function isCoinFinished(player, coinNumber) {
    var coinId = "#p" + player + "c" + coinNumber;
    return $(coinId).parents('.player-home').length == 1;
}

function highlightCoins(player, coinIds) {
    var boxState = boxStates[playerHomes[player]] || {};
    var t = {};
    t[1] = [];
    t[2] = [];
    t[3] = [];
    t[4] = [];
    t[player] = boxState[player] || [];
    if (t[player].length > 0) {
        mergeAtSafeZone(playerHomes[player], t[1], t[2], t[3], t[4]);
    }
    for (var index in coinIds) {
        var coinId = coinIds[index];
        if (isCoinAtBase(coinId)) {
            $(coinId).css({ 'border': '3px dashed black' }).addClass('loader');
        } else {
            coinId = coinId + " div";
            $(coinId).css({ 'border': '2px dashed black' }).addClass('loader');
            var boxId = $($(coinId).parents('div')[0]).attr('id');
            var curPos = boxId.substring(boxId.indexOf("-") + 1);
            var blinkColors = [pDarkColors[player], pColors[player]];
            var defaultColor = pColors[player];
            if (curPos == playerHomes[player] || curPos[0] == 'p') {
                blinkColors = [pDarkColors[player], "white"];
                defaultColor = "white";
            }
            startBlink(coinId, player, blinkColors, defaultColor);
        }
    }
}

function noHighlightCoins(player, coinIds, callback) {
    cblink = false;
    for (var index in coinIds) {
        var coinId = coinIds[index];
        if (isCoinAtBase(coinId)) {
            $(coinId).css({ 'border': '1px solid black' }).removeClass('loader');
        } else {
            coinId = coinId + " div";
            $(coinId).css({ 'border': '1px solid black' }).removeClass('loader');
        }
    }
    var boxState = boxStates[playerHomes[player]] || {};
    mergeAtSafeZone(playerHomes[player], boxState[1] || [], boxState[2] || [], boxState[3] || [], boxState[4] || [], callback);
}

function game() {
    if (state == ROLL) {
        rollDice(function(value) {
            diceValue = value;
            // console.log("Player: " + currentPlayer + ", Dice value: " + diceValue);
            state = MOVE;
            game();
        });
    } else {
        var array = [];
        for (var i = 1; i <= 4; i++) {
            var coinId = "#p" + currentPlayer + "c" + i;
            if (isCoinFinished(currentPlayer, i)) {
                continue;
            } else if (isCoinAtBase(coinId)) {
                if (diceValue == 6) {
                    array.push(coinId);
                }
            } else {
                var boxId = $($(coinId).parents('div')[0]).attr('id');
                var curPos = boxId.substring(boxId.indexOf("-") + 1);
                if (curPos[0] == 'p') {
                    var hId = Number(curPos.split("-")[1][1]);
                    if (hId + diceValue < 6) {
                        array.push(coinId);
                    }
                } else {
                    array.push(coinId);
                }
            }
        }
        if (array.length == 0) {
            setTimeout(function() {
                getNextPlayer(function() {
                    state = ROLL;
                    game();
                });
            }, 991);
        } else {
            activeCoinIds = array;
            startBlink("#base-p" + currentPlayer, currentPlayer);
            highlightCoins(currentPlayer, array);
            setOnclicks(currentPlayer, array, diceValue);
        }
    }
}

function setOnclicks(player, coinIds, diceValue) {
    for (var index in coinIds) {
        var coinId = coinIds[index];
        if (!isCoinAtBase(coinId)) {
            $(coinId).attr('onclick', 'coinStateChange(' + player + ', \'' + coinId + '\', ' + MOVE + ', ' + diceValue + ')');
        } else {
            $(coinId).attr('onclick', 'coinStateChange(' + player + ', \'' + coinId + '\', ' + START + ')');
        }
    }
}

function coinStateChange(player, coinId, newState, diceValue) {
    for (var index in activeCoinIds) {
        var activeCoinId = activeCoinIds[index];
        $(activeCoinId).attr('onclick', 'return false');
    }
    if (newState == START) {
        var coinNumber = coinId.split("c")[1];
        noHighlightCoins(player, activeCoinIds, function() {
            startPlayer(player, coinNumber, function() {
                setTimeout(function() {
                    state = ROLL;
                    game();
                }, 991);
            });
        });
    } else if (newState == MOVE) {
        var coinNumber = coinId.split("c")[1];
        moveCoin(player, coinNumber, diceValue, null, null, null, function(isKill) {
            noHighlightCoins(player, activeCoinIds, function() {
                state = ROLL;
                if (diceValue == 6 || isKill || isCoinFinished(player, coinNumber)) {
                    setTimeout(function() {
                        state = ROLL;
                        game();
                    }, 991);
                } else {
                    setTimeout(function() {
                        getNextPlayer(function() {
                            state = ROLL;
                            game();
                        });
                    }, 991);
                }
            });
        });
    }
}

function getNextPlayer(callback) {
    var currentIndex = players.indexOf(currentPlayer);
    var nextPlayerIndex = (currentIndex + 1) % players.length;
    currentPlayer = players[nextPlayerIndex];
    if (callback) {
        callback();
    }
}

function getRandomDiceValue() {
    return Math.floor(Math.random() * 10 % 6) + 1;
}

function rollDice(callback) {
    //TODO from server
    $(".dicediv").each(function(index, element) {
        $(this).hide();
        $(this).unbind();
    });
    var diceId = "#diceDivP" + currentPlayer + " .dicediv";
    $(diceId).show();
    startBlink("#base-p" + currentPlayer, currentPlayer);
    startDiceBlink(diceId);
    $(diceId).click(function() {
        cblink = false;
        $(diceId).addClass('dice-spinner');
        setTimeout(function() {
            // var value = getRandomDiceValue();
            var value = 1;
            $(diceId).removeClass('dice-spinner');
            $(diceId).css({ 'opacity': '0.0' });
            $(diceId).removeClass('dice1').removeClass('dice2').removeClass('dice3').removeClass('dice4').removeClass('dice4').removeClass('dice6').addClass('dice' + value);
            $(diceId).css({ 'opacity': '1.0' });
            if (callback) {
                callback(value);
            }
        }, 1000);
    });
}

function startDiceBlink(diceId) {
    cblink = true;
    diceBlink(diceId);
}

function diceBlink(diceId, opacity) {
    if (!cblink) {
        $(diceId).css({ 'opacity': '1.0' });
        return;
    }
    if (!opacity) {
        opacity = 0;
    }
    $(diceId).animate({ 'opacity': opacity }, 300, function() {
        opacity = opacity ? 0 : 1;
        diceBlink(diceId, opacity);
    });
}