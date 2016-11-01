itgameApp

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
