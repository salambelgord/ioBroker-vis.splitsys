/*
    ioBroker.vis splitsys Widget-Set
    version: "0.1.4"
    Copyright 2018 nisiode<nisio.air@mail.com>
    forked by Pix 7/2018 (humidity, shutter)
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "title":          {"en": "Title",       "de": "Titel",  "ru": "Заголовок"},
        "subtitle":       {"en": "Subtitle",      "de": "Untertitel",   "ru": "Подзаголовок"}
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":     {"en": "Instance", "de": "Instanz", "ru": "Инстанция"},
    "open":         {"en": "open", "de": "offen", "ru": "открыто"},
    "tilted":       {"en": "tilted", "de": "gekippt", "ru": "приоткрыто"},
    "closed":       {"en": "closed", "de": "geschlossen", "ru": "закрыто"},
    "on":           {"en": "on", "de": "an", "ru": "вкл"},
    "off":          {"en": "off", "de": "aus", "ru": "выкл"}
});

vis.binds.splitsys = {
    version: "0.0.2",
    showVersion: function () {
        if (vis.binds.splitsys.version) {
            console.log('Version splitsys: ' + vis.binds.splitsys.version);
            vis.binds.splitsys.version = null;
        }
    },tplSplitRem: function (widgetID, view, data) {
        const srcOff = 'widgets/splitsys/img/light_light_dim_00.png';
        const srcOn = 'widgets/splitsys/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.splitsys.tplSplitRem(widgetID, view, data);
            }, 100);
        }

        function update(state){
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }
        
        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    }
};

vis.binds.splitsys.showVersion();
