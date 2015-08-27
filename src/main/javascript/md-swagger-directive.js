/// <reference path="../app.d.ts" />

(function () {
	'use strict';

	angular.module('md-swagger', [])
			.controller('mdSwaggerCtrl', function($http, $scope){
				$scope.baseJsonUri = "";
				$http.get('docs/sample.md').success(function(data){
					$scope.markdown = data;
				});
			})
			.directive('mdSwagger', function () {
				return {
					restrict: 'E',
					require:'?ngModel',
					scope: {
						baseJsonUri: '='
					},
					link: function ($scope, $elem, $attrs, ngModel) {
						var baseJsonUri = $scope.baseJsonUri;

						function addApiKeyAuthorization(api_key_id){
							var key = encodeURIComponent($('#' + api_key_id)[0].value);
							if(key && key.trim() != "") {
								if(window.swaggerUi){
									console.log(key);
									window.swaggerUi.api.clientAuthorizations.add("api_key", new SwaggerClient.ApiKeyAuthorization("Authorization", key, "header"));
									console.log(window.swaggerUi.api.clientAuthorizations);
								} else if(window.swaggerUrlUi){
									window.swaggerUrlUi.api.clientAuthorizations.add("api_key", new SwaggerClient.ApiKeyAuthorization("Authorization", key, "header"));
								}
							}
						}


						// Pre load translate...
						if (window.SwaggerTranslator) {
							window.SwaggerTranslator.translate();
						}
						function loadSwaggerFromUrl() {

							var swaggerElements = $($elem[0]).find(".lang-swagger-url");
							for (var i = 0; i < swaggerElements.length; i++) {
								var code = swaggerElements[i];

								var id = "swagger-url-container-" + i + 1;
								var api_key_id = "input_apiKey" + i + 1;
								var div = "<div class='swagger-section'><div class='input'><label>API Token: </label><input class='form-control' style='width:40%' placeholder='api_key' id='" + api_key_id + "' name='apiKey' type='text'/></div><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";

								$(code.parentNode).replaceWith(div);

								//var spec = JSON.parse(code.innerText);
								var url = code.innerText.replace(/(?:\r\n|\r|\n)/g, '');
								var jsonUrl;
								if (url.substring(0, 5) === "http:") {
									jsonUrl = url;
								} else {
									jsonUrl = window.location.origin + baseJsonUri + url;
								}
								window.swaggerUrlUi = new SwaggerUi({
									url: jsonUrl,
									dom_id: id,
									onComplete: function(swaggerApi, swaggerUi){
										addApiKeyAuthorization(api_key_id);
										$('#' + api_key_id).change(function(){  addApiKeyAuthorization(api_key_id);});
									},
									docExpansion: "none",
									apisSorter: "alpha"
								});
								window.swaggerUrlUi.load();
							};
						};
						function loadSwaggerFromJson() {
							var swaggerElements = $($elem[0]).find(".lang-swagger-json");
							for (var i = 0; i < swaggerElements.length; i++) {
								var code = swaggerElements[i];

								var spec = JSON.parse(code.innerText);
								var id = "swagger-json-container" + i + 1;
								var api_key_id = "input_json_apiKey" + i + 1;
								var div = "<div class='swagger-section'><div class='input'><label>API Token: </label><input class='form-control' style='width:40%' placeholder='api_key' id='" + api_key_id + "' name='apiKey' type='text'/></div><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";
								$(code.parentNode).replaceWith(div);

								window.swaggerUi = new SwaggerUi({
									url: 'localhost',
									spec: spec,
									dom_id: id,
									onComplete: function(swaggerApi, swaggerUi){

										addApiKeyAuthorization(api_key_id);
										$('#' + api_key_id).change(function(){ addApiKeyAuthorization(api_key_id);});
									},
									docExpansion: "none",
									apisSorter: "alpha"
								});
								window.swaggerUi.load();
							};
						};
						function loadSwaggerFromYaml() {
							var swaggerElements = $($elem[0]).find(".lang-swagger-yaml");
							for (var i = 0; i < swaggerElements.length; i++) {
								var code = swaggerElements[i];

								var yml = code.innerText;
								var spec = YAML.parse(yml);

								var id = "swagger-yaml-container-" + i + 1;
								var api_key_id = "input_yaml_apiKey" + i + 1;
								var div = "<div class='swagger-section'><div class='input'><label>API Token: </label><input class='form-control' style='width:40%' placeholder='api_key' id='" + api_key_id + "' name='apiKey' type='text'/></div><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";


								$(code.parentNode).replaceWith(div);

								window.swaggerUi = new SwaggerUi({
									url: 'localhost',
									spec: spec,
									dom_id: id,
									onComplete: function(swaggerApi, swaggerUi){
										addApiKeyAuthorization(api_key_id);
										$('#' + api_key_id).change(function(){addApiKeyAuthorization(api_key_id);});
									},
									docExpansion: "none",
									apisSorter: "alpha"
								});
								window.swaggerUi.load();
							}
							;
						};
						ngModel.$render = function () {
							var md = ngModel.$viewValue;
							if (md && md.length > 0) {

								var html = marked(ngModel.$viewValue || '');
								var wrapper = $('<div class="md-swagger"></div>');
								wrapper.html(html);
								$elem.append(wrapper);

								setTimeout(function () {
									loadSwaggerFromUrl();
									loadSwaggerFromJson();
									loadSwaggerFromYaml();
									$scope.$apply();
								}, 10);
							}
						};
					}
				};
			});
})();