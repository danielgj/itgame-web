itgameApp
    
    .controller('MenuCtrl', function($scope,$rootScope, $location, $modal, MenuService) {
    
        $rootScope.menu = MenuService.menu();
    
        $scope.getClass = function (path) {
          if(!$location.path().startsWith("/admin")) {
            return ($location.path().substr(1, path.length) === path.substr(1, path.length)) ? 'active' : '';
          } else {
              return (path==="#admin") ? 'active' : '';
          }
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
    .controller('LoginController', function($scope, $rootScope, $location, $http, configService, MenuService, Utils) {
    
        $scope.withError = false;
        $scope.errorMsg = "";
        $scope.login = {};
        $scope.login.email = "";
        $scope.login.password = "";
    
        $scope.doLogin = function() {
            
            if($scope.login.email=="" || $scope.login.password=="") {
                
                $scope.withError = true;
                $scope.errorMsg = "Introduce tu email y contraseña";
                
            } else {
                
                $scope.inLogin = true;
                
                //Should put a loader
                
                $http({
                    method: 'POST',
                    url: configService.url_api + 'user/login/',
                    headers: {
                       "Accept": "application/json;charset=utf-8"
                   },
                   dataType:"json",
                   data: {'email':$scope.login.email, 'password':$scope.login.password}
                }).then(function(obj) {
                    
                    $scope.inLogin = false;
                    if(obj.status==200) {
                        var user = obj.data;
                        
                        $rootScope.user = user.userid;
                        $rootScope.username = user.username;
                        $rootScope.token = user.token;
                        $rootScope.role = user.role;
                        $rootScope.email = user.email;


                        //////////////////LocalStorage
                        localStorage.setItem("user", $rootScope.user);
                        localStorage.setItem("username", $rootScope.username);
                        localStorage.setItem("role", $rootScope.role);
                        localStorage.setItem("token", $rootScope.token);
                        localStorage.setItem("email", $rootScope.email);
                        $rootScope.menu = MenuService.menu();


                        $scope.withError = false;
                        $scope.errorMsg = "";

                        $location.path("/activity");
                                             
                    } 
                }).catch(function(err) {
                    $scope.inLogin = false;
                    $scope.withError = true;
                    if (err.status==401 ) {
                        $scope.errorMsg = "Bad user/password";
                    } else if (err.status==404) {
                        $scope.errorMsg = "User not found";
                    } else {
                        $scope.errorMsg = "error" + JSON.stringify(err);
                    }
                });
                
               
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
    .controller('RegisterController', function($scope, $rootScope, $location, $http, configService, MenuService, Utils) {
    
        $scope.withError = false;
        $scope.errorMsg = "";
        $scope.inRegister = false;
        $scope.email = "";
        $scope.username = "";
        $scope.password1 = "";
        $scope.password2 = "";
        $scope.errorEmail = false; 
        $scope.errorUser = false;
        $scope.errorPass1 = false;
        $scope.errorPass2 = false;
        $scope.errorPassMissmatch = false;
    
        
        $scope.doRegister = function() {
            
            if($scope.email==="") {
                $scope.errorEmail = true;
            } else {
                $scope.errorEmail = false;
            }
            
            if($scope.username==="") {
                $scope.errorUser = true;
            } else {
                $scope.errorUser = false;
            }
            
            if($scope.password1==="") {
                $scope.errorPass1 = true;
            } else {
                $scope.errorPass1 = false;
            }
            
            if($scope.password2==="") {
                $scope.errorPass2 = true;
            } else {
                $scope.errorPass2 = false;
            }
            
            if($scope.password1!="" && $scope.password2!="" && $scope.password1!=$scope.password2) {
                $scope.errorPassMissmatch = true;
            } else {
                $scope.errorPassMissmatch = false;
            }
            

            var valid = !($scope.errorEmail || $scope.errorUser || $scope.errorPass1 || $scope.errorPass2 || $scope.errorPassMissmatch);
            
            if(!valid) {
                
            } else {
                $scope.inRegister = true;
                
                $http({
                    method: 'POST',
                    url: configService.url_api + 'user/register',
                    headers: {
                       "Accept": "application/json;charset=utf-8"
                   },
                   dataType:"json",
                   data: {
                       'username': $scope.username,
                       'email': $scope.email, 
                       'password':$scope.password1
                   }
                }).then(function(obj) {
                    
                    $scope.inRegister = false;
                    if(obj.status==201) {
                        var user = obj.data;
                        
                        $rootScope.user = user.userid;
                        $rootScope.username = user.username;
                        $rootScope.token = user.token;
                        $rootScope.role = user.role;
                        $rootScope.email = user.email;


                        //////////////////LocalStorage
                        localStorage.setItem("user", $rootScope.user);
                        localStorage.setItem("username", $rootScope.username);
                        localStorage.setItem("role", $rootScope.role);
                        localStorage.setItem("token", $rootScope.token);
                        localStorage.setItem("email", $rootScope.email);
                        $rootScope.menu = MenuService.menu();


                        $scope.withError = false;
                        $scope.errorMsg = "";

                        $location.path("/profile");
                                             
                    } 
                }).catch(function(err) {
                    $scope.inRegister = false;
                    $scope.withError = true;
                    $scope.errorMsg = err.data.msg;                    
                });
            
            }
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
    .controller('ProfileController', function($scope, $rootScope, $location, $http, configService, profileService, avatarsService, skillsService, MenuService, Utils) {
        
        Utils.checkLoggedUser($location, MenuService);
    
        $scope.profileImg = "./assets/img/default_avatar.png";
        $scope.profile = {};
        $scope.shouldOnboard = false;
    
        profileService.getUserProfile($rootScope.user).then(function(d) {
        
            if(!Utils.isUndefinedOrNull(d)) {
                    
                if(d.status) {
                    $scope.profile = d.data;                        
                    if(angular.equals($scope.profile,{})) {
                        
                        $scope.shouldOnboard = true;
                        
                        $scope.currentStep = 1;
                        $scope.selectedAvatar = "";      
                        $scope.selectedSkills = [];
                        $scope.onBoardMsg = "Tómate unos minutos para completar tu perfil";
                        $scope.urlBaseAvatar = configService.url_avatar;


                        avatarsService.getDefaultAvatars().then(function(d) { 
                            if(!Utils.isUndefinedOrNull(d)) {

                                if(d.status) {
                                    $scope.defaultAvatars = d.data;                        
                                }
                            }
                        });
                        
                        skillsService.getSkills().then(function(d) { 
                            if(!Utils.isUndefinedOrNull(d)) {
                                if(d.status) {
                                    $scope.skills = d.data;                        
                                }
                            }
                        });

                        $scope.isAvatarSelected = function(id) {
                            return $scope.selectedAvatar == id;
                        }

                        $scope.selectAvatar = function(id) {

                            if($scope.selectedAvatar == id) {
                                $scope.selectedAvatar = "";                                
                            } else {
                                $scope.selectedAvatar = id;
                            }
                        }

                        $scope.showBlock = function(id) {
                            return $scope.currentStep==id;
                        }
                        
                        $scope.goToOnboardinStep = function(id) {
                            $scope.currentStep=id;
                        }
                        

                        $scope.doOnBoarding1 = function() {
                            $scope.currentStep= 2;
                        }
                        
                        $scope.doOnBoarding2 = function() {
                            console.log($scope.userSkills);
                            $scope.currentStep= 3;
                        }
                        
                        $scope.doOnBoarding3 = function() {
                            
                            var profileToCreate = {
                                userId: $rootScope.user,
                                avatar: $scope.selectedAvatar,
                                skills: $scope.userSkills,
                                bio: $scope.bio,
                                jiraUser: $scope.jiraUser,
                                gitlabUser: $scope.gitlabUser,
                                jenkinsUser: $scope.jenkinsUser
                            }
                            
                            profileService.createUserProfile(profileToCreate).then(function(d) { 
                                if(!Utils.isUndefinedOrNull(d)) {
                                    if(d.status) {
                                        $scope.profile = d.data;    
                                        $scope.shouldOnboard = false;
                                        $scope.profileImg = configService.url_avatar + $scope.profile.avatar;
                                    }
                                }
                            });
                            
                        }
                        
                        
                        
                    } else {
                        $scope.shouldOnboard = false;
                        if(d.data.avatar && d.data.avatar!="") {
                            $scope.profileImg = configService.url_avatar + $scope.profile.avatar.image;
                        }
                    }
                }
            }
        
        });
        
        
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

    .controller('AdminSkillsController', function($scope, $rootScope, $location, MenuService, skillsService, $filter, ngTableParams, Utils) {
        
        Utils.checkLoggedAdmin($location, MenuService);
    
        $scope.createEditTitle = "Nueva Habilidad";
        $scope.inSaving = false;
        $scope.withError = false;
        $scope.errorMsg = "";
        $scope.skillToCreateEdit = {};
        $scope.skillToCreateEdit._id = '';        
        $scope.skillToCreateEdit.name = '';
        $scope.skillToCreateEdit.description = '';        
        
    
        skillsService.getSkills().then(function(d) { 
            if(!Utils.isUndefinedOrNull(d)) {
                if(d.status) {
                    loadTable(d);
                }
            }
        });
    
        $scope.loadForEdit = function(data) {
            $scope.createEditTitle = 'Editar habilidad';
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.skillToCreateEdit._id = data._id;        
            $scope.skillToCreateEdit.name = data.name;
            $scope.skillToCreateEdit.description = data.description;        
        }
    
    
        //Funcion to load table with data
        var loadTable = function (d) {
            $scope.skills = d.data;
                        
                        var data = $scope.skills;
                        
                        $scope.skillsTableSorting = new ngTableParams({
                            page: 1,            // show first page
                            count: 10,           // count per page
                            sorting: {
                                updatedAt: 'asc'     // initial sorting
                            }
                        }, {
                            total: data.length, // length of data
                            getData: function($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })   
        }
        
        $scope.cancelEditCreate = function() {
            $scope.createEditTitle = "Nueva Habilidad";
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.skillToCreateEdit = {};
            $scope.skillToCreateEdit._id = '';        
            $scope.skillToCreateEdit.name = '';
            $scope.skillToCreateEdit.description = '';   
        }
        
        $scope.createEditSkill = function() {
            var valid = $scope.skillToCreateEdit.name!="" && $scope.skillToCreateEdit.description!="";
            
            if(!valid) {
                $scope.withError = true;
                $scope.errorMsg = "Introduce nombre y descripción";
            } else {
                
                $scope.inSaving = true;
                if($scope.skillToCreateEdit._id!="") {
                    //Edit
                    skillsService.editSkill($scope.skillToCreateEdit).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nueva Habilidad";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.skillToCreateEdit = {};
                                $scope.skillToCreateEdit._id = '';        
                                $scope.skillToCreateEdit.name = '';
                                $scope.skillToCreateEdit.description = '';  
                                skillsService.getSkills().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    //Create
                    skillsService.createSkill($scope.skillToCreateEdit).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nueva Habilidad";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.skillToCreateEdit = {};
                                $scope.skillToCreateEdit._id = '';        
                                $scope.skillToCreateEdit.name = '';
                                $scope.skillToCreateEdit.description = '';  
                                skillsService.getSkills().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
                    
                }
            }
        }

        $scope.delete = function(skill) {
            
            $scope.inSaving = true;
            skillsService.deleteSkill(skill).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nueva Habilidad";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.skillToCreateEdit = {};
                                $scope.skillToCreateEdit._id = '';        
                                $scope.skillToCreateEdit.name = '';
                                $scope.skillToCreateEdit.description = '';  
                                skillsService.getSkills().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
        }
    })

    .controller('AdminLevelsController', function($scope, $rootScope, $location, MenuService, levelsService, $filter, ngTableParams, Utils) {
        
        Utils.checkLoggedAdmin($location, MenuService);
    
        $scope.createEditTitle = "Nuevo Nivel";
        $scope.inSaving = false;
        $scope.withError = false;
        $scope.errorMsg = "";
        $scope.levelToCreateEdit = {};
        $scope.levelToCreateEdit._id = '';        
        $scope.levelToCreateEdit.name = '';
        $scope.levelToCreateEdit.begin = '';        
        $scope.levelToCreateEdit.end = '';        
        
    
        levelsService.getLevels().then(function(d) { 
            if(!Utils.isUndefinedOrNull(d)) {
                if(d.status) {
                    loadTable(d);
                }
            }
        });
    
        $scope.loadForEdit = function(data) {
            $scope.createEditTitle = 'Editar Nivel';
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.levelToCreateEdit._id = data._id;
            $scope.levelToCreateEdit.name = data.name;
            $scope.levelToCreateEdit.begin = data.begin;        
            $scope.levelToCreateEdit.end = data.end;        
        }
    
    
        //Funcion to load table with data
        var loadTable = function (d) {
            $scope.levels = d.data;
                        
                        var data = $scope.levels;
                        
                        $scope.levelsTableSorting = new ngTableParams({
                            page: 1,            // show first page
                            count: 10,           // count per page
                            sorting: {
                                begin: 'asc'     // initial sorting
                            }
                        }, {
                            total: data.length, // length of data
                            getData: function($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })   
        }
        
        $scope.cancelEditCreate = function() {
            $scope.createEditTitle = "Nuevo Nivel";
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.levelToCreateEdit = {};
            $scope.levelToCreateEdit._id = '';        
            $scope.levelToCreateEdit.name = '';
            $scope.levelToCreateEdit.begin = '';        
            $scope.levelToCreateEdit.end = '';  
        }
        
        $scope.createEditLevel = function() {
            var valid = $scope.levelToCreateEdit.name!="" && ($scope.levelToCreateEdit.begin+"")!=""  && ($scope.levelToCreateEdit.end+"")!="";
            
            
            if(!valid) {
                $scope.withError = true;
                $scope.errorMsg = "Introduce nombre y puntos iniciales y finales";
            } else {
            
                $scope.inSaving = true;
                if($scope.levelToCreateEdit._id!="") {
                    
                    //Edit
                    levelsService.editLevel($scope.levelToCreateEdit).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nuevo Nivel";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.levelToCreateEdit = {};
                                $scope.levelToCreateEdit._id = '';        
                                $scope.levelToCreateEdit.name = '';
                                $scope.levelToCreateEdit.begin = '';        
                                $scope.levelToCreateEdit.end = '';  
                                levelsService.getLevels().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    //Create
                    levelsService.createLevel($scope.levelToCreateEdit).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nuevo Nivel";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.levelToCreateEdit = {};
                                $scope.levelToCreateEdit._id = '';        
                                $scope.levelToCreateEdit.name = '';
                                $scope.levelToCreateEdit.begin = '';        
                                $scope.levelToCreateEdit.end = '';  
                                levelsService.getLevels().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
                    
                }
            }
        }

        $scope.delete = function(level) {
            
            $scope.inSaving = true;
            levelsService.deleteLevel(level).then(function(d) {
                        $scope.inSaving = false;
                        if(!Utils.isUndefinedOrNull(d)) {
                            if(d.status) {
                                $scope.createEditTitle = "Nuevo Nivel";
                                $scope.withError = false;
                                $scope.errorMsg = "";
                                $scope.levelToCreateEdit = {};
                                $scope.levelToCreateEdit._id = '';        
                                $scope.levelToCreateEdit.name = '';
                                $scope.levelToCreateEdit.begin = '';        
                                $scope.levelToCreateEdit.end = '';  
                                levelsService.getLevels().then(function(d) { 
                                    if(!Utils.isUndefinedOrNull(d)) {
                                        if(d.status) {
                                            loadTable(d);
                                        }
                                    }
                                });
                            }
                        }
                    });
        }
    })

    .controller('AdminAvatarsController', function($scope, $rootScope, $location, $http, MenuService, avatarsService, configService, $filter, ngTableParams, Utils) {
        
        Utils.checkLoggedAdmin($location, MenuService);
    
        $scope.urlBaseAvatar = configService.url_avatar;
    
        $scope.createEditTitle = "Nuevo Avatar";
        $scope.inSaving = false;
        $scope.withError = false;
        $scope.errorMsg = "";
        $scope.avatarToCreateEdit = {};
        $scope.avatarToCreateEdit._id = '';        
        $scope.avatarToCreateEdit.name = '';
        $scope.avatarToCreateEdit.image = '';        
        $scope.avatarImageFile = null;
        $('#ImageFilePreview').html('');
        
    
        avatarsService.getDefaultAvatars().then(function(d) { 
            if(!Utils.isUndefinedOrNull(d)) {
                if(d.status) {
                    $scope.avatars=d.data;
                }
            }
        });
    
    
        $scope.loadForEdit = function(data) {
            $scope.createEditTitle = 'Editar Avatar';
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.avatarToCreateEdit._id = data._id;
            $scope.avatarToCreateEdit.name = data.name;
            $scope.avatarToCreateEdit.image = data.image;        
        }
    
    
        $scope.cancelEditCreate = function() {
            $scope.createEditTitle = "Nuevo Avatar";
            $scope.inSaving = false;
            $scope.withError = false;
            $scope.errorMsg = "";
            $scope.levelToCreateEdit = {};
            $scope.avatarToCreateEdit._id = '';        
            $scope.avatarToCreateEdit.name = '';
            $scope.avatarToCreateEdit.image = ''; 
            if($scope.avatarImageFile) {
                $('.fileinputImage').fileinput('clear')
            }
            $scope.avatarImageFile = null;
        }
        
        $scope.createEditAvatar = function() {
            
            var imageFile = $scope.avatarImageFile;
            var valid = $scope.avatarToCreateEdit.name!="" && imageFile;
            
            if(!valid) {
                $scope.withError = true;
                $scope.errorMsg = "Introduce el nombre y la imagen";
            } else {
            
                $scope.inSaving = true;
                if($scope.avatarToCreateEdit._id!="") {
                    
                    //Edit
                    
                } else {
                    
                    //Create                    
                    var fd = new FormData();
                    fd.append('name', $scope.avatarToCreateEdit.name);
                    fd.append('avatarImage', imageFile);
                    $http.post(configService.url_api + 'avatar/', fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Authorization': 'bearer ' + $rootScope.token,
                            'Content-Type': undefined
                        }
                    })
                    .success(function(){  
                        
                        $scope.cancelEditCreate();
                        avatarsService.getDefaultAvatars().then(function(d) { 
                            if(!Utils.isUndefinedOrNull(d)) {
                                if(d.status) {
                                    $scope.avatars=d.data;
                                }
                            }
                        });
                        
                    })
                    .error(function(){
                        $scope.inSaving = false;
                        $scope.withError = true;
                        $scope.errorMsg = "No se ha subido correctamente la imagen";
                    });

                    
                    
                    
                }
            }
        }

        $scope.delete = function(avatar) {
            
            $scope.inSaving = true;
            avatarsService.deleteAvatar(avatar).then(function(d) {
                $scope.inSaving = false;
                    if(!Utils.isUndefinedOrNull(d)) {
                        if(d.status) {
                            $scope.cancelEditCreate();
                            avatarsService.getDefaultAvatars().then(function(d) { 
                                if(!Utils.isUndefinedOrNull(d)) {
                                    if(d.status) {
                                        $scope.avatars=d.data;
                                    }
                                }
                            });
                        }
                    }
                });
        }
    })
    

    .controller('ErrorController', function($scope) {

    })