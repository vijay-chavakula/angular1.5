(function(){
var app= angular.module('listComponents',[]);
app.component('listComponent', {
    // isolated scope binding
    bindings: {
        iconclass: '@',
        message: '@'
    },

    // Inline template which is binded to message variable
    // in the component controller
    templateUrl:'./list-component.html',

    // The controller that handles our component logic
    controller: function () {
        this.message = "List Component1";
    }
});

})();