# [superset #7416](https://github.com/apache/superset/pull/7416) 代码审查报告

*powered by GPT3.5-Turbo and CodeDog 0.0.5*


## 执行记录
- 开始时间: 2023-05-16 00:37:38
- 审查耗时: 102秒
- 审查文件数量: 7 (跳过0)
- OPENAI API TOKEN数量: 14175 (约$0.0284)



## PR概要
这次pull request增加了一个轻量级的SQL Lab查询调度功能，可以通过配置启用。在SQL Lab中，用户可以保存查询并添加元数据，以便外部调度程序定期运行。该功能已在Lyft成功测试，并支持不同的元数据配置。


| 主要变动 |
|---|
| 1. **[docs/installation.rst](https://github.com/apache/superset/pull/7416/files#diff-d9b149498982c0663c3b7170398773361ed5678f1a627e9c2fd8d2c955c563db)** 改动质量:0.8 |
| Add feature flag for scheduling queries in SQL Lab |
| 2. **[superset/views/sql_lab.py](https://github.com/apache/superset/pull/7416/files#diff-fce21e9e4db649ca5477e6a17aae8c2360d3d354162ee5726c50ebe158dc8535)** 改动质量:0.8 |
| 修改了SavedQueryViewApi的list_columns和show_columns，增加了extra_json字段 |

| 次要变动 |
|---|
| 1. **[superset/assets/package-lock.json](https://github.com/apache/superset/pull/7416/files#diff-1a2a1f0430415a8662bc750b0faa210870267897f52e17196e2e474c2dee42c9)** 改动质量:0.8 |
| 该diff改动为添加了一个新的npm包"react-jsonschema-form"，版本为1.2.0，该包依赖于"ajv"、"babel-runtime"、"core-js"、"lodash.topath"和"prop-types"等其他npm包。 |
| 2. **[superset/assets/package.json](https://github.com/apache/superset/pull/7416/files#diff-b54cbb3f6a0acde27b14a32b18273a07e4ed48d8e871d58b1e63a49202a41506)** 改动质量:0.8 |
| 添加了react-jsonschema-form依赖 |
| 3. **[superset/assets/src/SqlLab/components/ScheduleQueryButton.jsx](https://github.com/apache/superset/pull/7416/files#diff-232bf8a93995e4f8bc7cb3ee4a0f64ae4b22bef69cbbe1392d2fedcb269b9c34)** 改动质量:8.5 |
| 该diff改动为添加了一个名为ScheduleQueryButton的React组件，用于在Superset中调度查询。组件包含一个按钮，点击按钮会弹出一个模态框，用户可以在模态框中设置查询的调度信息。 |
| 4. **[superset/assets/src/SqlLab/components/SqlEditor.jsx](https://github.com/apache/superset/pull/7416/files#diff-9db0548c4080e77ff2cf5c447c275808d0c5f03451de2f9455faf677ed5e3604)** 改动质量:0.8 |
| 添加了一个名为ScheduleQueryButton的组件，用于在SqlEditor中调度查询。如果启用了FeatureFlag.SCHEDULED_QUERIES，则会在SqlEditor中显示一个调度查询按钮。 |
| 5. **[superset/assets/src/featureFlags.ts](https://github.com/apache/superset/pull/7416/files#diff-3929a462617a3cfb75dcdb3741af37157b78fa9e4acfe8778e503274bef9fdaa)** 改动质量:0.8 |
| 该diff改动了superset/assets/src/featureFlags.ts文件，新增了一个特性标志SCHEDULED_QUERIES，并修改了isFeatureEnabled函数，增加了对window对象和window.featureFlags属性的判断。 |




## PR改进建议

无
