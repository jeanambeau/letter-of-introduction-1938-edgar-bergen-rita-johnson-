angular.module("ella_cinders_1926_colleen_moore", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ella_cinders_1926_colleen_moore.controllers", "ella_cinders_1926_colleen_moore.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Ella cinders 1926 Colleen Moore" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_about_us = false ;
		$rootScope.hide_menu_rate_this_app = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "ella_cinders_1926_colleen_moore",
				storeName : "ella_cinders_1926_colleen_moore",
				description : "The offline datastore for Ella cinders 1926 Colleen Moore app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-2041208520808887/8604528653",
					interstitial: "ca-app-pub-2041208520808887/4693860341",
					rewardvideo: ""
				};
				
				// ADS BANNER
				try{
					AdMob.createBanner({
						adId: admobid.banner,
						overlap: false,
						autoShow: false,
						offsetTopBar: false,
						position: AdMob.AD_POSITION.TOP_CENTER,
						bgColor: "white"
					});
				}catch(err){ 
					//navigator.notification.activityStart(err.message, "Admob");
				}
				$interval(function(){
					if($rootScope.liveStatus == "run"){
						try{
							AdMob.showBanner(AdMob.AD_POSITION.TOP_CENTER);
						}catch(err){ 
							//navigator.notification.activityStart(err.message, "Admob");
						}
					}
				},10000); 
				
				$ionicPlatform.on("pause",function(){
					try{
						AdMob.hideBanner();
					}catch(err){ 
						//navigator.notification.activityStart(err.message, "Admob");
					}
				});
			
				// INTERSTITIAL
				try{
					AdMob.prepareInterstitial({
						adId: admobid.interstitial,
						autoShow: false,
					});
				}catch(err){ 
					//alert(err.message);
				}
				
				$interval(function(){
					if($rootScope.liveStatus == "run"){
						try{
							AdMob.showInterstitial();
						}catch(err){ 
							//alert(err.message);
						}
					}
				},10000); 
				
				// rewardvideo
				$timeout(function(){
					try{
						AdMob.prepareRewardVideoAd({
							adId: admobid.rewardvideo,
							autoShow: false,
						});
					}catch(err){ 
						//alert(err.message);
					}
				}, 500);
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("ella_cinders_1926_colleen_moore.ella");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("ella_cinders_1926_colleen_moore",{
		url: "/ella_cinders_1926_colleen_moore",
			abstract: true,
			templateUrl: "templates/ella_cinders_1926_colleen_moore-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("ella_cinders_1926_colleen_moore.ella", {
		url: "/ella",
		cache:false,
		views: {
			"ella_cinders_1926_colleen_moore-side_menus" : {
						templateUrl:"templates/ella_cinders_1926_colleen_moore-ella.html",
						controller: "ellaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/ella_cinders_1926_colleen_moore/ella");
});
