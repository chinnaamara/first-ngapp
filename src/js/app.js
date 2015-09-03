var app = angular.module('FirstNgApp', []);

app.controler('SampleCTRL', function($scope){
	$scope.name = 'chinna';

	$scope.deleteItem = function () {
		// delete here
	}
});

app.directive('confirmClick', ['$q', 'dialogModal', function ($q, dialogModal) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            console.log(scope.model);
            var ngClick = attrs.ngClick.replace('confirmClick()', 'true')
                .replace('confirmClick(', 'confirmClick(true,');

            scope.confirmClick = function (msg) {
                if (msg === true) {
                    return true;
                }
                msg = msg || attrs.confirmClick || 'Are you sure you want to delete the selected Department / Team?';
                dialogModal(msg).result.then(function () {
                    scope.$eval(ngClick);
                });
                return false;
            };
        }
    }
}]);

app.service('dialogModal', ['$modal', function ($modal) {
    return function (message, title, okButton, cancelButton) {
        okButton = okButton === false ? false : (okButton || 'OK');
        cancelButton = cancelButton === false ? false : (cancelButton || 'Back');

        var ModalInstanceCtrl = function ($scope, $modalInstance, settings) {
            angular.extend($scope, settings);
            $scope.modalTitle = 'Confirm to proceed'
            $scope.ok = function () {
                $modalInstance.close(true);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        // open modal and return the instance (which will resolve the promise on ok/cancel clicks)
        var modalInstance = $modal.open({
            template: '<div class="dialog-modal alert-warning" data-backdrop="static"> \
                  <div class="modal-content"> \
                  <div class="modal-header alert-warning" ng-show="modalTitle"> \
                      <h4 class="modal-title"><i class="fa fa-exclamation-triangle"></i> {{modalTitle}}</h4> \
                  </div> \
                  <div class="modal-body"><i class="fa fa-info-circle"></i>  {{modalBody}}</div> \
                  <div class="modal-footer"> \
                      <button class="btns-default btn-blue icon-left" ng-click="cancel()" ng-show="cancelButton"><span class="icon"><i class="glyphicon glyphicon-menu-left"></i></span><span class="text">{{cancelButton}}</span></button> \
                      <button class="btns-default btn-green" ng-click="ok()" ng-show="okButton"><span class="icon"><i class="fa fa-check"></i></span><span class="text">{{okButton}}</span></button> \
                  </div> \
                </div> \
            </div>',
            controller: ModalInstanceCtrl,
            resolve: {
                settings: function () {
                    return {
                        modalTitle: title,
                        modalBody: message,
                        okButton: okButton,
                        cancelButton: cancelButton
                    };
                }
            }
        });
        // return the modal instance
        return modalInstance;
    }
}]);

app.filter('hasId', function () {
    return function (items, id) {
        var filtered = [];
        angular.forEach(items, function (item) {
            if (item.PId === null && item.CId !== null) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});