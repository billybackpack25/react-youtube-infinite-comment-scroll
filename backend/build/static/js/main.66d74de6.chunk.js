(this["webpackJsonpreact-youtube-infinite-comment-scroll"]=this["webpackJsonpreact-youtube-infinite-comment-scroll"]||[]).push([[0],[,,,,,,,function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),a=n(8),o=n.n(a),r=(n(13),n(14),n(2)),i=(n(7),n(0)),u=c.a.createContext();function l(){return c.a.useContext(u)}function d(e){var t=c.a.useState(),n=Object(r.a)(t,2),s=n[0],a=n[1],o=c.a.useState(10),l=Object(r.a)(o,2),d=l[0],j=l[1],m=c.a.useState(!1),f=Object(r.a)(m,2),b={messageReset:f[0],setMessageReset:f[1],messageUpdate:s,setMessageUpdate:a,commentIncrement:d,setCommentIncrement:j};return Object(i.jsx)(u.Provider,{value:b,children:e.children})}var j=function(e){var t=l(),n=t.setMessageReset,s=t.setCommentIncrement,a=c.a.useRef(null),o=c.a.useState(!1),u=Object(r.a)(o,2),d=u[0],j=u[1],m=c.a.useState(!1),f=Object(r.a)(m,2),b=f[0],O=f[1],h=c.a.useState(!0),p=Object(r.a)(h,2),x=p[0],g=p[1];return Object(i.jsxs)("form",{children:[Object(i.jsxs)("section",{className:"commentBox",children:[Object(i.jsx)("input",{autoFocus:e.autoFocus,type:"text",placeholder:"Add a public comment...",ref:a,onFocus:function(){j(!0),O(!0)},onBlur:function(){j(!1)},onKeyUp:function(e){var t=e.target.value;g(!t)}}),d&&Object(i.jsx)("div",{className:"commentLine"})]}),b&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("button",{className:"commentButton sendButton",disabled:x,onClick:function(e){e.preventDefault(),fetch("/new-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageData:a.current.value})}).then((function(){n((function(e){return!e})),s(10),a.current.value="",g(!0)}))},children:"COMMENT"}),Object(i.jsx)("button",{className:"commentButton",style:{color:"grey",backgroundColor:"transparent"},onClick:function(){O(!1),a.current.value=""},children:"CANCEL"})]})]})},m=n(4),f=(n(16),function(e){var t=l().setMessageUpdate,n=x(),s=c.a.useRef(null),a=c.a.useState(!1),o=Object(r.a)(a,2),u=o[0],d=o[1],j=c.a.useState(!1),m=Object(r.a)(j,2),f=m[0],b=m[1],O=c.a.useState(!0),h=Object(r.a)(O,2),p=h[0],g=h[1];return Object(i.jsxs)("form",{children:[Object(i.jsxs)("section",{className:"commentBox",children:[Object(i.jsx)("input",{autoFocus:e.autoFocus,type:"text",placeholder:"Add a public comment...",ref:s,onFocus:function(){d(!0),b(!0)},onBlur:function(){d(!1)},onKeyUp:function(e){var t=e.target.value;g(!t)}}),u&&Object(i.jsx)("div",{className:"commentLine"})]}),f&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("button",{className:"commentButton sendButton",disabled:p,onClick:function(n){n.preventDefault(),fetch("/new-sub-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.useKey,messageData:s.current.value})}).then((function(){t([1,e.useKey]),s.current.value="",g(!1)}))},children:"COMMENT"}),Object(i.jsx)("button",{className:"commentButton",style:{color:"grey",backgroundColor:"transparent"},onClick:function(){b(!1),n()},children:"CANCEL"})]})]})}),b=function(e){var t=l().setMessageUpdate,n=x();console.log(n);var s=c.a.useRef(null),a=c.a.useState(!1),o=Object(r.a)(a,2),u=o[0],d=o[1],j=c.a.useState(!1),m=Object(r.a)(j,2),f=m[0],b=m[1],O=c.a.useState(!0),h=Object(r.a)(O,2),p=h[0],g=h[1];return Object(i.jsxs)("form",{children:[Object(i.jsxs)("section",{className:"commentBox",children:[Object(i.jsx)("input",{autoFocus:e.autoFocus,type:"text",placeholder:"Add a public comment...",ref:s,onFocus:function(){d(!0),b(!0)},onBlur:function(){d(!1)},onKeyUp:function(e){var t=e.target.value;g(!t)}}),u&&Object(i.jsx)("div",{className:"commentLine"})]}),f&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("button",{className:"commentButton sendButton",disabled:p,onClick:function(n){n.preventDefault(),fetch("/new-sub-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.parentKey,messageData:s.current.value})}).then((function(){t([1,e.useKey])}))},children:"COMMENT"}),Object(i.jsx)("button",{className:"commentButton",style:{color:"grey",backgroundColor:"transparent"},onClick:function(){b(!1),n()},children:"CANCEL"})]})]})},O=c.a.createContext();var h=function(e){var t=l().setMessageUpdate,n=c.a.useRef(),s=c.a.useRef(),a=c.a.useState(!1),o=Object(r.a)(a,2),u=o[0],d=o[1],j=function(){d((function(e){return!e}))},m=!1,f=e.likes;return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("section",{className:"messageContainer",children:[Object(i.jsx)("div",{className:"messageUser",children:e.user}),Object(i.jsx)("i",{className:"fas fa-user-circle"}),Object(i.jsx)("div",{className:"messageText",children:e.message}),Object(i.jsxs)("section",{className:"messageIconsContainer",children:[Object(i.jsx)("i",{className:"fas fa-thumbs-up",ref:n,onClick:function(){(m=!m)?(f++,n.current.style.color="#4688de"):(f--,n.current.style.color="grey"),s.current.innerHTML=f,fetch("/update-sub-like",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.parentKey,subId:e.subId,likes:f})})}}),Object(i.jsx)("div",{ref:s,children:e.likes}),Object(i.jsx)("i",{className:"fas fa-thumbs-down"}),"Super User"!==e.user?Object(i.jsx)("div",{onClick:j,children:"REPLY"}):Object(i.jsx)("div",{onClick:function(){fetch("/delete-sub-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.parentKey,subId:e.subId})}).then((function(){t([1,e.parentKey])}))},children:"DELETE"})]}),Object(i.jsx)(O.Provider,{value:j,children:u&&Object(i.jsx)(b,{autoFocus:!0,parentKey:e.parentKey})})]})})},p=c.a.createContext();function x(){return c.a.useContext(p)}var g=function(e){var t=l().setMessageUpdate,n=c.a.useRef(),s=c.a.useRef(),a=c.a.useState(!1),o=Object(r.a)(a,2),u=o[0],d=o[1],j=c.a.useState(!1),m=Object(r.a)(j,2),b=m[0],O=m[1],x=function(){O((function(e){return!e}))},g=Object(i.jsx)("i",{className:"fas fa-caret-down"});g=u?Object(i.jsx)("i",{className:"fas fa-caret-up"}):Object(i.jsx)("i",{className:"fas fa-caret-down"});var y=!1,v=e.likes;return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("section",{className:"messageContainer",children:[Object(i.jsx)("div",{className:"messageUser",children:e.user}),Object(i.jsx)("i",{className:"fas fa-user-circle"}),Object(i.jsx)("div",{className:"messageText",children:e.message}),Object(i.jsxs)("section",{className:"messageIconsContainer",children:[Object(i.jsx)("i",{className:"fas fa-thumbs-up",ref:n,onClick:function(){(y=!y)?(v++,n.current.style.color="#4688de"):(v--,n.current.style.color="grey"),s.current.innerHTML=v,fetch("/update-like",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.useKey,likes:v})})}}),Object(i.jsx)("div",{ref:s,children:e.likes}),Object(i.jsx)("i",{className:"fas fa-thumbs-down"}),e.editable?Object(i.jsx)("div",{onClick:function(){console.log("useKey: ".concat(e.useKey)),fetch("/delete-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e.useKey})}).then((function(){t([2,e.useKey])}))},children:"DELETE"}):Object(i.jsx)("div",{onClick:x,children:"REPLY"})]}),Object(i.jsx)(p.Provider,{value:x,children:b&&Object(i.jsx)(f,{useKey:e.useKey,autoFocus:!0})}),e.replies.length>0&&Object(i.jsxs)("section",{className:"arrowReplies",onClick:function(){d((function(e){return!e}))},children:[g,Object(i.jsxs)("div",{children:["View ",e.replies.length," replies"]})]}),u&&Object(i.jsx)("section",{className:"subMessages",children:e.replies.map((function(t){return Object(i.jsx)(h,{parentKey:e.useKey,subId:t._id,user:t.user,message:t.message,likes:t.likes},Math.random())}))})]})})},y=function(e){var t=l(),n=t.messageReset,s=t.commentIncrement,a=t.setCommentIncrement,o=t.messageUpdate,u=c.a.useRef(s),d=c.a.useState([]),j=Object(r.a)(d,2),f=j[0],b=j[1],O=c.a.useState(!0),h=Object(r.a)(O,2),p=h[0],x=h[1];c.a.useEffect((function(){x(!0),fetch("/get-data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({limitNum:10})}).then((function(e){return e.json()})).then((function(e){b(e)}))}),[n]),c.a.useEffect((function(){o&&(1===o[0]?fetch("/update-comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({commentId:o[1]})}).then((function(e){return e.json()})).then((function(e){!function(e){var t=Object(m.a)(f);if(e){var n=t.findIndex((function(t){return t._id===e._id}));t.splice(n,1,e),b(t)}}(e)})):2===o[0]&&function(){var e=Object(m.a)(f),t=e.findIndex((function(e){return e._id===o[1]}));e.splice(t,1),b(e)}())}),[o]);var y=c.a.useRef(new IntersectionObserver((function(e){e[0].isIntersecting&&fetch("/get-more-data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({commentIncrement:u.current})}).then((function(e){return e.json()})).then((function(e){e.length>0?setTimeout((function(){b((function(t){return[].concat(Object(m.a)(t),Object(m.a)(e))}))}),500):setTimeout((function(){x(!1)}),500),a((function(t){return t+e.length}))}))})),{threshold:1});c.a.useEffect((function(){u.current=s}),[s]);var v=c.a.useState(null),N=Object(r.a)(v,2),C=N[0],S=N[1];return c.a.useEffect((function(){var e=C,t=y.current;return e&&t.observe(e),function(){e&&t.unobserve(e)}}),[C]),Object(i.jsxs)(i.Fragment,{children:[f.map((function(e){return Object(i.jsx)(g,{useKey:e._id,user:e.user,editable:e.editable,message:e.message,likes:e.likes,replies:e.replies},e._id)})),f.length>9&&p?Object(i.jsx)("div",{className:"bottomBar",ref:S,children:Object(i.jsx)("div",{className:"loader"})}):null]})};var v=function(){return Object(i.jsx)(d,{children:Object(i.jsxs)("div",{className:"ColHolder",children:[Object(i.jsx)(j,{autoFocus:!1}),Object(i.jsx)(y,{})]})})};o.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(v,{})}),document.getElementById("root"))}],[[17,1,2]]]);
//# sourceMappingURL=main.66d74de6.chunk.js.map