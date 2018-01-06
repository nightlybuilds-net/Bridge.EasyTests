using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Bridge.EasyTests.Attributes;
using Retyped.Primitive;
using static Retyped.knockout;

namespace Bridge.EasyTests
{
    internal class TestDescriptor
    {

        public string Name { get; set; }
        public string Group { get; set; }

        public Type Type { get; set; }
        public MethodInfo Method { get; set; }
        
        public Exception FailAssert { get; set; }
        public bool Success => FailAssert == null;

        public string Error => FailAssert == null ? string.Empty : $"{FailAssert.GetType().Name}: {FailAssert.Message}";
        public string Stack => FailAssert?.StackTrace;
        
        public int Time { get; set; }
        
        
        public KnockoutObservable<bool> Visible { get; set; }

        public TestDescriptor()
        {
            this.Visible = ko.observable.Self<bool>(true);
        }


        /// <summary>
        /// Run test.
        /// </summary>
        public void RunTest()
        {
            var instance = Activator.CreateInstance(this.Type);
            
            var watch = new Stopwatch();
            watch.Start();

            try
            {
                this.Method.Invoke(instance);
            }
            catch (Exception e)
            {
                this.FailAssert = e;
            }
            finally
            {
                watch.Stop();
                this.Time = (int)watch.ElapsedMilliseconds;
                
                // check of type is disposable
                var disposable = instance as IDisposable;
                disposable?.Dispose();
            }
        }

    }
}