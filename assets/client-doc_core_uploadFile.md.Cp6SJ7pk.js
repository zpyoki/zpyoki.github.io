import{_ as s,c as a,o as p,ae as e}from"./chunks/framework.Dh1jimFm.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/uploadFile.md","filePath":"client-doc/core/uploadFile.md","lastUpdated":1770358354000}'),i={name:"client-doc/core/uploadFile.md"};function l(t,n,c,o,r,u){return p(),a("div",null,n[0]||(n[0]=[e(`<h4 id="minio文件存储" tabindex="-1">MinIO文件存储 <a class="header-anchor" href="#minio文件存储" aria-label="Permalink to &quot;MinIO文件存储&quot;">​</a></h4><p>java</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.enfi.system.service.impl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import cn.hutool.core.date.DateUtil;</span></span>
<span class="line"><span>import com.enfi.common.core.domain.AjaxResult;</span></span>
<span class="line"><span>import com.enfi.common.utils.MinioUtil;</span></span>
<span class="line"><span>import com.enfi.common.utils.SecurityUtils;</span></span>
<span class="line"><span>import com.enfi.system.domain.SysMinioFile;</span></span>
<span class="line"><span>import com.enfi.system.service.SysFileService;</span></span>
<span class="line"><span>import com.enfi.system.service.UploadService;</span></span>
<span class="line"><span>import jakarta.annotation.Resource;</span></span>
<span class="line"><span>import lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"><span>import org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span>import org.springframework.stereotype.Service;</span></span>
<span class="line"><span>import org.springframework.web.multipart.MultipartFile;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.util.UUID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * @Author Liheng</span></span>
<span class="line"><span> * @Description: 文件上传</span></span>
<span class="line"><span> * @CreateTime: 2026/1/23 10:07</span></span>
<span class="line"><span> * @Version: 1.0</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class UploadServiceImpl implements UploadService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Value(&quot;\${minio.bucketName}&quot;)</span></span>
<span class="line"><span>    private String bucketName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private MinioUtil minioUtil;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private SysFileService sysFileService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * @Description 本地文件上传minio</span></span>
<span class="line"><span>     * @MethodName uploadByMinio</span></span>
<span class="line"><span>     * @Author Liheng</span></span>
<span class="line"><span>     * @Date 2024/04/09</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public AjaxResult uploadByMinio(MultipartFile file) {</span></span>
<span class="line"><span>        if (file.isEmpty()) {</span></span>
<span class="line"><span>            return AjaxResult.error(&quot;上传的文件为空!&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        try (var inputStream = file.getInputStream()) {</span></span>
<span class="line"><span>            var userInfo = SecurityUtils.getLoginUser().getUser();</span></span>
<span class="line"><span>            var endWith = getEndWith(file.getOriginalFilename());</span></span>
<span class="line"><span>            var fileNo = UUID.randomUUID().toString().replaceAll(&quot;-&quot;, &quot;&quot;);</span></span>
<span class="line"><span>            var fileDirectory = DateUtil.format(DateUtil.date(), &quot;yyyy&quot;) + &quot;/&quot; + DateUtil.format(DateUtil.date(), &quot;MM&quot;) + &quot;/&quot; + DateUtil.format(DateUtil.date(), &quot;dd&quot;);</span></span>
<span class="line"><span>            minioUtil.createBucket(bucketName);</span></span>
<span class="line"><span>            var uploadFile = minioUtil.uploadFile(inputStream, bucketName, fileDirectory + fileNo + endWith, file.getContentType());</span></span>
<span class="line"><span>            var build = SysMinioFile.builder()</span></span>
<span class="line"><span>                    .fileName(file.getOriginalFilename())</span></span>
<span class="line"><span>                    .fileSize(file.getSize())</span></span>
<span class="line"><span>                    .fileUrl(uploadFile.replaceAll(&quot;minio/&quot;, &quot;&quot;))</span></span>
<span class="line"><span>                    .createBy(userInfo.getUserName())</span></span>
<span class="line"><span>                    .createByName(userInfo.getNickName())</span></span>
<span class="line"><span>                    .createTime(DateUtil.date())</span></span>
<span class="line"><span>                    .build();</span></span>
<span class="line"><span>            sysFileService.save(build);</span></span>
<span class="line"><span>            return AjaxResult.success(build);</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return AjaxResult.success(&quot;文件上传失败!&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * @Description 获取文件后缀</span></span>
<span class="line"><span>     * @MethodName getEndWith</span></span>
<span class="line"><span>     * @Author Liheng</span></span>
<span class="line"><span>     * @Date 2024-11-26 10:40:16</span></span>
<span class="line"><span>     * @Param fileName</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public String getEndWith(String fileName) {</span></span>
<span class="line"><span>        var split = fileName.split(&quot;\\\\.&quot;);</span></span>
<span class="line"><span>        return &quot;.&quot; + split[split.length - 1];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="application-yaml-配置" tabindex="-1">application.yaml 配置 <a class="header-anchor" href="#application-yaml-配置" aria-label="Permalink to &quot;application.yaml 配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>minio:</span></span>
<span class="line"><span>    url: http://ip:port</span></span>
<span class="line"><span>    accessKey: ak</span></span>
<span class="line"><span>    secretKey: sk</span></span>
<span class="line"><span>    bucketName: bucketName</span></span></code></pre></div>`,5)]))}const f=s(i,[["render",l]]);export{d as __pageData,f as default};
