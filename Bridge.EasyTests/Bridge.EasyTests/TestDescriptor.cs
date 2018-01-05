using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using static Retyped.knockout;

namespace Bridge.EasyTests
{
    internal class TestDescriptor
    {
        public string Name => this.Method.Name;
        public MethodInfo Method { get; set; }
        public object Instance { get; set; }
        public string Group { get; set; }
        
        public KnockoutObservableArray<EasyAssert> EasyAssertions { get;  }
        public KnockoutObservable<bool> Success { get; set; }
        public KnockoutObservable<int> Time { get; set; }


        public TestDescriptor()
        {
            this.EasyAssertions = ko.observableArray.Self<EasyAssert>();
            this.Success = ko.observable.Self<bool>(false);
            this.Time = ko.observable.Self<int>(0);
        }
        
        public void RunTest()
        {
            var watch = new Stopwatch();
            watch.Start();
            var assertResult = this.Method.Invoke(this.Instance) as AssertResult;
            watch.Stop();

            if (assertResult == null)
            {
                Console.WriteLine($"Method: {this.Method.Name} in group {this.Group} not return AssertResult!");
                return;
            }
            
            this.Time.Self((int)watch.ElapsedMilliseconds);
            this.EasyAssertions.Self(assertResult.Asserts.ToArray());
            this.Success.Self(this.EasyAssertions.Self().All(a=>a.Success));
        }

    }
}