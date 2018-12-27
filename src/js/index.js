// for windows
var DIR_SEP = "\\";

function convert() {
    updateCommand();
    $('#results')[0].value = "";
    const exec = require('child_process').exec;
    exec($("#cmd")[0].innerText, cb);
};

function cb(error, stdout, stderr) {
    $('#results')[0].value += stdout;
    $('#results')[0].value += stderr;
}

function updateCommand() {
    var cmdToRun = "c:\\ffmpeg\\bin\\ffmpeg.exe";
    var inputFile = "undefined.mp4";
    var outputFile = "undefined.mp4";
    if ($("#inputFile")[0].files.length > 0) {
        inputFile = $("#inputFile")[0].files[0].path;
        outputFile = inputFile.slice(inputFile.lastIndexOf(DIR_SEP) + 1,
                                     inputFile.lastIndexOf("."));
        outputFile += "." + $("#outputContainer")[0].value;
    }
    var outputDir = "out"
    if ($("#outputDir")[0].files.length > 0) {
        outputDir = $("#outputDir")[0].files[0].path;
    }
    outputDir += DIR_SEP;

    cmdToRun += " -i " + inputFile;
    cmdToRun += " -c:v " + $("#vcodec")[0].value;
    cmdToRun += " -crf " + $("#crf")[0].value;
    cmdToRun += " -c:a copy";
    cmdToRun += " -preset " + $("#preset")[0].selectedOptions[0].value;
    cmdToRun += " -map_metadata 0";
    cmdToRun += " " + outputDir + outputFile;
    cmdToRun += " -y";
    $('#cmd')[0].value = cmdToRun;
}

function init() {
    $("#inputFile")[0].addEventListener("change", function() {
        updateCommand();
    });
    $("#outputDir")[0].addEventListener("change", function() {
        updateCommand();
    });
    $("#outputContainer")[0].addEventListener("change", function() {
        updateCommand();
    });
    $("#crf")[0].addEventListener("change", function() {
        updateCommand();
    });
    $("#preset")[0].addEventListener("change", function() {
        updateCommand();
    });

    {
        var select = $("#crf")[0];
        for (var i = 0; i <= 51; i++) {
            var opt = document.createElement("option");
            opt.text = i;
            select.add(opt);
        }
        // 23 is the default option
        select.selectedIndex = 23;
    }

    {
        var opts = ["ultrafast", "superfast", "veryfast", "faster", "fast",
                    "medium", "slow", "slower", "veryslow"];
        var select = $("#preset")[0];
        opts.forEach(function(name) {
            var opt = document.createElement("option");
            opt.text = name;
            select.add(opt);
        });
        // medium is the default option
        var i = opts.findIndex(function(name) {
            return name == "medium";
        });
        select.selectedIndex = i;
    }

    console.log("loaded");
    updateCommand();
}
