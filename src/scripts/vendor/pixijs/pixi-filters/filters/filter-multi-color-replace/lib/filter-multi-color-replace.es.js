/*!
 * @pixi/filter-multi-color-replace - v2.5.0
 * Compiled Wed, 10 Jan 2018 17:38:59 UTC
 *
 * @pixi/filter-multi-color-replace is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import{Filter,utils}from"pixi.js";var vertex="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",fragment="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n",MultiColorReplaceFilter=function(o){function r(r,e,n){void 0===e&&(e=.05),void 0===n&&(n=null),n=n||r.length,o.call(this,vertex,fragment.replace(/%maxColors%/g,n)),this.epsilon=e,this._maxColors=n,this._replacements=null,this.uniforms.originalColors=new Float32Array(3*n),this.uniforms.targetColors=new Float32Array(3*n),this.replacements=r}o&&(r.__proto__=o),r.prototype=Object.create(o&&o.prototype),r.prototype.constructor=r;var e={replacements:{configurable:!0},maxColors:{configurable:!0},epsilon:{configurable:!0}};return e.replacements.set=function(o){var r=this.uniforms.originalColors,e=this.uniforms.targetColors,n=o.length;if(n>this._maxColors)throw"Length of replacements ("+n+") exceeds the maximum colors length ("+this._maxColors+")";r[3*n]=-1;for(var t=0;t<n;t++){var i=o[t],l=i[0];"number"==typeof l?l=utils.hex2rgb(l):i[0]=utils.rgb2hex(l),r[3*t]=l[0],r[3*t+1]=l[1],r[3*t+2]=l[2];var a=i[1];"number"==typeof a?a=utils.hex2rgb(a):i[1]=utils.rgb2hex(a),e[3*t]=a[0],e[3*t+1]=a[1],e[3*t+2]=a[2]}this._replacements=o},e.replacements.get=function(){return this._replacements},r.prototype.refresh=function(){this.replacements=this._replacements},e.maxColors.get=function(){return this._maxColors},e.epsilon.set=function(o){this.uniforms.epsilon=o},e.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(r.prototype,e),r}(Filter);export{MultiColorReplaceFilter};
//# sourceMappingURL=filter-multi-color-replace.es.js.map