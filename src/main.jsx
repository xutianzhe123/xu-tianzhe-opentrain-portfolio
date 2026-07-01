import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BorderGlow from "./BorderGlow";
import Strands from "./Strands";
import "./styles.css";

const resumePdf = "/assets/xu-tianzhe-ai-portfolio-resume.pdf";

const profileStats = [
  ["9年", "B2B 项目与商务经验"],
  ["30+", "AI 视频脚本与镜头迭代"],
  ["48", "世界杯球队资料库"],
  ["PS/LR", "摄影后期与调色"]
];

const strengths = [
  {
    no: "01",
    title: "AI 项目交付",
    copy: "把模糊需求拆成可执行任务，并交付可运行网站、自动化脚本、可复用 Skill 和可审核成果。"
  },
  {
    no: "02",
    title: "客户与项目推进",
    copy: "具备需求澄清、方案沟通、商务谈判、里程碑推进、回款与验收经验。"
  },
  {
    no: "03",
    title: "Prompt / Skill 封装",
    copy: "能为垂直场景建立资料库、方法论、输出契约、安全边界与自动更新脚本。"
  },
  {
    no: "04",
    title: "摄影剪辑与后期",
    copy: "具备摄影、视频剪辑与视觉后期能力，会使用 PS、Lightroom、剪映、DaVinci Resolve，把影像审美和 AI 生产结合。"
  }
];

const projects = [
  {
    id: "worldcup",
    type: "Data Site",
    title: "World Cup 2026 Portal / 世界杯预测可视化站",
    desc: "构建服务 2026 世界杯的实时可视化网页，覆盖赛程、新闻、预测、积分榜、淘汰赛图与焦点比赛置顶。",
    details: [
      "聚合 ESPN core/site API、Open-Meteo、地理编码与 Google News RSS，输出前端可读 JSON。",
      "实现每 6 小时刷新与开赛前 30 分钟焦点置顶逻辑，完成静态站点导出与上线演示。"
    ],
    outcomes: ["赛程 / 新闻 / 积分榜", "预测卡片", "6h 自动刷新", "静态站点导出"],
    stack: ["React", "Vite", "TypeScript", "ESPN API", "Open-Meteo", "RSS"],
    proof: "48 teams / 6h refresh"
  },
  {
    id: "skill",
    type: "AI Skill",
    title: "WorldCup-2026-Prediction-Skill / 绿茵神算",
    desc: "搭建世界杯垂类预测 Skill，把 48 队资料库、四维评估方法、胜率上限与安全红线写入可复用约束文档。",
    details: [
      "设计严格 JSON 输出契约，使预测结果可被前端卡片直接渲染，减少人工清洗和格式漂移。",
      "编写每日情报更新脚本，自动拉取 ESPN World Cup scoreboard 并覆盖 Skill 最新情报区。"
    ],
    outcomes: ["48 队资料库", "四维预测方法", "JSON 输出契约", "每日情报脚本"],
    stack: ["Codex Skill", "Prompt Engineering", "Python", "JSON Schema"],
    proof: "Skill packaged"
  },
  {
    id: "agent",
    type: "Agent Workflow",
    title: "Codex / OpenClaw 多智能体协作与 AI 视频交付",
    desc: "围绕真实宣传片项目搭建多 Agent 协作机制，用任务板、状态表和角色分工文档同步创意、研究与执行。",
    details: [
      "将审稿意见转成镜头策略、提示词方案、脚本化剪辑方案与审核清单。",
      "把 AI 生成镜头、真实素材、音效曲线、字幕与落版整合进可重复执行的交付流程。"
    ],
    outcomes: ["多 Agent 任务板", "镜头提示词", "粗剪脚本", "字幕 / 音效 / 落版"],
    stack: ["Codex", "OpenClaw", "Seedance", "FFmpeg", "Python"],
    proof: "30+ script iterations"
  },
  {
    id: "visual",
    type: "Visual Creation",
    title: "摄影剪辑 + AI 创作内容",
    desc: "结合摄影、调色、剪辑和 AI 生成能力，围绕城市风景、项目展示和短视频内容做视觉表达。",
    details: [
      "使用 PS、Lightroom 做照片后期和色彩控制，使用剪映、DaVinci Resolve 完成短视频剪辑、调色、字幕与节奏处理。",
      "将 AI 生成镜头、真实拍摄素材和文案脚本结合，用于个人内容、项目展示和客户演示。"
    ],
    outcomes: ["摄影作品", "短视频剪辑", "AI 镜头生成", "调色 / 字幕 / 包装"],
    stack: ["Photography", "Photoshop", "Lightroom", "剪映", "DaVinci Resolve", "AI Video"],
    proof: "Photography / Editing"
  },
  {
    id: "erp",
    type: "Enterprise",
    title: "企业信息化与大客户项目交付",
    desc: "用友期间主导 ERP 与信息化项目销售及交付推进，代表项目包括微康益生菌 ERP 247 万元、苏州晟济药业 105 万元。",
    details: [
      "泰克赛维期间负责学校一卡通、明厨亮灶、智慧餐饮监管等项目实施。",
      "协调客户、供应商和技术团队，推动需求、商务、实施、验收和回款闭环。"
    ],
    outcomes: ["ERP 项目推进", "客户需求分析", "商务谈判", "验收回款闭环"],
    stack: ["ERP", "教育信息化", "政企项目", "项目管理"],
    proof: "Business delivery"
  }
];

const serviceTabs = [
  {
    key: "skill",
    label: "AI Skill / Prompt 系统",
    title: "垂直场景 AI 能力封装",
    copy: "为具体业务建立资料库、方法论、输出契约、安全边界与自动更新脚本，让 AI 输出稳定、可复用、可审查。"
  },
  {
    key: "data",
    label: "AI 数据可视化网站",
    title: "模型结果与数据前端化",
    copy: "将 API、RSS、脚本输出和模型预测结果接入 React 前端，做成可交互客户演示或运营看板。"
  },
  {
    key: "agent",
    label: "多 Agent 项目流程",
    title: "AI 团队协作可控可追踪",
    copy: "设计角色分工、任务板、状态同步、审核机制和交付模板，让多智能体协作不失控。"
  },
  {
    key: "content",
    label: "AI 内容自动化交付",
    title: "从素材到成片的交付流程",
    copy: "把生成式素材、脚本剪辑、字幕、音效和导出规则串成稳定流程，用工程方式提高内容交付效率。"
  },
  {
    key: "visual",
    label: "摄影剪辑 / 后期创作",
    title: "兼具影像审美与落地制作",
    copy: "可完成城市风景、人像或项目展示素材的拍摄、修图、调色、剪辑和成片包装，并与 AI 生成内容结合。"
  }
];

const experiences = [
  {
    time: "2024.09 - 至今",
    company: "个人影像与 AI 创作实践",
    role: "摄影剪辑 / AI 内容创作 / 项目作品集建设",
    points: [
      "持续进行摄影、视频剪辑与 AI 创作实践，内容方向覆盖城市风景、短视频表达、AI 镜头生成和项目展示包装。",
      "使用 Photoshop、Lightroom 完成照片后期与色彩风格统一，使用剪映、DaVinci Resolve 进行剪辑、调色、字幕、音效和节奏控制。",
      "结合 Codex、OpenClaw、Seedance、FFmpeg 等工具，将创意脚本、AI 生成素材、真实拍摄素材和交付文档组织成可复用工作流。"
    ]
  },
  {
    time: "2022.05 - 2024.08",
    company: "苏州用友网络科技有限公司",
    role: "大客户销售代表 / 客户经理",
    points: [
      "聚焦 ERP 与企业信息化项目销售及交付推进，覆盖国企、教育、医疗、医药、制造等客户场景，参与从线索跟进、需求调研、方案沟通到商务推进的完整链路。",
      "主导客户需求分析、方案价值梳理、商务谈判、内部资源协同与回款推进，代表项目包括微康益生菌 ERP 247 万元、苏州晟济药业 105 万元。",
      "在项目推进中协调售前、实施、产品和客户关键人，推动二期规划、增购机会、验收节点和长期客户关系维护。"
    ]
  },
  {
    time: "2018.03 - 2022.05",
    company: "苏州泰克赛维网络科技有限公司",
    role: "项目经理",
    points: [
      "负责教育及政企信息化集成项目实施与全生命周期推进，包括需求确认、实施排期、现场协调、供应商管理、问题跟踪和验收交付。",
      "落地学校一卡通、明厨亮灶、智慧餐饮监管等项目，在多方诉求、现场环境和工期压力下推动项目按期上线。",
      "沉淀了面向客户、供应商、技术团队的沟通节奏和风险预警习惯，为后续 AI 项目交付中的流程拆解和协作管理打下基础。"
    ]
  },
  {
    time: "2016.11 - 2018.02",
    company: "苏州市高新北斗导航平台有限公司",
    role: "销售助理",
    points: [
      "负责客户资料整理、项目线索跟进、前期方案协同与商务关系维护，支持销售团队完成客户拜访、资料准备和项目进度记录。",
      "参与政企客户沟通、项目资料归档和基础商务支持，建立了对 B2B 销售流程、客户关系维护和项目推进节奏的早期认知。"
    ]
  }
];

const keywords = [
  "Codex", "OpenClaw", "React", "Vite", "TypeScript", "Python", "FFmpeg",
  "Prompt Engineering", "Skill Creator", "ESPN API", "Google News RSS",
  "Open-Meteo", "摄影", "剪辑", "Photoshop", "Lightroom", "剪映", "DaVinci Resolve",
  "PMP", "HCIA", "项目管理", "大客户沟通"
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    const observed = new WeakSet();
    const observeNodes = () => {
      document.querySelectorAll("[data-reveal]").forEach(node => {
        if (observed.has(node)) return;
        observed.add(node);
        observer.observe(node);
      });
    };

    observeNodes();
    const mutations = new MutationObserver(observeNodes);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
}

function useSpotlight() {
  useEffect(() => {
    const move = event => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
}

function Header({ onContact }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="返回首页">
        <span>XT</span>
        <b>徐天哲</b>
        <em>AI PROJECT DELIVERY</em>
      </a>
      <nav>
        <a href="#strengths">能力</a>
        <a href="#projects">项目</a>
        <a href="#services">方向</a>
        <a href="#experience">经历</a>
        <a href={resumePdf}>PDF</a>
      </nav>
      <button className="magnetic-button" onClick={onContact}>联系我</button>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero shell">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">AI 项目交付 / 影像创作 / 摄影剪辑 / 可视化网站 / 多智能体协作流程</p>
        <h1>
          徐天哲
          <span>AI 项目交付型人才</span>
        </h1>
        <p className="lead">
          9 年 B2B 销售、信息化项目推进与客户交付经验，近期重点投入 Codex、OpenClaw、生成式 AI 与影像内容创作。擅长把模糊需求拆成可执行工作流，并交付可运行网站、可复用 Skill、自动化脚本、摄影剪辑内容和可审核成果。
        </p>
        <div className="hero-actions">
          <a className="primary-cta" href="#projects">查看项目经历</a>
          <a className="ghost-cta" href={resumePdf}>下载 PDF 简历</a>
        </div>
      </div>

      <BorderGlow
        className="profile-card glow-card"
        data-reveal
        animated
        edgeSensitivity={24}
        glowColor="165 78 72"
        backgroundColor="rgba(22, 30, 46, 0.58)"
        borderRadius={36}
        glowRadius={44}
        glowIntensity={0.72}
        coneSpread={22}
        fillOpacity={0.28}
        colors={["#63e6b4", "#6bb6ff", "#f5a6cf"]}
      >
        <div className="profile-top">
          <span>Profile</span>
          <b>苏州 / 可远程</b>
        </div>
        <h2>面向 OpenTrain 的 AI 项目交付者与影像创作者</h2>
        <p>
          既懂客户沟通和项目推进，也能把提示词、脚本、前端页面、影像素材和交付文档整理成完整闭环。
        </p>
        <div className="profile-stats">
          {profileStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="contact-strip">
          <span>1037509064@qq.com</span>
          <span>15839910082</span>
        </div>
      </BorderGlow>
    </section>
  );
}

function Strengths() {
  return (
    <section id="strengths" className="section shell">
      <div className="section-title" data-reveal>
        <p>CORE STRENGTHS</p>
        <h2>核心能力</h2>
      </div>
      <div className="notes-grid">
        {strengths.map(item => (
          <article className="note-card glass-card tilt-card" data-reveal key={item.no}>
            <span>{item.no}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const active = filter === "all" ? projects : projects.filter(project => project.id === filter);

  return (
    <section id="projects" className="section shell">
      <div className="section-title row" data-reveal>
        <div>
          <p>SELECTED PROJECTS</p>
          <h2>精选项目经历</h2>
        </div>
        <div className="filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>全部</button>
          {projects.map(project => (
            <button className={filter === project.id ? "active" : ""} onClick={() => setFilter(project.id)} key={project.id}>
              {project.type}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {active.map(project => (
          <BorderGlow
            className="project-card glow-card tilt-card"
            data-reveal
            key={project.id}
            edgeSensitivity={34}
            glowColor="165 76 72"
            backgroundColor="rgba(8, 17, 28, 0.72)"
            borderRadius={30}
            glowRadius={34}
            glowIntensity={0.62}
            coneSpread={20}
            fillOpacity={0.22}
            colors={["#63e6b4", "#6bb6ff", "#f5a6cf"]}
          >
            <div className="project-top">
              <span>{project.type}</span>
              <b>{project.proof}</b>
            </div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <ul>
              {project.details.map(detail => <li key={detail}>{detail}</li>)}
            </ul>
            <div className="outcome-panel">
              <b>成果展示</b>
              <div>
                {project.outcomes.map(item => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="stack-list">
              {project.stack.map(item => <span key={item}>{item}</span>)}
            </div>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(serviceTabs[0]);

  return (
    <section id="services" className="section shell capability-section">
      <div className="capability-grid">
        <div className="section-title" data-reveal>
          <p>AVAILABLE WORK</p>
          <h2>可承接方向</h2>
        </div>
        <div className="capability-tabs glass-card" data-reveal>
          {serviceTabs.map(tab => (
            <button className={active.key === tab.key ? "active" : ""} onClick={() => setActive(tab)} key={tab.key}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="capability-panel glass-card" data-reveal>
          <p>{active.label}</p>
          <h3>{active.title}</h3>
          <span>{active.copy}</span>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section shell experience">
      <div className="section-title row" data-reveal>
        <div>
          <p>EXPERIENCE</p>
          <h2>工作经历</h2>
        </div>
        <div className="education-card glass-card">
          <b>大连理工大学</b>
          <span>本科 / 电气自动化 / 2019 - 2022</span>
          <span>PMP 项目管理认证 · HCIA 华为认证 ICT 工程师 · 用友 P5 职级认证</span>
        </div>
      </div>
      <div className="timeline">
        {experiences.map(item => (
          <article className="timeline-item glass-card" data-reveal key={item.company}>
            <time>{item.time}</time>
            <div>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <ul>
                {item.points.map(point => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Keywords() {
  return (
    <section className="section shell keywords-section">
      <div className="keyword-card glass-card" data-reveal>
        <p>KEYWORDS</p>
        <h2>关键词</h2>
        <div className="keyword-list">
          {keywords.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

function ContactDrawer({ open, onClose }) {
  return (
    <aside className={`contact-drawer ${open ? "open" : ""}`}>
      <button onClick={onClose} aria-label="关闭">x</button>
      <p>CONTACT</p>
      <h2>如果有 AI Skill、数据可视化或项目交付需求，可以直接联系我。</h2>
      <dl>
        <dt>电话</dt>
        <dd>15839910082</dd>
        <dt>邮箱</dt>
        <dd>1037509064@qq.com</dd>
        <dt>方向</dt>
        <dd>OpenTrain / AI 项目交付 / 数据站 / Skill</dd>
      </dl>
      <a className="primary-cta" href={resumePdf}>下载 PDF 简历</a>
    </aside>
  );
}

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const topRef = useRef(null);
  useReveal();
  useSpotlight();

  return (
    <main ref={topRef}>
      <div className="strands-backdrop" aria-hidden="true">
        <Strands
          colors={["#63e6b4", "#6bb6ff", "#f5a6cf"]}
          count={4}
          speed={0.22}
          amplitude={0.82}
          waviness={0.78}
          thickness={0.42}
          glow={1.95}
          taper={3.4}
          spread={1.2}
          intensity={0.34}
          saturation={0.9}
          opacity={0.55}
          scale={1.18}
        />
      </div>
      <div className="ambient" />
      <Header onContact={() => setContactOpen(true)} />
      <Hero />
      <Strengths />
      <Projects />
      <Services />
      <Experience />
      <Keywords />
      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
