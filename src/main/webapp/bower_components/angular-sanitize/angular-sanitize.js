/**
 * @license AngularJS v1.3.11
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

var $sanitizeMinErr = angular.$$minErr('$sanitize');

/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * # ngSanitize
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 *
 * <div doc-module-components="ngSanitize"***REMOVED***</div***REMOVED***
 *
 * See {@link ngSanitize.$sanitize `$sanitize`***REMOVED*** for usage.
 */

/*
 * HTML Parser By Misko Hevery (misko@hevery.com)
 * based on:  HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {***REMOVED***,
 *     end: function(tag) {***REMOVED***,
 *     chars: function(text) {***REMOVED***,
 *     comment: function(text) {***REMOVED***
 * ***REMOVED***);
 *
 */


/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string, however, since our parser is more strict than a typical browser
 *   parser, it's possible that some obscure input, which would be recognized as valid HTML by a
 *   browser, won't make it through the sanitizer. The input may also contain SVG markup.
 *   The whitelist is configured using the functions `aHrefSanitizationWhitelist` and
 *   `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider `$compileProvider`***REMOVED***.
 *
 * @param {string***REMOVED*** html HTML input.
 * @returns {string***REMOVED*** Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js"***REMOVED***
   <file name="index.html"***REMOVED***
     <script***REMOVED***
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue"***REMOVED***an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'"***REMOVED***click here</em***REMOVED***\n' +
               'snippet</p***REMOVED***';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
       ***REMOVED***;
     ***REMOVED***]);
     </script***REMOVED***
     <div ng-controller="ExampleController"***REMOVED***
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"***REMOVED***</textarea***REMOVED***
       <table***REMOVED***
         <tr***REMOVED***
           <td***REMOVED***Directive</td***REMOVED***
           <td***REMOVED***How</td***REMOVED***
           <td***REMOVED***Source</td***REMOVED***
           <td***REMOVED***Rendered</td***REMOVED***
         </tr***REMOVED***
         <tr id="bind-html-with-sanitize"***REMOVED***
           <td***REMOVED***ng-bind-html</td***REMOVED***
           <td***REMOVED***Automatically uses $sanitize</td***REMOVED***
           <td***REMOVED***<pre***REMOVED***&lt;div ng-bind-html="snippet"&gt;<br/***REMOVED***&lt;/div&gt;</pre***REMOVED***</td***REMOVED***
           <td***REMOVED***<div ng-bind-html="snippet"***REMOVED***</div***REMOVED***</td***REMOVED***
         </tr***REMOVED***
         <tr id="bind-html-with-trust"***REMOVED***
           <td***REMOVED***ng-bind-html</td***REMOVED***
           <td***REMOVED***Bypass $sanitize by explicitly trusting the dangerous value</td***REMOVED***
           <td***REMOVED***
           <pre***REMOVED***&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre***REMOVED***
           </td***REMOVED***
           <td***REMOVED***<div ng-bind-html="deliberatelyTrustDangerousSnippet()"***REMOVED***</div***REMOVED***</td***REMOVED***
         </tr***REMOVED***
         <tr id="bind-default"***REMOVED***
           <td***REMOVED***ng-bind</td***REMOVED***
           <td***REMOVED***Automatically escapes</td***REMOVED***
           <td***REMOVED***<pre***REMOVED***&lt;div ng-bind="snippet"&gt;<br/***REMOVED***&lt;/div&gt;</pre***REMOVED***</td***REMOVED***
           <td***REMOVED***<div ng-bind="snippet"***REMOVED***</div***REMOVED***</td***REMOVED***
         </tr***REMOVED***
       </table***REMOVED***
       </div***REMOVED***
   </file***REMOVED***
   <file name="protractor.js" type="protractor"***REMOVED***
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('<p***REMOVED***an html\n<em***REMOVED***click here</em***REMOVED***\nsnippet</p***REMOVED***');
     ***REMOVED***);

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).
         toBe("<p style=\"color:blue\"***REMOVED***an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\"***REMOVED***click here</em***REMOVED***\n" +
              "snippet</p***REMOVED***");
     ***REMOVED***);

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getInnerHtml()).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     ***REMOVED***);

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)"***REMOVED***text</b***REMOVED***');
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('new <b***REMOVED***text</b***REMOVED***');
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(
         'new <b onclick="alert(1)"***REMOVED***text</b***REMOVED***');
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     ***REMOVED***);
   </file***REMOVED***
   </example***REMOVED***
 */
function $SanitizeProvider() {
  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
    return function(html) {
      var buf = [];
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
        return !/^unsafe/.test($$sanitizeUri(uri, isImage));
***REMOVED***));
      return buf.join('');
    ***REMOVED***;
  ***REMOVED***];
***REMOVED***

function sanitizeText(chars) {
  var buf = [];
  var writer = htmlSanitizeWriter(buf, angular.noop);
  writer.chars(chars);
  return buf.join('');
***REMOVED***


// Regular Expressions for parsing tags and attributes
var START_TAG_REGEXP =
       /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^***REMOVED***\s]+))?)*)\s*(\/?)\s*(***REMOVED***?)/,
  END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^***REMOVED***]****REMOVED***/,
  ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^***REMOVED***\s]+)))?/g,
  BEGIN_TAG_REGEXP = /^</,
  BEGING_END_TAGE_REGEXP = /^<\//,
  COMMENT_REGEXP = /<!--(.*?)--***REMOVED***/g,
  DOCTYPE_REGEXP = /<!DOCTYPE([^***REMOVED***]*?)***REMOVED***/i,
  CDATA_REGEXP = /<!\[CDATA\[(.*?)]]***REMOVED***/g,
  SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  // Match everything outside of normal chars and " (quote character)
  NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;


// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements

// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
var voidElements = makeMap("area,br,col,hr,img,wbr");

// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    optionalEndTagInlineElements = makeMap("rp,rt"),
    optionalEndTagElements = angular.extend({***REMOVED***,
                                            optionalEndTagInlineElements,
                                            optionalEndTagBlockElements);

// Safe Block Elements - HTML5
var blockElements = angular.extend({***REMOVED***, optionalEndTagBlockElements, makeMap("address,article," +
        "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
        "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));

// Inline Elements - HTML5
var inlineElements = angular.extend({***REMOVED***, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," +
        "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
        "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));

// SVG Elements
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
var svgElements = makeMap("animate,animateColor,animateMotion,animateTransform,circle,defs," +
        "desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient," +
        "line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set," +
        "stop,svg,switch,text,title,tspan,use");

// Special Elements (can contain anything)
var specialElements = makeMap("script,style");

var validElements = angular.extend({***REMOVED***,
                                   voidElements,
                                   blockElements,
                                   inlineElements,
                                   optionalEndTagElements,
                                   svgElements);

//Attributes that have href and hence need to be sanitized
var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href");

var htmlAttrs = makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
    'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
    'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
    'scope,scrolling,shape,size,span,start,summary,target,title,type,' +
    'valign,value,vspace,width');

// SVG attributes (without "id" and "name" attributes)
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
var svgAttrs = makeMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
    'attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,' +
    'color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,' +
    'font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,' +
    'gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,' +
    'keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,' +
    'markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,' +
    'overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,' +
    'repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,' +
    'stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,' +
    'stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,' +
    'stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,' +
    'underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,' +
    'viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,' +
    'xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,' +
    'zoomAndPan');

var validAttrs = angular.extend({***REMOVED***,
                                uriAttrs,
                                svgAttrs,
                                htmlAttrs);

function makeMap(str) {
  var obj = {***REMOVED***, items = str.split(','), i;
  for (i = 0; i < items.length; i++) obj[items[i]] = true;
  return obj;
***REMOVED***


/**
 * @example
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {***REMOVED***,
 *     end: function(tag) {***REMOVED***,
 *     chars: function(text) {***REMOVED***,
 *     comment: function(text) {***REMOVED***
 * ***REMOVED***);
 *
 * @param {string***REMOVED*** html string
 * @param {object***REMOVED*** handler
 */
function htmlParser(html, handler) {
  if (typeof html !== 'string') {
    if (html === null || typeof html === 'undefined') {
      html = '';
    ***REMOVED*** else {
      html = '' + html;
    ***REMOVED***
  ***REMOVED***
  var index, chars, match, stack = [], last = html, text;
  stack.last = function() { return stack[ stack.length - 1 ]; ***REMOVED***;

  while (html) {
    text = '';
    chars = true;

    // Make sure we're not in a script or style element
    if (!stack.last() || !specialElements[ stack.last() ]) {

      // Comment
      if (html.indexOf("<!--") === 0) {
        // comments containing -- are not allowed unless they terminate the comment
        index = html.indexOf("--", 4);

        if (index ***REMOVED***= 0 && html.lastIndexOf("--***REMOVED***", index) === index) {
          if (handler.comment) handler.comment(html.substring(4, index));
          html = html.substring(index + 3);
          chars = false;
  ***REMOVED***
      // DOCTYPE
***REMOVED*** else if (DOCTYPE_REGEXP.test(html)) {
        match = html.match(DOCTYPE_REGEXP);

        if (match) {
          html = html.replace(match[0], '');
          chars = false;
  ***REMOVED***
      // end tag
***REMOVED*** else if (BEGING_END_TAGE_REGEXP.test(html)) {
        match = html.match(END_TAG_REGEXP);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(END_TAG_REGEXP, parseEndTag);
          chars = false;
  ***REMOVED***

      // start tag
***REMOVED*** else if (BEGIN_TAG_REGEXP.test(html)) {
        match = html.match(START_TAG_REGEXP);

        if (match) {
          // We only have a valid start-tag if there is a '***REMOVED***'.
          if (match[4]) {
            html = html.substring(match[0].length);
            match[0].replace(START_TAG_REGEXP, parseStartTag);
    ***REMOVED***
          chars = false;
  ***REMOVED*** else {
          // no ending tag found --- this piece should be encoded as an entity.
          text += '<';
          html = html.substring(1);
  ***REMOVED***
***REMOVED***

      if (chars) {
        index = html.indexOf("<");

        text += index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);

        if (handler.chars) handler.chars(decodeEntities(text));
***REMOVED***

    ***REMOVED*** else {
      html = html.replace(new RegExp("(.*)<\\s*\\/\\s*" + stack.last() + "[^***REMOVED***]****REMOVED***", 'i'),
        function(all, text) {
          text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");

          if (handler.chars) handler.chars(decodeEntities(text));

          return "";
***REMOVED***);

      parseEndTag("", stack.last());
    ***REMOVED***

    if (html == last) {
      throw $sanitizeMinErr('badparse', "The sanitizer was unable to parse the following block " +
                                        "of html: {0***REMOVED***", html);
    ***REMOVED***
    last = html;
  ***REMOVED***

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = angular.lowercase(tagName);
    if (blockElements[ tagName ]) {
      while (stack.last() && inlineElements[ stack.last() ]) {
        parseEndTag("", stack.last());
***REMOVED***
    ***REMOVED***

    if (optionalEndTagElements[ tagName ] && stack.last() == tagName) {
      parseEndTag("", tagName);
    ***REMOVED***

    unary = voidElements[ tagName ] || !!unary;

    if (!unary)
      stack.push(tagName);

    var attrs = {***REMOVED***;

    rest.replace(ATTR_REGEXP,
      function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue
          || singleQuotedValue
          || unquotedValue
          || '';

        attrs[name] = decodeEntities(value);
    ***REMOVED***);
    if (handler.start) handler.start(tagName, attrs, unary);
  ***REMOVED***

  function parseEndTag(tag, tagName) {
    var pos = 0, i;
    tagName = angular.lowercase(tagName);
    if (tagName)
      // Find the closest opened tag of the same type
      for (pos = stack.length - 1; pos ***REMOVED***= 0; pos--)
        if (stack[ pos ] == tagName)
          break;

    if (pos ***REMOVED***= 0) {
      // Close all the open elements, up the stack
      for (i = stack.length - 1; i ***REMOVED***= pos; i--)
        if (handler.end) handler.end(stack[ i ]);

      // Remove the open elements from the stack
      stack.length = pos;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

var hiddenPre=document.createElement("pre");
var spaceRe = /^(\s*)([\s\S]*?)(\s*)$/;
/**
 * decodes all entities into regular string
 * @param value
 * @returns {string***REMOVED*** A string with decoded entities.
 */
function decodeEntities(value) {
  if (!value) { return ''; ***REMOVED***

  // Note: IE8 does not preserve spaces at the start/end of innerHTML
  // so we must capture them and reattach them afterward
  var parts = spaceRe.exec(value);
  var spaceBefore = parts[1];
  var spaceAfter = parts[3];
  var content = parts[2];
  if (content) {
    hiddenPre.innerHTML=content.replace(/</g,"&lt;");
    // innerText depends on styling as it doesn't display hidden elements.
    // Therefore, it's better to use textContent not to cause unnecessary
    // reflows. However, IE<9 don't support textContent so the innerText
    // fallback is necessary.
    content = 'textContent' in hiddenPre ?
      hiddenPre.textContent : hiddenPre.innerText;
  ***REMOVED***
  return spaceBefore + content + spaceAfter;
***REMOVED***

/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param value
 * @returns {string***REMOVED*** escaped text
 */
function encodeEntities(value) {
  return value.
    replace(/&/g, '&amp;').
    replace(SURROGATE_PAIR_REGEXP, function(value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    ***REMOVED***).
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {
      return '&#' + value.charCodeAt(0) + ';';
    ***REMOVED***).
    replace(/</g, '&lt;').
    replace(/***REMOVED***/g, '&gt;');
***REMOVED***

/**
 * create an HTML/XML writer which writes to buffer
 * @param {Array***REMOVED*** buf use buf.jain('') to get out sanitized html string
 * @returns {object***REMOVED*** in the form of {
 *     start: function(tag, attrs, unary) {***REMOVED***,
 *     end: function(tag) {***REMOVED***,
 *     chars: function(text) {***REMOVED***,
 *     comment: function(text) {***REMOVED***
 * ***REMOVED***
 */
function htmlSanitizeWriter(buf, uriValidator) {
  var ignore = false;
  var out = angular.bind(buf, buf.push);
  return {
    start: function(tag, attrs, unary) {
      tag = angular.lowercase(tag);
      if (!ignore && specialElements[tag]) {
        ignore = tag;
***REMOVED***
      if (!ignore && validElements[tag] === true) {
        out('<');
        out(tag);
        angular.forEach(attrs, function(value, key) {
          var lkey=angular.lowercase(key);
          var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
          if (validAttrs[lkey] === true &&
            (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
            out(' ');
            out(key);
            out('="');
            out(encodeEntities(value));
            out('"');
    ***REMOVED***
  ***REMOVED***);
        out(unary ? '/***REMOVED***' : '***REMOVED***');
***REMOVED***
    ***REMOVED***,
    end: function(tag) {
        tag = angular.lowercase(tag);
        if (!ignore && validElements[tag] === true) {
          out('</');
          out(tag);
          out('***REMOVED***');
  ***REMOVED***
        if (tag == ignore) {
          ignore = false;
  ***REMOVED***
***REMOVED***,
    chars: function(chars) {
        if (!ignore) {
          out(encodeEntities(chars));
  ***REMOVED***
***REMOVED***
  ***REMOVED***;
***REMOVED***


// define ngSanitize module and register $sanitize service
angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);

/* global sanitizeText: false */

/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports http/https/ftp/mailto and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`***REMOVED*** module to be installed.
 *
 * @param {string***REMOVED*** text Input text.
 * @param {string***REMOVED*** target Window (_blank|_self|_parent|_top) or named frame to open links in.
 * @returns {string***REMOVED*** Html-linkified text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"***REMOVED***</span***REMOVED***
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js"***REMOVED***
     <file name="index.html"***REMOVED***
       <script***REMOVED***
         angular.module('linkyExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.snippet =
               'Pretty text with some links:\n'+
               'http://angularjs.org/,\n'+
               'mailto:us@somewhere.org,\n'+
               'another@somewhere.org,\n'+
               'and one more: ftp://127.0.0.1/.';
             $scope.snippetWithTarget = 'http://angularjs.org/';
     ***REMOVED***]);
       </script***REMOVED***
       <div ng-controller="ExampleController"***REMOVED***
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"***REMOVED***</textarea***REMOVED***
       <table***REMOVED***
         <tr***REMOVED***
           <td***REMOVED***Filter</td***REMOVED***
           <td***REMOVED***Source</td***REMOVED***
           <td***REMOVED***Rendered</td***REMOVED***
         </tr***REMOVED***
         <tr id="linky-filter"***REMOVED***
           <td***REMOVED***linky filter</td***REMOVED***
           <td***REMOVED***
             <pre***REMOVED***&lt;div ng-bind-html="snippet | linky"&gt;<br***REMOVED***&lt;/div&gt;</pre***REMOVED***
           </td***REMOVED***
           <td***REMOVED***
             <div ng-bind-html="snippet | linky"***REMOVED***</div***REMOVED***
           </td***REMOVED***
         </tr***REMOVED***
         <tr id="linky-target"***REMOVED***
          <td***REMOVED***linky target</td***REMOVED***
          <td***REMOVED***
            <pre***REMOVED***&lt;div ng-bind-html="snippetWithTarget | linky:'_blank'"&gt;<br***REMOVED***&lt;/div&gt;</pre***REMOVED***
          </td***REMOVED***
          <td***REMOVED***
            <div ng-bind-html="snippetWithTarget | linky:'_blank'"***REMOVED***</div***REMOVED***
          </td***REMOVED***
         </tr***REMOVED***
         <tr id="escaped-html"***REMOVED***
           <td***REMOVED***no filter</td***REMOVED***
           <td***REMOVED***<pre***REMOVED***&lt;div ng-bind="snippet"&gt;<br***REMOVED***&lt;/div&gt;</pre***REMOVED***</td***REMOVED***
           <td***REMOVED***<div ng-bind="snippet"***REMOVED***</div***REMOVED***</td***REMOVED***
         </tr***REMOVED***
       </table***REMOVED***
     </file***REMOVED***
     <file name="protractor.js" type="protractor"***REMOVED***
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
 ***REMOVED***);

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
 ***REMOVED***);

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
 ***REMOVED***);

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithTarget | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
 ***REMOVED***);
     </file***REMOVED***
   </example***REMOVED***
 */
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
  var LINKY_URL_REGEXP =
        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){***REMOVED***<***REMOVED***"”’]/,
      MAILTO_REGEXP = /^mailto:/;

  return function(text, target) {
    if (!text) return text;
    var match;
    var raw = text;
    var html = [];
    var url;
    var i;
    while ((match = raw.match(LINKY_URL_REGEXP))) {
      // We can not end in these as they are sometimes found at the end of the sentence
      url = match[0];
      // if we did not match ftp/http/www/mailto then assume mailto
      if (!match[2] && !match[4]) {
        url = (match[3] ? 'http://' : 'mailto:') + url;
***REMOVED***
      i = match.index;
      addText(raw.substr(0, i));
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
      raw = raw.substring(i + match[0].length);
    ***REMOVED***
    addText(raw);
    return $sanitize(html.join(''));

    function addText(text) {
      if (!text) {
        return;
***REMOVED***
      html.push(sanitizeText(text));
    ***REMOVED***

    function addLink(url, text) {
      html.push('<a ');
      if (angular.isDefined(target)) {
        html.push('target="',
                  target,
                  '" ');
***REMOVED***
      html.push('href="',
                url.replace(/"/g, '&quot;'),
                '"***REMOVED***');
      addText(text);
      html.push('</a***REMOVED***');
    ***REMOVED***
  ***REMOVED***;
***REMOVED***]);


***REMOVED***)(window, window.angular);
