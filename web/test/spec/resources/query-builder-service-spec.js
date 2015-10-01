'use strict';

describe('driver.resources: QueryBuilder', function () {

    var mockFilterState = {'filters': {'__dateRange': {'min': "Thu Oct 01 2015 10:17:26 GMT-0400 (EDT)"}}};
    beforeEach(module('ase.mock.resources'));
    beforeEach(module('driver.resources', function($provide) {
        $provide.value('FilterState', mockFilterState);
    }));
    beforeEach(module('driver.mock.resources'));

    var QueryBuilder;
    var $rootScope;
    var $httpBackend;
    var DriverResourcesMock;
    var ResourcesMock;

    beforeEach(inject(function (_$rootScope_, _$httpBackend_,
                                _QueryBuilder_, _DriverResourcesMock_, _ResourcesMock_) {
        $httpBackend = _$httpBackend_;
        QueryBuilder = _QueryBuilder_;
        $rootScope = _$rootScope_;
        DriverResourcesMock = _DriverResourcesMock_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should result in a call out to determine the selected RecordType and use the date filtering on FilterState', function () {
        var recordsUrl = /\/api\/records\/\?occurred_min=2015-10-01T14:17:26.000Z&record_type=15460346-65d7-4f4d-944d-27324e224691/;
        var recordTypeUrl = /\/api\/recordtypes\/\?active=True/;

        QueryBuilder.djangoQuery();

        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordsUrl).respond(200, DriverResourcesMock.RecordResponse);

        $rootScope.$apply();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
