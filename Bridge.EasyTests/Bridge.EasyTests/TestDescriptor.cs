using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Retyped.Primitive;
using static Retyped.knockout;

namespace Bridge.EasyTests
{
    internal class TestDescriptor
    {
        public string Name => this.Method.Name;
        public MethodInfo Method { get; set; }
        public string Group { get; set; }
        
        public Exception FailAssert { get; set; }
        public bool Success { get; set; }
        public int Time { get; set; }

        public string Error => FailAssert?.ToString();
        public Type Type { get; set; }


        
        public void RunTest()
        {
            var instance = Activator.CreateInstance(this.Type);
            
            var watch = new Stopwatch();
            watch.Start();

            try
            {
                this.Method.Invoke(instance);
                this.Success = true;
            }
            catch (Exception e)
            {
                this.FailAssert = e;
                this.Success = false;
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