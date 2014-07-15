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
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
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

function fetchdata ( data )
{
        cr.plugins_.UBIOWM.prototype.id = data.id;
		    cr.plugins_.UBIOWM.prototype.dt = data.dt;
		    cr.plugins_.UBIOWM.prototype.name = data.name;
		    cr.plugins_.UBIOWM.prototype.lat = data.coord.lat;
		    cr.plugins_.UBIOWM.prototype.lon = data.coord.lon;
		    cr.plugins_.UBIOWM.prototype.temp = data.main.temp;
		    cr.plugins_.UBIOWM.prototype.pressure = data.main.pressure;
		    cr.plugins_.UBIOWM.prototype.humidity = data.main.humidity;
		    cr.plugins_.UBIOWM.prototype.temp_min = data.main.temp_min;
		    cr.plugins_.UBIOWM.prototype.temp_max = data.main.temp_max;
		    cr.plugins_.UBIOWM.prototype.speed = data.wind.speed;
		    cr.plugins_.UBIOWM.prototype.deg = data.wind.deg;
		    cr.plugins_.UBIOWM.prototype.all = data.clouds.all;
		    cr.plugins_.UBIOWM.prototype.rain3h = data.rain.3h;
		    cr.plugins_.UBIOWM.prototype.snow3h = data.snow.3h;
		    cr.plugins_.UBIOWM.prototype.wid = data.weather[0].id;
		    cr.plugins_.UBIOWM.prototype.main = data.weather[0].main;
		    cr.plugins_.UBIOWM.prototype.desc = data.weather[0].desc;
		    cr.plugins_.UBIOWM.prototype.icon = data.weather[0].icon;
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
      temp = cr.plugins_.UBIOWM.prototype.temp;
      return temp;
    }
    if (type == 1)
    {
      temp = ((cr.plugins_.UBIOWM.prototype.temp - 273.15) * 1.8)) + 32;
      return temp;
    }
    if (type == 2)
    {
      temp = cr.plugins_.UBIOWM.prototype.temp - 273.15;
      return temp;
    }
	};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.WeatherByCity = function (City)
	{
		var AJAX_req = new XMLHttpRequest();
		var url = encodeURI("api.openweathermap.org/data/2.5/weather?q=" & City & "&APPID=" & cr.plugins_.UBIOWM.prototype.APIkey;
		Ajax_req.open("GET", url, true );
		AJAX_req.SetRequestHeader("Content-type", "application/json");
		AJAX_req.onreadystatechange = function()
		{
		  if (AJAX_req.readyState == 4 && AJAX_req.status = 200)
		  {
		    var response JSON.parse( AJAX_req.responseText );
		    fetchdata( response );
		  }
		}
		AJAX_req.send();
	};
	
	Acts.prototype.WeatherByID = function (City)
	{
		var AJAX_req = new XMLHttpRequest();
		var url = encodeURI("api.openweathermap.org/data/2.5/weather?id=" & City & "&APPID=" & cr.plugins_.UBIOWM.prototype.APIkey;
		Ajax_req.open("GET", url, true );
		AJAX_req.SetRequestHeader("Content-type", "application/json");
		AJAX_req.onreadystatechange = function()
		{
		  if (AJAX_req.readyState == 4 && AJAX_req.status = 200)
		  {
		    var response JSON.parse( AJAX_req.responseText );
		    fetchdata( response );
		  }
		}
		AJAX_req.send();
	};
	
	Acts.prototype.WeatherByLatLon = function (Lat, Lon)
	{
		var AJAX_req = new XMLHttpRequest();
		var url = encodeURI("api.openweathermap.org/data/2.5/weather?lat="&Lat&"&lon="&Lon&"&APPID=" & cr.plugins_.UBIOWM.prototype.APIkey;
		Ajax_req.open("GET", url, true );
		AJAX_req.SetRequestHeader("Content-type", "application/json");
		AJAX_req.onreadystatechange = function()
		{
		  if (AJAX_req.readyState == 4 && AJAX_req.status = 200)
		  {
		    var response JSON.parse( AJAX_req.responseText );
		    fetchdata( response );
		  }
		}
		AJAX_req.send();
	};


	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());