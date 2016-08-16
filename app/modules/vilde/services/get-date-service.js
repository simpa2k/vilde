define(function() {

   var app = angular.module('vilde');
   
   app.service('GetDateService', [function() {
      var self = this;

      self.getCurrentDate = function(callback) {
         var date = new Date();
         var year = date.getFullYear();
         var month = date.getMonth() + 1;
         var day = date.getDate();

         var paddedMonth = month <= 9 ? "0" + month : month;
         var paddedDay = day <= 9 ? "0" + day : day;

         var currentDate = year + "-" + paddedMonth + "-" + paddedDay;
         callback(currentDate);
      }
   }]);
   
});
