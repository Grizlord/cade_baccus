/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
/*
 * jQuery EasyTabs plugin 2.2.2
 *
 * Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Sat Apr 05 18:00:00 2011 -0500
 */
(function(b){function a(f,c,e){var d=b.Event(c);f.trigger(d,e);return d.result!==false}b.fn.easyTabs=function(){b.error("easyTabs() is no longer used. Now use easytabs() -- no capitalization.")};b.fn.easytabs=function(d){var c=arguments;return this.each(function(){var f=b(this),e=f.data("easytabs");if(!e){b.fn.easytabs.methods.init.apply(f,[d]);b.fn.easytabs.methods.initHashChange.apply(f);b.fn.easytabs.methods.initCycle.apply(f)}if(b.fn.easytabs.publicMethods[d]){return b.fn.easytabs.publicMethods[d].apply(f,Array.prototype.slice.call(c,1))}})};b.fn.easytabs.defaults={animate:true,panelActiveClass:"active",tabActiveClass:"active",defaultTab:"li:first-child",animationSpeed:"normal",tabs:"> ul > li",updateHash:true,cycle:false,collapsible:false,collapsedClass:"collapsed",collapsedByDefault:true,uiTabs:false,transitionIn:"fadeIn",transitionOut:"fadeOut",transitionCollapse:"slideUp",transitionUncollapse:"slideDown"};b.fn.easytabs.methods={init:function(d){var i=this,h,c,g=b(),f,j,e={fast:200,normal:400,slow:600};if(d&&d.uiTabs){i.addClass("ui-tabs");b.extend(b.fn.easytabs.defaults,{tabActiveClass:"ui-tabs-selected"})}if(d&&d.collapsible&&d.defaultTab){b.fn.easytabs.defaults.collapsedByDefault=false}h=b.extend({},b.fn.easytabs.defaults,d);if(typeof(h.animationSpeed)=="string"){h.animationSpeed=e[h.animationSpeed]}c=i.find(h.tabs);c.each(function(){targetId=b(this).children("a").attr("href").match(/#([^\?]+)/)[0].substr(1);$matchingPanel=i.find("div[id="+targetId+"]");if($matchingPanel.size()>0){$matchingPanel.data("easytabs",{position:$matchingPanel.css("position"),visibility:$matchingPanel.css("visibility")});g=g.add($matchingPanel.hide())}else{c=c.not(b(this))}});b("a.anchor").remove().prependTo("body");i.data("easytabs",{opts:h,skipUpdateToHash:false,tabs:c,panels:g});b.fn.easytabs.methods.setDefaultTab.apply(i);c.children("a").bind("click.easytabs",function(k){i.data("easytabs").opts.cycle=false;i.data("easytabs").skipUpdateToHash=false;$clicked=b(this);b.fn.easytabs.methods.selectTab.apply($clicked,[i]);k.preventDefault()})},loadFromData:function(){return this.data("easytabs")},setDefaultTab:function(){var k=this,h=b.fn.easytabs.methods.loadFromData.apply(k),c=h.opts,j=h.tabs,d=h.panels,g=window.location.hash.match(/^[^\?]*/)[0],i=j.find("a[href='"+g+"']").parent(),e,f;if(i.size()==1){e=i;k.data("easytabs").opts.cycle=false}else{e=j.parent().find(c.defaultTab);if(e.size()==0){b.error("The specified default tab ('"+c.defaultTab+"') could not be found in the tab set.")}}f=e.children("a").first();k.data("easytabs").defaultTab=e;k.data("easytabs").defaultTabLink=f;if(c.collapsible&&i.size()==0&&c.collapsedByDefault){e.addClass(c.collapsedClass).children().addClass(c.collapsedClass)}else{d.filter("#"+f.attr("href").match(/#([^\?]+)/)[0].substr(1)).show().addClass(c.panelActiveClass);e.addClass(c.tabActiveClass).children().addClass(c.tabActiveClass)}},getHeightForHidden:function(){if(this.data("easytabs")&&this.data("easytabs").lastHeight){return this.data("easytabs").lastHeight}var d=this.css("display"),c=this.wrap(b("<div>",{position:"absolute",visibility:"hidden",overflow:"hidden"})).css({position:"relative",visibility:"hidden",display:"block"}).outerHeight();this.unwrap();this.css({position:this.data("easytabs").position,visibility:this.data("easytabs").visibility,display:d});b.extend(this.data("easytabs"),{lastHeight:c});return c},setAndReturnHeight:function(){var c=this.outerHeight(),d={lastHeight:c};if(this.data("easytabs")){b.extend(this.data("easytabs"),d)}else{this.data("easytabs",d)}return c},selectTab:function(q,i){var r=this,h=window.location,e=h.hash.match(/^[^\?]*/)[0],u=b.fn.easytabs.methods.loadFromData.apply(q),n=u.opts,g=u.skipUpdateToHash,d=u.tabs,k=u.panels,f=k.filter(r.attr("href").match(/#([^\?]+)/)[0]),p=u.defaultTabLink,t=(n.animate)?{show:n.transitionIn,hide:n.transitionOut,speed:n.animationSpeed,collapse:n.transitionCollapse,uncollapse:n.transitionUncollapse,halfSpeed:n.animationSpeed/2}:{show:"show",hide:"hide",speed:0,collapse:"hide",uncollapse:"show",halfSpeed:0};if(n.collapsible&&!g&&(r.hasClass(n.tabActiveClass)||r.hasClass(n.collapsedClass))){k.stop(true,true);if(a(q,"easytabs:before",[r,f,u])){d.filter("."+n.tabActiveClass).removeClass(n.tabActiveClass).children().removeClass(n.tabActiveClass);if(r.hasClass(n.collapsedClass)){r.parent().removeClass(n.collapsedClass).addClass(n.tabActiveClass).children().removeClass(n.collapsedClass).addClass(n.tabActiveClass);f.addClass(n.panelActiveClass)[t.uncollapse](t.speed,function(){q.trigger("easytabs:midTransition",[r,f,u]);if(typeof i=="function"){i()}})}else{r.parent().addClass(n.collapsedClass).children().addClass(n.collapsedClass);f.removeClass(n.panelActiveClass)[t.collapse](t.speed,function(){q.trigger("easytabs:midTransition",[r,f,u]);if(typeof i=="function"){i()}})}}}else{if(!r.hasClass(n.tabActiveClass)||!f.hasClass(n.panelActiveClass)){k.stop(true,true);if(a(q,"easytabs:before",[r,f,u])){var l=k.filter(":visible"),o=f.parent(),j=b.fn.easytabs.methods.getHeightForHidden.apply(f),m=l.length?b.fn.easytabs.methods.setAndReturnHeight.apply(l):0,c=j-m,s=function(){q.trigger("easytabs:midTransition",[r,f,u]);if(n.animate&&n.transitionIn=="fadeIn"&&c<0){o.animate({height:o.height()+c},t.halfSpeed).css({"min-height":""})}if(n.updateHash&&!g){window.location.hash=r.attr("href")}else{q.data("easytabs").skipUpdateToHash=false}f[t.show](t.speed,function(){q.data("easytabs").tabs=d;q.data("easytabs").panels=k;o.css({height:"","min-height":""});q.trigger("easytabs:after",[r,f,u]);if(typeof i=="function"){i()}})};if(n.animate&&n.transitionOut=="fadeOut"){if(c>0){o.animate({height:(o.height()+c)},t.halfSpeed)}else{o.css({"min-height":o.height()})}}d.filter("."+n.tabActiveClass).removeClass(n.tabActiveClass).children().removeClass(n.tabActiveClass);d.filter("."+n.collapsedClass).removeClass(n.collapsedClass).children().removeClass(n.collapsedClass);r.parent().addClass(n.tabActiveClass).children().addClass(n.tabActiveClass);k.filter("."+n.panelActiveClass).removeClass(n.panelActiveClass);f.addClass(n.panelActiveClass);if(l.size()>0){l[t.hide](t.speed,s)}else{f[t.uncollapse](t.speed,s)}}}}},selectTabFromHashChange:function(){var i=this,g=b.fn.easytabs.methods.loadFromData.apply(i),e=g.opts,c=g.tabs,d=g.defaultTab,j=g.defaultTabLink,h=window.location.hash.match(/^[^\?]*/)[0],f=c.find("a[href='"+h+"']");if(e.updateHash){if(f.size()>0){i.data("easytabs").skipUpdateToHash=true;b.fn.easytabs.methods.selectTab.apply(f,[i])}else{if(h==""&&!d.hasClass(e.tabActiveClass)&&!e.cycle){i.data("easytabs").skipUpdateToHash=true;b.fn.easytabs.methods.selectTab.apply(j,[i])}}}},cycleTabs:function(d){var g=this,f=b.fn.easytabs.methods.loadFromData.apply(g),e=f.opts,c=f.tabs;if(e.cycle){d=d%c.size();$tab=b(c[d]).children("a").first();g.data("easytabs").skipUpdateToHash=true;b.fn.easytabs.methods.selectTab.apply($tab,[g,function(){setTimeout(function(){b.fn.easytabs.methods.cycleTabs.apply(g,[d+1])},e.cycle)}])}},initHashChange:function(){var c=this;if(typeof b(window).hashchange=="function"){b(window).hashchange(function(){b.fn.easytabs.methods.selectTabFromHashChange.apply(c)})}else{if(b.address&&typeof b.address.change=="function"){b.address.change(function(){b.fn.easytabs.methods.selectTabFromHashChange.apply(c)})}}},initCycle:function(){var h=this,g=b.fn.easytabs.methods.loadFromData.apply(h),f=g.opts,d=g.tabs,e=g.defaultTab,c;if(f.cycle){c=d.index(e);setTimeout(function(){b.fn.easytabs.methods.cycleTabs.apply(h,[c+1])},f.cycle)}}};b.fn.easytabs.publicMethods={select:function(d){var g=this,f=b.fn.easytabs.methods.loadFromData.apply(g),c=f.tabs,e;if((e=c.filter(d)).size()==0){if((e=c.find("a[href='"+d+"']")).size()==0){if((e=c.find("a"+d)).size()==0){b.error("Tab '"+d+"' does not exist in tab set")}}}else{e=e.children("a").first()}b.fn.easytabs.methods.selectTab.apply(e,[g])}}})(jQuery);
/** @license

 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20110424
*/
(function(Y){function M(M,X){function i(c){return function(a){return!this._t||!this._t._a?null:c.call(this,a)}}function pa(){if(c.debugURLParam.test(N))c.debugMode=!0}this.flashVersion=8;this.debugFlash=this.debugMode=!1;this.useConsole=!0;this.waitForWindowLoad=this.consoleOnly=!1;this.nullURL="about:blank";this.allowPolling=!0;this.useFastPolling=!1;this.useMovieStar=!0;this.bgColor="#ffffff";this.useHighPerformance=!1;this.flashPollingInterval=null;this.flashLoadTimeout=1E3;this.wmode=null;this.allowScriptAccess=
"always";this.useHTML5Audio=this.useFlashBlock=!1;this.html5Test=/^probably$/i;this.useGlobalHTML5Audio=!0;this.requireFlash=!1;this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!0},ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave",
"audio/x-wav"],required:!1}};this.defaultOptions={autoLoad:!1,stream:!0,autoPlay:!1,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onstop:null,onfailure:null,onfinish:null,onbeforefinish:null,onbeforefinishtime:5E3,onbeforefinishcomplete:null,onjustbeforefinish:null,onjustbeforefinishtime:200,multiShot:!0,multiShotEvents:!1,position:null,pan:0,type:null,usePolicyFile:!1,volume:100};this.flash9Options={isMovieStar:null,usePeakData:!1,useWaveformData:!1,
useEQData:!1,onbufferchange:null,ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.version=null;this.versionNumber="V2.97a.20110424";this.movieURL=null;this.url=M||null;this.altURL=null;this.enabled=this.swfLoaded=!1;this.o=null;this.movieID="sm2-container";this.id=X||"sm2movie";this.swfCSS={swfBox:"sm2-object-box",swfDefault:"movieContainer",swfError:"swf_error",swfTimedout:"swf_timedout",swfLoaded:"swf_loaded",swfUnblocked:"swf_unblocked",sm2Debug:"sm2_debug",
highPerf:"high_performance",flashDebug:"flash_debug"};this.oMC=null;this.sounds={};this.soundIDs=[];this.muted=!1;this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.didFlashBlock=this.specialWmodeCase=!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.baseMimeTypes=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.netStreamMimeTypes=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.netStreamTypes=["aac","flv","mov","mp4","m4v",
"f4v","m4a","mp4v","3gp","3g2"];this.netStreamPattern=RegExp("\\.("+this.netStreamTypes.join("|")+")(\\?.*)?$","i");this.mimePattern=this.baseMimeTypes;this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={};this.hasHTML5=null;this.html5={usingFlash:null};this.ignoreFlash=!1;var Z,c=this,y,n=navigator.userAgent,h=Y,N=h.location.href.toString(),k=this.flashVersion,g=document,$,O,r=[],E=!1,F=!1,m=!1,t=!1,qa=!1,G,o,aa,u,z,ba,P,ra,ca,v,sa,H,A,da,ea,Q,fa,ta,ua,R,
va,I=null,ga=null,w,ha,B,S,T,ia,j,U=!1,ja=!1,wa,xa,x=null,ya,V,p=!1,J,s,ka,za,l,Da=Array.prototype.slice,K=!1,la,C,Aa,Ba=n.match(/pre\//i),Ea=n.match(/(ipad|iphone|ipod)/i);n.match(/mobile/i);var q=n.match(/msie/i),Fa=n.match(/webkit/i),L=n.match(/safari/i)&&!n.match(/chrome/i),Ga=n.match(/opera/i),ma=!N.match(/usehtml5audio/i)&&!N.match(/sm2\-ignorebadua/i)&&L&&n.match(/OS X 10_6_([3-9])/i),na=typeof g.hasFocus!=="undefined"?g.hasFocus():null,D=typeof g.hasFocus==="undefined"&&L,Ca=!D;this._use_maybe=
N.match(/sm2\-useHTML5Maybe\=1/i);this._overHTTP=g.location?g.location.protocol.match(/http/i):null;this._http=!this._overHTTP?"http:":"";this.useAltURL=!this._overHTTP;this._global_a=null;if(Ea||Ba)c.useHTML5Audio=!0,c.ignoreFlash=!0,c.useGlobalHTML5Audio&&(K=!0);if(Ba||this._use_maybe)c.html5Test=/^(probably|maybe)$/i;this.supported=this.ok=function(){return x?m&&!t:c.useHTML5Audio&&c.hasHTML5};this.getMovie=function(c){return q?h[c]:L?y(c)||g[c]:y(c)};this.createSound=function(b){function a(){e=
S(e);c.sounds[d.id]=new Z(d);c.soundIDs.push(d.id);return c.sounds[d.id]}var e=null,f=null,d=null;if(!m||!c.ok())return ia("soundManager.createSound(): "+w(!m?"notReady":"notOK")),!1;arguments.length===2&&(b={id:arguments[0],url:arguments[1]});d=e=o(b);if(j(d.id,!0))return c.sounds[d.id];if(V(d))f=a(),f._setup_html5(d);else{if(k>8&&c.useMovieStar){if(d.isMovieStar===null)d.isMovieStar=d.serverURL||d.type&&d.type.match(c.netStreamPattern)||d.url.match(c.netStreamPattern)?!0:!1;if(d.isMovieStar&&d.usePeakData)d.usePeakData=
!1}d=T(d,"soundManager.createSound(): ");f=a();if(k===8)c.o._createSound(d.id,d.onjustbeforefinishtime,d.loops||1,d.usePolicyFile);else if(c.o._createSound(d.id,d.url,d.onjustbeforefinishtime,d.usePeakData,d.useWaveformData,d.useEQData,d.isMovieStar,d.isMovieStar?d.bufferTime:!1,d.loops||1,d.serverURL,d.duration||null,d.autoPlay,!0,d.autoLoad,d.usePolicyFile),!d.serverURL)f.connected=!0,d.onconnect&&d.onconnect.apply(f);(d.autoLoad||d.autoPlay)&&!d.serverURL&&f.load(d)}d.autoPlay&&!d.serverURL&&f.play();
return f};this.destroySound=function(b,a){if(!j(b))return!1;var e=c.sounds[b],f;e._iO={};e.stop();e.unload();for(f=0;f<c.soundIDs.length;f++)if(c.soundIDs[f]===b){c.soundIDs.splice(f,1);break}a||e.destruct(!0);delete c.sounds[b];return!0};this.load=function(b,a){if(!j(b))return!1;return c.sounds[b].load(a)};this.unload=function(b){if(!j(b))return!1;return c.sounds[b].unload()};this.start=this.play=function(b,a){if(!m||!c.ok())return ia("soundManager.play(): "+w(!m?"notReady":"notOK")),!1;if(!j(b))return a instanceof
Object||(a={url:a}),a&&a.url?(a.id=b,c.createSound(a).play()):!1;return c.sounds[b].play(a)};this.setPosition=function(b,a){if(!j(b))return!1;return c.sounds[b].setPosition(a)};this.stop=function(b){if(!j(b))return!1;return c.sounds[b].stop()};this.stopAll=function(){for(var b in c.sounds)c.sounds[b]instanceof Z&&c.sounds[b].stop()};this.pause=function(b){if(!j(b))return!1;return c.sounds[b].pause()};this.pauseAll=function(){for(var b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].pause()};this.resume=
function(b){if(!j(b))return!1;return c.sounds[b].resume()};this.resumeAll=function(){for(var b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){if(!j(b))return!1;return c.sounds[b].togglePause()};this.setPan=function(b,a){if(!j(b))return!1;return c.sounds[b].setPan(a)};this.setVolume=function(b,a){if(!j(b))return!1;return c.sounds[b].setVolume(a)};this.mute=function(b){var a=0;typeof b!=="string"&&(b=null);if(b){if(!j(b))return!1;return c.sounds[b].mute()}else{for(a=
c.soundIDs.length;a--;)c.sounds[c.soundIDs[a]].mute();c.muted=!0}return!0};this.muteAll=function(){c.mute()};this.unmute=function(b){typeof b!=="string"&&(b=null);if(b){if(!j(b))return!1;return c.sounds[b].unmute()}else{for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].unmute();c.muted=!1}return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){if(!j(b))return!1;return c.sounds[b].toggleMute()};this.getMemoryUse=function(){if(k===8)return 0;if(c.o)return parseInt(c.o._getMemoryUse(),
10)};this.disable=function(b){typeof b==="undefined"&&(b=!1);if(t)return!1;t=!0;for(var a=c.soundIDs.length;a--;)ua(c.sounds[c.soundIDs[a]]);G(b);l.remove(h,"load",z);return!0};this.canPlayMIME=function(b){var a;c.hasHTML5&&(a=J({type:b}));return!x||a?a:b?b.match(c.mimePattern)?!0:!1:null};this.canPlayURL=function(b){var a;c.hasHTML5&&(a=J(b));return!x||a?a:b?b.match(c.filePattern)?!0:!1:null};this.canPlayLink=function(b){if(typeof b.type!=="undefined"&&b.type&&c.canPlayMIME(b.type))return!0;return c.canPlayURL(b.href)};
this.getSoundById=function(b){if(!b)throw Error("soundManager.getSoundById(): sID is null/undefined");return c.sounds[b]};this.onready=function(c,a){if(c&&c instanceof Function)return a||(a=h),aa("onready",c,a),u(),!0;else throw w("needFunction","onready");};this.ontimeout=function(c,a){if(c&&c instanceof Function)return a||(a=h),aa("ontimeout",c,a),u({type:"ontimeout"}),!0;else throw w("needFunction","ontimeout");};this.getMoviePercent=function(){return c.o&&typeof c.o.PercentLoaded!=="undefined"?
c.o.PercentLoaded():null};this._wD=this._writeDebug=function(){return!0};this._debug=function(){};this.reboot=function(){var b,a;for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].destruct();try{if(q)ga=c.o.innerHTML;I=c.o.parentNode.removeChild(c.o)}catch(e){}ga=I=null;c.enabled=m=U=ja=E=F=t=c.swfLoaded=!1;c.soundIDs=c.sounds=[];c.o=null;for(b in r)if(r.hasOwnProperty(b))for(a=r[b].length;a--;)r[b][a].fired=!1;h.setTimeout(function(){c.beginDelayedInit()},20)};this.destruct=function(){c.disable(!0)};
this.beginDelayedInit=function(){qa=!0;A();setTimeout(sa,20);P()};this._html5_events={abort:i(function(){}),canplay:i(function(){this._t._onbufferchange(0);var c=!isNaN(this._t.position)?this._t.position/1E3:null;this._t._html5_canplay=!0;if(this._t.position&&this.currentTime!==c)try{this.currentTime=c}catch(a){}}),load:i(function(){this._t.loaded||(this._t._onbufferchange(0),this._t._whileloading(this._t.bytesTotal,this._t.bytesTotal,this._t._get_html5_duration()),this._t._onload(!0))}),emptied:i(function(){}),
ended:i(function(){this._t._onfinish()}),error:i(function(){this._t._onload(!1)}),loadeddata:i(function(){}),loadedmetadata:i(function(){}),loadstart:i(function(){this._t._onbufferchange(1)}),play:i(function(){this._t._onbufferchange(0)}),playing:i(function(){this._t._onbufferchange(0)}),progress:i(function(b){if(this._t.loaded)return!1;var a,e=0,f=b.type==="progress",d=b.target.buffered;a=b.loaded||0;var oa=b.total||1;if(d&&d.length){for(a=d.length;a--;)e=d.end(a)-d.start(a);a=e/b.target.duration;
f&&isNaN(a)}isNaN(a)||(this._t._onbufferchange(0),this._t._whileloading(a,oa,this._t._get_html5_duration()),a&&oa&&a===oa&&c._html5_events.load.call(this,b))}),ratechange:i(function(){}),suspend:i(function(b){c._html5_events.progress.call(this,b)}),stalled:i(function(){}),timeupdate:i(function(){this._t._onTimer()}),waiting:i(function(){this._t._onbufferchange(1)})};Z=function(b){var a=this,e,f,d;this.sID=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=o(b);this.pan=this.options.pan;
this.volume=this.options.volume;this._lastURL=null;this.isHTML5=!1;this._a=null;this.id3={};this._debug=function(){};this._debug();this.load=function(b){var d=null;if(typeof b!=="undefined")a._iO=o(b,a.options),a.instanceOptions=a._iO;else if(b=a.options,a._iO=b,a.instanceOptions=a._iO,a._lastURL&&a._lastURL!==a.url)a._iO.url=a.url,a.url=null;if(!a._iO.url)a._iO.url=a.url;if(a._iO.url===a.url&&a.readyState!==0&&a.readyState!==2)return a;a._lastURL=a.url;a.loaded=!1;a.readyState=1;a.playState=0;if(V(a._iO)){if(d=
a._setup_html5(a._iO),!d._called_load)d.load(),d._called_load=!0,a._iO.autoPlay&&a.play()}else try{a.isHTML5=!1,a._iO=T(S(a._iO)),k===8?c.o._load(a.sID,a._iO.url,a._iO.stream,a._iO.autoPlay,a._iO.whileloading?1:0,a._iO.loops||1,a._iO.usePolicyFile):c.o._load(a.sID,a._iO.url,a._iO.stream?!0:!1,a._iO.autoPlay?!0:!1,a._iO.loops||1,a._iO.autoLoad?!0:!1,a._iO.usePolicyFile)}catch(e){fa()}return a};this.unload=function(){if(a.readyState!==0){if(a.isHTML5){if(f(),a._a)a._a.pause(),a._a.src=""}else k===8?
c.o._unload(a.sID,c.nullURL):c.o._unload(a.sID);e()}return a};this.destruct=function(b){if(a.isHTML5){if(f(),a._a)a._a.pause(),a._a.src="",K||a._remove_html5_events()}else a._iO.onfailure=null,c.o._destroySound(a.sID);b||c.destroySound(a.sID,!0)};this.start=this.play=function(b,W){var e,W=W===void 0?!0:W;b||(b={});a._iO=o(b,a._iO);a._iO=o(a._iO,a.options);a.instanceOptions=a._iO;if(a._iO.serverURL&&!a.connected)return a.getAutoPlay()||a.setAutoPlay(!0),a;V(a._iO)&&(a._setup_html5(a._iO),d());if(a.playState===
1&&!a.paused)if(e=a._iO.multiShot)a.isHTML5&&a.setPosition(a._iO.position);else return a;if(!a.loaded)if(a.readyState===0){if(!a.isHTML5)a._iO.autoPlay=!0;a.load(a._iO)}else if(a.readyState===2)return a;if(a.paused&&a.position&&a.position>0)a.resume();else{a.playState=1;a.paused=!1;(!a.instanceCount||a._iO.multiShotEvents||k>8&&!a.isHTML5&&!a.getAutoPlay())&&a.instanceCount++;a.position=typeof a._iO.position!=="undefined"&&!isNaN(a._iO.position)?a._iO.position:0;if(!a.isHTML5)a._iO=T(S(a._iO));if(a._iO.onplay&&
W)a._iO.onplay.apply(a),a._onplay_called=!0;a.setVolume(a._iO.volume,!0);a.setPan(a._iO.pan,!0);a.isHTML5?(d(),a._setup_html5().play()):c.o._start(a.sID,a._iO.loops||1,k===9?a.position:a.position/1E3)}return a};this.stop=function(b){if(a.playState===1){a._onbufferchange(0);a.resetOnPosition(0);if(!a.isHTML5)a.playState=0;a.paused=!1;a._iO.onstop&&a._iO.onstop.apply(a);if(a.isHTML5){if(a._a)a.setPosition(0),a._a.pause(),a.playState=0,a._onTimer(),f(),a.unload()}else c.o._stop(a.sID,b),a._iO.serverURL&&
a.unload();a.instanceCount=0;a._iO={}}return a};this.setAutoPlay=function(b){a._iO.autoPlay=b;a.isHTML5?a._a&&b&&a.play():c.o._setAutoPlay(a.sID,b);b&&!a.instanceCount&&a.readyState===1&&a.instanceCount++};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPosition=function(b){b===void 0&&(b=0);var d=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=d;b=a.position/1E3;a.resetOnPosition(a.position);a._iO.position=d;if(a.isHTML5){if(a._a&&a._html5_canplay&&
a._a.currentTime!==b)try{a._a.currentTime=b}catch(e){}}else b=k===9?a.position:b,a.readyState&&a.readyState!==2&&c.o._setPosition(a.sID,b,a.paused||!a.playState);a.isHTML5&&a.paused&&a._onTimer(!0);return a};this.pause=function(b){if(a.paused||a.playState===0&&a.readyState!==1)return a;a.paused=!0;a.isHTML5?(a._setup_html5().pause(),f()):(b||b===void 0)&&c.o._pause(a.sID);a._iO.onpause&&a._iO.onpause.apply(a);return a};this.resume=function(){if(!a.paused)return a;a.paused=!1;a.playState=1;a.isHTML5?
(a._setup_html5().play(),d()):(a._iO.isMovieStar&&a.setPosition(a.position),c.o._pause(a.sID));!a._onplay_called&&a._iO.onplay?(a._iO.onplay.apply(a),a._onplay_called=!0):a._iO.onresume&&a._iO.onresume.apply(a);return a};this.togglePause=function(){if(a.playState===0)return a.play({position:k===9&&!a.isHTML5?a.position:a.position/1E3}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(b,d){typeof b==="undefined"&&(b=0);typeof d==="undefined"&&(d=!1);a.isHTML5||c.o._setPan(a.sID,b);a._iO.pan=
b;if(!d)a.pan=b,a.options.pan=b;return a};this.setVolume=function(b,d){typeof b==="undefined"&&(b=100);typeof d==="undefined"&&(d=!1);if(a.isHTML5){if(a._a)a._a.volume=Math.max(0,Math.min(1,b/100))}else c.o._setVolume(a.sID,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;if(!d)a.volume=b,a.options.volume=b;return a};this.mute=function(){a.muted=!0;if(a.isHTML5){if(a._a)a._a.muted=!0}else c.o._setVolume(a.sID,0);return a};this.unmute=function(){a.muted=!1;var b=typeof a._iO.volume!=="undefined";if(a.isHTML5){if(a._a)a._a.muted=
!1}else c.o._setVolume(a.sID,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?a.unmute():a.mute()};this.onposition=function(c,b,d){a._onPositionItems.push({position:c,method:b,scope:typeof d!=="undefined"?d:a,fired:!1});return a};this.processOnPosition=function(){var b,d;b=a._onPositionItems.length;if(!b||!a.playState||a._onPositionFired>=b)return!1;for(;b--;)if(d=a._onPositionItems[b],!d.fired&&a.position>=d.position)d.method.apply(d.scope,[d.position]),d.fired=
!0,c._onPositionFired++;return!0};this.resetOnPosition=function(b){var d,e;d=a._onPositionItems.length;if(!d)return!1;for(;d--;)if(e=a._onPositionItems[d],e.fired&&b<=e.position)e.fired=!1,c._onPositionFired--;return!0};this._onTimer=function(c){var b={};if(a._hasTimer||c)return a._a&&(c||(a.playState>0||a.readyState===1)&&!a.paused)?(a.duration=a._get_html5_duration(),a.durationEstimate=a.duration,c=a._a.currentTime?a._a.currentTime*1E3:0,a._whileplaying(c,b,b,b,b),!0):!1};this._get_html5_duration=
function(){var c=a._a?a._a.duration*1E3:a._iO?a._iO.duration:void 0;return c&&!isNaN(c)&&c!==Infinity?c:a._iO?a._iO.duration:null};d=function(){a.isHTML5&&wa(a)};f=function(){a.isHTML5&&xa(a)};e=function(){a._onPositionItems=[];a._onPositionFired=0;a._hasTimer=null;a._onplay_called=!1;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.position=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.failures=0;a.loaded=!1;a.playState=0;a.paused=!1;a.readyState=
0;a.muted=!1;a.didBeforeFinish=!1;a.didJustBeforeFinish=!1;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=0;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.eqData=[];a.eqData.left=[];a.eqData.right=[]};e();this._setup_html5=function(b){var b=o(a._iO,b),d=K?c._global_a:a._a;decodeURI(b.url);var f=d&&d._t?d._t.instanceOptions:null;if(d){if(d._t&&f.url===b.url&&(!a._lastURL||a._lastURL===f.url))return d;K&&d._t&&d._t.playState&&b.url!==f.url&&d._t.stop();e();d.src=b.url;a.url=
b.url;a._lastURL=b.url;d._called_load=!1}else if(d=new Audio(b.url),d._called_load=!1,K)c._global_a=d;a.isHTML5=!0;a._a=d;d._t=a;a._add_html5_events();d.loop=b.loops>1?"loop":"";b.autoLoad||b.autoPlay?(d.autobuffer="auto",d.preload="auto",a.load(),d._called_load=!0):(d.autobuffer=!1,d.preload="none");d.loop=b.loops>1?"loop":"";return d};this._add_html5_events=function(){if(a._a._added_events)return!1;var b;a._a._added_events=!0;for(b in c._html5_events)c._html5_events.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,
c._html5_events[b],!1);return!0};this._remove_html5_events=function(){a._a._added_events=!1;for(var b in c._html5_events)c._html5_events.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,c._html5_events[b],!1)};this._whileloading=function(c,b,d,e){a.bytesLoaded=c;a.bytesTotal=b;a.duration=Math.floor(d);a.bufferLength=e;if(a._iO.isMovieStar)a.durationEstimate=a.duration;else if(a.durationEstimate=a._iO.duration?a.duration>a._iO.duration?a.duration:a._iO.duration:parseInt(a.bytesTotal/a.bytesLoaded*
a.duration,10),a.durationEstimate===void 0)a.durationEstimate=a.duration;a.readyState!==3&&a._iO.whileloading&&a._iO.whileloading.apply(a)};this._onid3=function(c,b){var d=[],e,f;e=0;for(f=c.length;e<f;e++)d[c[e]]=b[e];a.id3=o(a.id3,d);a._iO.onid3&&a._iO.onid3.apply(a)};this._whileplaying=function(b,d,e,f,g){if(isNaN(b)||b===null)return!1;a.playState===0&&b>0&&(b=0);a.position=b;a.processOnPosition();if(k>8&&!a.isHTML5){if(a._iO.usePeakData&&typeof d!=="undefined"&&d)a.peakData={left:d.leftPeak,right:d.rightPeak};
if(a._iO.useWaveformData&&typeof e!=="undefined"&&e)a.waveformData={left:e.split(","),right:f.split(",")};if(a._iO.useEQData&&typeof g!=="undefined"&&g&&g.leftEQ&&(b=g.leftEQ.split(","),a.eqData=b,a.eqData.left=b,typeof g.rightEQ!=="undefined"&&g.rightEQ))a.eqData.right=g.rightEQ.split(",")}a.playState===1&&(!a.isHTML5&&c.flashVersion===8&&!a.position&&a.isBuffering&&a._onbufferchange(0),a._iO.whileplaying&&a._iO.whileplaying.apply(a),(a.loaded||!a.loaded&&a._iO.isMovieStar)&&a._iO.onbeforefinish&&
a._iO.onbeforefinishtime&&!a.didBeforeFinish&&a.duration-a.position<=a._iO.onbeforefinishtime&&a._onbeforefinish());return!0};this._onconnect=function(b){b=b===1;if(a.connected=b)a.failures=0,j(a.sID)&&(a.getAutoPlay()?a.play(void 0,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._onload=function(b){b=b?!0:!1;a.loaded=b;a.readyState=b?3:2;a._onbufferchange(0);a._iO.onload&&a._iO.onload.apply(a,[b]);return!0};this._onfailure=function(b,c,d){a.failures++;
if(a._iO.onfailure&&a.failures===1)a._iO.onfailure(a,b,c,d)};this._onbeforefinish=function(){if(!a.didBeforeFinish)a.didBeforeFinish=!0,a._iO.onbeforefinish&&a._iO.onbeforefinish.apply(a)};this._onjustbeforefinish=function(){if(!a.didJustBeforeFinish)a.didJustBeforeFinish=!0,a._iO.onjustbeforefinish&&a._iO.onjustbeforefinish.apply(a)};this._onfinish=function(){var b=a._iO.onfinish;a._onbufferchange(0);a.resetOnPosition(0);a._iO.onbeforefinishcomplete&&a._iO.onbeforefinishcomplete.apply(a);a.didBeforeFinish=
!1;a.didJustBeforeFinish=!1;if(a.instanceCount){a.instanceCount--;if(!a.instanceCount)a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},f();(!a.instanceCount||a._iO.multiShotEvents)&&b&&b.apply(a)}};this._onbufferchange=function(b){if(a.playState===0)return!1;if(b&&a.isBuffering||!b&&!a.isBuffering)return!1;a.isBuffering=b===1;a._iO.onbufferchange&&a._iO.onbufferchange.apply(a);return!0};this._ondataerror=function(){a.playState>0&&a._iO.ondataerror&&a._iO.ondataerror.apply(a)}};
ea=function(){return g.body?g.body:g._docElement?g.documentElement:g.getElementsByTagName("div")[0]};y=function(b){return g.getElementById(b)};o=function(b,a){var e={},f,d;for(f in b)b.hasOwnProperty(f)&&(e[f]=b[f]);f=typeof a==="undefined"?c.defaultOptions:a;for(d in f)f.hasOwnProperty(d)&&typeof e[d]==="undefined"&&(e[d]=f[d]);return e};l=function(){function b(a){var a=Da.call(a),b=a.length;c?(a[1]="on"+a[1],b>3&&a.pop()):b===3&&a.push(!1);return a}function a(a,b){var g=a.shift(),h=[f[b]];if(c)g[h](a[0],
a[1]);else g[h].apply(g,a)}var c=h.attachEvent,f={add:c?"attachEvent":"addEventListener",remove:c?"detachEvent":"removeEventListener"};return{add:function(){a(b(arguments),"add")},remove:function(){a(b(arguments),"remove")}}}();V=function(b){return!b.serverURL&&(b.type?J({type:b.type}):J(b.url)||p)};J=function(b){if(!c.useHTML5Audio||!c.hasHTML5)return!1;var a,e=c.audioFormats;if(!s){s=[];for(a in e)e.hasOwnProperty(a)&&(s.push(a),e[a].related&&(s=s.concat(e[a].related)));s=RegExp("\\.("+s.join("|")+
")","i")}a=typeof b.type!=="undefined"?b.type:null;b=typeof b==="string"?b.toLowerCase().match(s):null;if(!b||!b.length)if(a)b=a.indexOf(";"),b=(b!==-1?a.substr(0,b):a).substr(6);else return!1;else b=b[0].substr(1);if(b&&typeof c.html5[b]!=="undefined")return c.html5[b];else{if(!a)if(b&&c.html5[b])return c.html5[b];else a="audio/"+b;a=c.html5.canPlayType(a);return c.html5[b]=a}};za=function(){function b(b){var d,e,f=!1;if(!a||typeof a.canPlayType!=="function")return!1;if(b instanceof Array){d=0;for(e=
b.length;d<e&&!f;d++)if(c.html5[b[d]]||a.canPlayType(b[d]).match(c.html5Test))f=!0,c.html5[b[d]]=!0;return f}else return(b=a&&typeof a.canPlayType==="function"?a.canPlayType(b):!1)&&(b.match(c.html5Test)?!0:!1)}if(!c.useHTML5Audio||typeof Audio==="undefined")return!1;var a=typeof Audio!=="undefined"?Ga?new Audio(null):new Audio:null,e,f={},d,g;C();d=c.audioFormats;for(e in d)if(d.hasOwnProperty(e)&&(f[e]=b(d[e].type),d[e]&&d[e].related))for(g=d[e].related.length;g--;)c.html5[d[e].related[g]]=f[e];
f.canPlayType=a?b:null;c.html5=o(c.html5,f);return!0};w=function(){};S=function(b){if(k===8&&b.loops>1&&b.stream)b.stream=!1;return b};T=function(b){if(b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||b.useEQData))b.usePolicyFile=!0;return b};ia=function(b){typeof console!=="undefined"&&typeof console.warn!=="undefined"&&console.warn(b)};$=function(){return!1};ua=function(b){for(var a in b)b.hasOwnProperty(a)&&typeof b[a]==="function"&&(b[a]=$)};R=function(b){typeof b==="undefined"&&
(b=!1);(t||b)&&c.disable(b)};va=function(b){var a=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(a=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+="/");return(b&&b.lastIndexOf("/")!==-1?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL};ca=function(){if(k!==8&&k!==9)c.flashVersion=8;var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";if(c.useHTML5Audio&&!p&&c.audioFormats.mp4.required&&c.flashVersion<9)c.flashVersion=9;k=c.flashVersion;c.version=c.versionNumber+
(p?" (HTML5-only mode)":k===9?" (AS3/Flash 9)":" (AS2/Flash 8)");if(k>8)c.defaultOptions=o(c.defaultOptions,c.flash9Options),c.features.buffering=!0;k>8&&c.useMovieStar?(c.defaultOptions=o(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=RegExp("\\.(mp3|"+c.netStreamTypes.join("|")+")(\\?.*)?$","i"),c.mimePattern=c.netStreamMimeTypes,c.features.movieStar=!0):(c.useMovieStar=!1,c.features.movieStar=!1);c.filePattern=c.filePatterns[k!==8?"flash9":"flash8"];c.movieURL=(k===8?"soundmanager2.swf":
"soundmanager2_flash9.swf").replace(".swf",b);c.features.peakData=c.features.waveformData=c.features.eqData=k>8};ta=function(b,a){if(!c.o||!c.allowPolling)return!1;c.o._setPolling(b,a)};Q=function(b,a){var e=a?a:c.url,f=c.altURL?c.altURL:e,d;d=ea();var h,k,i=B(),j,l=null,l=(l=g.getElementsByTagName("html")[0])&&l.dir&&l.dir.match(/rtl/i),b=typeof b==="undefined"?c.id:b;if(E&&F)return!1;if(p)return ca(),c.oMC=y(c.movieID),O(),F=E=!0,!1;E=!0;ca();c.url=va(c._overHTTP?e:f);a=c.url;c.wmode=!c.wmode&&
c.useHighPerformance&&!c.useMovieStar?"transparent":c.wmode;if(c.wmode!==null&&(n.match(/msie 8/i)||!q&&!c.useHighPerformance)&&navigator.platform.match(/win32|win64/i))c.specialWmodeCase=!0,c.wmode=null;d={name:b,id:b,src:a,width:"100%",height:"100%",quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:c._http+"//www.macromedia.com/go/getflashplayer",type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};if(c.debugFlash)d.FlashVars="debug=1";c.wmode||
delete d.wmode;if(q)e=g.createElement("div"),k='<object id="'+b+'" data="'+a+'" type="'+d.type+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+c._http+'//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="'+d.width+'" height="'+d.height+'"><param name="movie" value="'+a+'" /><param name="AllowScriptAccess" value="'+c.allowScriptAccess+'" /><param name="quality" value="'+d.quality+'" />'+(c.wmode?'<param name="wmode" value="'+c.wmode+'" /> ':"")+
'<param name="bgcolor" value="'+c.bgColor+'" />'+(c.debugFlash?'<param name="FlashVars" value="'+d.FlashVars+'" />':"")+"</object>";else for(h in e=g.createElement("embed"),d)d.hasOwnProperty(h)&&e.setAttribute(h,d[h]);pa();i=B();if(d=ea())if(c.oMC=y(c.movieID)?y(c.movieID):g.createElement("div"),c.oMC.id){j=c.oMC.className;c.oMC.className=(j?j+" ":c.swfCSS.swfDefault)+(i?" "+i:"");c.oMC.appendChild(e);if(q)h=c.oMC.appendChild(g.createElement("div")),h.className=c.swfCSS.swfBox,h.innerHTML=k;F=!0}else{c.oMC.id=
c.movieID;c.oMC.className=c.swfCSS.swfDefault+" "+i;h=i=null;if(!c.useFlashBlock)if(c.useHighPerformance)i={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"};else if(i={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"},l)i.left=Math.abs(parseInt(i.left,10))+"px";if(Fa)c.oMC.style.zIndex=1E4;if(!c.debugFlash)for(j in i)i.hasOwnProperty(j)&&(c.oMC.style[j]=i[j]);try{q||c.oMC.appendChild(e);d.appendChild(c.oMC);if(q)h=c.oMC.appendChild(g.createElement("div")),
h.className=c.swfCSS.swfBox,h.innerHTML=k;F=!0}catch(m){throw Error(w("appXHTML"));}}return!0};j=this.getSoundById;H=function(){if(p)return Q(),!1;if(c.o)return!1;c.o=c.getMovie(c.id);if(!c.o)I?(q?c.oMC.innerHTML=ga:c.oMC.appendChild(I),I=null,E=!0):Q(c.id,c.url),c.o=c.getMovie(c.id);c.oninitmovie instanceof Function&&setTimeout(c.oninitmovie,1);return!0};ba=function(b){if(b)c.url=b;H()};P=function(){setTimeout(ra,500)};ra=function(){if(U)return!1;U=!0;l.remove(h,"load",P);if(D&&!na)return!1;var b;
m||(b=c.getMoviePercent());setTimeout(function(){b=c.getMoviePercent();!m&&Ca&&(b===null?c.useFlashBlock||c.flashLoadTimeout===0?c.useFlashBlock&&ha():R(!0):c.flashLoadTimeout!==0&&R(!0))},c.flashLoadTimeout)};ba=function(b){if(b)c.url=b;H()};B=function(){var b=[];c.debugMode&&b.push(c.swfCSS.sm2Debug);c.debugFlash&&b.push(c.swfCSS.flashDebug);c.useHighPerformance&&b.push(c.swfCSS.highPerf);return b.join(" ")};ha=function(){w("fbHandler");var b=c.getMoviePercent(),a=c.swfCSS;if(c.ok()){if(c.oMC)c.oMC.className=
[B(),a.swfDefault,a.swfLoaded+(c.didFlashBlock?" "+a.swfUnblocked:"")].join(" ")}else{if(x)c.oMC.className=B()+" "+a.swfDefault+" "+(b===null?a.swfTimedout:a.swfError);c.didFlashBlock=!0;u({type:"ontimeout",ignoreInit:!0});c.onerror instanceof Function&&c.onerror.apply(h)}};v=function(){function b(){l.remove(h,"focus",v);l.remove(h,"load",v)}if(na||!D)return b(),!0;na=Ca=!0;L&&D&&l.remove(h,"mousemove",v);U=!1;b();return!0};G=function(b){if(m)return!1;if(p)return m=!0,u(),z(),!0;c.useFlashBlock&&
c.flashLoadTimeout&&!c.getMoviePercent()||(m=!0);if(t||b){if(c.useFlashBlock)c.oMC.className=B()+" "+(c.getMoviePercent()===null?c.swfCSS.swfTimedout:c.swfCSS.swfError);u({type:"ontimeout"});c.onerror instanceof Function&&c.onerror.apply(h);return!1}l.add(h,"unload",$);if(c.waitForWindowLoad&&!qa)return l.add(h,"load",z),!1;else z();return!0};aa=function(b,a,c){typeof r[b]==="undefined"&&(r[b]=[]);r[b].push({method:a,scope:c||null,fired:!1})};u=function(b){b||(b={type:"onready"});if(!m&&b&&!b.ignoreInit)return!1;
var a={success:b&&b.ignoreInit?c.ok():!t},e=b&&b.type?r[b.type]||[]:[],b=[],f,d=x&&c.useFlashBlock&&!c.ok();for(f=0;f<e.length;f++)e[f].fired!==!0&&b.push(e[f]);if(b.length){f=0;for(e=b.length;f<e;f++)if(b[f].scope?b[f].method.apply(b[f].scope,[a]):b[f].method(a),!d)b[f].fired=!0}return!0};z=function(){h.setTimeout(function(){c.useFlashBlock&&ha();u();c.onload instanceof Function&&c.onload.apply(h);c.waitForWindowLoad&&l.add(h,"load",z)},1)};C=function(){if(la!==void 0)return la;var b=!1,a=navigator,
c=a.plugins,f,d=h.ActiveXObject;if(c&&c.length)(a=a.mimeTypes)&&a["application/x-shockwave-flash"]&&a["application/x-shockwave-flash"].enabledPlugin&&a["application/x-shockwave-flash"].enabledPlugin.description&&(b=!0);else if(typeof d!=="undefined"){try{f=new d("ShockwaveFlash.ShockwaveFlash")}catch(g){}b=!!f}return la=b};ya=function(){var b,a;if(n.match(/iphone os (1|2|3_0|3_1)/i)){c.hasHTML5=!1;p=!0;if(c.oMC)c.oMC.style.display="none";return!1}if(c.useHTML5Audio){if(!c.html5||!c.html5.canPlayType)return c.hasHTML5=
!1,!0;else c.hasHTML5=!0;if(ma&&C())return!0}else return!0;for(a in c.audioFormats)c.audioFormats.hasOwnProperty(a)&&c.audioFormats[a].required&&!c.html5.canPlayType(c.audioFormats[a].type)&&(b=!0);c.ignoreFlash&&(b=!1);p=c.useHTML5Audio&&c.hasHTML5&&!b&&!c.requireFlash;return C()&&b};O=function(){var b,a=[];if(m)return!1;if(c.hasHTML5)for(b in c.audioFormats)c.audioFormats.hasOwnProperty(b)&&a.push(b+": "+c.html5[b]);if(p){if(!m)l.remove(h,"load",c.beginDelayedInit),c.enabled=!0,G();return!0}H();
try{c.o._externalInterfaceTest(!1),c.allowPolling&&ta(!0,c.flashPollingInterval?c.flashPollingInterval:c.useFastPolling?10:50),c.debugMode||c.o._disableDebug(),c.enabled=!0}catch(e){return R(!0),G(),!1}G();l.remove(h,"load",c.beginDelayedInit);return!0};sa=function(){if(ja)return!1;Q();H();return ja=!0};A=function(){if(da)return!1;da=!0;pa();if(!c.useHTML5Audio&&!C())c.useHTML5Audio=!0;za();c.html5.usingFlash=ya();x=c.html5.usingFlash;da=!0;g.removeEventListener&&g.removeEventListener("DOMContentLoaded",
A,!1);ba();return!0};wa=function(b){if(!b._hasTimer)b._hasTimer=!0};xa=function(b){if(b._hasTimer)b._hasTimer=!1};fa=function(){if(c.onerror instanceof Function)c.onerror();c.disable()};Aa=function(){if(!ma||!C())return!1;var b=c.audioFormats,a,e;for(e in b)if(b.hasOwnProperty(e)&&(e==="mp3"||e==="mp4"))if(c.html5[e]=!1,b[e]&&b[e].related)for(a=b[e].related.length;a--;)c.html5[b[e].related[a]]=!1};this._setSandboxType=function(){};this._externalInterfaceOK=function(){if(c.swfLoaded)return!1;(new Date).getTime();
c.swfLoaded=!0;D=!1;ma&&Aa();q?setTimeout(O,100):O()};ka=function(){g.readyState==="complete"&&(A(),g.detachEvent("onreadystatechange",ka));return!0};if(!c.hasHTML5||x)l.add(h,"focus",v),l.add(h,"load",v),l.add(h,"load",P),L&&D&&l.add(h,"mousemove",v);g.addEventListener?g.addEventListener("DOMContentLoaded",A,!1):g.attachEvent?g.attachEvent("onreadystatechange",ka):fa();g.readyState==="complete"&&setTimeout(A,100)}var X=null;if(typeof SM2_DEFER==="undefined"||!SM2_DEFER)X=new M;Y.SoundManager=M;Y.soundManager=
X})(window);
/*
  SoundManager 2 Demo: Play MP3 links "in-place"
  ----------------------------------------------

  http://schillmania.com/projects/soundmanager2/

  A simple demo making MP3s playable "inline"
  and easily styled/customizable via CSS.

  Requires SoundManager 2 Javascript API.
*/
function InlinePlayer() {
  var self = this;
  var pl = this;
  var sm = soundManager; // soundManager instance
  this.playableClass = 'inline-playable'; // CSS class for forcing a link to be playable (eg. doesn't have .MP3 in it)
  this.excludeClass = 'inline-exclude'; // CSS class for ignoring MP3 links
  this.links = [];
  this.sounds = [];
  this.soundsByURL = [];
  this.indexByURL = [];
  this.lastSound = null;
  this.soundCount = 0;
  var isIE = (navigator.userAgent.match(/msie/i));

  this.config = {
    playNext: false, // stop after one sound, or play through list until end
    autoPlay: false  // start playing the first sound right away
  }

  this.css = {
    // CSS class names appended to link during various states
    sDefault: 'sm2_link', // default state
    sLoading: 'sm2_loading',
    sPlaying: 'sm2_playing',
    sPaused: 'sm2_paused'
  }

  this.addEventHandler = function(o,evtName,evtHandler) {
    typeof(attachEvent)=='undefined'?o.addEventListener(evtName,evtHandler,false):o.attachEvent('on'+evtName,evtHandler);
  }

  this.removeEventHandler = function(o,evtName,evtHandler) {
    typeof(attachEvent)=='undefined'?o.removeEventListener(evtName,evtHandler,false):o.detachEvent('on'+evtName,evtHandler);
  }

  this.classContains = function(o,cStr) {
	return (typeof(o.className)!='undefined'?o.className.match(new RegExp('(\\s|^)'+cStr+'(\\s|$)')):false);
  }

  this.addClass = function(o,cStr) {
    if (!o || !cStr || self.classContains(o,cStr)) return false;
    o.className = (o.className?o.className+' ':'')+cStr;
  }

  this.removeClass = function(o,cStr) {
    if (!o || !cStr || !self.classContains(o,cStr)) return false;
    o.className = o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');
  }

  this.getSoundByURL = function(sURL) {
    return (typeof self.soundsByURL[sURL] != 'undefined'?self.soundsByURL[sURL]:null);
  }

  this.isChildOfNode = function(o,sNodeName) {
    if (!o || !o.parentNode) {
      return false;
    }
    sNodeName = sNodeName.toLowerCase();
    do {
      o = o.parentNode;
    } while (o && o.parentNode && o.nodeName.toLowerCase() != sNodeName);
    return (o.nodeName.toLowerCase() == sNodeName?o:null);
  }

  this.events = {

    // handlers for sound events as they're started/stopped/played

    play: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLink,this._data.className);
    },

    stop: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = '';
    },

    pause: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPaused;
      pl.addClass(this._data.oLink,this._data.className);
    },

    resume: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLink,this._data.className);      
    },

    finish: function() {
      pl.removeClass(this._data.oLink,this._data.className);
      this._data.className = '';
      if (pl.config.playNext) {
        var nextLink = (pl.indexByURL[this._data.oLink.href]+1);
        if (nextLink<pl.links.length) {
          pl.handleClick({'target':pl.links[nextLink]});
        }
      }
    }

  }

  this.stopEvent = function(e) {
   if (typeof e != 'undefined' && typeof e.preventDefault != 'undefined') {
      e.preventDefault();
    } else if (typeof event != 'undefined' && typeof event.returnValue != 'undefined') {
      event.returnValue = false;
    }
    return false;
  }

  this.getTheDamnLink = (isIE)?function(e) {
    // I really didn't want to have to do this.
    return (e && e.target?e.target:window.event.srcElement);
  }:function(e) {
    return e.target;
  }

  this.handleClick = function(e) {
    // a sound link was clicked
    if (typeof e.button != 'undefined' && e.button>1) {
	  // ignore right-click
	  return true;
    }
    var o = self.getTheDamnLink(e);
    if (o.nodeName.toLowerCase() != 'a') {
      o = self.isChildOfNode(o,'a');
      if (!o) return true;
    }
    var sURL = o.getAttribute('href');
    if (!o.href || (!sm.canPlayLink(o) && !self.classContains(o,self.playableClass)) || self.classContains(o,self.excludeClass)) {
      return true; // pass-thru for non-MP3/non-links
    }
    var soundURL = (o.href);
    var thisSound = self.getSoundByURL(soundURL);
    if (thisSound) {
      // already exists
      if (thisSound == self.lastSound) {
        // and was playing (or paused)
        thisSound.togglePause();
      } else {
        // different sound
        thisSound.togglePause(); // start playing current
        sm._writeDebug('sound different than last sound: '+self.lastSound.sID);
        if (self.lastSound) self.stopSound(self.lastSound);
      }
    } else {
      // create sound
      thisSound = sm.createSound({
       id:'inlineMP3Sound'+(self.soundCount++),
       url:soundURL,
       onplay:self.events.play,
       onstop:self.events.stop,
       onpause:self.events.pause,
       onresume:self.events.resume,
       onfinish:self.events.finish
      });
      // tack on some custom data
      thisSound._data = {
        oLink: o, // DOM node for reference within SM2 object event handlers
        className: self.css.sPlaying
      };
      self.soundsByURL[soundURL] = thisSound;
      self.sounds.push(thisSound);
      if (self.lastSound) self.stopSound(self.lastSound);
      thisSound.play();
      // stop last sound
    }

    self.lastSound = thisSound; // reference for next call

    if (typeof e != 'undefined' && typeof e.preventDefault != 'undefined') {
      e.preventDefault();
    } else {
      event.returnValue = false;
    }
    return false;
  }

  this.stopSound = function(oSound) {
    soundManager.stop(oSound.sID);
    soundManager.unload(oSound.sID);
  }

  this.init = function() {
    sm._writeDebug('inlinePlayer.init()');
    var oLinks = document.getElementsByTagName('a');
    // grab all links, look for .mp3
    var foundItems = 0;
    for (var i=0, j=oLinks.length; i<j; i++) {
      if ((sm.canPlayLink(oLinks[i]) || self.classContains(oLinks[i],self.playableClass)) && !self.classContains(oLinks[i],self.excludeClass)) {
        self.addClass(oLinks[i],self.css.sDefault); // add default CSS decoration
        self.links[foundItems] = (oLinks[i]);
        self.indexByURL[oLinks[i].href] = foundItems; // hack for indexing
        foundItems++;
      }
    }
    if (foundItems>0) {
      self.addEventHandler(document,'click',self.handleClick);
      if (self.config.autoPlay) {
        self.handleClick({target:self.links[0],preventDefault:function(){}});
      }
    }
    sm._writeDebug('inlinePlayer.init(): Found '+foundItems+' relevant items.');
  }

  this.init();

}

var inlinePlayer = null;

soundManager.debugMode = false; // disable or enable debug output
soundManager.useFlashBlock = true;
soundManager.url = '/soundmanager2/'; // path to directory containing SM2 SWF

// optional: enable MPEG-4/AAC support (requires flash 9)

soundManager.flashVersion = 9;
soundManager.useMovieStar = true;

// ----

soundManager.onready(function() {
  // soundManager.createSound() etc. may now be called
  inlinePlayer = new InlinePlayer();
});
/*
 * jQuery Nivo Slider v2.5.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * March 2010
 */
(function($){var NivoSlider=function(element,options){var settings=$.extend({},$.fn.nivoSlider.defaults,options);var vars={currentSlide:0,currentImage:'',totalSlides:0,randAnim:'',running:false,paused:false,stop:false};var slider=$(element);slider.data('nivo:vars',vars);slider.css('position','relative');slider.addClass('nivoSlider');var kids=slider.children();kids.each(function(){var child=$(this);var link='';if(!child.is('img')){if(child.is('a')){child.addClass('nivo-imageLink');link=child;}
child=child.find('img:first');}
var childWidth=child.width();if(childWidth==0)childWidth=child.attr('width');var childHeight=child.height();if(childHeight==0)childHeight=child.attr('height');if(childWidth>slider.width()){slider.width(childWidth);}
if(childHeight>slider.height()){slider.height(childHeight);}
if(link!=''){link.css('display','none');}
child.css('display','none');vars.totalSlides++;});if(settings.startSlide>0){if(settings.startSlide>=vars.totalSlides)settings.startSlide=vars.totalSlides-1;vars.currentSlide=settings.startSlide;}
if($(kids[vars.currentSlide]).is('img')){vars.currentImage=$(kids[vars.currentSlide]);}else{vars.currentImage=$(kids[vars.currentSlide]).find('img:first');}
if($(kids[vars.currentSlide]).is('a')){$(kids[vars.currentSlide]).css('display','block');}
slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');slider.append($('<div class="nivo-caption"><p></p></div>').css({display:'none',opacity:settings.captionOpacity}));var processCaption=function(settings){var nivoCaption=$('.nivo-caption',slider);if(vars.currentImage.attr('title')!=''&&vars.currentImage.attr('title')!=undefined){var title=vars.currentImage.attr('title');if(title.substr(0,1)=='#')title=$(title).html();if(nivoCaption.css('display')=='block'){nivoCaption.find('p').fadeOut(settings.animSpeed,function(){$(this).html(title);$(this).fadeIn(settings.animSpeed);});}else{nivoCaption.find('p').html(title);}
nivoCaption.fadeIn(settings.animSpeed);}else{nivoCaption.fadeOut(settings.animSpeed);}}
processCaption(settings);var timer=0;if(!settings.manualAdvance&&kids.length>1){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}
if(settings.directionNav){slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+settings.prevText+'</a><a class="nivo-nextNav">'+settings.nextText+'</a></div>');if(settings.directionNavHide){$('.nivo-directionNav',slider).hide();slider.hover(function(){$('.nivo-directionNav',slider).show();},function(){$('.nivo-directionNav',slider).hide();});}
$('a.nivo-prevNav',slider).live('click',function(){if(vars.running)return false;clearInterval(timer);timer='';vars.currentSlide-=2;nivoRun(slider,kids,settings,'prev');});$('a.nivo-nextNav',slider).live('click',function(){if(vars.running)return false;clearInterval(timer);timer='';nivoRun(slider,kids,settings,'next');});}
if(settings.controlNav){var nivoControl=$('<div class="nivo-controlNav"></div>');slider.append(nivoControl);for(var i=0;i<kids.length;i++){if(settings.controlNavThumbs){var child=kids.eq(i);if(!child.is('img')){child=child.find('img:first');}
if(settings.controlNavThumbsFromRel){nivoControl.append('<a class="nivo-control" rel="'+i+'"><img src="'+child.attr('rel')+'" alt="" /></a>');}else{nivoControl.append('<a class="nivo-control" rel="'+i+'"><img src="'+child.attr('src').replace(settings.controlNavThumbsSearch,settings.controlNavThumbsReplace)+'" alt="" /></a>');}}else{nivoControl.append('<a class="nivo-control" rel="'+i+'">'+(i+1)+'</a>');}}
$('.nivo-controlNav a:eq('+vars.currentSlide+')',slider).addClass('active');$('.nivo-controlNav a',slider).live('click',function(){if(vars.running)return false;if($(this).hasClass('active'))return false;clearInterval(timer);timer='';slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');vars.currentSlide=$(this).attr('rel')-1;nivoRun(slider,kids,settings,'control');});}
if(settings.keyboardNav){$(window).keypress(function(event){if(event.keyCode=='37'){if(vars.running)return false;clearInterval(timer);timer='';vars.currentSlide-=2;nivoRun(slider,kids,settings,'prev');}
if(event.keyCode=='39'){if(vars.running)return false;clearInterval(timer);timer='';nivoRun(slider,kids,settings,'next');}});}
if(settings.pauseOnHover){slider.hover(function(){vars.paused=true;clearInterval(timer);timer='';},function(){vars.paused=false;if(timer==''&&!settings.manualAdvance){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}});}
slider.bind('nivo:animFinished',function(){vars.running=false;$(kids).each(function(){if($(this).is('a')){$(this).css('display','none');}});if($(kids[vars.currentSlide]).is('a')){$(kids[vars.currentSlide]).css('display','block');}
if(timer==''&&!vars.paused&&!settings.manualAdvance){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}
settings.afterChange.call(this);});var createSlices=function(slider,settings,vars){for(var i=0;i<settings.slices;i++){var sliceWidth=Math.round(slider.width()/settings.slices);if(i==settings.slices-1){slider.append($('<div class="nivo-slice"></div>').css({left:(sliceWidth*i)+'px',width:(slider.width()-(sliceWidth*i))+'px',height:'0px',opacity:'0',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((sliceWidth+(i*sliceWidth))-sliceWidth)+'px 0%'}));}else{slider.append($('<div class="nivo-slice"></div>').css({left:(sliceWidth*i)+'px',width:sliceWidth+'px',height:'0px',opacity:'0',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((sliceWidth+(i*sliceWidth))-sliceWidth)+'px 0%'}));}}}
var createBoxes=function(slider,settings,vars){var boxWidth=Math.round(slider.width()/settings.boxCols);var boxHeight=Math.round(slider.height()/settings.boxRows);for(var rows=0;rows<settings.boxRows;rows++){for(var cols=0;cols<settings.boxCols;cols++){if(cols==settings.boxCols-1){slider.append($('<div class="nivo-box"></div>').css({opacity:0,left:(boxWidth*cols)+'px',top:(boxHeight*rows)+'px',width:(slider.width()-(boxWidth*cols))+'px',height:boxHeight+'px',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((boxWidth+(cols*boxWidth))-boxWidth)+'px -'+((boxHeight+(rows*boxHeight))-boxHeight)+'px'}));}else{slider.append($('<div class="nivo-box"></div>').css({opacity:0,left:(boxWidth*cols)+'px',top:(boxHeight*rows)+'px',width:boxWidth+'px',height:boxHeight+'px',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((boxWidth+(cols*boxWidth))-boxWidth)+'px -'+((boxHeight+(rows*boxHeight))-boxHeight)+'px'}));}}}}
var nivoRun=function(slider,kids,settings,nudge){var vars=slider.data('nivo:vars');if(vars&&(vars.currentSlide==vars.totalSlides-1)){settings.lastSlide.call(this);}
if((!vars||vars.stop)&&!nudge)return false;settings.beforeChange.call(this);if(!nudge){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}else{if(nudge=='prev'){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}
if(nudge=='next'){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}}
vars.currentSlide++;if(vars.currentSlide==vars.totalSlides){vars.currentSlide=0;settings.slideshowEnd.call(this);}
if(vars.currentSlide<0)vars.currentSlide=(vars.totalSlides-1);if($(kids[vars.currentSlide]).is('img')){vars.currentImage=$(kids[vars.currentSlide]);}else{vars.currentImage=$(kids[vars.currentSlide]).find('img:first');}
if(settings.controlNav){$('.nivo-controlNav a',slider).removeClass('active');$('.nivo-controlNav a:eq('+vars.currentSlide+')',slider).addClass('active');}
processCaption(settings);$('.nivo-slice',slider).remove();$('.nivo-box',slider).remove();if(settings.effect=='random'){var anims=new Array('sliceDownRight','sliceDownLeft','sliceUpRight','sliceUpLeft','sliceUpDown','sliceUpDownLeft','fold','fade','boxRandom','boxRain','boxRainReverse','boxRainGrow','boxRainGrowReverse');vars.randAnim=anims[Math.floor(Math.random()*(anims.length+1))];if(vars.randAnim==undefined)vars.randAnim='fade';}
if(settings.effect.indexOf(',')!=-1){var anims=settings.effect.split(',');vars.randAnim=anims[Math.floor(Math.random()*(anims.length))];if(vars.randAnim==undefined)vars.randAnim='fade';}
vars.running=true;if(settings.effect=='sliceDown'||settings.effect=='sliceDownRight'||vars.randAnim=='sliceDownRight'||settings.effect=='sliceDownLeft'||vars.randAnim=='sliceDownLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceDownLeft'||vars.randAnim=='sliceDownLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);slice.css({'top':'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='sliceUp'||settings.effect=='sliceUpRight'||vars.randAnim=='sliceUpRight'||settings.effect=='sliceUpLeft'||vars.randAnim=='sliceUpLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceUpLeft'||vars.randAnim=='sliceUpLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);slice.css({'bottom':'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='sliceUpDown'||settings.effect=='sliceUpDownRight'||vars.randAnim=='sliceUpDown'||settings.effect=='sliceUpDownLeft'||vars.randAnim=='sliceUpDownLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var v=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceUpDownLeft'||vars.randAnim=='sliceUpDownLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);if(i==0){slice.css('top','0px');i++;}else{slice.css('bottom','0px');i=0;}
if(v==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;v++;});}
else if(settings.effect=='fold'||vars.randAnim=='fold'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;$('.nivo-slice',slider).each(function(){var slice=$(this);var origWidth=slice.width();slice.css({top:'0px',height:'100%',width:'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({width:origWidth,opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({width:origWidth,opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='fade'||vars.randAnim=='fade'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':slider.width()+'px'});firstSlice.animate({opacity:'1.0'},(settings.animSpeed*2),'',function(){slider.trigger('nivo:animFinished');});}
else if(settings.effect=='slideInRight'||vars.randAnim=='slideInRight'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':'0px','opacity':'1'});firstSlice.animate({width:slider.width()+'px'},(settings.animSpeed*2),'',function(){slider.trigger('nivo:animFinished');});}
else if(settings.effect=='slideInLeft'||vars.randAnim=='slideInLeft'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':'0px','opacity':'1','left':'','right':'0px'});firstSlice.animate({width:slider.width()+'px'},(settings.animSpeed*2),'',function(){firstSlice.css({'left':'0px','right':''});slider.trigger('nivo:animFinished');});}
else if(settings.effect=='boxRandom'||vars.randAnim=='boxRandom'){createBoxes(slider,settings,vars);var totalBoxes=settings.boxCols*settings.boxRows;var i=0;var timeBuff=0;var boxes=shuffle($('.nivo-box',slider));boxes.each(function(){var box=$(this);if(i==totalBoxes-1){setTimeout(function(){box.animate({opacity:'1'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){box.animate({opacity:'1'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=20;i++;});}
else if(settings.effect=='boxRain'||vars.randAnim=='boxRain'||settings.effect=='boxRainReverse'||vars.randAnim=='boxRainReverse'||settings.effect=='boxRainGrow'||vars.randAnim=='boxRainGrow'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){createBoxes(slider,settings,vars);var totalBoxes=settings.boxCols*settings.boxRows;var i=0;var timeBuff=0;var rowIndex=0;var colIndex=0;var box2Darr=new Array();box2Darr[rowIndex]=new Array();var boxes=$('.nivo-box',slider);if(settings.effect=='boxRainReverse'||vars.randAnim=='boxRainReverse'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){boxes=$('.nivo-box',slider)._reverse();}
boxes.each(function(){box2Darr[rowIndex][colIndex]=$(this);colIndex++;if(colIndex==settings.boxCols){rowIndex++;colIndex=0;box2Darr[rowIndex]=new Array();}});for(var cols=0;cols<(settings.boxCols*2);cols++){var prevCol=cols;for(var rows=0;rows<settings.boxRows;rows++){if(prevCol>=0&&prevCol<settings.boxCols){(function(row,col,time,i,totalBoxes){var box=$(box2Darr[row][col]);var w=box.width();var h=box.height();if(settings.effect=='boxRainGrow'||vars.randAnim=='boxRainGrow'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){box.width(0).height(0);}
if(i==totalBoxes-1){setTimeout(function(){box.animate({opacity:'1',width:w,height:h},settings.animSpeed/1.3,'',function(){slider.trigger('nivo:animFinished');});},(100+time));}else{setTimeout(function(){box.animate({opacity:'1',width:w,height:h},settings.animSpeed/1.3);},(100+time));}})(rows,prevCol,timeBuff,i,totalBoxes);i++;}
prevCol--;}
timeBuff+=100;}}}
var shuffle=function(arr){for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i),x=arr[--i],arr[i]=arr[j],arr[j]=x);return arr;}
var trace=function(msg){if(this.console&&typeof console.log!="undefined")
console.log(msg);}
this.stop=function(){if(!$(element).data('nivo:vars').stop){$(element).data('nivo:vars').stop=true;trace('Stop Slider');}}
this.start=function(){if($(element).data('nivo:vars').stop){$(element).data('nivo:vars').stop=false;trace('Start Slider');}}
settings.afterLoad.call(this);return this;};$.fn.nivoSlider=function(options){return this.each(function(key,value){var element=$(this);if(element.data('nivoslider'))return element.data('nivoslider');var nivoslider=new NivoSlider(this,options);element.data('nivoslider',nivoslider);});};$.fn.nivoSlider.defaults={effect:'random',slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3000,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:'.jpg',controlNavThumbsReplace:'_thumb.jpg',keyboardNav:true,pauseOnHover:true,manualAdvance:false,captionOpacity:0.8,prevText:'Prev',nextText:'Next',beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};$.fn._reverse=[].reverse;})(jQuery);
/*
	Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />')[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.keyCode,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():false}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);
// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
	jQuery(function($) {
		$("a[rel^='lightbox']").slimbox({/* Put custom options here */}, null, function(el) {
			return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
		});
	});
}
/* jquery.throbber.min.js */
(function($){var defaultOptions={ajax:true,delay:0,image:"throbber.gif",parent:"",wrap:""};$().ajaxStop(function(){_throbberHide($(".throbber_ajax"));});_throbberShow=function(options,jelement){var jparent;if(options.parent){jelement=null;jparent=$(options.parent);}else{jparent=(jelement?jelement.parent():$("body"));}
if(jparent.find(".throbber").length==0){window.clearTimeout(jparent.data("throbber_timeout"));jparent.data("throbber_timeout",window.setTimeout(function(){var throbber=$('<img src="'+options.image+'" class="throbber" />');if(options.ajax){throbber.addClass("throbber_ajax");}
if(jelement){throbber.data("throbber_element",jelement);jelement.hide().after(throbber);}else{jparent.children().hide().end().append(throbber);}
if(options.wrap!=""){throbber.wrap(options.wrap);}},options.delay));}};_throbberHide=function(throbbers){throbbers.each(function(){var throbber=$(this);var jelement=throbber.data("throbber_element");if(jelement){jelement.show();}else{throbber.siblings().show();}
window.clearTimeout(throbber.parent().data("throbber_timeout"));throbber.remove();});}
$.fn.throbber=function(event,options){if(typeof event=="undefined"){event="click";options={};}else if(typeof event=="object"){options=event;event="click";}else if(typeof options=="undefined"){options={};}
options=$.extend({},defaultOptions,options);$(this).each(function(){var jtarget=$(this);jtarget.bind(event,function(){_throbberShow(options,jtarget);});});return $(this);};$.throbberShow=function(options){options=$.extend({},defaultOptions,options);_throbberShow(options,null);return $;};$.throbberHide=function(){_throbberHide($(".throbber"));return $;};})(jQuery);
/* jCarousel Lite 1.0.1, JQuery plugin. Minified version. */
(function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:200,easing:null,vertical:false,circular:true,visible:3,start:0,scroll:1,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var b=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var c=$(this),ul=$("ul",c),tLi=$("li",ul),tl=tLi.size(),v=o.visible;if(o.circular){ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone());o.start+=v}var f=$("li",ul),itemLength=f.size(),curr=o.start;c.css("visibility","visible");f.css({overflow:"hidden",float:o.vertical?"none":"left"});ul.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});c.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var g=o.vertical?height(f):width(f);var h=g*itemLength;var j=g*v;f.css({width:f.width(),height:f.height()});ul.css(sizeCss,h+"px").css(animCss,-(curr*g));c.css(sizeCss,j+"px");if(o.btnPrev)$(o.btnPrev).click(function(){return go(curr-o.scroll)});if(o.btnNext)$(o.btnNext).click(function(){return go(curr+o.scroll)});if(o.btnGo)$.each(o.btnGo,function(i,a){$(a).click(function(){return go(o.circular?o.visible+i:i)})});if(o.mouseWheel&&c.mousewheel)c.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)});if(o.auto)setInterval(function(){go(curr+o.scroll)},o.auto+o.speed);function vis(){return f.slice(curr).slice(0,v)};function go(a){if(!b){if(o.beforeStart)o.beforeStart.call(this,vis());if(o.circular){if(a<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*g)+"px");curr=a==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else if(a>=itemLength-v+1){ul.css(animCss,-((v)*g)+"px");curr=a==itemLength-v+1?v+1:v+o.scroll}else curr=a}else{if(a<0||a>itemLength-v)return;else curr=a}b=true;ul.animate(animCss=="left"?{left:-(curr*g)}:{top:-(curr*g)},o.speed,o.easing,function(){if(o.afterEnd)o.afterEnd.call(this,vis());b=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(a,b){return parseInt($.css(a[0],b))||0};function width(a){return a[0].offsetWidth+css(a,'marginLeft')+css(a,'marginRight')};function height(a){return a[0].offsetHeight+css(a,'marginTop')+css(a,'marginBottom')}})(jQuery);
 