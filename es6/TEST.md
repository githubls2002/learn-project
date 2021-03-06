## 语句覆盖<判定覆盖<条件覆盖<判定-条件覆盖<组合覆盖<路径覆盖

1）语句覆盖：语句覆盖就是设计若干个测试用例，运行被测试程序，使得每一条可执行语句至少执行一次。
> 可以很直观的从源码得到测试用例，无须细分每条判定表达式
> 隐式逻辑分支无法测试

2）判定覆盖（也叫分支覆盖）：即：程序中的每个分支至少执行一次/设计若干个测试用例，运行所测程序，使程序中每个判断的取真分支和取假分支至少执行一次。
> 覆盖强度几乎增大一倍；测试用例简单。
> 关注焦点是表达式逻辑值，而不是其中的每个条件，可能会遗漏部分测试路径

3）条件覆盖：设计足够的测试用例，运行所测程序，使程序中每个判断的每个条件的每个可能取值至少执行一次。即每个条件至少有一次为真值，有一次为假值。
> 相对判定股改，增加了对符合判定情况的测试，增加了测试路径。
> 需要足够多的测试用例； 条件覆盖并不能保证判定覆盖。 测试用例低效。

4）判定、条件覆盖：设计足够的测试用例，运行所测程序，使程序中每个判断的每个条件的每个可能取值至少执行一次，并且每个可能的判断结果也至少执行一次。
> 满足判定覆盖准则和条件覆盖准则，弥补二者的不足
> 未考虑条件的 组合情况， 容易遗漏、会忽略条件中取 或 的情况。

5）条件组合测试：设计足够的测试用例，运行所测程序，使程序中每个判断的所有条件取值组合至少执行一次。
> 多重条件覆盖准则 满足 判定覆盖、条件覆盖、判定/条件覆盖
> 线性的增加了测试用例的数量，也不能保证所有路径测试。

6）路径测试：设计足够的测试用例，运行所测程序，要覆盖程序中所有可能的路径。
> 可以对程序进行彻底的测试，比前面5种的覆盖面都广
> 需要设计大量、复杂的测试用例，使得工作量呈指数级增长； 特殊路径无法测试。

## 单元测试 如何分配

50%：语句覆盖
30%：判定覆盖<条件覆盖<判定-条件覆盖
20%：组合覆盖<路径覆盖