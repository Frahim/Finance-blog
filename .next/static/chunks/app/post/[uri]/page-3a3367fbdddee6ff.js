(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[263],{8060:function(e,t,s){Promise.resolve().then(s.bind(s,3561)),Promise.resolve().then(s.bind(s,6917)),Promise.resolve().then(s.t.bind(s,8173,23)),Promise.resolve().then(s.t.bind(s,231,23))},3561:function(e,t,s){"use strict";var r=s(7437);s(2265);var i=s(3463),n=s(9243);s(7138),t.default=e=>{let{content:t}=e;return(0,r.jsx)("div",{children:(0,i.ZP)(t,{replace:e=>{var t;let{name:s,attribs:i,children:a}=e;if("figure"===s&&(null===(t=i.class)||void 0===t?void 0:t.includes("wp-block-gallery"))){let e=a.filter(e=>"figure"===e.name&&"img"===e.children[0].name).map(e=>{let t=e.children[0];return{src:t.attribs.src,alt:t.attribs.alt||"",width:t.attribs.width?parseInt(t.attribs.width):600,height:t.attribs.height?parseInt(t.attribs.height):400}});return(0,r.jsx)("div",{className:"my-3",children:(0,r.jsx)(n.Z,{photos:e,columns:2})})}}})})}},6917:function(e,t,s){"use strict";var r=s(7437),i=s(2265),n=s(6463);t.default=()=>{let[e,t]=(0,i.useState)(""),s=(0,n.useRouter)();return(0,r.jsxs)("div",{className:"searchForm",children:[(0,r.jsx)("h2",{className:"wp-block-heading",children:"Search"}),(0,r.jsxs)("form",{onSubmit:t=>{t.preventDefault(),e.trim()&&s.push("/search?query=".concat(e))},className:"search-form",children:[(0,r.jsx)("input",{type:"text",placeholder:"Search posts...",value:e,onChange:e=>t(e.target.value),className:"search-input"}),(0,r.jsx)("button",{type:"submit",className:"search-button",children:(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"19",viewBox:"0 0 18 19",fill:"none",children:[(0,r.jsx)("path",{d:"M8.25 14.3229C11.5637 14.3229 14.25 11.6347 14.25 8.31857C14.25 5.00245 11.5637 2.31421 8.25 2.31421C4.93629 2.31421 2.25 5.00245 2.25 8.31857C2.25 11.6347 4.93629 14.3229 8.25 14.3229Z",stroke:"#4B5563",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,r.jsx)("path",{d:"M15.7498 15.824L12.4873 12.5591",stroke:"#4B5563",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})})]})]})}}},function(e){e.O(0,[110,173,231,412,971,23,744],function(){return e(e.s=8060)}),_N_E=e.O()}]);