jsCookie
========
  
**To donate and or get personal support, you are welcome to buy jsCookie from [CodeCanyon](http://codecanyon.net/item/jscookie-easy-to-use-javascript-cookie-library/308627)**  
- Which was the previous place where jsCookie was published.

jsCookie is a simple, fast JavaScript Library that will help you handle cookies the easy way!

jsCookie is designed to change the way you handle JavaScript Cookies.
Are you tired of the “document.cookie” element? Do you want to have full control over cookies? in a simple manner? - **get jsCookie!** 

###Video:
[screenr.com/EyHs](http://www.screenr.com/EyHs)

###Example:

`jsCookie.create("name","value",[0,1,0,0]); //create a cookie that expires in 1 hour
console.log(jsCookie.read("name"));//outputs: "value" `


###Updates:

* Update 1.4: 
 * 1 New function getNamesByValue().
 * Modified getAsArray() to return an object literal.
 * Code improvements (lint tests and more).
 * Updated Documentation.
* Update 1.3:
 * 3 New functions ( update(), appendValue() & getSettings() ).
 * Updated Documentation.
 * Minor Code improvements.
 * Update 1.2 : After several complaints about errors, I decided to update jsCookie – [] .
 * Run-time errors – fixed!
 * Dev tool updated.
 * Better integration with jQuery
* The first major update, code-named “jsCookie-1.1”.
 * Minifyied version of jsCookie.(2.74k”b instead of 5.78k”b)
 * Updated documentation.
 * Developer tool that checks jsCookie’s functions.
* Fix for the prototype object. :) - Done!
* 
###Implementation:

1. Include jsCookie into your html file:
Just copy this code into your html file and paste it before the closing “head” tag or the closing “body” tag.   
Like so:
`<script src="your/path/jsCookie-1.3.min.js"></script>`
2. Call jsCookie
In the script tag where you want to use jsCookie, add the following lines: (before using the jsCookie functions, otherwise it will not have time to load)
`var jsc = new jsCookie();`

3. Start coding!

###Functions:

`.enabled()` – check the availability of cookies on the client’s browser.
`.create()` – creates or updates a cookie.
`.set()` – creates a session cookie which exists only while the browser window remains open.
`.read()` – returns the value of the specified cookie.
`.readByValue()` – returns the name of the cookie’s value that was specified.
`.remove()` – deletes a cookie by it’s name.
`.removeByValue()` – deletes a cookie by its value.
`.removeAll()` – deletes all the cookies (only those in the current path).
`.count()` – returns the number of cookies on the page.
`.getNames()` – returns all the cookies’ names in the current page.
`.getValues()` – returns all the cookie values in the current page.
`.update()` – update cookies while maintaining their old settings.
`.appendValue()` -append values to already existing cookies.
`.getSettings()` – read and updatable cookie’s settings (expire date, path, domain, secure).
Update 1.4:
`.getAsArray()` – returns cookies and their data as an array or object literal.
`.getNamesByValue()` – get cookies names by their common value

###Todo:
You are more than welcome to suggest\fork or help in any way.  
here is a list of things we have to do:

* Replace Dev test files with a more robust method like Grunt.
* Improove the coding standards in jsCookie.
* Add a one-time popup template (which is requested often)
