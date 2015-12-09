![R3E](https://cloud.githubusercontent.com/assets/12783101/8024034/cd3c7c84-0d24-11e5-9e5f-3bf6fbab713f.png)

# Spectator Web Overlay

The RaceRoom Racing Experience Broadcast Web Overlay allows you to create a web page that is superimposed on the in-game spectator gameplay.

## How get started with development
* Create a basic .html file
* Include r3e.js in your page and you should be good to get started
* Put it on a publicly hosted server
* If you are looking for a basic example take a look at example-overlay.html or the **API reference below**.

## How to use in game

1. Download [RaceRoom Racing Experience](http://store.steampowered.com/app/211500/) from Steam
2. Go into the game's **Properties** in the Steam client and change "SET LAUNCH OPTIONS..." to:
   * -broadcastUrl=http://your-website.com/page/
* Start RaceRoom Racing Experience
* Enter the Multiplayer server list though the game menus
* Join the server you want to spectate
   * **There are no requirements to own the content used on the server**

## API

### r3e.getVehicleInfo
Get vehicle related data based on the slotId passed.

```javascript
r3e.getVehicleInfo({
    'slotId': 0
}, function(vehicleInfo) {
    /*
    // vehicleInfo
    {
        "slotId": "int",
        "rpm": "int",
        "gear": "int",
        "speed": "int", //km per h
        "drsLeft": "int",
        "drsEnabled": "bool"
    }
    */
});
```

### r3e.getPitInfo
Get "pit" related data based on the slotId passed.

```javascript
r3e.getPitInfo({
    'slotId': 0
}, function(pitInfo) {
    /*
    // pitInfo
    {
        "slotId": "int",
        "servedMandatoryPitstop": "bool",
        "tyreType": "string",
        "damage": {
            "engine": "int", // 0 - 100
            "transmission": "int", // 0 - 100
            "frontAero": "int", // 0 - 100
            "rearAero": "int" // 0 - 100
        }
    }
    */
});
```

### r3e.getPushToPassInfo
Get push to pass related data based on the slotId passed.

```javascript
r3e.getPushToPassInfo({
    'slotId': 0
}, function(pushToPassInfo) {
    /*
    // pushToPassInfo
    {
        "active": "bool",
        "allowed": "bool",
        "amountLeft": "int",
        "durationTimer": "int",
        "slotId": "int",
        "waitTimer": "int"
    }
    */
});
```

### r3e.getExtendedInfo
Get extended driver related data based on the slotId passed.

```javascript
r3e.getExtendedInfo({
    'slotId': 0
}, function(extendedInfo) {
    /*
    // extendedInfo
    {
        "slotId": "int",
        "currentSector": "int",
        "currentLapInfo": {
            "valid": "bool",
            "sector1": "int", // milliseconds, -1 if not set
            "sector2": "int", // milliseconds, -1 if not set
            "sector3": "int" // milliseconds, -1 if not set
        },
        "lastTenLapsInfo": [
            {
                "valid": "bool",
                "sector1": "int", // milliseconds, -1 if not set
                "sector2": "int", // milliseconds, -1 if not set
                "sector3": "int" // milliseconds, -1 if not set
            }
        ]
    }
    */
});
```

### r3e.getDriverInfo
Get driver related data based on the slotId passed.

```javascript
r3e.getDriverInfo({
    'slotId': 0
}, function(driverInfo) {
    /*
    // driverInfo
    {
        "name": "string",
        "slotId": "int",
        "portalId": "int",
        "teamId": "int",
        "classId": "int",
        "manufacturerId": "int",
        "liveryId": "int",
        "performanceIndex": "int",
        "scoreInfo": {
            "positionOverall": "int",
            "positionClass": "int",
            "laps": "int",
            "distanceTravelled": "int", //meters
            "currentLapTime": "int", //milliseconds
            "bestLapInfo": {
                "valid": "bool",
                "sector1": "int", //milliseconds, -1 if not set
                "sector2": "int", //milliseconds, -1 if not set
                "sector3": "int" //milliseconds, -1 if not set
            },
            "distanceDiff": "int", //meters
            "timeDiff": "int", //milliseconds
            "lapDiff": "int"
        }
    }
    */
});
```

### r3e.getDriversInfo
Get driver related data for **all drivers** on the server.

```javascript
r3e.getDriversInfo(function(driversInfo) {
    /*
    // driversInfo
    [
        {
            "name": "string",
            "slotId": "int",
            "portalId": "int",
            "teamId": "int",
            "classId": "int",
            "manufacturerId": "int",
            "liveryId": "int",
            "performanceIndex": "int",
            "scoreInfo": {
                "positionOverall": "int",
                "positionClass": "int",
                "laps": "int",
                "distanceTravelled": "int", //meters
                "currentLapTime": "int", //milliseconds
                "bestLapInfo": {
                    "valid": "bool",
                    "sector1": "int", //milliseconds, -1 if not set
                    "sector2": "int", //milliseconds, -1 if not set
                    "sector3": "int" //milliseconds, -1 if not set
                },
                "distanceDiff": "int", //meters
                "timeDiff": "int", //milliseconds
                "lapDiff": "int"
            }
        },
        ...
    ]
    */
});
```

### r3e.getSessionInfo
Get the current session data.

```javascript
r3e.getSessionInfo(function(sessionInfo) {
    /*
    // type can be:
    'Unknown',
    'Practice',
    'Qualify',
    'Warmup',
    'Race 1',
    'Race 2',
    'Race 3',
    'Event Results'

    // phase can be:
    'START',
    'WALKTHROUGH',
    'GARAGE',
    'FORMATION',
    'COUNTDOWN',
    'GREEN',
    'CHECKERED',
    'END'

    // sessionInfo
    {
        "type": "string",
        "phase": "string",
        "timeTotal": "int", //seconds
        "timeLeft": "int" //seconds
    }
    */
});
```

### r3e.getEventInfo
Get the current event data.

```javascript
r3e.getEventInfo(function(eventInfo) {
    /*
    // eventInfo
    {
        "serverName": "string",
        "metric": "bool",
        "trackId": "int",
        "trackName": "string",
        "layoutId": "int",
        "layoutName": "string",
        "length": "int",
        "weatherInfo": {
            "ambientTemp": "int",
            "trackTemp": "int",
            "windSpeed": "int",
            "conditions": "string",
            "forecast": "string"
        }
    }
    */
});
```

### r3e.showCursor
Enables or disables the in game cursor.

```javascript
r3e.showCursor({
    "show": "bool"
});
```

### Cameras
Set the focused driver and which camera should be used.
#### nosecam
```javascript
r3e.setCamera.nosecam({'slotId': 0})
```

#### cockpit
```javascript
r3e.setCamera.cockpit({'slotId': 0})
```

#### swingman
```javascript
r3e.setCamera.swingman({'slotId': 0})
```

#### onboard
```javascript
r3e.setCamera.onboard({'slotId': 0})
```

#### trackside
```javascript
r3e.setCamera.trackside({'slotId': 0})
```

#### onboard1
```javascript
r3e.setCamera.onboard1({'slotId': 0})
```
#### onboard2
```javascript
r3e.setCamera.onboard2({'slotId': 0})
```
#### frontCam
```javascript
r3e.setCamera.frontCam({'slotId': 0})
```
#### rearCam
```javascript
r3e.setCamera.rearCam({'slotId': 0})
```
#### flFront
```javascript
r3e.setCamera.flFront({'slotId': 0})
```
#### frFront
```javascript
r3e.setCamera.frFront({'slotId': 0})
```
#### rlRear
```javascript
r3e.setCamera.rlRear({'slotId': 0})
```
#### rrRear
```javascript
r3e.setCamera.rrRear({'slotId': 0})
```
#### rlFront
```javascript
r3e.setCamera.rlFront({'slotId': 0})
```
#### rrFront
```javascript
r3e.setCamera.rrFront({'slotId': 0})
```
#### exhaust
```javascript
r3e.setCamera.exhaust({'slotId': 0})
```
#### wing
```javascript
r3e.setCamera.wing({'slotId': 0})
```

### r3e.waitOnResults
If you want to handle showing results running this will put you in charge of triggering the "proceed" trigger.

```javascript
r3e.waitOnResults({'wait': true})
```

### r3e.goToNextEvent
If you ran ```r3e.waitOnResults``` you should trigger ```r3e.goToNextEvent ``` when you are done showing the results. Otherwise the game will just stay idle and not connect to the next event on the mp server.

Make sure you don't run this too soon after ```r3e.on.resultsUpdate```. Then you might experience connection issues as the server needs time to start a new event.

Default values when not using ```r3e.waitOnResults``` is 30 seceonds. 20+ should be fine.

```javascript
r3e.goToNextEvent()
```

### r3e.exit
Takes you back to multiplayer menus.

```javascript
r3e.exit()
```

### r3e.on.resultsUpdate
Pass r3e.on.resultsUpdate a callback which will get executed when the game client has results to show.

This only gets called at the end of a race session.

```javascript
r3e.on.resultsUpdate(function(results) {
    /*
    // results
    {
        "Results": [
            {
                "name": "string",
                "portalId": "int",
                "teamId": "int",
                "classId": "int",
                "manufacturerId": "int",
                "liveryId": "int",
                "positionOverall": "int",
                "positionClass": "int",
                "finishStatus": "string",
                "totalTime": "int", // milliseconds
                "penaltyTime": "int",
                "penaltyWeight": "int",
                "bestLapInfo": {
                    "valid": "bool",
                    "sector1": "int", // milliseconds, -1 if not set
                    "sector2": "int", // milliseconds, -1 if not set
                    "sector3": "int" // milliseconds, -1 if not set
                }
            },
            ...
        ]
    }
    */
});
```

## Handy to know
* **To use Chromium debugger**
    * Put devtools_resources.pak in Game folder
    * Start with -webdev -broadcastUrl=&lt;url&gt;
    * Go to [http://localhost:8080]() using Chrome

* **The overlay page will be reloaded between each session.**

* **How do I fetch the livery renders based on liveryId?**
    * Use: http://game.raceroom.com/store/image_redirect?id=[liveryId]&size=big
You can select between thumb, small, big, full sizes.

* **How can I get user information from portalId?**
    * Using: http://game.raceroom.com/users/[portal-id]/?json will return JSON that can be useful.

* **How can I get relevant information based on teamId, manufacturerId, liveryId, classId?**
    * For that you will have to include r3e-data.js which is a part of this repo. It contains data for the corresponding ids.

## Known issues/things to think about
* When joining in race session timeleft will be incorrect.
* The CEF message loop updates at 60Hz so callbacks for retrieving data might take a while to trigger.
* Triggering too many API calls will affect game performance.
* Using Chromium 33.0.1750.58

## Support
Please visit our [support forum thread](https://forum.sector3studios.com/index.php?forums/community-workshop.73/).

## License

See [LICENSE](LICENSE).
