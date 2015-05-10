angular.module('myApp', [])
	.controller('TagsCtrl', ['$scope', function($scope){
		$scope.inputTags = [];
		var tags = [];
		
		   $scope.addTag = function() {
					console.log('moooooo', $scope.tagText);
		     if ($scope.tagText.length == 0) {
		       return;
		     }
					if ($scope.tagText.indexOf(',') != -1){
						var splitTags = $scope.tagText.split(',');
						// console.log('putiiii', splitTags)
						// tags.push(splitTags); 
						// console.log('tagss', tags)
						tags = splitTags;

					} else {
						tags.push($scope.tagText);
					}
						console.log('wutt', tags.length)
		     		for (var i = tags.length - 1; i >= 0; i--) {
		     		console.log(tags[i])
		     			$scope.inputTags.push({name: tags[i]});
		     		};
		     $scope.tagText = '';
		     tags = [];
		   }
		
		   $scope.deleteTag = function(key) {
		     if ($scope.inputTags.length > 0 &&
		       $scope.tagText.length == 0 &&
		       key === undefined) {
		       $scope.inputTags.pop();
		     } else if (key != undefined) {
		       $scope.inputTags.splice(key, 1);
		     }
		   }
	}]).directive('tagInput', ['$document', function($document){
		// Runs during compile
		return {
			link: function(scope, element, attrs) {
				scope.inputWidth = 100;
				console.log('ngModel', attrs.ngModel)
	       // Watch for changes in text field
	       scope.$watch(attrs.ngModel, function(value) {
	         if (value != undefined) {

	           // var temptag = angular.element('<span>'+ value+ '</span>');
	           var tempEl = $('<span>' + value + '</span>').appendTo('body');
	           var body = $document.find('body').eq(0);
	           var itag = body.append(tempEl);
	           scope.inputWidth = tempEl.width() + 100;
	           tempEl.remove();
	         }
	       });

	       element.bind('keydown', function(e) {
	         if (e.which == 9) {
	           e.preventDefault();
	         }

	         if (e.which == 8) {
	           scope.$apply(attrs.deleteTag);
	         }
	       });

	       element.bind('keyup', function(e) {
	         var key = e.which;

	         // Tab or Enter pressed 
	         if (key == 9 || key == 13) {
	           e.preventDefault();
	           scope.$apply(attrs.newTag);
	         }
	       });

	       element.bind('paste', function(e){
	       	// if (e.currentTarget.id === "mofo"){
	       	console.log('imm getting called',  e)
 					// scope.tagText = e.originalEvent.clipboardData.getData('text/plain');
	       	scope.$apply(attrs.newTag);
	       	// scope.tagText ="";
	       	// }
	       });
			}
		};
	}]);