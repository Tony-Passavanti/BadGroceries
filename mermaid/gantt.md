
<style>
.mermaid .grid line {
    stroke: #333333 !important;
    stroke-opacity: 0.9 !important;
}
</style>

```mermaid

%%{init: {
  'theme': 'base',
  'gantt': {'tickInterval': '1week'},
  'themeVariables': {
    'primaryTextColor': '#e7d6ecff',

    'tertiaryColor': '#162f5eff',

    'activeTaskBkgColor': '#5555558a',
    'activeTaskBorderColor': '#4c51bf',

    'doneTaskBkgColor': '#7777778a',
    'doneTaskBorderColor': '#38a169',

    'critBorderColor': '#e53e3e',
    'todayLineColor': '#ed8936'
  }
}}%%


gantt
    title BadGroceries.report - Weekly Gantt
    
    dateFormat  %e %b %y
    axisFormat  %e %b

    %% <task-id>, <dependency>, <start-date>, <duration>
    section Pre-Dev
        Init Git repo                   :done, t1, 27 OCT 25, 2d
        Init CI pipeline                :done, t2, after t1, 4d
        Design SQL schema               :done, t3, 27 OCT 25, 4d
        Init Supabase Project           :done, t4, 27 OCT 25, 2d

    section Database
        Configure Supabase Schema       :done, t5, after t3 t4, 4d
        Configure Supabase Sockets      :done, t6, after t5 t11, 2d

    section External APIs
        Integrate SEC API               :done, t7, after t11, 2d
        Integrate OAuth API             :done, t24, after t8, 4d

    section Backend
        Authentication Backend          :done, t8, after t2, 2d
        Company Tagging Backend         :crit, active, t9, after t2, 4d
        Records Publishing Backend      :active, t10, after t7, 4d
        Company Search Backend          :done, t11, 05 NOV 25, 2d
        Subsidiary Tree Backend         :done, t12, 12 NOV 25, 2d

    section Frontend
        Website Landing Page            :done, t25, 03 NOV 25, 2d
        Login/Registration UI           :done, t13, after t24, 4d
        Company Tagging UI              :active, t14, after t17, 4d
        Company Search UI               :done, t16, after t7 t11, 4d
        Subsidiary Tree UI              :done, t17, after t12, 3d
        Add Favicon                     :done, t18, 10 NOV 25, 1d
        Standardize Theme System            :done, t19, after t25, 1d

    section Phase 2
        Adapt API JSON for Internal Schema  :active, t20, after t7 t10, 7d
        Integrate Supabase Retrieval        :active, t21, after t6 t11, 7d
        Debug Subsidiary Tree               :done, t22, after t12 t17, 7d
        Extend Subsidiary Tree              :active, t23, after t22, 7d
```



| **Task** | **Effort (person-days)** | **Duration (days)** | **Dependencies** |
|----------|--------------------------|---------------------|------------------|
| T1 (Init Git repo) | 2 | 1 | |
| T2 (Init CI pipeline) | 4 | 4 | T1 |
| T3 (Design SQL schema) | 4 | 4 | |
| T4 (Init Supabase Project) | 2 | 2 | |
| T5 (Configure Supabase Schema) | 4 | 4 | T3, T4 |
| T6 (Configure Supabase Sockets) | 2 | 2 | T5, T11 |
| T7 (Integrate SEC API) | 2 | 2 | T11 |
| T24 (Integrate OAuth API) | 4 | 4 | T8 |
| T8 (Authentication Backend) | 2 | 2 | T2 |
| T9 (Company Tagging Backend) | 4 | 4 | T2 |
| T10 (Records Publishing Backend) | 4 | 4 | T7 |
| T11 (Company Search Backend) | 2 | 2 | |
| T12 (Subsidiary Tree Backend) | 2 | 2 | |
| T25 (Website Landing Page) | 2 | 2 | |
| T13 (Login/Registration UI) | 4 | 4 | T24 |
| T14 (Company Tagging UI) | 4 | 4 | T17 |
| T16 (Company Search UI) | 4 | 4 | T7, T11 |
| T17 (Subsidiary Tree UI) | 3 | 3 | T12 |
| T18 (Add Favicon) | 1 | 1 | |
| T19 (Standardize Theme System) | 1 | 1 | T25 |
| T20 (Adapt API JSON for Internal Schema) | 7 | 7 | T7, T10 |
| T21 (Integrate Supabase Retrieval) | 7 | 7 | T6, T11 |
| T22 (Debug Subsidiary Tree) | 7 | 7 | T12, T17 |
| T23 (Extend Subsidiary Tree) | 7 | 7 | T22 |
