import{j as e,r as c,a as N}from"./index-ZF5f7FLR.js";import{P}from"./ProductCard-9n8R_5yO.js";import k from"./Loader-BR7nur_Z.js";import{G as S}from"./iconBase-BX3GeJ5U.js";const w=({category:n,categoryFilterList:o,handleClickCategory:s,handleClickSubCategory:i,subCategory:r,subCategoryFilterList:p,handleClearFilter:l,filteredProductLoading:u})=>e.jsxs("div",{className:"category_filter_main_container",children:[e.jsxs("div",{className:"filter_top_container",children:[e.jsx("h1",{children:"Filters"}),e.jsx("div",{className:"filter_top_button_container",children:(n||r)&&e.jsx("button",{onClick:l,disabled:u,children:u?"Applying....":"Clear Filters"})})]}),e.jsxs("div",{className:"category_filter_container",children:[e.jsx("p",{children:"Categories"}),o.map((a,d)=>e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:n===a,onChange:()=>s(a)}),e.jsx("span",{children:a})]},d))]}),e.jsxs("div",{className:"category_filter_container",children:[e.jsx("p",{children:"Type"}),p.map((a,d)=>e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:r===a,onChange:()=>i(a)}),e.jsx("span",{children:a})]},d))]})]});function F(n){return S({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(n)}const L=({handleChangePage:n,totalPage:o,currentPage:s})=>e.jsx("div",{className:"pagination_button_container",children:[...Array(o)].map((i,r)=>e.jsx("button",{onClick:()=>n(r+1),className:`${r+1===s?"active":""}`,children:r+1},r+1))}),A=()=>{const[n,o]=c.useState(""),[s,i]=c.useState(""),[r,p]=c.useState(""),[l,u]=c.useState(""),[a,d]=c.useState(1),x=c.useRef(null),_=["men","women","kid"],m=["topwear","bottomwear","winterwear"],{data:h,isLoading:g}=N({featured:void 0,category:n,subCategory:s,search:r,sortby:l,page:a}),v=t=>{o(j=>j===t?"":t)},f=t=>{i(j=>j===t?"":t)},y=t=>{d(t)},C=()=>{o(""),i("")},b=t=>{t.preventDefault(),x.current&&p(x.current.value)};return c.useEffect(()=>{},[n,s,r,l]),g?e.jsx(k,{}):e.jsxs("div",{className:"collection_page_main_container",children:[e.jsx("div",{className:"collection_page_filters_container",children:e.jsx(w,{category:n,categoryFilterList:_,handleClickCategory:v,subCategory:s,subCategoryFilterList:m,handleClickSubCategory:f,handleClearFilter:C,filteredProductLoading:g})}),e.jsxs("div",{className:"collection_page_collection_container",children:[e.jsxs("div",{className:"collection_page_search_sort_container",children:[e.jsxs("form",{className:"search_container",onSubmit:b,children:[e.jsx("input",{type:"text",placeholder:"Search....",ref:x}),e.jsx("button",{type:"submit",children:e.jsx(F,{})})]}),e.jsx("div",{className:"sort_container",children:e.jsxs("select",{name:"sortby",value:l,onChange:t=>u(t.target.value),children:[e.jsx("option",{value:"",children:"Relevant"}),e.jsx("option",{value:"price",children:"Price Low to High"}),e.jsx("option",{value:"-price",children:"Price High to Low"})]})})]}),e.jsx("div",{className:"collection_page_product_container",children:h&&h.products.length>1?h.products.map(t=>e.jsx(P,{productData:t},t._id)):e.jsx("h1",{children:"No Product Found"})}),h&&e.jsx("div",{className:"collection_pagination_container",children:e.jsx(L,{handleChangePage:y,totalPage:h.totalPage,currentPage:a})})]})]})};export{A as default};
