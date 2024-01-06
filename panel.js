(function(){
    'use strict';
    var app = function(){
        console.log('My app constructor');
        this.defineStyles();
        this.showElementBlock();
    };

    app.prototype = {

        defineStyles: function() {
            var style = document.createElement('style');
            style.innerHTML = `.h4ckerContainer { 
                                    position: fixed;
                                    width: 100%;
                                    min-height: 300px;
                                    bottom: 0px;
                                    background-color: white;
                                    border-top: 1px solid gray;
                                    z-index: 2000;
                                }
                                .h4ckerHistoryBlock {
                                    max-height: 265px;
                                }
                                .h4ckerCommandBlock {
                                    display: flex;
                                    flex-wrap: nowrap;
                                }
                                .h4ckerCommandIndicator {
                                    padding-right: 2px;
                                }
                                .h4ckerCommandInput {
                                    width: 100%;
                                    height: 30px;
                                    border: none;
                                }
                                .h4ckerCommandInput:focus-visible {
                                    outline: none;
                                }

                                .`;
            document.getElementsByTagName('head')[0].appendChild(style);
        },

        inputListener: function (ev) {
            if(ev.key === 'Enter') {

            }
        },

        showElementBlock: function() {
            const mainBlock = document.createElement("div");
            mainBlock.className = 'h4ckerContainer';
            document.body.appendChild(mainBlock);
            
            const historyBlock = document.createElement("div");
            historyBlock.className = 'h4ckerHistoryBlock';
            mainBlock.appendChild(historyBlock);


            const commandBlock = document.createElement("div");
            commandBlock.className = 'h4ckerCommandBlock';
            mainBlock.appendChild(commandBlock);

            const commandIndicator = document.createElement("span");
            commandIndicator.className = 'h4ckerCommandIndicator';
            commandIndicator.innerHTML = '$';
            commandBlock.appendChild(commandIndicator);

            const commandInput = document.createElement("input");
            commandInput.type = "text";
            commandInput.className = 'h4ckerCommandInput';
            commandInput.addEventListener('keydown', this.inputListener);
            commandBlock.appendChild(commandInput);
            

        }

    };
    var myApp = new app();
})();