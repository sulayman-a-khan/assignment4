
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

•	getElementById: It picks only one element by targeting its ID.
•	getElementsByClassName: It picks all elements that have the same class name.
•	querySelector: We can use it like CSS .class and #id.  It only picks the first element from the code.
•	querySelectorAll: It picks all the elements that match the same CSS selector.


### 2. How do you create and insert a new element into the DOM?

To create and insert a new element into the DOM, we need to do 3 things
1.	Create:     const newElement = document.createElement('p');
2.	Add Text:   newElement.innerText = 'This is new text';
3.	Insert:     document.body.appendChild(newElement);


### 3. What is Event Bubbling? And how does it work?

When we click a button, the click "bubbles up" to its parents. It is called Event Bubbling. For example, if we click a button inside a div, 
the click happens on the button first, then it automatically happens on the div too. It goes from bottom to top.


### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a trick where we don't put event listeners on every single child element. Instead, we put only one listener on the parent element, and this is Event Delegation. 
It is useful because It saves memory and makes the code lite and faster.


### 5. What is the difference between preventDefault() and stopPropagation() methods?

•	preventDefault(): It stops the browser's default work. Like, it stops a form from reloading the page or a link from opening.
•	stopPropagation(): It stops the "Event Bubbling". It makes sure that if you click a child, the parent will not clicked.


