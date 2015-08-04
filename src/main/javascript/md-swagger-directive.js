/// <reference path="../app.d.ts" />

(function () {
	'use strict';

	angular.module('md-swagger', [])
			.controller('mdSwaggerCtrl', function($http, $scope){
				console.log('initiaing demo controller');
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


						// Pre load translate...
						if (window.SwaggerTranslator) {
							window.SwaggerTranslator.translate();
						}
						function loadSwaggerFromUrl() {

							var swaggerElements = $($elem[0]).find(".lang-swagger-url");
							for (var i = 0; i < swaggerElements.length; i++) {
								var code = swaggerElements[i];

								var id = "swagger-url-container-" + i + 1;
								var div = "<div class='swagger-section'><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";
								$(code.parentNode).replaceWith(div);

								var spec = JSON.parse(code.innerText);
								var url = spec.url.replace(/(?:\r\n|\r|\n)/g, '');
								var jsonUrl;
								if (url.substring(0, 5) === "http:") {
									jsonUrl = url;
								} else {
									jsonUrl = window.location.origin + baseJsonUri + url;
								}
								window.swaggerUrlUi = new SwaggerUi({
									url: jsonUrl,
									dom_id: id
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
								var div = "<div class='swagger-section'><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";
								$(code.parentNode).replaceWith(div);

								window.swaggerUi = new SwaggerUi({
									url: 'localhost',
									spec: spec,
									dom_id: id
								});
								window.swaggerUi.load();
							}
							;
						};
						function loadSwaggerFromYaml() {
							var swaggerElements = $($elem[0]).find(".lang-swagger-yaml");
							for (var i = 0; i < swaggerElements.length; i++) {
								var code = swaggerElements[i];

								var yml = code.innerText;
								var spec = YAML.parse(yml);
								var id = "swagger-yaml-container-" + i + 1;
								var div = "<div class='swagger-section'><div style='margin-left:0' class='swagger-ui-wrap' id='" + id + "'></div></div>";
								$(code.parentNode).replaceWith(div);

								window.swaggerUi = new SwaggerUi({
									url: 'localhost',
									spec: spec,
									dom_id: id
								});
								window.swaggerUi.load();
							}
							;
						};
						ngModel.$render = function () {
							var md = ngModel.$viewValue;
							if (md && md.length > 0) {
								var html = marked(ngModel.$viewValue || '');
								$elem.html(html);

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