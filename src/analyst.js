/**
 * Analyst.js
 *
 * A small helper library for working with Google Analytics based on Scientist by Jason Rhodes.
 *
 * @author Philippe Damen
 * @version 0.2
 *
 */

require('autotrack');

var Analyst = function () {

	var lib = this;

	var log = function (message) {
		window.console && window.console.log && window.console.log(message);
	};

	this.initialize = function (UA) {
		ga('create', UA , 'auto');
		return this;
	};

	this.trackPageview = function () {
		ga("send", "pageview");
		return this;
	};

	this.Event = function (category, action) {
		this.category = category;
		this.action = action;
	};

	this.Event.prototype.track = function (params) {
		var category = params.category || this.category;
		var action = params.action || this.action;

		//log([category, action, params.label, params.value, params.noninteraction]);
		ga('send',"event", category, action, params.label, params.value, params.noninteraction);
		return this;
	};

	this.trackEvent = function (params) {
		var event = new this.Event();
		if (!params.category && arguments.length > 1) {
			params = {
				category: arguments[0],
				action: arguments[1],
				label: arguments[2],
				value: arguments[3],
				noninteraction: arguments[4]
			};
		}

		//log(params);
		event.track(params);
		return this;
	};

	this.Events = {};
	this.Events.Registry = {};

	this.Events.register = function (name, category, action) {
		this.Registry[name] = new lib.Event(category, action);
	};

	this.Events.track = function (name, params) {
		this.Registry[name].track(params);
	};

	this.trackEvents = function(){
		addEventHandler(document, 'DOMContentLoaded', function() {
			trackFormData();

			addEventHandler(document.getElementsByClassName("locale_track"), 'click', function(e) {
				var value = e.target.getAttribute('data-analyst-label');
				if(!value) value = e.target.innerHTML;
				lib.trackEvent({category:"Locale", action:"switch-to-"+value, label:value})
			});

			addEventHandler(document.getElementsByClassName("reveal_track"), 'click', function(e) {
				var value = e.target.getAttribute('data-analyst-label');
				if(!value) value = e.target.innerHTML;
				lib.trackEvent({category:"Reveal", action:"reveal-"+value, label:value})
			});

			addEventHandler(document.getElementsByClassName("button_track"), 'click', function(e) {
				var value = e.target.getAttribute('data-analyst-label');
				if(!value) value = e.target.innerHTML;
				lib.trackEvent({category:"Button", action:"button-"+value, label:value})
			});

			addEventHandler(document.getElementsByClassName("track"), 'click', function(e) {
				var label       = e.target.getAttribute('data-analyst-label');
				var category    = e.target.getAttribute('data-analyst-category');
				var action      = e.target.getAttribute('data-analyst-action');
				lib.trackEvent({category:category, action:action, label:label})
			});
		});
	};

	function addEventHandler(elem, eventType, handler) {
		// checks if the element we are hooking a listener to is an array or not.
		if(elem.length >= 1)
		{
			for (var i = 0; i < elem.length; i++) {
				// checks for compatibility with addEventListener method. If not compatible, use attachEvent.
				if (elem[i].addEventListener)
				{
					elem[i].addEventListener (eventType, handler, false);
				}else if (elem[i].attachEvent)	{
					elem[i].attachEvent ('on' + eventType, handler);
				}
			};
		}else{
			if (elem.addEventListener)
			{
				elem.addEventListener (eventType, handler, false);
			}else if (elem.attachEvent)	{
				elem.attachEvent ('on' + eventType, handler);
			}
		}
	}


	this.requireAutotrackAll = function()
	{
		ga('require', 'cleanUrlTracker', {
			stripQuery: true,
			indexFilename: 'index.html',
			trailingSlash: 'remove'
		});
		ga('require', 'eventTracker');
		ga('require', 'impressionTracker');
		ga('require', 'mediaQueryTracker');
		ga('require', 'outboundFormTracker');
		ga('require', 'outboundLinkTracker');
		ga('require', 'pageVisibilityTracker');
		ga('require', 'socialWidgetTracker');
		ga('require', 'urlChangeTracker');
	};

	function trackFormData(){
		addEventHandler(document.getElementsByClassName("form_track"), 'submit', function(event){
			var form = this;
			event.preventDefault();
			var value = event.target.getAttribute('data-analyst-label');
			if(!value) value = event.id;
			lib.trackEvent({category:"Form", action:"submit",label:value,callback: {
				hitCallback: createFunctionWithTimeout(function() {
					form.submit();
				})
			}});
		});
	}

	function createFunctionWithTimeout(callback, opt_timeout) {
		var called = false;
		function fn() {
			if (!called) {
				called = true;
				callback();
			}
		}
		setTimeout(fn, opt_timeout || 1000);
		return fn;
	}
};

