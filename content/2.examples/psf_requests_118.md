# [requests #118](https://github.com/psf/requests/pull/118) 代码审查报告

*powered by GPT3.5-Turbo and CodeDog 0.0.5*


## 执行记录
- 开始时间: 2023-05-16 00:37:07
- 审查耗时: 29秒
- 审查文件数量: 4 (跳过0)
- OPENAI API TOKEN数量: 4858 (约$0.0097)



## PR概要
这次pull request添加了一个名为Session的类，用于管理和持久化请求设置，如cookies、auth、proxies等。同时，还添加了使用说明。这个类的实例属性可以自动传递，从而实现自动cookie处理。如果需要更详细的文档和测试，请告诉我。


| 主要变动 |
|---|
| 1. **[docs/user/advanced.rst](https://github.com/psf/requests/pull/118/files#diff-eb54136305e7b566c146100e76fb1495a0637ca9549af5bffdfc24625e0c5a77)** 改动质量:0.8 |
| 添加requests.Session对象的使用说明 |
| 2. **[requests/session.py](https://github.com/psf/requests/pull/118/files#diff-e0c67f7ece87a41e1fe9dbae6dc2b5815ca1a68021288ccfd90bdaf58a5bcb40)** 改动质量:0.8 |
| 为requests模块添加Session类，用于管理和持久化请求设置（cookies、auth、proxies等） |

| 次要变动 |
|---|
| 1. **[AUTHORS](https://github.com/psf/requests/pull/118/files#diff-ab6af77435f58cc0c9d4c31dfe05656e45187cc7c7fc02aada401a7642125463)** 改动质量:0.9 |
| AUTHORS文件添加了Tom Hogans的信息 |
| 2. **[test_requests.py](https://github.com/psf/requests/pull/118/files#diff-2ada4feb78477a2cbb0c1399ba1326e066d04a42220f7d6d79bdbe5e9cfc1c94)** 改动质量:8.5 |
| 该diff增加了三个测试用例，分别测试了使用Session对象发送HTTP和HTTPS请求以及Session对象的持久化headers。 |




## PR改进建议

无
