// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.UBIOWM = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.UBIOWM.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		this.exp_cid = 0;
		this.exp_ddt = 0;
		this.exp_name = "";
		this.exp_lat = 0;
		this.exp_lon = 0;
		this.exp_temp = 0;
		this.exp_pressure = 0;
		this.exp_humidity = 0;
		this.exp_temp_min = 0;
		this.exp_temp_max = 0;
		this.exp_speed = 0;
		this.exp_deg = 0;
		this.exp_all = 0;
		this.exp_rain3h = 0;
		this.exp_snow3h = 0;
		this.exp_wid = 0;
		this.main = 0;
		this.exp_desc = "";
		this.exp_icon = "";
		this.exp_celsius = 0;
		this.exp_fahrenheit = 0;
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

var weather =
{
fetchdata: function ( wetter )
	{	
	this.exp_cid = wetter.id;
	this.exp_wdt = wetter.dt;
	this.exp_name = wetter.name;
	this.exp_lat = wetter.coord.lat;
	this.exp_lon = wetter.coord.lon;
	this.exp_temp = wetter.main.temp;
	this.exp_celsius = wetter.main.temp - 273.15;
	this.exp_fahrenheit = ((wetter.main.temp - 273.15) * 1.8) + 32;
	this.exp_pressure = wetter.main.pressure;
	this.exp_humidity = wetter.main.humidity;
	this.exp_temp_min = wetter.main.temp_min;
	this.exp_temp_max = wetter.main.temp_max;
	this.exp_speed = wetter.wind.speed;
	this.exp_deg = wetter.wind.deg;
	this.exp_all = wetter.clouds.all;
//	this.exp_rain3h = wetter.rain.3h;
//	this.exp_snow3h = wetter.snow.3h;
	this.exp_wid = wetter.weather[0].id;
	this.exp_main = wetter.weather[0].main;
	this.exp_desc = wetter.weather[0].desc;
	this.exp_icon = wetter.weather[0].icon;
	}
}

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
Cnds.prototype.Convert = function (type)
{
    var temp = 0;
    if (type == 0)
    {
      //temp = this.exp_temp;
    }
    if (type == 1)
    {
      //temp = ((this.exp_temp - 273.15) * 1.8)) + 32;
    }
    if (type == 2)
    {
      //temp = this.exp_temp - 273.15;
    }
    return temp;
};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.WeatherByCity = function (City)
	{
	var temperature = 0;
	    var dfd = $.Deferred();
	    var url = "http://api.openweathermap.org/data/2.5/weather?q=";
	    url += City;
	    url += "&cnt=1";
	    url += "&APPID=";
	    url += "cr.plugins_.UBIOWM.prototype.APIkey;";
	    $.ajax({
	        type: "POST",
	        dataType: "jsonp",
	        url: url + "&callback=?",
	        async: false,
	        success: function (data) {
	        	weather.fetchdata( data );
/*	            temperature = data.main.temp;
	            alert(temperature);
	            dfd.resolve(temperature);*/
	        },
	        error: function (errorData) {
	            alert("Error while getting weather data :: " + errorData.status);
	        }
	    });
	    return dfd.promise();
	};
	
	Acts.prototype.WeatherByID = function (City)
	{
	var temperature = 0;
	    var dfd = $.Deferred();
	    var url = "http://api.openweathermap.org/data/2.5/weather?id=";
	    url += City;
	    url += "&cnt=1";
	    url += "&APPID=";
	    url += "cr.plugins_.UBIOWM.exp.APIkey;";
	    $.ajax({
	        type: "POST",
	        dataType: "jsonp",
	        url: url + "&callback=?",
	        async: false,
	        success: function (data) {
	        	weather.fetchdata( data );
/*	            temperature = data.main.temp;
	            alert(temperature);
	            dfd.resolve(temperature);*/
	        },
	        error: function (errorData) {
	            alert("Error while getting weather data :: " + errorData.status);
	        }
	    });
	    return dfd.promise();
	}
	
	Acts.prototype.WeatherByLatLon = function (Lat, Lon)
	{
	var temperature = 0;
	    var dfd = $.Deferred();
	    var url = "http://api.openweathermap.org/data/2.5/weather?lat=";
	    url += Lat;
	    url += "&lon=";
	    url += Lon;
	    url += "&cnt=1";
	    url += "&APPID=";
	    url += "cr.plugins_.UBIOWM.prototype.APIkey;";
	    $.ajax({
	        type: "POST",
	        dataType: "jsonp",
	        url: url + "&callback=?",
	        async: false,
	        success: function (data) {
	        	weather.fetchdata( data );
/*	            temperature = data.main.temp;
	            alert(temperature);
	            dfd.resolve(temperature);*/
	        },
	        error: function (errorData) {
	            alert("Error while getting weather data :: " + errorData.status);
	        }
	    });
	    return dfd.promise();
	};


	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.cid = function (ret)
	{
		ret.set_int(this.exp_cid);
	};

	Exps.prototype.ddt = function (ret)
	{
		ret.set_int(this.exp_ddt);
	};

	Exps.prototype.name = function (ret)
	{
		ret.set_string(this.exp_name);
	};

	Exps.prototype.lat = function (ret)
	{
		ret.set_int(this.exp_lat);
	};

	Exps.prototype.lon = function (ret)
	{
		ret.set_int(this.exp_lon);
	};

	Exps.prototype.temp = function (ret)
	{
		ret.set_int(this.exp_temp);
	};

	Exps.prototype.pressure = function (ret)
	{
		ret.set_int(this.exp_pressure);
	};

	Exps.prototype.humidity = function (ret)
	{
		ret.set_int(this.exp_humidity);
	};

	Exps.prototype.temp_min = function (ret)
	{
		ret.set_int(this.exp_temp_min);
	};

	Exps.prototype.temp_max = function (ret)
	{
		ret.set_int(this.exp_temp_max);
	};

	Exps.prototype.speed = function (ret)
	{
		ret.set_int(this.exp_speed);
	};

	Exps.prototype.deg = function (ret)
	{
		ret.set_int(this.exp_deg);
	};

	Exps.prototype.all = function (ret)
	{
		ret.set_int(this.exp_all);
	};

	Exps.prototype.rain3h = function (ret)
	{
		ret.set_int(this.exp_rain3h);
	};

	Exps.prototype.snow3h = function (ret)
	{
		ret.set_int(this.exp_snow3h);
	};

	Exps.prototype.wid = function (ret)
	{
		ret.set_int(this.exp_wid);
	};

	Exps.prototype.main = function (ret)
	{
		ret.set_int(this.main);
	};

	Exps.prototype.desc = function (ret)
	{
		ret.set_string(this.exp_desc);
	};

	Exps.prototype.icon = function (ret)
	{
		ret.set_string(this.exp_icon);
	};

	Exps.prototype.celsius = function (ret)
	{
		ret.set_int(this.exp_celsius);
	};

	Exps.prototype.fahrenheit = function (ret)
	{
		ret.set_int(this.exp_fahrenheit);
	};
	// ... other expressions here ...

	
	pluginProto.exps = new Exps();

}());
