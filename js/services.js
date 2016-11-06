itgameApp

.service('configService',function() {
        var config = {};
        config.url_api = 'http://localhost:3000/api/v1/';  
        config.url_avatar = 'http://localhost:3000/avatar/';        
        config.url_badges = 'http://localhost:3000/badges/';        
        return config;
    })

.service('MenuService', function($http,$rootScope, Utils) {

   this.menu = function() {

       if(Utils.isUndefinedOrNull($rootScope.user)) {
            $rootScope.user = localStorage.getItem("user");
            $rootScope.username = localStorage.getItem("username");
            $rootScope.token = localStorage.getItem("token");
            $rootScope.role = localStorage.getItem("role");            
       }


     if(Utils.isUndefinedOrNull($rootScope.user)) {
         return   [
            
            {"label" : "INICIO",
            "url" : "#home"},
            {"label" : "EL JUEGO",
            "url" : "#about"},
            {"label" : "CONTACTO",
            "url" : "#contact"},
            {"label" : "LOGIN",
            "url" : "#login"}
             
         ];
     } else if($rootScope.role=='player'){
         return   [
            {"label" : "ACTIVIDAD",
            "url" : "#activity"},
            {"label" : "JUEGOS",
            "url" : "#games"},
            {"label" : "AVISOS",
            "url" : "#notifications"},
            {"label" : "TIPS & TRICKS",
            "url" : "#tips"},
            {"label" : "PERFIL",
            "url" : "#profile"},
            {"label" : "SOPORTE",
            "url" : "#support"},
            {"label" : "LOGOUT",
            "url" : "#logout"}
         ];
     } else if($rootScope.role=='admin'){
         return   [
            {"label" : "ACTIVIDAD",
            "url" : "#activity"},
            {"label" : "CONFIGURACIÓN",
            "url" : "#admin"},
            {"label" : "SOPORTE",
            "url" : "#support"},
            {"label" : "LOGOUT",
            "url" : "#logout"}
         ];
     }

  }})

.service('avatarsService', ['$http', '$rootScope', 'configService', function($http, $rootScope, configService){
                
        var service = {
            getDefaultAvatars: function() {
            
                return $http({
                  method: 'GET',
                  url: configService.url_api + 'avatar/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data.avatars                                          
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          deleteAvatar: function(avatar) {
            
                return $http({
                  method: 'DELETE',
                  url: configService.url_api + 'avatar/' + avatar._id,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          }

        };
    
        return service;
        
        
}])

.service('skillsService', ['$http', '$rootScope', 'configService', function($http, $rootScope, configService){
                
        var service = {
            getSkills: function() {
            
                return $http({
                  method: 'GET',
                  url: configService.url_api + 'skill/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data.skills                                          
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          createSkill: function(skill) {
            
                return $http({
                  method: 'POST',
                  url: configService.url_api + 'skill/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json",
                  data: skill
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          editSkill: function(skill) {
            
                return $http({
                  method: 'PUT',
                  url: configService.url_api + 'skill/' + skill._id,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json",
                  data: skill
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          deleteSkill: function(skill) {
            
                return $http({
                  method: 'DELETE',
                  url: configService.url_api + 'skill/' + skill._id,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          }
            
        };
    
        return service;
        
        
}])

.service('levelsService', ['$http', '$rootScope', 'configService', function($http, $rootScope, configService){
                
        var service = {
            getLevels: function() {
            
                return $http({
                  method: 'GET',
                  url: configService.url_api + 'level/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data.levels                                          
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          createLevel: function(level) {
            
                return $http({
                  method: 'POST',
                  url: configService.url_api + 'level/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json",
                  data: level
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          editLevel: function(level) {
            
                return $http({
                  method: 'PUT',
                  url: configService.url_api + 'level/' + level._id,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json",
                  data: level
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          },
          deleteLevel: function(level) {
            
                return $http({
                  method: 'DELETE',
                  url: configService.url_api + 'level/' + level._id,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
            }).then(function(obj) {                    
                return {
                    'status': true,
                    'data': obj.data
                };
            }).catch(function(err) {                
                return {
                    'status': false,
                    'data': "Error inexperado" };                
            });
          }
            
        };
    
        return service;
        
        
}])

.service('profileService', ['$http', '$rootScope', 'configService', function($http, $rootScope, configService){
                
        var service = {
            getUserProfile: function(idUser) {
            
                return $http({
                  method: 'GET',
                  url: configService.url_api + 'userprofile/' + idUser,
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  dataType:"json"
                }).then(function(obj) {                    
                    return {
                        'status': true,
                        'data': obj.data                                          
                    };
                }).catch(function(err) {                
                    return {
                        'status': false,
                        'data': "Error inexperado" };                
                });
          },
          createUserProfile: function(profile) {
              return $http({
                  method: 'POST',
                  url: configService.url_api + 'userprofile/',
                  headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Authorization": "bearer " + $rootScope.token
                  },
                  data: profile,
                  dataType:"json"
                }).then(function(obj) {                    
                    return {
                        'status': true,
                        'data': obj.data                                          
                    };
                }).catch(function(err) {                
                    return {
                        'status': false,
                        'data': "Error inexperado" };                
                });
          }
            
        };
    
        return service;
        
        
}])


 .factory('Utils', function($location, $rootScope) {
  var service = {
     isUndefinedOrNull: function(obj) {
         return !angular.isDefined(obj) || obj===null;
     },      
     checkLoggedUser: function() {
        if(!angular.isDefined($rootScope.user) || $rootScope.user===null) {
            $location.path("/");
        }
     },      
     checkLoggedAdmin: function() {
        if(!angular.isDefined($rootScope.user) || $rootScope.user===null) {
            $location.path("/");
        } else if($rootScope.role!="admin") {
            $location.path("/activity");
        }
     }
  }

  return service;
});
