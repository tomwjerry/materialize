describe( "Cards", function () {
  beforeEach(async function() {
    await XloadFixtures(['cards/cardsFixture.html']);
  });

  afterEach(function(){
    XunloadFixtures();
  });

  describe("reveal cards", function () {
    var revealCard;

    beforeEach(function() {
      revealCard = document.querySelector('.card.reveal');
    });

    it("should have a hidden card-reveal", function (done) {
      var revealDiv = revealCard.querySelector('.card-reveal');
      var activator = revealCard.querySelector('.activator');
      var computedDisplay = getComputedStyle(revealDiv);

      expect(computedDisplay.getPropertyValue('display')).toEqual('none', 'reveal div should be hidden initially'); //TODO replace with alternative for deprecated jasmine-jquery

      setTimeout(function() {
        activator.click();

        setTimeout(function() {
          computedDisplay = getComputedStyle(revealDiv);
          expect(computedDisplay.getPropertyValue('display')).toEqual('block', 'reveal did not appear after activator was clicked.'); //TODO replace with alternative for deprecated jasmine-jquery

          // Check revealDiv covers reveal card.
          var revealDivPositions = revealDiv.getBoundingClientRect();
          var revealCardPositions = revealCard.getBoundingClientRect();
          expect(revealDivPositions.width).toEqual(revealCardPositions.width, 'activator was not as wide as reveal card.');
          expect(revealDivPositions.height).toEqual(revealCardPositions.height, 'activator was not as high as reveal card.');
          expect(revealDivPositions.top).toEqual(revealCardPositions.top, 'activator was not as in the same y as reveal card.');
          expect(revealDivPositions.left).toEqual(revealCardPositions.left, 'activator was not as in the same x as reveal card.');

          done();
        }, 400);
      }, 400);
    });
  });

  describe("image cards", function () {
    var imageCard;

    beforeEach(function() {
      imageCard = document.querySelector('.card.image');
    });

    it("should have an image that fills to full width of card", function () {
      var image = imageCard.querySelector('.card-image > img');
      var imagePositions = image.getBoundingClientRect();
      var imageCardPositions = imageCard.getBoundingClientRect();

      expect(imagePositions.width).toEqual(imageCardPositions.width, 'image does not fill width of card');
      expect(imagePositions.top).toEqual(imageCardPositions.top, 'image was not as in the same y as card.');
    });
  });


  describe("sized cards", function () {
    var small, medium, large;

    beforeEach(function() {
      small = document.querySelector('.card.small');
      medium = document.querySelector('.card.medium');
      large = document.querySelector('.card.large');
    });

    it("should have small card dimensions", function () {
      var cardImage = small.querySelector('.card-image');
      var cardContent = small.querySelector('.card-content');
      var cardAction = small.querySelector('.card-action');
      var smallRect = small.getBoundingClientRect();
      var cardImageRect = cardImage.getBoundingClientRect();
      var cardContentRect = cardContent.getBoundingClientRect();
      var cardActionRect = cardAction.getBoundingClientRect();

      expect(smallRect.height).toEqual(300, 'small card should be 300px high');
      expect(cardImageRect.height).toBeLessThan(181, 'small image should be <= 180px or 60% high');
      expect(cardContentRect.height).toBeLessThan(121, 'small content should be <= 120px or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(smallRect.top + smallRect.height, 'small action should be at bottom of card');
    });

    it("should have medium card dimensions", function () {
      var cardImage = medium.querySelector('.card-image');
      var cardContent = medium.querySelector('.card-content');
      var cardAction = medium.querySelector('.card-action');
      var mediumRect = medium.getBoundingClientRect();
      var cardImageRect = cardImage.getBoundingClientRect();
      var cardContentRect = cardContent.getBoundingClientRect();
      var cardActionRect = cardAction.getBoundingClientRect();

      expect(mediumRect.height).toEqual(400, 'medium card should be 400px high');
      expect(cardImageRect.height).toBeLessThan(241, 'medium image should be <= 240 or 60% high');
      expect(cardContentRect.height).toBeLessThan(161, 'medium content should be <= 160px or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(mediumRect.top + mediumRect.height, 'medium action should be at bottom of card');
    });

    it("should have large card dimensions", function () {
      var cardImage = large.querySelector('.card-image');
      var cardContent = large.querySelector('.card-content');
      var cardAction = large.querySelector('.card-action');
      var largeRect = large.getBoundingClientRect();
      var cardImageRect = cardImage.getBoundingClientRect();
      var cardContentRect = cardContent.getBoundingClientRect();
      var cardActionRect = cardAction.getBoundingClientRect();

      expect(largeRect.height).toEqual(500, 'large card should be 500px high');
      expect(cardImageRect.height).toBeLessThan(301, 'large image should be <= 300 or 60% high');
      expect(cardContentRect.height).toBeLessThan(201, 'large content should be <= 200 or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(largeRect.top + largeRect.height, 'large action should be at bottom of card');
    });
  });
});
