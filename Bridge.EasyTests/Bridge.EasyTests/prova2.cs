using System;
using System.Threading;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;

namespace Bridge.EasyTests
{
    [Test("Demo oineivneroin voiernoivreoinvo iernovneorin voienroi noerin oiven oirenoivn eori nvre j vpervpiner iovbeorv oneroivbnoi ern vre")]
    public class prova2 
    {
        [TestMethod]
        public void ShouldBeEquals()
        {
            Thread.Sleep(1000);
            var t = 2;
            t.ShouldBeEquals(3);
            
        }

        [TestMethod("Test Should be true preinfpren fpnerpf poern foinreingperomgpioerngpergjpierngperjègjorepingon eroine oigng oineio re gieor goure")]
        public void TestShouldBeTrue()
        {
            EasyAsserts.ShouldBeTrue(() => 3==4);
        }
        
        [TestMethod("Test some equals")]
        public void NotEqual()
        {
            var t = 2;
            var c = 5;

            var r = t + c;

            r.ShouldBeNotEquals(8);
            r.ShouldBeEquals(7);
            
            EasyAsserts.Throws<PippoException>(() =>
            {
                throw new PippoException();
            });
            
        }

    }

    class PippoException : Exception
    {
        
    }
}