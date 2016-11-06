var itgameApp = angular.module("itgameApp", ["ngRoute","ui.bootstrap",'ngTable']);

//Route providers
itgameApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }).
      when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      }).
      when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
      }).
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      }).
      when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      }).        
      when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityController'
      }).
      when('/games', {
        templateUrl: 'views/games.html',
        controller: 'GamesController'
      }).
      when('/tips', {
        templateUrl: 'views/tips.html',
        controller: 'TipsController'
      }).
      when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      }).
      when('/notifications', {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsController'
      }).
      when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportController'
      }).
      when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
      }).  
      when('/admin/skills', {
        templateUrl: 'views/admin-skills.html',
        controller: 'AdminSkillsController'
      }).
      when('/admin/levels', {
        templateUrl: 'views/admin-levels.html',
        controller: 'AdminLevelsController'
      }).
      when('/admin/achievements', {
        templateUrl: 'views/admin-achievements.html'
      }).
      when('/admin/games', {
        templateUrl: 'views/admin-games.html'
      }).
      when('/admin/players', {
        templateUrl: 'views/admin-players.html'
      }).
      when("/error",{
            templateUrl: 'views/error.html',
            controller: 'ErrorController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }
]);

itgameApp
    //
    // File Input
    //
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);