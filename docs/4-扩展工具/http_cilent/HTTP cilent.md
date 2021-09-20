# HTTP cilent

When testing a web service, you can create, edit, and execute HTTP Requests directly in the IntelliJ IDEA [code editor](https://www.jetbrains.com/help/idea/using-code-editor.html).

![https://resources.jetbrains.com/help/img/idea/2021.2/basic_request.png](HTTP%20cilent.assets/basic_request.png)

Gif

HTTP Requests are stored in **.http** and **.rest** files and are marked with the ![HTTP file icon](HTTP%20cilent.assets/restClient.com.intellij.ws.rest.client.icons.http_requests_filetype.svg) icon.

Support for HTTP files includes the following features:

- [Code highlighting](https://www.jetbrains.com/help/idea/configuring-colors-and-fonts.html)
- [Code completion](https://www.jetbrains.com/help/idea/auto-completing-code.html) for hosts, method types, header fields, and endpoints defined via [OpenAPI](https://www.jetbrains.com/help/idea/openapi.html).
- [Code folding](https://www.jetbrains.com/help/idea/working-with-source-code.html#code_folding) for requests, their parts, and response handler scripts
- [Inline documentation](https://www.jetbrains.com/help/idea/viewing-reference-information.html) for request header fields and doc tags
- [Viewing a structure](https://www.jetbrains.com/help/idea/viewing-structure-of-a-source-file.html) of HTTP requests
- [Language injections](https://www.jetbrains.com/help/idea/using-language-injections.html) inside the request message body
- [Move refactorings](https://www.jetbrains.com/help/idea/move-refactorings.html)
- [Live templates](https://www.jetbrains.com/help/idea/using-live-templates.html)

Before you begin, [configure the Proxy settings](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html#configureProxy) on the [HTTP Proxy](https://www.jetbrains.com/help/idea/settings-http-proxy.html) page of the **Settings/Preferences** dialog Ctrl+Alt+S if necessary.



## Configuring proxy settings﻿

1. In the **Settings/Preferences** dialog Ctrl+Alt+S, choose **System Settings** under **Appearance & Behavior**, then choose **HTTP Proxy**.
2. In the [Proxy dialog](https://www.jetbrains.com/help/idea/settings-http-proxy.html) that opens, select **Manual proxy configuration** and specify the following:
   - Enter the proxy host name and port number in the **Host name** and **Port number** fields.
   - To enable authorization, select the **Proxy authentication** checkbox and type the username and password in the corresponding fields.

## Create HTTP request files﻿

You can work with HTTP requests either from scratch files or from physical files of the *HTTP Request* type. Each file can contain multiple requests, and you can create as many files as needed.

[Scratch files](https://www.jetbrains.com/help/idea/scratches.html) can be used to test HTTP requests during development. Scratch files are not stored inside a project, so IntelliJ IDEA can modify them and add additional information about the request. When an HTTP request is executed from a scratch file, the link to the response output file is added below the request and at the top of the [requests history](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html#requests_history) file.

### Create an HTTP request scratch file﻿

- Press Ctrl+Alt+Shift+Insert and select **HTTP Request**.

*Physical files* can be used for documenting, testing, and validating HTTP requests. Physical files are stored inside your project, and IntelliJ IDEA will not modify them. When an HTTP request is executed from a physical file, this file is not modified. Information about the executed request with the link to the response output file is added to the top of the [requests history](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html#requests_history) file.

### Create a physical HTTP request file﻿

- In the **File** menu, point to **New**, and then click **HTTP Request**.

### Move an HTTP request﻿

You can use the [Move](https://www.jetbrains.com/help/idea/move-refactorings.html) refactoring F6 to move HTTP requests from scratches to physical files, as well as between physical files.

1. In the editor, position the caret at the request to be moved and do one of the following:

   - From the main menu or the context menu, select **Refactor | Move**.
   - Press Alt+Enter and select the **Move HTTP Requests** [intention action](https://www.jetbrains.com/help/idea/intention-actions.html).
   - Press F6.

2. In the **Move HTTP Requests** dialog that opens, do the following:

   - In the **Path** field, choose one of the existing **.http** files from the list or click ![the Browse button](HTTP%20cilent.assets/icons.general.ellipsis.svg) to locate the file.

     You can also type the full path to the file manually. If you specify the name of a non-existing file, a new file with the provided name will be created automatically.

   - In the **Requests** list, select the checkboxes next to the requests you want to move.

## Compose HTTP requests﻿

IntelliJ IDEA uses the *HTTP request in Editor* format, which provides a simple way to create, execute, and store information about HTTP requests. You can type them directly in the [created HTTP request files](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html#creating-http-request-files) using the following general syntax:

```shell
Method Request-URI HTTP-Version
Header-field: Header-value

Request-Body
```

Copied!

To speed up composing HTTP requests, click the **Add request** shortcut link on top of the request's editor panel. In the popup menu, choose the type of the request to add.

![Add an HTTP request](HTTP%20cilent.assets/ps_add-http-request.png)

Alternatively, use [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html). In the editor, you can press Ctrl+J to view the list of available templates. For example, **gtr** expands to a simple GET request; **mptr** expands to a `multipart/form-data` POST request.

![image-20210908175356321](HTTP%20cilent.assets/image-20210908175356321.png)



To get an overview of the HTTP Client possibilities, you can explore the **HTTP Requests Collection**, which is a handful selection of composed requests.

