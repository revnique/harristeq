define(function() {
	var EventDispatcher, Events, array, eventSplitter, eventsApi, listenMethods, push, slice, splice, triggerEvents;
	Events = EventDispatcher = {
		on: function(name, callback, context) {
			var events;
			if (!eventsApi(this, "on", name, [callback, context]) || !callback) {
				return this;
			}
			this._events || (this._events = {});
			events = this._events[name] || (this._events[name] = []);
			events.push({
				callback: callback,
				context: context,
				ctx: context || this
			});
			return this; 
		},
		once: function(name, callback, context) {
			var once, self;
			if (!eventsApi(this, "once", name, [callback, context]) || !callback) {
				return this;
			}
			self = this;
			once = _.once(function() {
				self.off(name, once);
				callback.apply(this, arguments);
			});
			once._callback = callback;
			return this.on(name, once, context);
		},
		off: function(name, callback, context) {
			var ev, events, i, j, k, l, names, retain;
			retain = void 0;
			ev = void 0;
			events = void 0;
			names = void 0;
			i = void 0;
			l = void 0;
			j = void 0;
			k = void 0;
			if (!this._events || !eventsApi(this, "off", name, [callback, context])) {
				return this;
			}
			if (!name && !callback && !context) {
				this._events = void 0;
				return this;
			}
			names = (name ? [name] : _.keys(this._events));
			i = 0;
			l = names.length;
			while (i < l) {
				name = names[i];
				if (events = this._events[name]) {
					this._events[name] = retain = [];
					if (callback || context) {
						j = 0;
						k = events.length;
						while (j < k) {
							ev = events[j];
							if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
								retain.push(ev);
							}
							j++;
						}
					}
					if (!retain.length) {
						delete this._events[name];
					}
				}
				i++;
			}
			return this;
		},
		trigger: function(name) {
			var allEvents, args, events;
			if (!this._events) {
				return this;
			}
			args = slice.call(arguments, 1);
			if (!eventsApi(this, "trigger", name, args)) {
				return this;
			}
			events = this._events[name];
			allEvents = this._events.all;
			if (events) {
				triggerEvents(events, args);
			}
			if (allEvents) {
				triggerEvents(allEvents, arguments);
			}
			return this;
		},
		stopListening: function(obj, name, callback) {
			var id, listeningTo, remove;
			listeningTo = this._listeningTo;
			if (!listeningTo) {
				return this;
			}
			remove = !name && !callback;
			if (!callback && typeof name === "object") {
				callback = this;
			}
			if (obj) {
				(listeningTo = {})[obj._listenId] = obj;
			}
			for (id in listeningTo) {
				obj = listeningTo[id];
				obj.off(name, callback, this);
				if (remove || _.isEmpty(obj._events)) {
					delete this._listeningTo[id];
				}
			}
			return this;
		}
	};
	eventSplitter = /\s+/;
	eventsApi = function(obj, action, name, rest) {
		var i, key, l, names;
		if (!name) {
			return true;
		}
		if (typeof name === "object") {
			for (key in name) {
				obj[action].apply(obj, [key, name[key]].concat(rest));
			}
			return false;
		}
		if (eventSplitter.test(name)) {
			names = name.split(eventSplitter);
			i = 0;
			l = names.length;
			while (i < l) {
				obj[action].apply(obj, [names[i]].concat(rest));
				i++;
			}
			return false;
		}
		return true;
	};
	triggerEvents = function(events, args) {
		var a1, a2, a3, ev, i, l;
		ev = void 0;
		i = -1;
		l = events.length;
		a1 = args[0];
		a2 = args[1];
		a3 = args[2];
		switch (args.length) {
			case 0:
				while (++i < l) {
					(ev = events[i]).callback.call(ev.ctx);
				}
				break;
			case 1:
				while (++i < l) {
					(ev = events[i]).callback.call(ev.ctx, a1);
				}
				break;
			case 2:
				while (++i < l) {
					(ev = events[i]).callback.call(ev.ctx, a1, a2);
				}
				break;
			case 3:
				while (++i < l) {
					(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
				}
				break;
			default:
				while (++i < l) {
					(ev = events[i]).callback.apply(ev.ctx, args);
				}
		}
	};
	listenMethods = {
		listenTo: "on",
		listenToOnce: "once"
	};
	_.each(listenMethods, function(implementation, method) {
		Events[method] = function(obj, name, callback) {
			var id, listeningTo;
			listeningTo = this._listeningTo || (this._listeningTo = {});
			id = obj._listenId || (obj._listenId = _.uniqueId("l"));
			listeningTo[id] = obj;
			if (!callback && typeof name === "object") {
				callback = this;
			}
			obj[implementation](name, callback, this);
			return this;
		};
	});
	Events.bind = Events.on;
	Events.unbind = Events.off;
	array = [];
	push = array.push;
	slice = array.slice;
	splice = array.splice;
	return EventDispatcher;
});
