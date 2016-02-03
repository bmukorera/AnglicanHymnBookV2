angular.module('hymnApp.services', [])

.factory('HymnService', ['$http','$q',function($http,$q){

			return {
				getAllHymns:function() {
					var deferred = $q.defer();

					$http.get("json/app.json").then(function (res) {
						console.log(res.data.results);
						var results = res.data.results.map(function (result) {
							return result;
						});
						deferred.resolve(results);
					});
					return deferred.promise;

		}
	};

}]);

