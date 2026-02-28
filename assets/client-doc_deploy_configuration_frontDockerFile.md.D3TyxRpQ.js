import{_ as s,c as a,o as e,ae as p}from"./chunks/framework.Dh1jimFm.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/deploy/configuration/frontDockerFile.md","filePath":"client-doc/deploy/configuration/frontDockerFile.md","lastUpdated":1770358354000}'),o={name:"client-doc/deploy/configuration/frontDockerFile.md"};function i(l,n,t,c,r,d){return e(),a("div",null,n[0]||(n[0]=[p(`<h4 id="dockerfile-前端" tabindex="-1">dockerfile（前端） <a class="header-anchor" href="#dockerfile-前端" aria-label="Permalink to &quot;dockerfile（前端）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 基础镜像</span></span>
<span class="line"><span>FROM openapi.enfi.com.cn:30012/pixiu7/nginx:latest</span></span>
<span class="line"><span># author</span></span>
<span class="line"><span>MAINTAINER workRun</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 挂载目录</span></span>
<span class="line"><span>VOLUME /home/workRun/projects/workRun-ui</span></span>
<span class="line"><span># 创建目录</span></span>
<span class="line"><span>RUN mkdir -p /home/workRun/projects/workRun-ui</span></span>
<span class="line"><span># 指定路径</span></span>
<span class="line"><span>WORKDIR /home/workRun/projects/workRun-ui</span></span>
<span class="line"><span># 复制conf文件到路径</span></span>
<span class="line"><span>COPY ./deploy/nginx.conf /etc/nginx/nginx.conf</span></span>
<span class="line"><span># 复制html文件到路径</span></span>
<span class="line"><span>COPY ./dist /home/workRun/projects/workRun-ui</span></span></code></pre></div>`,2)]))}const k=s(o,[["render",i]]);export{f as __pageData,k as default};
