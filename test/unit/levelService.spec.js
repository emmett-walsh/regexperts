describe('LevelService', function(){

  beforeEach(module('regexpert'));

  var LevelService, httpBackend, url, response;

  url = '/levels/levels.json';
  response = {
    levels:[
      {
        number:   1,
        text:     "Hiya there buddy",
        target:   "ya"
      },
      {
        number:   2,
        text:     "Sorry there buddy can't do that",
        target:   "buddy"
      }
    ]
  };

  beforeEach(inject(function(_LevelService_, $httpBackend){
    LevelService = _LevelService_;
    httpBackend = $httpBackend;
  }));

  describe('#getLevel', function(){
    it('returns the content of the desired level', function(){
      httpBackend.expectGET(url).respond(response);
      LevelService.getLevel(1).then(function(response){
        expect(response).toEqual({
          number:   1,
          text:     "Hiya there buddy",
          target:   "ya"
        });
      });
      httpBackend.flush();
    });

    it('does not return information from other levels', function(){
      httpBackend.expectGET(url).respond(response);
      LevelService.getLevel(1).then(function(response){
        expect(response).not.toEqual({
          number:   2,
          text:     "Sorry there buddy can't do that",
          target:   "buddy"
        });
      });
      httpBackend.flush();
    });
  });

});