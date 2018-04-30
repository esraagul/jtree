//
// MAKE CHANGES TO 'sharedTemplate.js', not 'shared.js' directly!!!
//
var jt = {};

// Code used by both participant and admin.
jt.socket = null;
jt.timer = null;
jt.data = {};
jt.data.endTime = 0;
jt.data.timeLeft = 0;
jt.data.clockRunning = false;
jt.data.CLOCK_FREQUENCY = 100; // in ms

jt.serverIP = '{{{SERVER_IP}}}';
jt.serverPort = '{{{SERVER_PORT}}}';
jt.server = {};

jt.serverURL = function() {
    if (jt.serverPort === '80') {
        return jt.serverIP;
    } else {
        return jt.serverIP + ':' + jt.serverPort;
    }
}

// For Player only
jt.alwaysShowAllStages = false;

window.onload = function() {
    jt.checkIfLoaded();
}

jt.checkIfLoaded = function() {
        var pId = jt.getPId();
        var pwd = jt.getURLParameter('pwd');

        var type = jt.getURLParameter('type'); // 'admin' == admin
        if (jt.isAdmin()) {
            type = 'ADMIN';
        }

        var sId = jt.getSessionId(); // sessionId

        var roomId = jt.getRoomId();

        var query = {
            query: 'id=' + pId +
            '&pwd=' + pwd +
            '&type=' + type +
            '&sessionId=' + sId +
            '&roomId=' + roomId
        };
        jt.socket = io(jt.serverIP + ':' + jt.serverPort, query);
        jt.socket.on('connect', function() {
            console.log('client.socket connected socketId=' + jt.socket.id);
            jt.socketConnected();
        });

        jt.socket.on('logged-in', function(participant) {
            jt.setPId(participant.id, participant.session.id);
        });

        jt.socket.on('loggedIntoRoom', function(pId) {
            jt.showPId(pId);
        });

        jt.defaultConnected();
        jt.connected();

        if (jt.alwaysShowAllStages) {
            jt.showAllStages();
        }
}

// Overwrite
jt.socketConnected = function() {

}

jt.isAdmin = function() {
    return (
        window.location.pathname.includes('/admin')
    );
}

jt.getSessionId = function() {
    var sId = jt.getURLParameter('sId');
    if (location.pathname.includes('/session/')) {
        var totheright = location.pathname.substring('/session/'.length);
        var nextSlashIndex = totheright.indexOf('/');
        if (nextSlashIndex > 0) {
            sId = totheright.substring(0, nextSlashIndex);
        }
    }
    return sId;
}

jt.getRoomId = function() {
    var out = jt.getURLParameter('roomId');
    if (location.pathname.includes('/room/')) {
        var totheright = location.pathname.substring('/room/'.length);
        var nextSlashIndex = totheright.indexOf('/');
        if (nextSlashIndex > 0) {
            out = totheright.substring(0, nextSlashIndex);
        }
    }
    return out;
}

jt.getPId = function() {
    var pId = jt.getURLParameter('id'); // participant or admin id
    if (pId === null && !jt.isAdmin()) {
        var toSkip;
        // Location is /session/sessionId/pId
        if (location.pathname.startsWith('/session/')) {
            toSkip = '/session/' + jt.getSessionId() + '/';
        }

        // /room/roomId/pId
        else if (location.pathname.startsWith('/room/')) {
            toSkip = '/room/' + jt.getRoomId() + '/';
        }

        // /pId
        else {
            toSkip = '/';
        }
        var whatsLeft = location.pathname.substring(toSkip.length);

        // .../pId/hash
        if (whatsLeft.indexOf('/') > 0) {
            whatsLeft = whatsLeft.substring(0, whatsLeft.index('/'));
        }

        pId = whatsLeft;
    }
    return pId;
}

jt.setPId = function(newPId, newSId) {
    var pId = jt.getPId(); // participant or admin id
    var pwd = jt.getURLParameter('pwd');
    var sId = jt.getSessionId();
    var type = jt.getURLParameter('type');
    var props = '/' + newPId;
    if (pwd !== null) {
        props += '?pwd=' + pwd;
    }
    if (sId !== null) {
        props += '/session/' + newSId;
    }
    if (type !== null) {
        props += '&type=' + type;
    }
    var newURL = window.location.protocol + '//' + window.location.host + props;
//    if (window.location.href !== newURL) {
    if (newPId !== pId) {
        window.location.href = newURL;
    }
    jt.showPId(pId);
}


/**
 * Returns parameter with the given name, null if no parameter with this name exists.
 *
 * @param  {type} name description
 * @return {type}      description
 */
jt.getURLParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

jt.getClock = function(timeLeft) {
    const clock = {};
    var duration = timeLeft + 999;
    if (duration < 0) {
        duration = 0;
    }
    clock.milliseconds    = parseInt((duration%1000)/100)
    clock.seconds         = parseInt((duration/1000)%60)
    clock.minutes         = parseInt((duration/(1000*60))%60)
    clock.hours           = parseInt((duration/(1000*60*60))%24);
    //    hours = (hours < 10) ? "0" + hours : hours;
    //    minutes = (minutes < 10) ? "0" + minutes : minutes;
    clock.seconds = (clock.seconds < 10) ? "0" + clock.seconds : clock.seconds;
    return clock;
}

jt.displayTimeLeft = function(min, secs, timeLeft) {
    let clock = jt.getClock(timeLeft);
    min.text(clock.minutes);
    secs.text(clock.seconds);
}

// Should be overwritten.
jt.defaultConnected = function() {}
jt.connected = function()        {}
jt.showPId = function(id)        {}