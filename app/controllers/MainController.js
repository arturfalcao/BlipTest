module.exports = function($scope,$http) {

	$scope.query = "select  title, units.temperature, item.forecast from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\") and u = 'C' limit 5";
	$scope.url = "https://query.yahooapis.com/v1/public/yql?format=json&d=5&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";
	$scope.message = "";
	$scope.tableData = [];
	$scope.locale = "";
	$scope.lastReq = "";


	//Geo Autorization
	if (navigator.geolocation) {
	   	navigator.geolocation.getCurrentPosition(function(position){
	   		$scope.$apply(function(){
	       		$scope.position = position;
	    	});
	   	});
	}

	//Get weather por user Coordinates
	$scope.GetWeatherByCoor = function(){
		$scope.coorReq = "({ " + $scope.position.coords.latitude + " },{" + $scope.position.coords.longitude + "})";
		$scope.GetWeather($scope.coorReq);
	};

	//Clear message de erro 
	$scope.ClearMSG = function(){
		$scope.message = "";
	};

	//Get weather
	 $scope.GetWeather = function(_val){
        if(_val != "" && $scope.lastReq != _val ){
        	$scope.lastReq = _val;
        	$scope.request = $scope.url + $scope.query.replace("%s" , _val);
        	$http.get($scope.request)
        	.then(function(data){
        		//success handler
      	  		if(data.data.query.count == 0){
      	  			$scope.message = "No data";
        		}else{
					$scope.tableData = data.data.query.results.channel;
        		}

        	}, function(data){
        		//error handler
				$scope.message = data.data.error.description;

        	});

        }
    };
}