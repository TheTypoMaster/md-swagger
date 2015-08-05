##MD Swagger UI

MD Swagger UI is a dependency-free collection of HTML, Javascript, and CSS assets that dynamically
generate beautiful documentation and sandbox from a markdown file.


## How to Use It

### Download
You can use the md-swagger-ui code AS-IS!  No need to build or recompile--just clone this repo and use the pre-built files in the `dist` folder.

##### Browser support
MD Swagger UI works in all evergreen desktop browsers (Chrome, Safari, Firefox). Internet Explorer support is version 8 (IE8) and above.

### Build
You can rebuild md-swagger-ui on your own to tweak it or just so you can say you did.  To do so, follow these steps:

1. `bower install md-swagger-ui`
2. `gulp`
3. You should see the distribution under the dist folder. Open [`./dist/index.html`](https://github.com/IRVUI/md-swagger/blob/master/dist/index.html) to launch MD Swagger UI in a browser

### Development
Use `gulp watch` to make a new build and watch for changes in files.

### Usage, Customization and Configuration

The following md customization are supported as of 1.7.0

## swagger-url

###example1:json url

 \```swagger-url

 /docs/sample.json
     
 \```
 
 \```swagger-url

http://petstore.swagger.io/v2/swagger.json
     
 \```
 

###example2:yaml url
 \```swagger-url

 /docs/sample.yaml
     
 \```
 
 
  
## swagger-yaml (embedded yaml)

example:

\```swagger-yaml


  ... place your swagger yaml ...
  

\```


## swagger-json (embedded json)

example:

\```swagger-json


  ... place your swagger json ...
  

\```


MD Swagger UI Version | Release Date | Swagger Spec compatibility | Notes
------------------ | ------------ | -------------------------- | ----- 
1.7.0              | 2015-08-05   | 1.1, 1.2, 2.0              | [master](https://github.com/IRVUI/md-swagger)
