# Jason Cui DESIGN Portfolio

精确复刻 Jonathan Cohen Harel 作品集风格的极简主义设计网站，定制为 Jason Cui DESIGN 品牌。

## 项目特性

### 设计风格
- **极简主义设计**：大量留白、无冗余装饰，突出内容本身
- **多页面结构**：Work / Other / About Me / Resume 独立页面
- **黑白主色调**：以黑白灰为基调，DESIGN用蓝色突出
- **等宽网格系统**：3列网格布局，4:3宽高比例设计

### 字体层级设计
- **标题**：大而粗体（Bold 700），36px
- **项目名称**：中等大小（Medium 500），16-18px
- **正文**：小而简洁（Regular 400），14-16px
- **现代无衬线字体**：Inter + Helvetica Neue 字体栈

### 技术实现
- **响应式设计**：完美适配桌面、平板和手机设备
- **CSS Grid布局**：实现精确的网格系统
- **多页面导航**：页面间平滑跳转
- **悬停动画**：精致的交互反馈效果
- **移动端菜单**：汉堡菜单适配小屏设备

## 文件结构

```
Jason design/
├── index.html          # 主页（作品展示）
├── other.html          # 其他作品页面
├── about.html          # 关于我页面
├── resume.html         # 简历页面
├── styles.css          # 样式文件
├── script.js           # JavaScript交互文件
└── README.md           # 项目说明文件
```

## 页面说明

### 1. 主页 (index.html)
- 展示6个主要作品项目
- 3列网格布局（桌面端）
- 4:3宽高比例设计
- 项目卡片悬停效果

### 2. 其他作品 (other.html)
- 实验性项目和创意作品
- 2列网格布局
- 包含项目描述

### 3. 关于我 (about.html)
- 个人介绍和联系方式
- 简洁的文字布局
- 邮箱链接

### 4. 简历 (resume.html)
- 工作经验和教育背景
- 技能分类展示
- 清晰的层次结构

## 设计还原度

### 字体和颜色
- **品牌字体**：Inter 300/400/500/600/700 字重
- **主色**：#000000 (纯黑)
- **DESIGN蓝色**：#0066cc (品牌蓝)
- **背景**：#ffffff (纯白)
- **卡片背景**：#f5f5f5 (浅灰)
- **文字颜色**：#333333 (深灰)

### 字体层级
- **品牌标题**：18px Bold (Jason Cui DESIGN)
- **页面标题**：36px Bold (About Me, Resume等)
- **项目名称**：16px Medium (作品卡片)
- **导航菜单**：15px Regular
- **正文内容**：16px Regular
- **描述文字**：14px Light

### 间距和布局
- **容器最大宽度**：1400px
- **网格间距**：32px
- **导航间距**：48px
- **页面内边距**：40px
- **文本行高**：1.6-1.8

## 响应式断点

- **桌面端** (≥1200px)：3列网格
- **平板端** (768px-1200px)：2列网格
- **手机端** (≤768px)：1列网格，汉堡菜单
- **小屏手机** (≤480px)：优化间距和字体

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   ```

## 自定义配置

### 修改作品项目
在 `index.html` 中的 `.work-grid` 部分添加或修改项目：

```html
<div class="work-item">
    <div class="work-card">
        <h3 class="work-title">项目名称</h3>
    </div>
</div>
```

### 修改个人信息
在各个页面中修改相应的内容：
- `about.html` - 个人介绍和邮箱
- `resume.html` - 工作经验和技能
- `other.html` - 其他作品项目

### 修改品牌颜色
在 `styles.css` 中修改蓝色：

```css
.brand-design {
    color: #0066cc; /* 修改为其他蓝色 */
}
```

### 添加项目详情页
在 `script.js` 中修改作品卡片点击事件：

```javascript
card.addEventListener('click', function() {
    const projectTitle = this.querySelector('.work-title').textContent;
    window.location.href = `/project/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`;
});
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 性能优化

- 使用CSS动画代替JavaScript动画
- 纯色背景替代图片资源
- 字体预加载优化
- 响应式图片处理

## 许可证

MIT License

## 参考设计

本项目基于 [Jonathan Cohen Harel](https://www.jonathancohenharel.com/) 的作品集网站设计风格，定制为 Jason Cui DESIGN 品牌。
