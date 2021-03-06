const fs        = require('fs-extra');
const path      = require('path');
const Utils     = require('./Utils.js');


/*
 * A room for running sessions.
*/
class Queue {

    constructor(id, jt) {
        this.jt             = jt;
        this.id             = id;
        this.displayName    = id;
        this.apps           = [];
    }

    static load(fn, id, jt) {
        var queue = new Queue(id, jt);

        // Read fields, if any.
        if (fs.existsSync(fn)) {
            var json = Utils.readJSON(fn);
            if (json.displayName !== undefined) {
                queue.displayName = json.displayName;
            }
            if (json.apps !== undefined) {
                queue.apps = json.apps;
            }
        }

        return queue;
    }

    /**
    * Add the app with the given ID to this session.
    *
    * FUNCTIONALITY:
    * - load the given app {@link Session#loadApp}
    * - add app to this session's apps field.
    * - copy app source files {@link Utils#copyFiles}.
    * - save app and its stages {@link App#saveSelfAndChildren}.
    * - emit 'sessionAddApp' message.
    *
    * @param  {string} appId The ID of the app to add to this session.
    */
    addApp(appId, options) {
        var app = {appId: appId, options: options, indexInQueue: this.apps.length+1};
        this.apps.push(app);
        this.save();
        this.jt.socketServer.sendOrQueueAdminMsg(null, 'queueAddApp', {queueId: this.id, app: app});
    }

    shell() {
        var out = {}
        out.id             = this.id;
        out.displayName    = this.displayName;
        out.apps           = this.apps;
        return out;
    }

    /**
    * this - description
    *
    * @return {type}  description
    */
    save() {
        try {
            fs.writeJSONSync(this.jt.data.queuePath(this.id), this.shell(), {spaces: 4});
        } catch (err) {
            console.log(err);
        }
    }

}

var exports = module.exports = {};
exports.new = Queue;
exports.load = Queue.load;
