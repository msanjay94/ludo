const safeZones = [1, 9, 14, 22, 27, 35, 40, 48];
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

function mergeAtSafeZone(box, p1, p2, p3, p4) {
    if (safeZones.indexOf(box) == -1) {
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
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p2.length; i++) {
        var id = "p2c" + p2[i];
        var color = pColors["2"];
        if (box == 14) {
            color = "white";
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p3.length; i++) {
        var id = "p3c" + p3[i];
        var color = pColors["3"];
        if (box == 27) {
            color = "white";
        }
        colors.push({ "id": id, "color": color });
    }
    for (var i = 0; i < p4.length; i++) {
        var id = "p4c" + p4[i];
        var color = pColors["4"];
        if (box == 40) {
            color = "white";
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
    switch (player) {
        case 1:
            if (curPos[0] == 'p') {
                var hId = Number(curPos.split("-")[1][1]);
                if (hId + offset > 5) {
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
                if (hId + offset > 5) {
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
                if (hId + offset > 5) {
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
                if (hId + offset > 5) {
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

function moveCoin(player, coinNumber, offset, prevId, html) {
    if (offset > 6) {
        return;
    }
    var coinId = "#p" + player + "c" + coinNumber;
    if (isCoinAtBase(coinId)) {
        return;
    }
    var id = $($(coinId).parents('div')[0]).attr('id');
    var curPos = id.substring(id.indexOf("-") + 1);
    var oldPos = curPos;
    curPos = getNextCurPos(player, curPos, offset);
    if (curPos == -1) {
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
            if (safeZones.indexOf(curPos) != -1) {
                if (offset == 1) {
                    // merge
                    var playersAtBox = boxState[player] || [];
                    playersAtBox.push(coinNumber);
                    boxState[player] = playersAtBox;
                    setBoxStateAtSafeZone(curPos, boxState);
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
                    for (var i = 1; i <= 4; i++) {
                        if (i != player) {
                            var coins = boxState[i] || [];
                            for (var j in coins) {
                                goHome(i, coins[j], true);
                            }
                        }
                    }

                    var playersAtBox = boxState[player] || [];
                    playersAtBox.push(coinNumber);
                    mergeCoins(curPos, player, playersAtBox);
                    boxState[player] = playersAtBox;
                    boxStates[curPos] = boxState;
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
                moveCoin(player, coinNumber, offset - 1, prevId, html);
            });
        });
    }
}

function startBlink(objectId, player) {
    cblink = true;
    blink(objectId, player);
}

function blink(objectId, player, color) {
    var animeSpeed = 200;
    if (!cblink) {
        return;
    } else {
        $(objectId).animate({ 'background-color': pColors[player] });
    }
    if (!color) {
        color = pDarkColors[player];
    }
    if (color == pColors[player]) {
        animeSpeed = 50;
    }
    $(objectId).animate({ 'background-color': color }, animeSpeed, function() {
        if (color == pColors[player]) {
            color = pDarkColors[player]
        } else {
            color == pColors[player]
        }
        blink(objectId, player, color);
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

function startPlayer(playerNumber, coinNumber) {
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