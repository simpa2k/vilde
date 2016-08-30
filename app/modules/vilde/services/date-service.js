define(function() {

   var app = angular.module('vilde');
   
   app.service('DateService', ['$filter', function($filter) {
      var self = this;

      self.getCurrentDate = function(callback) {
         var date = new Date();
         callback(date);
      };

      self.compareYearMonthDay = function(date1, date2) {
         date1Year = date1.getFullYear();
         date2Year = date2.getFullYear();

         date1Month = date1.getMonth();
         date2Month = date2.getMonth();

         date1Day = date1.getDate();
         date2Day = date2.getDate();

         if(date1Year <= date2Year) {
            if(date1Month <= date2Month) {
               return date1Day >= date2Day;
            } else {
               return true;
            }
         } else {
            return true;
         }
      };

   }]);
   
});
