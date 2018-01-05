using System;
using System.Linq;
using Bridge.EasyTests.Attributes;
using Bridge.Html5;
using static Retyped.knockout;

namespace Bridge.EasyTests
{
    internal class Runner
    {
        public string BrowserInfo { get; set; }
        public KnockoutObservableArray<TestDescriptor> Tests;
        public KnockoutObservable<int> TotalAssertions;
        public KnockoutObservable<int> FailedAsserts;
        public KnockoutObservable<int> PassedAsserts;
        public KnockoutObservable<int> TotalTime;
        public KnockoutObservable<bool> Running;


        public Runner()
        {
            this.Tests = ko.observableArray.Self<TestDescriptor>();
            this.TotalAssertions = ko.observable.Self<int>();
            this.FailedAsserts = ko.observable.Self<int>();
            this.PassedAsserts = ko.observable.Self<int>();
            this.TotalTime = ko.observable.Self<int>();
            this.Running = ko.observable.Self<bool>();

            this.BrowserInfo = Global.Navigator.AppVersion;
        }

        

        /// <summary>
        /// Run tests
        /// </summary>
        public void Run()
        {
            this.Running.Self(true);
            
            this.DiscoverTest(); // discovery all tests
            
            this.RunTests(); // run all test for each group
            
            this.TotalAssertions.Self(this.Tests.Self().SelectMany(sm=>sm.EasyAssertions.Self()).Count()); // total tests found
            
            this.FailedAsserts.Self(this.Tests.Self().SelectMany(sm=>sm.EasyAssertions.Self()).Count(c=>!c.Success)); // failed assertion tests found
            this.PassedAsserts.Self(this.Tests.Self().SelectMany(sm=>sm.EasyAssertions.Self()).Count(c=>c.Success)); // failed assertion tests found
            this.TotalTime.Self(this.Tests.Self().Sum(s => s.Time.Self()));

            this.Running.Self(false);
        }

        /// <summary>
        /// Run 
        /// </summary>
        private void RunTests()
        {
            this.Tests.Self().ForEach(f =>
            {
                f.RunTest();
            });
        }

        /// <summary>
        /// Discovery all tests
        /// </summary>
        private void DiscoverTest()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().SelectMany(s => s.GetTypes())
                .Where(w=> !w.IsInterface && typeof(TestBase).IsAssignableFrom(w) && !w.IsAbstract)
                .ToList();
            
            // run all tests method
            types.ForEach(f =>
            {
                var instance = Activator.CreateInstance(f);
                var testClass = (TestBase) instance;

                var testMethods = f.GetMethods().Where(w => w.IsPublic)
                    .Where(w => w.GetCustomAttributes(typeof(TestMethodAttribute), true).Any()).ToList();
                
                testMethods.ForEach(method =>
                {
                    var testDescr = new TestDescriptor
                    {
                        Instance = instance,
                        Method = method,
                        Group = string.IsNullOrEmpty(testClass.Description) ? instance.GetType().Name : testClass.Description
                    };
                    
                    this.Tests.push(testDescr);
                });

            });
        }

       
    }
}