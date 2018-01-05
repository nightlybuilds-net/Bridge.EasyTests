using System;
using System.Collections.Generic;
using System.Reflection;

namespace Bridge.EasyTests
{
    public class EasyAssert
    {
        public string Description { get; set; }
        public bool Success { get; set; }
    }

    public class AssertResult
    {
        public  List<EasyAssert> Asserts { get; }

        private AssertResult()
        {
            this.Asserts = new List<EasyAssert>();
        }
        
        public static AssertResult Result => new AssertResult();

        public AssertResult WithAssert(Func<bool> assert, string description)
        {
            this.Asserts.Add(new EasyAssert
            {
                Description = description,
                Success = assert()
            });
            return this;
        }

        
    }
}