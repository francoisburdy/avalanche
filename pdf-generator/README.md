# cordova-pdf-generator

Simple plugin to generate (offline) pdf. the plugin basically transform HTML to PDF and also provide the mechanism to share the pdf to other apps like Mail, etc. For now works in iOS and Android, if you want to add other platform feel free contribute.   

The iOS HTML to PDF transformation is based in this work [BNHtmlPdfKit](https://github.com/brentnycum/BNHtmlPdfKit), I just add a new method to allow transformation between plain HTML to PDF.


##Features

- Generates a PDF document using a URL or HTML raw data. for better results with raw HTML the CSS should be available for the device.
- Open-with menu, open the context menu and (push to cloud, print, save, mail, etc...).  
- Return the Base64 file representation back, so you can upload the file to a server (IOS only).


## Supported Platforms

* Android
* iOS 

## Installing using Plugman

    cordova platform add ios
    plugman install --platform ios --project platforms/ios --plugin cordova-pdf-generator


## Installing using NPM

    npm install cordova-pdf-generator
    cordova plugins add node_modules/cordova-pdf-generator


## Installing the hard way.

Clone the plugin

    $ git clone https://github.com/cesarvr/pdf-generator

Create a new Cordova Project

    $ cordova create hello com.example.helloapp Hello

Install the plugin

    $ cd hello
    $ cordova plugin add ../pdf-generator


Example:

This generates a pdf from a URL, it convert HTML to PDF and returns the file representation in base64.  

```js
 document.addEventListener('deviceready', function() {

        pdf.htmlToPDF({
            url: "http://www.google.es",
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);

 });
```

The same but giving HTML without URL.

```js
 document.addEventListener('deviceready', function() {

     pdf.htmlToPDF({
            data: "<html> <h1>  Hello World  </h1> </html>",
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);

 });
```

Opening the pdf with other app menu.

```js
 document.addEventListener('deviceready', function() {

     pdf.htmlToPDF({
            data: "<html> <h1>  Hello World  </h1> </html>",
            documentSize: "A4",
            landscape: "portrait",
            type: "share" //use share to open the open-with-menu.
        }, this.success, this.failure);

 });
```


# Demo

You can find [Demo](https://github.com/cesarvr/pdf-generator).


# API reference

#### pdf

- data: here you sent raw HTML.
- url: url location of the webpage.
- documentSize: for now only support "A4" and "A3".
- landscape: portrait or landscape.
- type:
    - *base64* give you the pdf in Base64 format.
    - *share* opens IOS menu with all options available, this came handy when you want IOS take ownership of the Doc.  

- success callback: only expect one parameter base64 in case you choose 'base64' type option or boolean in case you to share.
-
- failure callback: receive error information about what going wrong, for now is just raw exception so i need to improve this.



Install iOS or Android platform

    cordova platform add ios
    cordova platform add android

Run the code

    cordova run ios 
    cordova run android

## More Info

[here]:https://github.com/cesarvr/pdf-generator-example

For more information on setting up Cordova see [the documentation](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

For more info on plugins see the [Plugin Development Guide](http://cordova.apache.org/docs/en/4.0.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)
