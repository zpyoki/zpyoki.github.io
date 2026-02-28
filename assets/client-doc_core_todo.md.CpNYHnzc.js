import{_ as s,c as n,o as t,ae as p}from"./chunks/framework.Dh1jimFm.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/todo.md","filePath":"client-doc/core/todo.md","lastUpdated":1770358354000}'),e={name:"client-doc/core/todo.md"};function o(l,a,c,i,d,r){return t(),n("div",null,a[0]||(a[0]=[p(`<h3 id="待办" tabindex="-1">待办 <a class="header-anchor" href="#待办" aria-label="Permalink to &quot;待办&quot;">​</a></h3><p>目前门户待办推送逻辑为业务系统自行建表并新增（推送）/删除（撤销/结束）待办提醒 由门户待办负责人上线待办</p><p>以下为示例表结构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>REATE TABLE &quot;APPS&quot;.&quot;CUX_xxx_MESSAGE&quot; </span></span>
<span class="line"><span>   (	&quot;ID&quot; VARCHAR2(500), //id</span></span>
<span class="line"><span>	&quot;SUBJECT&quot; VARCHAR2(500),</span><span> //标题</span></span>
<span class="line"><span>	&quot;BEGIN_DATE&quot; VARCHAR2(500),</span><span> //待办生成日期</span></span>
<span class="line"><span>	&quot;URL&quot; VARCHAR2(500),</span><span> //单点跳转链接</span></span>
<span class="line"><span>	&quot;SEND_FROM&quot; VARCHAR2(500),</span><span> //由谁发送</span></span>
<span class="line"><span>	&quot;LOGIN_ID&quot; VARCHAR2(500),</span><span> //由谁接收</span></span>
<span class="line"><span>	&quot;DEL_FLAG&quot; VARCHAR2(4)//删除标识</span></span>
<span class="line"><span>   )</span></span></code></pre></div>`,4)]))}const A=s(e,[["render",o]]);export{_ as __pageData,A as default};
