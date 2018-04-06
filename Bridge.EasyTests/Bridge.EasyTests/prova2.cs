//using System;
//using System.Threading;
//using System.Threading.Tasks;
//using Bridge.EasyTests.Asserts;
//using Bridge.EasyTests.Attributes;
//
//namespace Bridge.EasyTests
//{
//    [Test]
//    public class prova2 
//    {
//        [TestMethod]
//        public void ShouldBeEquals_void()
//        {
//            var t = 2;
//            t.ShouldBeEquals(3);
//            
//        }
//        
//        [TestMethod]
//        public async Task ShouldBeEquals_task_delay_200()
//        {
//            await Task.Delay(200);
//            var t = 2;
//            t.ShouldBeEquals(3);
//            
//        }
//        
//        [TestMethod]
//        public async Task AwaitError()
//        {
//            await Task.Delay(1500);
//            throw new Exception("Error thorwed");
//            
//        }
//
//        [TestMethod]
//        public void TestShouldBeTrue()
//        {
//            EasyAsserts.ShouldBeTrue(() => 3==4);
//        }
//        
//        [TestMethod("Test some equals")]
//        public void NotEqual()
//        {
//            var t = 2;
//            var c = 5;
//
//            var r = t + c;
//
//            r.ShouldBeNotEquals(8);
//            r.ShouldBeEquals(7);
//            
//            EasyAsserts.Throws<PippoException>(() =>
//            {
//                throw new PippoException();
//            });
//            
//        }
//
//    }
//
//    class PippoException : Exception
//    {
//        
//    }
//}