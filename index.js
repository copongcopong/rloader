var obj = {};
var prefixes = {
	path: 'path:'
}

obj.add = function(k, v) {
	if(obj[k] === undefined) obj[k] = v;
}

obj.get = function(k, v) {
	if(obj[k] !== undefined) return obj[k];
}

obj.read = function(k, v) {
	if(obj[k] === undefined) obj[k] = v;
}

obj.invoke = function() {
	
	var args = [].slice.call(arguments);
	var k = args.shift();
	obj[k].apply(null, args);
}

obj.addPath = function(k, v) {
	var p = prefixes.path;
	k = p + k;
	
	if(obj[k] === undefined) obj[k] = v;
}

obj.load = function(keypath, filepath) {
	
	var path = this.resolve(keypath, filepath);
	
	if(path) return require(path);
	
}

obj.resolve = function(keypath, filepath) {
	var p = prefixes.path;
	if(obj[p + keypath] === undefined) {
		console.error("path for "+ keypath + " not set.");
		return false;
	} else {
		var path = obj.get( p + keypath) + '/' + filepath;
		return path;
	}
}

module.exports = obj;