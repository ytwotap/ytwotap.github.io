# form表单

An HTML form is used to collect user input. The user input is most often sent to a server for processing.

## The <form> Element

The HTML `<form>` element is used to create an HTML form for user input:

```html
<!--action form 表单提交位置-->
<!--method get put 等 常用 方法-->
<form action="http://www.baidu.com" method="get">
    <!--text 输入表单-->
    <!--name 表单参数名字 value 表单参数值-->
    <input type="text" name="wd" value="zs">
    <input type="password" name="password" value="">
<!--submit 用于提交表单元素-->
    <input type="submit" value="submit">
</form>
```



The `<form>` element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc.

All the different form elements are covered in this chapter: [HTML Form Elements](https://www.w3schools.com/html/html_form_elements.asp).

## The <input> Element

The HTML `<input>` element is the most used form element.

An `<input>` element can be displayed in many ways, depending on the `type` attribute.

Here are some examples:

| Type                    | Description                                                  |
| :---------------------- | :----------------------------------------------------------- |
| <input type="text">     | Displays a single-line text input field                      |
| <input type="radio">    | Displays a radio button (for selecting one of many choices)  |
| <input type="checkbox"> | Displays a checkbox (for selecting zero or more of many choices) |
| <input type="submit">   | Displays a submit button (for submitting the form)           |
| <input type="button">   | Displays a clickable button                                  |

All the different input types are covered in this chapter: [HTML Input Types](https://www.w3schools.com/html/html_form_input_types.asp).

------

# HTML Form Attributes

This chapter describes the different attributes for the HTML `<form>` element.

## The Action Attribute

The `action` attribute defines the action to be performed when the form is submitted.

Usually, the form data is sent to a file on the server when the user clicks on the submit button.

In the example below, the form data is sent to a file called "action_page.php". This file contains a server-side script that handles the form data:

```html
<form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form>

```

**Tip:** If the `action` attribute is omitted, the action is set to the current page.

## The Target Attribute

The `target` attribute specifies where to display the response that is received after submitting the form.

The `target` attribute can have one of the following values:

| Value       | Description                                              |
| :---------- | :------------------------------------------------------- |
| _blank      | The response is displayed in a new window or tab         |
| _self       | The response is displayed in the current window          |
| _parent     | The response is displayed in the parent frame            |
| _top        | The response is displayed in the full body of the window |
| *framename* | The response is displayed in a named iframe              |

The default value is `_self` which means that the response will open in the current window.

### Example

Here, the submitted result will open in a new browser tab:

```html
<!--target 显示 from提交后 显示在哪里-->
<form action="http://www.baidu.com" method="get" target="_bank">
```

## The Method Attribute

The `method` attribute specifies the HTTP method to be used when submitting the form data.

The form-data can be sent as URL variables (with `method="get"`) or as HTTP post transaction (with `method="post"`).

The default HTTP method when submitting form data is GET. 

### Example

This example uses the GET method when submitting the form data:

```html
<form action="/action_page.php" method="get">
```

# HTML Form Elements

The HTML `<form>` element can contain one or more of the following form elements:

- `<input>`
- `<label>`
- `<select>`
- `<textarea>`
- `<button>`
- `<fieldset>`
- `<legend>`
- `<datalist>`
- `<output>`
- `<option>`
- `<optgroup>`

## The input Element

One of the most used form element is the `<input>` element.

The `<input>` element can be displayed in several ways, depending on the `type` attribute.

```html
<label for="fname">First name:</label>
<input type="text" id="fname" name="fname">
```



## The label Element

The `<label>` element defines a label for several form elements.

The `<label>` element is useful for screen-reader users, because the screen-reader will read out loud the label when the user focus on the input element.

The `<label>` element also help users who have difficulty clicking on very small regions (such as radio buttons or checkboxes) - because when the user clicks the text within the `<label>` element, it toggles the radio button/checkbox.

The `for` attribute of the `<label>` tag should be equal to the `id` attribute of the `<input>` element to bind them together.

## The select Element

The `<select>` element defines a drop-down list:





<label for="cars">Choose a car:</label>

<select id="cars" name="cars">
 <option value="volvo">Volvo</option>
 <option value="saab">Saab</option>
 <option value="fiat">Fiat</option>
 <option value="audi">Audi</option>
</select>

The `<option>` elements defines an option that can be selected.

By default, the first item in the drop-down list is selected.

To define a pre-selected option, add the `selected` attribute to the option:

```html
<option value="fiat" selected>Fiat</option>
```



### Visible Values:

Use the `size` attribute to specify the number of visible values:

<label for="cars">Choose a car:</label>

<select id="cars" name="cars" size="3">
 <option value="volvo">Volvo</option>
 <option value="saab">Saab</option>
 <option value="fiat">Fiat</option>
 <option value="audi">Audi</option>
</select>

### Allow Multiple Selections:

Use the `multiple` attribute to allow the user to select more than one value:

<label for="cars">Choose a car:</label>

<select id="cars" name="cars" size="4" multiple>
 <option value="volvo">Volvo</option>
 <option value="saab">Saab</option>
 <option value="fiat">Fiat</option>
 <option value="audi">Audi</option>
</select>

## The <textarea> Element

The `<textarea>` element defines a multi-line input field (a text area):

<textarea name="message" rows="5" cols="5">
The cat was playing in the garden.
</textarea>

The `rows` attribute specifies the visible number of lines in a text area.

The `cols` attribute specifies the visible width of a text area.

This is how the HTML code above will be displayed in a browser:

The cat was playing in the garden.

You can also define the size of the text area by using CSS:

<textarea name="message" style="width:200px; height:200px;">
The cat was playing in the garden.
</textarea>

# HTML Input Types

This chapter describes the different types for the HTML `<input>` element.

- `<input type="button">`
- `<input type="checkbox">`
- `<input type="color">`
- `<input type="date">`
- `<input type="datetime-local">`
- `<input type="email">`
- `<input type="file">`
- `<input type="hidden">`
- `<input type="image">`
- `<input type="month">`
- `<input type="number">`
- `<input type="password">`
- `<input type="radio">`
- `<input type="range">`
- `<input type="reset">`
- `<input type="search">`
- `<input type="submit">`
- `<input type="tel">`
- `<input type="text">`
- `<input type="time">`
- `<input type="url">`
- `<input type="week">`

## Input Type Text

`<input type="text">` defines a **single-line text input field**:

<form>
 <label for="fname">First name:</label><br>
 <input type="text" id="fname" name="fname"><br>
 <label for="lname">Last name:</label><br>
 <input type="text" id="lname" name="lname">
</form>

## Input Type Password

`<input type="password">` defines a **password field**:

<form>
 <label for="username">Username:</label><br>
 <input type="text" id="username" name="username"><br>
 <label for="pwd">Password:</label><br>
 <input type="password" id="pwd" name="pwd">
</form>

## Input Type Submit

`<input type="submit">` defines a button for **submitting** form data to a **form-handler**.

The form-handler is typically a server page with a script for processing input data.

The form-handler is specified in the form's `action` attribute:

<form action="/action_page.php">
 <label for="fname">First name:</label><br>
 <input type="text" id="fname" name="fname" value="John"><br>
 <label for="lname">Last name:</label><br>
 <input type="text" id="lname" name="lname" value="Doe"><br><br>
 <input type="submit" value="Submit">
</form>

---

# HTML Input Attributes

This chapter describes the different attributes for the HTML `<input>` element.

## The value Attribute

The input `value` attribute specifies an initial value for an input field:

<form>
 <label for="fname">First name:</label><br>
 <input type="text" id="fname" name="fname" value="John"><br>
 <label for="lname">Last name:</label><br>
 <input type="text" id="lname" name="lname" value="Doe">
</form>

## the disabled Attribute

## The readonly Attribute

## The size Attribute

The input `size` attribute specifies the visible width, in characters, of an input field.

The default value for `size` is 20.

**Note:** The `size` attribute works with the following input types: text, search, tel, url, email, and password.

dec...