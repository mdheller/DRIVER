(function () {
    'use strict';

    /* ngInject */
    function StateConfig($stateProvider) {
        $stateProvider.state('account', {
            url: '/account',
            template: '<driver-account></driver-account>',
            label: 'Account'
        });
    }

    angular.module('driver.views.account', [
        'ui.router',
        'ui.bootstrap'
    ]).config(StateConfig);

})();
