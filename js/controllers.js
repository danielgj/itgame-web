itgameApp
    
    .controller('MenuCtrl', function($scope,$rootScope, $location, $modal, MenuService) {
    
        $rootScope.menu = MenuService.menu();
    
        $scope.getClass = function (path) {
          return ($location.path().substr(1, path.length) === path.substr(1, path.length)) ? 'active' : '';
        }
        
        $scope.logoutModal = function () {
            var modalInstance = $modal.open(
                {
                    animation: true,
                    templateUrl: 'views/logoutModal.html',
                    controller: "LogoutModalCtrl"
                }
            );
        }

    })
    .controller('HomeController', function($scope) {

    })
    .controller('AboutController', function($scope) {

    })
    .controller('ContactController', function($scope) {

    })
    .controller('LoginController', function($scope, $rootScope, $location, MenuService, Utils) {
    
        $scope.withError = false;
        $scope.login = {};
        $scope.login.email = "";
        $scope.login.password = "";
    
        $scope.doLogin = function() {
            
            var email = Utils.isUndefinedOrNull($scope.login.email)?"":$scope.login.email;
            var password = Utils.isUndefinedOrNull($scope.login.password)?"":$scope.login.password;
            
            if(email=="" || password=="") {
                
                $scope.withError = true;
                $scope.errorMsg = "Introduce tu email y contraseña";
                
            } else {
                
                $rootScope.user = "1";
                $rootScope.username = "danielgj"
                $rootScope.token = "mitoken";
                $rootScope.role = (email==="admin"?"admin":"player");
                $rootScope.email = "daniel.garcia@es.unisys.com";


                //////////////////LocalStorage
                localStorage.setItem("user", $rootScope.user);
                localStorage.setItem("username", $rootScope.username);
                localStorage.setItem("role", $rootScope.role);
                localStorage.setItem("token", $rootScope.token);
                localStorage.setItem("email", $rootScope.email);
                $rootScope.menu = MenuService.menu();


                $rootScope.withError = false;
                $rootScope.errorMsg = "";

                $location.path("/activity");
            }
        }

    })
    .controller("LogoutModalCtrl", function($scope, $rootScope, $modalInstance, $location, MenuService) {

        $scope.logout = function() {
            $rootScope.user = null;
            $rootScope.username = null;
            $rootScope.token = null;
            $rootScope.role = null;
            $rootScope.email = null;

            localStorage.removeItem("user");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");

            $rootScope.menu = MenuService.menu();
            $location.path("/");
            $modalInstance.dismiss('logout');
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    })
    .controller('RegisterController', function($scope) {
    
        $scope.currentStep = 1;
        $scope.selectedAvatar = 0;
        
        $scope.isAvatarSelected = function(id) {
            return $scope.selectedAvatar == id;
        }
        
        $scope.selectAvatar = function(id) {
            
            if($scope.selectedAvatar == id) {
                $scope.selectedAvatar = 0;
            } else {
                $scope.selectedAvatar = id;
            }
        }
    
        $scope.showBlock = function(id) {
            return $scope.currentStep==id;
        }
        
        $scope.navigateToBlock = function(id) {
            $scope.currentStep=id;
        }
        
        $scope.doRegister1 = function() {
            $scope.currentStep = 2;
        }
        
        $scope.doRegister2 = function() {
            $scope.currentStep = 3;
        }
        
        $scope.doRegister3 = function() {
            $scope.currentStep = 4;
        }

    })
    .controller('ActivityController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);
    
    })
    .controller('GamesController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);

    })
    .controller('ProfileController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);

    })
    .controller('NotificationsController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);

    })
    .controller('SupportController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);

    })
    .controller('AdminController', function($scope, $rootScope, $location, MenuService, Utils) {
        
        Utils.checkLoggedAdmin($location, MenuService);

    })
    

    .controller('ErrorController', function($scope) {

    })