(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e){e.exports={canvas:{width:640,height:320},routes:{100:[[100,100],[540,100],[540,220]],110:[[100,100],[540,100],[540,220]]}}},31:function(e,t,n){e.exports=n(63)},36:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(11),o=n.n(c),i=(n(36),n(9)),l=n.n(i),u=n(12),s=n(3),p=n(4),h=n(6),m=n(5),d=n(7),f=n(13),E=n(10),b=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"renderInfoText",value:function(e){return e?r.a.createElement(E.c,null,e):null}},{key:"renderActionButton",value:function(e,t){return e?r.a.createElement(E.a,{className:"mt-1 btn-block",size:"lg",color:"primary",onClick:t},e):null}},{key:"render",value:function(){var e=this.props,t=e.title,n=e.infoText,a=e.actionButtonText,c=e.onAction,o=e.children;return r.a.createElement("div",{className:"check-in-card"},r.a.createElement(E.b,{body:!0,className:"text-center"},r.a.createElement(E.d,null,t),this.renderInfoText(n),o,this.renderActionButton(a,c)))}}]),t}(a.Component),v=n(27),O=n(28),C="http://hapi.fhir.org/baseDstu3",j={Patient:"Patient",Practitioner:"Practitioner",Location:"Location",Appointment:"Appointment"},k=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={id:""},n.handleSubmit=function(e){e.preventDefault();var t=n.props,a=t.isLoading,r=t.onCheckIn;a||r(n.state.id)},n.handleIdChange=function(e){n.setState({id:e.target.value})},n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state.id,t=this.props.isLoading;return r.a.createElement("div",{className:"check-in"},r.a.createElement(b,{title:r.a.createElement("span",null,"Check-in"),infoText:r.a.createElement("span",null,"Please type your ID")},r.a.createElement(E.e,{onSubmit:this.handleSubmit},r.a.createElement(E.f,null,r.a.createElement(E.g,{bsSize:"lg",value:e,onChange:this.handleIdChange,className:"text-center",placeholder:"555555-555"}),r.a.createElement("button",{className:"btn btn-primary btn-lg mt-1 btn-block",type:"submit",disabled:!e},t?r.a.createElement(v.a,{icon:O.a,spin:!0}):"Check in")))))}}]),t}(a.Component),y=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.onClose;return r.a.createElement("div",null,r.a.createElement(b,{title:r.a.createElement("span",null,"Appointment was not found"),infoText:r.a.createElement("span",null,"Please contact the reception."),actionButtonText:"Close",onAction:e}))}}]),t}(a.Component);function N(e,t){return t.participant.find(function(t){return t.actor.reference.includes(e)})}function w(e){return e.actor.display}function g(e){var t=e.actor.reference;return"".concat(C,"/").concat(t)}var I=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"renderParticipant",value:function(e,t,n){var a=N(e,n);return a?r.a.createElement("tr",null,r.a.createElement("td",null,t),r.a.createElement("td",null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:g(a)},w(a))),r.a.createElement("td",null)):null}},{key:"renderPatient",value:function(e){return this.renderParticipant(j.Patient,"Customer",e)}},{key:"renderPractitioner",value:function(e){return this.renderParticipant(j.Practitioner,"Practitioner",e)}},{key:"renderLocation",value:function(e,t){var n=N(j.Location,e);return n?r.a.createElement("tr",null,r.a.createElement("td",null,"Room"),r.a.createElement("td",null,w(n)),r.a.createElement("td",null,r.a.createElement(E.a,{className:"",size:"sm",color:"info",onClick:t},"Show on Map"))):null}},{key:"renderTime",value:function(e){return e&&e.start?r.a.createElement("tr",null,r.a.createElement("td",null,"Time"),r.a.createElement("td",null,e.start.toLocaleString()),r.a.createElement("td",null)):null}},{key:"render",value:function(){var e=this.props,t=e.appointment,n=e.onClose,a=e.onShowDirections;return r.a.createElement("div",{className:"appointment-guide"},r.a.createElement(b,{title:r.a.createElement("span",null,"Appointment"),actionButtonText:"Close",onAction:n},r.a.createElement("table",{className:"table text-left"},r.a.createElement("tbody",null,this.renderPatient(t),this.renderTime(t),this.renderPractitioner(t),this.renderLocation(t,a)))))}}]),t}(a.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.center,t=[e[0]-200,e[1]-200],n="translate(".concat(t[0]," ").concat(t[1],")");return r.a.createElement("path",{transform:n,strokeWidth:"2",fill:"none",stroke:"#007bff",d:"M200 200 S 200.5 200 200.9 200.1 201.3 200.3 201.8 200.5 202.1 200.8 202.5 201.1 202.8 201.5 203.1 202 203.3 202.5 203.4 203 203.5 203.6 203.6 204.2 203.5 204.8 203.4 205.4 203.2 206 203 206.7 202.7 207.3 202.3 207.9 201.8 208.5 201.2 209.1 200.6 209.6 199.9 210.1 199.2 210.5 198.3 210.8 197.5 211.1 196.5 211.4 195.6 211.5 194.6 211.6 193.5 211.6 192.4 211.4 191.4 211.2 190.3 210.9 189.2 210.5 188.1 210 187.1 209.4 186 208.7 185 207.9 184.1 207 183.2 206 182.4 204.9 181.6 203.7 181 202.4 180.4 201.1 179.9 199.6 179.5 198.2 179.2 196.6 179.1 195 179.1 193.4 179.2 191.8 179.4 190.1 179.8 188.4 180.3 186.7 180.9 185.1 181.7 183.4 182.6 181.8 183.7 180.3 184.9 178.8 186.2 177.4 187.6 176 189.2 174.8 190.9 173.6 192.7 172.6 194.6 171.7 196.6 170.9 198.7 170.3 200.8 169.8 203 169.5 205.3 169.4 207.6 169.4 209.9 169.6 212.2 169.9 214.5 170.5 216.9 171.2 219.1 172.1 221.4 173.2 223.6 174.5 225.7 175.9 227.7 177.5 229.6 179.3 231.4 181.2 233.1 183.3 234.6 185.6 236 188 237.2 190.5 238.2 193.1 239.1 195.8 239.7 198.6 240.2 201.4 240.4 204.4 240.5 207.3 240.3 210.3 239.9 213.4 239.2 216.4 238.4 219.3 237.3 222.3 236 225.2 234.4 228 232.7 230.7 230.7 233.3 228.5 235.7 226.1 238.1 223.6 240.2 220.8 242.2 217.9 244 214.8 245.7 211.6 247 208.3 248.2 204.9 249.1 201.3 249.8 197.7 250.2 194.1 250.4 190.4 250.3 186.7 249.9 183 249.3 179.3 248.3 175.7 247.1 172.2 245.7 168.7 243.9 165.3 241.9 162.1 239.7 159 237.1 156.1 234.4 153.4 231.4 150.8 228.2 148.5 224.8 146.4 221.2 144.6 217.4 143.1 213.5 141.8 209.5 140.8 205.3 140.1 201.1 139.7 196.8 139.7 192.4 139.9 188 140.5 183.6 141.4 179.2 142.6 174.9 144.2 170.6 146 166.4 148.2 162.4 150.7 158.5 153.5 154.7 156.5 151.2 159.9 147.8 163.5 144.7 167.3 141.8 171.4 139.2 175.7 136.9 180.1 134.9 184.7 133.1 189.5 131.8 194.4 130.7 199.4 130.1 204.4 129.7 209.5 129.8 214.6 130.2 219.7 131 224.8 132.2 229.8 133.7 234.7 135.6 239.4 137.9 244.1 140.5 248.5 143.4 252.8 146.7 256.8 150.4 260.6 154.3 264.1 158.5 267.3 163 270.2 167.7 272.8 172.7 275 177.9 276.8 183.2 278.3 188.7 279.3 194.3 280 200 280.2 205.8 280.1 211.6 279.5 217.4 278.5 223.2 277 228.9 275.2 234.6 272.9 240.1 270.2 245.5 267.2 250.7 263.7 255.6 259.9 260.4 255.7 264.9 251.1 269.1 246.3 272.9 241.2 276.5 235.8 279.7 230.1 282.4 224.2 284.8 218.2 286.8 212 288.3 205.6 289.4 199.2 290.1 192.7 290.2 186.2 289.9 179.7 289.1 173.2 287.9 166.8 286.2 160.5 284 154.3 281.3 148.4 278.2 142.6 274.7 137.1 270.7 131.9 266.3 126.9 261.6 122.3 256.4 118.1 251 114.2 245.2 110.8 239.1 107.8 232.7 105.3 226.1 103.2 219.4 101.6 212.4 100.5 205.4 99.9 198.2 99.8 191 100.3 183.7 101.3 176.5 102.8 169.4 104.8 162.3 107.3 155.4 110.4 148.6 113.9 142.1 117.9 135.7 122.4 129.7 127.3 124 132.7 118.6 138.4 113.6 144.6 109.1 151 104.9 157.8 101.2 164.8 98 172.1 95.3 179.6 93.1 187.3 91.5 195.1 90.4 203 89.9 210.9 89.9 218.9 90.5 226.8 91.7 234.6 93.5 242.3 95.8 249.9 98.7 257.3 102.2 264.4 106.1 271.3 110.6 277.8 115.7 284 121.1 289.8 127.1 295.1 133.4 300.1 140.2 304.5 147.3 308.4 154.8 311.8 162.5 314.7 170.6 316.9 178.8 318.6 187.2 319.7 195.7 320.2 204.3 320 213 319.2 221.6 317.8 230.2 315.7 238.8 313.1 247.1 309.8 255.3 306 263.3 301.5 271 296.5 278.4 291 285.4 284.9 292.1 278.4 298.3 271.4 304 264 309.3 256.2 314 248 318.2 239.6 321.7 230.8 324.7 221.9 327 212.8 328.7 203.5 329.8 194.2 330.2 184.8 329.9 175.4 328.9 166.1 327.2 156.9 324.9 147.9 321.9 139.1 318.3 130.5 314 122.2 309.1 114.3 303.6 106.8 297.5 99.7 290.8 93.1 283.7 87 276.1 81.4 268 76.4 259.5 72.1 250.7 68.3 241.5 65.2 232 62.8 222.4 61.1 212.5 60.1 202.5 59.9 192.4 60.3 182.4 61.5 172.3 63.4 162.3 66 152.4 69.4 142.8 73.4 133.3 78.1 124.2 83.5 115.4 89.5 106.9 96.2 98.9 103.4 91.4 111.1 84.4 119.4 77.9 128.2 72 137.3 66.8 146.9 62.2 156.8 58.3 166.9 55.2 177.3 52.7 187.9 51 198.7 50.1 209.4 49.9 220.3 50.5 231 51.9 241.7 54.1 252.2 57 262.5 60.7 272.6 65.1 282.3 70.3 291.7 76.2 300.6 82.7 309.1 89.9 317 97.7 324.4 106.1 331.2 115 337.4 124.5 342.9 134.3 347.7 144.6 351.7 155.2 355 166.1 357.4 177.2 359.1 188.6 359.1 188.6"})}}]),t}(a.Component),A=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.config,a=e.onClose,c=n.canvas,o=c.width,i=c.height,l=[.5*o,.5*i];return r.a.createElement("div",{className:"guide"},r.a.createElement(b,{title:t,actionButtonText:"Close",onAction:a},r.a.createElement("svg",{viewBox:"0 0 ".concat(o," ").concat(i)},r.a.createElement(T,{center:l}))))}}]),t}(a.Component),P=n(29),_={CHECK_IN:"CHECK_IN",APPOINTMENT_NOT_FOUND:"APPOINTMENT_NOT_FOUND",CHECKED_IN:"CHECKED_IN",CHECKED_IN_MAP:"CHECKED_IN_MAP"},x=function(e){function t(){var e,n;return Object(s.a)(this,t),(n=Object(h.a)(this,Object(m.a)(t).call(this))).renderCheckIn=function(e){var t=e.isLoading,n=e.onCheckIn;return r.a.createElement(k,{isLoading:t,onCheckIn:n})},n.renderAppointmentNotFound=function(e){var t=e.onClose;return r.a.createElement(y,{onClose:t})},n.renderAppointment=function(e){var t=e.appointment,n=e.onClose,a=e.onShowMap;return r.a.createElement(I,{appointment:t,onClose:n,onShowDirections:a})},n.renderMap=function(e){e.room;var t=e.onClose;return r.a.createElement(A,{title:r.a.createElement("span",null,"Location"),config:P,onClose:t})},n.STATUS_TO_RENDERER=(e={},Object(f.a)(e,_.CHECK_IN,n.renderCheckIn),Object(f.a)(e,_.APPOINTMENT_NOT_FOUND,n.renderAppointmentNotFound),Object(f.a)(e,_.CHECKED_IN,n.renderAppointment),Object(f.a)(e,_.CHECKED_IN_MAP,n.renderMap),e),n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"renderComponent",value:function(e){var t=e.status,n=this.STATUS_TO_RENDERER[t];if(!n)throw new Error("Invalid status ".concat(t));return n(e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},this.renderComponent(this.props))}}]),t}(a.Component),S=n(30),D=n.n(S);function M(e){return L.apply(this,arguments)}function L(){return(L=Object(u.a)(l.a.mark(function e(t){var n,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.a.get(t).catch(function(e){return console.log("Failed to find resource ".concat(t)),null});case 2:if(n=e.sent){e.next=5;break}return e.abrupt("return",null);case 5:return a=n.data,e.abrupt("return",1===a.entry.length?a.entry[0].resource:null);case 7:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function H(e){return K.apply(this,arguments)}function K(){return(K=Object(u.a)(l.a.mark(function e(t){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(C,"/").concat(j.Patient,"?identifier=").concat(t),e.abrupt("return",M(n));case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function B(e){return F.apply(this,arguments)}function F(){return(F=Object(u.a)(l.a.mark(function e(t){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(C,"/").concat(j.Appointment,"?patient=").concat(t),e.abrupt("return",M(n));case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function R(e){return U.apply(this,arguments)}function U(){return(U=Object(u.a)(l.a.mark(function e(t){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H(t);case 2:if(n=e.sent){e.next=5;break}return e.abrupt("return",null);case 5:return e.next=7,B(n.id);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var z={status:_.CHECK_IN,isLoading:!1,appointment:null},W=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state=z,n.handleCheckIn=function(){var e=Object(u.a)(l.a.mark(function e(t){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({isLoading:!0}),e.next=3,R(t);case 3:a=e.sent,n.setState({status:a?_.CHECKED_IN:_.APPOINTMENT_NOT_FOUND,appointment:a,isLoading:!1});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.handleShowMap=function(){n.setState({status:_.CHECKED_IN_MAP})},n.reset=function(){n.setState(z)},n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(x,Object.assign({},this.state,{onCheckIn:this.handleCheckIn,onClose:this.reset,onShowMap:this.handleShowMap})))}}]),t}(a.Component);n(61),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,2,1]]]);
//# sourceMappingURL=main.65a16b65.chunk.js.map