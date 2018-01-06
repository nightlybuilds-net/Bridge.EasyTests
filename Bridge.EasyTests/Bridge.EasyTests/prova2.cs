using System;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;

namespace Bridge.EasyTests
{
    [Test()]
    public class prova2 
    {
        [TestMethod]
        public void Pippo()
        {
            var t = 2;
            
            t.ShouldBeEquals(3);
        }
        
        [TestMethod("ciccioooooo")]
        public void Somma()
        {
            var t = 2;
            var c = 5;

            var r = t + c;

            r.ShouldBeNotEquals(8).ShouldBeEquals(7);
            
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