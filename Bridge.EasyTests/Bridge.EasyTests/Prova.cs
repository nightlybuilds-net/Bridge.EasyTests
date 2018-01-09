using Bridge.EasyTests.Attributes;
using System.Threading;

namespace Bridge.EasyTests
{
   


    public class TestoTyutto : TestBase
    {

        [TestMethod]
        public AssertResult TestSum()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }

        [TestMethod]
        public AssertResult TestSum1()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        [TestMethod]
        public AssertResult TestSum2()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        [TestMethod]
        public AssertResult TestSum3()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        [TestMethod]
        public AssertResult TestSum4()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        [TestMethod]
        public AssertResult TestSum5()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        [TestMethod]
        public AssertResult TestSum6()
        {
            var soma = 4 + 3;

            return this.Result
                .WithAssert(() => soma == 7, nameof(TestSum))
                .WithAssert(() => soma%2 != 0, "Sette è dispari");
        }
        
       
        
    }
}