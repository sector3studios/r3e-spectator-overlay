window.r3e = (function r3eBridge() {
	if (!window.gameClient) {
		return console.warn('This depends on the R3E game client');
	}

	var getRequestPool = (function() {
		var requestPool = {
			'vehicleInfo': {},
			'pitInfo': {},
			'ptpInfo': {},
			'extendedInfo': {},
			'driverInfo': {},
			'driversInfo': [],
			'sessionInfo': [],
			'eventInfo': [],
			'resultsUpdate': [],
			'eventOccurred': []
		};

		return {
			'driverInfo': function getdriverInfoPool(data) {
				if (!requestPool.driverInfo[data.slotId]) {
					requestPool.driverInfo[data.slotId] = [];
				}
				return requestPool.driverInfo[data.slotId];
			},
			'vehicleInfo': function getVehicleInfoPool(data) {
				if (!requestPool.vehicleInfo[data.slotId]) {
					requestPool.vehicleInfo[data.slotId] = [];
				}
				return requestPool.vehicleInfo[data.slotId];
			},
			'pitInfo': function getPitInfoPool(data) {
				if (!requestPool.pitInfo[data.slotId]) {
					requestPool.pitInfo[data.slotId] = [];
				}
				return requestPool.pitInfo[data.slotId];
			},
			'ptPInfo': function getPtpInfoPool(data) {
				if (!requestPool.ptpInfo[data.slotId]) {
					requestPool.ptpInfo[data.slotId] = [];
				}
				return requestPool.ptpInfo[data.slotId];
			},
			'extendedInfo': function getExtendedInfo(data) {
				if (!requestPool.extendedInfo[data.slotId]) {
					requestPool.extendedInfo[data.slotId] = [];
				}
				return requestPool.extendedInfo[data.slotId];
			},
			'driversInfo': function getDriversInfoPool() {
				return requestPool.driversInfo;
			},
			'sessionInfo': function getSessionInfoPool() {
				return requestPool.sessionInfo;
			},
			'eventInfo': function getEventInfoPool() {
				return requestPool.eventInfo;
			},
			'resultsUpdate': function getResultsUpdatePool() {
				return requestPool.resultsUpdate;
			},
			'eventOccurred': function getEventOccurredPool() {
				return requestPool.eventOccurred;
			}
		};
	})();

	window.communicator = function(type, data) {
		var poolFetcher = getRequestPool[type];
		if (!poolFetcher) {
			return;
		}

		var pool = poolFetcher(data);

		var callbacksToTrigger = [];
		pool.forEach(function(callback) {
			callbacksToTrigger.push(callback);
		});

		// Reset pool
		if (!pool.persistent) {
			pool.length = 0;
		}

		callbacksToTrigger.forEach(function runCallback(callback) {
			callback(data);
		});
	};

	function get(opts) {
		return function getter(argsOrCallback, callback) {
			var args = {};
			if (opts.requiresArguments) {
				args = argsOrCallback;
				if (!callback) {
					throw new Error('Callback is not set: '+opts.call);
				}
			} else {
				callback = argsOrCallback;
			}

			if (typeof callback !== 'function') {
				throw new Error('Callback is not a function: '+opts.call);
			}

			var pool = getRequestPool[opts.pool](args);
			pool.push(callback);

			if (pool.length > 1) {
				return;
			}

			var gameClientData = {};
			gameClientData[opts.call] = args;

			var jsonStr = JSON.stringify(gameClientData);

			window.r3e.gameClient(null, jsonStr);
		};
	}

	function set(opts) {
		return function seter(args) {
			if (typeof args === 'undefined' && !opts.noArgs) {
				throw new Error('Args are not set: '+opts.call);
			}

			var gameClientData = {};
			gameClientData[opts.call] = args || {};

			var jsonStr = JSON.stringify(gameClientData);
			window.r3e.gameClient(null, jsonStr);
		};
	}

	function cameraChanger(cameraId) {
		return function cameraChangers(slotId) {
			if (!Number.isInteger(slotId)) {
				throw new Error('slotId is not an integer');
			}

			window.r3e.gameClient(null, JSON.stringify({
				'ChangeCamera': {
					'slotId': slotId,
					'camera': cameraId
				}
			}));
		};
	}

	function listener(opts) {
		return function listeners(callback) {
			var pool = getRequestPool[opts.pool]();

			// Set property on array so it doesn't get cleared
			pool.persistent = true;
			pool.push(callback);
		};
	}

	return {
		'getVehicleInfo': get({
			'call': 'GetVehicleInfo',
			'pool': 'vehicleInfo',
			'requiresArguments': true
		}),
		'getPitInfo': get({
			'call': 'GetPitInfo',
			'pool': 'pitInfo',
			'requiresArguments': true
		}),
		'getPushToPassInfo': get({
			'call': 'GetPtPInfo',
			'pool': 'ptPInfo',
			'requiresArguments': true
		}),
		'getExtendedInfo': get({
			'call': 'GetExtendedInfo',
			'pool': 'extendedInfo',
			'requiresArguments': true
		}),
		'getDriverInfo': get({
			'call': 'GetDriverInfo',
			'pool': 'driverInfo',
			'requiresArguments': true
		}),
		'getDriversInfo': get({
			'call': 'GetDriversInfo',
			'pool': 'driversInfo'
		}),
		'getSessionInfo': get({
			'call': 'GetSessionInfo',
			'pool': 'sessionInfo'
		}),
		'getEventInfo': get({
			'call': 'GetEventInfo',
			'pool': 'eventInfo'
		}),
		'showCursor': set({
			'call': 'ShowCursor'
		}),
		'waitOnResults': set({
			'call': 'WaitForMe'
		}),
		'goToNextEvent': set({
			'call': 'Proceed',
			'noArgs': true
		}),
		'exit': set({
			'call': 'Exit',
			'noArgs': true
		}),
		'setCamera': {
			'nosecam': cameraChanger('nosecam'),
			'cockpit': cameraChanger('cockpit'),
			'swingman': cameraChanger('swingman'),
			'onboard': cameraChanger('onboard'),
			'trackside': cameraChanger('trackside1'),
			'onboard1': cameraChanger('onboard_1'),
			'onboard2': cameraChanger('onboard_2'),
			'frontCam': cameraChanger('front_cam'),
			'rearCam': cameraChanger('rear_cam'),
			'flFront': cameraChanger('fl_front'),
			'frFront': cameraChanger('fr_front'),
			'rlRear': cameraChanger('rl_rear'),
			'rrRear': cameraChanger('rr_rear'),
			'rlFront': cameraChanger('rl_front'),
			'rrFront': cameraChanger('rr_front'),
			'exhaust': cameraChanger('exhaust'),
			'wing': cameraChanger('wing')
		},
		'on': {
			'resultsUpdate': listener({
				'pool': 'resultsUpdate'
			}),
			'eventOccurred': listener({
				pool: 'eventOccurred'
			})
		},
		'gameClient': window.gameClient
	};
})();
