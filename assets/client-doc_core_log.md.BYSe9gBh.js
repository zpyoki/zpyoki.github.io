import{_ as n,c as s,o as e,ae as t}from"./chunks/framework.Dh1jimFm.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/log.md","filePath":"client-doc/core/log.md","lastUpdated":1770358354000}'),p={name:"client-doc/core/log.md"};function o(l,a,i,c,r,d){return e(),s("div",null,a[0]||(a[0]=[t(`<h3 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h3><p>基于<code>EnhancedApiLogAspect</code>日志切面实现<strong>配置驱动、注解触发、脱敏合规</strong>的接口日志记录，以下是贴合项目实际的完整配置、使用规范及效果说明，全程适配项目现有包结构与开发习惯。</p><h4 id="核心日志配置" tabindex="-1">核心日志配置 <a class="header-anchor" href="#核心日志配置" aria-label="Permalink to &quot;核心日志配置&quot;">​</a></h4><p>采用<code>yaml</code>格式精准配置日志级别，<strong>root 根级别为 INFO</strong>保证生产环境日志简洁，<strong>com.enfi 包统一 DEBUG</strong>满足业务模块调试需求，<strong>日志切面单独指定级别</strong>实现日志粒度精准控制，直接复制到<code>application.yml</code>即可生效。</p><p>yaml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 项目实际日志配置 - 分级管控，精准粒度</span></span>
<span class="line"><span>logging:</span></span>
<span class="line"><span>  # 日志级别核心配置</span></span>
<span class="line"><span>  level:</span></span>
<span class="line"><span>    root: INFO                # 根日志级别，默认仅输出INFO及以上（生产环境基础配置）</span></span>
<span class="line"><span>    com.enfi: DEBUG           # 项目业务包统一级别，输出DEBUG/INFO/WARN/ERROR（开发调试核心）</span></span>
<span class="line"><span>    # 日志切面精准级别配置 - 核心控制，配置什么级别输出什么级别（推荐开发DEBUG/生产INFO）</span></span>
<span class="line"><span>    com.enfi.framework.aspectj.EnhancedApiLogAspect: DEBUG</span></span></code></pre></div><h3 id="配置说明" tabindex="-1">配置说明 <a class="header-anchor" href="#配置说明" aria-label="Permalink to &quot;配置说明&quot;">​</a></h3><ol><li>开发环境推荐切面级别设为<code>DEBUG</code>/<code>TRACE</code>，可查看完整的请求入参、响应出参，便于问题排查；</li><li>生产环境推荐切面级别设为<code>INFO</code>，仅记录核心请求和异常日志，减少日志存储开销，保证性能；</li><li>日志级别遵循<code>TRACE &lt; DEBUG &lt; INFO &lt; WARN &lt; ERROR</code>规则，高级别会自动屏蔽低级别日志。</li></ol><h4 id="日志级别定义" tabindex="-1">日志级别定义 <a class="header-anchor" href="#日志级别定义" aria-label="Permalink to &quot;日志级别定义&quot;">​</a></h4><p>结合项目开发、测试、生产多环境需求，定义各日志级别的<strong>使用场景</strong>和<strong>输出粒度</strong>，统一团队使用标准，避免日志冗余或缺失。</p><table tabindex="0"><thead><tr><th style="text-align:center;">日志级别</th><th style="text-align:center;">适用场景</th><th style="text-align:center;">输出粒度</th></tr></thead><tbody><tr><td style="text-align:center;">TRACE</td><td style="text-align:center;">本地开发 / 问题定位</td><td style="text-align:center;">极细粒度，含<strong>完整 URL 参数 + 请求体 + 响应体</strong>、请求 ID、用户、IP 等所有信息</td></tr><tr><td style="text-align:center;">DEBUG</td><td style="text-align:center;">测试环境 / 开发联调</td><td style="text-align:center;">调试粒度，含核心请求信息、脱敏后响应体、接口耗时，满足常规调试</td></tr><tr><td style="text-align:center;">INFO</td><td style="text-align:center;">生产环境 / 核心业务</td><td style="text-align:center;">核心粒度，仅记录<strong>关键业务操作</strong>（POST/PUT/DELETE 等）的请求信息，无响应体</td></tr><tr><td style="text-align:center;">WARN</td><td style="text-align:center;">全环境 / 非致命异常</td><td style="text-align:center;">异常粒度，记录业务异常（如参数校验失败、业务规则不满足），无堆栈信息</td></tr><tr><td style="text-align:center;">ERROR</td><td style="text-align:center;">全环境 / 致命异常</td><td style="text-align:center;">错误粒度，记录系统异常（如空指针、数据库异常），<strong>强制输出完整堆栈</strong>，保证问题可追溯</td></tr></tbody></table><h4 id="自定义-apilog-注解" tabindex="-1">自定义 @ApiLog 注解 <a class="header-anchor" href="#自定义-apilog-注解" aria-label="Permalink to &quot;自定义 @ApiLog 注解&quot;">​</a></h4><p>注解已在<code>com.enfi.common.annotation</code>包下定义，<strong>仅作用于接口方法</strong>，支持自定义操作描述，标注后自动触发日志切面，无需额外代码开发。</p><p>java</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.enfi.common.annotation;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.lang.annotation.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 接口日志注解【项目实际生效版本】</span></span>
<span class="line"><span> * 标注在Controller方法上，自动开启标准化请求/响应/异常日志记录</span></span>
<span class="line"><span> * 敏感信息自动脱敏，日志级别由配置文件统一控制</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Target(ElementType.METHOD)  // 仅作用于方法</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME) // 运行时生效，切面可解析</span></span>
<span class="line"><span>@Documented                 // 生成API文档时保留注解信息</span></span>
<span class="line"><span>public @interface ApiLog {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 操作描述（必填，统一规范）</span></span>
<span class="line"><span>     * 示例：@ApiLog(&quot;用户登录&quot;)、@ApiLog(&quot;新增系统角色&quot;)、@ApiLog(&quot;删除部门信息&quot;)</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String value() default &quot;接口调用&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="注解使用规范" tabindex="-1">注解使用规范 <a class="header-anchor" href="#注解使用规范" aria-label="Permalink to &quot;注解使用规范&quot;">​</a></h4><ol><li>操作描述需<strong>简洁明了</strong>，体现接口实际业务功能，避免无意义描述；</li><li>所有对外提供的接口（Controller 方法）<strong>必须标注</strong>，保证日志链路完整；</li><li>内部调用方法无需标注，避免日志冗余。</li></ol><h4 id="实际使用案例" tabindex="-1">实际使用案例 <a class="header-anchor" href="#实际使用案例" aria-label="Permalink to &quot;实际使用案例&quot;">​</a></h4><p>结合项目现有<code>AjaxResult</code>统一返回值、<code>JSONObject</code>入参、<code>@Operation</code>接口文档注解的开发习惯，以下是<strong>用户登录、新增角色</strong>两个典型接口的实际使用示例，直接参考即可。</p><h4 id="示例-1-用户登录接口-post-请求-关键业务" tabindex="-1">示例 1：用户登录接口（POST 请求 / 关键业务） <a class="header-anchor" href="#示例-1-用户登录接口-post-请求-关键业务" aria-label="Permalink to &quot;示例 1：用户登录接口（POST 请求 / 关键业务）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.enfi.admin.system.controller;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.enfi.common.annotation.ApiLog;</span></span>
<span class="line"><span>import com.enfi.common.core.domain.AjaxResult;</span></span>
<span class="line"><span>import io.swagger.v3.oas.annotations.Operation;</span></span>
<span class="line"><span>import io.swagger.v3.oas.annotations.tags.Tag;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.PostMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RequestBody;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"><span>import com.alibaba.fastjson2.JSONObject;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>@RequestMapping(&quot;/system/login&quot;)</span></span>
<span class="line"><span>@Tag(name = &quot;用户管理&quot;, description = &quot;系统用户登录相关接口&quot;)</span></span>
<span class="line"><span>public class SysLoginController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 用户登录接口【项目实际开发风格】</span></span>
<span class="line"><span>     * 标注@ApiLog指定操作描述，自动触发标准化日志</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @ApiLog(&quot;系统用户登录&quot;) // 操作描述贴合业务，必填</span></span>
<span class="line"><span>    @PostMapping</span></span>
<span class="line"><span>    @Operation(summary = &quot;用户登录&quot;, description = &quot;账号密码登录，返回token令牌&quot;)</span></span>
<span class="line"><span>    public AjaxResult login(@RequestBody JSONObject jsonObject) {</span></span>
<span class="line"><span>        // 业务逻辑：账号密码校验、生成token、用户信息缓存</span></span>
<span class="line"><span>        String token = &quot;eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.xxxx&quot;;</span></span>
<span class="line"><span>        return AjaxResult.success(&quot;登录成功&quot;, token);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="示例-2-新增系统角色接口-post-请求-数据操作" tabindex="-1">示例 2：新增系统角色接口（POST 请求 / 数据操作） <a class="header-anchor" href="#示例-2-新增系统角色接口-post-请求-数据操作" aria-label="Permalink to &quot;示例 2：新增系统角色接口（POST 请求 / 数据操作）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.enfi.admin.system.controller;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.enfi.common.annotation.ApiLog;</span></span>
<span class="line"><span>import com.enfi.common.core.domain.AjaxResult;</span></span>
<span class="line"><span>import com.enfi.admin.system.domain.SysRole;</span></span>
<span class="line"><span>import io.swagger.v3.oas.annotations.Operation;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.PostMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RequestBody;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>@RequestMapping(&quot;/system/role&quot;)</span></span>
<span class="line"><span>public class SysRoleController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ApiLog(&quot;新增系统角色&quot;) // 操作描述明确数据操作类型</span></span>
<span class="line"><span>    @PostMapping</span></span>
<span class="line"><span>    @Operation(summary = &quot;新增角色&quot;, description = &quot;添加系统角色，包含角色名称、权限标识等&quot;)</span></span>
<span class="line"><span>    public AjaxResult addRole(@RequestBody SysRole sysRole) {</span></span>
<span class="line"><span>        // 业务逻辑：角色信息校验、插入数据库</span></span>
<span class="line"><span>        return AjaxResult.success(&quot;新增角色成功&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="五、实际日志输出效果-敏感信息自动脱敏" tabindex="-1">五、实际日志输出效果（敏感信息自动脱敏） <a class="header-anchor" href="#五、实际日志输出效果-敏感信息自动脱敏" aria-label="Permalink to &quot;五、实际日志输出效果（敏感信息自动脱敏）&quot;">​</a></h4><p>基于项目<strong>实际配置（切面级别 DEBUG）</strong>，以下是不同场景的日志输出效果，<strong>完全贴合项目日志格式</strong>，包含<code>requestId</code>全链路追踪、接口耗时、用户信息、IP 地址，<strong>敏感字段（如 token/password）已自动脱敏为</strong>****，符合数据合规要求 **。</p><h4 id="场景-1-正常请求-debug-级别-开发-测试环境" tabindex="-1">场景 1：正常请求 - DEBUG 级别（开发 / 测试环境） <a class="header-anchor" href="#场景-1-正常请求-debug-级别-开发-测试环境" aria-label="Permalink to &quot;场景 1：正常请求 - DEBUG 级别（开发 / 测试环境）&quot;">​</a></h4><p>输出<strong>请求日志 + 响应日志</strong>，含脱敏后入参 / 出参、接口耗时，满足调试需求：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2026-02-06 14:30:00.123 [http-nio-9401-exec-5] DEBUG c.e.f.a.EnhancedApiLogAspect - [recordRequestLog,402] - DEBUG - 接口请求 - requestId:f3c2886965ce44bc91465927481dee64 POST /system/login 用户:未登录用户 IP:0:0:0:0:0:0:0:1 操作类型:关键业务 入参:URL参数：{} | 请求体：{&quot;username&quot;:&quot;admin&quot;,&quot;password&quot;:&quot;******&quot;}</span></span>
<span class="line"><span>2026-02-06 14:30:00.456 [http-nio-9401-exec-5] DEBUG c.e.f.a.EnhancedApiLogAspect - [recordSuccessResponse,426] - DEBUG - 接口响应成功 - requestId:f3c2886965ce44bc91465927481dee64 耗时:333ms 响应:{</span></span>
<span class="line"><span>   &quot;msg&quot;:&quot;登录成功&quot;,</span></span>
<span class="line"><span>   &quot;code&quot;:200,</span></span>
<span class="line"><span>   &quot;success&quot;:true,</span></span>
<span class="line"><span>   &quot;data&quot;:&quot;******&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="场景-2-正常请求-trace-级别-本地问题定位" tabindex="-1">场景 2：正常请求 - TRACE 级别（本地问题定位） <a class="header-anchor" href="#场景-2-正常请求-trace-级别-本地问题定位" aria-label="Permalink to &quot;场景 2：正常请求 - TRACE 级别（本地问题定位）&quot;">​</a></h4><p>输出<strong>完整极细粒度日志</strong>，含所有请求参数、脱敏后完整响应体，便于深层问题排查：</p><p>text</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2026-02-06 14:35:00.789 [http-nio-9401-exec-8] TRACE c.e.f.a.EnhancedApiLogAspect - [logLog,293] - 接口请求 - requestId:111222333 POST /system/role 用户:admin IP:127.0.0.1 操作类型:关键业务 入参:URL参数：{} | 请求体：{&quot;roleName&quot;:&quot;测试角色&quot;,&quot;roleKey&quot;:&quot;test_role&quot;,&quot;status&quot;:&quot;0&quot;,&quot;menuIds&quot;:[1,2,3]}</span></span>
<span class="line"><span>2026-02-06 14:35:00.901 [http-nio-9401-exec-8] TRACE c.e.f.a.EnhancedApiLogAspect - [logLog,293] - 接口响应成功 - requestId:111222333 耗时:112ms 响应:{</span></span>
<span class="line"><span>   &quot;msg&quot;:&quot;新增角色成功&quot;,</span></span>
<span class="line"><span>   &quot;code&quot;:200,</span></span>
<span class="line"><span>   &quot;success&quot;:true,</span></span>
<span class="line"><span>   &quot;data&quot;:null</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="场景-3-系统异常-error-级别-全环境强制输出" tabindex="-1">场景 3：系统异常 - ERROR 级别（全环境强制输出） <a class="header-anchor" href="#场景-3-系统异常-error-级别-全环境强制输出" aria-label="Permalink to &quot;场景 3：系统异常 - ERROR 级别（全环境强制输出）&quot;">​</a></h4><p>无论配置什么日志级别，<strong>系统异常均强制以 ERROR 级别输出</strong>，含<strong>完整异常类型、异常信息、堆栈轨迹</strong>，保证问题可追溯：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2026-02-06 14:40:00.234 [http-nio-9401-exec-10] DEBUG c.e.f.a.EnhancedApiLogAspect - [recordRequestLog,402] - DEBUG - 接口请求 - requestId:789abcdef12345678 POST /system/login 用户:未登录用户 IP:0:0:0:0:0:0:0:1 操作类型:关键业务 入参:URL参数：{} | 请求体：{&quot;username&quot;:&quot;test&quot;,&quot;password&quot;:&quot;******&quot;}</span></span>
<span class="line"><span>2026-02-06 14:40:00.235 [http-nio-9401-exec-10] ERROR c.e.f.a.EnhancedApiLogAspect - [recordErrorResponseLog,144] - 接口响应异常 - requestId:789abcdef12345678 POST /system/login 耗时:1ms 异常类型:NullPointerException 异常信息:调用用户缓存服务时获取连接为空 堆栈:java.lang.NullPointerException</span></span>
<span class="line"><span>	at com.enfi.admin.system.service.impl.SysUserServiceImpl.checkUser(SysUserServiceImpl.java:56)</span></span>
<span class="line"><span>	at com.enfi.admin.system.controller.SysLoginController.login(SysLoginController.java:38)</span></span>
<span class="line"><span>	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)</span></span>
<span class="line"><span>	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)</span></span></code></pre></div><h4 id="场景-4-生产环境-info-级别-核心业务记录" tabindex="-1">场景 4：生产环境 - INFO 级别（核心业务记录） <a class="header-anchor" href="#场景-4-生产环境-info-级别-核心业务记录" aria-label="Permalink to &quot;场景 4：生产环境 - INFO 级别（核心业务记录）&quot;">​</a></h4><p>仅输出<strong>关键业务操作的请求日志</strong>，无响应体，日志简洁，减少存储开销：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2026-02-06 10:00:00.567 [http-nio-8080-exec-20] INFO  c.e.f.a.EnhancedApiLogAspect - [recordRequestLog,402] - INFO - 接口请求 - requestId:9876543210abcdef POST /system/role 用户:admin IP:192.168.1.100 操作类型:关键业务</span></span>
<span class="line"><span>2026-02-06 10:05:00.123 [http-nio-8080-exec-25] INFO  c.e.f.a.EnhancedApiLogAspect - [recordRequestLog,402] - INFO - 接口请求 - requestId:abcdef1234567890 DELETE /system/role/10 用户:admin IP:192.168.1.100 操作类型:关键业务</span></span></code></pre></div><h4 id="六、敏感字段配置-项目实际生效版本" tabindex="-1">六、敏感字段配置（项目实际生效版本） <a class="header-anchor" href="#六、敏感字段配置-项目实际生效版本" aria-label="Permalink to &quot;六、敏感字段配置（项目实际生效版本）&quot;">​</a></h4><p>日志切面在<code>com.enfi.framework.aspectj.EnhancedApiLogAspect</code>中内置<strong>超全敏感字段关键词集合</strong>，覆盖<strong>密码 / 密钥、证件信息、通讯方式、金融信息、加密密钥</strong>等所有敏感类型，<strong>忽略大小写匹配</strong>，请求体 / 响应体中包含以下关键词的字段将<strong>自动脱敏为</strong>****，无需手动处理，完全符合数据合规要求 **，支持按需扩展。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.enfi.framework.aspectj;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.util.HashSet;</span></span>
<span class="line"><span>import java.util.Set;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 日志切面内敏感字段配置【项目实际生效版本】</span></span>
<span class="line"><span> * 自动脱敏规则：包含以下关键词的字段，值替换为******（忽略大小写）</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>public class EnhancedApiLogAspect {</span></span>
<span class="line"><span>    // 敏感字段关键词集合 - 覆盖全场景，支持按需扩展</span></span>
<span class="line"><span>    private static final Set&lt;String&gt; SENSITIVE_KEYWORDS = new HashSet&lt;&gt;(Arrays.asList(</span></span>
<span class="line"><span>            // 密码/密钥类（核心敏感，完全脱敏）</span></span>
<span class="line"><span>            &quot;password&quot;, &quot;pwd&quot;, &quot;pass&quot;, &quot;secret&quot;, &quot;token&quot;, &quot;key&quot;, &quot;credential&quot;, &quot;accessToken&quot;, &quot;refreshToken&quot;,</span></span>
<span class="line"><span>            // 证件类（身份信息，合规脱敏）</span></span>
<span class="line"><span>            &quot;idcard&quot;, &quot;idnumber&quot;, &quot;identity&quot;, &quot;cardno&quot;, &quot;certificate&quot;, &quot;idCardNo&quot;, &quot;license&quot;, &quot;passport&quot;,</span></span>
<span class="line"><span>            // 通讯类（个人联系方式）</span></span>
<span class="line"><span>            &quot;mobile&quot;, &quot;phone&quot;, &quot;telephone&quot;, &quot;cellphone&quot;, &quot;email&quot;, &quot;mail&quot;, &quot;phoneNumber&quot;,</span></span>
<span class="line"><span>            // 金融类（银行卡/支付信息，高敏感）</span></span>
<span class="line"><span>            &quot;bankcard&quot;, &quot;bankaccount&quot;, &quot;accountno&quot;, &quot;cardnumber&quot;, &quot;cvn&quot;, &quot;cvv&quot;, &quot;expiry&quot;, &quot;securitycode&quot;,</span></span>
<span class="line"><span>            &quot;payPassword&quot;, &quot;alipay&quot;, &quot;wechatpay&quot;, &quot;unionpay&quot;,</span></span>
<span class="line"><span>            // 加密密钥类（系统安全信息）</span></span>
<span class="line"><span>            &quot;privatekey&quot;, &quot;publickey&quot;, &quot;apikey&quot;, &quot;appid&quot;, &quot;appsecret&quot;, &quot;secretKey&quot;, &quot;accessKey&quot;,</span></span>
<span class="line"><span>            // 其他敏感类（地址/身份证/人脸信息）</span></span>
<span class="line"><span>            &quot;address&quot;, &quot;detailAddress&quot;, &quot;faceToken&quot;, &quot;fingerprint&quot;, &quot;wechatOpenId&quot;, &quot;weiboId&quot;</span></span>
<span class="line"><span>    ));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 切面其他核心逻辑...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="敏感字段扩展规范" tabindex="-1">敏感字段扩展规范 <a class="header-anchor" href="#敏感字段扩展规范" aria-label="Permalink to &quot;敏感字段扩展规范&quot;">​</a></h4><p>若业务需要新增敏感字段，只需在<code>SENSITIVE_KEYWORDS</code>集合中<strong>添加对应关键词</strong>即可，无需修改其他逻辑，切面会自动识别并脱敏，示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 新增微信openid、支付宝userId敏感字段</span></span>
<span class="line"><span>SENSITIVE_KEYWORDS.add(&quot;wxOpenId&quot;);</span></span>
<span class="line"><span>SENSITIVE_KEYWORDS.add(&quot;aliUserId&quot;);</span></span></code></pre></div><h4 id="七、切面核心特性" tabindex="-1">七、切面核心特性 <a class="header-anchor" href="#七、切面核心特性" aria-label="Permalink to &quot;七、切面核心特性&quot;">​</a></h4><ol><li><strong>配置驱动，无需改码</strong>：日志级别由<code>application.yml</code>统一配置，开发 / 测试 / 生产环境一键切换，无需修改切面代码；</li><li><strong>注解触发，精准控制</strong>：仅标注<code>@ApiLog</code>的接口方法输出日志，避免内部方法日志冗余，注解操作描述统一规范；</li><li><strong>全链路追踪，便于排查</strong>：自动生成 / 解析<code>requestId</code>，贯穿请求 - 响应 - 异常全流程，支持日志链路溯源；</li><li><strong>脱敏合规，无需手动处理</strong>：内置超全敏感字段集合，自动脱敏请求 / 响应中的敏感信息，符合数据安全合规要求；</li><li><strong>内存安全，高并发适配</strong>：<code>ThreadLocal</code>+MDC 上下文在<code>finally</code>块强制清理，避免内存泄漏，适配项目高并发场景；</li><li><strong>耗时统计，性能监控</strong>：自动计算接口耗时，便于识别慢接口，为性能优化提供数据支撑；</li><li><strong>异常分级，精准定位</strong>：业务异常（WARN）/ 系统异常（ERROR）分级记录，系统异常强制输出完整堆栈，快速定位问题。</li></ol><h4 id="八、多环境配置建议" tabindex="-1">八、多环境配置建议 <a class="header-anchor" href="#八、多环境配置建议" aria-label="Permalink to &quot;八、多环境配置建议&quot;">​</a></h4><p>为适配项目<strong>开发、测试、生产</strong>多环境需求，建议通过<strong>多环境配置文件</strong>分别配置日志切面级别，无需手动修改核心配置，启动时指定环境即可生效。</p><h3 id="_1-开发环境-application-dev-yml" tabindex="-1">1. 开发环境（application-dev.yml） <a class="header-anchor" href="#_1-开发环境-application-dev-yml" aria-label="Permalink to &quot;1. 开发环境（application-dev.yml）&quot;">​</a></h3><p>yaml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>logging:</span></span>
<span class="line"><span>  level:</span></span>
<span class="line"><span>    root: INFO</span></span>
<span class="line"><span>    com.enfi: DEBUG</span></span>
<span class="line"><span>    com.enfi.framework.aspectj.EnhancedApiLogAspect: TRACE # 极细粒度，便于问题定位</span></span></code></pre></div><h4 id="_2-测试环境-application-test-yml" tabindex="-1">2. 测试环境（application-test.yml） <a class="header-anchor" href="#_2-测试环境-application-test-yml" aria-label="Permalink to &quot;2. 测试环境（application-test.yml）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>logging:</span></span>
<span class="line"><span>  level:</span></span>
<span class="line"><span>    root: INFO</span></span>
<span class="line"><span>    com.enfi: DEBUG</span></span>
<span class="line"><span>    com.enfi.framework.aspectj.EnhancedApiLogAspect: DEBUG # 调试粒度，满足联调测试</span></span></code></pre></div><h4 id="_3-生产环境-application-prod-yml" tabindex="-1">3. 生产环境（application-prod.yml） <a class="header-anchor" href="#_3-生产环境-application-prod-yml" aria-label="Permalink to &quot;3. 生产环境（application-prod.yml）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>logging:</span></span>
<span class="line"><span>  level:</span></span>
<span class="line"><span>    root: INFO</span></span>
<span class="line"><span>    com.enfi: INFO</span></span>
<span class="line"><span>    com.enfi.framework.aspectj.EnhancedApiLogAspect: INFO # 核心粒度，保证性能和日志简洁</span></span></code></pre></div>`,55)]))}const q=n(p,[["render",o]]);export{g as __pageData,q as default};
