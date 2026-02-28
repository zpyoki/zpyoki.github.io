import{_ as s,c as n,o as p,ae as e}from"./chunks/framework.Dh1jimFm.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/getting-started.md","filePath":"guide/getting-started.md","lastUpdated":1770358354000}'),l={name:"guide/getting-started.md"};function i(t,a,c,o,r,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h3 id="环境准备" tabindex="-1">环境准备 <a class="header-anchor" href="#环境准备" aria-label="Permalink to &quot;环境准备&quot;">​</a></h3><h4 id="_1-开发环境检查" tabindex="-1">1. 开发环境检查 <a class="header-anchor" href="#_1-开发环境检查" aria-label="Permalink to &quot;1. 开发环境检查&quot;">​</a></h4><p>在开始使用ENFI脚手架前，请确保您的开发环境满足以下要求：</p><p><strong>基础环境要求：</strong></p><ul><li><strong>Java</strong>: JDK 17 或更高版本</li><li><strong>Maven</strong>: 3.8 或更高版本</li><li><strong>Node.js</strong>: 20 或更高版本</li><li><strong>Git</strong>: 2.30 或更高版本</li><li><strong>数据库</strong>: OceanBase 5.7.25-OceanBase_CE-v4.3.5.0 或 Oracle 11g+</li></ul><p><strong>快速检查命令：</strong></p><p>bash</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 检查Java版本</span></span>
<span class="line"><span>java -version</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查Maven版本</span></span>
<span class="line"><span>mvn -v</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查Node.js版本</span></span>
<span class="line"><span>node -v</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查Git版本</span></span>
<span class="line"><span>git --version</span></span></code></pre></div><h4 id="_2-项目代码获取" tabindex="-1">2. 项目代码获取 <a class="header-anchor" href="#_2-项目代码获取" aria-label="Permalink to &quot;2. 项目代码获取&quot;">​</a></h4><p><strong>从Git仓库克隆</strong></p><p>bash</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 克隆脚手架项目</span></span>
<span class="line"><span>git clone https://git.enfi.com.cn/in-project/scaffolding.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入项目目录</span></span>
<span class="line"><span>cd enfi-scaffolding</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看项目结构</span></span>
<span class="line"><span>tree -L 2</span></span></code></pre></div><h3 id="项目初始化" tabindex="-1">项目初始化 <a class="header-anchor" href="#项目初始化" aria-label="Permalink to &quot;项目初始化&quot;">​</a></h3><h4 id="_1-依赖安装" tabindex="-1">1. 依赖安装 <a class="header-anchor" href="#_1-依赖安装" aria-label="Permalink to &quot;1. 依赖安装&quot;">​</a></h4><p>bash</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 后端依赖安装</span></span>
<span class="line"><span>mvn clean install -DskipTests</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 前端依赖安装</span></span>
<span class="line"><span>npm install</span></span></code></pre></div><h4 id="_2-数据库初始化" tabindex="-1">2. 数据库初始化 <a class="header-anchor" href="#_2-数据库初始化" aria-label="Permalink to &quot;2. 数据库初始化&quot;">​</a></h4><p>拉取代码后找到根目录下sql文件夹</p><p>sql</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 连接到MySQL（根据你的配置）</span></span>
<span class="line"><span>mysql -h localhost -P 3306 -u root -p</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 创建数据库</span></span>
<span class="line"><span>CREATE DATABASE enfi DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 使用数据库</span></span>
<span class="line"><span>USE enfi;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 执行初始化脚本</span></span>
<span class="line"><span># 进入项目目录执行</span></span>
<span class="line"><span>mysql -h localhost -P 3306 -u root -p enfi &lt; database/init-mysql.sql</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或者进入MySQL后执行</span></span>
<span class="line"><span>source database/init-mysql.sql;</span></span></code></pre></div><h4 id="_3-启动应用" tabindex="-1">3. 启动应用 <a class="header-anchor" href="#_3-启动应用" aria-label="Permalink to &quot;3. 启动应用&quot;">​</a></h4><p>bash</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 启动后端服务</span></span>
<span class="line"><span>mvn spring-boot:run</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动前端服务</span></span>
<span class="line"><span>npm run dev</span></span></code></pre></div>`,23)]))}const u=s(l,[["render",i]]);export{g as __pageData,u as default};
