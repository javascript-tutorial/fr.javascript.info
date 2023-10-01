describe("test", function() {
  
  // Habituellement Mocha attends 2 secondes avant de considérer qu'ils sont érronés

  this.timeout(200000); // Avec ce code, on définit 200,000 millisecondes (200 secondes) de délai

  // C'est à cause de la fonction "alert", car si vous ne cliquez pas à temps sur "Ok", les tests ne passeront pas.

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
