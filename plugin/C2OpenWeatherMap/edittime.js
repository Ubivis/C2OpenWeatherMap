function GetPluginSettings()
{
	return {
		"name":			"OpenWeatherMap",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"UBIOWM",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Fetches Weatherinformation from openweathermap.org",
		"author":		"Ubivis Media",
		"help url":		"https://github.com/Ubivis/C2OpenWeatherMap/new/master/",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
AddComboParamOption("Kelvin");
AddComboParamOption("Fahrenheit");
AddComboParamOption("Celsius");
AddComboParam("type", "Return temperature as", 0);
AddCondition(0, cf_deprecated, "Return Temperatur", "Weather", "Returns current temperature as {0}", "Converts and returns current temperature!", "Convert");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
AddStringParam("City", "Name of City.", "London, UK");
AddAction(0, af_none, "Weather by City Name", "Weather", "Update Weather for {0}", "Receive the current weather by City Name!", "WeatherByCity");
AddNumberParam("City", "ID of City.", "2172797");
AddAction(1, af_none, "Weather by City ID", "Weather", "Update Weather for {0}", "Receive the current weather by City ID!", "WeatherByID");
AddNumberParam("Lat", "Latitude of City.", "35");
AddNumberParam("Lon", "Longitude of City.", "139");
AddAction(2, af_none, "Weather by geographic coordinates", "Weather", "Update Weather for {0}, {1}", "Receive the current weather by geogrephic coordinates!", "WeatherByLatLon");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "cid", "root", "cid", "City identification.");
AddExpression(1, ef_return_number, "ddt", "root", "ddt", "Data receiving time unit time, GMT.");
AddExpression(2, ef_return_string, "name", "root", "name", "City name.");
AddExpression(3, ef_return_number, "lat", "coord", "lat", "City Location (Latitude).");
AddExpression(4, ef_return_number, "lon", "coord", "lon", "City Location (Longitude).");
AddExpression(5, ef_return_number, "temp", "main", "temp", "Temperature in Kelvin.");
AddExpression(6, ef_return_number, "pressure", "main", "pressure", "Atmospheric pressure, hPa.");
AddExpression(7, ef_return_number, "humidity", "main", "humidity", "Himidity, %.");
AddExpression(8, ef_return_number, "temp_min", "main", "temp_min", "Minimum temperature at the moment (deviation is possible for large cities and megalopolises)");
AddExpression(9, ef_return_number, "temp_max", "main", "temp_max", "Maximum temperature at the moment (deviation is possible for large cities and megalopolises)");
AddExpression(10, ef_return_number, "speed", "wind", "speed", "Wind speed, mps.");
AddExpression(11, ef_return_number, "deg", "wind", "deg", "Wind direction, degrees (meteorilogical)");
AddExpression(12, ef_return_number, "all", "clouds", "all", "Cloudiness, %");
AddExpression(13, ef_return_number, "rain3h", "rain", "rain3h", "Precipitation volume per 3 hours, mm");
AddExpression(14, ef_return_number, "snow3h", "snow", "snow3h", "Snow volume per 3 hours, mm");
AddExpression(15, ef_return_number, "wid", "weather", "wid", "Weather condition code");
AddExpression(16, ef_return_string, "main", "weather", "main", "Condition name.");
AddExpression(17, ef_return_string, "desc", "weather", "desc", "Condition description.");
AddExpression(18, ef_return_string, "icon", "weather", "icon", "OpenWeatherMap.org icon code");
AddExpression(19, ef_return_number, "celsius", "main", "celsius", "Temperature in Celsius");
AddExpression(20, ef_return_number, "fahrenheit", "main", "fahrenheit", "Temperature in Fahrenheit");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_text, 	"APIkey",		"Enter your API Key",		"API Key to requested on openweathermap.org.");
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
