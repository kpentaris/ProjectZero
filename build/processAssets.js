/**
 * @author KPentaris - 22/3/2017.
 */

var fs = require('fs');
function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

var dirs = ["assets"];
console.log("Looking for asset files in: " + dirs);
var files = [];
dirs.forEach(function (dir) {
    getFiles(dir, files);
});

var assetFiles = [];
files.forEach(function (file) {
    if (file.toString().match(/\.(png|gif|jpe?g|svg|ttf|eot|woff)$/)) // TODO Add more asset extensions
        assetFiles.push(file);
});

var s = fs.readFileSync('build/Assets.ts.tpl', {encoding: 'ascii'});
var tpl = s.match(/\/\*\s*@template(.*?) \*\//)[1];

var content = "//generated content begin\r\n";
assetFiles.forEach(function (file) {
    var string = tpl.replace(/@key/g, file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")));
    content += string.replace(/@path/g, file).trim() + "\r\n";
});
content += "//generated content end\r\n";

s = s.replace(/\/\*\s*@template.*?\*\//, content);
fs.writeFileSync('scripts/config/Assets.ts', s, {encoding: 'ascii'});
console.log('generated file scripts/config/Assets.ts');
