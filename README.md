# gp2101-shell-backdoor
Irancell GP-2101 Shell injection backdoor in browser

# Usage:
Save this command as a bookmark in browser and click on it when you are loged in to the modem control panel:
```
javascript:(function () { var script = document.createElement('script'); script.src="https://raw.githubusercontent.com/mahdy-asady/gp2101-shell-backdoor/main/panel.js"; document.body.append(script);})();
```
