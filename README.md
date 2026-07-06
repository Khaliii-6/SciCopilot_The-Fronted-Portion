<h1 align="center">✨ SciCopilot</h1>

<p align="center">
  🧠 <strong>AI-Powered Vertical Platform for Software Engineering Research & Learning</strong>
  <br><em>（面向软件工程学科的智能体学习与项目辅助平台）</em>
</p>

<p align="center">
  Paper Reading · Code Understanding · Project Planning · AI Agents
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SCICOPILOT-V0.1%20MVP-6B46C1?style=flat-square&labelColor=374151" alt="SciCopilot v0.1 MVP">
  <img src="https://img.shields.io/badge/STATUS-INITIAL%20DEVELOPMENT-F59E0B?style=flat-square&labelColor=374151" alt="Initial Development">
  <img src="https://img.shields.io/badge/LICENSE-MIT-10B981?style=flat-square&labelColor=374151" alt="MIT License">
  <br>
  <img src="https://img.shields.io/badge/REACT-18-61DAFB?style=flat-square&labelColor=374151&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TYPESCRIPT-5-3178C6?style=flat-square&labelColor=374151&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/VITE-5-646CFF?style=flat-square&labelColor=374151&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TAILWINDCSS-3-06B6D4?style=flat-square&labelColor=374151&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/SHADCN%2FUI-latest-000000?style=flat-square&labelColor=374151" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/ZUSTAND-4-FF6B6B?style=flat-square&labelColor=374151" alt="Zustand">
  <img src="https://img.shields.io/badge/ECHARTS-5-E43961?style=flat-square&labelColor=374151" alt="ECharts">
  <img src="https://img.shields.io/badge/D3.JS-7-F9A03C?style=flat-square&labelColor=374151" alt="D3.js">
</p>

---

## 📌 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Core Features](#core-features)
- [Page Routes & Navigation](#page-routes--navigation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Component Architecture](#component-architecture)
- [API Interaction Flow](#api-interaction-flow)
- [UI Design System](#ui-design-system)
- [State Management](#state-management)
- [API Specification](#api-specification)
- [Local Development](#local-development)
- [Build & Deploy](#build--deploy)
- [Development Milestones](#development-milestones)
- [Team Responsibilities](#team-responsibilities)

---

## Overview

**SciCopilot** is an AI-powered vertical platform designed for Software Engineering (SE) students and researchers. It addresses five critical pain points in the research pipeline — from literature review to experimental analysis — by providing structured, traceable, and intelligent agent services.

> **Target Users** （目标用户）
> - **Junior Researchers** (Graduate Year 1 / Senior Undergrads): Need to quickly understand research directions, read papers, and find entry points.
> - **Experiment Executors** (Graduate Year 1-2): Need to design experiments, find baselines, reproduce code, and analyze results.
> - **Course Learners** (SE Undergrads): Need concept explanations, case studies, and knowledge graph navigation.

### Value Proposition

| Pain Point | SciCopilot Solution |
|-----------|---------------------|
| Fragmented paper reading | Structured deep-read reports with citation tracing |
| Vague research directions | Hierarchical research question trees with feasibility scoring |
| Unsystematic experiment design | Auto-generated roadmaps with baseline & dataset recommendations |
| Code reproduction failures | Step-by-step reproduction guides with error diagnosis |
| Unclear result interpretation | Statistical analysis + auto-generated visualizations + writing suggestions |

---

## System Architecture

### End-to-End Data Flow

```mermaid
flowchart TB
    subgraph Users["👤 Users （用户层）"]
        U1["Junior Researchers"]
        U2["Experiment Executors"]
        U3["Course Learners"]
    end

    subgraph Frontend["🎨 Frontend （前端层）"]
        F1["/paper/read<br/>Paper Deep Read"]
        F2["/research/decompose<br/>Research Question Tree"]
        F3["/experiment/roadmap<br/>Experiment Planner"]
        F4["/code/reproduce<br/>Code Assistant"]
        F5["/result/analyze<br/>Result Analyzer"]
        F6["/kg/explore<br/>Knowledge Graph"]
        F7["/dashboard<br/>User Dashboard"]
    end

    subgraph Backend["⚙️ Backend （后端层）"]
        B1["API Gateway<br/>FastAPI + JWT"]
        B2["Paper Service<br/>PDF Parse / Deep Read"]
        B3["Research Service<br/>KG Query / Tree Gen"]
        B4["Experiment Service<br/>Roadmap Gen / Baseline Match"]
        B5["Code Service<br/>Repo Analysis / Error Diagnosis"]
        B6["Result Service<br/>Stats / Charts / Writing"]
    end

    subgraph Engine["🧠 Intelligence Engine （智能引擎）"]
        E1["LangGraph<br/>Workflow Engine"]
        E2["RAG Retriever<br/>Hybrid Search + Rerank"]
        E3["Neo4j Query<br/>Knowledge Graph"]
        E4["Spark API<br/>LLM Generation"]
    end

    subgraph Data["🗄️ Data Layer （数据层）"]
        D1["MongoDB<br/>Papers / Sessions"]
        D2["PostgreSQL<br/>Structured Data"]
        D3["Chroma<br/>Vector DB"]
        D4["Neo4j<br/>Knowledge Graph"]
        D5["MinIO<br/>File Storage"]
    end

    Users --> Frontend
    Frontend -->|"REST API + WebSocket"| B1
    B1 --> B2 & B3 & B4 & B5 & B6
    B2 & B3 & B4 --> Engine
    Engine -->|"LLM Call"| E4
    Engine -->|"Vector Search"| D3
    Engine -->|"Graph Query"| D4
    Backend -->|"CRUD"| D1 & D2 & D5
```

### Frontend-Backend Communication Pattern

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend (React)
    participant B as Backend (FastAPI)
    participant E as Spark API
    participant DB as Database

    U->>F: Upload PDF / Input Query
    F->>B: POST /api/v1/papers/upload
    B->>DB: Save metadata
    B->>E: Request deep-read generation
    E-->>B: Stream response chunks
    B-->>F: WebSocket: stream_chunk
    F->>F: Render streaming text
    B-->>F: WebSocket: stream_end
    F->>U: Display structured report
    U->>F: Ask follow-up question
    F->>B: POST /api/v1/papers/{id}/chat
    B->>E: RAG retrieval + generation
    E-->>B: Response with citations
    B-->>F: WebSocket: citation + chunk
    F->>U: Show reply + clickable citations
```

---

## Core Features

### Feature Matrix

| # | Module | Route | Input | Output |
|---|--------|-------|-------|--------|
| 1 | **Paper Deep Read** | `/paper/read` | PDF / arXiv ID | Structured 7-section report + chat |
| 2 | **Research Decomposition** | `/research/decompose` | Research direction | Interactive question tree |
| 3 | **Experiment Roadmap** | `/experiment/roadmap` | Research question | Full experiment plan + baseline |
| 4 | **Code Reproduction** | `/code/reproduce` | GitHub repo URL | Step-by-step guide + error diagnosis |
| 5 | **Result Analysis** | `/result/analyze` | CSV / JSON / Excel | Charts + stats + writing suggestions |

### 1. Paper Deep Read （论文精读）

Upload a PDF or enter an arXiv ID. The system parses and generates a structured deep-read report with 7 sections:

```
1. Research Background & Motivation
2. Core Research Questions
3. Method & Innovation Points
4. Experiment Design
5. Key Results
6. Limitations & Future Work
7. Inspiration for Beginners
```

**UI Layout:**
```
┌────────────┬──────────────────────┬──────────────┐
│  Section   │   Deep Read Report   │  Knowledge   │
│  Navigator │   (Markdown + LaTeX  │   Graph      │
│            │    + Citation Cards) │   Panel      │
├────────────┼──────────────────────┼──────────────┤
│ 1. Background│ ## Background       │ ● APR        │
│ 2. Questions │ ...[1][2]...        │   ├─ GenProg │
│ 3. Methods   │                     │   └─ SemFix  │
│ 4. Experiments│ ## Core Questions  │ ● Defects4J  │
│ 5. Results   │ ...                 │              │
│ 6. Limits    │ [Citation Popup]    │ [Click node] │
│ 7. Inspiration│                    │              │
└────────────┴──────────────────────┴──────────────┘
│  Chat Input: [Ask a question...] [Send] [Q1] [Q2] │
└───────────────────────────────────────────────────┘
```

**Workflow Diagram:**

```mermaid
stateDiagram-v2
    [*] --> Upload: PDF / arXiv ID
    Upload --> Parse: Extract sections
    Parse --> Chunk: Split by heading
    Chunk --> Embed: Vectorize chunks
    Embed --> KG_Link: Link concepts to Neo4j
    KG_Link --> Generate: LLM deep-read prompt
    Generate --> Display: Structured report
    Display --> FollowUp: User asks question
    FollowUp --> RAG_Search: Retrieve relevant chunks
    RAG_Search --> Generate: LLM generates answer
    Generate --> Display
    Display --> CrossCompare: Multi-paper compare
    CrossCompare --> Display
    Display --> [*]
```

### 2. Research Question Decomposition （研究问题拆解）

Enter a broad research direction. The system outputs a hierarchical research question tree with feasibility scoring.

**Workflow Diagram:**

```mermaid
stateDiagram-v2
    [*] --> Input: Enter direction
    Input --> IntentParse: Keyword extraction
    IntentParse --> KG_Query: Neo4j concept search
    KG_Query --> Paper_Retrieve: Vector search Top-10
    Paper_Retrieve --> Tree_Gen: LLM generates tree
    Tree_Gen --> Display: Interactive tree
    Display --> Node_Click: Show detail drawer
    Node_Click --> Save: Add to research plan
    Node_Click --> Paper_Read: Jump to deep read
    Display --> Adjust: User modifies direction
    Adjust --> IntentParse
    Save --> [*]
    Paper_Read --> [*]
```

### 3. Experiment Roadmap Generation （实验路线生成）

Based on a research question and previously read papers, auto-generate a complete experiment plan.

**Workflow Diagram:**

```mermaid
flowchart LR
    A["Research Question"] --> B["Context Collection"]
    B --> C["KB Retrieval"]
    C --> D["Baseline<br/>Recommendation"]
    C --> E["Dataset<br/>Matching"]
    C --> F["Metric<br/>Lookup"]
    D & E & F --> G["LLM Roadmap<br/>Generation"]
    G --> H["Step Timeline"]
    G --> I["Baseline Cards"]
    G --> J["Dataset Panel"]
    G --> K["Toolchain List"]
    H & I & J & K --> L["Export<br/>Markdown / PDF"]
```

### 4. Code Reproduction Assistant （代码复现辅助）

Input a GitHub repository URL. The system analyzes structure, extracts dependencies, and generates a reproduction guide.

**Workflow Diagram:**

```mermaid
flowchart LR
    A["GitHub URL"] --> B["Clone & Analyze"]
    B --> C["Dependency Parse"]
    B --> D["File Tree Extract"]
    B --> E["Key File Identify"]
    C & D & E --> F["README + Structure"]
    F --> G["LLM Guide Generation"]
    G --> H["Reproduction Steps"]
    G --> I["Common Issues"]
    H --> J["Checklist UI"]
    I --> K["Error Diagnosis Chat"]
    J --> L["User executes"]
    L --> M{"Success?"}
    M -->|No| K
    M -->|Yes| N["Done"]
```

### 5. Result Interpretation （结果解释）

Upload experiment result files. Auto-generate statistical summaries, visualizations, and analysis text.

**Supported Charts:**

```mermaid
flowchart TB
    subgraph Comparison["Comparison （对比类）"]
        C1[Bar Chart]
        C2[Box Plot]
        C3[Radar Chart]
    end
    subgraph Trend["Trend （趋势类）"]
        T1[Line Chart]
        T2[Learning Curve]
        T3[Heatmap]
    end
    subgraph Distribution["Distribution （分布类）"]
        D1[Histogram]
        D2[Violin Plot]
    end
```

---

## Page Routes & Navigation

### Route Tree

```mermaid
flowchart TD
    Root["/"] --> Home["🏠 Home<br/>Product Intro"]
    Root --> Login["🔐 /login"]
    Root --> Register["📝 /register"]
    Root --> Dashboard["📊 /dashboard<br/>User Dashboard"]

    Dashboard --> PaperRead["/paper/read<br/>Deep Read"]
    Dashboard --> PaperLib["/paper/library<br/>Paper Library"]
    Dashboard --> Research["/research/decompose<br/>Question Tree"]
    Dashboard --> Experiment["/experiment/roadmap<br/>Roadmap"]
    Dashboard --> Code["/code/reproduce<br/>Code Assistant"]
    Dashboard --> Result["/result/analyze<br/>Result Analysis"]
    Dashboard --> KG["/kg/explore<br/>Knowledge Graph"]
    Dashboard --> Profile["/profile<br/>User Profile"]

    PaperRead --> Chat["WebSocket Chat<br/>Follow-up Q&A"]
    Research --> TreeDetail["Node Detail Drawer"]
    Experiment --> Export["Export MD / PDF"]
    Code --> Diagnosis["Error Diagnosis Chat"]
    Result --> ChartGen["Auto Chart Gallery"]
```

### Route Guard Rules

| Type | Routes | Behavior |
|------|--------|----------|
| Public | `/`, `/login`, `/register` | Free access |
| Protected | `/dashboard`, `/paper/*`, `/research/*`, `/experiment/*`, `/code/*`, `/result/*`, `/kg/*`, `/profile` | Redirect to `/login` if unauthenticated |

---

## Tech Stack

### Frontend Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 18.x | Component-based UI |
| Language | TypeScript | 5.x | Type safety |
| Build Tool | Vite | 5.x | Fast dev server & optimized builds |
| Styling | TailwindCSS | 3.x | Utility-first CSS |
| Components | shadcn/ui | latest | High-quality accessible components |
| State | Zustand | 4.x | Lightweight global state |
| Routing | React Router | v6 | SPA navigation |
| HTTP | Axios | 1.x | API requests with interceptors |
| Realtime | WebSocket API | native | Streaming chat output |
| Charts | ECharts | 5.x | Statistical visualizations |
| Graph Viz | D3.js | 7.x | Knowledge graph rendering |
| Math | KaTeX | latest | LaTeX formula rendering |
| Markdown | react-markdown + remark-gfm | latest | Rich markdown content |
| Syntax Highlight | PrismJS | latest | Code block highlighting |

### Full-Stack Architecture

```mermaid
flowchart LR
    subgraph FE["Frontend （前端）"]
        F1["React 18 + TS"]
        F2["Vite 5"]
        F3["Tailwind + shadcn/ui"]
        F4["Zustand"]
        F5["ECharts / D3"]
    end

    subgraph BE["Backend （后端）"]
        B1["FastAPI"]
        B2["Uvicorn"]
        B3["LangGraph"]
        B4["RAG Pipeline"]
    end

    subgraph DB["Databases （数据库）"]
        D1["MongoDB"]
        D2["PostgreSQL"]
        D3["Chroma"]
        D4["Neo4j"]
    end

    subgraph AI["AI Platform （AI 平台）"]
        A1["Spark API<br/>星火大模型"]
        A2["Embedding Models<br/>BGE / Jina"]
    end

    FE -->|"REST + WS"| BE
    BE -->|"CRUD"| DB
    BE -->|"LLM Call"| AI
```

---

## Project Structure

```
frontend/                          # 前端项目根目录
├── public/                        # 静态资源
│   ├── favicon.ico
│   └── logo.svg
│
├── src/
│   ├── app/                       # App entry & global config
│   │   ├── App.tsx                # Root component
│   │   ├── routes.tsx             # Route definitions
│   │   └── providers.tsx          # Global providers (Zustand, Theme)
│   │
│   ├── pages/                     # Page-level components (route-mapped)
│   │   ├── Home/                  # Landing page
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/             # User dashboard
│   │   ├── PaperRead/             # Paper deep read
│   │   │   ├── index.tsx
│   │   │   ├── SectionNav.tsx     # Chapter navigation tree
│   │   │   ├── DeepReadReport.tsx # Report renderer
│   │   │   ├── CitationCard.tsx   # Citation popup
│   │   │   └── PaperChat.tsx      # Follow-up chat
│   │   ├── PaperLibrary/          # Paper collection
│   │   ├── ResearchDecompose/     # Research question tree
│   │   │   ├── ResearchTree.tsx   # Interactive tree
│   │   │   ├── TreeNodeDetail.tsx # Node detail drawer
│   │   │   └── FeasibilityBadge.tsx
│   │   ├── ExperimentRoadmap/     # Experiment planner
│   │   │   ├── Timeline.tsx       # Gantt-style timeline
│   │   │   ├── BaselineCard.tsx
│   │   │   ├── DatasetPanel.tsx
│   │   │   └── ToolChainList.tsx
│   │   ├── CodeReproduce/         # Code reproduction
│   │   │   ├── RepoInfoCard.tsx
│   │   │   ├── FileTree.tsx
│   │   │   ├── DependencyList.tsx
│   │   │   ├── ReproductionChecklist.tsx
│   │   │   └── ErrorDiagnosis.tsx
│   │   ├── ResultAnalyze/         # Result analysis
│   │   │   ├── DataUploader.tsx   # Drag & drop upload
│   │   │   ├── ChartGallery.tsx   # Auto chart gallery
│   │   │   ├── StatsSummary.tsx   # Statistical summary
│   │   │   ├── AnalysisEditor.tsx # AI text editor
│   │   │   └── WritingSuggestion.tsx
│   │   ├── KnowledgeGraph/        # Knowledge graph explorer
│   │   │   └── GraphCanvas.tsx    # D3.js graph canvas
│   │   └── Profile/
│   │
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Base UI (shadcn/ui wrappers)
│   │   ├── layout/                # Layout components
│   │   │   ├── AppLayout.tsx      # Main layout (Header + Sidebar + Content)
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── chat/                  # Chat components
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatSidebar.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── StreamingText.tsx
│   │   ├── markdown/              # Markdown rendering
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── CodeBlock.tsx      # Code block with highlight + copy
│   │   │   └── LaTeXBlock.tsx     # LaTeX formula renderer
│   │   ├── chart/                 # Chart components
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── BoxPlotChart.tsx
│   │   │   ├── HeatmapChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   └── ChartWrapper.tsx   # ECharts universal wrapper
│   │   └── common/                # Common business components
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── ConfirmDialog.tsx
│   │       ├── FileDropZone.tsx
│   │       ├── SearchBar.tsx
│   │       └── Pagination.tsx
│   │
│   ├── hooks/                     # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useWebSocket.ts        # WebSocket connection management
│   │   ├── useChat.ts
│   │   ├── usePaperRead.ts
│   │   ├── useResearchTree.ts
│   │   ├── useExperiment.ts
│   │   ├── useCodeAnalysis.ts
│   │   ├── useResultAnalysis.ts
│   │   ├── useFileUpload.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/                  # API service layer
│   │   ├── api.ts                 # Axios instance (interceptors, baseURL)
│   │   ├── auth.service.ts
│   │   ├── paper.service.ts
│   │   ├── research.service.ts
│   │   ├── experiment.service.ts
│   │   ├── code.service.ts
│   │   ├── result.service.ts
│   │   ├── kg.service.ts          # Knowledge graph queries
│   │   └── user.service.ts
│   │
│   ├── store/                     # Zustand stores
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   ├── paperStore.ts
│   │   └── uiStore.ts
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── paper.ts
│   │   ├── research.ts
│   │   ├── experiment.ts
│   │   ├── code.ts
│   │   ├── result.ts
│   │   ├── chat.ts
│   │   └── user.ts
│   │
│   ├── utils/                     # Utility functions
│   │   ├── format.ts              # Date / number formatting
│   │   ├── validators.ts          # Form validation
│   │   ├── constants.ts           # Constants
│   │   └── helpers.ts
│   │
│   ├── styles/                    # Global styles
│   │   ├── globals.css            # CSS variables + Tailwind entry
│   │   ├── themes.css             # Theme variables (light / dark)
│   │   └── animations.css         # Animation definitions
│   │
│   └── assets/                    # Static assets
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .env.local                     # Env vars (DO NOT commit)
├── .env.example                   # Env vars template (commit this)
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

---

## Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    AUTH_USERS ||--o{ PROFILES : has
    AUTH_USERS ||--o{ CONVERSATIONS : creates
    AGENTS ||--o{ CONVERSATIONS : used_by
    CONVERSATIONS ||--o{ MESSAGES : contains

    AUTH_USERS {
        uuid id PK
        text email
    }

    PROFILES {
        uuid id PK
        uuid user_id FK
        text username
        text avatar_url
        text role
        timestamptz created_at
    }

    AGENTS {
        uuid id PK
        text name
        text description
        text system_prompt
        text category
        boolean is_public
        timestamptz created_at
    }

    CONVERSATIONS {
        uuid id PK
        uuid user_id FK
        uuid agent_id FK
        text title
        text module
        timestamptz created_at
        timestamptz updated_at
    }

    MESSAGES {
        uuid id PK
        uuid conversation_id FK
        uuid user_id FK
        text role
        text content
        jsonb citations
        timestamptz created_at
    }
```

### MongoDB Document Schemas

```typescript
// Paper Document
interface Paper {
  paper_id: string;           // se-{venue}-{year}-{seq}
  title: string;
  authors: string[];
  venue: string;              // ICSE / FSE / ASE / TSE / arXiv
  year: number;
  doi?: string;
  abstract: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    text: string;
    embedding_id: string;
    start_page: number;
  }>;
  contributions: string[];
  github_url?: string;
  citation_count: number;
  quality_score: number;
}

// Session Document
interface Session {
  session_id: string;
  user_id: string;
  module: 'paper_read' | 'rq_decomp' | 'experiment' | 'code' | 'result';
  title: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    citations?: Array<{
      source_id: string;
      source_type: 'paper' | 'textbook' | 'code' | 'kg';
      snippet: string;
    }>;
    timestamp: Date;
  }>;
  context_papers: string[];
}
```

### PostgreSQL Structured Tables

```sql
-- Datasets table
CREATE TABLE datasets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    language VARCHAR(50),
    project_count INT,
    bug_count INT,
    source_url TEXT,
    description TEXT,
    common_tasks TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);

-- Metrics table
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    full_name VARCHAR(200),
    formula TEXT,
    description TEXT,
    applicable_tasks TEXT[],
    common_values JSONB
);

-- Experiment templates
CREATE TABLE experiment_templates (
    id SERIAL PRIMARY KEY,
    task_type VARCHAR(100),
    template_name VARCHAR(200),
    steps JSONB,
    recommended_baselines TEXT[],
    recommended_datasets INT[],
    recommended_metrics INT[]
);
```

---

## Component Architecture

### Component Hierarchy

```mermaid
flowchart TD
    A[App.tsx] --> B[BrowserRouter]
    B --> C[AppLayout]

    C --> D[Header]
    C --> E[Sidebar]
    C --> F[Main Content]

    F --> G[Home Page]
    F --> H[Login Page]
    F --> I[Dashboard]
    F --> J[PaperRead]
    F --> K[ResearchDecompose]
    F --> L[ExperimentRoadmap]
    F --> M[CodeReproduce]
    F --> N[ResultAnalyze]
    F --> O[KnowledgeGraph]
    F --> P[Profile]

    J --> J1[SectionNav]
    J --> J2[DeepReadReport]
    J --> J3[KGPanel]
    J --> J4[PaperChat]

    J4 --> J4a[ChatBubble]
    J4 --> J4b[ChatInput]
    J4 --> J4c[MessageList]
    J4 --> J4d[StreamingText]

    J2 --> J2a[MarkdownRenderer]
    J2 --> J2b[CitationCard]

    J2a --> J2a1[CodeBlock]
    J2a --> J2a2[LaTeXBlock]

    K --> K1[ResearchTree]
    K --> K2[TreeNodeDetail]
    K --> K3[FeasibilityBadge]

    L --> L1[Timeline]
    L --> L2[BaselineCard]
    L --> L3[DatasetPanel]
    L --> L4[ToolChainList]

    N --> N1[DataUploader]
    N --> N2[ChartGallery]
    N --> N3[StatsSummary]
    N --> N4[AnalysisEditor]

    N2 --> N2a[BarChart]
    N2 --> N2b[LineChart]
    N2 --> N2c[BoxPlotChart]
    N2 --> N2d[HeatmapChart]
    N2 --> N2e[RadarChart]
    N2 --> N2f[ChartWrapper]

    M --> M1[RepoInfoCard]
    M --> M2[FileTree]
    M --> M3[DependencyList]
    M --> M4[ReproductionChecklist]
    M --> M5[ErrorDiagnosis]

    O --> O1[GraphCanvas]
```

---

## API Interaction Flow

### REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/login` | User login |
| `POST` | `/api/v1/auth/register` | User registration |
| `GET` | `/api/v1/users/me` | Get current user |
| `POST` | `/api/v1/papers/upload` | Upload PDF (multipart) |
| `GET` | `/api/v1/papers/{id}/deep-read` | Get deep-read report |
| `POST` | `/api/v1/papers/{id}/chat` | Paper follow-up chat |
| `POST` | `/api/v1/research/decompose` | Research question decomposition |
| `POST` | `/api/v1/experiments/generate-roadmap` | Generate experiment roadmap |
| `POST` | `/api/v1/code/analyze-repo` | Analyze GitHub repo |
| `POST` | `/api/v1/code/diagnose-error` | Error diagnosis |
| `POST` | `/api/v1/results/analyze` | Analyze result files (multipart) |
| `GET` | `/api/v1/kg/concepts` | Get KG concept nodes |
| `GET` | `/api/v1/kg/concepts/{id}/relations` | Get concept relations |

### WebSocket Streaming Protocol

```mermaid
sequenceDiagram
    participant F as Frontend
    participant WS as WebSocket
    participant B as Backend
    participant LLM as Spark API

    F->>WS: Connect /ws/chat/{session_id}
    WS-->>F: Connection established
    F->>WS: Send message
    WS->>B: Forward message
    B->>LLM: Request generation
    LLM-->>B: Chunk 1
    B-->>WS: {type: "stream_chunk", content: "..."}
    WS-->>F: Render chunk
    LLM-->>B: Chunk 2
    B-->>WS: {type: "stream_chunk", content: "..."}
    WS-->>F: Append chunk
    LLM-->>B: Chunk N
    B-->>WS: {type: "stream_chunk", content: "..."}
    B-->>WS: {type: "citation", citation: {...}}
    WS-->>F: Attach citation
    B-->>WS: {type: "stream_end"}
    WS-->>F: Finalize message
```

### Axios Configuration

```typescript
// services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:8000
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — auto-attach JWT
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — unified error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
```

---

## UI Design System

### Design Principles

- **Clean & Professional**: Academic-oriented interface with moderate information density
- **Structure First**: All outputs rendered structurally (tables, trees, timelines) （结构化优先）
- **Traceability**: Every generated claim carries a clickable citation （溯源可见）
- **Progressive Disclosure**: Complex info layered — collapsed by default, expanded on demand （渐进披露）

### Color Palette

```css
:root {
  /* Primary */
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: #dbeafe;

  /* Semantic */
  --accent: #0ea5e9;      /* Cyan — emphasis elements */
  --success: #10b981;     /* Green — high feasibility / success */
  --warning: #f59e0b;     /* Yellow — medium feasibility / warning */
  --danger: #ef4444;      /* Red — low feasibility / error */
  --purple: #8b5cf6;      /* Purple — knowledge graph / AI */

  /* Neutral */
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --border: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
}
```

### Typography

| Use Case | Font Stack |
|----------|-----------|
| Chinese | `"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif` |
| English | `Inter, "SF Pro Display", system-ui, sans-serif` |
| Code | `"JetBrains Mono", "Consolas", "Courier New", monospace` |

### Spacing System (4px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Inline element padding |
| `space-2` | 8px | Tight component gaps |
| `space-3` | 12px | Standard internal padding |
| `space-4` | 16px | Component internal spacing |
| `space-6` | 24px | Component gaps |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Major section separations |
| `space-16` | 64px | Page-level spacing |

### Responsive Breakpoints

```
Mobile:  < 640px    → Single column, sidebar as drawer
Tablet:  640-1024px → Two-column layout
Desktop: > 1024px   → Full three-column layout
```

---

## State Management

### Zustand Store Architecture

```mermaid
flowchart TD
    subgraph Stores["Zustand Stores"]
        Auth["authStore - 用户认证"]
        Chat["chatStore - 对话状态"]
        Paper["paperStore - 论文状态"]
        UI["uiStore - UI 状态"]
    end

    subgraph Components["React Components"]
        C1["Header"]
        C2["ChatBubble"]
        C3["DeepReadReport"]
        C4["Sidebar"]
    end

    Auth --> C1
    Chat --> C2
    Paper --> C3
    UI --> C4
```

### Store Interfaces

```typescript
// authStore — 用户认证状态
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// chatStore — 对话状态
interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  messages: Message[];
  isStreaming: boolean;
  createSession: (module: string) => Promise<string>;
  sendMessage: (content: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearCurrentSession: () => void;
}

// paperStore — 论文状态
interface PaperState {
  currentPaper: Paper | null;
  deepReadReport: DeepReadReport | null;
  isLoading: boolean;
  uploadPaper: (file: File) => Promise<Paper>;
  getDeepRead: (paperId: string) => Promise<DeepReadReport>;
  clearPaper: () => void;
}

// uiStore — UI 状态
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  toggleTheme: () => void;
}
```

---

## API Specification

### WebSocket Message Protocol

```typescript
// Message types for streaming chat
interface WSMessage {
  type: 'stream_chunk' | 'stream_end' | 'citation' | 'error';
  content?: string;
  citation?: {
    source_id: string;
    source_type: 'paper' | 'textbook' | 'code' | 'kg';
    snippet: string;
    url?: string;
  };
}
```

### Key API Response Types

```typescript
// Deep Read Report
interface DeepReadReport {
  paper_id: string;
  sections: Array<{
    heading: string;
    content: string;
    citations: Array<{ source: string; text: string }>;
  }>;
  knowledge_graph_nodes: string[];
}

// Research Question Tree
interface ResearchTree {
  core_question: string;
  sub_questions: Array<{
    id: string;
    question: string;
    feasibility: 'high' | 'medium' | 'low';
    datasets: string[];
    papers: string[];
  }>;
  related_work: Array<{ name: string; paper_id: string }>;
}

// Experiment Roadmap
interface ExperimentRoadmap {
  objective: string;
  steps: Array<{
    step: number;
    task: string;
    details: string;
    estimated_days: number;
  }>;
  baselines: Array<{
    name: string;
    paper_id: string;
    github_url: string;
  }>;
  datasets: Array<{ name: string; url: string }>;
  metrics: Array<{ name: string; formula: string }>;
  tools: Array<{ name: string; purpose: string }>;
}

// Code Analysis Result
interface CodeAnalysis {
  repo_info: { name: string; language: string; stars: number };
  file_tree: Array<{ path: string; type: 'file' | 'dir' }>;
  dependencies: Array<{ package: string; version: string }>;
  key_files: Array<{ path: string; description: string }>;
  reproduction_guide: Array<{ step: number; command: string; description: string }>;
  common_issues: Array<{ error: string; solution: string }>;
}

// Result Analysis
interface ResultAnalysis {
  summary_stats: {
    mean: number;
    std: number;
    ci_95: [number, number];
  };
  charts: Array<{
    type: 'bar' | 'line' | 'box' | 'heatmap' | 'radar';
    title: string;
    echarts_option: Record<string, any>;
  }>;
  analysis_text: string;
  writing_suggestions: string;
}
```

---

## Local Development

### Prerequisites

- Node.js >= 18.0
- npm >= 9.0 (or pnpm >= 8.0)
- Backend service running at `http://localhost:8000`

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Khaliii-6/SciCopilot_The-Fronted-Portion.git
cd SciCopilot_The-Fronted-Portion

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start dev server
npm run dev
# → http://localhost:5173
```

### Environment Variables

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

### Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run format       # Prettier format
npm run type-check   # TypeScript type check
```

---

## Build & Deploy

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['echarts'],
          markdown: ['react-markdown', 'remark-gfm', 'katex'],
        },
      },
    },
  },
});
```

### GitHub Pages Deployment

```bash
npm run build
# Settings → Pages → Branch: main /root
```

---

## Development Milestones

| Week | Milestone | Frontend Tasks | Acceptance Criteria |
|------|-----------|---------------|---------------------|
| W1 | Project Init | Initialize React + Vite + Tailwind; configure routing; build AppLayout | Home, Login, Dashboard skeleton ready |
| W2 | Paper Library + Deep Read UI | Paper upload, library list, deep-read report rendering (Markdown + citations) | Papers uploadable; reports render correctly |
| W3 | Paper Chat + KG Panel | WebSocket streaming chat, knowledge graph side panel, citation popup | Real-time streaming; citations clickable |
| W4 | Research Decomposition | Interactive tree component (D3.js / custom), node color coding, detail drawer | Tree foldable/expandable; nodes interactive |
| W5 | Experiment Roadmap | Step timeline, baseline cards, dataset panel, export functionality | Full experiment plan page functional |
| W6 | Code Reproduction | Repo info card, file tree, dependency list, reproduction checklist, error diagnosis | Repo URL input → full display |
| W7 | Result Analysis | Drag-drop upload, ECharts gallery (>=4 types), stats summary, analysis editor | CSV upload → auto charts + analysis |
| W8 | Integration & Polish | End-to-end testing, Loading/Error/Empty states, responsive, performance optimization | No blocking bugs; page load < 2s |
| W9 | User Validation & Submit | 2+ real users trial, feedback collection, bug fixes, demo video recording | Feedback documented; demo video <= 3min |

### Development Timeline Visualization

```mermaid
gantt
    title SciPilot Frontend Development Timeline
    dateFormat  YYYY-MM-DD
    section Foundation
    Project Init           :a1, 2026-07-06, 7d
    section Core Features
    Paper Deep Read        :a2, after a1, 14d
    Research Decomposition :a3, after a2, 7d
    Experiment Roadmap     :a4, after a3, 7d
    Code Reproduction      :a5, after a4, 7d
    Result Analysis        :a6, after a5, 7d
    section Polish
    Integration & Testing  :a7, after a6, 7d
    User Validation        :a8, after a7, 7d
```

---

## Team Responsibilities

### Frontend Development Roles

| Module | Core Responsibilities |
|--------|----------------------|
| **Auth** | Login page, register page, JWT auth flow |
| **Dashboard** | Dashboard UI, recent sessions, saved papers, progress tracking |
| **Paper Deep Read** | PDF upload, report renderer (Markdown + LaTeX), citation cards, chat |
| **Paper Library** | Paper grid/list, search/filter, paper cards, bookmark |
| **Research Decomposition** | Interactive tree visualization, node detail drawer, feasibility badges |
| **Experiment Roadmap** | Step timeline, baseline comparison cards, dataset panel, export |
| **Code Reproduction** | Repo info, file tree, dependency list, checklist, error diagnosis chat |
| **Result Analysis** | Data upload, ECharts gallery, stats summary, analysis editor |
| **Knowledge Graph** | D3.js graph visualization, concept navigation, relation display |
| **UI Infrastructure** | Layout components, base UI kit, theme system, responsive adapter |

---

<p align="center">
  <strong>Built with passion for SE researchers worldwide.</strong>
  <br>
  <em>为全球软件工程研究者而构建</em>
</p>

<p align="center">
  <sub>SciPilot Frontend README · Based on the detailed implementation plan · 2026</sub>
</p>
