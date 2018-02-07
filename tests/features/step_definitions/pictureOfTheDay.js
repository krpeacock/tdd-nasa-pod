module.exports = function(){
  this.When(/^I open the app$/, function(){
    browser.url("http://localhost:3000")
  })
  this.Then(/^I see the app loaded$/, function(){
    browser.waitForVisible("h1.header")
    expect(browser.isVisible("h1.header")).toEqual(true)
  })
}